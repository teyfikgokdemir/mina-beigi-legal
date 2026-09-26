import os

base_dir = r"C:\Users\teyfi\.gemini\antigravity\scratch\mina-beigi-legal"

def write_file(filepath, content):
    full_path = os.path.join(base_dir, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

# 1. global.css
write_file("src/styles/global.css", """
@import "tailwindcss";

@theme {
  --color-primary: #17191D;
  --color-surface: #242329;
  --color-brand: #8A2F43;
  --color-accent: #315B82;
  --color-rose: #B67B7E;
  --color-ivory: #F3EEE7;
  --color-bronze: #A98B68;
}

@layer base {
  body {
    background-color: var(--color-primary);
    color: var(--color-ivory);
    font-family: 'Inter', 'Vazirmatn', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
}
""")

# 2. BaseLayout
write_file("src/layouts/BaseLayout.astro", """
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import WhatsAppBtn from '../components/WhatsAppBtn.astro';

interface Props {
  title: string;
  description: string;
  lang: 'tr' | 'fa';
}

const { title, description, lang } = Astro.props;
const dir = lang === 'fa' ? 'rtl' : 'ltr';
const currentUrl = new URL(Astro.request.url);
const siteUrl = "https://mina-beigi-legal.pages.dev";
---
<html lang={lang} dir={dir}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title} | Mina Beigi</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={siteUrl + currentUrl.pathname} />
    <meta property="og:title" content={`${title} | Mina Beigi`} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Vazirmatn:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script>
      const lang = document.documentElement.lang;
      localStorage.setItem('mb_lang', lang);
    </script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Mina Beigi",
        "description": "Uluslararası danışmanlık, resmi tercümanlık ve göçmenlik süreçleri",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pendik",
          "addressRegion": "İstanbul",
          "addressCountry": "TR"
        },
        "telephone": "+905392425624"
      }
    </script>
  </head>
  <body class="flex flex-col min-h-screen bg-primary selection:bg-brand selection:text-white">
    <Header lang={lang} />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer lang={lang} />
    <WhatsAppBtn lang={lang} />
  </body>
</html>
""")

# 3. Header Component
write_file("src/components/Header.astro", """
---
const { lang } = Astro.props;
const isTr = lang === 'tr';

const nav = isTr ? [
  { name: 'Ana Sayfa', href: '/tr/' },
  { name: 'Hakkımızda', href: '/tr/hakkimizda' },
  { name: 'Hizmetler', href: '/tr/hizmetler' },
  { name: 'İletişim', href: '/tr/iletisim' },
] : [
  { name: 'خانه', href: '/fa/' },
  { name: 'درباره ما', href: '/fa/about' },
  { name: 'خدمات', href: '/fa/services' },
  { name: 'تماس با ما', href: '/fa/contact' },
];

const otherLang = isTr ? 'fa' : 'tr';
const otherLangName = isTr ? 'FA' : 'TR';
// Basic translation of the path if possible, otherwise root
const getOtherLangPath = () => {
    const p = Astro.url.pathname;
    if(p.includes('/tr/')) return p.replace('/tr/', '/fa/');
    if(p.includes('/fa/')) return p.replace('/fa/', '/tr/');
    return isTr ? '/fa/' : '/tr/';
};
---
<header class="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-surface">
  <div class="container mx-auto px-4 py-5 flex justify-between items-center">
    <a href={`/${lang}/`} class="text-2xl font-bold text-ivory tracking-wide flex items-center gap-3 group">
      <span class="text-brand group-hover:text-rose transition-colors duration-300">MINA BEIGI</span>
      <span class="text-xs font-normal text-bronze hidden sm:inline-block border-s border-surface ps-3 ms-1 opacity-80">{isTr ? 'International Consulting' : 'مشاوره بین‌المللی'}</span>
    </a>
    
    <nav class="hidden md:flex gap-8 items-center" dir={isTr ? "ltr" : "rtl"}>
      {nav.map(item => (
        <a href={item.href} class="text-sm font-medium text-ivory hover:text-brand transition-colors">
          {item.name}
        </a>
      ))}
      <a href={getOtherLangPath()} class="px-4 py-1.5 text-xs font-semibold border border-surface text-bronze rounded hover:border-brand hover:text-brand transition-colors">
        {otherLangName}
      </a>
    </nav>
    
    <div class="md:hidden flex items-center gap-4">
      <a href={getOtherLangPath()} class="px-3 py-1.5 text-xs font-semibold border border-surface text-bronze rounded">
        {otherLangName}
      </a>
      <button class="text-ivory hover:text-brand transition-colors p-2 focus:outline-none" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </div>
  </div>
</header>
""")

# 4. Footer
write_file("src/components/Footer.astro", """
---
const { lang } = Astro.props;
const isTr = lang === 'tr';

const trPhone = '+905392425624';
const irPhone = '+989125102088';
const trPhoneFormatted = '+90 539 2425 624';
const irPhoneFormatted = '+98 912 510 20 88';

const phone1 = isTr ? { tel: trPhone, fmt: trPhoneFormatted } : { tel: irPhone, fmt: irPhoneFormatted };
const phone2 = isTr ? { tel: irPhone, fmt: irPhoneFormatted } : { tel: trPhone, fmt: trPhoneFormatted };
---
<footer class="bg-surface pt-16 pb-8 border-t border-[#17191D] text-ivory/70 text-sm">
  <div class="container mx-auto px-4 grid md:grid-cols-3 gap-12 mb-12" dir={isTr ? "ltr" : "rtl"}>
    <div>
      <h3 class="text-brand text-lg font-semibold mb-6">MINA BEIGI</h3>
      <p class="mb-6 leading-relaxed">
        {isTr ? 'İstanbul ve Tahran merkezli, uluslararası alanda profesyonel danışmanlık, süreç koordinasyonu ve yeminli tercümanlık hizmetleri.' : 'خدمات حرفه‌ای مشاوره بین‌المللی، مدیریت فرآیندها و ترجمه رسمی مستقر در استانبول و تهران.'}
      </p>
      <div class="text-xs bg-primary/50 p-4 rounded text-bronze border border-primary">
        {isTr ? 'Önemli Not: Mina Beigi\\'nin avukatlık yetkisi İran kapsamındadır. Türkiye\\'de sunulan hizmetler danışmanlık, başvuru koordinasyonu ve resmî tercümanlık kapsamındadır.' : 'توجه مهم: صلاحیت وکالت مینا بیگی در محدوده ایران است. خدمات ارائه‌شده در ترکیه شامل مشاوره، هماهنگی درخواست‌ها و ترجمه رسمی می‌باشد.'}
      </div>
    </div>
    <div class={isTr ? "ps-0 md:ps-8" : "pe-0 md:pe-8"}>
      <h3 class="text-ivory text-lg font-semibold mb-6">{isTr ? 'İletişim' : 'تماس با ما'}</h3>
      <div class="space-y-4">
        <p class="flex items-start gap-3">
            <span class="text-brand mt-1">📍</span>
            <span>{isTr ? 'Tahran, İran' : 'تهران، ایران'} <br/> {isTr ? 'Pendik, İstanbul / Türkiye' : 'پندیک، استانبول / ترکیه'}</span>
        </p>
        <p class="flex items-center gap-3" dir="ltr">
            <span class="text-brand">📞</span>
            <a href={`tel:${phone1.tel}`} class="hover:text-brand transition-colors">{phone1.fmt}</a>
        </p>
        <p class="flex items-center gap-3" dir="ltr">
            <span class="text-brand">📞</span>
            <a href={`tel:${phone2.tel}`} class="hover:text-brand transition-colors">{phone2.fmt}</a>
        </p>
      </div>
    </div>
    <div class={isTr ? "ps-0 md:ps-8" : "pe-0 md:pe-8"}>
      <h3 class="text-ivory text-lg font-semibold mb-6">{isTr ? 'Bağlantılar' : 'لینک‌های مفید'}</h3>
      <div class="space-y-3 flex flex-col items-start">
        <a href={isTr ? '/tr/hakkimizda' : '/fa/about'} class="hover:text-brand transition-colors">{isTr ? 'Hakkımızda' : 'درباره ما'}</a>
        <a href={isTr ? '/tr/hizmetler' : '/fa/services'} class="hover:text-brand transition-colors">{isTr ? 'Hizmetler' : 'خدمات'}</a>
        <a href={isTr ? '/tr/iletisim' : '/fa/contact'} class="hover:text-brand transition-colors">{isTr ? 'İletişim' : 'تماس'}</a>
        <a href={isTr ? '/tr/kvkk' : '/fa/privacy'} class="hover:text-brand transition-colors mt-4 text-xs opacity-60">{isTr ? 'KVKK & Gizlilik' : 'حریم خصوصی'}</a>
        <a href="https://www.instagram.com/mina_beigi_lawyer" target="_blank" class="flex items-center gap-2 hover:text-brand transition-colors mt-4 border border-surface px-4 py-2 rounded bg-primary">
          <span>Instagram</span>
        </a>
      </div>
    </div>
  </div>
  <div class="container mx-auto px-4 text-center border-t border-primary/50 pt-8 opacity-60">
    <p>&copy; {new Date().getFullYear()} Mina Beigi. {isTr ? 'Tüm hakları saklıdır.' : 'تمامی حقوق محفوظ است.'}</p>
  </div>
</footer>
""")

# 5. WhatsAppBtn
write_file("src/components/WhatsAppBtn.astro", """
---
const { lang } = Astro.props;
const isTr = lang === 'tr';

const msg = isTr 
  ? 'Merhaba, danışmanlık hizmetleriniz hakkında bilgi almak istiyorum.' 
  : 'سلام، می‌خواستم درباره خدمات مشاوره شما اطلاعات کسب کنم.';

const waUrlTr = `https://wa.me/905392425624?text=${encodeURIComponent(msg)}`;
const waUrlIr = `https://wa.me/989125102088?text=${encodeURIComponent(msg)}`;

const trOption = { name: isTr ? 'Türkiye WhatsApp' : 'واتساپ ترکیه', url: waUrlTr, flag: '🇹🇷', num: '+90 539 2425 624' };
const irOption = { name: isTr ? 'İran WhatsApp' : 'واتساپ ایران', url: waUrlIr, flag: '🇮🇷', num: '+98 912 510 20 88' };

const options = isTr ? [trOption, irOption] : [irOption, trOption];
---
<div class="fixed bottom-6 end-6 z-50 flex flex-col items-end">
  <div id="waMenu" class="hidden mb-4 bg-surface border border-primary shadow-2xl rounded-xl overflow-hidden min-w-[260px] flex-col transition-all duration-300">
    <div class="p-4 bg-brand text-ivory font-bold text-center">
      {isTr ? 'İletişime Geçin' : 'تماس با ما'}
    </div>
    <div class="flex flex-col">
      {options.map((opt, i) => (
        <a href={opt.url} target="_blank" class={`flex items-center gap-4 p-5 hover:bg-primary transition-colors ${i === 0 ? 'border-b border-primary' : ''}`} dir={isTr ? "ltr" : "rtl"}>
          <span class="text-3xl">{opt.flag}</span>
          <div class="flex flex-col">
            <span class="text-ivory text-sm font-semibold">{opt.name}</span>
            <span class="text-bronze text-xs mt-1" dir="ltr">{opt.num}</span>
          </div>
        </a>
      ))}
    </div>
  </div>
  
  <button id="waToggle" class="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform focus:outline-none" aria-label="WhatsApp">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
  </button>
</div>

<script>
  const toggle = document.getElementById('waToggle');
  const menu = document.getElementById('waMenu');
  
  toggle?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
    menu?.classList.toggle('flex');
  });

  document.addEventListener('click', (e) => {
    if (!toggle?.contains(e.target as Node) && !menu?.contains(e.target as Node)) {
      menu?.classList.add('hidden');
      menu?.classList.remove('flex');
    }
  });
</script>
""")

# 6. ContactForm Component
write_file("src/components/ContactForm.astro", """
---
const { lang } = Astro.props;
const isTr = lang === 'tr';
---
<form id="contactForm" class="max-w-xl mx-auto bg-surface p-10 rounded-2xl border border-primary shadow-2xl" method="POST" action="/api/contact" dir={isTr ? "ltr" : "rtl"}>
  <input type="text" name="b_name" class="hidden" tabindex="-1" autocomplete="off" />
  
  <div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-ivory/80 text-start">{isTr ? 'Ad Soyad' : 'نام و نام خانوادگی'}</label>
    <input type="text" name="name" required class="w-full bg-primary border border-surface rounded-lg p-4 text-ivory focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" />
  </div>
  
  <div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-ivory/80 text-start">{isTr ? 'Telefon' : 'تلفن'}</label>
    <input type="tel" name="phone" required class="w-full bg-primary border border-surface rounded-lg p-4 text-ivory focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all" dir="ltr" />
  </div>

  <div class="mb-6">
    <label class="block mb-2 text-sm font-medium text-ivory/80 text-start">{isTr ? 'Hizmet Türü' : 'نوع خدمات'}</label>
    <select name="service" required class="w-full bg-primary border border-surface rounded-lg p-4 text-ivory focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all">
      <option value="">{isTr ? 'Seçiniz' : 'انتخاب کنید'}</option>
      <option value="immigration">{isTr ? 'Göçmenlik & İkamet' : 'مهاجرت و اقامت'}</option>
      <option value="company">{isTr ? 'Şirket Kuruluşu' : 'ثبت شرکت'}</option>
      <option value="translation">{isTr ? 'Yeminli Tercümanlık' : 'ترجمه رسمی'}</option>
      <option value="other">{isTr ? 'Diğer' : 'سایر'}</option>
    </select>
  </div>
  
  <div class="mb-8">
    <label class="block mb-2 text-sm font-medium text-ivory/80 text-start">{isTr ? 'Mesajınız' : 'پیام شما'}</label>
    <textarea name="message" rows="4" required class="w-full bg-primary border border-surface rounded-lg p-4 text-ivory focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all"></textarea>
  </div>
  
  <button type="submit" class="w-full bg-brand text-white font-bold py-4 px-4 rounded-lg hover:bg-[#A33850] transition-colors shadow-lg">
    {isTr ? 'Danışmanlık Talebi Gönder' : 'ارسال درخواست مشاوره'}
  </button>
  
  <p id="formStatus" class="mt-6 text-center hidden font-medium"></p>
</form>

<script>
  document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // Basic frontend validation
    const formData = new FormData(form);
    let valid = true;
    for (let [key, value] of formData.entries()) {
        if(key !== 'b_name' && !value) valid = false;
    }
    
    const statusEl = document.getElementById('formStatus');
    if(!valid && statusEl) {
        statusEl.textContent = document.documentElement.lang === 'tr' ? 'Lütfen tüm alanları doldurun.' : 'لطفاً تمام فیلدها را پر کنید.';
        statusEl.className = 'mt-6 text-center block text-rose';
        return;
    }
    
    if (statusEl) {
      statusEl.textContent = document.documentElement.lang === 'tr' ? 'Gönderiliyor...' : 'در حال ارسال...';
      statusEl.className = 'mt-6 text-center block text-bronze';
    }
    
    try {
      const res = await fetch(form.action, { method: 'POST', body: formData });
      const data = await res.json();
      
      if (res.ok) {
        if(statusEl) {
          statusEl.textContent = document.documentElement.lang === 'tr' ? 'Mesajınız başarıyla iletildi. En kısa sürede dönüş yapacağız.' : 'پیام شما با موفقیت ارسال شد. در اسرع وقت پاسخ خواهیم داد.';
          statusEl.className = 'mt-6 text-center block text-green-500';
        }
        form.reset();
      } else {
        throw new Error(data.error || 'Error');
      }
    } catch (err) {
      if(statusEl) {
        statusEl.textContent = document.documentElement.lang === 'tr' ? 'Bir hata oluştu, lütfen tekrar deneyin veya WhatsApp üzerinden ulaşın.' : 'خطایی رخ داد، لطفاً دوباره تلاش کنید یا از طریق واتساپ تماس بگیرید.';
        statusEl.className = 'mt-6 text-center block text-rose';
      }
    }
  });
</script>
""")

# 7. Root Index Redirect
write_file("src/pages/index.astro", """
---
import '../styles/global.css';
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mina Beigi | International Consulting</title>
    <style>
      body { background: #17191D; color: #F3EEE7; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: sans-serif; flex-direction: column; }
      .brand { color: #8A2F43; font-size: 2rem; font-weight: bold; margin-bottom: 2rem; letter-spacing: 2px; }
      .links { display: flex; gap: 2rem; }
      a { padding: 1rem 2rem; border: 1px solid #242329; border-radius: 8px; color: #F3EEE7; text-decoration: none; transition: 0.3s; background: #242329; }
      a:hover { background: #8A2F43; border-color: #8A2F43; }
    </style>
  </head>
  <body>
    <div class="brand">MINA BEIGI</div>
    <div class="links">
      <a href="/tr/">Türkçe (Turkish)</a>
      <a href="/fa/">فارسی (Persian)</a>
    </div>
    <script>
      const lang = localStorage.getItem('mb_lang') || navigator.language.slice(0,2);
      if (lang === 'fa') window.location.href = '/fa/';
      else if (lang === 'tr') window.location.href = '/tr/';
    </script>
  </body>
</html>
""")

# 8. Service Info (mock) generator
def make_page(path, lang, title, content_html):
    dir_path = "ltr" if lang == 'tr' else "rtl"
    html = f"""---
import BaseLayout from '../../layouts/BaseLayout.astro';
---
<BaseLayout title="{title}" description="{title} - Mina Beigi" lang="{lang}">
  <div class="py-24 bg-surface border-b border-primary">
    <div class="container mx-auto px-4 max-w-4xl text-center">
      <h1 class="text-4xl font-bold text-ivory mb-6">{title}</h1>
      <div class="w-24 h-1 bg-brand mx-auto rounded-full"></div>
    </div>
  </div>
  <div class="py-20 bg-primary min-h-[50vh]">
    <div class="container mx-auto px-4 max-w-3xl prose prose-invert prose-brand prose-lg" dir="{dir_path}">
      {content_html}
    </div>
  </div>
</BaseLayout>
"""
    write_file(f"src/pages/{lang}/{path}.astro", html)

services_tr = [
    ("calisma-izni", "Çalışma İzni Süreçleri", "<p>Türkiye’de çalışma izni başvuru koordinasyonu, dosya hazırlığı ve mevzuata uygun süreç takibi.</p>"),
    ("ogrenci-ikameti", "Öğrenci İkamet Süreçleri", "<p>Yabancı uyruklu öğrenciler için ikamet izni başvuruları ve dosya hazırlık koordinasyonu.</p>"),
    ("gayrimenkul-ikamet-vatandaslik", "Gayrimenkul ile İkamet ve Vatandaşlık", "<p>Yatırım yoluyla ikamet ve vatandaşlık süreçlerinin ön değerlendirmesi ve profesyonel başvuru takibi.</p>"),
    ("sirket-kurulusu", "Şirket Kuruluşu", "<p>İranlı ve yabancı yatırımcılar için Türkiye'de şirket kuruluş ve ticaret odası kayıt süreçleri.</p>"),
    ("yatirim-danismanligi", "Yatırım Danışmanlığı", "<p>Türkiye'deki ticari ve gayrimenkul yatırımlarınız için stratejik ve mevzuatsal danışmanlık.</p>"),
    ("deport-ret-surecleri", "Deport / Ret Süreçleri Danışmanlığı", "<p>Göçmenlik başvurularında alınan ret kararları veya sınır dışı işlemlerinde danışmanlık ve resmi itiraz süreçlerinin yönetimi.</p>"),
    ("tercumanlik", "Resmî / Yeminli Tercümanlık", "<p>Resmi makamlarda geçerli, yeminli yazılı ve ardıl sözlü tercümanlık hizmetleri.</p>")
]

services_fa = [
    ("work-permit", "فرآیندهای مجوز کار", "<p>هماهنگی و آماده‌سازی پرونده‌های مجوز کار در ترکیه و پیگیری مراحل مطابق با قوانین.</p>"),
    ("student-residence", "فرآیندهای اقامت تحصیلی", "<p>مشاوره و آماده‌سازی مدارک جهت اخذ اقامت دانشجویی در ترکیه.</p>"),
    ("property-residence-citizenship", "اقامت و شهروندی از طریق ملک", "<p>ارزیابی اولیه و پیگیری حرفه‌ای پرونده‌های اقامت و شهروندی از طریق سرمایه‌گذاری ملکی.</p>"),
    ("company-formation", "ثبت شرکت", "<p>مشاوره و مدیریت فرآیند ثبت شرکت و ثبت در اتاق بازرگانی برای سرمایه‌گذاران خارجی.</p>"),
    ("investment-consulting", "مشاوره سرمایه‌گذاری", "<p>ارائه مشاوره‌های راهبردی و قانونی برای سرمایه‌گذاری‌های تجاری و ملکی در ترکیه.</p>"),
    ("deport-rejection", "مشاوره فرآیندهای دیپورت و ریجکت", "<p>ارائه مشاوره و مدیریت مراحل اعتراض به رد درخواست‌های مهاجرتی یا احکام اخراج.</p>"),
    ("translation", "ترجمه رسمی و معتمد", "<p>خدمات ترجمه کتبی رسمی و ترجمه همزمان شفاهی معتبر در مراجع قانونی.</p>")
]

for p, t, c in services_tr: make_page(p, "tr", t, c)
for p, t, c in services_fa: make_page(p, "fa", t, c)

# 9. Static pages (About, FAQ, Contact, Privacy)
make_page("hakkimizda", "tr", "Hakkımızda", "<p>Mina Beigi, İran'da lisanslı avukat olup Türkiye'de resmî tercümanlık, göçmenlik süreçleri danışmanlığı, başvuru koordinasyonu ve yatırım süreçleri alanlarında profesyonel destek sunmaktadır.</p><p>Mina Beigi’nin avukatlık yetkisi İran kapsamındadır. Türkiye’de sunulan hizmetler danışmanlık, başvuru koordinasyonu ve resmî tercümanlık kapsamındadır.</p>")
make_page("sss", "tr", "Sıkça Sorulan Sorular", "<p>Danışmanlık süreçlerimiz hakkında sıkça sorulan sorular.</p>")
make_page("iletisim", "tr", "İletişim", "<p>Ofislerimize ulaşmak veya danışmanlık talebi oluşturmak için iletişim bilgilerimiz.</p>")
make_page("gizlilik", "tr", "Gizlilik Politikası", "<p>Gizlilik politikamız ve veri güvenliği ilkelerimiz.</p>")
make_page("kvkk", "tr", "KVKK ve Aydınlatma Metni", "<p>Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınız.</p>")
make_page("hizmetler", "tr", "Tüm Hizmetlerimiz", "<p>Türkiye ve İran arasında sunduğumuz profesyonel hizmetler portföyü.</p>")

make_page("about", "fa", "درباره ما", "<p>مینا بیگی، وکیل پایه یک دادگستری در ایران است و در ترکیه خدمات مترجمی رسمی، مشاوره فرآیندهای مهاجرتی، هماهنگی درخواست‌ها و مشاوره سرمایه‌گذاری ارائه می‌دهد.</p><p>صلاحیت وکالت مینا بیگی محدود به ایران است. خدمات در ترکیه شامل مشاوره، هماهنگی درخواست‌ها و ترجمه رسمی است.</p>")
make_page("faq", "fa", "سوالات متداول", "<p>سوالات رایج درباره فرآیندهای مشاوره و مهاجرت.</p>")
make_page("contact", "fa", "تماس با ما", "<p>برای ارتباط با دفاتر ما در تهران و استانبول از اطلاعات زیر استفاده کنید.</p>")
make_page("privacy", "fa", "حریم خصوصی", "<p>سیاست حفظ حریم خصوصی و امنیت اطلاعات مراجعین.</p>")
make_page("services", "fa", "خدمات ما", "<p>مجموعه خدمات حرفه‌ای ما در ارتباط با امور حقوقی، تجاری و مهاجرتی در ترکیه.</p>")

# 10. TR Index (Full redesign)
write_file("src/pages/tr/index.astro", """
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ContactForm from '../../components/ContactForm.astro';
---
<BaseLayout title="Ana Sayfa" description="Türkiye'de Göçmenlik, Yatırım ve Resmî Süreçlerde Profesyonel Destek" lang="tr">
  <!-- 1. Hero -->
  <section class="relative py-28 md:py-40 bg-primary overflow-hidden">
    <!-- Sophisticated gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-primary z-10"></div>
    <div class="absolute inset-0 bg-[url('/images/hero-background.webp')] bg-cover bg-center object-cover opacity-30 mix-blend-luminosity"></div>
    
    <div class="container mx-auto px-4 relative z-20 text-center max-w-5xl">
      <span class="inline-block py-1 px-3 border border-surface bg-surface/50 rounded-full text-bronze text-sm tracking-widest uppercase mb-8 backdrop-blur">
        Uluslararası Danışmanlık
      </span>
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-ivory leading-tight tracking-tight">
        Türkiye'de Göçmenlik, Yatırım ve <span class="text-brand">Resmî Süreçlerde</span> Profesyonel Destek
      </h1>
      <p class="text-lg md:text-xl text-ivory/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
        İran ve Türkiye arasındaki hukuki, ticari ve resmî süreçlerde deneyimli danışmanlık ve dosya koordinasyonu.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-5">
        <a href="#iletisim" class="bg-brand text-white font-semibold py-4 px-10 rounded shadow-2xl hover:bg-[#A33850] hover:-translate-y-1 transition-all duration-300">
          Danışmanlık Talebi
        </a>
        <a href="https://wa.me/905392425624" class="bg-surface border border-primary text-ivory font-semibold py-4 px-10 rounded hover:bg-primary transition-all duration-300">
          WhatsApp'tan İletişim
        </a>
      </div>
    </div>
  </section>

  <!-- 2. Kısa Tanıtım -->
  <section class="py-20 bg-surface border-y border-primary">
    <div class="container mx-auto px-4 max-w-4xl text-center">
      <h2 class="text-2xl md:text-3xl font-light text-ivory leading-relaxed">
        Sınırların ötesindeki işlemlerinizde <span class="text-bronze font-semibold">güvenilir, mevzuata uygun ve şeffaf</span> bir yol haritası çiziyoruz.
      </h2>
    </div>
  </section>

  <!-- 3. Hizmet Alanları -->
  <section class="py-24 bg-primary">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16">
        <div class="max-w-2xl">
          <h2 class="text-4xl font-bold text-ivory mb-4">Uzmanlık Alanlarımız</h2>
          <p class="text-ivory/60 text-lg">Süreçlerinizin her aşamasında profesyonel ön değerlendirme, dosya hazırlığı ve resmi makamlar nezdinde koordinasyon sağlıyoruz.</p>
        </div>
        <a href="/tr/hizmetler" class="text-bronze hover:text-brand font-medium mt-6 md:mt-0 flex items-center gap-2 transition-colors">
          Tüm Hizmetleri İncele <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[
          {l: '/tr/calisma-izni', t: 'Çalışma İzni Süreçleri', d: 'Mevzuata uygun başvuru koordinasyonu ve profesyonel dosya yönetimi.'},
          {l: '/tr/gayrimenkul-ikamet-vatandaslik', t: 'İkamet ve Vatandaşlık', d: 'Gayrimenkul ve yatırım yoluyla vatandaşlık dosyalarının ön değerlendirmesi.'},
          {l: '/tr/sirket-kurulusu', t: 'Şirket Kuruluşu', d: 'Ticaret odası kayıt süreçleri ve ticari izinlerin koordinasyonu.'},
          {l: '/tr/yatirim-danismanligi', t: 'Yatırım Danışmanlığı', d: 'Doğru ve stratejik pazar konumlandırması için rehberlik.'},
          {l: '/tr/deport-ret-surecleri', t: 'Deport / Ret Danışmanlığı', d: 'Reddedilen dosyaların analizi ve idari itiraz süreçlerinin takibi.'},
          {l: '/tr/tercumanlik', t: 'Resmî Tercümanlık', d: 'Noter onaylı belge çevirisi ve kurumlarda ardıl sözlü tercümanlık.'}
        ].map(s => (
          <a href={s.l} class="group block p-8 bg-surface rounded-xl border border-primary hover:border-brand/50 transition-all duration-300">
            <h3 class="text-xl font-bold text-ivory mb-3 group-hover:text-brand transition-colors">{s.t}</h3>
            <p class="text-ivory/60 leading-relaxed text-sm">{s.d}</p>
          </a>
        ))}
      </div>
    </div>
  </section>

  <!-- 4. Mina Beigi / Hakkımızda -->
  <section class="py-24 bg-surface border-y border-primary">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-col lg:flex-row items-center gap-16">
        <div class="w-full lg:w-5/12 relative">
          <div class="absolute -inset-4 bg-brand/10 rounded-3xl transform rotate-3"></div>
          <div class="relative aspect-[4/5] rounded-2xl overflow-hidden bg-primary border border-surface">
            <img src="/images/mina-profile.webp" alt="Mina Beigi" class="w-full h-full object-cover grayscale-[20%]" onerror="this.style.display='none'" />
            <div class="absolute inset-0 flex items-center justify-center text-ivory/30 text-sm" style="z-index:-1;">Fotoğraf Alanı</div>
          </div>
        </div>
        <div class="w-full lg:w-7/12">
          <span class="text-rose font-medium tracking-wide uppercase text-sm mb-3 block">Kurucu Danışman</span>
          <h2 class="text-4xl font-bold mb-6 text-ivory">Mina Beigi</h2>
          <p class="text-lg text-ivory/80 mb-8 leading-relaxed">
            İran ve Türkiye ekseninde ticari ve bireysel işlemlerin yürütülmesinde yüksek mesleki standartlarda destek sağlamaktayız. Amacımız, hukuki ve bürokratik engelleri aşmanızda size rehberlik etmektir.
          </p>
          <div class="bg-primary p-6 rounded-xl border border-surface mb-8">
            <ul class="space-y-4 text-ivory/90 font-medium">
              <li class="flex items-center gap-4"><div class="w-2 h-2 rounded-full bg-brand"></div> <span>İran'da Birinci Derece Lisanslı Avukat</span></li>
              <li class="flex items-center gap-4"><div class="w-2 h-2 rounded-full bg-accent"></div> <span>Türkiye'de Resmî Yeminli Tercüman</span></li>
              <li class="flex items-center gap-4"><div class="w-2 h-2 rounded-full bg-rose"></div> <span>Türkiye Göçmenlik Süreçleri Danışmanı</span></li>
              <li class="flex items-center gap-4"><div class="w-2 h-2 rounded-full bg-bronze"></div> <span>İran-İtalya Ticaret Odası Üyesi</span></li>
            </ul>
          </div>
          <p class="text-sm text-ivory/50 bg-primary/30 p-4 rounded-lg border border-primary">
            Mina Beigi, İran'da lisanslı avukat olup Türkiye'de resmî tercümanlık, göçmenlik süreçleri danışmanlığı, başvuru koordinasyonu ve yatırım süreçleri alanlarında profesyonel destek sunmaktadır. (Türkiye'de avukatlık denkliği veya Baro kayıtlı avukatlık yetkisi kapsamında hizmet verilmemektedir.)
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. İletişim Formu -->
  <section id="iletisim" class="py-24 bg-primary relative overflow-hidden">
    <!-- Decorative element -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 class="text-4xl font-bold text-ivory mb-6">İletişime Geçin</h2>
        <p class="text-ivory/70 text-lg">Dosya değerlendirmesi ve profesyonel başvuru desteği için formumuzu doldurun, ekibimiz size en kısa sürede dönüş yapsın.</p>
      </div>
      <ContactForm lang="tr" />
    </div>
  </section>
</BaseLayout>
""")

# 11. FA Index (Full redesign)
write_file("src/pages/fa/index.astro", """
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ContactForm from '../../components/ContactForm.astro';
---
<BaseLayout title="خانه" description="پشتیبانی حرفه‌ای در فرآیندهای اقامت، سرمایه‌گذاری و امور رسمی در ترکیه" lang="fa">
  <!-- 1. Hero -->
  <section class="relative py-28 md:py-40 bg-primary overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-primary z-10"></div>
    <div class="absolute inset-0 bg-[url('/images/hero-background.webp')] bg-cover bg-center object-cover opacity-30 mix-blend-luminosity"></div>
    
    <div class="container mx-auto px-4 relative z-20 text-center max-w-5xl">
      <span class="inline-block py-1 px-3 border border-surface bg-surface/50 rounded-full text-bronze text-sm tracking-widest uppercase mb-8 backdrop-blur">
        مشاوره بین‌المللی
      </span>
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-ivory leading-tight tracking-tight">
        پشتیبانی حرفه‌ای در فرآیندهای اقامت، <span class="text-brand">سرمایه‌گذاری</span> و امور رسمی در ترکیه
      </h1>
      <p class="text-lg md:text-xl text-ivory/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
        مشاوره حرفه‌ای و مدیریت پرونده‌ها در فرآیندهای حقوقی، تجاری و رسمی بین ایران و ترکیه.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-5">
        <a href="#contact" class="bg-brand text-white font-semibold py-4 px-10 rounded shadow-2xl hover:bg-[#A33850] hover:-translate-y-1 transition-all duration-300">
          ثبت درخواست مشاوره
        </a>
        <a href="https://wa.me/989125102088" class="bg-surface border border-primary text-ivory font-semibold py-4 px-10 rounded hover:bg-primary transition-all duration-300">
          ارتباط از طریق واتساپ
        </a>
      </div>
    </div>
  </section>

  <!-- 2. Intro -->
  <section class="py-20 bg-surface border-y border-primary">
    <div class="container mx-auto px-4 max-w-4xl text-center">
      <h2 class="text-2xl md:text-3xl font-light text-ivory leading-relaxed">
        ما با ارائه یک نقشه راه <span class="text-bronze font-semibold">مطمئن، قانونی و شفاف</span>، شما را در عبور از مرزها همراهی می‌کنیم.
      </h2>
    </div>
  </section>

  <!-- 3. Services -->
  <section class="py-24 bg-primary">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16">
        <div class="max-w-2xl text-start" dir="rtl">
          <h2 class="text-4xl font-bold text-ivory mb-4">حوزه‌های تخصصی ما</h2>
          <p class="text-ivory/60 text-lg">ما در تمامی مراحل، ارزیابی اولیه حرفه‌ای، آماده‌سازی پرونده و هماهنگی با مراجع رسمی را ارائه می‌دهیم.</p>
        </div>
        <a href="/fa/services" class="text-bronze hover:text-brand font-medium mt-6 md:mt-0 flex items-center gap-2 transition-colors">
          مشاهده تمام خدمات <span aria-hidden="true" class="rotate-180 inline-block">&rarr;</span>
        </a>
      </div>
      
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6" dir="rtl">
        {[
          {l: '/fa/work-permit', t: 'فرآیندهای مجوز کار', d: 'هماهنگی درخواست‌ها مطابق با قوانین و مدیریت حرفه‌ای پرونده.'},
          {l: '/fa/property-residence-citizenship', t: 'اقامت و شهروندی', d: 'ارزیابی اولیه پرونده‌های شهروندی از طریق سرمایه‌گذاری و املاک.'},
          {l: '/fa/company-formation', t: 'ثبت شرکت', d: 'فرآیندهای ثبت در اتاق بازرگانی و هماهنگی مجوزهای تجاری.'},
          {l: '/fa/investment-consulting', t: 'مشاوره سرمایه‌گذاری', d: 'راهنمایی برای جایگاه‌یابی استراتژیک و مناسب در بازار.'},
          {l: '/fa/deport-rejection', t: 'مشاوره دیپورت و ریجکت', d: 'تحلیل پرونده‌های رد شده و پیگیری فرآیندهای اعتراض اداری.'},
          {l: '/fa/translation', t: 'ترجمه رسمی', d: 'ترجمه مدارک با تاییدیه نوتر و ترجمه شفاهی همزمان در ادارات.'}
        ].map(s => (
          <a href={s.l} class="group block p-8 bg-surface rounded-xl border border-primary hover:border-brand/50 transition-all duration-300 text-start">
            <h3 class="text-xl font-bold text-ivory mb-3 group-hover:text-brand transition-colors">{s.t}</h3>
            <p class="text-ivory/60 leading-relaxed text-sm">{s.d}</p>
          </a>
        ))}
      </div>
    </div>
  </section>

  <!-- 4. About -->
  <section class="py-24 bg-surface border-y border-primary">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-col lg:flex-row-reverse items-center gap-16" dir="rtl">
        <div class="w-full lg:w-5/12 relative">
          <div class="absolute -inset-4 bg-brand/10 rounded-3xl transform -rotate-3"></div>
          <div class="relative aspect-[4/5] rounded-2xl overflow-hidden bg-primary border border-surface">
            <img src="/images/mina-profile.webp" alt="مینا بیگی" class="w-full h-full object-cover grayscale-[20%]" onerror="this.style.display='none'" />
            <div class="absolute inset-0 flex items-center justify-center text-ivory/30 text-sm" style="z-index:-1;">جایگاه عکس</div>
          </div>
        </div>
        <div class="w-full lg:w-7/12 text-start">
          <span class="text-rose font-medium tracking-wide uppercase text-sm mb-3 block">مشاور ارشد و موسس</span>
          <h2 class="text-4xl font-bold mb-6 text-ivory">مینا بیگی</h2>
          <p class="text-lg text-ivory/80 mb-8 leading-relaxed">
            ما پشتیبانی با استانداردهای بالای حرفه‌ای در مدیریت امور تجاری و فردی در محور ایران و ترکیه ارائه می‌دهیم. هدف ما راهنمایی شما در عبور از موانع قانونی و اداری است.
          </p>
          <div class="bg-primary p-6 rounded-xl border border-surface mb-8">
            <ul class="space-y-4 text-ivory/90 font-medium">
              <li class="flex items-center gap-4"><div class="w-2 h-2 rounded-full bg-brand"></div> <span>وکیل پایه یک دادگستری در ایران</span></li>
              <li class="flex items-center gap-4"><div class="w-2 h-2 rounded-full bg-accent"></div> <span>مترجم رسمی و مورد تایید در ترکیه</span></li>
              <li class="flex items-center gap-4"><div class="w-2 h-2 rounded-full bg-rose"></div> <span>مشاور فرآیندهای مهاجرتی در ترکیه</span></li>
              <li class="flex items-center gap-4"><div class="w-2 h-2 rounded-full bg-bronze"></div> <span>عضو اتاق بازرگانی ایران و ایتالیا</span></li>
            </ul>
          </div>
          <p class="text-sm text-ivory/50 bg-primary/30 p-4 rounded-lg border border-primary">
            مینا بیگی وکیل دارای مجوز در ایران است و در ترکیه پشتیبانی حرفه‌ای در زمینه‌های ترجمه رسمی، مشاوره فرآیندهای مهاجرتی، هماهنگی درخواست‌ها و سرمایه‌گذاری ارائه می‌دهد. (خدمات در چارچوب معادل‌سازی وکالت یا مجوز وکالت ثبت شده در کانون وکلای ترکیه ارائه نمی‌شود.)
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Contact -->
  <section id="contact" class="py-24 bg-primary relative overflow-hidden">
    <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    
    <div class="container mx-auto px-4 relative z-10 text-center" dir="rtl">
      <div class="max-w-3xl mx-auto mb-12">
        <h2 class="text-4xl font-bold text-ivory mb-6">تماس با ما</h2>
        <p class="text-ivory/70 text-lg">برای ارزیابی پرونده و دریافت پشتیبانی حرفه‌ای درخواست، فرم ما را پر کنید تا تیم ما در اسرع وقت با شما تماس بگیرد.</p>
      </div>
      <ContactForm lang="fa" />
    </div>
  </section>
</BaseLayout>
""")

print("Site generation complete!")
