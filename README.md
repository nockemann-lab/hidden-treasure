# Hidden Treasure in Your Pocket

An interactive educational resource about the critical and strategic elements inside a smartphone, for classrooms (ages 11–16), outreach events and self-guided learning.
Take a 3D phone apart, tap one of its six parts (display, camera, circuit board, speaker, battery, casing) to see which elements it contains, then tap an element for a photo, what it does, a fun fact, where it comes from and whether it is on the EU, US or UK critical list.

It is a static website with no build step. Open `index.html` in a browser, or serve the folder with any static host (e.g. GitHub Pages).

## Pages

- `index.html`: the interactive phone (start here): 3D model or exploded-view photo, element cards with previous/next navigation (buttons, swipe, arrow keys), exploration progress, an "Element of the day", a periodic-table pop-up, the drawer challenge and "What can YOU do?"
- Recycling game "Urban Mine: Repair Rush" (`game.js`): opens as a pop-up from the main page; a 2½-minute real-time game in which phones ride a conveyor belt and players repair (buying spare parts), sell or recycle them, keep swollen batteries safe and put out fires. Three difficulty levels, streak bonus, daily challenge, tutorial hints, synthesised sound and music, keyboard controls; the end screen links back to an element card
- `quiz.html`: a scored multiple-choice quiz with a printable certificate (10 random questions per round; `quiz.html?n=all` asks all of them, `?n=5` five)
- `teachers.html`: teacher guide: how the resource and the game work, learning objectives, background, UK curriculum links, lesson plan, discussion questions, extension tasks, exhibition and offline use, privacy, troubleshooting, printable worksheet and quiz answer key

## Features

- **Exhibition mode:** add `?kiosk` to the address (e.g. `index.html?kiosk`). The display resets itself after 90 s without interaction (`?kiosk=120` for 120 s), external links are disabled and the teacher guide / certificate are hidden.
- **Installable and offline:** when served over http(s), the site can be installed as an app and works offline after the first visit (`manifest.webmanifest`, `sw.js`).
- **Dark mode:** follows the device setting; the 🌙/☀️ button switches manually (remembered per device).
- **Languages:** all text of the interactive phone and the quiz is in `content/<language>.js`. See `content/languages.js` for how to add a language; a language menu appears automatically when there is more than one.
- **Accessibility:** keyboard and screen-reader support, WCAG AA colour contrast in light and dark mode, reduced motion when requested.
- **Privacy:** no accounts, cookies, analytics or third-party requests. Only a few settings and best scores are kept in the browser's local storage on the device. The one exception is the optional teacher survey at the end of `teachers.html` (below): it is embedded from Microsoft Forms, which loads from Microsoft and uses its own cookies, and it sends the answers a teacher submits.
- **Teacher feedback survey:** an anonymous survey at the end of `teachers.html` (see "Feedback survey" below and `FEEDBACK-SURVEY.md`).

## Files

| File | What it contains |
|---|---|
| `content/en.js` | All English text: interface, element names, the six phone parts (element texts, statistics, facts) and the quiz questions (first option = correct answer) |
| `content/languages.js` | List of available languages |
| `index.html` | Main page; element data (type, critical-list status, photo credits) and the hotspot outlines |
| `game.js` | The recycling game (canvas, Web Audio); its text is in `content/en.js` (`game.*` keys) |
| `quiz.html`, `teachers.html` | Quiz (with certificate) and teacher guide; the guide's answer key is built from the quiz questions |
| `site.css`, `site.js` | Shared colours/themes, theme toggle, language loading, exhibition mode, offline support |
| `sw.js` | Offline cache. **Increase `VERSION` whenever you change a file**, and add new files (e.g. a new language) to `FILES` |
| `src/phone3d.js`, `phone3d.min.js` | 3D phone model (source and bundled version; see "3D model") |
| `package.json` | Build tooling for the 3D bundle only (three.js, esbuild) |
| `og-image.jpg` | Preview image for links shared on social media / messaging apps |
| `icons/` | App icons |

## 3D model

The main page starts with an interactive 3D model (take apart / put together, turn it, tap a part); the "Photo" button switches to the exploded-view photo. A visitor's choice is remembered on their device. It is built with three.js; the source is `src/phone3d.js` and the page loads the bundled file `phone3d.min.js`. The website itself needs no build step; only after editing `src/phone3d.js`, rebuild the bundle:

```
npm install
npm run build:3d
```

The "Photo" button switches back to the photo with clickable outlines. On devices that cannot display 3D graphics, only the photo is offered.

## Hotspots

The clickable areas are SVG polygons traced over `phone_parts_exploded_view.jpg`, using the image's original 1696×2528 pixel grid as the `viewBox`. If the image is replaced, the polygon `points` need re-tracing.

## Feedback survey

`teachers.html` contains an anonymous survey for teachers (section 14), designed so that the results can be used in an education research paper. The questions, the data they produce and the ethics and GDPR checklist are in [FEEDBACK-SURVEY.md](FEEDBACK-SURVEY.md).

The survey runs in **Microsoft Forms** through the University's Microsoft 365 and is embedded in section 14, with a button to open it in a new tab and a QR code (`survey-qr.png`) for phones and tablets. `survey/Teacher-survey-for-Microsoft-Forms.docx` contains all the questions. The `FEEDBACK` settings near the bottom of `teachers.html` fill in the information for participants:

- `contactEmail`: the contact address shown to participants
- `ethicsCommittee`, `ethicsRef`: once research ethics approval is in place
- `retention`: how long the responses are kept (empty = the University's policy)

After changing them, increase `VERSION` in `sw.js`.

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
