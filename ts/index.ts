import {Canvas} from './includes/Canvas';
import {Circle,Rectangle} from './includes/Shapes';


let canvas = new Canvas('canvas');
let center = {
  x: canvas.canvas.width / 2,
  y: canvas.canvas.height / 2
}
let mouseCircle = new Circle({x: 50, y: 50}, 50, 'teal', canvas);
let obstacleCircle = new Circle({x: center.x, y: center.y}, 50);
obstacleCircle.linearMove({direction: 120, speed: 5}, true)
let test = new Rectangle({x: 200,y: 300}, 50, 300, 'orange');

//canvas.addElement(mouseCircle);
canvas.addElement(obstacleCircle);
canvas.addElement(test);
//canvas.draw();

canvas.animate(() => {
  // this is called on every frame
  if(mouseCircle.getDistance(obstacleCircle) <= 0) {
    mouseCircle.color = 'crimson';
  } else mouseCircle.color = 'teal';
});

addEventListener('mousemove', (el) => {
  if(mouseCircle) {
    mouseCircle.pos.x = el.clientX;
    mouseCircle.pos.y = el.clientY;
  }
});
addEventListener('click', () => {
  test.removeFromCanvas(canvas);
  //canvas.removeElement(test);
});
