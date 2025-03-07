// 从内容中提取 slug
function extractSlugFromContent(content) {
  const lines = content.split('\n');
  let slug = '';
  let inFrontmatter = false;
  
  for (const line of lines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    if (inFrontmatter && line.startsWith('slug:')) {
      slug = line.slice(5).trim();
      break;
    }
  }
  
  return slug;
}

module.exports = {
  extractSlugFromContent
}; 