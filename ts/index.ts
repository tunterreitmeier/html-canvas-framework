import {Canvas} from './includes/Canvas';
import {Circle,Rectangle} from './includes/Shapes';


let canvas = new Canvas('canvas');
let center = {
  x: canvas.canvas.width / 2,
  y: canvas.canvas.height / 2
}

let mouseCircle = new Circle({x: 50, y: 50}, 50, 'teal', canvas);

let obstacles:Array<Circle> = [];
for(let i = 0; i < 10; i++) {
  let dx = (Math.random() - 0.5) * 8;
  let dy = (Math.random() - 0.5) * 8;
  let obstacle = new Circle({x: center.x, y: center.y}, 50);
  obstacles.push(obstacle);
  obstacle.linearMove({x: dx, y: dy}, true)
  canvas.addElement(obstacle);
}

mouseCircle.stickToPointer();
let test = new Rectangle({x: 200,y: 300}, 50, 300, 'orange');

//canvas.addElement(mouseCircle);
canvas.addElement(test);
//canvas.draw();

canvas.animate(() => {
  // this is called on every frame

  let touched = false;
  for (let obstacle of obstacles) {
    if(mouseCircle.getDistance(obstacle) <= 0) {
      touched = true;
    }
  }
  mouseCircle.color = (touched) ? 'crimson' : 'teal';

});
addEventListener('click', () => {
  test.removeFromCanvas(canvas);
  //canvas.removeElement(test);
});
