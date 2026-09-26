const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

function writeFile(filepath, content) {
    const fullPath = path.join(baseDir, filepath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content.trim() + '\\n', 'utf8');
}

// 1. global.css
writeFile('src/styles/global.css', `
@import "tailwindcss";

@theme {
  --color-primary: #0F172A;
  --color-secondary: #334155;
  --color-accent: #D4AF37;
  --color-light: #F8FAFC;
  --color-text: #1E293B;
}

@layer base {
  body {
    background-color: var(--color-primary);
    color: var(--color-light);
    font-family: 'Inter', 'Vazirmatn', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
}
`);

// 2. BaseLayout
writeFile('src/layouts/BaseLayout.astro', `
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
    <link rel="alternate" hreflang="tr" href={siteUrl + "/tr/"} />
    <link rel="alternate" hreflang="fa" href={siteUrl + "/fa/"} />
    <meta property="og:title" content={\`\${title} | Mina Beigi\`} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Vazirmatn:wght@300;400;500;600&display=swap" rel="stylesheet">
    <script>
      const lang = document.documentElement.lang;
      localStorage.setItem('mb_lang', lang);
    </script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "Mina Beigi",
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
  <body class="flex flex-col min-h-screen bg-primary">
    <Header lang={lang} />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer lang={lang} />
    <WhatsAppBtn lang={lang} />
  </body>
</html>
`);

// 3. Header
writeFile('src/components/Header.astro', `
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
const otherLangHref = isTr ? '/fa/' : '/tr/';
---
<header class="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur border-b border-white/10">
  <div class="container mx-auto px-4 py-4 flex justify-between items-center">
    <a href={\`/\${lang}/\`} class="text-2xl font-bold text-[#D4AF37] tracking-wide flex items-center gap-2">
      MINA BEIGI<span class="text-sm font-normal text-gray-300 hidden sm:inline-block border-s border-white/20 ps-2 ms-1">{isTr ? 'Legal & Consulting' : 'مشاوره حقوقی'}</span>
    </a>
    
    <nav class="hidden md:flex gap-8 items-center" dir={isTr ? "ltr" : "rtl"}>
      {nav.map(item => (
        <a href={item.href} class="text-sm font-medium text-white hover:text-[#D4AF37] transition-colors">
          {item.name}
        </a>
      ))}
      <a href={otherLangHref} class="px-3 py-1 text-xs font-bold border border-[#D4AF37] text-[#D4AF37] rounded hover:bg-[#D4AF37] hover:text-[#0F172A] transition-colors">
        {otherLangName}
      </a>
    </nav>
    
    <div class="md:hidden flex items-center gap-4">
      <a href={otherLangHref} class="px-2 py-1 text-xs font-bold border border-[#D4AF37] text-[#D4AF37] rounded">
        {otherLangName}
      </a>
      <button class="text-[#D4AF37] p-2" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </div>
  </div>
</header>
`);

// 4. Footer
writeFile('src/components/Footer.astro', `
---
const { lang } = Astro.props;
const isTr = lang === 'tr';
---
<footer class="bg-[#0a0f1c] pt-12 pb-6 border-t border-white/10 text-gray-400 text-sm">
  <div class="container mx-auto px-4 grid md:grid-cols-3 gap-8 mb-8" dir={isTr ? "ltr" : "rtl"}>
    <div>
      <h3 class="text-[#D4AF37] text-lg font-semibold mb-4">MINA BEIGI</h3>
      <p class="mb-4">{isTr ? 'İstanbul merkezli profesyonel hukuki danışmanlık ve süreç yönetimi.' : 'مشاوره حرفه‌ای حقوقی و مدیریت فرآیندها در استانبول.'}</p>
    </div>
    <div>
      <h3 class="text-white text-lg font-semibold mb-4">{isTr ? 'İletişim' : 'تماس با ما'}</h3>
      <p class="mb-2 text-start">📍 Pendik, İstanbul / Türkiye</p>
      <p class="mb-2 text-start" dir="ltr">📞 <a href="tel:+905392425624" class="hover:text-[#D4AF37]">+90 539 2425 624</a></p>
      <p class="mb-2 text-start" dir="ltr">📞 <a href="tel:+989125102088" class="hover:text-[#D4AF37]">+98 912 510 20 88</a></p>
    </div>
    <div>
      <h3 class="text-white text-lg font-semibold mb-4">{isTr ? 'Sosyal Medya' : 'شبکه‌های اجتماعی'}</h3>
      <a href="https://www.instagram.com/mina_beigi_lawyer?igsh=MXRtY2tlMTVjYm9jNA==" target="_blank" class="hover:text-[#D4AF37]">Instagram</a>
    </div>
  </div>
  <div class="container mx-auto px-4 text-center border-t border-white/10 pt-6">
    <p>&copy; {new Date().getFullYear()} Mina Beigi. {isTr ? 'Tüm hakları saklıdır.' : 'تمامی حقوق محفوظ است.'}</p>
  </div>
</footer>
`);

