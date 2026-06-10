#!/usr/bin/env python3
"""
Bulk-convert <ZoomImage src="X" alt="Y" /> to standard markdown image syntax
![alt](src) across the blog/ directory, and strip the now-stale Docusaurus-style
`import ZoomImage from '...';` lines from .md / .mdx frontmatter.
"""
import re
import glob
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(ROOT, "blog")

def main():
    total_files = 0
    total_refs = 0
    for pattern in ("*.md", "*.mdx"):
        for fp in sorted(glob.glob(os.path.join(BLOG, pattern))):
            with open(fp, "r", encoding="utf-8") as f:
                content = f.read()
            if "ZoomImage" not in content and "import ZoomImage" not in content:
                continue
            orig = content
            file_refs = 0

            # 1. Strip Docusaurus-style import line
            n_imports = len(re.findall(
                r'^[ \t]*import\s+ZoomImage\s+from\s+[\'"][^\'"]+[\'"]\s*;?[ \t]*\n',
                content, flags=re.MULTILINE,
            ))
            content = re.sub(
                r'^[ \t]*import\s+ZoomImage\s+from\s+[\'"][^\'"]+[\'"]\s*;?[ \t]*\n',
                '', content, flags=re.MULTILINE,
            )

            # 2. Convert <ZoomImage ... /> to markdown image.
            #    The previous regex excluded `/` from attrs (broken for URLs);
            #    we now match the full opening tag and extract attrs separately.
            def repl(m):
                nonlocal file_refs
                full = m.group(0)
                open_m = re.match(r'<ZoomImage\b(.*?)/?>', full, re.DOTALL)
                if not open_m:
                    return full
                attrs = open_m.group(1)
                src_m = re.search(r'src=[\'"]([^\'"]+)[\'"]', attrs)
                alt_m = re.search(r'alt=[\'"]([^\'"]*)[\'"]', attrs)
                cap_m = re.search(r'caption=[\'"]([^\'"]*)[\'"]', attrs)
                if not src_m:
                    return full
                file_refs += 1
                src = src_m.group(1)
                alt = alt_m.group(1) if alt_m else ''
                cap = cap_m.group(1) if cap_m else ''
                alt_safe = alt.replace('"', '&quot;')
                if cap:
                    cap_safe = cap.replace('"', '&quot;')
                    return f'![{alt_safe}]({src} "{cap_safe}")'
                return f'![{alt_safe}]({src})'

            content = re.sub(r'<ZoomImage\b[^>]*>', repl, content)
            # Catch empty placeholders like <ZoomImage /> with no attrs
            content = re.sub(r'<ZoomImage\s*/>', '', content)

            if content != orig:
                with open(fp, "w", encoding="utf-8") as f:
                    f.write(content)
                total_files += 1
                total_refs += file_refs
                print(f"  [{file_refs:3d} refs, {n_imports} imports] {os.path.basename(fp)}")

    print(f"\nModified {total_files} files, converted {total_refs} <ZoomImage> references")

if __name__ == "__main__":
    main()
