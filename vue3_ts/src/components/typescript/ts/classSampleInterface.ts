/*
export class Figure {
  // 図形の面積を求めるメソッド
  getArea(): number {
    return 0
  }
}
*/

// 上のClassと同等
// abstractと異なる点は、不要なメソッドは記述できない（厳格な仕様を定義するイメージ）
// あとは複数のインターフェースを使用できる（extendsは１つのみしかできない）
// インターフェースがインターフェースを継承することも可能
interface Figure {
  width: number
  height: number
  getArea(): number
}

interface Console {
  showConsole(): void
}

export class Triangle implements Figure, Console {
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  getArea() {
    return this.width * this.height / 2
  }

  showConsole(): void {
    console.log(this.getArea())
  }
}