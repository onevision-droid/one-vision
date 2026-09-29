import fs from "node:fs";
import path from "node:path";

import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

interface StaticViolation {
  rule: string;
  severity: "error" | "warning";
  line: number;
  snippet: string;
  message: string;
}

interface JevEvaluation {
  lagomScore?: number;
  lagomConfidence?: number;
  designTone?: string;
  toneConfidence?: number;
  mobileRiskNoul?: number;
  a11yRiskNoul?: number;
}

interface FileAuditResult {
  filePath: string;
  relativePath: string;
  violations: StaticViolation[];
  jev?: JevEvaluation;
  status: "pass" | "warn" | "fail";
}

const ROOT_DIR = process.cwd();
const TARGET_DIRS = ["app", "components", "lib"];
const EXCLUDE_PATTERNS = [
  /\.test\.[tj]sx?$/,
  /\.spec\.[tj]sx?$/,
  /\.stories\.[tj]sx?$/,
  /\.d\.ts$/,
  /node_modules/,
  /\.next/,
  /storybook-static/,
  /testsprite_tests/,
];

// Anti-patterns from AGENTS.md and DESIGN.md
const ANTI_PATTERNS = [
  {
    id: "anti-pattern-excessive-radius",
    regex: /\brounded-(?:3xl|full)\b/g,
    severity: "warning" as const,
    message: "Avoid extreme cartoonish rounding on structural layout containers. Nordic Lagom prioritizes subtle, serene hairline structure and disciplined geometry.",
    filter: (line: string, filePath?: string) =>
      !/avatar|badge|pill|icon|checkbox|radio|pulse|dot|indicator/i.test(line) &&
      !/badge|avatar/i.test(filePath || ""),
  },
  {
    id: "anti-pattern-w-screen",
    regex: /(?<![a-zA-Z0-9_-])w-screen\b/g,
    severity: "error" as const,
    message: "Prohibited 'w-screen' class found. Causes horizontal scrollbar blowouts on Windows/mobile.",
  },
  {
    id: "anti-pattern-h-screen",
    regex: /(?<![a-zA-Z0-9_-])h-screen\b/g,
    severity: "warning" as const,
    message: "Potentially fragile 'h-screen' class found. Use 'min-h-dvh' or 'h-dvh' for resilient mobile viewport sizing.",
  },
  {
    id: "anti-pattern-overflow-x",
    regex: /\boverflow-x-auto\b/g,
    severity: "warning" as const,
    message: "'overflow-x-auto' found. Avoid masking layout overflows; ensure content fits within viewport.",
  },
  {
    id: "anti-pattern-huge-text",
    regex: /\btext-\[(?:1[0-9]|[2-9][0-9])rem\]/g,
    severity: "error" as const,
    message: "Excessive fixed rem text size found. Ensure headings use fluid responsive typography.",
  },
  {
    id: "anti-pattern-fixed-heading-width",
    regex: /<h[1-6][^>]*\bclass(?:Name)?=["'][^"']*\bw-\[\d+px\]/g,
    severity: "error" as const,
    message: "Fixed pixel width on heading element. Heading widths must be fluid or percentage-based.",
  },
];

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const fullPath = path.resolve(ROOT_DIR, dir);
  if (!fs.existsSync(fullPath)) return fileList;

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  for (const entry of entries) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!EXCLUDE_PATTERNS.some((p) => p.test(entry.name))) {
        getAllFiles(res, fileList);
      }
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      if (!EXCLUDE_PATTERNS.some((p) => p.test(res))) {
        fileList.push(res);
      }
    }
  }
  return fileList;
}

function auditFileStatic(filePath: string, content: string): StaticViolation[] {
  const violations: StaticViolation[] = [];
  const lines = content.split("\n");

  // Check each anti-pattern line by line
  lines.forEach((lineText, index) => {
    const lineNum = index + 1;
    for (const pattern of ANTI_PATTERNS) {
      if (pattern.filter && !pattern.filter(lineText, filePath)) continue;
      pattern.regex.lastIndex = 0;
      if (pattern.regex.test(lineText)) {
        violations.push({
          rule: pattern.id,
          severity: pattern.severity,
          line: lineNum,
          snippet: lineText.trim().slice(0, 120),
          message: pattern.message,
        });
      }
    }
  });

  // Hero section layout lock audit (AGENTS.md rule 8)
  const normPath = filePath.replace(/\\/g, "/");
  if (normPath.endsWith("components/content/Hero.tsx") || normPath.endsWith("components/composition/PageHero.tsx")) {
    const requiredHeroClasses = [
      "min-h-dvh",
      "aspect-square",
      "flex flex-col justify-center",
    ];
    for (const req of requiredHeroClasses) {
      if (!content.includes(req)) {
        violations.push({
          rule: "hero-layout-lock",
          severity: "error",
          line: 1,
          snippet: `Missing required class: ${req}`,
          message: `Hero layout lock violation: ${req} is immutable for all Hero sections.`,
        });
      }
    }
  }

  return violations;
}

