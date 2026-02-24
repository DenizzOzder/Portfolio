# Antigravity AI - Lessons Learned

Bu dosya, projede geliştirme yaparken karşılaşılan sorunlar, kullanıcı uyarıları ve mimari tercih hatalarından çıkarılan dersleri içerir. Her oturum veya büyük görev öncesinde bu kurallar okunmalıdır.

## 1. Mimari ve Bileşen Seçimleri
* **React 18 StrictMode ve Redux Global Loader**: Geliştirme ortamında (Dev Mode), React `useEffect` hook'larını iki kez çalıştırır (Mount -> Unmount -> Mount). Eğer bir bileşen mount olduğunda asenkron bir Redux loading aksiyonu başlatıyorsa (`dispatch(startLoading())`), ve promise çözülmeden (await bitmeden) bileşen unmount edilirse `stopLoading` asla çağrılmayabilir. Bu durumda counter tabanlı (`activeRequests`) bir global loader sonsuz döngüde asılı (loop) kalır. Çözüm: Her asenkron veri çeken useEffect içinde `let isMounted = true` ile `cleanup function` tanımlamak ve finally bloğunda veya cleanup'ta sayacı mutlaka geri almaktır.

## 2. UI / UX İsterleri
* (Buraya öğrenilen dersler eklenecek)

## 3. Genel Hata Yönetimi
* (Buraya öğrenilen dersler eklenecek)
