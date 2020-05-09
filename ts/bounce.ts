import {Canvas} from './includes/Canvas';
import {Circle,Rectangle} from './includes/Shapes';
import {MathG} from './includes/MathG';


let canvas = new Canvas('canvas');
let x = canvas.canvas.width / 2;
let y = canvas.canvas.height;

let bouncer = new Rectangle({x: canvas.canvas.width / 2 - 100, y: canvas.canvas.height - 100}, 200, 30, 'teal', canvas);
bouncer.stickToPointer('x');
let ball = new Circle({x: canvas.canvas.width / 2 - 100, y: canvas.canvas.height - 130}, 15, 'crimson', canvas);

canvas.animate(() => {

});
canvas.run();

window.addEventListener('click', () => {
  ball.linearMove({x: 0, y: 2}, true);
}, {once : true});

let obstacles = [];
