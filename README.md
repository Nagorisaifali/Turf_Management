# Turf

A React + Vite web application for booking and managing turf availability.

## Project structure

- `Client/` - front-end application built with React, Vite, and Tailwind CSS.
- `Client/src/` - React source files, including components, pages, hooks, and context.
- `Client/package.json` - project dependencies and scripts.

## Getting started

1. Open a terminal in the root directory.
2. Change into the client folder:

```bash
cd Client
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL shown in the terminal.

## Available scripts

From the `Client/` directory:

- `npm run dev` - start the development server
- `npm run build` - build the production assets
- `npm run preview` - preview the production build locally
- `npm run lint` - run code linting with `oxlint`

## Notes

The main application entry point is `Client/src/main.jsx` and the routing is handled through `react-router-dom`.
