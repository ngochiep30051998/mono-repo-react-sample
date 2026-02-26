# Admin Portal & Vendors (NX Workspace)

A modern React monorepo built with TypeScript, Vite, **NX**, and **Atomic Design**. Two apps: **Admin Portal** (dashboard, users, products, orders) and **Vendors** (dashboard, classes). Shared code lives in NX libraries under path aliases such as `@ui`, `@core`, `@features/*`, etc.

## NX Workspace Structure

```
mono-repo-react-sample/
├── apps/
│   ├── admin-portal/        # Main admin app — routing, layout, dashboard/users/products/orders
│   ├── admin-portal-e2e/     # E2E tests for admin-portal
│   ├── vendors/             # Vendors app — dashboard + classes feature
│   └── vendors-e2e/         # E2E tests for vendors
├── libs/
│   ├── ui/                  # @ui — atoms, molecules, organisms, templates, utils (Loadable, RootBoundary, ScopeComponent)
│   ├── core/                # @core — http, cache, dayjs, helpers, guards, RBAC config, auth config, menu.utils
│   ├── shared-types/        # @shared-types — types, interfaces, enums
│   ├── hooks/               # @hooks — useKeyDown, useMediaQuery, useMounted, useHasPermission
│   ├── contexts/            # @contexts — LoadingProvider and context
│   ├── stores/              # @stores — useAuthStore
│   ├── services/            # @services — auth.service (API)
│   ├── features/admin/
│   │   ├── auth/            # @features/admin/auth — AuthRouter (Login, Register, ForgotPassword)
│   │   ├── dashboard/       # @features/admin/feature-dashboard — Router, MenuItems
│   │   ├── users/           # @features/admin/feature-users
│   │   ├── products/        # @features/admin/feature-products
│   │   └── orders/          # @features/admin/feature-orders
│   ├── features/vendors/
│   │   └── classes/         # @features/vendors/feature-classes — Router, MenuItems (used by vendors app)
│   ├── mocks/               # @mocks — users, products, orders mock data
│   ├── theme/               # @theme — design tokens, tailwindExtend, useThemeStore
│   └── test-utils/          # @src/test-utils — shared test helpers (placeholder)
```

### Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Run Admin Portal (`nx serve admin-portal`, default port 4200) |
| `pnpm build` | Build admin-portal |
| `pnpm preview` | Preview admin-portal production build |
| `pnpm storybook` | Run Storybook for `@ui` (port 6006) |
| `pnpm lint` | Run ESLint |
| `pnpm affected:build` | Build only projects affected by changes (vs `origin/main`) |
| `pnpm affected:test` | Test only affected projects |

To run the **Vendors** app: `nx serve vendors`.

### Module Boundaries

ESLint rule `@nx/enforce-module-boundaries` (when `@nx/eslint-plugin` is installed) enforces:

- **type:app** → may depend on type:feature, type:ui, type:util
- **type:feature** → may depend on type:ui, type:util
- **type:ui** → may depend on type:util

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build**: Vite 7
- **UI**: Ant Design 6 (antd)
- **Routing**: React Router 7
- **State**: Zustand 5
- **HTTP**: Axios
- **Code splitting**: React.lazy + Suspense (via `loadable` from `@ui`)
- **Date**: Day.js
- **Styling**: Tailwind CSS 4 + Sass
- **Lint**: ESLint 9 (flat config) with TypeScript

## Atomic Design Architecture

The **UI library** (`@ui`) in `libs/ui/src` follows [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/): atoms → molecules → organisms → templates, plus `utils` (Loadable, RootBoundary, ScopeComponent).

### Component Hierarchy

```
libs/ui/src/
├── atoms/           # Primitives + App* wrappers for Ant Design
├── molecules/       # StatCard, ActionButtons, OAuthButton, UserDropdown, ThemeToggleBtn, NotificationBell, SidebarLogo, DeleteConfirm
├── organisms/       # AppHeader, AppSidebar, AppBreadcrumb, DataTable, FilterBar, LoginForm, modals, DashboardStats, DashboardCharts, etc.
├── templates/       # AdminTemplate, AuthTemplate
├── utils/           # Loadable, RootBoundary, ScopeComponent
├── StatusTag, ScopeTag, GradientAvatar, Spinner (root-level atoms)
└── assets/icons     # GoogleIcon, FacebookIcon
```

