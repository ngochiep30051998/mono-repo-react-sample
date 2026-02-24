# Admin Portal – Phần nên đưa ra libs / dọn dẹp

**Đã thực hiện refactor.** Tài liệu dưới đây mô tả các thay đổi đã áp dụng.

---

---

## 1. XÓA (dead code / trùng với libs)

### 1.1 `src/app/store/useThemeStore.tsx`
- **Lý do:** Đã có `useThemeStore` trong `@theme` (libs/theme). Toàn bộ layout (AdminTemplate, AppHeader, AppSidebar, AppBreadcrumb, SidebarLogo) đang dùng `import { useThemeStore } from '@theme'`.
- **Hành động:** Xóa file này.

### 1.2 `src/app/routing/menu.tsx`
- **Lý do:** `getItem` trùng với `@features/admin/auth` (libs/features/admin/auth đã export `getItem`, `filterMenuByPermission`). Các feature lib (dashboard, users, products, orders) đều dùng `getItem` từ `@features/admin/auth`. App không import từ `menu.tsx`.
- **Hành động:** Xóa file này.

### 1.3 `src/assets/icons/index.tsx`
- **Lý do:** GoogleIcon, FacebookIcon đã có trong `@ui` (libs/ui). Auth (Register, LoginForm) dùng từ `@ui`. App không import từ `assets/icons`.
- **Hành động:** Xóa file (và thư mục `src/assets/icons` nếu không còn file nào).

---

## 2. ĐƯA LOGIC RA LIBS (utility tái sử dụng)

### 2.1 Breadcrumb theo map (path → title)

- **Hiện tại:** `src/app/configs/breadcrumb.config.ts` có:
  - `BREADCRUMB_MAP`: app-specific (routes: Dashboard, Users, Products, Orders…).
  - `getBreadcrumbItems(pathname)`: logic dùng map + hỗ trợ pattern `:id`.
- **Đề xuất:**
  - **Giữ trong app:** chỉ `BREADCRUMB_MAP` (config đặc thù app).
  - **Đưa ra lib:** hàm utility nhận `(pathname, pathToTitleMap)` và trả về danh sách breadcrumb (hỗ trợ `:param`), ví dụ trong **libs/core** (e.g. `core/src/breadcrumb.utils.ts`) hoặc **libs/shared-types** nếu muốn gần với routing/types.
- **API gợi ý:**
  ```ts
  // libs/core hoặc lib mới
  export function getBreadcrumbItemsFromMap(
    pathname: string,
    pathToTitleMap: Record<string, string>
  ): { title: string; path?: string }[]
  ```
- **App sau refactor:** import utility từ lib, giữ `BREADCRUMB_MAP` trong app và gọi `getBreadcrumbItemsFromMap(location.pathname, BREADCRUMB_MAP)` trong AppBreadcrumb (hoặc một helper nhỏ trong app gọi lib).

---

## 3. GIỮ TRONG APP (app shell / config đặc thù)

- **`src/app/routing/index.tsx`** – Khai báo router, danh sách modules (Dashboard, Users, Products, Orders), basename. Hoàn toàn đặc thù app.
- **`src/app/routing/menuItems.ts`** – Gộp MenuItems từ các feature và filter theo permission. Phụ thuộc danh sách modules của app → giữ trong app.
- **`src/app/layout/*`** – AdminTemplate, AuthTemplate, AppHeader, AppSidebar, AppBreadcrumb, SidebarLogo là **shell layout** của app, đã dùng @theme, @features/admin/auth, @ui; chỉ khác nhau ở nguồn menu (từ `menuItems.ts`). Giữ trong app là hợp lý.
- **`src/app/configs/breadcrumb.config.ts`** – Sau khi đưa logic “getBreadcrumbItems từ map” ra lib, file này chỉ còn **BREADCRUMB_MAP** (và có thể một re-export nhỏ gọi utility từ lib).
- **`src/app/Root.tsx`** – Entry composition (LoadingProvider + Router). App-specific.

---

## 4. TÓM TẮT HÀNH ĐỘNG

| Loại            | File / thư mục              | Hành động |
|-----------------|-----------------------------|-----------|
| Xóa             | `app/store/useThemeStore.tsx` | Xóa (đã dùng @theme) |
| Xóa             | `app/routing/menu.tsx`      | Xóa (dùng getItem từ @features/admin/auth) |
| Xóa             | `assets/icons/index.tsx`     | Xóa (dùng icons từ @ui) |
| Đưa ra lib      | Logic breadcrumb (pathname + map → items) | Thêm utility trong libs/core (hoặc lib tương ứng), hỗ trợ `:param` |
| Giữ trong app   | BREADCRUMB_MAP              | Chỉ giữ map, gọi utility từ lib |
| Giữ trong app   | routing, layout, Root       | Không đưa ra lib |

Sau khi làm xong:
- App chỉ còn: entry (main, Root), router + menuItems, layout shell, và config breadcrumb (map + 1 gọi lib).
- Không còn duplicate với theme store, menu getItem, hay icons.

---

## Đã thực hiện

- **libs/core**: Thêm `breadcrumb.utils.ts` với `getBreadcrumbItemsFromMap(pathname, pathToTitleMap, options?)` và export từ `@core`.
- **apps/admin-portal**: `configs/breadcrumb.config.ts` chỉ còn `BREADCRUMB_MAP` và `getBreadcrumbItems` gọi `getBreadcrumbItemsFromMap` từ `@core`.
- **Đã xóa**: `app/store/useThemeStore.tsx`, `app/routing/menu.tsx`, `app/assets/icons/index.tsx`.
