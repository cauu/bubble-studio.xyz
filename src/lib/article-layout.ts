/** Attach stable presentation anchors without changing article prose or existing links. */
export function getArticleLayout(html: string) {
  const headings: { id: string; text: string; color: string }[] = [];
  const colors = ['cy', 'mag', 'yel', 'grn', 'pur'];
  const contentHtml = html
    .replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (_, attributes: string, content: string) => {
      const id = attributes.match(/\bid="([^"]+)"/)?.[1] ?? `section-${headings.length + 1}`;
      const color = colors[headings.length % colors.length];
      headings.push({
        id,
        text: content
          .replace(/<[^>]*>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>'),
        color
      });
      return `<h2${attributes.replace(/\s+id="[^"]*"/, '')} id="${id}" style="--c:var(--${color})">${content}</h2>`;
    })
    .replace(
      /<pre><code(?: class="language-([\w+-]+)")?>/g,
      (_, lang: string) =>
        `<pre tabindex="0" data-lang="${lang || 'TEXT'}"><code${lang ? ` class="language-${lang}"` : ''}>`
    );
  const text = html.replace(/<[^>]*>/g, ' ');
  const cjk = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latin = text
    .replace(/[\u3400-\u9fff]/g, ' ')
    .trim()
    .split(/\s+/).length;
  return { contentHtml, headings, minutes: Math.max(1, Math.ceil(cjk / 450 + latin / 220)) };
}
