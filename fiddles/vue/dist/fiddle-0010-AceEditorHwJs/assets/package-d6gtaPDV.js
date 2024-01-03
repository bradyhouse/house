const e=`{
  "name": "fiddle-0010-AceEditorHwJs",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "VITE_CJS_IGNORE_WARNING=true vite",
    "build": "VITE_CJS_IGNORE_WARNING=true vite build",
    "preview": "VITE_CJS_IGNORE_WARNING=true vite preview",
    "test:unit": "VITE_CJS_IGNORE_WARNING=true vitest",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "ace-builds": "^1.32.3",
    "bootstrap": "^5.3.2",
    "bootswatch": "^5.2.3",
    "jquery": "^3.7.1",
    "markdown-it-vue": "^1.1.7",
    "marked": "^11.0.0",
    "pinia": "^2.0.32",
    "popper.js": "^1.16.1",
    "vue": "^3.2.47",
    "vue-router": "^4.1.6",
    "vue3-ace-editor": "^2.2.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.31.1",
    "@rushstack/eslint-patch": "^1.2.0",
    "@vitejs/plugin-vue": "^5.0.0",
    "@vitejs/plugin-vue-jsx": "^3.0.0",
    "@vue/eslint-config-prettier": "^9.0.0",
    "@vue/test-utils": "^2.3.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.34.0",
    "eslint-plugin-vue": "^9.9.0",
    "jsdom": "^23.0.0",
    "postcss": "^8.4.32",
    "postcss-nesting": "^12.0.2",
    "postcss-preset-env": "^9.3.0",
    "prettier": "^3.0.0",
    "sass": "^1.69.6",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
`;export{e as default};
