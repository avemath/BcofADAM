import { withBase } from './url';
import { withFigures } from './figures';
import { withPlaceholders } from './placeholders';
import { withAge } from './age';
import { withServices } from './services';

/**
 * Markdown written in the Studio, ready to show: links work under any base path,
 * photos become captioned figures (and get flagged when they have no description),
 * {{TODO}} notes are highlighted, {{Adam's age}} becomes his age, and the Privacy
 * Policy's {{contact form}}-style notes name the services set in Site settings.
 */
export function prose(html: string | undefined): string {
  return withServices(withAge(withPlaceholders(withFigures(withBase(html ?? '')))));
}
