# Tierheim Tellen

The site uses plain HTML, CSS and JavaScript. Open `index.html` in a browser or serve this directory with a static web server; no build step is required.

## Content and unfinished functionality

The news stories and dog profiles are fictional demo content, not information about actual shelter animals or events. The dog photographs are illustrative examples for these fictional profiles. The contact field labels, helper text and choice labels are placeholders from Figma. The contact form is a visual preview: its choice circles are not interactive and submission is disabled. Define the actual fields, selection rules, validation and a secure submission service before enabling it.

Ferienpension, the desktop News item, news-card actions, Zur News-Seite, Weitere Hunde and the footer icons have no verified destinations. They are intentionally not links. The mobile News item follows the Figma prototype to the homepage.

The Figma designs show two cards on mobile and four on desktop. They also clip the dog description on mobile; this implementation follows those references. Tablet layout and breakpoints were not defined in Figma; the responsive breakpoint here is an implementation choice.

## Illustrations and assets

The `.illustration` containers in `css/styles.css` reserve the design's dimensions independently of their contents. The newspaper, dog head and telephone use the SVG animations in `assets/animations/`; they start when visible and pause off-screen. The heart in the navigation plays once on hover or focus and resets on leaving. Static artwork remains as a fallback and is used when reduced motion is enabled. Serve the site with Live Server or another local HTTP server so the SVG timelines can be controlled.

Images, illustrations and icons were exported from the Figma design. Source Sans Pro font files are included locally under `assets/fonts/` with their license.
