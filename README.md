# Employee Directory

A responsive React application that displays employee data from the [DummyJSON users API](https://dummyjson.com/users). It supports searching, sorting, pagination, favorites saved in local storage, dark/light themes, and employee detail routes.

## Live Demo

This checkout does not include a public deployment URL. Run `npm run dev` to use the local application at the URL shown by Vite. When deployed, replace this section with the public URL, for example:

`[View Employee Directory](https://your-public-deployment-url.example)`

## Screenshots

Screenshot files were not included in this checkout. Add the captured images to `screenshots/home.png` and `screenshots/details.png`, then use:

![Employee Directory Home](./screenshots/home.png)

![Employee Details](./screenshots/details.png)

## Features

- Fetches and validates employee data from a public API
- Search by first name, last name, or email
- Sort employees A-Z or Z-A
- Pagination with 10 employees per page
- Add and remove favorites with local storage persistence
- Dark and light mode toggle
- Cancellable API requests when routes or components unmount
- Responsive layout for desktop, tablet, and mobile
- Installable web app assets

## Technology Stack

- React 18
- React Router 6
- Vite 5
- Vitest for automated tests
- DummyJSON users API

## Requirements and Setup

- Node.js 18.0.0 or newer
- npm 9 or newer recommended

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Create a production build or preview it locally:

```bash
npm run build
npm run preview
```

## Deployment

The Vercel deployment dashboard is available at:

https://vercel.com/bit15/employee-directory/yKvX1YE6mzK7YGmFkbaADwWooJY8

## Testing

Run the automated test suite with:

```bash
npm test
```

The current tests cover trimmed search, name/email matching, A-Z and Z-A sorting, pagination, and favorite toggling. API error and route-level UI tests are recommended as the next expansion.

## Project Structure

```text
src/
  components/       Reusable cards, lists, controls, loading, and error states
  pages/            Directory home and employee details routes
  services/         API request functions and response validation
  utils/            Search, sorting, pagination, and favorite helpers
  App.jsx           Application routes and shared theme/favorites state
  main.jsx          React entry point and service worker registration
public/              Manifest and service worker assets
```

## Accessibility

Search has an explicit label, favorite buttons announce the employee and action, images include meaningful alt text, and image dimensions are declared to reduce layout shift. The interface also keeps controls keyboard accessible through native buttons, links, inputs, and selects.

## Known Limitations

- Employee data depends on the availability of DummyJSON and is not cached between sessions.
- The API currently returns the full dataset; server-side pagination would be preferable for much larger directories.
- A deployed URL and screenshots must be added for a complete deployment presentation.