async function auditWithJev(
  client: TypeSafeClient,
  relativePath: string,
  content: string
): Promise<JevEvaluation | null> {
  if (!client) return null;

  try {
    const stateContent = content.length > 8000 ? content.slice(0, 8000) + "\n...[truncated]" : content;

    const response = await client.systemOne({
      state: {
        file_path: relativePath,
        code: stateContent,
        design_system: "One Vision Nordic Lagom (Quiet Chrome, Balanced Whitespace, Hairline Dividers, Restrained Color Harmony)",
      },
      questions: {
        lagom_score: score(
          "Rate this component's adherence to Nordic Lagom principles: quiet chrome, generous breathing room, calm whitespace, hairline subtle borders, restrained typography, and understated refinement.",
          [
            "Violates Lagom: visually noisy, chaotic, garish colors, or cluttered furniture",
            "Moderate: acceptable layout but lacks breathing room or has abrasive contrast",
            "Good: clean and balanced with disciplined hierarchy",
            "Exemplary Nordic Lagom: quiet chrome, serene balance, generous whitespace, subtle hairline dividers, and calm typographic composure",
          ]
        ),
        design_tone: choice(
          "What brand tone and role does this file convey?",
          {
            nordic_lagom_calm: "Understated, serene, high-integrity data presentation with quiet chrome",
            harsh_abrasive_clutter: "Overly aggressive, jarring, visually overloaded, or sensory intense",
            neutral_utility_logic: "Pure programmatic utility, server action, or data logic without UI tone",
          }
        ),
        mobile_risk: noul(
          "Does this component layout or styling risk breaking or overflowing on narrow mobile screens (e.g. unconstrained widths, fixed row layouts without mobile wrapping, or hardcoded sizes)?"
        ),
        a11y_risk: noul(
          "Does this component exhibit accessibility concerns such as missing interactive labels, low-contrast text combinations, or keyboard navigation barriers?"
        ),
      },
    });

    const answers = response.answers;
    return {
      lagomScore: answers.lagom_score?.score,
      lagomConfidence: answers.lagom_score?.confidence,
      designTone: answers.design_tone?.choice,
      toneConfidence: answers.design_tone?.confidence,
      mobileRiskNoul: answers.mobile_risk?.noul,
      a11yRiskNoul: answers.a11y_risk?.noul,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn(`  [Jev Warning] ${relativePath}: ${errorMsg}`);
    return null;
  }
}

async function runAudit() {
  const args = process.argv.slice(2);
  const isStaticOnly = args.includes("--static-only");
  const specificFileArg = args.indexOf("--file");
  const specificFile = specificFileArg !== -1 ? args[specificFileArg + 1] : null;

  console.log("=========================================================");
  console.log("   ONE VISION CODEBASE AUDIT (Static + Jev System One)   ");
  console.log("=========================================================\n");

  const apiKey = process.env.TYPESAFE_API_KEY;
  let jevClient: TypeSafeClient | null = null;

  if (!isStaticOnly && apiKey && TypeSafeClient) {
    jevClient = new TypeSafeClient({ apiKey });
    console.log("✔ TypeSafe API key detected. Jev System One semantic evaluations ENABLED.\n");
  } else if (!apiKey && !isStaticOnly) {
    console.log("ℹ No TYPESAFE_API_KEY found in environment.");
    console.log("  Running deterministic static analysis now.");
    console.log("  To include Jev semantic evaluations, run with:");
    console.log("  $env:TYPESAFE_API_KEY='your-key'; pnpm run audit\n");
  }

  const files = specificFile
    ? [specificFile]
    : TARGET_DIRS.flatMap((dir) => getAllFiles(dir));

  console.log(`Found ${files.length} target files across [${TARGET_DIRS.join(", ")}].\nAuditing...\n`);

  const results: FileAuditResult[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fullPath = path.resolve(ROOT_DIR, file);
    if (!fs.existsSync(fullPath)) continue;

    const content = fs.readFileSync(fullPath, "utf-8");
    const staticViolations = auditFileStatic(file, content);

    const hasError = staticViolations.some((v) => v.severity === "error");
    const hasWarn = staticViolations.some((v) => v.severity === "warning");

    totalErrors += staticViolations.filter((v) => v.severity === "error").length;
    totalWarnings += staticViolations.filter((v) => v.severity === "warning").length;

    let jevResult: JevEvaluation | null = null;
    let jevFailed = false;
    if (jevClient) {
      process.stdout.write(`[${i + 1}/${files.length}] Evaluating with Jev: ${file}... `);
      jevResult = await auditWithJev(jevClient, file, content);
      process.stdout.write("Done.\n");
      if (!jevResult) {
        jevFailed = true;
        totalErrors++;
      } else if (jevResult.lagomScore === 0) {
        jevFailed = true;
        totalErrors++;
      }
    }

    const status = (hasError || jevFailed) ? "fail" : hasWarn ? "warn" : "pass";

    results.push({
      filePath: fullPath,
      relativePath: file,
      violations: staticViolations,
      jev: jevResult || undefined,
      status,
    });
  }

  // Generate Reports
  generateMarkdownReport(results, totalErrors, totalWarnings);
  fs.writeFileSync(
    path.join(ROOT_DIR, "audit-results.json"),
    JSON.stringify(results, null, 2),
    "utf-8"
  );

  console.log("\n=========================================================");
  console.log("                    AUDIT SUMMARY                        ");
  console.log("=========================================================");
  console.log(`Total Files Audited : ${results.length}`);
  console.log(`Passed Clean        : ${results.filter((r) => r.status === "pass").length}`);
  console.log(`Warnings            : ${results.filter((r) => r.status === "warn").length} (${totalWarnings} warning issues)`);
  console.log(`Failures            : ${results.filter((r) => r.status === "fail").length} (${totalErrors} error issues)`);
  console.log("=========================================================");
  console.log("Detailed report saved to: audit-report.md");
  console.log("Raw JSON saved to       : audit-results.json\n");

  if (totalErrors > 0) {
    console.log("❌ Audit completed with violations. Review audit-report.md for details.");
    process.exitCode = 1;
  } else {
    console.log("✔ Audit passed without critical errors!");
  }
}

function generateMarkdownReport(
  results: FileAuditResult[],
  totalErrors: number,
  totalWarnings: number
) {
  const failedFiles = results.filter((r) => r.status === "fail");
  const warnFiles = results.filter((r) => r.status === "warn");

  let md = `# Codebase Audit Report: One Vision\n\n`;
  md += `**Date:** ${new Date().toISOString()}  \n`;
  md += `**Total Files Audited:** ${results.length}  \n`;
  md += `**Critical Errors:** ${totalErrors}  \n`;
  md += `**Warnings:** ${totalWarnings}  \n\n`;

  md += `## Executive Summary\n\n`;
  md += `| Category | Count | Status |\n`;
  md += `| --- | --- | --- |\n`;
  md += `| Clean Files | ${results.filter((r) => r.status === "pass").length} | ✅ Pass |\n`;
  md += `| Files with Warnings | ${warnFiles.length} | ⚠️ Warning |\n`;
  md += `| Files with Critical Errors | ${failedFiles.length} | ❌ Fail |\n\n`;

  if (failedFiles.length > 0) {
    md += `## ❌ Critical Violations (Action Required)\n\n`;
    for (const item of failedFiles) {
      md += `### \`${item.relativePath}\`\n\n`;
      for (const v of item.violations.filter((v) => v.severity === "error")) {
        md += `- **Line ${v.line}** [${v.rule}]: ${v.message}\n`;
        md += `  \`\`\`tsx\n  ${v.snippet}\n  \`\`\`\n`;
      }
      if (item.jev) {
        md += `\n**Jev Evaluation:**\n`;
        md += `- Nordic Lagom Adherence Score: ${item.jev.lagomScore ?? "N/A"} / 3 (Confidence: ${item.jev.lagomConfidence ?? "N/A"})\n`;
        md += `- Tone: \`${item.jev.designTone ?? "N/A"}\`\n`;
        md += `- Mobile Risk Probability: ${item.jev.mobileRiskNoul ?? "N/A"}\n`;
      }
      md += `\n`;
    }
  }

  if (warnFiles.length > 0) {
    md += `## ⚠️ Warnings & Heuristic Flags\n\n`;
    for (const item of warnFiles) {
      md += `### \`${item.relativePath}\`\n\n`;
      for (const v of item.violations.filter((v) => v.severity === "warning")) {
        md += `- **Line ${v.line}** [${v.rule}]: ${v.message}\n`;
        md += `  \`\`\`tsx\n  ${v.snippet}\n  \`\`\`\n`;
      }
      md += `\n`;
    }
  }

  fs.writeFileSync(path.join(ROOT_DIR, "audit-report.md"), md, "utf-8");
}

runAudit().catch((err) => {
  console.error("Fatal error during audit:", err);
  process.exit(1);
});
