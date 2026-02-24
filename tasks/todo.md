# Active Tasks & To-Dos

## Current Objective: About Page Layout & Backend-Ready Architecture
- [x] `types/about.ts` dosyasını oluştur: `AboutRow` tipini tanımla (`id`, `title`, `content`, `imageUrl`, `imagePosition: 'left' | 'right'`).
- [x] `services/aboutService.ts` dosyasını oluştur: Gelecekte Admin Panelinden gelecek olan "Hakkımda Satırları" için mock dataları barındır.
- [x] `/about` (`pages/About.tsx`) sayfasını Figma/Modern standartlarda tasarla.
  - [x] Sayfanın en üstünde şık bir Hero/Başlık bölümü oluştur.
  - [x] Her `AboutRow` verisini döngüye alarak değişen düzenle (Zig-Zag / Alternating) ekrana bas.
  - [x] Görseller için yavaşça beliren (fade-in) veya kayan (slide-in) Framer Motion animasyonları ekle.
- [x] Kodu, ileride DB bağlandığında anında çalışacak modüler standartta tut.

## Completed Tasks
- [x] Tüm sistem Redux Global loader'a geçirildi, Route eklendi.
- [x] Proje Detay Sayfası (`ProjectDetail.tsx`) Figma kurallarına uygun şekilde, slayder ve içerik parser özellikleri ile tamamlandı.
- [x] Proje tıklama (Link) mekanizması ve ID iletim statüye bağlanarak çözüldü.
