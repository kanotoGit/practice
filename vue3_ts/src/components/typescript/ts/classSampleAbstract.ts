/*
export class Figure {

  protected width: number
  protected height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  // 図形の面積を求めるメソッド
  getArea(): number {
    return 0
  }
}
*/

// 上のClassと同等だが、getArea() のような意味無しメソッドは abstract にする
abstract class Figure {
  protected width: number
  protected height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  // 図形の面積を求めるメソッド
  abstract getArea(): number

  // abstruct以外のメソッドも定義可能
  public getWidth() {
    return this.width
  }

  public getHeight() {
    return this.height
  }
}

export class Triangle extends Figure {
  getArea() {
    console.log("getWidth() in Triangle Class", this.getWidth())
    return this.width * this.height / 2
  }
}