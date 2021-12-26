class Status {
  protected tall: number;
  #weight: number;
  public gender = '知らん！';

  constructor(tall: number, weight: number) {
    this.tall = tall
    this.#weight = weight
  }

  protected show() {
    console.log(`身長は ${this.tall}cm です(Statusクラス)`)
  }
}

export class Person extends Status {
  // プロパティ
  name: string
  age: number

  constructor(name: string, age: number, tall: number, weight: number) {
    super(tall, weight) // 継承元のインスタンス化
    this.name = name
    this.age = age
  }

  show(): void {
    console.log(`${this.name} は ${this.age}歳です・`)
    console.log(`身長は ${this.tall}cm です`)
    super.show() // 継承元のshowメソッド
    // console.log(`体重は ${this.#weight}cm です`) // エラーになる
  }

  private privateMethod() {
    console.log('プライベートです！')
  }
}