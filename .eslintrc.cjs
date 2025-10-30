module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "@typescript-eslint/explicit-module-boundary-types": ["error"],
        "@typescript-eslint/typedef": [
            "error",
            {
                "parameter": true,
                "arrowParameter": true,
                "memberVariableDeclaration": true,
                "propertyDeclaration": true
            }
        ]
    }
}
