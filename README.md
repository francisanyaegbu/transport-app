This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Supabase configuration

Authentication and user profiles are handled with Supabase. Before running the app you must:

1. Create a free project at https://app.supabase.com and copy the `URL` and `anon` key into environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Open the SQL editor (or Table editor) and create a `profiles` table with a schema similar to:
   ```sql
   create table profiles (
     id uuid primary key references auth.users(id) on delete cascade,
     first_name text,
     last_name text,
     phone text,
     role text,
     vehicle_type text,
     license_plate text,
     vest_number text,
     created_at timestamp with time zone default timezone('utc'::text, now())
   );
   ```
3. (Optional) Add any additional columns you need for students or riders.
4. Set Row Level Security (RLS) policies so that users can only read/write their own profile. For example:
   ```sql
   -- allow authenticated users to insert their own profile
   create policy "insert own profile" on profiles
     for insert with check (auth.uid() = id);
   -- allow users to select/update/delete only their row
   create policy "select own" on profiles
     for select using (auth.uid() = id);
   create policy "update own" on profiles
     for update using (auth.uid() = id);
   ```

After the table exists, new accounts created through the sign‑up form will automatically insert a profile row (via client code) and the dashboard/profile page will display those details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
