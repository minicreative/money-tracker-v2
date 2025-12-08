import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    basePath: "backend",
    ignores: ["node_modules/**", "dist/**"],
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        tsconfigRootDir: "/backend/tsconfig.json"
      }
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended
    ],
    overrides: [
      {
        files: ["**/*.test.ts"],
        rules: {
          "@typescript-eslint/no-explicit-any": "off",
        },
      },
    ],
  },
  {
    basePath: "frontend",
    ignores: ["node_modules/**", "dist/**"],
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        tsconfigRootDir: "/frontend/tsconfig.json"
      }
    },
    plugins: {
      react: pluginReact
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      pluginReact.configs.flat.recommended
    ],
    rules: {
      "react/react-in-jsx-scope": "off"
    }
  },
]);
