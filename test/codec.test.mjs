// The ink codec lives in page.html, which must stay one self-contained file;
// these tests run that part of it as it is.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const page = await readFile(new URL('../page.html', import.meta.url), 'utf8');
const codec = page.slice(page.indexOf('// codec:start'), page.indexOf('// codec:end'));
const context = vm.createContext({});
vm.runInContext(`${codec}\nthis.api = { encodeInk, decodeInk, thin };`, context);
const { encodeInk, decodeInk, thin } = context.api;
const plain = value => JSON.parse(JSON.stringify(value));

test('ink comes back as it was drawn, rounded to the pixel', () => {
  const strokes = [
    { colour: 1, highlight: false, width: 2.5, line: 3, points: [[10.4, -3], [12, 0], [40, 6], [41, 7]] },
    { colour: 2, highlight: true, width: 16, line: 0, points: [[5, 200]] },
  ];
  assert.deepEqual(plain(decodeInk(encodeInk(strokes))), [
    { colour: 1, highlight: false, width: 2.5, line: 3, points: [[10, -3], [12, 0], [40, 6], [41, 7]] },
    { colour: 2, highlight: true, width: 16, line: 0, points: [[5, 200]] },
  ]);
  assert.equal(encodeInk([]), '');
  assert.deepEqual(plain(decodeInk('')), []);
});

test('a long jump is split into steps the encoding can hold, and still ends where it ended', () => {
  const [stroke] = decodeInk(encodeInk([{ colour: 0, highlight: false, width: 2.5, line: 0, points: [[0, 0], [0, 9000]] }]));
  assert.deepEqual(plain(stroke.points.at(-1)), [0, 9000]);
  assert.ok(stroke.points.length > 2);
});

test('broken ink is refused rather than drawn wrong', () => {
  assert.throws(() => decodeInk('{"v":2,"s":[]}'), /Bad ink/);
  assert.throws(() => decodeInk('{"v":1,"s":["9pAAAAAAAAAAA"]}'), /Bad ink/);
  assert.throws(() => decodeInk('{"v":1,"s":["0pAAAAAAAAAAAAA"]}'), /Bad ink/);
});

test('a straight run keeps few points, and a stroke stays compact', () => {
  const points = Array.from({ length: 200 }, (_, i) => [i * 0.5, 0]);
  const kept = thin(points);
  assert.ok(kept.length < 60);
  assert.deepEqual(plain(kept.at(-1)), [99.5, 0]);
  // A hundred-point stroke costs about four characters a point.
  const stroke = { colour: 0, highlight: false, width: 2.5, line: 0, points: Array.from({ length: 100 }, (_, i) => [i * 3, Math.sin(i) * 20]) };
  assert.ok(encodeInk([stroke]).length < 450);
});
