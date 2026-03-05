# 漢字マスター — PWA iOS Guide

Hướng dẫn đầy đủ để build và cài app lên iPhone/iPad **không cần App Store**.

---

## Cấu trúc project

```
kanji-master/
├── public/
│   ├── manifest.json       ← Cấu hình PWA (tên, màu, icon)
│   ├── sw.js               ← Service Worker (offline support)
│   └── icons/
│       ├── icon-192.png    ← Icon app
│       └── icon-512.png    ← Icon app (lớn)
├── src/
│   ├── main.jsx            ← Entry point React
│   └── App.jsx             ← Toàn bộ app
├── index.html              ← HTML với meta tags iOS
├── vite.config.js
└── package.json
```

---

## Yêu cầu

- Node.js v18+
- npm v9+
- Tài khoản hosting miễn phí (Vercel / Netlify / GitHub Pages)
  → **Bắt buộc có HTTPS** — PWA trên iOS chỉ hoạt động qua HTTPS

---

## Bước 1 — Cài đặt & chạy local

```bash
# Clone hoặc copy project vào thư mục
cd kanji-master

# Cài dependencies
npm install

# Chạy dev server
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

> ⚠️ Trên localhost, Service Worker sẽ hoạt động nhưng **không thể test "Add to Home Screen"** — cần deploy lên HTTPS mới cài được lên iOS.

---

## Bước 2 — Build production

```bash
npm run build
```

Output nằm trong thư mục `dist/`. Preview trước khi deploy:

```bash
npm run preview
# Mở http://localhost:4173
```

---

## Bước 3 — Deploy lên HTTPS

### Option A: Vercel (khuyến nghị, nhanh nhất)

```bash
# Cài Vercel CLI
npm install -g vercel

# Deploy (lần đầu sẽ hỏi login)
vercel

# Deploy production
vercel --prod
```

Vercel tự động cấp HTTPS. App sẽ có URL dạng `https://kanji-master.vercel.app`

---

### Option B: Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir dist
```

---

### Option C: GitHub Pages

1. Tạo repo trên GitHub, push code lên

2. Mở `vite.config.js`, uncomment và sửa tên repo:
```js
base: '/kanji-master/',   // Thay bằng tên repo của bạn
```

3. Sửa `public/manifest.json`, đổi `start_url`:
```json
"start_url": "/kanji-master/"
```

4. Build và deploy:
```bash
npm run build
npm run deploy
```

App sẽ có URL: `https://username.github.io/kanji-master/`

---

## Bước 4 — Cài lên iPhone / iPad

Sau khi có URL HTTPS, làm theo các bước sau trên thiết bị iOS:

### Trên iPhone/iPad:

1. Mở **Safari** (bắt buộc dùng Safari, Chrome iOS không hỗ trợ cài PWA)
2. Truy cập URL app (ví dụ: `https://kanji-master.vercel.app`)
3. Nhấn nút **Chia sẻ** (icon mũi tên ở thanh dưới)
4. Kéo xuống, chọn **"Thêm vào Màn hình chính"** (Add to Home Screen)
5. Đặt tên → nhấn **Thêm**

App sẽ xuất hiện trên màn hình chính như một app thật, chạy **toàn màn hình không có thanh Safari**.

---

## Tính năng PWA đã tích hợp

| Tính năng | Mô tả |
|-----------|-------|
| Cài lên Home Screen | Icon + tên hiển thị như app thật |
| Chạy fullscreen | Không có thanh địa chỉ Safari |
| Status bar trong suốt | Hỗ trợ notch / Dynamic Island |
| Offline support | Service Worker cache toàn bộ app |
| Lưu dữ liệu | localStorage (streak, yêu thích) |
| Safe area | Hỗ trợ iPhone X trở lên |

---

## Lưu ý quan trọng với iOS

- **Chỉ Safari mới cài được PWA** — Chrome, Firefox trên iOS không có tính năng "Add to Home Screen"
- **Xóa app = mất dữ liệu** — localStorage bị xóa khi gỡ app khỏi Home Screen
- **iOS 16.4+** hỗ trợ Push Notification cho PWA (nếu muốn thêm sau)
- Nếu app bị trắng sau khi cài: xóa app, deploy lại với URL mới, cài lại

---

## Cập nhật app

Mỗi khi thay đổi code:

```bash
npm run build
vercel --prod   # hoặc netlify deploy --prod --dir dist
```

Service Worker tự động cập nhật khi người dùng mở app lần tiếp theo.

Nếu muốn force update ngay, tăng version trong `public/sw.js`:
```js
const CACHE_NAME = 'kanji-master-v2';  // tăng số version
```
