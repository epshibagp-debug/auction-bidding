# 🔨 AuctionHub - Online Auction & Bidding Management Platform

> **Free Web Development Internship Online Task**  
> **Project Code:** `wd-auc-001`  
> **Platform Name:** AuctionHub

---

## 📌 Project Overview

**AuctionHub** is a comprehensive, frontend-only online auction platform where users can browse listings, list items for auction with multi-step validation, place bids with live increment rules, track bid histories, declare winners, manage categories, and review revenue reports.

This project was built strictly using **HTML5, CSS3, and Vanilla JavaScript** without requiring any backend frameworks or databases. All data persistence is handled natively using JavaScript data structures (arrays and objects) alongside browser `localStorage`.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic tags (`<nav>`, `<main>`, `<header>`, `<section>`, `<aside>`), modern form inputs, accessible markup.
- **CSS3**: Custom purple design system (`#7C3AED`, `#FFFFFF`, `#EDE7FF`), CSS Grid, Flexbox, smooth transitions, keyframe animations, dark mode theme support, and responsive media queries.
- **Vanilla JavaScript**: Complete client-side state management, CRUD functionality for auctions and categories, automated countdown timers, simulated real-time bidding updates, Chart.js integrations, and CSV report exports.
- **Font Awesome 6**: UI iconography.
- **Chart.js**: Interactive activity, category distribution, and revenue analytics charts.

---

## 📂 Project Structure

```text
internship_epshiba/
├── index.html       # Single-Page Application (SPA) structure with semantic sections
├── style.css        # Complete styling, purple theme, dark mode, responsive layout
├── script.js        # Data storage (arrays/objects), state management, auction & bid logic
└── README.md        # Comprehensive documentation & submission report
```

---

## 💾 Data Storage Approach (No Database Required)

Data is managed natively in client-side JavaScript using structured arrays and objects:

- **Auctions (`auctions`)**: JavaScript array of objects (`id`, `title`, `description`, `category`, `starting_price`, `current_price`, `start_date`, `end_date`, `status`, `seller_id`, `images`).
- **Bids (`bids`)**: JavaScript array of objects (`id`, `auction_id`, `bidder_id`, `amount`, `timestamp`, `status`).
- **Categories (`categories`)**: JavaScript array of objects (`id`, `name`, icon, `description`).
- **Users (`users`)**: JavaScript array of objects (`id`, `username`, `email`, `rating`, `join_date`).
- **User Data (`userData`)**: JavaScript object for simulated login and active session profile.
- **Local Storage (`localStorage`)**: Persists auctions, bids, categories, user profiles, watchlist, and settlement updates between browser sessions.

---

## 🚀 Key Features

### 1. Core Modules
- **Dashboard (`#dashboard`)**: Overview statistics, auction activity line charts, category distribution doughnut chart, active auctions feed, and live recent bids.
- **Create Auction (`#create-auction`)**: 4-step wizard form (Basic Info, Pricing & Duration, Media Upload/URL, and Review & Confirm) with bid increment calculator.
- **Auctions Catalog (`#auctions`)**: Live search, category filtering, auction status filter (Active, Upcoming, Closed, Sold), multi-criteria sorting, and Grid/List view toggle.
- **Auction Detail (`#auction-detail`)**: High-resolution image preview, condition, reserve prices, full bid history log, countdown timer, and seller information.
- **My Bids & Bid Management (`#bids`)**: Complete tabular bid log with filtering by status (`Winning`, `Outbid`, `Placed`, `Won`, `Lost`) and auction selector.
- **Categories (`#categories`)**: Category management with icons, item counts, color badges, and interactive category creation/editing.
- **My Winnings (`#winnings`)**: Winner declaration engine with settlement workflows and payment tracking.
- **My Dashboard (`#user-dashboard`)**: Profile view with tabs for My Bids, Won Items, Watchlist, Selling History, and Account Settings.
- **Reports & Analytics (`#reports`)**: Monthly revenue bar chart, bids per auction distribution, detailed data table, and instant CSV report export.

### 2. Bonus Features
- 🌙 **Dark Mode Toggle**: Instant dark theme with persistent preference in `localStorage`.
- ⏱️ **Live Countdown Timers**: Per-second countdown calculations for active and upcoming auctions.
- 🤖 **Auto-Bid Simulation**: Automated proxy bidding up to a user-specified ceiling limit.
- 💡 **Bid Increment Calculator**: Real-time suggested bid increments based on starting price.
- ❤️ **Watchlist / Favorites**: One-click toggling to save listings for later.
- 🔔 **Interactive Notification Center**: Real-time bidding activity and status alert feed.
- 📱 **Fully Responsive Layout**: Adaptive sidebar navigation with mobile hamburger menu and overlays.

---

## 👥 Demo User Accounts

You can log in directly using one-click demo buttons on the auth screen:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@auction.com` | `admin123` |
| **Seller** | `seller@auction.com` | `seller123` |
| **Buyer** | `buyer@auction.com` | `buyer123` |

---

## 💻 Quick Start & Running Locally

1. Clone or download the repository files:
   ```bash
   git clone <repo-url>
   cd internship_epshiba
   ```
2. Open `index.html` in any modern web browser:
   - On Windows: Double-click `index.html` or run `Start-Process index.html` in PowerShell.
   - On macOS/Linux: Run `open index.html` or `xdg-open index.html`.
3. No server setup or `npm install` required!

---

## 📄 License & Attribution

Developed as part of the **Free Web Development Internship Online Task**.
All rights reserved © 2026 AuctionHub.



website link : https://epshibaauction.netlify.app/
