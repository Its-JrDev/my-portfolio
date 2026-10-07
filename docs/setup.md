# Setup

Referencia rápida de mi entorno local y los comandos. No hay nada de despliegue aquí.

## Entorno

| Tool | Versión | Nota |
|---|---|---|
| Node.js | 22+ | Lo que fija el CI |
| npm | 10+ | El CI usa `npm ci` → el lockfile tiene que estar sincronizado |

Sin Docker, sin base de datos, sin variables de entorno. El sitio es 100% estático.

## Comandos

```bash
npm install      # dependencias
npm run dev      # dev server con HMR → http://localhost:5173
npm run build    # tsc -b (typecheck) y luego vite build → dist/
npm run preview  # sirve dist/ para comprobar el resultado final
npm run lint     # oxlint
```

**Antes de commitear, siempre los dos:**

```bash
npm run lint && npm run build
```

`npm run lint` **no** comprueba tipos. Son complementarios: la puerta real es `build`.

### Detalle de `build`

`tsc -b` corre **antes** que Vite — si el typecheck falla, no se genera `dist/`. Usa project references, así que solo recompila lo que cambió y guarda el estado en `node_modules/.tmp/`.

## Estructura de carpetas

```
my-portfolio/
├── index.html                  # Shell. Fija <html class="dark">, apunta a /src/main.tsx
├── vite.config.ts              # base path, plugins, alias @/
├── components.json             # Config del CLI de shadcn (style, aliases, registries)
├── .oxlintrc.json              # Reglas de oxlint
├── public/
│   ├── 404.html                # 404 estático para arrivals directos de GitHub Pages
│   ├── og-image.png / .svg     # Open Graph (se sirve el .png)
│   ├── cyber-icon.svg          # favicon
│   ├── my-portrait.png       # Ilustración del hero
│   └── projects/*.svg          # 5 portadas de proyecto
├── src/
│   ├── main.tsx                # createRoot + StrictMode + I18nProvider
│   ├── App.tsx                 # Layout: SiteHeader / main / SiteFooter
│   ├── index.css               # Tailwind v4 + tokens OKLCH + keyframes propios
│   ├── pages/home.tsx          # Compone Seo + las 5 secciones
│   ├── components/
│   │   ├── seo.tsx             # title, meta, Open Graph, Twitter Card
│   │   ├── site-header.tsx     # Nav fijo + switcher de idioma + menú móvil
│   │   ├── site-footer.tsx
│   │   ├── hero.tsx            # SIN id — ver known-issues
│   │   ├── about.tsx           # id="about"
│   │   ├── skills.tsx          # id="skills"
│   │   ├── featured-projects.tsx  # id="projects"
│   │   ├── contact.tsx         # id="contact"
│   │   └── ui/                 # 28 primitivas (shadcn + Magic UI)
│   ├── data/projects.ts        # ← EDITO AQUÍ para añadir proyectos
│   ├── hooks/use-header-scroll.ts
│   └── lib/
│       ├── site.ts             # Identidad, nav, skills, socials
│       ├── i18n.tsx            # Context + diccionarios en/es
│       └── utils.ts            # Re-export de `cn`
└── docs/
```

## TypeScript

No hay un `tsconfig.json` único con las opciones: es una solución con **project references**.

- `tsconfig.json` — solo declara referencias y el `paths` de `@/*`. No incluye archivos.
- `tsconfig.app.json` — aplica a `src/`.
- `tsconfig.node.json` — aplica a `vite.config.ts`.

Lo que importa en `tsconfig.app.json`:

| Opción | Valor | Por qué me importa |
|---|---|---|
| `verbatimModuleSyntax` | `true` | Obliga a `import type { X }` para tipos |
| `erasableSyntaxOnly` | `true` | Prohíbe `enum`, namespaces y parameter properties |
| `noUnusedLocals` / `noUnusedParameters` | `true` | Un import sin usar es **error de build**, no warning |
| `target` | `es2023` | Permite sintaxis moderna |
| `noEmit` | `true` | Vite transpila; TS solo verifica |
| `strict` | **no activado** | Si lo activase, `skill-graph.tsx` y `i18n.tsx` darían errores por posibles `null` |

## Alias

`@/` → `src/`, declarado en **tres** sitios que deben coincidir:

1. `vite.config.ts` → `resolve.alias`
2. `tsconfig.json` y `tsconfig.app.json` → `compilerOptions.paths`
3. `components.json` → `aliases` (para que el CLI de shadcn resuelva)

| Alias | Destino |
|---|---|
| `@/components` | `src/components` |
| `@/components/ui` | `src/components/ui` |
| `@/data` | `src/data` |
| `@/hooks` | `src/hooks` |
| `@/lib` | `src/lib` |
| `@/lib/utils` | `src/lib/utils` |

## Detalles de `index.html` que se me olvidan

- `<html lang="en" class="dark">` — **oscuro por defecto y fijo**. Nada de JS lo cambia al arrancar.
- El favicon usa `%BASE_URL%` (de Vite) — necesario por el subpath de GitHub Pages.
- El `<script src="/src/main.tsx">` **no** lleva `%BASE_URL%`, pero Vite lo reescribe en el build.
- Hay un `<meta name="theme-color" content="#09090b">` desfasado respecto al tema oscuro real, que es `oklch(0.17 0.012 55)`.

## Siguiente

[Arquitectura](architecture.md).
