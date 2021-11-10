iPara - Nodejs Kütüphanesi
===================

iPara Nodejs Kütüphanesidir. iPara API'lerine çok hızlı bir şekilde bağlanmanızı sağlar.
[https://www.ipara.com.tr](https://www.ipara.com.tr) adresimizden mağaza başvurusu yaparak
hesabınızı açabilirsiniz.

## Sistem Gereksinimleri

* Nodejs (v6+)
* Npm (v5+)

## Entegrasyon sürecinde dikkat edilecek noktalar

iPara servislerini kullanabilmek için iPara'ya üye olmalısınız. Üye olduktan sonra Mağaza Listesi > Detay sayfası içerisindeki Public ve Private Key sizinle paylaşılacaktır. Paylaşılan bu anahtarları ipara-nodejs projesinde settings'de yer alan publicKey ve privateKey alanlarına eklemeniz gerekmektedir.

```javascript
const settings = {
    //"Public Magaza Anahtarı - size mağaza başvurunuz sonucunda gönderilen public key (açık anahtar bilgisini kullanınız.",
    publicKey: process.env.IPARA_PUBLIC_KEY || "",

    //"Private Magaza Anahtarı  - size mağaza başvurunuz sonucunda gönderilen privaye key (gizli anahtar) bilgisini kullanınız."
    privateKey: process.env.IPARA_PRIVATE_KEY || "",

    //iPara web servisleri API url'lerinin başlangıç bilgisidir. Restful web servis isteklerini takip eden kodlar halinde bulacaksınız.
    // Örneğin "https://api.ipara.com/" + "/rest/payment/auth"  = "https://api.ipara.com/rest/payment/auth"
    baseURL: process.env.IPARA_BASE_URL || "https://api.ipara.com/",

    // Kullandığınız iPara API versiyonudur.
    version: "1.0",

    // Test -> T, entegrasyon testlerinin sırasında "T" modunu, canlı sisteme entegre olarak ödeme almaya başlamak için ise Prod -> "P" modunu kullanınız.
    mode: process.env["IPARA_MODE"] || "T"
}
```

Örnek projelerimizdeki servislerimizi daha iyi anlamak için [iPara geliştirici merkezini](http://dev.ipara.com.tr) takip etmeniz büyük önem arz etmektedir.

* Entegrasyon işlemlerinde encoding “UTF-8” kullanılması önerilmektedir.Token parametrelerinden kaynaklı sorun encoding probleminden kaynaklanmaktadır. Özel karakterlerde encoding işlemi yapılmalıdır.
* Servis isteği yaparaken göndermiş olduğunuz alanların başında ve sonunda oluşabilecek boşluk alanlarını kaldırmanızı ( trim() ) önemle rica ederiz. Çünkü bu alanlar oluşacak hash sonuçlarını etkilemektedir.
* Entegrasyon dahilinde gönderilen input alanlarında, kart numarası alanı dışında kart numarası bilgisi gönderilmesi halinde işlem reddedilecektir.

iPara örnek projelerinin amacı, yazılım geliştiricilere iPara servislerine entegre olabilecek bir proje örneği sunmak ve entegrasyon adımlarının daha iyi anlaşılmasını sağlamaktır.
Projeleri doğrudan canlı ortamınıza alarak kod değişimi yapmadan kullanmanız için desteğimiz bulunmamaktadır. **Projeyi bir eğitsel kaynak (tutorial) olarak kullanınız.**

## Önemli Notlar

* iPara ile ilgili fonksiyonların hepsi ./ipara/index.js dosyasındadır. Sadece index.js yi çekerek tüm fonksiyonlara ulaşabilirsiniz.
* Helpers fonksiyonların tamamı ./helpers/index.js dosyasındadır. Sadece index.js dosyasını çekerek tüm fonksiyonlara ulaşabilirsiniz.
* Router klasöründe api.js dosyasında örnek çalıştırmaları bulabilirsiniz.

## Kurulum

**Dikkat:** Proje dosyasını düzgün bir şekilde çalıştırabilmek için öncelikle cihazınızda Nodejs (v6+) ve Npm (v5+) kurulu olmalıdır. Daha önceki versyonlarda da kullanabilirsiniz ancak sorun yaşama ihtimaliniz olucaktır.

* **git clone <https://github.com/ipara/ipara-nodejs.git>**
* **cd ipara-nodejs**
* **npm install**
* **npm start**

## Kullanım

* Projeyi çalıştırmak için gerekli adımlar aşağıdaki gibidir:
  1) Güncel nodejs ve npm sürümünün bilgisayarınızda kurulu olması gerekmektedir. Nodejs v6 ve üstü, npm için ise v5 ve üstü versiyonların kullanıması önerilir.
  2) Dilediğiniz editor ile proje kodlarını okumak veya nodejs destekler IDE yardımı ile projeyi başlatmak mümkündür.
  3) Projenin asıl giriş dosyası "server.js" olarak tanımlanmıştır. Kullanım esnasında eğer IDE kullanmıyorsanız, Console(CLI) üzerinden "to/project/directory> node .\server.js" şeklindeki komut ile projeyi çalıştırabilirsiniz.
  4) Projenin bağlı dosyalarının kurulumu için "npm install" adımını unutmayınız. Bu projenin bağlı .js dosyalarını "node_modules" altında proje directory'ye eklemesini sağlayacaktır.
  5) Konsol içinde çıkan uyarılara göre projeyi ayarlayabilir ve gösterilen URL üzerinden deneyebilirsiniz.
  6) Projeyi doğru şekilde çalıştırmak için, sizlere iPara üyeliğiniz aşamasında verilmiş olan gizli ve açık anahtar bilginizi projenin ".\settings.js" dosyasında eklediğinizden emin olunuz.

