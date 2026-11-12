# Kadıköy Simit

Build gerektirmeyen HTML, CSS ve JavaScript sitesi.

- `index.html`: fotoğraflı ana sayfa
- `lezzetlerimiz/index.html`: 95 ürün, kategori filtreleri ve arama
- `urun/<urun-kimligi>/index.html`: 95 bağımsız ürün detay sayfası
- `iletisim/index.html`: adres, harita ve yol tarifi
- `style.css` / `app.js`: ortak görünüm ve etkileşimler
- `products.js`: menü verisinin kayıtlı kopyası
- `assets/`: 90 ürün fotoğrafı

Paket miktarları kaynak menüden alınmıştır. Diğer gramajlar kullanıcı isteğiyle porsiyon aralıkları olarak eklenmiştir. Alerjen listeleri ürün adı ve tipik tariften çıkarılan ön bilgilerdir; kesin içerik ve çapraz bulaşma henüz doğrulanmamıştır. İşletmenin sonradan güncelleyeceği verilerdir. Siparişler Yemeksepeti'ne yönlendirilir.

Menü ve adres kaynağı: https://www.yemeksepeti.com/restaurant/lj50/kadikoy-simit
Aktarım tarihi: 12 Kasım 2026. Menü fiyatları otomatik güncellenmez.

Yerelde: `python3 -m http.server 8080`.
