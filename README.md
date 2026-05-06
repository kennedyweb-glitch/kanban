# Kanban Board

A lightweight Kanban board for tracking Kennedy Center web work. It loads tasks from a Google Sheet, lets you drag cards between workflow columns, and stores notes locally in the browser.

## Features

- Four workflow columns: Not Started, In Progress, Waiting, and Done
- Drag and drop with Alpine Sort
- Click any card to open a detail modal
- Per-card notes saved with Alpine persist
- Done column removes a card from the frontend list
- Responsive layout with horizontal scrolling on smaller screens
- Google Fonts styling and a clean card-based interface

## Stack

- Vite
- Alpine.js
- `@alpinejs/persist`
- `@alpinejs/sort`

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

This starts the Vite dev server.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## How it works

- The app fetches rows from the configured Google Sheet in `src/main.js`.
- Items with an empty `Date Updated` value are loaded into the board.
- New rows are added to local state with a default `Not Started` status.
- Notes are stored in local browser persistence under the `kanbanNotes` key.
- Dragging cards between the three active lanes updates their status and order.
- Dropping a card into the red Done column deletes it from the frontend list.

## Project Structure

```text
.
├── index.html
├── src/
│   ├── main.js
│   └── main.css
├── package.json
├── vite.config.js
└── README.md
```

## Notes

- The board depends on the Google Sheet configured in `src/main.js`.
- Local notes and board state are browser-persisted, so clearing site storage will reset them.
- If you change the sheet structure, update the parsing logic in `src/main.js`.
