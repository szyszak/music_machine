// cos sie zdaje byc nie tak z ta skala, trza jeszcze raz posluchac
const pitches = [
  'a5',
  'f#5',
  'e5',
  'd5',
  'b4',
  'a4',
  'f#4',
  'e4',
  'd4',
  'b3',
  'a3',
  'f#3',
  'e3',
  'd3',
  'b2',
  'a2',
];

const generateGrid = () => {
  const tiles = [];

  for (let i = 0; i < pitches.length; i++) {
    for (let j = 0; j <= 15; j++) {
      const tile = document.createElement('div');

      tile.className = 'tile';
      tile.dataset.pitch = pitches[i];
      tile.dataset.pos = j;

      tiles.push(tile);
    }
  }

  return tiles;
};

export default generateGrid;