### Atoms — `libs/ui/src/atoms/`

Primitive building blocks: status/scope tags, avatar, spinner, icon, and **App*** wrappers for Ant Design components (AppButton, AppInput, AppSelect, AppModal, AppTable, AppCard, AppTabs, AppPagination, AppDatePicker, AppTree, AppBreadcrumbList, AppMenu, AppRow, AppCol, etc.).

| Component (examples) | Description |
|---------------------|-------------|
| `StatusTag` | Colored `<Tag>` for status values |
| `ScopeTag` | Tag for scope display |
| `GradientAvatar` | Icon inside a gradient box |
| `Spinner` | Loading indicator for lazy routes |
| `AppIcon` | Icon wrapper with size/color |
| `AppButton`, `AppInput`, `AppSelect`, … | Ant Design wrappers with project defaults |

### Molecules — `libs/ui/src/molecules/`

| Component | Description |
|-----------|-------------|
| `StatCard` | Dashboard stat: icon + title + value + optional trend |
| `ActionButtons` | Edit / Delete button group for table rows |
| `OAuthButton` | Social login button (Google, Facebook) |
| `UserDropdown` | Avatar + username + dropdown menu |
| `ThemeToggleBtn` | Light / Dark theme toggle |
| `NotificationBell` | Badge + bell for notifications |
| `SidebarLogo` | Brand logo in sidebar |
| `DeleteConfirm` | Delete confirmation UI |

### Organisms — `libs/ui/src/organisms/`

| Component | Description |
|-----------|-------------|
| `AppHeader` | Top bar (logo, menu toggle, theme, notifications, user) |
| `AppSidebar` | Collapsible sidebar with menu items |
| `AppBreadcrumb` | Breadcrumb from current route |
| `LoadingFullScreen` | Full-screen loading overlay |
| `DataTable` | Paginated table synced with URL params |
| `FilterBar` | Filter form synced with URL params |
| `LoginForm` | Login form + OAuth buttons |
| `UserFormModal`, `ProductFormModal`, `OrderStatusModal` | Create/Edit modals |
| `DashboardStats`, `DashboardCharts` | Dashboard stats row and charts |
| `RouteErrorBoundary` | Route-level error boundary |

### Templates — `libs/ui/src/templates/`

| Component | Description |
|-----------|-------------|
| `AdminTemplate` | Authenticated layout: header + sidebar + content (uses `<Outlet />`) |
| `AuthTemplate` | Public layout for auth pages |

### Pages (feature libs)

Pages live inside **feature** libraries and are loaded with `loadable()`:

- **Auth**: `libs/features/admin/auth/src/pages/` — Login, Register, ForgotPassword
- **Dashboard**: `libs/features/admin/dashboard/src/pages/` — Dashboard
- **Users, Products, Orders**: `libs/features/admin/users|products|orders/src/pages/`
- **Classes** (Vendors): `libs/features/vendors/classes/src/pages/` — ClassesPage

### Data Flow

```
Apps (admin-portal / vendors) → Router + layout (AdminTemplate / VendorTemplate)
Layout → Organisms → Molecules → Atoms
Pages (in feature libs) → Zustand (@stores) → Services (@services) / API
```

## Project Structure (high level)

```
apps/
  admin-portal/src/     # Entry (main.tsx), app/Root, app/routing (router + menuItems), app/layout (AdminTemplate, AdminHeader, AdminSidebar, AuthTemplate), styles
  vendors/src/          # Entry, app/Root, app/routing, app/layout (VendorTemplate, AuthTemplate)

libs/
  ui/src/               # atoms, molecules, organisms, templates, utils, assets
  core/src/             # cache, http, dayjs, helper, configs (rbac, auth), guards, shared (menu.utils, permissions), constants
  shared-types/src/     # types, interfaces, enums
  hooks/src/            # useMediaQuery, useHasPermission, …
  contexts/src/         # LoadingProvider
  stores/src/           # useAuthStore
  services/src/         # auth.service
  features/admin/       # auth, dashboard, users, products, orders (each: Router, MenuItems, pages)
  features/vendors/classes/  # Router, MenuItems, ClassesPage
  mocks/src/            # Mock data
  theme/src/            # themeTokens, tailwindExtend, useThemeStore
  test-utils/src/       # Placeholder
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
git clone <repository-url>
cd mono-repo-react-sample
pnpm install
```

