import {Drawable} from './Interfaces';

interface CanvasOptions {
  automaticResize?: Boolean;
}
export enum AnimationStatus {
  pause,
  play
}

export class Canvas {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  elements: Array<Drawable>;
  automaticResize: Boolean;
  animStatus: AnimationStatus;
  clearOpacity: number;

  constructor(selector: string, options?: CanvasOptions) {
    this.canvas = document.querySelector(selector) || new HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') || new CanvasRenderingContext2D;
    this.elements = [];
    this.automaticResize = options?.automaticResize || false;
    if(this.automaticResize) {
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }
  resize(width?: number, height?: number):void {
    this.canvas.width = width || window.innerWidth;
    this.canvas.height = height|| window.innerHeight;
  }
  draw():void {
    for (let element of this.elements) {
      if(element.moved) {
        element.moveAndDraw();
      } else {
        element.draw();
      }
    }
  }
  addElement(el: Drawable):void {
    this.elements.push(el);
    el.ctx = this.ctx;
    el.canvas = this;
  }
  removeElement(el: Drawable): void {
    let at =  this.elements.indexOf(el);
    if(at >= 0) this.elements.splice(at, 1);
  }

  run():void {
    this.animStatus = AnimationStatus.play;
  }
  stop():void {
    this.animStatus = AnimationStatus.pause;
  }
  animate(call?: Function):void {
    if(this.animStatus == AnimationStatus.play) {
      if(call) call();
      if(this.clearOpacity > 0) {
        console.log(this.clearOpacity);
        this.ctx.fillStyle = 'rgba(0, 0, 0, '+this.clearOpacity+')';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
      this.draw();
    }
    window.requestAnimationFrame(() => this.animate(call));
  }

}
