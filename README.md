# divernote-draw

A Divernote extension. Write and draw straight onto a note or an issue on an
iPhone or iPad, the way Notability does, with a finger or an Apple Pencil.

- **✏ draw** sits in the row under the input on an open note or issue. It
  brings up the draw bar; the check mark puts it away.
- Pen, highlighter and eraser, four colours, undo and redo. A pencil's
  pressure sets the line's width.
- With the bar out, one finger draws and two fingers scroll. Writing near
  the bottom adds more page.
- On a note, the ink stays with the note, over and between its lines, and
  scrolls with them. It is kept beside the note's text, never in it, so the
  terminal, the web app and older phone builds show the note as they always
  have.
- On an issue, Return sends what is typed and what is drawn to the agent as
  one message. The sketch goes as an image.
- The input still takes typing while the bar is out.
- The bar docks on the top, left, right or bottom edge, or floats anywhere
  over the page and is dragged by its grip. Where it was put is remembered
  until it is moved again.
- Icons are Tabler Icons (MIT), from Iconify.

## Status

Design only. `mockup/index.html` is the design: it opens in the Divernote
app's mockup viewer, and in any browser at phone size.

Divernote's extensions run on the computer today, and nothing an extension
holds reaches the phone. This one needs a hook in Divernote first: an
extension page the phone runs in a sandboxed frame, with no network and no
vault keys, that can add a link under the input, place its bar, take touches
while it is out, follow the page's scrolling, keep its own data with a note
in the vault, and attach an image to an issue reply. Until then there is no
`index.mjs` to install.
