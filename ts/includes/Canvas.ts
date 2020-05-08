interface CanvasOptions {
  automaticResize?: Boolean;
}

export interface Drawable {
  canvas: Canvas;
  ctx: CanvasRenderingContext2D;
  moved: Boolean;
  draw():void;
  moveAndDraw():void;
}

export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  elements: Array<Drawable>;
  automaticResize: Boolean;
  constructor(selector: string, options?: CanvasOptions) {
    this.canvas = document.querySelector(selector);
    this.resize();
    this.ctx = this.canvas.getContext('2d');
    this.elements = [];
    this.automaticResize = options?.automaticResize || false;
    if(this.automaticResize) {
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
  animate(call?: Function):void {
    if(call) call();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
    window.requestAnimationFrame(() => this.animate(call));
  }
}
