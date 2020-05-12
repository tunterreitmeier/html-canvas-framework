import {Canvas} from '../Canvas';
import {Drawable, Pos, Style} from './Interfaces';

interface MovingSpeed {
  x: number;
  y: number;
}
enum MoveType {
  linear, circular
}


export abstract class Shape implements Drawable {

  canvas!: Canvas;
  ctx!: CanvasRenderingContext2D;
  speed: MovingSpeed;
  circularSpeed: number = 0;
  moved: Boolean = false;
  moveType: MoveType | undefined;
  stayInBounds: Boolean = false;
  m!: number;
  hasGravity: Boolean = false;
  elasticity: number = 1;
  collidedWith: Array<Drawable>;
  style: Style;
  radians: number = 0;
  movingRadius: number = 0;
  startingPos: Pos;

  readonly physG:number = 9.81;
  readonly physGF:number = 2000;

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
    // get value and not reference
    this.startingPos = JSON.parse(JSON.stringify(pos));;
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
  circularMove(speed: number, movingRadius: number, startingRadians: number) {
    this.radians = startingRadians;
    this.circularSpeed = speed;
    this.moved = true;
    this.moveType = MoveType.circular;
    this.movingRadius = movingRadius;
  }
  keyboardMove(speed: MovingSpeed, callback?: Function) {
    this.speed = speed;
    window.addEventListener('keydown', (ev) => {
      let cb:Boolean = false;
      switch (ev.which) {
        case 87: // w
          this.pos.y -= this.speed.y;
          cb = true;
          break;
        case 83: // s
          this.pos.y += this.speed.y;
          cb = true;
          break;
        case 65: // a
          this.pos.x -= this.speed.x;
          cb = true;
          break;
        case 68: // d
          this.pos.x += this.speed.x;
          cb = true;
          break;
      }
      if(cb && callback) {
        callback();
      }
    });
  }
  move():void {
    this.gravity();
    switch (this.moveType) {
      case MoveType.linear:
        this.stayInBnds();
        this.pos.x += this.speed.x;
        this.pos.y -= this.speed.y;
        break;
      case MoveType.circular:
        this.radians += this.circularSpeed;
        this.pos.x = this.startingPos.x + Math.cos(this.radians) * this.movingRadius;
        this.pos.y = this.startingPos.y + Math.sin(this.radians) * this.movingRadius;
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
