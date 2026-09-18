# My Portfolio

Portfolio personal de **Jose D. Romero** (Its-JrDev), construido con **Vite + React + TypeScript + shadcn/ui** y blocks de los registries oficial y **Magic UI**. Desplegado en **GitHub Pages** con GitHub Actions.

## Stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [shadcn/ui](https://ui.shadcn.com/) (base `base-nova`, iconos Tabler)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [react-router-dom](https://reactrouter.com/) (`HashRouter` — el router más compatible con GitHub Pages, sin fallback de servidor)
- Blocks de [Magic UI](https://www.magicui.design/) (marquee, blur-fade, text-animate, grid-pattern, sparkles-text, number-ticker, shimmer-button, shine-border, bento-grid, animated-theme-toggler)

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
├── App.tsx                      # Router (HashRouter) + layout base
├── components/
│   ├── ui/                      # Componentes shadcn + Magic UI
│   ├── seo.tsx                  # <title>/<meta>/OG por ruta (React 19)
│   ├── site-header.tsx          # Nav + tema + menú móvil (Sheet)
│   ├── site-footer.tsx
│   ├── hero.tsx / about.tsx / contact.tsx
│   └── project-card.tsx         # Card con imagen, tags y links condicionales
├── data/
│   └── projects.ts              # <-- EDITA AQUÍ tus proyectos
├── lib/
│   └── site.ts                  # Datos del sitio (nombre, socials, SITE_URL)
└── pages/
    ├── home.tsx / projects.tsx / not-found.tsx
```

## Añadir / editar proyectos

Edita `src/data/projects.ts`. Cada proyecto acepta:

```ts
{
  title: string
  description: string
  tags: string[]           // tecnologías (se muestran como Badges)
  image?: string           // ruta en public/, p.ej. "projects/ecommerce.png"
  deployUrl?: string       // opcional → muestra botón "Live demo"
  githubUrl?: string       // opcional → muestra botón "Code"
}
```

- Si no hay `image`, la card muestra un placeholder.
- Si no hay `deployUrl` ni `githubUrl`, la card no muestra botones.
- Las imágenes van en `public/projects/` (créalas tú).

## Deploy a GitHub Pages

1. En el repo, **Settings → Pages → Source: "GitHub Actions"** (habilita el workflow).
2. Sube los cambios a `dev` o `main`: el workflow `.github/workflows/deploy.yml` construye y publica `dist/`.
3. El sitio queda en `https://its-jrdev.github.io/my-portfolio/`.

El `base` de Vite está fijado a `/my-portfolio/` en `vite.config.ts`. Si algún día publicas desde un dominio raíz, cámbialo a `/`.

## Notas

- **Routing**: se usa `HashRouter` porque GitHub Pages no reescribe rutas de SPA: cualquier fallo de ruta lo cubre la página `NotFound` interna y `public/404.html` para archivos inexistentes.
- **SEO mínimo**: title/description por ruta + Open Graph (requiere `public/og-image.png`, generado desde `og-image.svg`).
- **Tema**: oscuro por defecto, toggle animado (componente `animated-theme-toggler` de Magic UI). Persistencia en `localStorage` (`theme`).

## Autor

Jose David Romero Lara — [GitHub](https://github.com/Its-JrDev) · [LinkedIn](https://www.linkedin.com/in/jose-romero-7b37353b6) · [Discord](https://discordapp.com/users/1178506619345190996)