Gerekli ortam değişkenleri (**environment variables**)

* IPARA_PRIVATE_KEY
* IPARA_PUBLIC_KEY
* IPARA_BASE_URL
* IPARA_MODE
* IPARA_HASH_STRING

olarak .\settings.js içinde bulunmaktadır.

>* IPARA_PRIVATE_KEY, IPARA_PUBLIC_KEY ve IPARA_BASE_URL bilgilerinin projeji çalıştırmadan önce girilmiş olması gerekmektedir, aksi taktirde program çalışmayacaktır.

## Test Kartları

Başarılı bir ödemeyi test etmek için aşağıdaki kart numaralarını ve diğer bilgileri kullanabilirsiniz.

| Sıra No  | Kart Numarası     | SKT    | CVC  | Banka                 | Kart Ailesi            |
|--------- |------------------ |------- |----- | ---------------       | ---------              |
| 1        | 4282209004348015  | 12/22  | 123  | Garanti Bankası       | BONUS                  |
| 2        | 5571135571135575  | 12/22  | 000  | Akbank                | AXESS                  |
| 3        | 4355084355084358  | 12/22  | 000  | Akbank                | AXESS                  |
| 4        | 4662803300111364  | 10/25  | 000  | Alternatif Bank       | BONUS                  |
| 5       | 4022774022774026  | 12/24  | 000  | Finansbank            | CARD FINANS            |
| 6        | 5456165456165454  | 12/24  | 000  | Finansbank            | CARD FINANS            |
| 7         | 9792023757123604  | 01/26     | 861   | Finansbank            | FINANSBANK DEBIT       |
| 8        | 4531444531442283  | 12/24  | 000  | Aktif Yatırım Bankası | AKTIF KREDI KARTI      |
| 9        | 5818775818772285  | 12/24  | 000  | Aktif Yatırım Bankası | AKTIF KREDI KARTI      |
| 10       | 4508034508034509  | 12/24  | 000  | İş bankası            | MAXIMUM                |
| 11       | 5406675406675403  | 12/24  | 000  | İş bankası            | MAXIMUM                |
| 12       | 4025903160410013  | 07/22  | 123  | Kuveyttürk            | KUVEYTTURK KREDI KARTI |
| 13       | 5345632006230604  | 12/24  | 310  | Aktif Yatırım Bankası | AKTIF KREDI KARTI      |
| 14       | 4282209027132016  | 12/24  | 358  | Garanti Bankası       | BONUS                  |
| 15       | 4029400154245816  | 03/24  | 373  | Vakıf Bank            | WORLD                  |
| 16       | 4029400184884303  | 01/23  | 378  | Vakıf Bank            | WORLD                  |
| 17       | 9792350046201275  | 07/27   | 993  | TÜRK ELEKTRONIK PARA  | PARAM KART             |
| 18       | 6501700194147183 | 03/27   | 136  | Vakıf Bank            | WORLD                  |
| 19      | 6500528865390837 | 01/22   | 686  | Vakıf Bank            | VAKIFBANK DEBIT        |

