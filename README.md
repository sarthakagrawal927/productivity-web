## Getting Started

![AI Generated](https://ai-percentage-pin.vercel.app/api/ai-percentage?value=10)
![AI PRs Welcome](https://ai-percentage-pin.vercel.app/api/ai-prs?welcome=yes)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Notes
writing forms from scratch + their validation is a pain, just use a library



project structure

.
- pages
- - _app.tsx
- - api
- - - auth
- - - - [...nextauth].ts
- src
- - hooks
- - - useActorActive.ts
- - - useOptimisticResult.ts
- - components
- - - common
- - - - SelectDropdown.tsx
- - - - CustomTable.tsx
- - - - Navbar.tsx
- - - - Badge.tsx
- - - - Graphs
- - - - - LogsBarGraph.tsx
- - - - CustomModal.tsx
- - - - ErrorComponent.tsx
- - - - Typography.tsx
- - - - CustomForm.tsx
- - - auth
- - - - signInHandler.tsx
- - - Habit
- - - - index.tsx
- - - - HabitList.tsx
- - - - HabitForm.tsx
- - - - SingleHabit.tsx
- - - - HabitLogs.tsx
- - - - ConsumablesForm.tsx
- - - - LogModal.tsx
- - - - ConsumablesList.tsx
- - - test.tsx
- - - Relations
- - - - atom.tsx
- - - - atom.scss
- - - Todo
- - - - index.tsx
- - - - TodoForm.tsx
- - - - TaskListComponent.tsx
- - - Journal
- - - - index.tsx
- - - - JournalForm.tsx
- - types
- - - helpers.ts
- - - index.ts
- - - entities.ts
- - utils
- - - helpers.ts
- - - entityHelpers.ts
- - - api.ts
- - - auth.ts
- - - constants.ts
- - app
- - - relations
- - - - page.tsx
- - - layout.tsx
- - - journal
- - - - page.tsx
- - - favicon.ico
- - - habit
- - - - logs
- - - - - [ID]
- - - - - - page.tsx
- - - - page.tsx
- - - todo
- - - - page.tsx
- - - profile
- - - - page.tsx
- - - page.tsx
- - - globals.css
- next-env.d.ts
- .env.example
- tsconfig.json
- .env.local
- README.md
- postcss.config.js
- .deepsource.toml
- .eslintrc.json
- SECURITY.md
- sweep.yaml
- package.json
- next.config.js
- package-lock.json