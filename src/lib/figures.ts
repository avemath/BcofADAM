/**
 * A photo added with the Studio's picture button becomes a captioned figure.
 * The caption is the line in italics right under the photo. It also describes
 * the photo for screen readers when no description was added.
 */
export function withFigures(html: string): string {
  return html.replace(
    /<p>\s*(<img\b[^>]*>)\s*<\/p>(?:\s*<p>\s*<em>([\s\S]*?)<\/em>\s*<\/p>)?/g,
    (_match, img: string, caption?: string) => {
      const plain = (caption ?? '').replace(/<[^>]+>/g, '').replace(/"/g, '&quot;');
      let tag = img.replace(/\salt=""/, plain ? ` alt="${plain}"` : ' alt=""');
      if (!/\bloading=/.test(tag)) tag = tag.replace(/^<img\b/, '<img loading="lazy" decoding="async"');
      return `<figure class="story-figure">${tag}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
    },
  );
}
