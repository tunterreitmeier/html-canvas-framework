import {Canvas} from '../src/Canvas';
import {Circle,Rectangle} from '../src/Shapes';

let canvas = new Canvas('canvas');

let bouncer = new Rectangle({x: canvas.canvas.width / 2 - 100, y: canvas.canvas.height - 100}, 200, 30, {fill:'teal'}, canvas);
bouncer.stickToPointer('x');
let ball = new Circle({x: canvas.canvas.width / 2 - 100, y: canvas.canvas.height - 130}, 15, {fill: 'crimson'}, canvas);

canvas.animate(() => {

});
canvas.run();

window.addEventListener('click', () => {
  ball.linearMove({x: 0, y: 2}, true);
}, {once : true});
