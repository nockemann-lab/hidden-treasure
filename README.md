# Hidden Treasure in Your Pocket

An interactive science-festival display about the critical and strategic elements inside a smartphone.
Tap a layer of the exploded phone (screen, camera, speaker, circuit board, battery, casing) to see which elements it contains, then tap an element for a photo and short explanation.

It is a single static page (`index.html`) with no build step. Open it in a browser or serve the folder with any static host (e.g. GitHub Pages).

## Hotspots

The clickable areas are SVG polygons traced over `phone-exploded-white.jpg`, using the photo's original 1696×2528 pixel grid as the `viewBox`. If the photo is replaced, the polygon `points` need re-tracing.

## Editing the content

All layer and element text, statistics and photo credits live in the `ELEMENTS` and `LAYERS` objects at the top of the script in `index.html`. The info cards and the credits list are built from that data.

## Sources

Main data source: Gómez, M., Grimes, S., Qian, Y., Feng, Y. & Fowler, G. (2023). Critical and strategic metals in mobile phones. *Journal of Cleaner Production* 419, 138099. https://doi.org/10.1016/j.jclepro.2023.138099

Other sources (USGS Mineral Commodity Summaries 2026, EU Critical Raw Materials Act, Royal Society of Chemistry, Global E-waste Monitor 2024, …) are listed on the page under "Sources & image credits".

## Image credits

Element photos are from Wikimedia Commons under CC BY, CC BY-SA, Free Art License or public domain; each is credited on the page with author, licence and a link to the original file. They have been resized and cropped.

The exploded-view phone illustration (`phone-exploded-white.jpg`) was created by Peter Nockemann using Google Gemini (AI image generation).

## Licence and citation

© 2025–2026 Prof. Peter Nockemann. Text, design, code and data compilation are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); see [LICENSE](LICENSE). Element photos are third-party material and keep their own licences (listed on the page).

To cite this resource, see [CITATION.cff](CITATION.cff).
