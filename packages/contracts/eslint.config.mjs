import pluginJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["dist/**"],
  },

  {
    files: ["src/**/*.ts"],

    extends: [pluginJs.configs.recommended, tseslint.configs.recommended],

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },

    rules: {
      semi: "error",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "none",
          ignoreRestSiblings: true,
        },
      ],

      "no-undef": "off",
    },
  },
]);
