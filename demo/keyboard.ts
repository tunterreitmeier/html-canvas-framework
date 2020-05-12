import {Canvas} from '../src/Canvas';
import {Rectangle} from '../src/Shapes';

const canvas = new Canvas('canvas');
const rectangle = new Rectangle({x: canvas.canvas.width / 2, y : canvas.canvas.height / 2}, 20, 20, {stroke: '#333'}, canvas);
rectangle.keyboardMove({x: 20, y: 20});
canvas.animate(() => {

});
canvas.run();
