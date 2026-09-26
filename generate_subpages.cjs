const fs = require('fs');
const path = require('path');
function write(p, t, c, lang) {
  const dir = lang === 'tr' ? 'ltr' : 'rtl';
  const content = `---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="${t} | Mina Beigi" description="${t}" lang="${lang}">
  <div class="py-24 bg-surface border-b border-primary">
    <div class="container mx-auto px-4 max-w-4xl text-center">
      <h1 class="text-4xl font-bold text-ivory mb-6">${t}</h1>
      <div class="w-24 h-1 bg-brand mx-auto rounded-full"></div>
    </div>
  </div>
  <div class="py-20 bg-primary min-h-[50vh]">
    <div class="container mx-auto px-4 max-w-3xl text-ivory/80 leading-relaxed text-lg" dir="${dir}">
      ${c}
    </div>
  </div>
</BaseLayout>
`;
  fs.writeFileSync(path.join(__dirname, 'src/pages', lang, p + '.astro'), content);
}

write('hakkimizda', 'Hakkımızda', '<p>Mina Beigi, İran\\'da lisanslı avukat olup Türkiye\\'de resmî tercümanlık, göçmenlik süreçleri danışmanlığı, başvuru koordinasyonu ve yatırım süreçleri alanlarında profesyonel destek sunmaktadır.</p>', 'tr');
write('sss', 'Sıkça Sorulan Sorular', '<p>Danışmanlık süreçlerimiz hakkında sıkça sorulan sorular çok yakında eklenecektir.</p>', 'tr');
write('iletisim', 'İletişim', '<p>Ofislerimize ulaşmak veya danışmanlık talebi oluşturmak için iletişim bilgilerimiz.</p>', 'tr');
write('gizlilik', 'Gizlilik Politikası', '<p>Gizlilik politikamız ve veri güvenliği ilkelerimiz.</p>', 'tr');
write('kvkk', 'KVKK ve Aydınlatma Metni', '<p>Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınız.</p>', 'tr');
write('hizmetler', 'Tüm Hizmetlerimiz', '<p>Türkiye ve İran arasında sunduğumuz profesyonel hizmetler portföyü.</p>', 'tr');
write('ogrenci-ikameti', 'Öğrenci İkamet Süreçleri', '<p>Yabancı uyruklu öğrenciler için ikamet izni başvuruları ve dosya hazırlık koordinasyonu.</p>', 'tr');

write('about', 'درباره ما', '<p>مینا بیگی، وکیل پایه یک دادگستری در ایران است و در ترکیه خدمات مترجمی رسمی، مشاوره فرآیندهای مهاجرتی، هماهنگی درخواست‌ها و مشاوره سرمایه‌گذاری ارائه می‌دهد.</p>', 'fa');
write('faq', 'سوالات متداول', '<p>سوالات رایج درباره فرآیندهای مشاوره و مهاجرت به زودی اضافه خواهد شد.</p>', 'fa');
write('contact', 'تماس با ما', '<p>برای ارتباط با دفاتر ما در تهران و استانبول از فرم تماس و یا اطلاعات تماس استفاده کنید.</p>', 'fa');
write('privacy', 'حریم خصوصی', '<p>سیاست حفظ حریم خصوصی و امنیت اطلاعات مراجعین.</p>', 'fa');
write('services', 'خدمات ما', '<p>مجموعه خدمات حرفه‌ای ما در ارتباط با امور حقوقی، تجاری و مهاجرتی در ترکیه.</p>', 'fa');
write('student-residence', 'فرآیندهای اقامت تحصیلی', '<p>مشاوره و آماده‌سازی مدارک جهت اخذ اقامت دانشجویی در ترکیه.</p>', 'fa');
