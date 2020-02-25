import 'regenerator-runtime/runtime';
import Tone from 'tone';
import generateGrid from './generateGrid';

// set duration
// 120 = 1s, 60 = 2s
Tone.Transport.bpm.value = 60;

// connect to output
const poliSynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
const app = document.querySelector('.app');
let isPlaying = false;

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

grid.forEach(tile => {
  tile.addEventListener('click', ev => {
    if (!isPlaying) {
      startPlayback();
      isPlaying = true;
    }
    console.log(chords);
    ev.target.classList.toggle('active');
    const { pitch, pos } = ev.target.dataset;
    console.log({ pitch, pos });
    chords[pos].push(pitch);
  });
});