Test kartlarımızda alınan hata kodları ve çözümleriyle ilgili detaylı bilgiye ulaşabilmek için [iPara Hata Kodları](https://dev.ipara.com.tr/home/ErrorCode) inceleyebilirsiniz.

## Örnek Kullanım Yöntemi

```js
    const nonThreeDPaymentRequestObj = {
        orderId: Guid.raw(),
        cardOwnerName: 'Murat Kaya',
        cardNumber: '5456165456165454',
        cardExpireMonth: '12',
        cardExpireYear: '24',
        cardCvc: '000',
        amount: '10000',
        installment: '1',
        userId: "",
        cardId: "",
        echo: "",
        purchaser: {
            birthDate: "1986-07-11",
            gsmNumber: "5881231212",
            tcCertificate: "1234567890",
            name: "Murat",
            surname: "Kaya",
            email: "murat@kaya.com",
            clientIp: "123.58.7.4",
            invoiceAddress: {
                name: "Murat",
                surname: "Kaya",
                address: "Mevlüt Pehlivan Mah. Multinet Plaza Şişli",
                zipcode: "34782",
                city: "34",
                tcCertificate: "12345678901",
                country: "tr",
                taxNumber: "123456890",
                taxOffice: "Şişli",
                companyName: "iPara",
                phoneNumber: "2123886600",
            },
            shippingAddress: {
                name: "Murat",
                surname: "Kaya",
                address: "Mevlüt Pehlivan Mah. Multinet Plaza Şişli",
                zipcode: "34782",
                city: "34",
                country: "tr",
                phoneNumber: "2123886600",
            },
        },
        products: [
            {
                productName: "Telefon",
                productCode: "TLF0001",
                quantity: "1",
                price: "5000",
            },
            {
                productName: "Bilgisayar",
                productCode: "BIL0002",
                quantity: "1",
                price: "5000",
            },
        ],
        threeD: "false",
    };

    ipara
        .NonThreeDPaymentRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
```

## Hash Hesaplama

iPara servislerine entegre olurken alınan hataların en sık karşılaşılanı hash değerinin doğru hesaplanmasıdır. Hash değeri her servise göre değişen verilerin yanyana eklenmesi ile oluşan değerin bir dizi işleme tabi tutulması ile oluşur.

Aşağıdaki adreste hash hesaplama ile ilgili detaylar yer almaktadır. Yine burada yer alan interaktif fonksiyon ile hesapladığınız hash fonksiyonlarını test edebilirsiniz.

[iPara Hash Hesaplama](https://dev.ipara.com.tr/#hashCalculate)

Her örnek projenin Helper sınıfı içinde hash hesaplama ile alakalı bir fonksiyon bulunmaktadır. Entegrasyon sırasıdna bu hazır fonksiyonları da kullanabilirsiniz.

## Canlı Ortama Geçiş

* Test ortamında kullandığınız statik verilerin canlı ortamda gerçek müşteri datasıyla değiştirildiğinden emin olun.
* Canlı ortamda yanlış, sabit data gönderilmediğinden emin olun. Gönderdiğiniz işlemlere ait verileri mutlaka size özel panelden görüntüleyin.
* Geliştirmeler tamamlandıktan sonra ödeme adımlarını, iPara test kartları ile tüm olası durumlar için test edin ve sonuçlarını görüntüleyin.
* iPara servislerinden dönen ve olabilecek tüm hataları karşılayacak ve müşteriye uygun cevabı gösterecek şekilde kodunuzu düzenleyin ve test edin.
* iPara hata kodları kullanıcı dostu mesajlar olup müşterinize gösterebilirsiniz.
* Hassas olmayan verileri ve servis yanıtlarını, hata çözümü ve olası sorunların çözümünde yardımcı olması açısından loglamaya dikkat edin.
* Canlı ortama geçiş sonrası ilk işlemleri kendi kredi kartlarınız ile deneyerek sonuçlarını size özel Kurum ekranlarından görüntüleyin. Sonuçların ve işlemlerin doğru tamamlandığından emin olun.

Sorularınız olması durumunda bize [Destek](http://dev.ipara.com.tr/Home/Support) üzerinden yazabilirsiniz.

## Versiyon Yenilikleri

| Versiyon | Versiyon Yenilikleri                                                                             |
|--------- |-------------------------------------------------------------------------------------------   |
| 1.0.1     | - İki adımlı ThreeD ödemesi kaldırılıp **Tek adımlı ThreeD** ödemesi eklendi.<br />- Ödeme sorgulama servisinde ek olarak **tarih filtresi** eklendi.<br />- **Link ile ödeme, ödeme linki sorgulama,ödeme linki silme** servisleri eklendi.<br />- **Ürün iade bilgisi sorgulama,ürün iade talebi** oluşturma servisleri eklendi. <br />- **Bin sorgulama servisine tutar bilgisi** eklenerek komisyon bilgisi kullanıcıya sunuldu. |
