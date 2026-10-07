/**
 * Application entry point.
 *
 * Mount order matters: `I18nProvider` sits above `App` so `useTranslation()`
 * works from any component, including the header's `LangSwitcher`, without
 * prop drilling.
 *
 * `StrictMode` double-renders effects in development. The header's scroll
 * listener and the canvas effects are idempotent and clean up correctly under
 * that behaviour.
 *
 * Imports `index.css`, which carries all Tailwind v4 configuration — there is
 * no `tailwind.config.js` and no PostCSS config.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from "./lib/i18n"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)
