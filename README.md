# Tierheim Tellen

The site uses plain HTML, CSS and JavaScript. Open `index.html` in a browser or serve this directory with a static web server; no build step is required.

## Content and unfinished functionality

The news and dog cards, contact field labels, helper text and choice labels are placeholders from Figma. The contact form is a visual preview: its choice circles are not interactive and submission is disabled. Define the actual fields, selection rules, validation and a secure submission service before enabling it.

Ferienpension, the desktop News item, news-card actions, Zur News-Seite, Weitere Hunde and the footer icons have no verified destinations. They are intentionally not links. The mobile News item follows the Figma prototype to the homepage.

The Figma designs show two cards on mobile and four on desktop. They also clip the dog description on mobile; this implementation follows those references. Tablet layout and breakpoints were not defined in Figma; the responsive breakpoint here is an implementation choice.

## Illustrations and assets

The `.illustration` containers in `css/styles.css` reserve the design's dimensions independently of their contents. Replace the image inside a container with an animated SVG or a Lottie player without changing the container or surrounding layout. When adding animation, provide a static fallback and respect `prefers-reduced-motion`.

Images, illustrations and icons were exported from the Figma design. Source Sans Pro font files are included locally under `assets/fonts/` with their license.
