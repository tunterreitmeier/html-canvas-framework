import {Shape} from './Shape';
import {Pos} from './Interfaces';
import {Canvas} from './Canvas';

export class Circle extends Shape {
  constructor(pos: Pos, public r: number, color?: string, canvas?: Canvas) {
    super(pos, color, canvas);
    this.r = r;
  }
  draw():void {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
  getDistance(other: Circle):number {
    return Math.sqrt(
      Math.pow(this.pos.x - other.pos.x, 2) + Math.pow(this.pos.y - other.pos.y, 2)
    ) - (this.r + other.r);
  }
  stayInBnds():void {
    if(this.pos.x < 0 || this.pos.x > this.canvas.canvas.width) {
      this.vector.direction = 180 - this.vector.direction;
    }
  }
}

export class Rectangle extends Shape {
  constructor(public pos: Pos, public width: number, public height: number, public color?: string, canvas?: Canvas) {
    super(pos, color, canvas);
  }
  draw():void {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
  stayInBnds():void {
    // todo
  }
}
