

# Maryman Lead Management Platform — Rebuild Plan

## Overview
Rebuild the complete Maryman lead management platform from the uploaded source files. This is a law firm intake/CRM dashboard with rich data visualizations, multi-theme support, and role-based navigation. All pages will use mock data initially, matching the existing implementation exactly.

---

## Phase 1: Foundation & Theme System

### Custom CSS Design System
- Replace the default shadcn CSS variables with the Maryman custom theme system
- Implement 4 theme variants via CSS classes: **Light** (default), **Dark** (zinc-based), **Purple** (deep purple), **Midnight** (deep blue)
- Include custom CSS for cards (`.card`, `.glass-card`), inputs, tables, badges, scrollbars, app background gradients, rank badges, and utility classes
- Import Plus Jakarta Sans + Inter fonts

### Theme Provider & Context
- Create the `ThemeContext` and `ThemeProvider` with localStorage persistence
- Support `system` theme option that follows OS preference
- Apply theme via `theme-{name}` class on the document root

### TypeScript Types
- Define `Lead`, `Call`, `User`, and `Activity` types matching the SQL schema

---

## Phase 2: Custom UI Components

### Rebuild UI Components
All components use CSS variable-based styling instead of Tailwind's default theme:
- **Button** — 6 variants (default, destructive, outline, secondary, ghost, link) + 4 sizes
- **Badge** — 8 variants including success, warning, info, purple
- **Card** suite — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Input** — with built-in label and error message support
- **Select** — native select with label, error, and options prop
- **ThemeSwitcher** — dropdown to switch between all theme options

### Utility Functions
- `formatDate`, `formatDateTime`, `formatPhone`, `formatDuration`, `getInitials`, `capitalize`
- Status and source color mappings

---

## Phase 3: Layout & Navigation

### Sidebar
- Collapsible sidebar with Maryman logo/branding (Zap icon)
- Navigation items: Dashboard, Insights, Leads, Calls, Reports, System Health (admin), Admin (admin)
- Active route highlighting with left accent bar
- Role-based visibility (admin/manager items hidden for agents/viewers)
- Collapse/expand toggle with mini icon-only mode
- Sign Out button in footer

### Header
- Displays user name and role
- Contains the ThemeSwitcher

### Layout Shell
- Flex layout with sidebar + main content area
- Main area has subtle gradient background
- Content constrained to 1400px max width

---

## Phase 4: Pages (All with Mock Data)

### Login Page
- Centered card with gradient Maryman branding
- Email/password form with loading state
- Navigates to dashboard on submit (auth placeholder)

### Dashboard
- 4 KPI stat cards (Total Leads, New Today, Qualified, Calls Today) with trend indicators
- Area chart showing leads by day of week (Recharts)
- Donut/pie chart showing lead source distribution with legend
- Recent activity feed with avatars and timestamps

### Leads Management
- Search bar with filter toggle
- Filterable by status and source via dropdowns
- Data table with columns: Name, Contact, Source, Status, Created, Actions
- Color-coded status badges
- Pagination footer showing result counts

### Calls Log
- 4 stat cards (Today, Completed, Missed, Avg Duration)
- Call list with direction icons (inbound/outbound/missed/voicemail)
- Each call shows phone number, status badge, direction badge, duration, notes
- Play recording and external link action buttons
- 30 mock call records

### Insights
- Tabbed view: Weekly Performance Matrix vs. Funnel Visualization
- 3 AI suggestion cards with severity indicators (critical/warning/success)
- Weekly matrix table with Volume, Trend, Velocity sparklines, Spend, CPL, ROAS, Quality score bars
- Funnel view with pipeline selector (Google Ads, Intaker) and horizontal bar chart

### Reports & Analytics
- 4 gradient KPI cards (Conversion Rate, Avg Time to Convert, Top Agent, Active Agents)
- Agent Performance Leaderboard table with rank badges (gold/silver/bronze), conversion bars, satisfaction stars
- Pipeline Performance by Case Type table with color-coded progress bars
- Conversion Funnel bar chart
- Monthly Trend line chart (leads vs retained)

### System Integrity
- 3 status cards with green left border (Uptime, Integration Health, Security)
- Data Flow Forensics timeline with ingestion/processing/distribution steps
- Anomaly Detection monitors
- Audit Log Feed with checkmark indicators

### Admin Panel
- 3-tab interface: Users, Settings, Integrations
- **Users**: user management table with avatar initials, roles, active/inactive status, edit/delete actions
- **Settings**: General settings form (company name, email, timezone) + Lead routing rules (assignment strategy, fallback agent)
- **Integrations**: Card grid showing 6 integration connectors (Intaker, CallRail, Litify, Regal, Google Ads, Zapier) with connection status

### Design System / Styleguide
- Showcase page demonstrating all UI components: buttons, badges, inputs, selects, cards

---

## Phase 5: Routing & App Shell

### App Setup
- React Router with nested layout routes
- ThemeProvider wrapping the entire app
- React Query client with 5-minute stale time
- Auth guard placeholder (currently hardcoded `isAuthenticated = true`)
- Routes: `/login`, `/` (Dashboard), `/leads`, `/calls`, `/insights`, `/reports`, `/system-integrity`, `/admin`, `/styleguide`

---

## What's NOT included (future work)
- Real Supabase authentication (login is a placeholder)
- Live data fetching from Supabase (all mock data)
- RLS policies and database operations
- CallRail/Regal/Litify integration webhooks

