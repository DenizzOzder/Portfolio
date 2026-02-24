# Active Tasks & To-Dos

## Current Objective: Routing & Global Loader Refactor
- [x] Tüm sistem Redux Global loader'a geçirildi, Route eklendi. (Tamamlandı)

## Next Objective: Project Details Page (Mock & Architecture)
- [x] `types/project.ts` dosyasına `content` ve `images` (array) ekle.
- [x] `services/projectService.ts` içindeki tamamlanan projelere sahte slider görselleri ve sahte uzun açıklama metinleri ekle.
- [x] `FeaturedProjects.tsx` kartlarındaki linkleri güncelle (Sadece `status === 'completed'` olanlara tıklanabilsin).
- [x] `ProjectDetail.tsx` sayfasını Figma/Modern tasarımlara uygun olarak kodla.
  - [x] Başlık, Role (Altbaşlık) ve TechStack gösterimini ekle.
  - [x] Görseller için Carousel / Slider bileşeni yap.
  - [x] Proje İçeriği (Content) alanını ekle.
  - [x] Sayfa altına "Önceki Tamamlanan Proje" ve "Sonraki Tamamlanan Proje" geçiş (navigasyon) butonlarını ekle.
- [ ] (Not): Tüm yapı ileride Admin panel / Backend ile değişebilecek soyutlamada olmalı.