### Environment Variables

Create a `.env` file in the app directory (e.g. `apps/admin-portal`) or root as needed:

```env
VITE_PORT=4200
VITE_PUBLIC_API_URL=your_api_url
BASE_API_URL=your_base_api_url
LOCAL_CACHE_KEY=your_cache_key
PUBLIC_URL=/
```

### Development

```bash
pnpm dev
```

Opens Admin Portal at [http://localhost:4200](http://localhost:4200) (or the port set by `VITE_PORT`).

Vendors app:

```bash
nx serve vendors
```

## Path Aliases (tsconfig.base.json + app Vite config)

| Alias | Path |
|-------|------|
| `@ui`, `@atoms/*`, `@molecules/*`, `@organisms/*`, `@templates/*`, `@utils/*` | `libs/ui/src` (and subpaths) |
| `@core`, `@core/*` | `libs/core/src` |
| `@shared-types`, `@shared-types/*` | `libs/shared-types/src` |
| `@hooks`, `@hooks/*` | `libs/hooks/src` |
| `@contexts`, `@contexts/*` | `libs/contexts/src` |
| `@stores`, `@stores/*` | `libs/stores/src` |
| `@services`, `@services/*` | `libs/services/src` |
| `@features/admin/auth`, `@features/admin/feature-dashboard`, `@features/admin/feature-users`, `@features/admin/feature-products`, `@features/admin/feature-orders` | `libs/features/admin/*` |
| `@features/vendors/feature-classes` | `libs/features/vendors/classes/src` |
| `@mocks`, `@theme`, `@src/test-utils` | `libs/mocks`, `libs/theme`, `libs/test-utils` |

## Development Guidelines

### Adding a New Module (Admin Portal)

1. Create a feature lib under `libs/features/admin/<name>/` with `Router` (RouteObject), `MenuItems`, and pages.
2. In `apps/admin-portal/src/app/routing/index.tsx`, add the module to the `modules` array and to the router `children`.
3. In `apps/admin-portal/src/app/routing/menuItems.ts`, add the module to the `modules` array so its menu items are included.

### Adding a New Component (in @ui)

Follow Atomic Design:

- **Atom**: Stateless, no hooks, styling/props only.
- **Molecule**: Combines atoms; no store/context.
- **Organism**: May use hooks/context/Zustand; reusable.
- **Template**: Layout shell with `<Outlet />`; no data fetching.
- **Page**: Lives in a feature lib; connects to stores/services.

### Styling

- Tailwind CSS 4 as primary styling.
- Ant Design theme via `ConfigProvider` in layout (e.g. AdminTemplate).
- Global overrides in app `styles.css` (e.g. `apps/admin-portal/src/styles.css`).

## Authentication Flow

1. User hits a protected route.
2. `PrivateGuard` (from `@core`) checks cache for token (`AUTH_ADMIN_CACHE_KEY`).
3. No token → redirect to `/login`.
4. Login success → token and user data stored via cache; auth store updated.
5. Axios interceptor (in `@core` http) adds `Authorization: Bearer <token>`.
6. Logout clears cache and redirects to `/login`.

## Role Based Access Control (RBAC)

Access is controlled by **roles** and **permissions**. Roles come from the backend (mock) on login; permissions are derived and stored in Zustand (`@stores`).

### Roles & Permissions

| Role    | Key      | Permissions |
|---------|----------|-------------|
| Admin   | `admin`  | Full: dashboard, users (CRUD), products (CRUD), orders (view/edit/delete), classes (view) |
| Manager | `manager` | Dashboard, users (view/edit), products (view/edit), orders (view/edit), classes (view) — no create/delete users/products |
| User    | `user`   | Dashboard, products (view), orders (view), classes (view) |

Permission format: `resource:action` (e.g. `users:view`, `products:create`). Config: `libs/core/src/configs/rbac.config.ts` (`ROLES`, `PERMISSIONS`, `ROLE_PERMISSIONS`, `getPermissionsForRoles`).

### Flow

1. **Login**: Mock API returns roles → `getPermissionsForRoles(roles)` → cache + Zustand store updated.
2. **Refresh**: `PrivateGuard` / layout runs `hydrateFromCache()` to restore roles/permissions from cache.
3. **Routes**: `PermissionGuard` (`@core`) wraps routes; redirects if permission missing.
4. **Menu**: `AdminTemplate` / `VendorTemplate` use `filterMenuByPermission(MenuItems)` so sidebar only shows allowed items.
5. **Actions**: List pages and `ActionButtons` use `useHasPermission` / `useHasAnyPermission` (`@hooks`) to show/hide Add, Edit, Delete, etc.

### Key Files

| Purpose | Location |
|---------|----------|
| RBAC config | `libs/core/src/configs/rbac.config.ts` |
| Auth cache key | `libs/core/src/constants.ts` (`AUTH_ADMIN_CACHE_KEY`) |
| Auth store | `libs/stores/src/lib/useAuthStore.ts` |
| Auth API | `libs/services/src/lib/auth.service.ts` |
| Permission hooks | `libs/hooks/src/useHasPermission.ts` |
| Guards | `libs/core/src/guards/` (PrivateGuard, PublicGuard, PermissionGuard) |
| Menu filter | `libs/core/src/shared/menu.utils.tsx` — `filterMenuByPermission` |

### Demo Logins

Use these usernames on the login page (password arbitrary):

- `admin` — full access
- `manager` — no user/product create/delete
- Any other (e.g. `user`) — view-only dashboard, products, orders, classes

## HTTP Client (`libs/core/src/http.ts`)

- Axios instance with `BASE_API_URL`.
- Request interceptor: `Authorization: Bearer <token>` from cache.
- Response interceptor: redirect to `/login` on 401.

## Changelog

### v4.0.0 — NX Workspace Migration

- **NX monorepo**: `nx`, `@nx/workspace`, `@nx/react`, `@nx/vite`; `nx.json`, `tsconfig.base.json`, `pnpm-workspace.yaml`.
- **Apps**: `admin-portal` and `vendors` under `apps/`; E2E projects `admin-portal-e2e`, `vendors-e2e`.
- **Libs**: `@ui`, `@core`, `@shared-types`, `@hooks`, `@contexts`, `@stores`, `@services`, `@features/admin/auth`, `@features/admin/feature-dashboard|users|products|orders`, `@features/vendors/feature-classes`, `@mocks`, `@theme`, `@src/test-utils`.
- **Auth**: Guards, useAuthStore, useHasPermission, RBAC and auth config in `@core`; store in `@stores`; auth service in `@services`; LoadingProvider in `@contexts`.
- **Storybook**: `libs/ui/.storybook`; stories under `libs/ui/src`.
- **Improvements**: Affected CI scripts; theme in `@theme`; module boundary rules.

### v3.0.0 — Atomic Design Refactor

- Reorganized UI into atoms, molecules, organisms, templates, utils in `libs/ui`.
- Extracted LoginForm, DashboardStats, DashboardCharts, form modals, StatCard, ActionButtons, OAuthButton, UserDropdown, ThemeToggleBtn, NotificationBell, SidebarLogo, StatusTag, GradientAvatar, Spinner, AppIcon and App* wrappers.
- Barrel exports per tier.

### v2.0.0 — Major Dependencies Upgrade (2026-02-11)

| Package | Before | After |
|---------|--------|-------|
| react | 18.2 | 19.x |
| antd | 5.13 | 6.x |
| zustand | 4.5 | 5.x |
| react-router-dom | 6.20 | react-router 7.x |
| vite | 5.0 | 6.x → 7.x |
| tailwindcss | 3.4 | 4.x |
| eslint | 8.55 | 9.x |

## License

This project is public.

## Author

**Hiep Nguyen Ngoc**
- Portfolio: https://hiepnn.com/
- LinkedIn: https://www.linkedin.com/in/hi%E1%BB%87p-nguy%E1%BB%85n-b89aa1189
