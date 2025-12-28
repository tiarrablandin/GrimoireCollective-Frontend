# Frontend Development Guidelines

## Overview
This is the Next.js/React frontend for Grimoire Collective. Follow these guidelines to maintain consistency and quality.

## Technology Stack
- **Framework**: Next.js 16.1.1 with Turbopack
- **React**: 19.2.3
- **Language**: TypeScript 5.9.3
- **UI Library**: Hero UI 2.8.7
- **Styling**: Tailwind CSS 4.1.18
- **Animation**: Framer Motion 12.23.26
- **Theme**: next-themes 0.4.6
- **HTTP Client**: axios 1.13.2

## Project Structure
```
frontend/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── providers.tsx      # Client-side providers
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   ├── layout/           # Layout components
│   │   └── features/         # Feature-specific components
│   ├── lib/                   # Utility functions
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript types
│   └── utils/                 # Helper functions
├── public/                    # Static assets
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Coding Standards

### TypeScript
- Use TypeScript for all files
- Define interfaces for all data structures
- Avoid `any` type - use `unknown` if type is uncertain
- Use type inference when possible
- Export types from a central `types/` directory

### React Best Practices
- Use functional components only (no class components)
- Prefer React hooks over class lifecycle methods
- Keep components small and focused (single responsibility)
- Extract reusable logic into custom hooks
- Use React Server Components (RSC) when possible

### Component Organization
```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@heroui/react';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// 3. Component
export function MyComponent({ title, onAction }: MyComponentProps) {
  // 4. Hooks
  const [isOpen, setIsOpen] = useState(false);
  
  // 5. Event handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
    onAction();
  };
  
  // 6. Render
  return (
    <Button onClick={handleClick}>
      {title}
    </Button>
  );
}
```

### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile`, `BookCard`)
- **Files**: kebab-case for non-components (e.g., `api-client.ts`)
- **Functions**: camelCase (e.g., `fetchUserData`, `formatDate`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth`, `useFetch`)

### Hero UI Components
- **Import from Hero UI**: `import { Button, Card } from '@heroui/react'`
- Use Hero UI components instead of building from scratch
- Customize with Tailwind classes when needed
- Follow Hero UI theming conventions

### Tailwind CSS 4
- Use Tailwind utility classes
- Configure theme in `globals.css` using `@theme` directive
- Avoid inline styles - use Tailwind classes
- Use semantic color names from theme
- Mobile-first responsive design

### State Management
- Use React hooks (useState, useReducer) for local state
- Consider Context API for shared state
- Use Server Components for data fetching when possible
- Minimize client-side state

### API Integration
- Use axios for HTTP requests
- Create API client utilities in `lib/api/`
- Handle errors gracefully
- Use environment variables for API endpoints
- Implement proper loading and error states

## File and Folder Structure

### Component Files
- One component per file
- Co-locate tests with components: `Button.tsx` + `Button.test.tsx`
- Co-locate styles if using CSS modules (we use Tailwind, so minimal)

### Naming Patterns
- Pages: `page.tsx` (App Router convention)
- Layouts: `layout.tsx` (App Router convention)
- Components: `ComponentName.tsx`
- Hooks: `use-hook-name.ts`
- Utils: `util-name.ts`
- Types: `types.ts` or `interfaces.ts`

## Styling Guidelines

### Tailwind 4 CSS-First Configuration
```css
@import "tailwindcss";

@theme {
  --color-primary: #your-color;
  --font-sans: system-ui, sans-serif;
}
```

### Responsive Design
- Mobile-first approach
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test on multiple screen sizes

### Dark Mode
- Use next-themes for theme switching
- Configure in `tailwind.config.ts`
- Test both light and dark modes

## Performance

### Optimization
- Use Next.js Image component for images
- Implement code splitting and lazy loading
- Minimize bundle size
- Use React.memo() for expensive renders
- Optimize re-renders with useMemo and useCallback

### Build Optimization
- Use Turbopack for faster builds
- Analyze bundle size: `npm run build`
- Remove unused dependencies

## Testing
- Write unit tests for components
- Test user interactions
- Test error states
- Use React Testing Library
- Aim for >70% coverage

## Accessibility (a11y)
- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper color contrast

## Environment Variables
- Prefix with `NEXT_PUBLIC_` for browser access
- Store in `.env.local` (gitignored)
- Required variables:
  - `NEXT_PUBLIC_API_URL` - Backend API URL

## Git Workflow
- Branch naming: `feature/{feature-name}`, `bugfix/{bug-name}`
- Commit messages: Use conventional commits
- Run `npm run build` before committing
- Check for TypeScript errors: `npm run type-check`

## Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Components are properly typed
- [ ] No console.log statements
- [ ] Responsive design implemented
- [ ] Accessibility considered
- [ ] Hero UI components used correctly
- [ ] Tailwind classes used (no inline styles)
- [ ] No sensitive data in code
- [ ] Build passes without errors

## Common Patterns

### Data Fetching (Server Component)
```typescript
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
    .then(res => res.json());
  
  return <div>{data.title}</div>;
}
```

### Client Component with State
```typescript
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Custom Hook
```typescript
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  
  return [value, setStoredValue] as const;
}
```

## Building and Running

### Development
```bash
npm run dev
# Runs on http://localhost:3000
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

### Type Check
```bash
npm run type-check
```

## Documentation
- Document complex components with JSDoc
- Keep README.md updated
- Document custom hooks
- Maintain component stories (if using Storybook)

## Questions?
Refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Hero UI Documentation](https://heroui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- Project's `COPILOT_INSTRUCTIONS.md` in root directory

---
**Last Updated**: December 28, 2025
