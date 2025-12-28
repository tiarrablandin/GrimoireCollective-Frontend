# Frontend - Grimoire Collective

Next.js frontend application for Grimoire Collective.

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **React**: React 19
- **UI Library**: Hero UI
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks

## Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running (default: http://localhost:8080)

## Getting Started

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

## Project Structure

```
frontend/
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout
│       ├── page.tsx            # Home page
│       ├── providers.tsx       # NextUI and theme providers
│       └── globals.css         # Global styles
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## Features

- Dark mode support with next-themes
- Hero UI component library
- TypeScript for type safety
- Tailwind CSS for styling
- API integration with backend

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Hero UI Documentation](https://www.heroui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
