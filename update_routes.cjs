const fs = require('fs');

const sitemapPath = './src/pages/sitemap.xml.ts';
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

const newRoutes = [
  "'/tr/blog/'", "'/tr/blog/2026-turkiye-calisma-izni-kriterleri/'", "'/tr/blog/2026-turkiye-calisma-izni-muafiyeti/'",
  "'/tr/blog/iranlilar-sirket-kurunca-calisma-izni-alir-mi/'", "'/tr/blog/iranlilar-turkiyede-banka-hesabi-acabilir-mi/'",
  "'/tr/blog/turkiyede-ev-alarak-vatandaslik-2026/'", "'/tr/blog/turkiyede-ikamet-izni-2026/'",
  "'/tr/blog/turkiyede-ogrenci-ikameti-ve-calisma-hakki/'", "'/tr/blog/turkiyede-deport-giriş-yasagi-ikamet-reddi/'",
  "'/tr/blog/istanbul-ve-turkiyede-fabrika-kurmak-2026/'", "'/tr/blog/iranli-yatirimcilar-icin-turkiyede-is-kurma-rehberi-2026-2027/'",
  "'/fa/blog/'", "'/fa/blog/2026-turkey-work-permit-rules/'", "'/fa/blog/2026-turkey-work-permit-exemption/'",
  "'/fa/blog/iranian-company-formation-residence-work-permit/'", "'/fa/blog/opening-bank-account-in-turkey-for-iranians/'",
  "'/fa/blog/turkish-citizenship-by-investment-2026/'", "'/fa/blog/turkey-residence-permit-2026/'",
  "'/fa/blog/student-residence-and-work-rights/'", "'/fa/blog/deportation-entry-ban-residence-rejection/'",
  "'/fa/blog/setting-up-factory-in-turkey/'", "'/fa/blog/business-setup-guide-for-iranians-2026-2027/'"
];

const insertIndex = sitemap.indexOf('];');
sitemap = sitemap.substring(0, insertIndex) + ',\n  ' + newRoutes.join(', ') + '\n' + sitemap.substring(insertIndex);
fs.writeFileSync(sitemapPath, sitemap);

const llmsPath = './src/pages/llms.txt.ts';
let llms = fs.readFileSync(llmsPath, 'utf8');

const additionalContent = `
## Blog Index
- TR: \${SITE_URL}/tr/blog/
- FA: \${SITE_URL}/fa/blog/

## Topics & Articles
- 2026 Çalışma İzni Kriterleri
- Çalışma İzni Muafiyeti
- Şirket Kuruluşu ve İkamet
- Banka Hesabı ve KYC
- Ev Alarak Vatandaşlık
- İkamet İzni 2026
- Öğrenci İkameti
- Deport ve Giriş Yasağı
- Fabrika Kurmak
- İş Kurma Rehberi 2026-2027

## 2027'ye Doğru Takip Edilmesi Gereken Alanlar
- 31.12.2027'ye kadar geçerli imalat sektörü yabancı çalışan istisnaları.
- Çalışma izni ve muafiyet sistemlerinin (E-İzin vb.) tamamen dijitalleşmesi.
- E-TUYS ve yabancı yatırımcı bildirim sistemlerinin daha entegre hale gelmesi.
- KYC ve AML kontrollerinin uluslararası uyum çerçevesinde daha da sıkılaşması ihtimali.
- Sınır giriş/çıkış sistemlerinin dijitalleşmesi ve deport süreçlerinde yeni idari dijital takipler.
`;

const insertLlmsIndex = llms.indexOf('## Contact');
llms = llms.substring(0, insertLlmsIndex) + additionalContent + '\n' + llms.substring(insertLlmsIndex);
fs.writeFileSync(llmsPath, llms);
