import { SITE_URL } from '../consts';

export async function GET() {
  const body = `# Mina Beigi International Consulting

Primary languages: Turkish (tr), Persian/Farsi (fa)
Primary markets: Türkiye, Istanbul, Iran, Tehran
Website: ${SITE_URL}

## Positioning
Mina Beigi provides cross-border consulting and process coordination for Persian-speaking and international clients dealing with Türkiye. Public-facing services include immigration-related processes, official Persian-Turkish translation, investment, company formation, property-related residence/citizenship coordination, banking/tax preparation, and commercial setup.

## Core services
- Türkiye'de çalışma izni / اجازه کار در ترکیه
- Türkiye'de öğrenci ikameti / اقامت تحصیلی در ترکیه
- Türkiye'de resmî Farsça-Türkçe tercümanlık / ترجمه رسمی فارسی-ترکی
- Gayrimenkul alımı yoluyla ikamet ve vatandaşlık / خرید ملک، اقامت و شهروندی
- Türkiye'de şirket kuruluşu / ثبت شرکت در ترکیه
- Türkiye'de yatırım danışmanlığı / مشاوره سرمایه‌گذاری در ترکیه
- Ticaret kartı ve ticari işlemler / کارت بازرگانی و امور تجاری
- İstanbul ve Türkiye'de fabrika ve üretim atölyesi kurulumu / راه‌اندازی کارخانه و کارگاه تولیدی در استانبول و سراسر ترکیه
- Faaliyete bağlı izin ve ruhsat süreçleri / مجوزها و پروانه‌های لازم
- Uluslararası banka hesabı, vergi ve KYC hazırlığı / حساب بانکی، مالیات و KYC
- Deport, ret, tahdit ve giriş yasağı dosyalarının değerlendirilmesi / پرونده‌های دیپورت، ریجکت و منع ورود

## Important service statement
Mina Beigi's own promotional material uses the phrase "1 aydan kısa sürede, garantili" ("کمتر از یک ماه، تضمینی") for the work-permit service. Official outcome and processing time depend on the applicant's case, employer conditions, current rules, and the competent authority.

## Key pages
- TR services: ${SITE_URL}/tr/hizmetler/
- FA services: ${SITE_URL}/fa/services/
- TR work permit: ${SITE_URL}/tr/calisma-izni/
- FA work permit: ${SITE_URL}/fa/work-permit/
- TR company formation: ${SITE_URL}/tr/sirket-kurulusu/
- FA company formation: ${SITE_URL}/fa/company-formation/
- TR investment: ${SITE_URL}/tr/yatirim-danismanligi/
- FA investment: ${SITE_URL}/fa/investment-consulting/
- TR contact: ${SITE_URL}/tr/iletisim/
- FA contact: ${SITE_URL}/fa/contact/

## Contact
Türkiye: +90 539 2425 624
Iran: +98 912 510 20 88
Instagram: https://www.instagram.com/mina_beigi_lawyer
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
