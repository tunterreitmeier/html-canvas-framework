export class MathG {
  static radians(degree: number):number {
    return degree * (Math.PI / 180);
  }
  // get sinus from degree instead of radians
  static sinD(degree: number):number {
    return Math.sin(this.radians(degree));
  }
  static cosD(degree: number):number {
    return Math.cos(this.radians(degree));
  }
}
