import 'regenerator-runtime/runtime';
import Tone from 'tone';
import generateGrid from './generateGrid';

// set duration
Tone.Transport.bpm.value = 60;

// connect to output
const poliSynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

const app = document.querySelector('.app');

const grid = generateGrid();

grid.forEach(tile => app.appendChild(tile));

const chords = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

// sequence
const sequence = new Tone.Sequence(
  (time, idx) => {
    poliSynth.triggerAttackRelease(chords[idx], '16n');
  },
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  '16n',
);

const startPlayback = () => {
  Tone.Transport.start();
  sequence.start(0);
};

const toggleSound = ev => {
  const { pitch, pos } = ev.target.dataset;

  if (chords[pos].includes(pitch)) {
    ev.target.classList.remove('active');
    chords[pos] = chords[pos].filter(item => item !== pitch);
  } else {
    ev.target.classList.add('active');
    ev.target.classList.add('blink');
    chords[pos].push(pitch);
  }
};

app.addEventListener('click', startPlayback, { once: true });

grid.forEach(tile => {
  tile.addEventListener('click', toggleSound);
});
