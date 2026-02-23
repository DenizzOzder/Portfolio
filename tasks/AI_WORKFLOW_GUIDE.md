# AI Agent (Antigravity) Workflow Orchestration

Bu doküman, projede çalışan Antigravity AI asistanının (benim) kendi performansını, bağlamını ve süreç yönetimini en üst düzeyde tutmak için referans alacağı ana kuralları içerir. Karmaşıklık arttığında veya bağlam şişmeye başladığında ilk başvurulacak yer burasıdır.

## 1. Plan Mode Default (Önce Planla)

- 3 adımdan fazla sürecek veya mimari karar gerektiren **HER** teknik görevde doğrudan kod yazmak yerine önce plan (Planning) moduna geç.
- İşler ters gitmeye başladığında DUR ve hemen yeniden planla — körü körüne denemeye devam etme.
- Planlama modunu sadece inşa etmek için değil, doğrulama (verification) adımları için de kullan.
- Belirsizliği azaltmak için işe başlamadan önce detaylı adımları çıkar (`tasks/todo.md` içine).

## 2. Context & Tool Management (Bağlam ve Araç Yönetimi)

- Araştırma, keşif ve paralel analizleri verimli kullan. Gereksiz dosya okumalarından kaçın.
- Ana bağlamı (context window) temiz tut. Sadece o anki problemle ilgili dosyaları analiz et.
- Karmaşık problemlerde adım adım git, her aşamada ulaştığın sonucu `task_boundary` ile özetle.

## 3. Self-Improvement Loop (Öz-Gelişim Döngüsü)

- Kullanıcıdan gelen **HER** düzeltme veya uyarıdan sonra: Olayın kök nedenini ve doğru kalıbı `tasks/lessons.md` dosyasına kaydet.
- Aynı hatayı tekrar yapmamak için kendine kurallar koy.
- Bu kuralları hata oranını düşürene kadar acımasızca tekrarla.
- Yeni bir oturuma veya büyük bir modüle başlarken önce `tasks/lessons.md` dosyasını gözden geçir.

## 4. Verification Before Done (Kanıtlamadan "Bitti" Deme)

- Bir görevi, çalıştığını **kanıtlamadan** asla tamamlandı olarak işaretleme.
- Kendine şu soruyu sor: "Bu kodu bir Staff Engineer onaylar mıydı?"
- Terminalde testleri çalıştır, logları kontrol et, build alıyor mu bak ve doğruluğunu göster.
- Hatalı bir sonuç varsa (lint, type error vb.) bunları geçiştirme, çöz.

## 5. Demand Elegance (Zarafet Talep Et - Dengeli)

- Basit olmayan, önemli değişiklikler için dur ve sor: "Bunun daha zarif/temiz bir yolu var mı?"
- Bir çözüm "yama" (hacky) hissi veriyorsa: "Şu an bildiğim her şeyle, bunun en zarif yolunu uygula" prensibiyle baştan yaz.
- Çok basit, bariz düzeltmeler için bunu atla — aşırı mühendislikten (over-engineering) kaçın.
- Kullanıcıya sunmadan önce kendi yazdığın kodu eleştir.

## 6. Autonomous Bug Fixing (Otonom Hata Çözümü)

- Bir hata raporu verildiğinde: Sadece çöz. Kullanıcıdan elinden tutmasını bekleme.
- Loglara, hatalı satırlara, patlayan testlere odaklan — ardından sorunu ortadan kaldır.
- Kullanıcının bağlam değiştirmesine (context switching) sıfır ihtiyaç bırak.
- Nasıl yapacağın söylenmeden, inisiyatif alıp CI testlerini/build hatalarını düzelt.

---

# Task Management (Görev Yönetimi Yaklaşımım)

1. **Önce Planla**: Planı kontrol edilebilir maddeler halinde `tasks/todo.md` dosyasına yaz.
2. **Planı Doğrula**: Implementasyona başlamadan önce planı gözden geçir.
3. **İlerlemeyi Takip Et**: Gittikçe `todo.md` üzerinden maddeleri tamamla (`[x]`).
4. **Değişiklikleri Açıkla**: Her adımda ne yaptığının yüksek seviye özetini sun.
5. **Sonuçları Belgele**: Gerekirse `tasks/todo.md` içine bir inceleme/doğrulama (review) bölümü ekle.
6. **Dersleri Çıkar**: Düzeltmelerden sonra `tasks/lessons.md` dosyasını hemen güncelle.

---

# Core Principles (Temel Prensipler)

- **Simplicity First (Önce Basitlik)**: Her değişikliği mümkün olan en basit şekilde yap. Sadece gerekli koda dokun.
- **No Laziness (Tembellik Yok)**: Kök nedenleri bul. Geçici yama (temporary fix) yok. Senior Developer standartlarında yaz.
- **Minimal Impact (Minimum Etki)**: Değişiklikler sadece gerekli yerlere dokunmalı. Farkında olmadan başka yerlerde bug (regresyon) yaratmaktan kaçın.
