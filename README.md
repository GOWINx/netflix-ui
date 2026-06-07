# 🎬 Netflix UI — Advanced Streaming Platform

A modern, responsive, and cinematic Netflix-inspired streaming interface built with **React.js**, **Vite**, and **Tailwind CSS**.

The application includes animated video banners, movie and TV-show collections, search functionality, reusable components, dynamic routing, local storage, sound controls, responsive layouts, and an advanced Netflix-style user interface.

## 🌐 Live Demo

### [▶ View Netflix UI Live](https://incredible-paletas-6a469a.netlify.app/)

---

## ✨ Project Preview

This project recreates a professional streaming-platform experience with:

* Cinematic video backgrounds
* Netflix-inspired responsive navigation
* Movies and TV-show pages
* Search and filtering
* Movie detail pages
* My List functionality
* Local storage support
* Background-video sound controls
* Play and pause controls
* Responsive movie sliders
* Advanced hover animations
* Mobile-friendly navigation
* Custom 404 page
* Netlify deployment support

---

## 🚀 Main Features

### 🎥 Cinematic Home Hero

The homepage contains an advanced video-based hero section with:

* Automatic muted playback
* Play and pause controls
* Sound on/off control
* Restart option
* Movie title, genres, match score and duration
* Add-to-list button
* Movie detail navigation
* Responsive video positioning
* Loading-state handling

### 🐉 Movies Page

The Movies page includes:

* Cinematic dragon video banner
* Rotated-video support
* Movie collection grid
* Movie search
* Add to My List
* Responsive cards
* Play, pause and sound controls
* Full HD and 4K metadata display

### ⚽ TV Shows Page

The TV Shows page includes:

* Namayar TV live-sports video banner
* World Cup coming-soon promotion
* Live coverage information
* Searchable TV-show collection
* Play, pause and sound controls
* Responsive TV-series cards
* Full HD metadata

### ❤️ My List

Users can:

* Add movies and TV shows to My List
* Remove saved titles
* Keep saved content after refreshing
* Clear the complete list
* View all saved titles in a responsive grid

My List data is stored using browser `localStorage`.

### 🔍 Search

Users can search titles using:

* Movie names
* TV-show names
* Genres

Search results update immediately using React state and `useMemo`.

### 📱 Responsive Design

The project is optimized for:

* Desktop computers
* Laptops
* Tablets
* Mobile devices

Tailwind CSS responsive classes are used throughout the project.

---

## 🛠️ Technologies Used

| Technology       | Purpose                                    |
| ---------------- | ------------------------------------------ |
| React.js         | Component-based frontend development       |
| Vite             | Fast development and production build tool |
| Tailwind CSS     | Responsive and utility-first styling       |
| React Router DOM | Page navigation and dynamic routes         |
| Lucide React     | Interface icons                            |
| React Icons      | Social-media icons                         |
| Local Storage    | Saving the user's movie list               |
| Netlify          | Hosting and continuous deployment          |
| GitHub           | Source-code version control                |

---

## 🧠 React Concepts Used

The project demonstrates:

* `useState`
* `useEffect`
* `useMemo`
* `useCallback`
* `useRef`
* Props
* Reusable components
* Conditional rendering
* Array filtering
* Array mapping
* Dynamic routes
* Local storage
* Event handling
* Responsive component design

---

## 📂 Project Structure

```text
netflix-ui/
├── public/
│   ├── images/
│   │   └── marvel/
│   └── videos/
│       ├── avatar.mp4
│       ├── dragon.mp4
│       └── namayar.mp4
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── BrowsePage.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieRow.jsx
│   │   └── Navbar.jsx
│   │
│   ├── data/
│   │   └── movies.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── Movies.jsx
│   │   ├── MyList.jsx
│   │   ├── NotFound.jsx
│   │   └── TvShows.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── README.md
├── netlify.toml
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/netflix-ui.git
```

### 2. Enter the project folder

```bash
cd netflix-ui
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application normally runs at:

```text
http://localhost:5173
```

---

## 📦 Production Build

Create a production build using:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files are stored inside:

```text
dist/
```

---

## 🌍 Netlify Deployment

This project is deployed using Netlify.

### Live URL

https://incredible-paletas-6a469a.netlify.app/

The deployment configuration is stored in:

```text
netlify.toml
```

Configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The redirect configuration allows React Router pages such as `/movies`, `/tv-shows`, `/my-list`, and `/movie/:id` to work after refreshing.

---

## 🗺️ Available Routes

| Route        | Page           |
| ------------ | -------------- |
| `/`          | Home           |
| `/movies`    | Movies         |
| `/tv-shows`  | TV Shows       |
| `/my-list`   | Saved titles   |
| `/movie/:id` | Movie details  |
| `*`          | Not Found page |

---

## 🎞️ Background Videos

The project uses locally stored MP4 files:

```text
public/videos/avatar.mp4
public/videos/dragon.mp4
public/videos/namayar.mp4
```

Video paths inside React components should not include the `public` folder name.

Correct:

```jsx
"/videos/avatar.mp4"
```

Incorrect:

```jsx
"/public/videos/avatar.mp4"
```

For better performance, background videos should be:

* MP4 format
* H.264 encoded
* Landscape orientation when possible
* Compressed for web delivery
* Below 20–40 MB when possible
* Muted during automatic playback

---

## 🔄 Updating the Deployed Website

After making changes, run:

```bash
git add .
git commit -m "Update Netflix UI"
git push
```

Netlify automatically detects the GitHub update, rebuilds the project, and publishes the latest version.

---

## 💡 Future Improvements

Possible future features include:

* User authentication
* Backend API integration
* Real movie API integration
* Trailer modal
* Continue-watching section
* Multiple user profiles
* Watch-history tracking
* Rating system
* Genre filters
* Dark and light themes
* Admin dashboard
* Video streaming backend
* Firebase or Supabase integration

---

## ⚠️ Disclaimer

This project is created for educational and portfolio purposes.

Netflix, Marvel, Avatar, movie titles, posters, videos, logos, and related trademarks belong to their respective owners. This project is not affiliated with or endorsed by Netflix or any movie studio.

Only use media files that you own or have permission to use.

---

## 👨‍💻 Developer

Developed as a React.js and Tailwind CSS frontend project.

### Skills demonstrated

* React.js
* Tailwind CSS
* Responsive Web Design
* React Router
* JavaScript
* UI/UX Design
* Git and GitHub
* Netlify Deployment

---

## ⭐ Support

If you found this project useful, consider giving the GitHub repository a star.

### [▶ Open Live Website](https://incredible-paletas-6a469a.netlify.app/)
