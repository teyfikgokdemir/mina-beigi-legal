const fs = require('fs');
let content = fs.readFileSync('src/styles/global.css', 'utf8');

// Remove the garbage bytes at the end
content = content.replace(/@\u0000l\u0000a\u0000y\u0000e\u0000r[\s\S]*/, '');

content += `
@layer components {
  .reveal-up {
    opacity: 0;
    transform: translateY(2rem);
    transition: all 1s;
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal-up.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}
@layer utilities {
  .delay-100 { transition-delay: 100ms; }
  .delay-200 { transition-delay: 200ms; }
}
`;

fs.writeFileSync('src/styles/global.css', content);
