# Fixr - Handyman Hub

## Overview

Fixr is a Progressive Web App (PWA) that connects users with skilled handymen in their area. The application features a cyberpunk/neon-themed interface with a dark background and vibrant cyan accents. Users can browse handymen by category, search by skill, view professionals on an interactive map, and contact them directly via WhatsApp. The app includes an admin interface for adding new handymen to the platform.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query (React Query)** for server state management and data fetching

**UI Components**
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Class Variance Authority (CVA)** for component variant management
- Dark mode theme with cyberpunk aesthetic using cyan (#22d3ee) as the primary accent color

**State Management**
- React hooks for local component state
- localStorage for persisting handyman data added through the admin interface
- TanStack Query for caching and synchronizing server state

**Routing Structure**
- `/` - Home page with search, categories, handyman grid, and map
- `/add-handyman` - Admin page for adding new handymen
- Catch-all 404 page for undefined routes

**Progressive Web App Features**
- Service worker (`sw.js`) for offline functionality and caching
- Web app manifest (`manifest.json`) for installability
- Install prompt component for encouraging app installation
- Optimized for mobile, tablet, and desktop viewports

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for the HTTP server
- Middleware for JSON parsing and request logging
- Custom Vite integration for development mode with HMR support

**Data Storage Strategy**
- Initial handyman data loaded from `public/handymen.json`
- Runtime additions stored in browser localStorage
- In-memory storage interface (`MemStorage`) for user management (extensible for future features)
- Database schema defined with Drizzle ORM for potential PostgreSQL integration

**API Design**
- Currently frontend-only with no backend API routes implemented
- Infrastructure prepared for future API endpoints under `/api` prefix
- Storage abstraction layer ready for CRUD operations

### Design System

**Color Palette**
- Background: Deep charcoal (#1a1a1a, gray-900)
- Surface: Lighter dark (gray-800) for cards
- Primary accent: Vibrant cyan (#22d3ee, cyan-400)
- Borders: Subtle dark borders (gray-700)
- Text: White/gray-100 for primary, gray-400 for secondary

**Typography**
- Primary fonts: Inter and Poppins for clean, modern readability
- Font weights: 400 (regular), 500 (medium), 600-700 (bold)
- Responsive sizing from base text to 4xl headlines

**Layout System**
- Responsive grid: 3 columns (desktop/tablet), 2 columns (mobile categories), 1 column (mobile cards)
- Consistent spacing using Tailwind units (4, 6, 8, 12, 16, 24)
- Smooth transitions (200-300ms) for hover and active states
- Glow effects on primary elements using box-shadow

**Component Library**
- CategoryCard: Clickable category selector with emoji icons
- CategoryGrid: Responsive grid of category cards
- HandymanCard: Professional profile card with avatar, skills, rating, and WhatsApp CTA
- HandymanGrid: Responsive grid of handyman cards
- SearchBar: Skill-based search with icon
- Map: Visual representation of handyman locations (simplified, not actual map integration)
- InstallPrompt: PWA installation banner

### External Dependencies

**Third-Party UI Libraries**
- **@radix-ui/***: Headless UI primitives for accessible components (dialogs, dropdowns, tooltips, etc.)
- **lucide-react**: Icon library for consistent iconography
- **embla-carousel-react**: Carousel/slider functionality

**Form Management**
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Integration with Zod validation schemas
- **zod**: Runtime type validation and schema definition

**Database & ORM**
- **drizzle-orm**: TypeScript ORM for PostgreSQL
- **drizzle-zod**: Zod schema generation from Drizzle schemas
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- Database configuration ready but not actively used (frontend-only currently)

**Development Tools**
- **@replit/vite-plugin-***: Replit-specific development plugins for error overlay, cartographer, and dev banner
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

**Session Management**
- **express-session**: Session middleware (infrastructure present)
- **connect-pg-simple**: PostgreSQL session store (configured but not active)

**Utilities**
- **clsx** and **tailwind-merge**: Dynamic className composition
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation

**Notable Absence**
- No actual map library integration (e.g., Leaflet, Mapbox) - Map component is a visual placeholder
- No real-time communication features
- No authentication system currently active (schema defined for future use)