# 💠 Aposis V3 Design System (`@aposis/design-system`)

> **Atomic Design System** berbasis React, TypeScript, dan Tailwind CSS yang dirancang khusus untuk ekosistem aplikasi & microservices di **Aposis**.

---

## 📑 Daftar Isi
- [Arsitektur & Konsep](#-arsitektur--konsep)
- [Instalasi di Repositori Konsumen](#-instalasi-di-repositori-konsumen)
- [Konfigurasi Tailwind CSS (2 Metode)](#-konfigurasi-tailwind-css)
- [Cara Menggunakan Komponen](#-cara-menggunakan-komponen)
- [Struktur Komponen (Atomic Design)](#-struktur-komponen-atomic-design)
- [Pengembangan Lokal & Playground](#-pengembangan-lokal--playground)
- [Mempublikasikan Versi Baru](#-mempublikasikan-versi-baru-publish)

---

## 🏛 Arsitektur & Konsep

Repositori ini menerapkan metodologi **Atomic Design**:
1. **Tokens (`src/tokens/`)**: Warna brand Aposis, radius, shadow, font family.
2. **Atoms (`src/atoms/`)**: Komponen atomik independen terkecil (`Button`, `Input`, `Badge`, `Avatar`, `Spinner`, `Checkbox`, `Typography`).
3. **Molecules (`src/molecules/`)**: Gabungan atom membentuk fungsi spesifik (`FormField`, `SearchBar`, `Alert`, `Modal`, `Tabs`).
4. **Organisms (`src/organisms/`)**: Pola antarmuka lengkap (`Navbar`, `Sidebar`, `StatCard`, `DataTable`, `Card`).

---

## 📦 Instalasi di Repositori Konsumen

Jalankan perintah berikut di repositori target Anda (misal `aposis-fe-v2`, `aposis-school-dashboard`, dll.):

```bash
npm install @aposis/design-system
```

> **Untuk pengujian lokal (Local Development):**
> Anda bisa menghubungkan langsung tanpa publish ke npm menggunakan npm link:
> ```bash
> # Di folder aposis_v3_design_system
> npm link
>
> # Di folder repo konsumen (misal aposis-fe-v2)
> npm link @aposis/design-system
> ```

---

## 🎨 Konfigurasi Tailwind CSS

Design System ini menyediakan **2 opsi pemakaian style**:

### Opsi A: Menggunakan Tailwind Preset (Direkomendasikan)
Jika aplikasi Anda sudah menggunakan Tailwind CSS, gunakan preset Aposis agar ukuran bundle CSS sangat optimal dan tidak ada kelas yang bentrok:

```javascript
// tailwind.config.js (atau tailwind.config.mjs) di repo Anda
import aposisPreset from '@aposis/design-system/tailwind.preset';

export default {
  presets: [aposisPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // PENTING: Tambahkan baris di bawah agar Tailwind memindai komponen design-system:
    './node_modules/@aposis/design-system/**/*.{js,mjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Opsi B: Mengimpor Standalone CSS (Zero-Config)
Jika Anda tidak ingin mengubah konfigurasi Tailwind atau ingin styling langsung jadi:

```typescript
// src/main.tsx atau src/App.tsx
import '@aposis/design-system/style.css';
```

---

## 🚀 Cara Menggunakan Komponen

### 1. Import Standar (Barrel Import)
```tsx
import React, { useState } from 'react';
import {
  Button,
  Input,
  Badge,
  FormField,
  StatCard,
  Modal
} from '@aposis/design-system';

export function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-4">
      <StatCard
        title="Total Siswa"
        value="1,240"
        change={{ value: '+12%', trend: 'up', label: 'vs pekan lalu' }}
      />

      <FormField label="Nama Lengkap" required>
        <Input placeholder="Masukkan nama..." />
      </FormField>

      <Button variant="primary" onClick={() => setOpen(true)}>
        Buka Modal
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Konfirmasi">
        <p>Konten modal dialog di sini...</p>
      </Modal>
    </div>
  );
}
```

### 2. Subpath Import (Tree-shaking Maksimal)
```tsx
import { Button, Badge } from '@aposis/design-system/atoms';
import { FormField, SearchBar } from '@aposis/design-system/molecules';
import { StatCard, DataTable } from '@aposis/design-system/organisms';
import { colors, radii } from '@aposis/design-system/tokens';
```

---

## 🧩 Struktur Komponen (Atomic Design)

| Tipe | Nama Komponen | Deskripsi |
|---|---|---|
| **Atom** | `Button` | Varian `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `isLoading`, `leftIcon`, `rightIcon` |
| **Atom** | `Input` | Input teks dengan `leftIcon`, `rightIcon`, error highlight, sizes |
| **Atom** | `Badge` | Pill status dengan variant `subtle`, `solid`, `outline`, serta status dot |
| **Atom** | `Avatar` | Gambar profil / inisial fallback, status indicator (`online`, `busy`, `away`, `offline`) |
| **Atom** | `Spinner` | Loading indicator berbagai ukuran dan warna |
| **Atom** | `Checkbox` | Checkbox kustom aksesibel dengan label dan keterangan bantuan |
| **Atom** | `Heading`, `Text` | Semantic typography dengan konsistensi font & line height |
| **Molecule** | `FormField` | Pembungkus terpadu `label`, `required mark`, `input`, `helperText`, dan `error` |
| **Molecule** | `SearchBar` | Input pencarian instan dengan shortcut indicator (⌘K), clear button, submit callback |
| **Molecule** | `Alert` | Banner notifikasi kontekstual (`info`, `success`, `warning`, `danger`) dengan dismiss button |
| **Molecule** | `Modal` | Dialog popup aksesibel dengan backdrop blur, header, body, and action footer |
| **Molecule** | `Tabs` | Navigasi tab dengan garis aktif animasi atau pill style |
| **Organism** | `Navbar` | Header navigasi lengkap dengan logo brand, tautan, notifikasi, dan user avatar |
| **Organism** | `Sidebar` | Navigasi menu samping aplikasi dengan fitur collapse dan badge counter |
| **Organism** | `StatCard` | Kartu metrik KPI dengan persentase tren naik/turun dan icon container |
| **Organism** | `DataTable` | Tabel data reusable dengan empty state, custom row renderer, dan pagination |
| **Organism** | `Card` | Card container modular (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) |

---

## 💻 Pengembangan Lokal & Playground

Repositori ini dilengkapi dengan **Interactive Component Showcase** untuk menguji dan melihat komponen secara visual:

```bash
# Menjalankan Dev Server Showcase
npm run dev

# Melakukan Build Library & Typescript Declarations
npm run build

# Menguji Kelayakan File Package (Dry Run)
npm run package:test
```

Buka `http://localhost:5173` di peramban Anda untuk melihat semua komponen secara interaktif.

---

## 🚢 Mempublikasikan Versi Baru (Publish)

1. Pastikan semua perubahan sudah di-commit di git:
   ```bash
   git status
   ```
2. Lakukan build produksi:
   ```bash
   npm run build
   ```
3. Update versi semver (misal patch atau minor):
   ```bash
   npm version patch # atau: npm version minor
   ```
4. Publikasikan ke registry npm (atau GitHub Packages / private registry):
   ```bash
   npm publish --access public
   ```
