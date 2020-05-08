import {Shape} from './Shape';
import {Pos} from './Interfaces';
import {Canvas} from './Canvas';

export class Circle extends Shape {
  constructor(pos: Pos, public r: number, color?: string, canvas?: Canvas) {
    super(pos, color, canvas);
    this.r = r;
    this.m = 2 * Math.PI * r;
  }
  draw():void {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
    this.ctx.strokeStyle = this.color || 'black';
    this.ctx.stroke();
    //this.ctx.fill();
  }
  getDistance(other: Circle):number {
    return Math.sqrt(
      Math.pow(this.pos.x - other.pos.x, 2) +
      Math.pow(this.pos.y - other.pos.y, 2)
    ) - (this.r + other.r);
  }
  stayInBnds():void {
    if(this.pos.x + this.r > this.canvas.canvas.width ||
      this.pos.x - this.r < 0) {
      this.speed.x *= -1;
    }
    if(this.pos.y + this.r > this.canvas.canvas.height ||
      this.pos.y - this.r < 0) {
      this.speed.y *= -1;
    }
  }

  /*
   *
   */
  collide(other: Circle):void {
    let temp = {
      x: this.speed.x,
      y: this.speed.y
    }
    this.speed.x = (this.speed.x * (this.m - other.m) + (2 * other.m * other.speed.x)) / (this.m + other.m);
    this.speed.y = (this.speed.y * (this.m - other.m) + (2 * other.m * other.speed.y)) / (this.m + other.m);
    other.speed.x = temp.x;
    other.speed.y = temp.y
  }
}

export class Rectangle extends Shape {
  constructor(public pos: Pos, public width: number, public height: number, public color?: string, canvas?: Canvas) {
    super(pos, color, canvas);
    this.m = width * height;
  }
  draw():void {
    this.ctx.fillStyle = this.color || 'black';
    this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
  stayInBnds():void {
    // todo
  }
}