// 5. WhatsApp
writeFile('src/components/WhatsAppBtn.astro', `
---
const { lang } = Astro.props;
const isTr = lang === 'tr';
const msg = isTr ? 'Merhaba, danışmanlık hizmetleriniz hakkında bilgi almak istiyorum.' : 'سلام، می‌خواستم درباره خدمات مشاوره شما اطلاعات کسب کنم.';
const waUrl = \`https://wa.me/905392425624?text=\${encodeURIComponent(msg)}\`;
---
<a href={waUrl} target="_blank" class="fixed bottom-6 end-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
</a>
`);

// 6. ContactForm
writeFile('src/components/ContactForm.astro', `
---
const { lang } = Astro.props;
const isTr = lang === 'tr';
---
<form id="contactForm" class="max-w-xl mx-auto bg-[#334155]/30 p-8 rounded-lg border border-white/5" method="POST" action="/api/contact" dir={isTr ? "ltr" : "rtl"}>
  <!-- Honeypot -->
  <input type="text" name="b_name" class="hidden" tabindex="-1" autocomplete="off" />
  
  <div class="mb-4">
    <label class="block mb-2 text-sm text-gray-300 text-start">{isTr ? 'Ad Soyad' : 'نام و نام خانوادگی'}</label>
    <input type="text" name="name" required class="w-full bg-[#0F172A] border border-white/20 rounded p-3 text-white outline-none" />
  </div>
  
  <div class="mb-4">
    <label class="block mb-2 text-sm text-gray-300 text-start">{isTr ? 'Telefon' : 'تلفن'}</label>
    <input type="tel" name="phone" required class="w-full bg-[#0F172A] border border-white/20 rounded p-3 text-white outline-none" dir="ltr" />
  </div>
  
  <div class="mb-4">
    <label class="block mb-2 text-sm text-gray-300 text-start">{isTr ? 'Mesajınız' : 'پیام شما'}</label>
    <textarea name="message" rows="4" required class="w-full bg-[#0F172A] border border-white/20 rounded p-3 text-white outline-none"></textarea>
  </div>
  
  <button type="submit" class="w-full bg-[#D4AF37] text-[#0F172A] font-bold py-3 px-4 rounded hover:bg-yellow-500 transition-colors">
    {isTr ? 'Gönder' : 'ارسال'}
  </button>
  
  <p id="formStatus" class="mt-4 text-center hidden"></p>
</form>

<script>
  document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const statusEl = document.getElementById('formStatus');
    
    if (statusEl) {
      statusEl.textContent = document.documentElement.lang === 'tr' ? 'Gönderiliyor...' : 'در حال ارسال...';
      statusEl.classList.remove('hidden', 'text-green-400', 'text-red-400');
      statusEl.classList.add('text-gray-300', 'block');
    }
    
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (res.ok) {
        if(statusEl) {
          statusEl.textContent = document.documentElement.lang === 'tr' ? 'Mesajınız başarıyla iletildi.' : 'پیام شما با موفقیت ارسال شد.';
          statusEl.classList.remove('text-gray-300');
          statusEl.classList.add('text-green-400');
        }
        form.reset();
      } else {
        throw new Error(data.error || 'Error');
      }
    } catch (err) {
      if(statusEl) {
        statusEl.textContent = document.documentElement.lang === 'tr' ? 'Bir hata oluştu, lütfen tekrar deneyin.' : 'خطایی رخ داد، لطفاً دوباره تلاش کنید.';
        statusEl.classList.remove('text-gray-300');
        statusEl.classList.add('text-red-400');
      }
    }
  });
</script>
`);

