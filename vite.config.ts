import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";

let gitHash = "unknown";

try {
  gitHash = execSync("git rev-parse --short HEAD")
    .toString()
    .trim();
} catch {}

const gitHashPlugin: Plugin = {
  name: 'inject-git-hash',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      return html.replace(/__GIT_HASH__/g, gitHash);
    }
  }
};


export default defineConfig({
  plugins: [
    gitHashPlugin,
    react(),
    svgr(),
    tailwindcss(),
  ],

  define: {
    __GIT_HASH__: JSON.stringify(gitHash),
  },

  css: {
    modules: {
      generateScopedName:
        "[name]__[local]--[hash:base64:5]",
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: false,
  },

  server: {
    open: true,
    hmr: {
      clientPort: 443,
    },
  },
});
