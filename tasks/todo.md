# Active Tasks & To-Dos

## Current Objective: Global Data Caching (UX Improvement)
- [x] `@tanstack/react-query` kütüphanesini projeye kur.
- [x] `src/store/store.ts` veya projeyi sarmalayan `main.tsx` içerisine `QueryClientProvider` ekle.
- [x] Backend isteklerini (getFeaturedProjects, getEducationHistory, getAboutData) React Query `useQuery` hook'u ile sarmalayacak özel custom hook'lar oluştur (`hooks/useProjects.ts` vb).
- [x] Bileşenleri (`FeaturedProjects`, `ProjectDetail`, `Education`, `About`) eski `useEffect` ve manuel Redux dispatch (startLoading/stopLoading) mantığından kurtar.
- [x] Sadece *ilk veri çekiminde* veya *uygulamadaki ilk ana yüklemede* global loader'ı tetikleyecek, daha sonrasında cache'den veri döndürecek bir strateji kurgula (Örn: Redux loader'ı sadece `isInitialLoading` için kullanmak veya React Query'nin global fetching state'ini Redux'a bağlamak).

## Completed Tasks
- [x] Hakkımda (About) Sayfası Zig-Zag Düzeni ile yapıldı.
- [x] Tüm sistem Redux Global loader'a geçirildi, Route eklendi.
- [x] Proje Detay Sayfası (`ProjectDetail.tsx`) Figma kurallarına uygun şekilde, slayder ve içerik parser özellikleri ile tamamlandı.
- [x] Proje tıklama (Link) mekanizması ve ID iletim statüye bağlanarak çözüldü.
