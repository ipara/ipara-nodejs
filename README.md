iPara - Nodejs Kütüphanesi
===================

iPara Nodejs Kütüphanesidir. iPara API'lerine çok hızlı bir şekilde bağlanmanızı sağlayan bu projeyi indirip hızlıca inceliyebilirsiniz.

## Özellikler

- Özellik eklenecek

## Kullanım

[iPara geliştirici merkezine](http://iguide.codevist.com) üye olmalısınız.  Üye olduktan sonra private key ve public key e ihtiyacınız olacak. Bunları settings.js dosyasında belirtilmiş yerlere yazmalısınız veya ortam değişkenlerine aşağıdaki gibi kaydetmelisiniz.

Gerekli ortam değişkenleri (**environment variables**)

- IPARA_PRIVATE_KEY
- IPARA_PUBLIC_KEY
- IPARA_BASE_URL
- IPARA_MODE
- IPARA_HASH_STRING

>- IPARA_PRIVATE_KEY, IPARA_PUBLIC_KEY ve IPARA_HASH_STRING mutlaka olması gerekmektedir. Aksi taktirde program çalışmayacaktır.

## Kurulum

**Dikkat:** Proje dosyasını düzgün bir şekilde çalıştırabilmek için öncelikle cihazınızda Nodejs (v6+) ve Npm (v5+) kurulu olmalıdır. Daha önceki versyonlarda da kullanabilirsiniz ancak sorun yaşama ihtimaliniz olucaktır.

- **git clone https://github.com/turkishdeveloper/ipara-nodejs.git**
- **cd ipara-nodejs**
- **npm install**
- **npm run ipara**

