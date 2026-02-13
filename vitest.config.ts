import { defineConfig } from "vitest/config";
import path from "path";
import { config as loadEnv } from "dotenv";

const templateRoot = path.resolve(import.meta.dirname);

[".env", ".env.local", ".env.test"].forEach(file => {
  loadEnv({ path: path.resolve(templateRoot, file), override: file === ".env.test" });
});

export default defineConfig({
  root: templateRoot,
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "client", "src"),
      "@shared": path.resolve(templateRoot, "shared"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "server/**/*.spec.ts"],
  },
});
