export interface Project {
  title: string
  description: string
  tags: string[]
  image?: string
  deployUrl?: string
  githubUrl?: string
}

export const PROJECTS: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website built with HTML, CSS, and JavaScript. Showcases my skills and projects in a clean, cyber-themed design.",
    tags: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/Its-JrDev/my-portfolio",
  },
  {
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration using React and Node.js.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Weather App",
    description:
      "A simple weather application that fetches data from a weather API and displays current conditions and forecasts. Built with vanilla JavaScript.",
    tags: ["JavaScript", "API", "CSS"],
  },
  {
    title: "Task Manager",
    description:
      "A productivity app for managing tasks and to-do lists. Features include adding, editing, deleting tasks, and local storage for persistence.",
    tags: ["JavaScript", "LocalStorage", "CSS"],
  },
  {
    title: "Blog Platform",
    description:
      "A content management system for creating and publishing blog posts. Includes user authentication, rich text editing, and comment system.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Chat Application",
    description:
      "A real-time chat application built with WebSockets. Allows multiple users to join rooms and exchange messages instantly.",
    tags: ["Node.js", "WebSockets", "JavaScript"],
  },
]