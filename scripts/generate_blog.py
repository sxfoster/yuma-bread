#!/usr/bin/env python3
"""Simple blog generator to convert Markdown posts into HTML."""

import os
import re
from pathlib import Path

SRC_DIR = Path('src/blog')
OUT_DIR = Path('public/blog')


def parse_front_matter(text: str):
    lines = text.splitlines()
    if not lines or lines[0].strip() != '---':
        return {}, text
    fm_lines = []
    i = 1
    while i < len(lines):
        if lines[i].strip() == '---':
            break
        fm_lines.append(lines[i])
        i += 1
    body = '\n'.join(lines[i + 1:])
    fm = {}
    for ln in fm_lines:
        if ':' not in ln:
            continue
        key, val = ln.split(':', 1)
        key = key.strip()
        val = val.strip().strip('"')
        if val.startswith('[') and val.endswith(']'):
            items = [v.strip().strip('"') for v in val[1:-1].split(',') if v.strip()]
            fm[key] = items
        else:
            fm[key] = val
    return fm, body


def md_to_html(md: str) -> str:
    lines = md.splitlines()
    html = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.startswith('# '):
            html.append(f'<h1>{line[2:].strip()}</h1>')
        elif line.startswith('## '):
            html.append(f'<h2>{line[3:].strip()}</h2>')
        elif line.startswith('### '):
            html.append(f'<h3>{line[4:].strip()}</h3>')
        elif re.match(r'!\[.*\]\(.*\)', line):
            m = re.match(r'!\[(.*?)\]\((.*?)\)', line)
            alt, src = m.groups()
            html.append(f'<img src="{src}" alt="{alt}" loading="lazy">')
        elif re.match(r'\d+\.\s', line):
            html.append('<ol>')
            while i < len(lines) and re.match(r'\d+\.\s', lines[i]):
                item = re.sub(r'^\d+\.\s', '', lines[i])
                html.append(f'<li>{item}</li>')
                i += 1
            html.append('</ol>')
            continue
        elif line.startswith('- '):
            html.append('<ul>')
            while i < len(lines) and lines[i].startswith('- '):
                item = lines[i][2:]
                html.append(f'<li>{item}</li>')
                i += 1
            html.append('</ul>')
            continue
        elif line.strip() == '':
            html.append('')
        else:
            text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', line)
            text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
            html.append(f'<p>{text}</p>')
        i += 1
    return '\n'.join(html)


def build_post(md_path: Path):
    text = md_path.read_text(encoding='utf-8')
    fm, body = parse_front_matter(text)
    slug = md_path.name.split('-', 3)[3].rsplit('.', 1)[0]
    content_html = md_to_html(body)
    out_dir = OUT_DIR / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    html = f"""<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <title>{fm.get('title', '')}</title>
  <meta name=\"description\" content=\"{fm.get('description', '')}\">
</head>
<body>
<h1>{fm.get('title', '')}</h1>
<p><em>By {fm.get('author', '')} on {fm.get('date', '')}</em></p>
{content_html}
</body>
</html>
"""
    (out_dir / 'index.html').write_text(html, encoding='utf-8')
    return fm, body, slug


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    posts = []
    for md_file in sorted(SRC_DIR.glob('*.md')):
        fm, body, slug = build_post(md_file)
        posts.append({'fm': fm, 'body': body, 'slug': slug})

    items_html = []
    for p in posts:
        words = p['body'].split()
        excerpt = ' '.join(words[:30])
        item = f"<h2><a href=\"{p['slug']}/\">{p['fm'].get('title','')}</a></h2>\n" \
               f"<p>{excerpt}...</p>\n<p><em>{p['fm'].get('date','')}</em> <a href=\"{p['slug']}/\">Read More</a></p>"
        items_html.append(f"<li>{item}</li>")

    index_html = """<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <title>Blog</title>
</head>
<body>
<h1>Blog</h1>
<ul>
""" + '\n'.join(items_html) + "\n</ul>\n</body>\n</html>\n"

    (OUT_DIR / 'index.html').write_text(index_html, encoding='utf-8')


if __name__ == '__main__':
    main()
