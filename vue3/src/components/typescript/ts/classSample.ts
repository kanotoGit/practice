export class Person {
  // プロパティ
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  show(): void {
    console.log(`${this.name} は ${this.age}歳です`)
  }

  private privateMethod() {
    console.log('プライベートです！')
  }
}