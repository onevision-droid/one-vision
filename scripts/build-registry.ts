import fs from "node:fs";
import path from "node:path";

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
  content?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

interface RegistryConfig {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

function buildRegistry() {
  const rootDir = process.cwd();
  const registryJsonPath = path.join(rootDir, "registry.json");
  const publicRDir = path.join(rootDir, "public", "r");

  if (!fs.existsSync(publicRDir)) {
    fs.mkdirSync(publicRDir, { recursive: true });
  }

  const rawConfig = fs.readFileSync(registryJsonPath, "utf8");
  const config: RegistryConfig = JSON.parse(rawConfig);

  // Copy root registry.json to public/r/registry.json
  fs.writeFileSync(
    path.join(publicRDir, "registry.json"),
    JSON.stringify(config, null, 2) + "\n",
    "utf8"
  );
  console.log("Copied registry.json to public/r/registry.json");

  // Build individual item JSONs
  for (const item of config.items) {
    const itemFiles: RegistryFile[] = item.files.map((f) => {
      const fullPath = path.join(rootDir, f.path);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${fullPath} for item ${item.name}`);
      }
      const content = fs.readFileSync(fullPath, "utf8");
      return {
        path: f.path,
        content,
        type: f.type,
        target: f.target,
      };
    });

    const itemJson: Record<string, unknown> = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
    };

    if (item.dependencies && item.dependencies.length > 0) {
      itemJson.dependencies = item.dependencies;
    }
    if (item.devDependencies && item.devDependencies.length > 0) {
      itemJson.devDependencies = item.devDependencies;
    }
    if (item.registryDependencies && item.registryDependencies.length > 0) {
      itemJson.registryDependencies = item.registryDependencies;
    }

    itemJson.files = itemFiles;

    const outPath = path.join(publicRDir, `${item.name}.json`);
    fs.writeFileSync(outPath, JSON.stringify(itemJson, null, 2) + "\n", "utf8");
    console.log(`Generated public/r/${item.name}.json`);
  }

  console.log("Registry build complete.");
}

buildRegistry();
