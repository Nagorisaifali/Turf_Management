# Turf Client

A React + Vite front-end for turf booking and availability management.

## Overview

This client application is built with React, Vite, Tailwind CSS, and React Router.
It includes a booking flow, calendar availability, dashboard, gallery, and admin login.

## Project structure

- `src/` - React source files
- `src/components/` - reusable UI components
- `src/pages/` - top-level route pages
- `src/context/` - React context providers for booking, theme, and toast state
- `src/hooks/` - custom hooks for booking data and clock utilities
- `src/utils/` - helper utilities for dates, bookings, and storage

## Setup

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

## Notes

- Entry point: `src/main.jsx`
- Routing is configured using `react-router-dom`
- Uses `date-fns`, `react-calendar`, and `framer-motion`

## Useful links

- Vite: https://vitejs.dev/
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- React Router: https://reactrouter.com/
