module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
    },
    "rules": {
        "indent": [
            "error",
            4,
        ],
        "max-len": [
            "error", 120
        ],
        "linebreak-style": [
            "error",
            "unix",
        ],
        "quotes": [
            "error",
            "double",
        ],
        "semi": [
            "error",
            "always",
        ],
        "array-bracket-newline": [
            "error", "always",
        ],
        "comma-dangle": [
            "error", "only-multiline",
        ],
    },
    "plugins": [
    ],
};
