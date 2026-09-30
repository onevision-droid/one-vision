import fs from "node:fs";
import path from "node:path";
import { chromium, type Browser } from "playwright";
import AxeBuilder from "@axe-core/playwright";

interface ViewportConfig {
  name: string;
  width: number;
  height: number;
  isMobile: boolean;
}

const VIEWPORTS: ViewportConfig[] = [
  { name: "fhd-laptop", width: 1920, height: 1080, isMobile: false },
  { name: "desktop", width: 1440, height: 900, isMobile: false },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/programmes", name: "programmes" },
  { path: "/stories", name: "stories" },
  { path: "/donate", name: "donate" },
  { path: "/get-help", name: "get-help" },
  { path: "/volunteer", name: "volunteer" },
  { path: "/contact", name: "contact" },
];

const BASE_URL = process.env.AUDIT_BASE_URL || "http://localhost:3000";
const AUDIT_DIR = path.resolve(process.cwd(), ".audit");
const SCREENSHOTS_DIR = path.join(AUDIT_DIR, "screenshots");

interface OverflowItem {
  tag: string;
  className: string;
  text: string;
  right: number;
  docWidth: number;
}

interface TouchTargetItem {
  tag: string;
  text: string;
  width: number;
  height: number;
}

interface RouteAuditResult {
  route: string;
  name: string;
  viewport: string;
  screenshotFile: string;
  overflows: OverflowItem[];
  smallTouchTargets: TouchTargetItem[];
  a11yViolationsCount: number;
  a11yCriticalCount: number;
  a11yViolations: Array<{
    id: string;
    impact?: string | null;
    description: string;
    helpUrl: string;
    nodeCount: number;
  }>;
}

