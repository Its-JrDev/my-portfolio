import { useState, useEffect } from "react"
import {
  GITHUB_USERNAME,
  CONTRIBUTED_PROJECTS,
  FALLBACK_GITHUB_STATS,
} from "@/lib/site"

const CACHE_KEY = `github_kpi_stats_v2_${GITHUB_USERNAME}`
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export interface GitHubStatsState {
  ownRepos: number
  externalRepos: number
  totalProjects: number
  displayCount: number
  suffix: string
  isLoading: boolean
  isError: boolean
}

interface CachedPayload {
  ownRepos: number
  externalRepos: number
  totalProjects: number
  displayCount: number
  suffix: string
  timestamp: number
}

function getInitialStats(): GitHubStatsState {
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed: CachedPayload = JSON.parse(cached)
        // Verify cache format and TTL
        if (
          typeof parsed.totalProjects === "number" &&
          typeof parsed.displayCount === "number" &&
          Date.now() - parsed.timestamp < CACHE_TTL_MS
        ) {
          return {
            ownRepos: parsed.ownRepos,
            externalRepos: parsed.externalRepos,
            totalProjects: parsed.totalProjects,
            displayCount: parsed.displayCount,
            suffix: parsed.suffix ?? "+",
            isLoading: false,
            isError: false,
          }
        }
      }
    } catch {
      // Ignore localStorage read errors (e.g. private browsing restrictions)
    }
  }

  return {
    ownRepos: FALLBACK_GITHUB_STATS.ownRepos,
    externalRepos: FALLBACK_GITHUB_STATS.externalRepos,
    totalProjects: FALLBACK_GITHUB_STATS.totalProjects,
    displayCount: FALLBACK_GITHUB_STATS.displayCount,
    suffix: FALLBACK_GITHUB_STATS.suffix,
    isLoading: true,
    isError: false,
  }
}

export function useGithubStats() {
  const [stats, setStats] = useState<GitHubStatsState>(getInitialStats)

  useEffect(() => {
    // Check if we already have a valid cache that doesn't need refresh
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed: CachedPayload = JSON.parse(cached)
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          return
        }
      }
    } catch {
      // Continue to fetch if cache check fails
    }

    const controller = new AbortController()

    async function fetchGitHubData() {
      try {
        // 1. Fetch personal user profile
        let ownRepos = FALLBACK_GITHUB_STATS.ownRepos
        const userRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}`,
          {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github.v3+json" },
          }
        )

        if (userRes.ok) {
          const userData = await userRes.json()
          if (typeof userData.public_repos === "number") {
            ownRepos = userData.public_repos
          }
        }

        // 2. Fetch external contributions (organizations & collaborative repos like AlegrIA)
        const externalReposSet = new Set<string>(CONTRIBUTED_PROJECTS)

        try {
          const prsRes = await fetch(
            `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&per_page=100`,
            {
              signal: controller.signal,
              headers: { Accept: "application/vnd.github.v3+json" },
            }
          )

          if (prsRes.ok) {
            const prsData = await prsRes.json()
            if (Array.isArray(prsData.items)) {
              for (const item of prsData.items) {
                const repoUrl: string = item.repository_url || ""
                const repoFullName = repoUrl.replace(
                  "https://api.github.com/repos/",
                  ""
                )
                if (
                  repoFullName &&
                  !repoFullName.toLowerCase().startsWith(`${GITHUB_USERNAME.toLowerCase()}/`)
                ) {
                  externalReposSet.add(repoFullName)
                }
              }
            }
          }
        } catch {
          // If PR search is rate-limited (10 req/min for unauthenticated),
          // externalReposSet still retains CONTRIBUTED_PROJECTS cleanly.
        }

        const externalRepos = externalReposSet.size
        const totalProjects = ownRepos + externalRepos
        // Calculate decade baseline: e.g. 44 -> 40
        const displayCount = Math.floor(totalProjects / 10) * 10
        const suffix = "+"

        const newStats: GitHubStatsState = {
          ownRepos,
          externalRepos,
          totalProjects,
          displayCount,
          suffix,
          isLoading: false,
          isError: false,
        }

        setStats(newStats)

        // Save to cache
        try {
          const payload: CachedPayload = {
            ownRepos,
            externalRepos,
            totalProjects,
            displayCount,
            suffix,
            timestamp: Date.now(),
          }
          localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
        } catch {
          // Ignore write errors
        }
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return

        // On failure, keep fallback values without crashing
        setStats((prev) => ({
          ...prev,
          isLoading: false,
          isError: true,
        }))
      }
    }

    fetchGitHubData()

    return () => {
      controller.abort()
    }
  }, [])

  return stats
}
