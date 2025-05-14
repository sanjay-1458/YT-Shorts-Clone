# YT-Short Clone:

`layout.tsx` renders the home page which is `page.tsx`, which will render ehen we are at home page `"/"`.

Shadcn for reusable component -> on using components from Shadcn we get a folder `components/ui` where our components are present.
Used Tailwind CSS for styling. Added theme from Shadcn and wrapped the application around it.

For authentication used clerk, now user can login using `Google account`, `Email`, `Github`.


## Components

### Navbar

Navabar is needed in the entire application throughtout the pages, so it is rendered inside the `layout.tsx`. Clerk authentication and theme is integrated in the navbar.


## Pages


`"use client"` and `"use server"` are directive in Next.js which tells where a component runs.
If we are using `"use client"`, it will run only in the browser, in this components we can use React states like `"use state", "use effect"`, we can interact with `DOM`, can add animations, etc.
If we are using `"use server"`, it means that this component is for server and will runs only in server not in the browser. It is required when we are writing backend logic like accessing resources from files, databases, etc. It will not be included in client-JS.

#### Server

Some components are marked with `"use server"`, those component are run in server, and this functions are invoked by client. Here server code are run by Next.js, in deveelopment the server components are run on local Node.js dev server, and in production (like vercel) it runs inside a serverless function, or Node server.

Example:

```
"use server"

export async function DBWork(data){

}
```

```
"use client"

async function Component(){
    await DBWork(data);
}

or

<form action={DBWork}>
```

This are called as Server Action. In Next.js a Server Action is a function which runs `exclusively` on the server, and are invoked from a client component.


### Upload

On clicking the create button on navbar user is redirected to `/upload` page.


Utilized Zod for form validation, show warning when form for shorts are not filled.
The `upload-shorts` server action is triggered when we submit the form. We create a schema using Zod and validate the received formData with it, as well as we check for authentication using clerk whether a user is loged in or not.

We are parsing the submitted detail to the desired details using `safeParse` so if an error occurs we can send back the response to the form.

#### Database

Neon database is used with Prisma for scalable, typed and structured application.
Neon automatically scale based in usage, we don't have to manage server, it is fully managed. Perfect for on-demand workload.

Prisma is a TypeScript ORM (Object Relational Model), it auto generates TypeScript types for database schema.

Neon is a serverless PostgreSQL database, it scales automatically.

Neon -> Database
Prisma -> For quering

##### User columns:
id (String), clerkUserId (String), name (String), email (String), createdAt (DateTime), updatedAt (DateTime), shorts (Shorts[])

##### Shorts columns:
id (String), title (String), description (String), url (String), userId (String), createdAt (DateTime), updatedAt (DateTime), user (User)