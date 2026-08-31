# Copilot Instructions for Portfolio Project

## Source Control Safety

- Do not commit or push changes without checking with the user and receiving explicit approval immediately before the commit or push.

## Architecture Overview

This is a **Next.js 13 (Pages Router)** personal portfolio site using React 18 with SCSS Modules for styling. The architecture follows a component-based structure with data-driven content.

### Key Layers
- **Pages** (`pages/`): Entry points using Next.js Pages Router pattern
- **Templates** (`components/main_templates/`, `components/global_templates/`): Page structure wrappers (Main, Layout, Header, Footer)
- **Widgets** (`components/content_widgets/`, `components/dynamic_content_widgets/`): Reusable UI components
- **Backend** (`backend/`): Server-side utilities (session management, email)
- **Variables** (`variables/`): JSON data files driving dynamic content

### Data Flow
Page content (skills, projects, navigation) is defined in JSON files under `variables/` and passed as props through the component tree. Session state is fetched client-side in `_app.js` and passed to all pages.

## Component Patterns

### Naming Convention
- Components use **kebab-case folder names** with matching `.jsx` and `.module.scss` files
- Example: `my-work-card-1/my-work-card-1.jsx` + `my-work-card-1.module.scss`

### Modal Pattern
Modals export show/hide functions alongside the component:
```jsx
// Example from contact-modal.jsx
let showModal;
let hideModal;
const ContactModal = () => { /* ... */ };
export default ContactModal;
export { showModal, hideModal };
```

### Widget Template Pattern
Reusable widgets (like `slick-slider`) accept extensive props for customization rather than hard-coding behavior. See `SlickSlider` for the prop-driven configuration pattern.

## Styling

- **SCSS Modules** for component-scoped styles (`*.module.scss`)
- **Bootstrap 5** for grid and utilities (imported in `_app.js`)
- **CSS Variables** defined in `globals.scss` from `variables.scss` color map
- Color palette: `primary`, `secondary`, `tertiary`, `quaternary`, `quinary`, `dark`, `light`

## Backend & API

- **API Routes**: Located in `pages/api/` (Next.js convention)
- **Session**: Uses `iron-session` via wrappers in `backend/session.js`
- **Email**: Nodemailer with Gmail SMTP in `backend/mailer.js`

## Environment Variables

Required in `.env.local` (and Vercel dashboard for production):
- `MY_EMAIL` - Destination email for contact form submissions
- `SMTP_EMAIL` - Gmail sender address
- `SMTP_APP_PASSWORD` - Gmail app password (not regular password)
- `SESSION_TOKEN` - Secret for iron-session cookie encryption

## Deployment

Deployed to **Vercel**. Push to main branch triggers automatic deployment. Environment variables must be configured in Vercel project settings.

## Development Commands

```bash
npm run dev    # Development server at localhost:3000
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint
```

## Key Dependencies

- `framer-motion`: Page transitions (configured in `layout.jsx`)
- `react-slick` + `slick-carousel`: Carousel/slider components
- `react-bootstrap`: Modal and Bootstrap React components
- `next-themes`: Theme provider setup (currently basic implementation)

## Adding New Content

1. **New project**: Add entry to `variables/my-work.json`
2. **New skill**: Add to appropriate category in `variables/skills.json`
3. **New page link**: Update `variables/pages.json` with navigation flags

## File Aliases

Configured in `jsconfig.json`, use `@/` prefix for imports:
- `@/components/...`
- `@/variables/...`
- `@/backend/...`
- `@/styles/...`
