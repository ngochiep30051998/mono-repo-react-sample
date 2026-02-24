# Admin Portal (NX Workspace)

A modern React admin dashboard built with TypeScript, Vite, **NX** monorepo, and **Atomic Design** architecture. The main app is **Admin Portal**; shared code lives in NX libraries under the `@src` scope.

## NX Workspace Structure

```
mono-repo-react-sample/
├── apps/
│   └── admin-portal/   # Main app — shell: routing, providers, entry
├── libs/
│   ├── ui/              # @ui — atoms, molecules, organisms, templates, Loadable
│   ├── core/            # @core — http, cache, dayjs, helper, search, sleep, models
│   ├── shared-types/    # @shared-types — types, interfaces, enums
│   ├── hooks/           # @hooks — useKeyDown, useMediaQuery, useMounted
│   ├── auth/            # @features/admin/auth — guards, useAuthStore, useHasPermission, RBAC, LoadingProvider
│   ├── feature-dashboard/  # @features/admin/feature-dashboard — Router, MenuItems
│   ├── feature-users/   # @features/admin/feature-users
│   ├── feature-products/# @features/admin/feature-products
│   ├── feature-orders/  # @features/admin/feature-orders
│   ├── mocks/           # @mocks — users, products, orders mock data
│   ├── theme/           # @theme — design tokens, tailwindExtend
│   ├── api-client/      # @src/api-client — re-exports http from core
│   └── test-utils/      # @src/test-utils — shared test helpers (placeholder)
```

### Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Run Admin Portal (`nx serve admin-portal`) |
| `pnpm build` | Build the app |
| `pnpm storybook` | Run Storybook for `@ui` (port 6006) |
| `pnpm affected:build` | Build only projects affected by changes (vs `origin/main`) |
| `pnpm affected:test` | Test only affected projects |

### Module Boundaries

ESLint rule `@nx/enforce-module-boundaries` (when `@nx/eslint-plugin` is installed) enforces:

- **type:app** → may depend on type:feature, type:ui, type:util
- **type:feature** → may depend on type:ui, type:util
- **type:ui** → may depend on type:util

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **UI Framework**: Ant Design 6 (antd)
- **Routing**: React Router 7
- **State Management**: Zustand 5
- **HTTP Client**: Axios
- **Code Splitting**: React.lazy + Suspense
- **Date Handling**: Day.js
- **Styling**: Tailwind CSS 4 + Sass
- **Linting**: ESLint 9 (flat config) with TypeScript rules

## Atomic Design Architecture

This project follows the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology by Brad Frost. The UI is organized into 5 hierarchical levels.

### Component Hierarchy

```
src/components/
├── atoms/          ← Primitive UI elements (no business logic)
├── molecules/      ← Compositions of atoms forming functional units
├── organisms/      ← Complex, reusable sections (may use hooks/context)
├── templates/      ← Page layout shells (contain <Outlet />)
└── utils/          ← Non-visual utilities (Loadable, RootBoundary, etc.)
```

### Atoms — `src/components/atoms/`

Smallest building blocks that wrap Ant Design primitives with project-level defaults.

| Component | Description |
|-----------|-------------|
| `StatusTag` | Colored `<Tag>` for status values (`active`, `inactive`, `pending`, etc.) |
| `GradientAvatar` | Icon inside a gradient box (used in Sidebar logo, stat cards) |
| `Spinner` | Bouncing-dots loading indicator for lazy-loaded routes |
| `AppIcon` | Standardized icon wrapper with size and color props |

### Molecules — `src/components/molecules/`

Combinations of atoms that form a self-contained UI unit. Still "dumb" — receive data via props only.

| Component | Description |
|-----------|-------------|
| `StatCard` | Dashboard statistics card: icon + title + value + optional trend |
| `ActionButtons` | Edit / Delete button group for table rows |
| `OAuthButton` | Social login button (Google, Facebook) |
| `UserDropdown` | Avatar + username + dropdown menu |
| `ThemeToggleBtn` | Light / Dark theme toggle button |
| `NotificationBell` | Badge + bell icon for notifications |
| `SidebarLogo` | Brand logo area inside the sidebar |

### Organisms — `src/components/organisms/`

Complex, feature-rich sections. May connect to Zustand stores or React context, but remain reusable across pages.

| Component | Description |
|-----------|-------------|
| `AppHeader` | Top navigation bar (logo, menu toggle, theme, notifications, user) |
| `AppSidebar` | Collapsible navigation sidebar with menu items |
| `AppBreadcrumb` | Breadcrumb trail driven by current route |
| `LoadingFullScreen` | Full-screen loading overlay |
| `DataTable` | Paginated table synced with URL search params |
| `FilterBar` | Declarative filter form synced with URL search params |
| `LoginForm` | Complete login form UI (fields + OAuth buttons) |
| `UserFormModal` | Create/Edit user modal form |
| `ProductFormModal` | Create/Edit product modal form |
| `OrderStatusModal` | Update order status modal |
| `DashboardStats` | Row of 4 statistics cards |
| `DashboardCharts` | Weekly bar chart and line trend chart |

