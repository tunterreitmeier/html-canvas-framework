import {Canvas} from './Canvas';

export interface Drawable {
  canvas: Canvas;
  ctx: CanvasRenderingContext2D;
  moved: Boolean;
  draw():void;
  moveAndDraw():void;
}

export interface Pos {
  x: number,
  y: number,
}
