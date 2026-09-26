const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
function writeFile(filepath, b64content) {
    const fullPath = path.join(baseDir, filepath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, Buffer.from(b64content, 'base64').toString('utf-8'));
}

function makePageContent(title, description, lang, contentHtml) {
    const dir_path = lang === 'tr' ? "ltr" : "rtl";
    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="${title}" description="${description}" lang="${lang}">
  <div class="py-24 bg-surface border-b border-primary">
    <div class="container mx-auto px-4 max-w-4xl text-center">
      <h1 class="text-4xl font-bold text-ivory mb-6">${title}</h1>
      <div class="w-24 h-1 bg-brand mx-auto rounded-full"></div>
    </div>
  </div>
  <div class="py-20 bg-primary min-h-[50vh]">
    <div class="container mx-auto px-4 max-w-3xl text-ivory/80 leading-relaxed text-lg" dir="${dir_path}">
      ${contentHtml}
    </div>
  </div>
</BaseLayout>
`;
}

const services_tr = [
    ["calisma-izni", "Çalışma İzni Süreçleri", "<p>Türkiye’de çalışma izni başvuru koordinasyonu, dosya hazırlığı ve mevzuata uygun süreç takibi.</p>"],
    ["ogrenci-ikameti", "Öğrenci İkamet Süreçleri", "<p>Yabancı uyruklu öğrenciler için ikamet izni başvuruları ve dosya hazırlık koordinasyonu.</p>"],
    ["gayrimenkul-ikamet-vatandaslik", "Gayrimenkul ile İkamet ve Vatandaşlık", "<p>Yatırım yoluyla ikamet ve vatandaşlık süreçlerinin ön değerlendirmesi ve profesyonel başvuru takibi.</p>"],
    ["sirket-kurulusu", "Şirket Kuruluşu", "<p>İranlı ve yabancı yatırımcılar için Türkiye'de şirket kuruluş ve ticaret odası kayıt süreçleri.</p>"],
    ["yatirim-danismanligi", "Yatırım Danışmanlığı", "<p>Türkiye'deki ticari ve gayrimenkul yatırımlarınız için stratejik ve mevzuatsal danışmanlık.</p>"],
    ["deport-ret-surecleri", "Deport / Ret Süreçleri Danışmanlığı", "<p>Göçmenlik başvurularında alınan ret kararları veya sınır dışı işlemlerinde danışmanlık ve resmi itiraz süreçlerinin yönetimi.</p>"],
    ["tercumanlik", "Resmî / Yeminli Tercümanlık", "<p>Resmi makamlarda geçerli, yeminli yazılı ve ardıl sözlü tercümanlık hizmetleri.</p>"],
    ["hakkimizda", "Hakkımızda", "<p>Mina Beigi, İran'da lisanslı avukat olup Türkiye'de resmî tercümanlık, göçmenlik süreçleri danışmanlığı, başvuru koordinasyonu ve yatırım süreçleri alanlarında profesyonel destek sunmaktadır.</p><p>Mina Beigi’nin avukatlık yetkisi İran kapsamındadır. Türkiye’de sunulan hizmetler danışmanlık, başvuru koordinasyonu ve resmî tercümanlık kapsamındadır.</p>"],
    ["sss", "Sıkça Sorulan Sorular", "<p>Danışmanlık süreçlerimiz hakkında sıkça sorulan sorular.</p>"],
    ["iletisim", "İletişim", "<p>Ofislerimize ulaşmak veya danışmanlık talebi oluşturmak için iletişim bilgilerimiz.</p>"],
    ["gizlilik", "Gizlilik Politikası", "<p>Gizlilik politikamız ve veri güvenliği ilkelerimiz.</p>"],
    ["kvkk", "KVKK ve Aydınlatma Metni", "<p>Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınız.</p>"],
    ["hizmetler", "Tüm Hizmetlerimiz", "<p>Türkiye ve İran arasında sunduğumuz profesyonel hizmetler portföyü.</p>"]
];

const services_fa = [
    ["work-permit", "فرآیندهای مجوز کار", "<p>هماهنگی و آماده‌سازی پرونده‌های مجوز کار در ترکیه و پیگیری مراحل مطابق با قوانین.</p>"],
    ["student-residence", "فرآیندهای اقامت تحصیلی", "<p>مشاوره و آماده‌سازی مدارک جهت اخذ اقامت دانشجویی در ترکیه.</p>"],
    ["property-residence-citizenship", "اقامت و شهروندی از طریق ملک", "<p>ارزیابی اولیه و پیگیری حرفه‌ای پرونده‌های اقامت و شهروندی از طریق سرمایه‌گذاری ملکی.</p>"],
    ["company-formation", "ثبت شرکت", "<p>مشاوره و مدیریت فرآیند ثبت شرکت و ثبت در اتاق بازرگانی برای سرمایه‌گذاران خارجی.</p>"],
    ["investment-consulting", "مشاوره سرمایه‌گذاری", "<p>ارائه مشاوره‌های راهبردی و قانونی برای سرمایه‌گذاری‌های تجاری و ملکی در ترکیه.</p>"],
    ["deport-rejection", "مشاوره فرآیندهای دیپورت و ریجکت", "<p>ارائه مشاوره و مدیریت مراحل اعتراض به رد درخواست‌های مهاجرتی یا احکام اخراج.</p>"],
    ["translation", "ترجمه رسمی و معتمد", "<p>خدمات ترجمه کتبی رسمی و ترجمه همزمان شفاهی معتبر در مراجع قانونی.</p>"],
    ["about", "درباره ما", "<p>مینا بیگی، وکیل پایه یک دادگستری در ایران است و در ترکیه خدمات مترجمی رسمی، مشاوره فرآیندهای مهاجرتی، هماهنگی درخواست‌ها و مشاوره سرمایه‌گذاری ارائه می‌دهد.</p><p>صلاحیت وکالت مینا بیگی محدود به ایران است. خدمات در ترکیه شامل مشاوره، هماهنگی درخواست‌ها و ترجمه رسمی است.</p>"],
    ["faq", "سوالات متداول", "<p>سوالات رایج درباره فرآیندهای مشاوره و مهاجرت.</p>"],
    ["contact", "تماس با ما", "<p>برای ارتباط با دفاتر ما در تهران و استانبول از اطلاعات زیر استفاده کنید.</p>"],
    ["privacy", "حریم خصوصی", "<p>سیاست حفظ حریم خصوصی و امنیت اطلاعات مراجعین.</p>"],
    ["services", "خدمات ما", "<p>مجموعه خدمات حرفه‌ای ما در ارتباط با امور حقوقی، تجاری و مهاجرتی در ترکیه.</p>"]
];

for (const [p, t, c] of services_tr) {
    writeFile(\`src/pages/tr/\${p}.astro\`, Buffer.from(makePageContent(t, \`\${t} - Mina Beigi\`, "tr", c)).toString('base64'));
}

for (const [p, t, c] of services_fa) {
    writeFile(\`src/pages/fa/\${p}.astro\`, Buffer.from(makePageContent(t, \`\${t} - Mina Beigi\`, "fa", c)).toString('base64'));
}

console.log('Services setup complete.');
