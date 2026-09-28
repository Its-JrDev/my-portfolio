import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"
import { HomePage } from "@/pages/home"

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <HomePage />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  )
}

export default App