import fs from 'fs';
import path from 'path';

// Fix BaseLayout in all generated blog files
const fixLayout = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixLayout(fullPath);
    } else if (file.endsWith('.astro')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/import BaseLayout from ["'](\.\.\/)+layouts\/BaseLayout\.astro["'];/, 'import BaseLayout from "../../../layouts/BaseLayout.astro";');
      fs.writeFileSync(fullPath, content);
    }
  }
};

fixLayout('./src/pages/tr/blog');
fixLayout('./src/pages/fa/blog');

// Add Blog to Footer.astro
let footerContent = fs.readFileSync('./src/components/Footer.astro', 'utf8');
const searchStr = `<a href={isTr ? "/tr/hizmetler/" : "/fa/services/"} class="text-ivory/60 hover:text-brand transition-colors">{isTr ? "Hizmetler" : "خدمات"}</a>`;
if (footerContent.includes(searchStr)) {
  const replaceStr = searchStr + `\n          <a href={isTr ? "/tr/blog/" : "/fa/blog/"} class="text-ivory/60 hover:text-brand transition-colors">{isTr ? "Blog" : "مقالات"}</a>`;
  footerContent = footerContent.replace(searchStr, replaceStr);
  fs.writeFileSync('./src/components/Footer.astro', footerContent);
} else {
  console.log("Footer search string not found!");
}
