<div align="center">

# MockDrop
### Curated 3D WebGL Device Mockup Studio & Interactive Stage

Studio mockup 3D berbasis WebGL murni tanpa Blender. Hasilkan render visual perangkat flagship, video loop 360°, dan ekspor 4K berdensitas tinggi dengan komputasi 100% Client-Side di GPU peramban.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160+-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-v8-black?style=for-the-badge&logo=three.js)](https://docs.pmnd.rs/react-three-fiber/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?style=for-the-badge)](LICENSE)

[Fitur Unggulan](#-fitur-unggulan) • [Katalog Perangkat](#-katalog-perangkat-kurasi) • [Arsitektur](#-arsitektur-teknologi) • [Menjalankan Lokal](#-panduan-instalasi-lokal) • [Deployment](#-panduan-deployment)

</div>

---

## 📌 Sekilas MockDrop

**MockDrop** dirancang untuk memecahkan kendala klasik presentasi produk digital: ketergantungan pada software 3D berat seperti Blender/Cinema4D, file mockup PSD berukuran gigabyte yang lambat diedit, atau layanan SaaS berbayar mahal yang membatasi resolusi ekspor serta mewajibkan pengunggahan tangkapan layar rahasia ke cloud.

MockDrop hadir sebagai **studio WebGL interaktif client-side penuh**. Setiap sasis fisik perangkat dimodelkan secara prosedural dengan material PBR (*Physically Based Rendering*), kalkulasi bayangan kontak lantai halus (*ambient contact shadows*), refleksi kaca layar adaptif, dan engine pemrosesan gambar beresolusi native tanpa server backend perantara.

---

## 🚀 Fitur Unggulan

### 1. 🛡️ 100% Client-Side Privacy (Zero Cloud Upload)
Seluruh pipeline grafis—mulai dari mapping tekstur UV, rendering 3D Three.js, hingga proses *rasterization* ekspor—dijalankan secara lokal di memori GPU peramban pengguna. Tangkapan layar desain rahasia tidak pernah dikirimkan atau disimpan di server mana pun.

### 2. 📱 True-to-Life Flagship Hardware Geometry
- **iPhone 16 Pro:** Kluster tiga lensa segitiga (*triangular Pro cluster*) dengan sensor LiDAR hitam, True Tone flash, dan pulau kamera persegi membulat.
- **iPhone 15:** Formasi lensa diagonal asli dengan Dynamic Island horizontal.
- **Galaxy S24 Ultra & Google Pixel 8 Pro:** Desain cincin lensa individu mengambang vertikal serta visor bar horizontal khas Pixel.
- **MacBook Pro 16" & Air M3:** Sasis deck horizontal presisi dengan keyboard dan trackpad mendatar rata bodi, engsel layar natural, dan notch FaceTime.
- **Tablets (iPad Pro M4, iPad Air, Galaxy Tab S9 Ultra):** Geometri sasis adaptif rasio native (Portrait 3:4 & Landscape 16:10) dengan corner radiuses bebas distorsi.

### 3. 🎯 High-DPI Screen Mapping & Anti-Aliasing
Dilengkapi **16x Anisotropic Filtering**, **Trilinear Mipmapping**, dan supersampling tekstur minimal 2048 px. Mencegah efek buram (*blur*), *aliasing*, atau garis bergerigi (*subpixel shimmering*) saat kamera di-zoom out menjauh.

### 4. 🌐 Live URL Screenshot Fetcher
Pengguna dapat langsung memasukkan tautan situs web aktif (misal: `github.com` atau `dribbble.com`), dan MockDrop akan otomatis mengambil tangkapan layar situs secara instan untuk dipasang presisi ke dalam layar mockup tanpa upload manual.

### 5. 🔄 Auto-Rotate 360° Turntable & Video Loop Recording
- Mode **360° Turntable** memutar perangkat secara mulus untuk kebutuhan presentasi showcase langsung.
- Perekam video bawaan via **MediaRecorder API** (VP9 Codec 60 FPS 30 Mbps) yang mengekspor rotasi 360° langsung ke format video **WebM** siap pakai untuk media sosial atau website hero.

### 6. 📋 One-Click Copy to Clipboard & 4K Retina Export
- Salin render langsung ke clipboard sistem via **Clipboard API native** (`Ctrl+V` instan ke Figma, Canva, Notion, atau Slack).
- Ekspor berkas **PNG Transparan (Alpha)** dan **WebP** beresolusi tinggi hingga 4K Ultra HD tanpa watermark.

---

## 📂 Katalog Perangkat Kurasi

| Kategori | Model Tersedia | Rasio Native | Fitur Hardware Khusus |
| :--- | :--- | :--- | :--- |
| **Smartphones** | iPhone 16 Pro, iPhone 15, iPhone SE, Galaxy S24 Ultra, Pixel 8 Pro, Nothing Phone (2) | 9:19.5 & 9:20 | Dynamic Island horizontal, Pro Triangle Triple Lens, LiDAR, Camera Visor Bar |
| **Tablets** | iPad Pro M4, iPad Air, Galaxy Tab S9 Ultra | 3:4 & 16:10 | Dynamic chassis orientation (Portrait & Landscape WQXGA+), Bezel-fitting ShapeGeometry |
| **Laptops & Desktops** | MacBook Pro 16", MacBook Air M3, iMac 24", Studio Display Ultra-Wide | 16:10, 16:9, 21:9 | Flat deck keyboard & trackpad, FaceTime notch, aluminum stand rig |
| **Browser Windows** | Safari Glass Window, Chrome Minimal Window | 16:10 | Window control dots, URL pill bar, hairline border, glassmorphism transmission |

---

## 🛠️ Arsitektur Teknologi

```
MockDrop/
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── devices/              # Model geometri 3D (PhoneModel, TabletModel, LaptopModel, BrowserModel)
│   │   │   ├── CameraRig.tsx         # OrbitControls dengan damping & auto-rotate turntable
│   │   │   ├── DeviceRenderer.tsx    # Dynamic category switcher
│   │   │   ├── SceneLighting.tsx     # Preset pencahayaan studio (Studio, Sunset, Cyberpunk, Daylight)
│   │   │   └── StudioCanvas.tsx      # R3F Canvas dengan High-DPR, contact shadow & floor reflection
│   │   ├── landing/                  # Landing page asimetris, live terminal specs & hero workbench
│   │   ├── modals/                   # LoginModal (gated auth), VideoModal (interactive 3D tour), Pricing, Catalog, Help
│   │   └── studio/                   # Studio TopBar, responsive drawer Sidebar, StatusBar, ExportModal
│   ├── store/
│   │   └── useStudioStore.ts         # Zustand central state & session persistence
│   ├── types/                        # TypeScript domain contracts & specifications
│   └── utils/
│       ├── defaultScreens.ts         # Canvas generators untuk default wallpaper resolusi tinggi
│       ├── exportImage.ts            # High-DPI canvas exporter & 360° WebM video recorder
│       └── imageProcessor.ts         # Supersampling cover/fit image pipeline
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 💻 Panduan Instalasi Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) v18.0.0 atau lebih tinggi
- npm / yarn / pnpm

### Langkah Instalasi
```bash
# 1. Clone repository
git clone https://github.com/gadingrdtya/MockDrop.git

# 2. Masuk ke direktori proyek
cd MockDrop

# 3. Pasang seluruh dependensi
npm install

# 4. Jalankan development server
npm run dev
```

Buka peramban di: `http://localhost:5173`

Untuk melakukan pengecekan tipe data dan build produksi:
```bash
# Type-check TypeScript
npx tsc --noEmit

# Production build
npm run build
```

---

## 🌐 Panduan Deployment

MockDrop adalah aplikasi web frontend statis tanpa dependensi backend server, sehingga dapat dideploy secara instan di platform seperti **Vercel**, **Netlify**, atau **GitHub Pages**.

### Deployment ke Vercel dengan Custom Subdomain
1. Import repository `MockDrop` di dashboard [Vercel](https://vercel.com).
2. Framework Preset akan otomatis terdeteksi sebagai **Vite**.
3. Klik **Deploy**.
4. Di menu **Project Settings > Domains**, tambahkan custom subdomain Anda (misal: `mockdrop.domainanda.my.id`).
5. Tambahkan record CNAME di DNS Management penyedia domain Anda:
   - **Type:** `CNAME`
   - **Name:** `mockdrop`
   - **Target:** `cname.vercel-dns.com`

---

## 📄 Lisensi
Didistribusikan di bawah lisensi [MIT License](LICENSE).
Seluruh kalkulasi WebGL dan aset mockup bersifat bebas digunakan untuk proyek komersial maupun pribadi tanpa watermark.
