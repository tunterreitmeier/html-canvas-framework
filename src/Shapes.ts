import {Shape} from './includes/Shape';
import {Pos, Style} from './includes/Interfaces';
import {Canvas} from './Canvas';

export class Circle extends Shape {
  constructor(pos: Pos, public r: number, style?: Style, canvas?: Canvas) {
    super(pos, style, canvas);
    this.r = r;
    this.m = 2 * Math.PI * r;
  }
  draw():void {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
    if(this.style.stroke) {
        this.ctx.strokeStyle = this.style.stroke;
        this.ctx.stroke();
    }
    if(this.style.fill) {
        this.ctx.fillStyle = this.style.fill;
        this.ctx.fill();
    }
    //this.drawStyles();
  }
  getDistance(other: Circle):number {
    return Math.sqrt(
      Math.pow(this.pos.x - other.pos.x, 2) +
      Math.pow(this.pos.y - other.pos.y, 2)
    ) - (this.r + other.r );
    //- this.speed.x / other.speed.x - this.speed.y / other.speed.y;
  }
  getDistanceRectangle(other: Rectangle):number {
    return 0;
  }
  stayInBnds():void {
    if(this.pos.x + this.r + this.speed.x > this.canvas.canvas.width && this.speed.x > 0)  {
      this.speed.x *= -1;
    }
    else if(this.pos.x - this.r < 0 && this.speed.x < 0) {
      this.speed.x *= -1;
    }
    if(this.pos.y + this.r + this.speed.y > this.canvas.canvas.height && this.speed.y < 0) {
      this.speed.y *= -1;
      if(this.hasGravity) {
        this.speed.y *= this.elasticity;
      }
    } else if(this.pos.y - this.r - this.speed.y < 0 &&  this.speed.y > 0) {
      this.speed.y *= -1;
    }
  }

  /**
   *
   */
  collide(other: Circle):void {
    if(other.collidedWith.indexOf(this) != -1 || other == this) {
      return;
    }
    let temp = {
      x: this.speed.x,
      y: this.speed.y
    }
    this.speed.x = (this.speed.x * (this.m - other.m) + (2 * other.m * other.speed.x)) / (this.m + other.m);
    this.speed.y = (this.speed.y * (this.m - other.m) + (2 * other.m * other.speed.y)) / (this.m + other.m);
    other.speed.x = temp.x;
    other.speed.y = temp.y
    this.collidedWith.push(other);
  }
}

export class Rectangle extends Shape {
  constructor(public pos: Pos, public width: number, public height: number, style?: Style, canvas?: Canvas) {
    super(pos, style, canvas);
    this.m = width * height;
  }
  draw():void {
    if(this.style.stroke) {
      this.ctx.strokeStyle = this.style.stroke;
      this.ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    if(this.style.fill) {
      this.ctx.fillStyle = this.style.fill;
      this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

  }
  stayInBnds():void {
    // todo
  }
}

export class SinWave extends Shape {

  offset: number;
  frequency: number;

  constructor(public amp: number, public length: number, pos: Pos, style?: Style) {
    super(pos, style);
    this.offset = 0;
    this.frequency = 0;
  }

  move(): void {
    this.offset += this.frequency;
  }
  animate(frequency: number) {
    this.frequency = frequency;
    this.moved = true;
  }

  draw():void {
    this.ctx.beginPath();
    if(this.style.stroke) {
      this.ctx.strokeStyle = this.style.stroke;
    }
    for(let i = this.pos.x; i < this.canvas.canvas.width; i++) {
      let point = (this.pos.y) + Math.sin((i * this.length) + this.offset) * this.amp;
      this.ctx.lineTo(i, point);
    }
    this.ctx.stroke();
  }

  stayInBnds():void {}
}