// 7. Index root
writeFile('src/pages/index.astro', `
---
---
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0;url=/tr/" />
    <script>
      const lang = localStorage.getItem('mb_lang') || navigator.language.slice(0,2);
      if (lang === 'fa') {
        window.location.href = '/fa/';
      } else {
        window.location.href = '/tr/';
      }
    </script>
  </head>
  <body style="background:#0F172A;color:white;">
    <a href="/tr/">Türkçe</a> | <a href="/fa/">فارسی</a>
  </body>
</html>
`);

// 8. TR Index
writeFile('src/pages/tr/index.astro', `
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ContactForm from '../../components/ContactForm.astro';
---
<BaseLayout title="Ana Sayfa" description="Türkiye'de Hukuk, İkamet ve Yatırım Süreçlerinde Profesyonel Destek" lang="tr">
  <section class="relative py-24 md:py-32 bg-[#0F172A] overflow-hidden border-b border-white/5">
    <div class="absolute inset-0 opacity-20 bg-[url('/images/hero-office.webp')] bg-cover bg-center object-cover"></div>
    <div class="container mx-auto px-4 relative z-10 text-center max-w-4xl">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
        Türkiye’de Hukuk, İkamet ve <span class="text-[#D4AF37]">Yatırım Süreçlerinde</span> Profesyonel Destek
      </h1>
      <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
        Çalışma izni, ikamet, şirket kuruluşu, yatırım ve resmî işlemleriniz için İstanbul merkezli profesyonel danışmanlık.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="https://wa.me/905392425624" class="bg-[#D4AF37] text-[#0F172A] font-bold py-3 px-8 rounded hover:bg-yellow-500 transition-colors">
          WhatsApp'tan İletişime Geçin
        </a>
        <a href="#iletisim" class="border border-white/30 text-white font-medium py-3 px-8 rounded hover:bg-white/10 transition-colors">
          Danışmanlık Talebi Oluşturun
        </a>
      </div>
    </div>
  </section>

  <section class="py-20 bg-[#0c1222]">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-12 text-white">Hizmetlerimiz</h2>
      <div class="grid md:grid-cols-3 gap-8">
        {[
          {t: 'Çalışma İzni Süreçleri', d: 'Türkiye’de çalışma izni başvurularının mevzuata uygun şekilde yürütülmesi.'},
          {t: 'Şirket Kuruluşu', d: 'İranlı ve yabancı yatırımcılar için şirket kuruluş süreçlerinin koordinasyonu.'},
          {t: 'Gayrimenkul ve İkamet', d: 'Yatırım yoluyla ikamet ve vatandaşlık dosyalarının hukuki değerlendirmesi.'},
          {t: 'Deport & Ret Süreçleri', d: 'Göçmenlik süreçlerinde karşılaşılan ret durumlarında hukuki danışmanlık ve başvuru takibi.'},
          {t: 'Uluslararası Banka İşlemleri', d: 'Yabancılar için banka hesabı açılış süreçleri ve ticari gereksinimlerin yönetimi.'},
          {t: 'Yeminli Tercümanlık', d: 'Resmi makamlarda geçerli tercüme ve noter onaylı belge hizmetleri.'}
        ].map(s => (
          <div class="bg-[#0F172A] p-8 rounded-lg border border-white/5 hover:border-[#D4AF37]/50 transition-colors text-start">
            <h3 class="text-xl font-bold text-[#D4AF37] mb-3">{s.t}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="iletisim" class="py-20 bg-[#0F172A]">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-4 text-white">İletişime Geçin</h2>
      <p class="text-center text-gray-400 mb-12 max-w-xl mx-auto">Dosya değerlendirmesi ve profesyonel destek için formumuzu doldurun, size en kısa sürede dönüş yapalım.</p>
      <ContactForm lang="tr" />
    </div>
  </section>
</BaseLayout>
`);

