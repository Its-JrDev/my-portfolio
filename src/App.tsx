import { useEffect } from "react"
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HomePage } from "@/pages/home"
import { ProjectsPage } from "@/pages/projects"
import { NotFoundPage } from "@/pages/not-found"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </HashRouter>
  )
}

export default App