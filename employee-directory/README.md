# Employee Directory

A simple React app that displays employees fetched from https://dummyjson.com/users, with search and a details page.

## Setup

1. Install dependencies:
   npm install

2. Run the app:
   npm run dev

3. Open the URL shown in the terminal (usually http://localhost:5173)

## Features
- Fetches employee data using fetch + useEffect
- Search bar filters by first name, last name, and email (instant filtering)
- Employee cards show avatar, name, job title, email, and a View Details button
- View Details navigates to a details page (React Router) with full employee info
- Loading spinner while fetching
- Error message with Retry button if the API fails
- Responsive layout using CSS Grid (works on mobile, tablet, desktop)
