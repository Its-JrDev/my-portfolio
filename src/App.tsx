/**
 * Root layout.
 *
 * No router: this is a single-page landing composed of anchor sections. `main`
 * is `flex-1` so the footer sits at the bottom of a short viewport, and carries
 * `id="main"` as a focus target.
 *
 * `SiteHeader` is fixed, which is why every section that the nav links to needs
 * `scroll-mt-16` to clear its 4rem height. Only `#projects` has it.
 */
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HomePage } from "@/pages/home"

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <HomePage />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App