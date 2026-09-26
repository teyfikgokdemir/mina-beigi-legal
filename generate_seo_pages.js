const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
function writeFile(filepath, content) {
    const fullPath = path.join(baseDir, filepath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
}

function makePageContent(title, desc, lang, contentHtml, canonical) {
    const dir = lang === 'tr' ? "ltr" : "rtl";
    const hr_tr = canonical.replace('/fa/', '/tr/');
    const hr_fa = canonical.replace('/tr/', '/fa/');
    
    return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ContactForm from '../../components/ContactForm.astro';
---
<BaseLayout title="${title} | Mina Beigi" description="${desc}" lang="${lang}">
  <Fragment slot="head">
    <link rel="canonical" href="https://minabeigi.com${canonical}" />
    <link rel="alternate" hreflang="tr" href="https://minabeigi.com${hr_tr}" />
    <link rel="alternate" hreflang="fa" href="https://minabeigi.com${hr_fa}" />
    <link rel="alternate" hreflang="x-default" href="https://minabeigi.com${hr_tr}" />
  </Fragment>

  <div class="py-24 bg-surface border-b border-primary">
    <div class="container mx-auto px-4 max-w-4xl text-center">
      <nav class="text-sm text-bronze/80 mb-6 flex items-center justify-center gap-2" aria-label="Breadcrumb" dir="${dir}">
        <a href="/${lang}/" class="hover:text-brand transition-colors">${lang === 'tr' ? 'Ana Sayfa' : 'خانه'}</a>
        <span>/</span>
        <a href="/${lang}/${lang === 'tr' ? 'hizmetler' : 'services'}" class="hover:text-brand transition-colors">${lang === 'tr' ? 'Hizmetler' : 'خدمات'}</a>
        <span>/</span>
        <span class="text-ivory/60" aria-current="page">${title}</span>
      </nav>
      <h1 class="text-4xl md:text-5xl font-bold text-ivory mb-6">${title}</h1>
      <div class="w-24 h-1 bg-brand mx-auto rounded-full"></div>
    </div>
  </div>
  
  <div class="py-20 bg-primary">
    <div class="container mx-auto px-4 max-w-4xl text-ivory/80 leading-relaxed text-lg space-y-10" dir="${dir}">
      ${contentHtml}
      
      <div class="mt-16 pt-16 border-t border-surface">
        <div class="bg-surface p-8 md:p-12 rounded-2xl border border-primary shadow-xl">
          <h2 class="text-3xl font-bold text-ivory mb-6 text-center">${lang === 'tr' ? 'Profesyonel Destek Alın' : 'دریافت پشتیبانی حرفه‌ای'}</h2>
          <p class="text-center mb-8">${lang === 'tr' ? 'Sürecinizle ilgili ön değerlendirme yapmak ve danışmanlık talep etmek için formu doldurun.' : 'برای ارزیابی اولیه پرونده خود و درخواست مشاوره، فرم زیر را پر کنید.'}</p>
          <ContactForm lang="${lang}" />
        </div>
      </div>
    </div>
  </div>
</BaseLayout>
`;
}

// Data for TR
const services_tr = [
    ["calisma-izni", "Çalışma İzni Süreçleri", "Türkiye çalışma izni danışmanlığı ve başvuru koordinasyonu. Yabancılar için çalışma izni süreci, gerekli belgeler ve dosya değerlendirmesi.", `
      <section>
        <p class="mb-4">Türkiye'de yabancı uyruklu kişilerin yasal olarak çalışabilmesi için mevzuata uygun şekilde çalışma izni (Work Permit) alınması zorunludur. Çalışma izni başvuruları, şirket sahipliği veya bir işveren yanında çalışma durumuna göre farklılık gösterir. Sürecin uzman kişilerce yönetilmesi, başvurunun olumlu sonuçlanması açısından kritik öneme sahiptir.</p>
        <p>Ekibimiz, Türkiye'de çalışma izni danışmanlığı kapsamında dosya değerlendirmesi, başvuru koordinasyonu ve süreç takibi hizmetleri sunarak bürokratik engelleri aşmanızı sağlar.</p>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Kimler İçin Uygun?</h2>
        <ul class="list-disc list-inside space-y-2 text-ivory/70">
          <li>Türkiye'de şirket kurmuş veya kurmayı planlayan yabancı yatırımcılar</li>
          <li>Türkiye'deki bir şirket tarafından istihdam edilecek profesyoneller</li>
          <li>Bağımsız çalışma izni şartlarını taşıyan nitelikli uzmanlar</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Süreç Nasıl İşler?</h2>
        <ol class="list-decimal list-inside space-y-2 text-ivory/70">
          <li><strong>Ön Değerlendirme:</strong> Şirketinizin ve personelinizin çalışma izni kriterlerini (sermaye, istihdam kotası vb.) karşılayıp karşılamadığının analizi.</li>
          <li><strong>Belge Hazırlığı:</strong> Gerekli tüm resmi evrakların eksiksiz toplanması ve yeminli tercüme / noter onaylarının koordinasyonu.</li>
          <li><strong>Sistem Başvurusu:</strong> İlgili bakanlık sistemleri üzerinden elektronik başvurunun yapılması.</li>
          <li><strong>Süreç Takibi:</strong> Başvurunun neticelendirilmesine kadar geçen süreçte bakanlık ile iletişimin yürütülmesi.</li>
        </ol>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Gerekli Belgeler / Genel Hazırlık</h2>
        <p class="mb-4">Sürece başlamadan önce pasaport, diploma denklikleri, biyometrik fotoğraf ve şirkete ait mali verilerin hazır olması gerekir. Başvuru türüne göre ek belgeler talep edilecektir. Detaylı evrak listesi, ön değerlendirme sonrası size özel olarak sunulur.</p>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Dikkat Edilmesi Gerekenler</h2>
        <p>Mevzuat gereği her bir yabancı çalışan için işverenin belirli sayıda Türk vatandaşı istihdam etme (kota) zorunluluğu bulunmaktadır. Ayrıca şirketin ödenmiş sermayesi gibi kriterler bakanlık tarafından titizlikle incelenir. Hatalı başvurular ret ile sonuçlanabilir.</p>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Sıkça Sorulan Sorular</h2>
        <div class="space-y-4">
          <div class="bg-surface/50 p-4 rounded-lg border border-surface">
            <h3 class="font-semibold text-brand mb-2">Çalışma izni kaç günde çıkar?</h3>
            <p class="text-sm">Eksiksiz yapılan başvurular genellikle 30-45 gün içerisinde bakanlık tarafından sonuçlandırılır.</p>
          </div>
          <div class="bg-surface/50 p-4 rounded-lg border border-surface">
            <h3 class="font-semibold text-brand mb-2">Şirket sahibi olmadan çalışma izni alabilir miyim?</h3>
            <p class="text-sm">Evet, bir işveren sizin adınıza Çalışma ve Sosyal Güvenlik Bakanlığı'na başvuru yaparak çalışma izni alabilir.</p>
          </div>
        </div>
      </section>
    `],
    ["gayrimenkul-ikamet-vatandaslik", "İkamet ve Vatandaşlık", "Türkiye ikamet izni, gayrimenkul ile ikamet ve yatırım yoluyla vatandaşlık süreci danışmanlığı. Dosya ön değerlendirmesi ve başvuru takibi.", `
      <section>
        <p class="mb-4">Türkiye'de yatırım yaparak veya gayrimenkul satın alarak ikamet izni veya Türk vatandaşlığı statüsü elde etmek mümkündür. Sürekli değişen göç ve vatandaşlık mevzuatları nedeniyle, yatırıma karar vermeden önce profesyonel bir ön değerlendirme yapılması hayati önem taşır.</p>
        <p>Yatırım yoluyla vatandaşlık ve ikamet süreçlerinde, gayrimenkulün uygunluk analizi, tapu işlemlerinin koordinasyonu ve resmi başvuruların takibi konularında şeffaf danışmanlık hizmeti sunuyoruz.</p>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Kimler İçin Uygun?</h2>
        <ul class="list-disc list-inside space-y-2 text-ivory/70">
          <li>Türkiye'de mülk edinerek kendisi ve ailesi için oturum izni almak isteyenler</li>
          <li>Bakanlıkça belirlenen sınırların üzerinde gayrimenkul veya fon yatırımı yaparak vatandaşlık statüsü hedefleyen yatırımcılar</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Süreç Nasıl İşler?</h2>
        <ol class="list-decimal list-inside space-y-2 text-ivory/70">
          <li><strong>Yatırım Analizi:</strong> Seçilen yatırımın (gayrimenkul vb.) mevzuattaki alt limitleri ve uygunluk kriterlerini karşılayıp karşılamadığının tespiti.</li>
          <li><strong>Ekspertiz ve Değerleme:</strong> SPK onaylı eksperlerce raporların hazırlatılması ve tapu sürecinin koordinasyonu.</li>
          <li><strong>Uygunluk Belgesi:</strong> İlgili bakanlıklardan yatırımın uygun olduğuna dair belgenin temin edilmesi.</li>
          <li><strong>Dosya Hazırlığı:</strong> İkamet veya vatandaşlık başvurusu için gerekli kişisel belgelerin tercüme ve tasdik işlemlerinin tamamlanması.</li>
        </ol>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Dikkat Edilmesi Gerekenler</h2>
        <p>Her gayrimenkul vatandaşlık veya ikamet için uygun değildir. Tapuda beyan edilen değer ile ekspertiz değerinin uyuşması, döviz alım belgesinin usulüne uygun düzenlenmesi şarttır. Profesyonel destek almadan yapılan yatırımlarda başvuru hakkı kaybedilebilir.</p>
      </section>
    `],
    ["sirket-kurulusu", "Şirket Kuruluşu", "Yabancılar ve İranlılar için Türkiye'de şirket kuruluşu ve ticaret odası kayıt süreçleri. İstanbul şirket kuruluş danışmanlığı.", `
      <section>
        <p class="mb-4">Türkiye'nin stratejik konumu ve dinamik pazar yapısı, uluslararası yatırımcılar için büyük fırsatlar barındırır. Yabancı uyruklu girişimciler, Türk vatandaşları ile aynı haklara sahip olarak Limited (LTD) veya Anonim Şirket (A.Ş.) kurabilirler.</p>
        <p>İranlı ve yabancı yatırımcılar için Türkiye'de şirket kuruluşu, ticaret odası kayıtları, vergi dairesi işlemleri ve ruhsat başvuru koordinasyonunda profesyonel rehberlik sunuyoruz.</p>
      </section>
      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Süreç Nasıl İşler?</h2>
        <ol class="list-decimal list-inside space-y-2 text-ivory/70">
          <li><strong>Şirket Tipinin Belirlenmesi:</strong> Ticari hedeflerinize uygun (LTD, A.Ş. vb.) şirket yapısının seçilmesi ve unvan tespiti.</li>
          <li><strong>Ana Sözleşme Hazırlığı:</strong> Şirket faaliyet alanlarına uygun ana sözleşmenin hazırlanması (Mersis girişi).</li>
          <li><strong>Noter ve Tescil:</strong> Ortakların pasaport tercümeleri ve imza beyannamelerinin noterde onaylanması, Ticaret Sicil Müdürlüğü'nde tescil işleminin gerçekleştirilmesi.</li>
          <li><strong>Vergi Levhası:</strong> Vergi dairesi açılış yoklamasının koordinasyonu ve vergi levhasının alınması.</li>
        </ol>
      </section>
    `],
    ["yatirim-danismanligi", "Yatırım Danışmanlığı", "Türkiye yatırım danışmanlığı ve yabancı yatırımcı süreçleri. Pazar konumlandırması ve stratejik rehberlik.", `
      <section>
        <p class="mb-4">Türkiye pazarına girmek isteyen yabancı yatırımcıların yerel mevzuat, vergi dinamikleri ve pazar fırsatları hakkında doğru bilgiye erişmesi başarının anahtarıdır.</p>
        <p>Yatırım öncesi risk analizi, doğru gayrimenkul / ticari varlık seçimi ve şirket birleşmeleri gibi konularda, ilgili yetkili profesyonellere (mali müşavir, eksper, gayrimenkul danışmanı) doğru şekilde yönlendirme yapıyor ve yatırım sürecinizi baştan sona koordine ediyoruz.</p>
      </section>
    `],
    ["deport-ret-surecleri", "Deport / Ret Danışmanlığı", "Deport süreci danışmanlığı ve reddedilen ikamet dosyalarının değerlendirmesi. Giriş yasağı süreç takibi.", `
      <section>
        <p class="mb-4">Türkiye'de ikamet izni başvurularının reddedilmesi (Örn: G-87, V-84 gibi tahdit kodları) veya sınır dışı (deport) kararları, yabancılar için karmaşık ve stresli süreçlerdir.</p>
        <p>Reddedilen dosyaların değerlendirilmesi, idari itiraz süreçlerinin takibi ve giriş yasağının (deport) kaldırılmasına yönelik meşruhatlı vize başvurularının koordinasyonu konularında, uzman çözüm ortaklarımızla birlikte profesyonel dosya yönetimi sunuyoruz.</p>
      </section>
      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Süreç Nasıl İşler?</h2>
        <ul class="list-disc list-inside space-y-2 text-ivory/70">
          <li>Karar belgesinin (Tebliğ Formu) yasal süreler içinde detaylı incelenmesi</li>
          <li>Ret veya tahdit kodunun gerekçesinin saptanması</li>
          <li>İdari itiraz veya meşruhatlı vize (Özel amaçlı vize) stratejisinin belirlenmesi</li>
          <li>Dosya hazırlığı ve takibi</li>
        </ul>
      </section>
    `],
    ["tercumanlik", "Resmî Tercümanlık", "Farsça - Türkçe resmî tercümanlık, İstanbul noter tasdikli belge tercümesi ve sözlü tercümanlık.", `
      <section>
        <p class="mb-4">Türkiye'deki resmi makamlarda yapılacak işlemlerde (Tapu, Noter, Mahkemeler, Ticaret Odaları) ibraz edilecek yabancı dildeki belgelerin yeminli tercüman tarafından çevrilmesi ve noter tarafından onaylanması yasal bir zorunluluktur.</p>
        <p>Mina Beigi, Türkiye'de resmî yeminli tercüman statüsüyle, Farsça-Türkçe dillerinde yazılı belge çevirisi ve kurumlarda ardıl sözlü tercümanlık hizmetlerini yüksek kalite standartlarında sunmaktadır.</p>
      </section>
      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">Hizmet Kapsamı</h2>
        <ul class="list-disc list-inside space-y-2 text-ivory/70">
          <li><strong>Yazılı Tercüme:</strong> Pasaport, vekaletname, diploma, ticaret sicil gazetesi, sözleşme gibi belgelerin yeminli ve noter onaylı tercümesi.</li>
          <li><strong>Sözlü Tercüme:</strong> Tapu dairelerinde alım-satım işlemleri, noterliklerde vekalet/sözleşme işlemleri ve resmi kurumlardaki toplantılarda ardıl tercümanlık.</li>
        </ul>
      </section>
    `]
];

const services_fa = [
    ["work-permit", "فرآیندهای مجوز کار", "مشاوره مجوز کار در ترکیه و هماهنگی درخواست‌ها. روند اخذ اجازه کار برای خارجی‌ها، مدارک لازم و بررسی پرونده.", `
      <section>
        <p class="mb-4">برای اشتغال قانونی اتباع خارجی در ترکیه، اخذ مجوز کار (Work Permit) مطابق با قوانین الزامی است. شرایط اخذ مجوز کار بسته به اینکه کارفرما باشید یا کارمند، متفاوت است. مدیریت این فرآیند توسط افراد متخصص برای موفقیت درخواست بسیار حیاتی است.</p>
        <p>تیم ما با ارائه خدمات ارزیابی پرونده، هماهنگی درخواست و پیگیری مراحل، به شما در عبور از موانع اداری و اخذ مجوز کار در ترکیه کمک می‌کند.</p>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">این خدمات برای چه کسانی مناسب است؟</h2>
        <ul class="list-disc list-inside space-y-2 text-ivory/70">
          <li>سرمایه‌گذاران خارجی که در ترکیه شرکت ثبت کرده‌اند یا قصد ثبت دارند.</li>
          <li>نیروهای متخصصی که قرار است توسط یک شرکت ترکیه‌ای استخدام شوند.</li>
        </ul>
      </section>
      
      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">مدارک لازم / آمادگی اولیه</h2>
        <p class="mb-4">پیش از شروع کار، پاسپورت، معادل‌سازی مدارک تحصیلی، عکس بیومتریک و اطلاعات مالی شرکت باید آماده باشند. لیست دقیق مدارک پس از ارزیابی اولیه ارائه خواهد شد.</p>
      </section>
    `],
    ["property-residence-citizenship", "اقامت و شهروندی از طریق ملک", "اخذ اقامت ترکیه با خرید ملک و فرآیند شهروندی از طریق سرمایه‌گذاری. ارزیابی پرونده و هماهنگی درخواست.", `
      <section>
        <p class="mb-4">دریافت اجازه اقامت یا شهروندی ترکیه از طریق سرمایه‌گذاری یا خرید ملک امکان‌پذیر است. با توجه به تغییرات مداوم قوانین مهاجرتی، ارزیابی حرفه‌ای پیش از اقدام به سرمایه‌گذاری امری ضروری است.</p>
        <p>ما در مسیر شهروندی و اقامت از طریق سرمایه‌گذاری، مشاوره‌ای شفاف در زمینه ارزیابی ملک، هماهنگی امور سند و پیگیری درخواست‌های رسمی ارائه می‌دهیم.</p>
      </section>
      <section>
        <h2 class="text-2xl font-bold text-ivory mt-10 mb-4">نکات مهم</h2>
        <p>هر ملکی برای شهروندی یا اقامت مناسب نیست. تطابق ارزش اعلام شده در سند با گزارش کارشناسی و تنظیم صحیح برگه خرید ارز (Döviz Alım Belgesi) الزامی است. اقدام بدون مشاوره حرفه‌ای می‌تواند منجر به از دست رفتن حق درخواست شود.</p>
      </section>
    `],
    ["company-formation", "ثبت شرکت", "ثبت شرکت در ترکیه برای ایرانیان و اتباع خارجی. مشاوره ثبت در اتاق بازرگانی استانبول.", `
      <section>
        <p class="mb-4">موقعیت استراتژیک ترکیه فرصت‌های بی‌نظیری برای سرمایه‌گذاران بین‌المللی فراهم می‌کند. اتباع خارجی می‌توانند با حقوق برابر با شهروندان ترکیه اقدام به ثبت شرکت با مسئولیت محدود (LTD) یا سهامی خاص (A.Ş.) نمایند.</p>
        <p>ما برای سرمایه‌گذاران ایرانی راهنمایی و هماهنگی حرفه‌ای در زمینه ثبت شرکت، ثبت در اتاق بازرگانی، امور اداره مالیات و دریافت مجوزهای لازم ارائه می‌کنیم.</p>
      </section>
    `],
    ["investment-consulting", "مشاوره سرمایه‌گذاری", "مشاوره سرمایه‌گذاری در ترکیه. جایگاه‌یابی استراتژیک و راهنمایی سرمایه‌گذاران خارجی در استانبول.", `
      <section>
        <p class="mb-4">دسترسی به اطلاعات صحیح درباره قوانین محلی، ساختار مالیاتی و فرصت‌های بازار برای سرمایه‌گذاران خارجی کلید موفقیت است.</p>
        <p>ما با ارزیابی ریسک‌ها، کمک به انتخاب درست دارایی‌های تجاری یا ملکی، شما را به متخصصان مجاز (مشاوران مالی، کارشناسان، مشاوران املاک) ارجاع داده و روند سرمایه‌گذاری شما را هماهنگ می‌کنیم.</p>
      </section>
    `],
    ["deport-rejection", "مشاوره دیپورت و ریجکت", "مشاوره فرآیند دیپورت و ارزیابی پرونده‌های رد شده اقامت. پیگیری مراحل رفع منع ورود.", `
      <section>
        <p class="mb-4">رد شدن درخواست‌های اقامت ترکیه (مانند کدهای محدودیت G-87، V-84) یا احکام اخراج (دیپورت)، فرآیندهای پیچیده و استرس‌زایی برای اتباع خارجی هستند.</p>
        <p>ما با همکاری شرکای متخصص خود، پرونده‌های رد شده را ارزیابی کرده و هماهنگی‌های لازم جهت اعتراض اداری و درخواست ویزای ویژه (Meşruhatlı Vize) برای رفع منع ورود را مدیریت می‌کنیم.</p>
      </section>
    `],
    ["translation", "ترجمه رسمی و معتمد", "مترجم رسمی ترکی و فارسی در استانبول. ترجمه مدارک با تایید نوتر و ترجمه همزمان.", `
      <section>
        <p class="mb-4">برای انجام امور در مراجع رسمی ترکیه (اداره ثبت اسناد، نوتر، دادگاه‌ها و اتاق‌های بازرگانی)، ترجمه مدارک توسط مترجم رسمی و تایید آن توسط نوتر (دفترخانه) الزامی است.</p>
        <p>مینا بیگی به عنوان مترجم رسمی و قسم‌خورده در ترکیه، خدمات ترجمه کتبی مدارک و ترجمه شفاهی همزمان در ادارات را با بالاترین استانداردهای کیفی در زبان‌های فارسی و ترکی ارائه می‌دهد.</p>
      </section>
    `]
];

for (const [p, t, d, c] of services_tr) {
    writeFile(\`src/pages/tr/\${p}.astro\`, makePageContent(t, d, "tr", c, \`/tr/\${p}\`));
}

for (const [p, t, d, c] of services_fa) {
    writeFile(\`src/pages/fa/\${p}.astro\`, makePageContent(t, d, "fa", c, \`/fa/\${p}\`));
}

console.log('SEO pages generated successfully.');
