# My Portfolio

Personal portfolio website built with HTML, CSS, and JavaScript.

## Overview

This repository contains a small multi-page portfolio focused on practicing core frontend skills with a clean structure and reusable styles.

The site currently includes:

- a landing page with hero, about, and contact sections
- a projects page with a card-based layout
- a personal pets page
- responsive navigation for desktop and mobile
- lightweight JavaScript interactions for menu behavior, modal feedback, and scroll-to-top navigation

## Tech Stack

- HTML5
- CSS3
- JavaScript

## Project Structure

```text
my-portfolio/
|-- assets/
|   |-- icons/
|   `-- illustrations/
|-- css/
|   |-- styles.css
|   |-- index.css
|   |-- projects.css
|   `-- my_pets.css
|-- js/
|   `-- script.js
|-- index.html
|-- projects.html
`-- my_pets.html
```

## Pages

### `index.html`

Main entry point of the portfolio. It includes:

- hero section
- about section
- contact form
- social links
- success modal after form submission

### `projects.html`

Project showcase page with multiple cards and repository links.

### `my_pets.html`

Personal page with pet cards and a short pet-care section.

## Main Features

- sticky header navigation
- responsive hamburger menu
- shared design tokens through global CSS variables
- scroll-to-top button
- contact success modal
- separated page-specific stylesheets

## Recent Structural Changes

Compared with the previous commit, the latest refactor introduced these documented changes:

- stylesheets were moved into the `css/` directory
- JavaScript was centralized in `js/script.js`
- icons and illustrations were organized under `assets/`
- social media icons and contact UI were refined
- the page structure was aligned across all views

## Run Locally

1. Clone or download the repository.
2. Open `index.html` in your browser.

For a smoother development workflow, you can also serve the project with any simple local server.

## Notes

- This is a static frontend project.
- Some project links and content are still placeholder examples.
- The contact form currently provides UI feedback only and is not connected to a backend service.
- The pets page references placeholder images that should be replaced with real assets if needed.

## Author

Jose David Romero Lara
