import { withBase } from './url';
import { withFigures } from './figures';
import { withPlaceholders } from './placeholders';

/**
 * Markdown written in the Studio, ready to show: links work under any base path,
 * photos become captioned figures (and get flagged when they have no description),
 * and {{TODO}} notes are highlighted.
 */
export function prose(html: string | undefined): string {
  return withPlaceholders(withFigures(withBase(html ?? '')));
}
