# Kadıköy Simit

Build gerektirmeyen HTML, CSS ve JavaScript sitesi.

- `index.html`: fotoğraflı ana sayfa
- `lezzetlerimiz/index.html`: 95 ürün, kategori filtreleri ve arama
- `urun/<urun-kimligi>/index.html`: 95 bağımsız ürün detay sayfası
- `iletisim/index.html`: adres, harita ve yol tarifi
- `style.css` / `app.js`: ortak görünüm ve etkileşimler
- `products.js`: menü verisinin kayıtlı kopyası
- `assets/`: 90 ürün fotoğrafı

Gramajlar yalnızca kaynak menüde belirtilen miktarları içerir. Diğer miktarlar ve doğrulanmamış alerjenler yerine işletmeyle iletişim bilgisi gösterilir. Siparişler Yemeksepeti'ne yönlendirilir.

Menü ve adres kaynağı: https://www.yemeksepeti.com/restaurant/lj50/kadikoy-simit
Aktarım tarihi: 12 Kasım 2026. Menü fiyatları otomatik güncellenmez.

Yerelde: `python3 -m http.server 8080`.
