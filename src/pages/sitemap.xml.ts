import { SITE_URL } from '../consts';

const routes = [
  '/',
  '/tr/','/tr/hakkimizda/','/tr/hizmetler/','/tr/calisma-izni/','/tr/ogrenci-ikameti/',
  '/tr/gayrimenkul-ikamet-vatandaslik/','/tr/sirket-kurulusu/','/tr/yatirim-danismanligi/',
  '/tr/deport-ret-surecleri/','/tr/tercumanlik/','/tr/banka-vergi-finansal-surecler/',
  '/tr/sss/','/tr/iletisim/','/tr/gizlilik/','/tr/kvkk/',
  '/fa/','/fa/about/','/fa/services/','/fa/work-permit/','/fa/student-residence/',
  '/fa/property-residence-citizenship/','/fa/company-formation/','/fa/investment-consulting/',
  '/fa/deport-rejection/','/fa/translation/','/fa/banking-tax-financial-processes/',
  '/fa/faq/','/fa/contact/','/fa/privacy/'
,
  '/tr/blog/', '/tr/blog/2026-turkiye-calisma-izni-kriterleri/', '/tr/blog/2026-turkiye-calisma-izni-muafiyeti/', '/tr/blog/iranlilar-sirket-kurunca-calisma-izni-alir-mi/', '/tr/blog/iranlilar-turkiyede-banka-hesabi-acabilir-mi/', '/tr/blog/turkiyede-ev-alarak-vatandaslik-2026/', '/tr/blog/turkiyede-ikamet-izni-2026/', '/tr/blog/turkiyede-ogrenci-ikameti-ve-calisma-hakki/', '/tr/blog/turkiyede-deport-giriş-yasagi-ikamet-reddi/', '/tr/blog/istanbul-ve-turkiyede-fabrika-kurmak-2026/', '/tr/blog/iranli-yatirimcilar-icin-turkiyede-is-kurma-rehberi-2026-2027/', '/fa/blog/', '/fa/blog/2026-turkey-work-permit-rules/', '/fa/blog/2026-turkey-work-permit-exemption/', '/fa/blog/iranian-company-formation-residence-work-permit/', '/fa/blog/opening-bank-account-in-turkey-for-iranians/', '/fa/blog/turkish-citizenship-by-investment-2026/', '/fa/blog/turkey-residence-permit-2026/', '/fa/blog/student-residence-and-work-rights/', '/fa/blog/deportation-entry-ban-residence-rejection/', '/fa/blog/setting-up-factory-in-turkey/', '/fa/blog/business-setup-guide-for-iranians-2026-2027/'
];

const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const urls = routes.map(route => `  <url><loc>${esc(SITE_URL + route)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
