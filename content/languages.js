/*
 * Languages available on the site. To add a language:
 *   1. Copy content/en.js to content/<code>.js (e.g. content/ga.js for Irish).
 *   2. Change the first lines to:  window.SITE_CONTENT.<code> = { ... }
 *   3. Translate the text (keep the keys, HTML tags and {placeholders} as they are).
 *   4. Add the language below, e.g.  ga: 'Gaeilge'
 * A language switcher appears in the page header as soon as there is more than one language.
 * Anything missing from a translation falls back to English.
 */
window.SITE_LANGUAGES = {
    en: 'English'
};