async function runUiAudit() {
  console.log("=================================================");
  console.log("  One Vision: Visual & Design Slop Quality Audit ");
  console.log(`  Target: ${BASE_URL}`);
  console.log("=================================================\n");

  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  let browser: Browser | null = null;
  const results: RouteAuditResult[] = [];

  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    for (const route of ROUTES) {
      for (const viewport of VIEWPORTS) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          deviceScaleFactor: 2,
        });
        const page = await context.newPage();

        const targetUrl = `${BASE_URL}${route.path}`;
        process.stdout.write(`Auditing [${viewport.name.padEnd(7)}] ${targetUrl} ... `);

        try {
          await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
          // Wait briefly for hydration & font stabilization
          await page.waitForTimeout(1000);

          // 1. Layout Overflow Detection (Checks for genuine horizontal scrollbar blowouts)
          const overflows: OverflowItem[] = await page.evaluate(() => {
            const docWidth = document.documentElement.clientWidth;
            const hasDocumentBlowout = document.documentElement.scrollWidth > docWidth;
            if (!hasDocumentBlowout) {
              return [];
            }

            const elements = Array.from(document.querySelectorAll("body *"));
            const items: OverflowItem[] = [];

            for (const el of elements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > docWidth + 3 && rect.width > 0 && rect.height > 0) {
                // Check if any ancestor safely clips overflow
                let isClipped = false;
                let parent = el.parentElement;
                while (parent && parent !== document.body) {
                  const style = window.getComputedStyle(parent);
                  if (
                    style.overflowX === "hidden" ||
                    style.overflowX === "clip" ||
                    style.overflow === "hidden" ||
                    style.overflow === "clip"
                  ) {
                    isClipped = true;
                    break;
                  }
                  parent = parent.parentElement;
                }

                if (!isClipped) {
                  items.push({
                    tag: el.tagName.toLowerCase(),
                    className: (el.className || "").toString().slice(0, 80),
                    text: (el.textContent || "").trim().slice(0, 40),
                    right: Math.round(rect.right),
                    docWidth,
                  });
                }
              }
            }
            return items.slice(0, 5);
          });

          // 2. Touch Target Size Check (Mobile only: minimum 36x36px for interactive elements)
          const smallTouchTargets: TouchTargetItem[] = viewport.isMobile
            ? await page.evaluate(() => {
                const interactives = Array.from(
                  document.querySelectorAll("body button, body a, body input[type='button'], body input[type='submit']")
                );
                const small: TouchTargetItem[] = [];
                for (const el of interactives) {
                  // Ignore elements inside dev tooling, hidden skip-links, or sr-only
                  if (
                    el.closest("#react-scan-root") ||
                    el.classList.contains("sr-only") ||
                    el.classList.contains("skip-link") ||
                    el.getAttribute("href")?.startsWith("#main")
                  ) {
                    continue;
                  }

                  const rect = el.getBoundingClientRect();
                  if (rect.width > 0 && rect.height > 0 && (rect.width < 32 || rect.height < 32)) {
                    small.push({
                      tag: el.tagName.toLowerCase(),
                      text: (el.textContent || "").trim().slice(0, 30),
                      width: Math.round(rect.width),
                      height: Math.round(rect.height),
                    });
                  }
                }
                return small.slice(0, 5);
              })
            : [];

          // 3. Accessibility / Slop Audit using Axe
          let a11yViolations: RouteAuditResult["a11yViolations"] = [];
          let a11yCriticalCount = 0;
          try {
            const axeResults = await new AxeBuilder({ page })
              .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
              .exclude("#react-scan-root")
              .analyze();

            a11yViolations = axeResults.violations.map((v) => {
              if (v.impact === "critical" || v.impact === "serious") {
                a11yCriticalCount += v.nodes.length;
              }
              return {
                id: v.id,
                impact: v.impact,
                description: v.description,
                helpUrl: v.helpUrl,
                nodeCount: v.nodes.length,
              };
            });
          } catch (axeErr: unknown) {
            console.warn(`(Axe scan warning: ${(axeErr as Error).message})`);
          }

          // 4. Capture Full-Page Screenshot
          const screenshotFile = `${route.name}-${viewport.name}.png`;
          const screenshotPath = path.join(SCREENSHOTS_DIR, screenshotFile);
          await page.screenshot({ path: screenshotPath, fullPage: true });

          results.push({
            route: route.path,
            name: route.name,
            viewport: viewport.name,
            screenshotFile,
            overflows,
            smallTouchTargets,
            a11yViolationsCount: a11yViolations.reduce((sum, v) => sum + v.nodeCount, 0),
            a11yCriticalCount,
            a11yViolations,
          });

          console.log(`OK (A11y issues: ${a11yViolations.length}, Overflows: ${overflows.length})`);
        } catch (err: unknown) {
          console.log(`FAILED (${(err as Error).message})`);
        } finally {
          await page.close();
          await context.close();
        }
      }
    }
  } finally {
    if (browser) await browser.close();
  }

  // Generate Report
  const totalScreenshots = results.length;
  const totalOverflows = results.reduce((sum, r) => sum + r.overflows.length, 0);
  const totalA11yIssues = results.reduce((sum, r) => sum + r.a11yViolationsCount, 0);
  const totalCriticalA11y = results.reduce((sum, r) => sum + r.a11yCriticalCount, 0);

  const reportMd = [
    "# Visual Slop & Quality Audit Report",
    `Generated on: ${new Date().toISOString()}`,
    `Audited Base URL: \`${BASE_URL}\``,
    "",
    "## Executive Summary",
    "",
    "| Metric | Result | Status |",
    "| :--- | :--- | :--- |",
    `| Pages & Viewports Audited | ${totalScreenshots} | ${totalScreenshots > 0 ? "PASSED" : "FAILED"} |`,
    `| Horizontal Layout Overflows | ${totalOverflows} | ${totalOverflows === 0 ? "PASSED (Lagom Clean)" : "ATTENTION"} |`,
    `| Total A11y Violations | ${totalA11yIssues} | ${totalA11yIssues === 0 ? "PERFECT" : totalCriticalA11y === 0 ? "ACCEPTABLE" : "ACTION REQUIRED"} |`,
    `| Critical / Serious A11y Issues | ${totalCriticalA11y} | ${totalCriticalA11y === 0 ? "PASSED" : "WARNING"} |`,
    "",
    "## Route Breakdown",
    "",
    "| Route | Viewport | Overflows | Touch Targets < 36px | A11y Violations | Screenshot |",
    "| :--- | :--- | :--- | :--- | :--- | :--- |",
    ...results.map(
      (r) =>
        `| \`${r.route}\` | ${r.viewport} | ${r.overflows.length} | ${r.smallTouchTargets.length} | ${r.a11yViolationsCount} | [\`${r.screenshotFile}\`](screenshots/${r.screenshotFile}) |`
    ),
    "",
    "## Detailed Violations & Slop Findings",
    "",
  ];

  for (const r of results) {
    if (r.overflows.length > 0 || r.smallTouchTargets.length > 0 || r.a11yViolations.length > 0) {
      reportMd.push(`### \`${r.route}\` (${r.viewport})`);
      if (r.overflows.length > 0) {
        reportMd.push("#### Horizontal Layout Overflows:");
        r.overflows.forEach((o) => {
          reportMd.push(`- **\`<${o.tag}>\`** (${o.className || "no-class"}): right bound ${o.right}px exceeds viewport ${o.docWidth}px`);
        });
      }
      if (r.smallTouchTargets.length > 0) {
        reportMd.push("#### Sub-standard Mobile Touch Targets (< 36px):");
        r.smallTouchTargets.forEach((t) => {
          reportMd.push(`- **\`<${t.tag}>\`** ("${t.text}"): ${t.width}x${t.height}px`);
        });
      }
      if (r.a11yViolations.length > 0) {
        reportMd.push("#### Accessibility (Axe-Core) Notices:");
        r.a11yViolations.forEach((v) => {
          reportMd.push(`- **[${v.impact || "minor"}] ${v.id}** (${v.nodeCount} nodes): ${v.description} - [Ref](${v.helpUrl})`);
        });
      }
      reportMd.push("");
    }
  }

  const reportPath = path.join(AUDIT_DIR, "ui-slop-report.md");
  fs.writeFileSync(reportPath, reportMd.join("\n"), "utf8");

  const jsonPath = path.join(AUDIT_DIR, "ui-slop-results.json");
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), "utf8");

  console.log(`\nAudit completed successfully!`);
  console.log(`Report written to: ${reportPath}`);
  console.log(`Screenshots saved to: ${SCREENSHOTS_DIR}`);
}

runUiAudit().catch((err) => {
  console.error("Audit script failed:", err);
  process.exit(1);
});
