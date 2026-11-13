// divernote-draw: write and draw on a note on the phone. The page
// (page.html) does it all; Divernote publishes it to the phone and opens it
// over the note from the "draw" link under the input.
export default function draw(divernote) {
  divernote.registerPage('page.html', { label: 'draw', on: ['note'] });
}
