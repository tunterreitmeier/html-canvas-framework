import {Canvas} from '../src/Canvas';
import {Circle,Rectangle} from '../src/Shapes';
import {MathG} from '../src/includes/MathG';


let canvas = new Canvas('canvas');
let x = canvas.canvas.width / 2;
let y = canvas.canvas.height;
let cannon = new Rectangle({x: x, y: y}, 10, 10, {fill: 'black'}, canvas);
canvas.addElement(cannon);

canvas.animate(() => {

});
canvas.run();

let bullets = [];

addEventListener('click', (e) => {
  //console.log(e);


  let bullet = new Circle({x: x, y: y}, 3, {fill: '#333'}, canvas);

  // tan(a) = b / a
  let b  = y - e.clientY;
  let a = e.clientX - x;
  let angle;
  if(a > 0) {
    angle = MathG.atanD(b / a);
  } else {
    angle = MathG.atanD(b / a);
  }
  let force = Math.abs(MathG.sinD(angle)) * 20;
  let side = MathG.cosD(angle);
  bullet.linearMove({x: side, y: force})
  console.log(force, side);

  bullet.hasGravity = true;
  //bullet.linearMove({});

})
