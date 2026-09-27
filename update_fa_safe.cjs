const fs = require('fs');
const path = require('path');

const updateFaSafe = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // I will just replace the exact Farsi strings line by line to add the image paths!
  
  // 1
  content = content.replace(
    "{l: '/fa/investment-consulting', t: 'سرمایه گذاری در ترکیه', d: 'مشاوره سرمایه گذاری در استانبول، تحلیل بازار و راهنمایی سرمایه‌گذاران خارجی.'}",
    "{l: '/fa/investment-consulting', t: 'مشاوره سرمایه‌گذاری', d: 'راهنمایی برای جایگاه‌یابی صحیح و استراتژیک در بازار.', i: '/images/blog-10.jpg'}"
  );

  // 2
  content = content.replace(
    "{l: '/fa/company-formation', t: 'ثبت شرکت در ترکیه برای ایرانیان', d: 'راه اندازی کسب و کار در ترکیه، دریافت مجوزهای تجاری و هماهنگی‌های ثبت شرکت.'}",
    "{l: '/fa/company-formation', t: 'ثبت شرکت', d: 'فرآیند ثبت در اتاق بازرگانی و هماهنگی مجوزهای تجاری.', i: '/images/blog-3.jpg'}"
  );

  // 3
  content = content.replace(
    "{l: '/fa/property-residence-citizenship', t: 'خرید ملک در ترکیه / اقامت / شهروندی', d: 'اقامت ترکیه از طریق سرمایه گذاری، بررسی اسناد ملکی و هماهنگی امور شهروندی.'}",
    "{l: '/fa/property-residence-citizenship', t: 'اقامت و شهروندی', d: 'ارزیابی اولیه پرونده‌های شهروندی از طریق خرید ملک و سرمایه‌گذاری.', i: '/images/srv-citizen.jpg'}"
  );

  // 4
  content = content.replace(
    "{l: '/fa/work-permit', t: 'مجوزهای تجاری و رسمی', d: 'دریافت مجوز کار و اقامت تجاری برای مدیران و هماهنگی‌های رسمی.'}",
    "{l: '/fa/work-permit', t: 'دریافت اجازه کار', d: 'هماهنگی درخواست‌ها بر اساس مقررات و مدیریت حرفه‌ای پرونده‌ها.', i: '/images/srv-work.jpg'}"
  );

  // 5 (Merge student residence into translation to just remove one of them, or map it out)
  // Actually we only need 6 items. The old one had 7.
  content = content.replace(
    "{l: '/fa/student-residence', t: 'اقامت ترکیه و مجوز کار', d: 'اخذ اقامت تحصیلی و کاری، و هماهنگی فرآیندهای اقامتی در ترکیه.'},\n",
    ""
  );

  // 6
  content = content.replace(
    "{l: '/fa/translation', t: 'ترجمه رسمی', d: 'ترجمه رسمی مدارک با تایید نوتر برای تمامی امور ثبتی و قانونی.'}",
    "{l: '/fa/translation', t: 'ترجمه رسمی', d: 'ترجمه رسمی مدارک با تایید نوتر و ترجمه شفاهی در ادارات دولتی.', i: '/images/hero-translation.webp'}"
  );

  // 7
  content = content.replace(
    "{l: '/fa/deport-rejection', t: 'بررسی اولیه پرونده‌های دیپورت و ریجکت', d: 'بررسی اولیه پرونده و توضیح مسیرهای قابل پیگیری بر اساس شرایط هر پرونده.'}",
    "{l: '/fa/deport-rejection', t: 'مشاوره دیپورت و ریجکت', d: 'ارزیابی اولیه پرونده‌های رد شده و توضیح روندهای قابل پیگیری.', i: '/images/blog-8.jpg'}"
  );

  fs.writeFileSync(filePath, content);
};

updateFaSafe(path.join(__dirname, 'src/pages/fa/index.astro'));
