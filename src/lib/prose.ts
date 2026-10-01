import { withBase } from './url';
import { withFigures } from './figures';
import { withPlaceholders } from './placeholders';
import { withAge } from './age';

/**
 * Markdown written in the Studio, ready to show: links work under any base path,
 * photos become captioned figures (and get flagged when they have no description),
 * {{TODO}} notes are highlighted, and {{Adam's age}} becomes his age.
 */
export function prose(html: string | undefined): string {
  return withAge(withPlaceholders(withFigures(withBase(html ?? ''))));
}
