import {Canvas} from '../src/Canvas';
import {SinWave} from '../src/Shapes';
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
