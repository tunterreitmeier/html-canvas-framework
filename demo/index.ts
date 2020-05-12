import {Canvas} from '../src/Canvas';
import {Circle} from '../src/Shapes';

let canvas = new Canvas('canvas');

let mouseCircle = new Circle({x: 50, y: 50}, 15, {fill: 'teal'}, canvas);

let obstacles:Array<Circle> = [];
let colors = ['MidnightBlue', 'SteelBlue'];
for(let i = 0; i < 100; i++) {
  // randomize speed and location of circles
  //let r = Math.random() * 20 + 5;
  let r = 15;
  let dx = (Math.random() - 0.5) * 8;
  let dy = (Math.random() - 0.5) * 8;
  let x = Math.random() * (canvas.canvas.width - 2 * r) + r;
  let y = Math.random() * (canvas.canvas.height - 2 * r) + r;
  let color = colors[Math.floor(Math.random() * colors.length)];
  let obstacle = new Circle({x: x, y: y}, r, {stroke: color});
  let goodSpot = true;
  for (let other of obstacles) {
    if(obstacle.getDistance(other) < 0 && obstacle != other) {
      goodSpot = false;
    }
  }
  if(!goodSpot) {
    i--;
    continue;
  }
  obstacles.push(obstacle);
  obstacle.linearMove({x: dx, y: dy}, true)
  //obstacle.hasGravity = true;
  canvas.addElement(obstacle);
}

mouseCircle.stickToPointer();
//let test = new Rectangle({x: 200,y: 300}, 50, 300, 'orange');

//canvas.addElement(mouseCircle);
//canvas.addElement(test);
canvas.draw();

canvas.animate(() => {
  // this is called on every frame

  let touched = false;
  for (let obstacle of obstacles) {
    for (let other of obstacles) {
        if(other != obstacle && obstacle.getDistance(other) <= 0) {
          obstacle.collide(other);
        }
    }
    if(mouseCircle.getDistance(obstacle) <= 0) {
      touched = true;
    }
  }
  mouseCircle.style.fill = (touched) ? 'crimson' : 'teal';

});
canvas.run();
addEventListener('click', () => {
  canvas.run();
});
