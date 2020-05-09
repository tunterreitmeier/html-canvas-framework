import {Canvas} from './Canvas';
import {Drawable, Pos, Style} from './Interfaces';

interface MovingSpeed {
  x: number;
  y: number;
}
enum MoveType {
  linear
}


export abstract class Shape implements Drawable {

  canvas: Canvas;
  ctx: CanvasRenderingContext2D;
  speed: MovingSpeed;
  moved: Boolean;
  moveType: MoveType;
  stayInBounds: Boolean;
  m: number;
  hasGravity: Boolean;
  elasticity: number;
  collidedWith: Array<Drawable>;
  style: Style;

  readonly physG = 9.81;
  readonly physGF = 2000;

  constructor(public pos: Pos, style?: Style, canvas?: Canvas) {
    if(!style) {
      this.style = {stroke: 'black', fill: undefined};
    } else {
      if (!style.hasOwnProperty('fill')) {
        this.style = {fill: undefined, stroke: style.stroke};
      }
      else if (!style.hasOwnProperty('stroke')) {
        this.style = {fill: style.fill, stroke: undefined};
      } else {
        this.style = {fill: style.fill, stroke: style.stroke};
      }
    }
    this.speed = {x: 0, y: 0};
    this.collidedWith = [];
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

  linearMove(speed: MovingSpeed, stayInBounds: Boolean = false) {
    this.speed = speed;
    this.moved = true;
    this.moveType = MoveType.linear;
    this.stayInBounds = stayInBounds;
  }
  move():void {
    this.gravity();
    switch (this.moveType) {
      case MoveType.linear:
        this.stayInBnds();
        this.pos.x += this.speed.x;
        this.pos.y -= this.speed.y;
        break;
    }
    this.collidedWith = [];
  }
  moveAndDraw():void {
    this.move();
    this.draw();
  }

  /**
   * Binds this element to the cursor
   * @param axis can be either x, y, or both
   */
  stickToPointer(axis: string = 'both'): void {
    window.addEventListener('mousemove', (cursor) => {
      if(axis == 'x' || axis == 'both') {
        this.pos.x = cursor.clientX;
      }
      if(axis == 'y' || axis == 'both'){
        this.pos.y = cursor.clientY;
      }
    });
  }

  addGravity(elasticity?: number):void {
    this.hasGravity = true;
    this.elasticity = elasticity || 1;
  }

  gravity():void {
    if(this.hasGravity) {
      this.speed.y -= this.m * this.physG / this.physGF;
    }
  }

}
