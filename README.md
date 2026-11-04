# CLBU & PAstU — Astronomy Dashboard

A feature-rich, responsive astronomy dashboard built from scratch. It provides real-time space weather, live ISS tracking, an interactive sky map, and daily NASA imagery.

**🔴 Live Demo:** [https://clbu-pastu.netlify.app] *(e.g., https://clbu-pastu.netlify.app)*

---

## 📖 The Story
This project wasn't just about writing code. It was an exercise in overcoming hardware limitations. **Every single line of this code was written, compiled, and deployed entirely on an Android phone (Redmi 9i)** using **Acode** for editing and **Termux** for the Linux environment, Git, and Vite build process. No laptop was used.

## ✨ Key Features
*   **NASA APOD:** Fetches the Astronomy Picture of the Day (cached to prevent API rate limits).
*   **Live Astroweather:** Uses Open-Meteo to display cloud cover and temperature in Pune.
*   **ISS Tracker:** Polls the ISS API every 3 seconds to show real-time location, altitude, and velocity.
*   **Interactive Sky Map:** Embeds VirtualSky to display live constellations and planets based on the user's exact coordinates.
*   **Red Night Mode:** A custom CSS filter that turns the entire UI red to preserve the user's night vision during actual stargazing.
*   **Scrolling Alert Ticker:** A retro LED-style notice board for community announcements.

## 🛠️ Tech Stack
*   **Frontend:** React 18, Vite
*   **Styling:** Vanilla CSS (Custom themes, Flexbox, CSS Grid, Animations)
*   **Environment:** Android + Termux (Alpine Linux)
*   **Deployment:** Netlify

## 📂 Project Structure
The codebase is highly modular, using custom hooks and separated components for clean maintainability:
```text
src/
├── components/       # Reusable UI parts (Panel, Footer, Tabs)
├── hooks/            # Custom logic (useNightMode)
├── config.js         # Centralized configuration (Pune Coordinates)
├── App.jsx           # Main layout and State router
└── App.css           # Global design system
and more