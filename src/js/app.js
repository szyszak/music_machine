import 'regenerator-runtime/runtime';
import Tone from 'tone';
import generateGrid from './generateGrid';

// set duration
Tone.Transport.bpm.value = 120;

// create polisynth
const poliSynth = new Tone.PolySynth(16, Tone.Synth);

// connect to output
poliSynth.toMaster();

const app = document.querySelector('.app');

const grid = generateGrid();

grid.forEach(tile => app.appendChild(tile));

const chords = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

// sequence
const sequence = new Tone.Sequence(
  (time, pos) => {
    poliSynth.triggerAttackRelease(chords[pos], '16n', '+0.1');

    Tone.Draw.schedule(() => {
      grid.forEach(tile => {
        if (tile.dataset.pos === String(pos) && tile.classList.contains('active')) {
          tile.classList.add('blink');

          setTimeout(() => tile.classList.remove('blink'), 200);
        }
      });
    }, time);
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
    chords[pos].push(pitch);
  }
};

// can't start web audio context without user interaction
app.addEventListener('click', startPlayback, { once: true });

grid.forEach(tile => {
  tile.addEventListener('mousedown', toggleSound);
});
