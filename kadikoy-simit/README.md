# Kadıköy Simit

Build gerektirmeyen HTML, CSS ve JavaScript menü sitesi.

- `index.html`: sayfa iskeleti
- `style.css`: duyarlı görünüm
- `app.js`: ürün detayları, kategori filtreleri, arama ve paylaşım
- `products.js`: 95 ürünün adı, fiyatı ve kategori bilgisi
- `assets/`: kaynak menüden ürün fotoğrafları

Yerelde çalıştırmak için: `python3 -m http.server 8080`.

Her ürüne `#urun/urun-kimligi` adresiyle doğrudan gidilebilir. Sipariş düğmeleri restoranın Yemeksepeti sayfasını açar. Bu statik sitede sipariş veya ödeme alınmaz.

Menü/fotoğraf kaynağı: https://www.yemeksepeti.com/restaurant/lj50/kadikoy-simit
Aktarım tarihi: 12 Kasım 2026. Fiyatlar otomatik güncellenmez.

## Gramaj ve alerjen alanları

Ürün adında belirtilen paket miktarları menüden alınmıştır. Diğer gramaj ve porsiyonlar kullanıcı talebiyle tahmini aralık olarak eklenmiştir ve “Tahmini” rozeti taşır. Alerjenler ürün adına ve tipik tarife dayalı ön değerlendirmedir; işletme tarafından doğrulanmamıştır. Eksiksiz içerik veya çapraz bulaşma garantisi vermez. Doğrulanmış bilgiler geldiğinde `amount`, `amountEstimated`, `allergens`, `allergensVerified` ve `allergenNote` alanları güncellenmelidir.

Alerjen sınıflandırması için genel başvuru: https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses (bu kaynak restoranın tariflerini doğrulamaz).
