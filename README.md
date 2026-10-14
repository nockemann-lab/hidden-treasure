# Hidden Treasure in Your Pocket

An interactive educational resource about the critical and strategic elements inside a smartphone, for classrooms, outreach events and self-guided learning.
Tap a layer of the exploded phone (screen, camera, speaker, circuit board, battery, casing) to see which elements it contains, then tap an element for a photo and short explanation.

It is a static website with no build step. Open `index.html` in a browser, or serve the folder with any static host (e.g. GitHub Pages).

## Pages

- `index.html`: the interactive phone (start here), with exploration progress, previous/next navigation (buttons, swipe, arrow keys) and a periodic-table view
- `quiz.html`: a scored multiple-choice quiz with a printable certificate (10 random questions per round; `quiz.html?n=all` asks all of them, `?n=5` five)
- `teachers.html`: teacher guide: learning objectives, lesson plan, discussion questions, extension tasks, printable worksheet and quiz answer key

## Features

- **Exhibition mode:** add `?kiosk` to the address (e.g. `index.html?kiosk`). The display resets itself after 90 s without interaction (`?kiosk=120` for 120 s), external links are disabled and the teacher guide / certificate are hidden.
- **Installable and offline:** when served over http(s), the site can be installed as an app and works offline after the first visit (`manifest.webmanifest`, `sw.js`).
- **Dark mode:** follows the device setting; the 🌙/☀️ button switches manually (remembered per device).
- **Languages:** all text of the interactive phone and the quiz is in `content/<language>.js`. See `content/languages.js` for how to add a language; a language menu appears automatically when there is more than one.
- **Accessibility:** keyboard and screen-reader support, WCAG AA colour contrast in light and dark mode, reduced motion when requested.

## Files

| File | What it contains |
|---|---|
| `content/en.js` | All English text: interface, element names, the six phone parts (element texts, statistics, facts) and the quiz questions (first option = correct answer) |
| `content/languages.js` | List of available languages |
| `index.html` | Main page; element data (type, critical-list status, photo credits) and the hotspot outlines |
| `site.css`, `site.js` | Shared colours/themes, theme toggle, language loading, exhibition mode, offline support |
| `sw.js` | Offline cache. **Increase `VERSION` whenever you change a file**, and add new files (e.g. a new language) to `FILES` |
| `og-image.jpg` | Preview image for links shared on social media / messaging apps |
| `icons/` | App icons |

## Hotspots

The clickable areas are SVG polygons traced over `phone_parts_exploded_view.jpg`, using the image's original 1696×2528 pixel grid as the `viewBox`. If the image is replaced, the polygon `points` need re-tracing.

## After publishing

- Link previews: some apps need the full address of the preview image. Change `og:image` in the three HTML files to e.g. `https://<account>.github.io/<repository>/og-image.jpg`.
- Add the repository URL and the DOI to `CITATION.cff`, this README and the "how to cite" section of `teachers.html`.

## Sources

Main data source: Gómez, M., Grimes, S., Qian, Y., Feng, Y. & Fowler, G. (2023). Critical and strategic metals in mobile phones. *Journal of Cleaner Production* 419, 138099. https://doi.org/10.1016/j.jclepro.2023.138099

Other sources (USGS Mineral Commodity Summaries 2026, EU Critical Raw Materials Act, Royal Society of Chemistry, Global E-waste Monitor 2024, …) are listed on the page under "Sources & image credits".

## Image credits

Element photos are from Wikimedia Commons under CC BY, CC BY-SA, Free Art License or public domain; each is credited on the page with author, licence and a link to the original file. They have been resized and cropped.

The exploded-view phone illustration (`phone_parts_exploded_view.jpg`) was created by Peter Nockemann using Google Gemini (AI image generation).

## Licence and citation

© 2025–2026 Prof. Peter Nockemann. Text, design, code and data compilation are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); see [LICENSE](LICENSE). Element photos are third-party material and keep their own licences (listed on the page).

To cite this resource, see [CITATION.cff](CITATION.cff).