// 9. FA Index
writeFile('src/pages/fa/index.astro', `
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ContactForm from '../../components/ContactForm.astro';
---
<BaseLayout title="خانه" description="پشتیبانی حرفه‌ای در فرآیندهای حقوقی، اقامت و سرمایه‌گذاری در ترکیه" lang="fa">
  <section class="relative py-24 md:py-32 bg-[#0F172A] overflow-hidden border-b border-white/5">
    <div class="absolute inset-0 opacity-20 bg-[url('/images/hero-office.webp')] bg-cover bg-center object-cover"></div>
    <div class="container mx-auto px-4 relative z-10 text-center max-w-4xl">
      <h1 class="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
        پشتیبانی حرفه‌ای در فرآیندهای حقوقی، اقامت و <span class="text-[#D4AF37]">سرمایه‌گذاری</span> در ترکیه
      </h1>
      <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
        مشاوره حرفه‌ای مستقر در استانبول برای مجوز کار، اقامت، ثبت شرکت، سرمایه‌گذاری و امور رسمی شما.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="https://wa.me/905392425624" class="bg-[#D4AF37] text-[#0F172A] font-bold py-3 px-8 rounded hover:bg-yellow-500 transition-colors">
          ارتباط از طریق واتساپ
        </a>
        <a href="#contact" class="border border-white/30 text-white font-medium py-3 px-8 rounded hover:bg-white/10 transition-colors">
          ثبت درخواست مشاوره
        </a>
      </div>
    </div>
  </section>

  <section class="py-20 bg-[#0c1222]">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-12 text-white">خدمات ما</h2>
      <div class="grid md:grid-cols-3 gap-8">
        {[
          {t: 'فرآیندهای مجوز کار', d: 'مدیریت درخواست‌های مجوز کار در ترکیه مطابق با مقررات.'},
          {t: 'ثبت شرکت', d: 'هماهنگی فرآیندهای ثبت شرکت برای سرمایه‌گذاران ایرانی و خارجی.'},
          {t: 'املاک و اقامت', d: 'ارزیابی حقوقی پرونده‌های اقامت و شهروندی از طریق سرمایه‌گذاری.'},
          {t: 'فرآیندهای دیپورت و ریجکت', d: 'مشاوره حقوقی در موارد رد درخواست‌های مهاجرتی و پیگیری درخواست‌ها.'},
          {t: 'امور بانکی بین‌المللی', d: 'فرآیندهای افتتاح حساب بانکی برای اتباع خارجی و نیازهای تجاری.'},
          {t: 'خدمات ترجمه رسمی', d: 'خدمات ترجمه معتبر برای مراجع رسمی و مدارک تایید شده.'}
        ].map(s => (
          <div class="bg-[#0F172A] p-8 rounded-lg border border-white/5 hover:border-[#D4AF37]/50 transition-colors text-start">
            <h3 class="text-xl font-bold text-[#D4AF37] mb-3">{s.t}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section id="contact" class="py-20 bg-[#0F172A]">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-4 text-white">تماس با ما</h2>
      <p class="text-center text-gray-400 mb-12 max-w-xl mx-auto">برای ارزیابی پرونده و دریافت پشتیبانی حرفه‌ای، فرم زیر را پر کنید تا در اسرع وقت با شما تماس بگیریم.</p>
      <ContactForm lang="fa" />
    </div>
  </section>
</BaseLayout>
`);

// 10. API
writeFile('functions/api/contact.ts', `
export const onRequestPost = async (context) => {
  const request = context.request;
  
  try {
    const formData = await request.formData();
    
    // Honeypot check
    if (formData.get('b_name')) {
      return new Response(JSON.stringify({ error: 'Spam detected' }), { status: 400 });
    }
    
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    if (!name || !phone || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }
    
    console.log(\`New lead: \${name} / \${phone}\`);
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}
`);

console.log("Setup completed successfully.");
