# Uzbekistan Population Dynamics

An analytics dashboard visualizing the growth of Uzbekistan's population from 1991 to 2026, built as a frontend developer test task. The app renders a stat overview, a responsive line chart, a filterable data table, and lets users export the dashboard as an A4 PDF or download the underlying data as CSV.

## Tech stack

- **React 19 + TypeScript** - component architecture and type safety
- **Vite** - build tooling and dev server
- **Tailwind CSS v4** - styling, design tokens defined in `src/index.css`
- **Apache ECharts** (`echarts-for-react`) - the population line chart
- **Axios** - HTTP client, configured with a custom mock adapter (see below)
- **jsPDF + html2canvas** - client-side PDF generation
- **PapaParse** - CSV generation

## Getting started

\`\`\`bash
npm install
npm run dev
\`\`\`

The app runs at `http://localhost:5173`.

Other scripts:

\`\`\`bash
npm run build     # type-check and produce a production build in dist/
npm run preview   # preview the production build locally
npm run lint      # run oxlint
\`\`\`

## Project structure

\`\`\`
src/
  api/            axios instance + mock adapter, population API service
  components/     UI building blocks (chart, filters, cards, states, table)
  context/        theme (dark/light) context
  data/           static population dataset used by the mock API
  hooks/          usePopulationData, useUrlFilterState
  types/          shared TypeScript types
  utils/          PDF export, CSV export
\`\`\`

## Mock API

There is no real backend. `src/api/client.ts` creates an Axios instance with a **custom adapter** that intercepts requests the same way a real HTTP call would, waits ~650ms to simulate network latency, and resolves with the local dataset in `src/data/population.json`. `src/api/populationApi.ts` exposes a `fetchPopulation()` function that the rest of the app calls exactly as it would call a real `GET /api/population` endpoint - so swapping in a real backend later only means replacing the adapter, not any application code.

For testing UI states, two query params force specific responses:

- `?simulateError=1` - forces the request to reject (used to see the error state)
- `?simulateEmpty=1` - forces the request to resolve with an empty dataset (used to see the empty state)

### Data source

The population figures are compiled from publicly available World Bank (`SP.POP.TOTL`), UN World Population Prospects (2024 Revision), and Macrotrends historical series, interpolated between known yearly anchor points for a smooth, realistic curve. The 2026 value is a projection. This is demo data for the purposes of this task, not an official government dataset - see `src/data/population.json` for the `source` field.

## PDF export

Clicking **Download PDF**:

1. Captures the stats + chart section of the dashboard with `html2canvas`.
2. Builds an A4 document with `jsPDF`: a title header ("Uzbekistan Population Dynamics"), the selected year range, the captured chart image, a key-figures table (population, initial population, total growth, growth %), and a generated-on timestamp.
3. Saves the file as `uzbekistan-population-1991-2026.pdf`.

The export always uses this filename, regardless of the currently selected filter range, per the task spec.

## Features

- Line chart (ECharts) of population by year, with hover tooltips, smooth curve, and area fill
- Stat cards: current population, initial population, total growth, growth %
- Range filtering: three presets (1991-2026, 2000-2026, 2010-2026) plus a validated custom range
- Loading (skeletons), error (with retry), and empty states
- Responsive layout, desktop and mobile
- Dark / light mode toggle (persisted to `localStorage`)
- Searchable, collapsible year-by-year data table
- CSV export of the currently filtered range
- Filter state persisted to the URL query string, so a filtered view can be shared/bookmarked
