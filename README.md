# divernote-draw

A Divernote extension. Write and draw straight onto a note or an issue on an
iPhone or iPad, the way Notability does, with a finger or an Apple Pencil.

- **draw** sits in the row under the input on an open note or issue. It
  brings up the draw bar; the check mark puts it away. On a note the ink
  stays in sight after that, and whenever the note is opened, and the note
  takes touches as usual (needs a phone build with resting pages).
- Pen, highlighter and eraser, four colours, undo and redo. A pencil's
  pressure sets the line's width.
- With the bar out, one finger draws and two fingers scroll.
- On a note, the ink stays with the note and scrolls with it. Each stroke is
  tied to the line it starts on, so it moves with that line when the text
  wraps differently. It is kept beside the note's text, never in it, so the
  terminal, the web app and older phone builds show the note as they always
  have. A note holds up to 60,000 characters of ink, a few hundred strokes;
  past that the bar says so.
- On an issue, the paperclip adds the sketch to the input as a picture.
  Return then sends it, with whatever is typed, to the agent.
- The input still takes typing while the bar is out.
- The bar docks on the top, left, right or bottom edge, or floats anywhere
  over the page and is dragged by its grip. Where it was put is remembered
  on the phone until it is moved again.
- Icons are Tabler Icons (MIT), from Iconify.

## Install

    divernote install git:github.com/kyleboas/divernote-draw

Needs Divernote's `registerPage` (kyleboas/divernote#843). A computer's
worker publishes the page to the phone within minutes; turn it off in
/settings and the link goes away. `page.html` is the whole extension, one
file; `mockup/index.html` is the design it came from.

Drawing reaches only as far as the note's lines and the page under them:
there is no extra paper below a short note yet.

Tests: `node --test test/codec.test.mjs`
