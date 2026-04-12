# Frontend UI Rules (Next.js + shadcn/ui + Tailwind)

These rules govern ALL presentation-layer code.

---

## Core Principles

- UI must be built using shadcn/ui components as the base
- Styling must be done exclusively with Tailwind CSS
- Components must be composable, minimal, and predictable
- No additional UI frameworks or styling systems are allowed

---

## Allowed Technologies

- shadcn/ui (component base)
- Tailwind CSS (styling)
- Radix UI (only via shadcn)
- clsx / cn utility (for class composition)

---

## Prohibited

- No Material UI, Chakra UI, Ant Design, Bootstrap, etc.
- No CSS-in-JS (styled-components, emotion)
- No inline style objects unless absolutely necessary
- No global CSS except for Tailwind base layers
- No hardcoded styles outside Tailwind classes

---

## Component Rules

### Composition
- Prefer composition over large monolithic components
- Use shadcn primitives (Button, Card, Dialog, etc.)
- Do not reimplement existing shadcn components

### Structure
Each component must:
- Have a single responsibility
- Accept typed props
- Avoid internal business logic

### Example Pattern

```tsx
function MenuItemCard({ item, vote, onVote }) {
  return (
    <Card className="p-4 flex flex-col gap-2">
      <div className="font-medium">{item.name}</div>
      <div className="flex gap-2">
        <Button onClick={() => onVote(1)}>👍</Button>
        <Button onClick={() => onVote(-1)}>👎</Button>
      </div>
    </Card>
  );
}
```