### Templates — `src/components/templates/`

Page-level layout shells. Contain routing `<Outlet />` slots and define the overall page structure without real data.

| Component | Description |
|-----------|-------------|
| `AdminTemplate` | Authenticated layout: AppHeader + AppSidebar + main content area |
| `AuthTemplate` | Public layout: minimal wrapper for auth pages |

### Pages — `src/modules/*/pages/`

Specific instances of templates wired to real data. Pages live inside their **feature module** directory and connect to Zustand stores and services.

```
src/modules/
├── auth/pages/        ← Login, Register, ForgotPassword
├── dashboard/pages/   ← Dashboard (uses DashboardStats + DashboardCharts)
├── users/pages/       ← UserList (uses DataTable + FilterBar + UserFormModal)
├── products/pages/    ← ProductList
└── orders/pages/      ← OrderList
```

### Data Flow

```
Pages → Templates (layout)
Pages → Organisms (sections)
Pages → Zustand Store → Services (API)
Organisms → Molecules → Atoms
```

## Project Structure

```
src/
├── assets/              # Static assets (icons, images)
├── components/
│   ├── atoms/           # Primitive UI components
│   ├── molecules/       # Atom compositions
│   ├── organisms/       # Complex sections
│   ├── templates/       # Layout shells
│   └── utils/           # Loadable, RootBoundary, ScopeComponent
├── configs/             # Auth, RBAC, breadcrumb configuration
├── contexts/            # React contexts (LoadingContext)
├── core/                # Cache, HTTP client, helpers
├── enums/               # TypeScript enums
├── guards/              # Route guards (PrivateGuard, PublicGuard, PermissionGuard)
├── hooks/               # Custom hooks (useMediaQuery, etc.)
├── interfaces/          # TypeScript interfaces
├── mocks/               # Mock data for development
├── modules/             # Feature modules (pages + hooks/stores + services)
│   ├── auth/
│   ├── dashboard/
│   ├── users/
│   ├── products/
│   └── orders/
├── providers/           # Context providers (LoadingProvider)
├── routing/             # Router configuration + menu aggregation
├── store/               # Global Zustand stores (theme, etc.)
├── types/               # TypeScript type definitions
└── utils/               # Utility functions (export, menu, etc.)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd mono-repo-react-sample
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_PORT=3000
VITE_PUBLIC_API_URL=your_api_url
BASE_API_URL=your_base_api_url
LOCAL_CACHE_KEY=your_cache_key
PUBLIC_URL=/
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start the Admin Portal dev server |
| `pnpm build` | Type-check + production build |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview the production build |
| `pnpm storybook` | Run Storybook for UI library |
| `pnpm affected:build` | Build affected projects (CI) |
| `pnpm affected:test` | Test affected projects (CI) |

## Development Guidelines

### Adding a New Module

1. Create `src/modules/<name>/` with `index.tsx`, `pages/`, `hooks/`, and `services/`
2. Export `Router: RouteObject` and `MenuItems: IMenuItem[]` from `index.tsx`
3. Add the module to the `modules` array in `src/routing/index.tsx`

### Adding a New Component

Follow the Atomic Design hierarchy:

- **Atom**: Stateless, no hooks, only styling/props
- **Molecule**: Combines atoms, still no store/context access
- **Organism**: Can use hooks, context, or Zustand stores; must be reusable
- **Template**: Layout shell only — no direct data fetching
- **Page**: Connect to stores/services; lives in `src/modules/*/pages/`

### Styling

- Use Tailwind CSS 4 utility classes as the primary styling method
- Use Ant Design theme tokens via `ConfigProvider` in `AdminTemplate`
- Global Ant Design overrides live in `src/index.css`

## Authentication Flow

1. User accesses a protected route
2. `PrivateGuard` checks for a valid token in the cache
3. No token → redirect to `/login`
4. Login success → token and user data stored in local storage cache
5. All subsequent API calls include the `Bearer` token via Axios interceptor
6. Logout clears the cache and redirects to `/login`

## Role Based Access Control (RBAC)

Access is controlled by **roles** and **permissions**. Roles are loaded from the backend (mock API) on login; permissions are derived from roles and stored in Zustand.

### Roles & Permissions

| Role    | Key      | Permissions |
|---------|----------|-------------|
| Admin   | `admin`  | Full access: dashboard, users (CRUD), products (CRUD), orders (view/edit/delete) |
| Manager | `manager` | Dashboard, users (view/edit), products (view/edit), orders (view/edit) — no create/delete on users & products |
| User    | `user`   | Dashboard, products (view), orders (view) only |

Permission format: `resource:action` (e.g. `users:view`, `products:create`, `orders:delete`). Configuration lives in `src/configs/rbac.config.ts` (`ROLES`, `PERMISSIONS`, `ROLE_PERMISSIONS`, `getPermissionsForRoles`).

### Flow

1. **Login**: `Login` calls mock API `getRolesFromBackend(username)` → receives roles → `getPermissionsForRoles(roles)` → cache stores token/username, Zustand stores `roles` and `permissions`.
2. **Refresh**: `PrivateGuard` runs `hydrateFromCache()` which derives roles from cached username (same mapping as backend) and sets permissions in the store.
3. **Routes**: `PermissionGuard` wraps dashboard, users, products, orders routes and redirects to home if the user lacks the required permission.
4. **Menu**: `AdminTemplate` filters menu items by permission via `filterMenuByPermission` so sidebar only shows allowed items.
5. **Actions**: List pages and `ActionButtons` use `useHasPermission` / `useHasAnyPermission` to show/hide Add, Edit, Delete, View, Export by permission.

### Key Files

- **Config**: `src/configs/rbac.config.ts` — role/permission constants and `getPermissionsForRoles(roles)`.
- **Auth store**: `src/store/useAuthStore.ts` — `roles`, `permissions`, `setRolesAndPermissions`, `clearRolesAndPermissions`, `hydrateFromCache`.
- **Mock API**: `src/modules/auth/services/auth.service.ts` — `getRolesFromBackend(username)`, `getRolesForUsername(username)` (used by hydrate).
- **Hooks**: `src/hooks/useHasPermission.ts` — `useHasPermission(permission)`, `useHasAnyPermission(permissions[])`.
- **Guards**: `src/guards/PermissionGuard.tsx` — route-level permission check.
- **Utils**: `src/utils/menu.utils.ts` — `filterMenuByPermission(menuItems)`.

### Demo Logins

Use these usernames on the login page (password arbitrary) to test roles:

- `admin` — full access
- `manager` — no user/product create/delete
- Any other (e.g. `user`) — view-only dashboard, products, orders

## Configuration

### Path Aliases

- `@app/*` → `src/*` (configured in `vite.config.ts` and `tsconfig.json`)

### HTTP Client (`src/core/http.ts`)

- Axios instance with `BASE_API_URL`
- Request interceptor injects `Authorization: Bearer <token>`
- Response interceptor redirects to `/login` on `401`

## Changelog

### v4.0.0 — NX Workspace Migration

- **NX monorepo**: Added `nx`, `@nx/workspace`, `@nx/react`, `@nx/vite`; `nx.json`, `tsconfig.base.json`, `pnpm-workspace.yaml`.
- **App**: New app `admin-portal` under `apps/` (routing, providers, assets, env); dev/build via `nx serve` / `nx build`.
- **Libs**: `@ui`, `@core`, `@shared-types`, `@hooks`, `@features/admin/auth`, `@features/admin/feature-dashboard`, `@features/admin/feature-users`, `@features/admin/feature-products`, `@features/admin/feature-orders`, `@mocks`, `@theme`, `@src/api-client`, `@src/test-utils`.
- **Auth**: Guards, useAuthStore, useHasPermission, RBAC config, LoadingProvider in `libs/features/admin/auth`; uses `AUTH_USER_CACHE_KEY` from core.
- **Storybook**: Config moved to `libs/ui/.storybook`; one co-located story (`AppButton.stories.tsx`); existing stories still under `src/stories`.
- **Improvements**: Affected CI scripts; theme tokens in `@theme`; api-client re-export; test-utils placeholder; module boundary rules in `.eslintrc.json`.

### v3.0.0 — Atomic Design Refactor

- Reorganized `src/components/` into `atoms/`, `molecules/`, `organisms/`, `templates/`, `utils/`
- Removed `src/layouts/` — layouts migrated to `components/templates/`
- Extracted `LoginForm`, `DashboardStats`, `DashboardCharts` organisms
- Extracted `StatCard`, `ActionButtons`, `OAuthButton`, `UserDropdown`, `ThemeToggleBtn`, `NotificationBell`, `SidebarLogo` molecules
- Added `StatusTag`, `GradientAvatar`, `Spinner`, `AppIcon` atoms
- Moved form modals (`UserFormModal`, `ProductFormModal`, `OrderStatusModal`) to organisms
- Added barrel exports (`index.ts`) for each component tier
- Updated all import paths across the codebase

### v2.0.0 — Major Dependencies Upgrade (2026-02-11)

| Package | Before | After |
|---------|--------|-------|
| react | 18.2 | 19.x |
| antd | 5.13 | 6.x |
| zustand | 4.5 | 5.x |
| react-router-dom | 6.20 | react-router 7.x |
| vite | 5.0 | 6.x |
| tailwindcss | 3.4 | 4.x |
| eslint | 8.55 | 9.x |

## License

This project is public.

## Author

**Hiep Nguyen Ngoc**
- Portfolio: https://hiepnn.com/
- LinkedIn: https://www.linkedin.com/in/hi%E1%BB%87p-nguy%E1%BB%85n-b89aa1189
