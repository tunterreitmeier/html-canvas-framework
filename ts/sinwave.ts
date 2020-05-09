import {Canvas} from './includes/Canvas';
import {SinWave} from './includes/Shapes';

let canvas = new Canvas('canvas');
let wave = new SinWave(100, 50, {x: 0,y: 0}, {stroke: 'red'});
wave.addToCanvas(canvas);
canvas.animate(() => {

});
canvas.run();
