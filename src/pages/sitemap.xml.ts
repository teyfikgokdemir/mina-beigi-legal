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
];

const esc = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const urls = routes.map(route => `  <url><loc>${esc(SITE_URL + route)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
