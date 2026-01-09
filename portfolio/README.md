# Trevor Gibby - Portfolio

Personal portfolio website showcasing my work as a Full Stack Web Developer.

**Live Site:** [trevorgibby.dev](https://trevorgibby.dev)

## Tech Stack

- **Framework:** Next.js 13 (Pages Router)
- **Styling:** SCSS Modules + Bootstrap 5
- **Animations:** Framer Motion
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Create a `.env.local` file with:

```
MY_EMAIL=your-email@example.com
SMTP_EMAIL=sender@example.com
SMTP_APP_PASSWORD=your-gmail-app-password
SESSION_TOKEN=your-secret-session-token
```

## Project Structure

```
components/
  main_templates/     # Page wrappers (Main, Header, Footer)
  content_widgets/    # Static UI components
  dynamic_content_widgets/  # Data-driven components
variables/            # JSON content files (skills, projects, pages)
backend/              # Server utilities (session, mailer)
pages/api/            # API routes
```

## Adding Content

- **Projects:** Edit `variables/my-work.json`
- **Skills:** Edit `variables/skills.json`
- **Navigation:** Edit `variables/pages.json`
