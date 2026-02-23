# Proje Rehberi ve Geliştirme Notları

Bu döküman sadece yerel ortamda (`local`) bulunacak şekilde ayarlanmıştır ve Git geçmişine dahil edilmemelidir. Projenin mimarisini, kullanılan teknolojilerin nedenlerini ve gelecek vizyonunu içerir.

## 1. Proje Yapısı ve Klasörlerin Amacı

Bu proje bir **Monorepo** (Tek Depo) yapısına sahiptir. Tüm frontend, backend ve ortak paylaşılan kütüphaneler tek bir `git` reposu içinde yönetilir.

*   **`apps/`**: Uygulamaların (son kullanıcıya veya sunucuya çıkan kodların) bulunduğu klasör.
    *   **`apps/web/`**: **React + Vite** tabanlı Frontend projesi. Portfolyo sitemizin görsel yüzü buradadır. Next.js yerine, tamamen SPA (Single Page Application) mantığında ve hızlı bir geliştirme süreci için Vite tercih edilmiştir.
    *   **`apps/api/`**: **Node.js + Express** tabanlı Backend projesi. İletişim formu, proje verileri gibi dinamik işler burada dönecektir.
*   **`packages/`**: Ortak kullanılan, paylaşımlı kodların bulunduğu klasör.
    *   **`packages/ui/`**: Proje genelinde kullanılacak ortak UI bileşenleri (Button, Card, Layout vb.) burada geliştirilir. Böylece hem web hem de ileride yapılabilecek bir admin panel aynı butonları kullanabilir.
    *   **`packages/config/`**: Ortak yapılandırma dosyaları. TypeScript (`tsconfig`), ESLint ve Tailwind ayarları buradan yönetilir. Bu sayede tüm projelerde standart bir kod kalitesi sağlanır.
*   **`turbo.json`**: Turborepo'nun orkestra şefi. Hangi scriptin ne zaman, hangi sırayla ve önbelleklenerek (cache) çalışacağını belirler.

## 2. Kullanılan Teknolojiler ve Nedenleri

### Neden Turborepo?
Monorepo yönetiminde standart araçlardan biri haline gelmiştir. Bize sağladığı en büyük avantajlar:
1.  **Önbellekleme (Caching)**: Siz `pnpm build` dediğinizde, Turborepo daha önce değişmemiş dosyaları tekrar derlemez. "Zaten bunu yapmıştın" diyerek milisaniyeler içinde işlemi tamamlar.
2.  **Paralel Koşma**: Frontend'i ve Backend'i aynı anda başlatmak veya test etmek istediğinizde çekirdeklerinizi sonuna kadar kullanır.
3.  **Bağımlılık Yönetimi**: `apps/web` projesi `packages/ui` kütüphanesine bağımlıysa, UI değiştiğinde Web'in de yeniden derlenmesi gerektiğini bilir.

### Diğer Teknolojiler
*   **pnpm**: npm ve yarn'a göre çok daha hızlıdır ve disk alanından tasarruf eder (`symlink` mantığıyla). Monorepolar için en iyi paket yöneticisidir.
*   **Vite**: React projelerini geliştirmek için şu anki endüstri standardıdır. Webpack'e göre çok daha hızlı başlatma (HMR) süresi sunar.
*   **Tailwind CSS**: Hızlı, tutarlı ve modern CSS yazmak için. "Design Token" mantığını (renkler, boşluklar) tek bir yerden yönetmemizi sağlar.
*   **TypeScript**: Tip güvenliği sağlayarak çalışma zamanı hatalarını kod yazarken yakalamamızı sağlar.
*   **ogl (React Particles)**: Canvas tabanlı, yüksek performanslı ve hafif 3D/WebGL animasyonları için kullanıyoruz. Sitenin uzay/particle arka plan efektlerini pürüzsüz çalıştırır.
*   **framer-motion**: Akıcı bileşen animasyonları ve sayfa geçişleri için. Floating menüler gibi etkileşimli bileşenlerde sıklıkla başvurulur.

## 3. Geliştirme Mimari Kuralları & Katmanlı Mimari (Layered Architecture)

Projeyi geliştirirken belli standartlara ve mimari yaklaşımlara sadık kalıyoruz.

*   **Katmanlı Mimari (Backend & Data Flow)**: Veri akışı ve iş mantığı `GraphQL Resolvers → Services → Repositories → Firebase` şeklinde ilerler. Component'ler (UI) doğrudan veritabanı (Firebase) çağırmamalı, aradaki Service/Resolver katmanlarını tüketmelidir.
*   **Component Yapısı**: Sayfa bütünlüğünü bozmamak adına; Hero, TechStack, Careers gibi bölümler modüler olarak ayrılır. Her component kendi içinde animasyonlarını yönetir ancak birbirleri arasına (örneğin TechStack'ten Careers'a bağlarken) yumuşak geçiş sağlayan gradient maskeler (`bg-gradient-to-b`) eklenir.
*   **Görsellik ve CSS**: Custom CSS dosyalarından (örneğin `.css`) olabildiğince kaçınılır. Tailwind "utility-first" yaklaşımıyla tüm stillendirmeler `className` üzerinden yönetilir. Zorunlu hallerde (canvas manipülasyonu gibi) Arbitrary Variants `[&>canvas]:w-full` gibi Tailwind özellikleriyle iç içe elementlere stil verilir.

## 4. Gelecek İçin Fikirler ve Geliştirme Önerileri

Bu projeyi daha ileriye taşımak için aşağıdaki geliştirmeleri yapabiliriz:

### Geliştirme Süreci (DX)
*   [ ] **Admin Paneli**: Projelerinizi veya blog yazılarınızı eklemek için `apps/admin` adında yeni bir React uygulaması eklenebilir (`packages/ui` bileşenlerini kullanarak).
*   [ ] **Mock Service**: Backend henüz hazır değilken Frontend geliştirmek için `MSW (Mock Service Worker)` kurulabilir.
*   [ ] **CI/CD Pipeline**: GitHub Actions ile her push sonrası otomatik test ve build süreçleri.

### Özellikler (Features)
*   [ ] **Blog Modülü**: Markdown (MDX) tabanlı bir blog yapısı. Yazılımcı olarak tecrübelerinizi paylaşmak için harika bir yoldur.
*   [ ] **Karanlık/Aydınlık Mod**: Şu an "Uzay" temasıyla karanlık moddayız ama, profesyonel kurumsal bir görünüm için bir "Light Mode" toggle eklenebilir.
*   [ ] **CMS Entegrasyonu**: İçerikleri kodun içinden değil, Strapi veya Sanity gibi bir Headless CMS'ten çekmek.
*   [ ] **i18n (Çoklu Dil)**: Portfolyonuzu hem Türkçe hem İngilizce sunmak için dil desteği.

### Performans ve SEO
*   [ ] **SSR (Server Side Rendering)**: React (SPA) SEO konusunda bazen zayıf kalabilir. İleride SEO çok kritik olursa Next.js'e geçiş (veya Vite SSR pluginleri) düşünülebilir.
*   [ ] **PWA (Progressive Web App)**: Sitenin mobil uygulama gibi telefona kurulabilmesi.

---
*Bu döküman kişisel notlarınız içindir ve git tarafından takip edilmez.*
