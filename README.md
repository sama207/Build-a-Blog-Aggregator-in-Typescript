# 🐊 Gator -- RSS Feed Aggregator CLI

Gator is a command-line RSS feed aggregator built with **TypeScript**,
**Node.js**, **PostgreSQL**, and **Drizzle ORM**.

It allows users to:

-   👤 Register accounts
-   📡 Add RSS feeds
-   ➕ Follow feeds created by other users
-   🔄 Continuously scrape feeds in the background
-   🗄 Store posts in a PostgreSQL database
-   📰 Browse the latest posts directly from the terminal

------------------------------------------------------------------------

## 🚀 Features

-   User registration & login system
-   Many-to-many feed following
-   Background feed aggregation loop
-   Duplicate-safe post storage
-   Configurable browse limits
-   Graceful shutdown with Ctrl+C

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Node.js
-   TypeScript
-   PostgreSQL
-   Drizzle ORM
-   tsx (for running TypeScript directly)

------------------------------------------------------------------------

## 📦 Requirements

Make sure you have installed:

-   Node.js (v18+ recommended)
-   npm
-   PostgreSQL
-   Git

------------------------------------------------------------------------

## 🗄 Database Setup

1.  Start PostgreSQL.
2.  Create a database:

``` sql
CREATE DATABASE gator;
```

3.  Run migrations:

``` bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

------------------------------------------------------------------------

## ⚙️ Configuration

Gator uses a config file located at:

    ~/.gatorconfig.json

Example:

``` json
{
  "currentUserName": "your-username"
}
```

This file is automatically created or updated when registering a user.

------------------------------------------------------------------------

## 📥 Installation

Clone the repository:

``` bash
git clone https://github.com/YOUR_USERNAME/gator.git
cd gator
```

Install dependencies:

``` bash
npm install
```

------------------------------------------------------------------------

## ▶️ Running the CLI

All commands use:

``` bash
npm run start <command> [arguments]
```

------------------------------------------------------------------------

# 📚 Commands

## 🔄 Reset Database

``` bash
npm run start reset
```

------------------------------------------------------------------------

## 👤 Register a User

``` bash
npm run start register <username>
```

Example:

``` bash
npm run start register kahya
```

------------------------------------------------------------------------

## 📡 Add a Feed

Adds a new RSS feed and automatically follows it.

``` bash
npm run start addfeed "<feed name>" "<feed url>"
```

Example:

``` bash
npm run start addfeed "Hacker News RSS" "https://news.ycombinator.com/rss"
```

------------------------------------------------------------------------

## ➕ Follow a Feed

``` bash
npm run start follow "<feed url>"
```

------------------------------------------------------------------------

## 📜 Show Followed Feeds

``` bash
npm run start following
```

------------------------------------------------------------------------

## 📰 Browse Posts

Browse the latest posts from followed feeds.

Default limit: 2 posts.

``` bash
npm run start browse
```

Custom limit:

``` bash
npm run start browse 10
```

Posts are ordered by most recent first.

------------------------------------------------------------------------

## 🔁 Run Feed Aggregator (Background Scraper)

Start continuous scraping:

``` bash
npm run start agg <interval>
```

Examples:

``` bash
npm run start agg 5s
npm run start agg 1m
npm run start agg 1h
```

Supported time units:

-   ms (milliseconds)
-   s (seconds)
-   m (minutes)
-   h (hours)

Stop safely using:

Ctrl + C

------------------------------------------------------------------------

# 🧠 How Aggregation Works

-   The oldest (or never-fetched) feed is selected.
-   The RSS feed is fetched.
-   New posts are inserted into the database.
-   Duplicate posts are skipped automatically.
-   The feed's last_fetched_at is updated.
-   The process repeats based on your interval.

------------------------------------------------------------------------

# 🗂 Project Structure (Simplified)

    src/
     ├── commands/
     ├── lib/
     │    ├── db/
     │    │    ├── schema.ts
     │    │    ├── queries/
     │    │    └── migrations/
     ├── feed.ts
     ├── index.ts

------------------------------------------------------------------------

# 🌍 Example RSS Feeds

-   Hacker News: https://news.ycombinator.com/rss
-   TechCrunch: https://techcrunch.com/feed/
-   Boot.dev Blog: https://blog.boot.dev/index.xml

------------------------------------------------------------------------

# 📌 Notes

-   Be respectful when choosing scraping intervals.
-   Posts are deduplicated via a unique URL constraint.
-   The aggregator is intended to run in the background.

------------------------------------------------------------------------

# 👩‍💻 Author

Built as part of a TypeScript backend learning project.

------------------------------------------------------------------------

# 📄 License

Educational use.
