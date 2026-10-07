/**
 * Vite configuration.
 *
 * `base` is the GitHub Pages subpath (`/<repo>/`). It must match `SITE_URL` in
 * `lib/site.ts` and the `%BASE_URL%` references in `index.html`. Moving the
 * site to a custom domain or a repo-root deploy means changing both together.
 *
 * There is no PostCSS config and no `tailwind.config.js`: the `@tailwindcss/vite`
 * plugin handles the CSS-first Tailwind v4 pipeline declared inside
 * `src/index.css`.
 *
 * The `@` alias is declared here, in `tsconfig.json` and `tsconfig.app.json`,
 * and in `components.json` for the shadcn CLI. All three must agree.
 */
import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "src"),
    },
  },
})