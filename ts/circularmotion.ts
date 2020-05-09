import {Canvas} from './includes/Canvas';
import {Circle} from './includes/Shapes';

const canvas = new Canvas('canvas');
canvas.clearOpacity = 0.15;

let colors = ['rgba(69, 170, 242, 0.9 )', 'rgba(75, 101, 132, 0.9)', ];
let circles:Array<Circle> = [];
for(let i = 0; i < 400; i++) {
  let color = colors[Math.floor(Math.random() * colors.length)];
  let circle = new Circle({x: canvas.canvas.width / 2, y: canvas.canvas.height / 2}, 2, {fill: color}, canvas);
  circle.circularMove(Math.random() * 0.02 + 0.05, Math.random() * 30 + 100, Math.PI * 2 * Math.random());
  circles.push(circle);
}
canvas.animate(() => {
});
canvas.run();

window.addEventListener('mousemove', (pointer) => {
  for (let circle of circles) {
    circle.startingPos.x = pointer.clientX;
    circle.startingPos.y = pointer.clientY;
  }
});
