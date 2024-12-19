module.exports = {
    root: true,  // Optional: marks this file as the root of the ESLint configuration
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      "eslint:recommended", 
      "plugin:@typescript-eslint/recommended", // Using TypeScript rules
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
      "no-unused-vars": "warn",  // Adjust rules as needed
      "@typescript-eslint/no-explicit-any": "off", // Turn off specific rules
    },
  };
  