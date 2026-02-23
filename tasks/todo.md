# Active Tasks & To-Dos

## Current Objective: Education Backend Service & UI Update

- [x] `src/services/educationService.ts` oluştur ve şimdilik mock datayı buradan döndüren async bir servis yaz (Gelecekteki GraphQL/Firebase yapısına hazırlık).
- [x] `Education.tsx` bileşenini bu servisi tüketecek şekilde (useState, useEffect, loading state) güncelle.
- [x] `100% Burslu` gibi status bilgilerini card'ın içine değil, hemen üstüne bir etiket (badge/ribbon) gibi iliştir.
  - Yol (Roadmap) hissi vermesi için birbirine bağlı noktalar veya SVG path kullanılabilir.
  - Sıralama: Lise (2014-2018) -> Önlisans (2018-2020) -> Lisans (2022-2026) -> Bootcamp (2024-2025) şeklinde kronolojik bir yolculuk.
- [x] Verileri hiyerarşik yapılandır (Kurum, Bölüm, Tarih, Not Ortalaması/Durum, Teknolojiler).
- [x] `App.tsx` dosyasında `<AboutMe />` altına `<Education />` ekle.
- [x] Tasarımı mobil ve masaüstü için kontrol et.
