import {Canvas} from './includes/Canvas';
import {SinWave} from './includes/Shapes';
import * as dat from "dat.gui";

const gui = new dat.GUI();
const canvas = new Canvas('canvas');

const wave = new SinWave(100, 0.01,
  { x: 0,y: canvas.canvas.height / 2},
  {stroke: '#333'}
);
wave.animate(1);


gui.add(wave, 'amp', -200, 200);
gui.add(wave, 'length', 0, 0.1);
gui.add(wave, 'frequency', 0, 1);
gui.add(wave.pos, 'y', 0, canvas.canvas.height);
gui.add(wave.pos, 'x', 0, canvas.canvas.width);
gui.addColor(wave.style, 'stroke');


wave.addToCanvas(canvas);
canvas.animate(() => {

});
canvas.run();

/*var real = new Float32Array(2);
var imag = new Float32Array(2);
var ac = new AudioContext();
var osc = ac.createOscillator();


real[0] = 0;
imag[0] = 0;
real[1] = 1 ;
imag[1] = 0;

var context = new AudioContext();
var o = context.createOscillator();
var  g = context.createGain();
o.connect(g);
g.connect(context.destination);

o.start(0);

window.addEventListener('click', () => {
  context.resume();
  o.frequency.value = wave.frequency * 100;
});
*/
