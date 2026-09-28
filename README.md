# My Portfolio

Portfolio personal de **Jose D. Romero** (Its-JrDev), construido con **Vite + React + TypeScript + shadcn/ui** y blocks de los registries oficial y **Magic UI**. Desplegado en **GitHub Pages** con GitHub Actions.

> 📖 **[Documentación técnica](docs/README.md)** — arquitectura, decisiones, sistema de estilos, i18n, animación y catálogo de problemas conocidos.

## Stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [shadcn/ui](https://ui.shadcn.com/) (base `base-nova` sobre **Base UI**, iconos Tabler)
- [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first, sin `tailwind.config.js`
- [motion](https://motion.dev/) (re-export de framer-motion) — `BlurFade`, springs, `MotionValue`
- [d3-force](https://github.com/d3/d3-force) — grafo de skills
- Blocks de [Magic UI](https://www.magicui.design/) (blur-fade, text-animate, number-ticker, …)

> **Sin router.** La landing es una sola página con anclas (`#about`, `#skills`, `#projects`, `#contact`). `react-router-dom` sigue instalado pero no se importa en ningún archivo — ver [known-issues](docs/known-issues.md).

## Empezar

```bash
npm install        # instalar dependencias
npm run dev        # dev server en http://localhost:5173
npm run build      # typecheck (tsc) + build a dist/
npm run preview    # previsualizar el build
```

## Estructura

```
src/
├── App.tsx                       # Layout: SiteHeader / main / SiteFooter
├── main.tsx                      # createRoot + StrictMode + I18nProvider
├── index.css                     # Tailwind v4 + tokens OKLCH + keyframes propios
├── components/
│   ├── ui/                       # Componentes shadcn + Magic UI
│   ├── seo.tsx                   # <title>/<meta>/OG (React 19)
│   ├── site-header.tsx           # Nav + idioma + menú móvil (Sheet)
│   ├── site-footer.tsx
│   ├── hero.tsx / about.tsx / skills.tsx / featured-projects.tsx / contact.tsx
│   └── skill-graph.tsx           # en ui/ — grafo d3-force
├── data/
│   └── projects.ts               # ← EDITA AQUÍ tus proyectos
├── hooks/
│   └── use-header-scroll.ts      # Opacidad del header scroll-linked
├── lib/
│   ├── site.ts                   # Identidad, nav, skills, socials, SITE_URL
│   ├── i18n.tsx                  # Context + diccionarios en/es
│   └── utils.ts                  # Re-export de cn
└── pages/
    └── home.tsx                  # Compone Seo + las 5 secciones
```

## Añadir / editar proyectos

Edita `src/data/projects.ts`. Cada proyecto acepta:

```ts
{
  title: string
  description: string
  tags: string[]           // chips de tecnología
  headline?: string        // línea secundaria bajo el título
  metrics?: string         // línea de telemetría con punto naranja
  category?: "frontend" | "fullstack" | "realtime"
  image?: string           // ruta en public/, p.ej. "projects/ecommerce-cinematic.svg"
  deployUrl?: string       // opcional → botón "Live demo"
  githubUrl?: string       // opcional → botón "Code"
}
```

⚠️ **El grid es posicional, no por filtro:** `PROJECTS[0]` es el spotlight, `PROJECTS[1]` el secundario y `PROJECTS.slice(2, 5)` la fila de tres. Un sexto proyecto **no aparece** — habría que cambiar el slice en `featured-projects.tsx`.

- Si no hay `image`, la card muestra un placeholder.
- Si no hay `deployUrl` ni `githubUrl`, la card no muestra botones.
- Las imágenes van en `public/projects/` (créalas tú).

## Deploy a GitHub Pages

1. En el repo, **Settings → Pages → Source: "GitHub Actions"** (habilita el workflow).
2. Sube los cambios a `dev` o `main`: el workflow `.github/workflows/deploy.yml` construye y publica `dist/`.
3. El sitio queda en `https://its-jrdev.github.io/my-portfolio/`.

El `base` de Vite está fijado a `/my-portfolio/` en `vite.config.ts`. Si algún día publicas desde un dominio raíz, cámbialo a `/` **y** `SITE_URL` en `src/lib/site.ts`.

## Notas

- **Routing**: sin router. Navegación por anclas con `scrollIntoView({ behavior: "smooth" })` + `pushState`. `public/404.html` cubre rutas inexistentes.
- **SEO**: `<title>`/`<meta>` + Open Graph + Twitter Card vía `Seo` (React 19 hoisting). Requiere `public/og-image.png`, generado desde `og-image.svg`.
- **Tema**: solo oscuro. `index.html` fija `<html class="dark">` y **no hay toggle** — no existe componente de tema en `src/`. Ver [known-issues](docs/known-issues.md#b4--theme-never-persists-or-restores).
- **Idioma**: `en`/`es` vía `I18nProvider`. El switcher está en el header.

## Autor

Jose David Romero Lara — [GitHub](https://github.com/Its-JrDev) · [LinkedIn](https://www.linkedin.com/in/jose-romero-7b37353b6) · [Discord](https://discordapp.com/users/1178506619345190996)