const fs = require('fs');
const data = fs.readFileSync('src/content/blog/2026-06-09-llm-architecture-and-prompt-engineering.md', 'utf8');
const matches = data.match(/!\[.*?\]\(.*?diagrams[^)]*\)/g) || [];
console.log('Total image refs:', matches.length);
matches.forEach((m, i) => console.log(`  ${i+1}. ${m}`));
const baseUrlCount = (data.match(/\{BASE_URL\}/g) || []).length;
console.log('BASE_URL count:', baseUrlCount);
