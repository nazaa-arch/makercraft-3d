# 🎨 MakerCraft 3D (`maker.steamcraft.online`)

> **Generative Mathematical Art, 3D Parametric Studio & STL/OBJ Generator for STEAM**  
> *Procedural 3D Mesh Generation, Torus Knots, Möbius Strips, Spherical Harmonics, and Exportable 3D Models.*

[![SteamCraft Ecosystem](https://img.shields.io/badge/Ecosystem-steamcraft.online-0284c7?style=for-the-badge&logo=googlechrome&logoColor=white)](https://steamcraft.online)
[![Creator Portfolio](https://img.shields.io/badge/Creator-Muhammad%20Naza%20Firmansyah-a855f7?style=for-the-badge&logo=github&logoColor=white)](https://portofolionaza.steamcraft.online)

---

## 🌟 Ikhtisar Proyek

**MakerCraft 3D** adalah studio seni matematika parametrik 3D interaktif yang menggabungkan pilar **Art** dan **Mathematics** dalam STEAM (*Science, Technology, Engineering, Art, and Mathematics*).

Aplikasi ini menghasilkan mesh permukaan parametrik matematis secara real-time pada GPU peramban (Three.js WebGL) dan memungkinkan pengguna mengekspor model langsung ke format `.OBJ` standar yang siap dicetak pada printer 3D laboratorium atau diolah di software 3D seperti Blender.

---

## 🚀 Fitur Utama

1. **Permukaan Parametrik Matematika 3D**:
   - **Torus Knot $(p, q)$**: Kurva simpul torus dengan parameter frekuensi dan belitan.
   - **Möbius Strip**: Permukaan satu sisi non-orientable berputar $180^\circ$.
   - **Harmonik Bola (Spherical Harmonics)**: Permukaan radial terdeformasi harmonis $r(\theta, \phi)$.
   - **Superformula 3D**: Morfologi biologis kristal dan flora.

2. **Viewport 3D GPU Real-Time**:
   - Orbit rotasi 360 derajat, zoom berbasis scroll mouse, pencahayaan multi-arah (*Directional & Point Lights*).
   - Mode kawat (*Wireframe Mode*) dan rotasi otomatis (*Auto-Orbit*).

3. **Tema Shading Berkelas**:
   - Cyberpunk (Pink & Cyan Neon)
   - Emerald Matrix
   - Amber Gold (Metallic Brass)
   - Hologram Cyber

4. **Ekspor 3D Print (.OBJ)**:
   - Generator format wavefront `.obj` berbasis peramban (*client-side*) yang mengonversi atribut verteks, normal, dan indeks wajah segitiga secara presisi.

---

## 🛠️ Arsitektur Teknologi

- **3D Graphics Engine**: Three.js WebGL
- **Frontend**: React 19 dengan TypeScript
- **Styling**: Tailwind CSS v4 (@tailwindcss/vite) + Lucide Icons
- **Bundler**: Vite 8 (Port `3003`)

---

## 💻 Menjalankan Secara Lokal

```powershell
cd "C:\Kebutuhan Data Pribadi\MakerCraft 3D"
.\dev.ps1
```

Akses di peramban pada **`http://localhost:3003`**.

---

## 👤 Pengembang & Kepemilikan

- **Lead Developer & System Architect**: **Muhammad Naza Firmansyah**
- **Institusi**: Program Studi Sains Data, Universitas Negeri Surabaya (UNESA)
- **Portofolio**: [portofolionaza.steamcraft.online](https://portofolionaza.steamcraft.online)
- **Ekosistem**: [steamcraft.online](https://steamcraft.online)
