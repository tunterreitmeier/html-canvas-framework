import {Canvas, Drawable} from './Canvas';
import {Pos} from './Interfaces';
import {MathG} from './MathG';

interface LinearMovingVector {
  direction: number; // between 0 and 360
  speed: number;
}
enum MoveType {
  linear
}

export abstract class Shape implements Drawable {
  canvas: Canvas;
  ctx: CanvasRenderingContext2D;
  vector: LinearMovingVector;
  moved: Boolean;
  moveType: MoveType;
  stayInBounds: Boolean;
  constructor(public pos: Pos, public color?: string, canvas?: Canvas) {
    this.color = color || 'black';
    if(canvas) {
      canvas.addElement(this);
    }
  }
  abstract draw():void;
  abstract stayInBnds():void;

  addToCanvas(canvas: Canvas): void {
    canvas.addElement(this);
  }
  removeFromCanvas(canvas: Canvas): void {
    canvas.removeElement(this);
  }
  linearMove(vector: LinearMovingVector, stayInBounds: Boolean = false) {
    this.vector = vector;
    this.moved = true;
    this.moveType = MoveType.linear;
    this.stayInBounds = stayInBounds;
  }
  move():void {
    switch (this.moveType) {
      case MoveType.linear:
        this.stayInBnds();
        this.pos.x += MathG.sinD(this.vector.direction) * this.vector.speed;
        this.pos.y -= MathG.cosD(this.vector.direction) * this.vector.speed;
        break;
    }
  }
  moveAndDraw():void {
    this.move();
    this.draw();
  }
}
