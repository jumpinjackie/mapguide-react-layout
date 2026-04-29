/**
 * Helper to load markdown content from doc files
 * @hidden
 * @since 0.15
 */
export async function loadMarkdownDoc(fileName: string): Promise<string> {
  try {
    const module = await import(/* webpackMode: "eager" */ `./${fileName}.md?raw`);
    return module.default || module;
  } catch (error) {
    console.warn(`Failed to load markdown doc: ${fileName}`, error);
    return '';
  }
}

/**
 * Simple markdown to HTML converter for basic formatting
 * @hidden
 * @since 0.15
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  let html = markdown
    // Headers
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Lists
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')
    // Code blocks
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```/g, '').trim();
      return `<pre><code>${escapeHtml(code)}</code></pre>`;
    })
    // Inline code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/gm, '')
    .replace(/$/gm, '');

  return `<div style="line-height: 1.6;">${html}</div>`;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
