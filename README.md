# Turf

A React + Vite web application for booking and managing turf availability.

## Project structure

- `Client/` - front-end application built with React, Vite, and Tailwind CSS.
- `Client/src/` - React source files, including components, pages, hooks, and context.
- `Client/package.json` - project dependencies and scripts.
- `server/` - Node.js + Express backend API for admin login and bookings.
- `server/data/bookings.json` - file-based booking storage used by the backend.

## Getting started

1. Open a terminal in the root directory.
2. Install dependencies:

```bash
npm install
```

3. Start the backend:

```bash
npm --prefix server run dev
```

4. In another terminal, start the frontend:

```bash
npm --prefix Client run dev
```

5. Open the local URL shown in the terminal.

## Available scripts

From the project root:

- `npm run build` - build the React production assets
- `npm start` - start the Express server and serve the built React app

From the `Client/` directory:

- `npm run dev` - start the Vite development server
- `npm run lint` - run code linting with `oxlint`

From the `server/` directory:

- `npm run dev` - start the backend with Node watch mode
- `npm start` - start the backend normally

## Render deployment

This app should be deployed as one Render **Web Service**. The Express backend serves the API and also serves the built React frontend from `Client/dist`.

### 1. Push the project to GitHub

From the `Turf_Management` folder:

```bash
git add .
git commit -m "Add Express backend for turf bookings"
git push
```

### 2. Create a Render Web Service

1. Open the Render dashboard.
2. Click `New`.
3. Select `Web Service`.
4. Connect your GitHub repository.
5. Select the branch you want to deploy, usually `main`.

### 3. Configure the service

Use these settings:

- Runtime: `Node`
- Root Directory: `Turf_Management` if your repo contains this folder. Leave empty if the repo root is already `Turf_Management`.
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

### 4. Add environment variables

In Render, open the service's `Environment` section and add:

```txt
ADMIN_USERNAME=Saif
ADMIN_PASSWORD=Saif@78
ADMIN_TOKEN=replace-this-with-a-long-random-secret
CLIENT_ORIGIN=*
```

`ADMIN_TOKEN` should be a long private value. Example:

```txt
ADMIN_TOKEN=saif-turf-admin-secret-2026-change-this-value
```

### 5. Deploy

Click `Create Web Service`. Render will install dependencies, build the React app, and start the Express server.

After deployment, open your Render URL:

```txt
https://your-service-name.onrender.com
```

### 6. Admin login

Open:

```txt
https://your-service-name.onrender.com/admin
```

Login with:

```txt
Username: Saif
Password: Saif@78
```

After successful login, the app redirects to:

```txt
/dashboard
```

The admin can create, edit, delete, export, and print bookings from the dashboard.

### Important storage note

This project intentionally does not use a database. Bookings are stored in:

```txt
server/data/bookings.json
```

All phones and computers will share booking data through the backend API. On Render, normal service files can be lost after redeploys or restarts. Add a Render persistent disk if you want `bookings.json` to survive reliably.

## Notes

The main application entry point is `Client/src/main.jsx` and the routing is handled through `react-router-dom`.
