<template>
  <div class="TypeScript">

  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Person } from "./ts/classSample"

type bread = {
  wheat: number
  batter: number
}
type riceBall = {
  rice: number
  nori?: number // 塩お結びとかは海苔無いからね！
}
// 季節（文字列のほかに数値やboolでも定義できる）
type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export default class TypeScript extends Vue {
  #data = 10

  mounted() {
    // 配列のreadonly
    this.readonlyMethod()

    // 列挙型
    this.enumMethod()

    // 型ガード
    console.log(this.isBread({
      wheat: 10,
      batter: 2,
    }))

    // 文字列リテラル
    this.stringLiteral('summer')
    // console.log(this.stringLiteral('aa')) // エラー

    // クラス
    const person = new Person('平賀', 28)
    person.show()
    // person.privateMethod() // エラーになる
  }

  /**
   * 配列のreadonly
   */
  private readonlyMethod() {
    // ※二次元配列とかだと上書きできちゃうので普通にfreezeの方がよさそう
    const rom: readonly number[] = [1, 2, 3]
    // rom.push(4) // エラーになる
  }

  /**
   * 列挙型
   */
  private enumMethod() {
    enum Gender {
      MAN = 1,
      WOMAN = 2,
      OTHER = 3,
    }

    const index: Gender = Gender.MAN

    console.log(index)
    console.log(Gender)
  }

  /**
   * メソッドで型ガード
   */
  private isBread(data: bread | riceBall): data is bread {
    return (data as bread).wheat !== undefined && (data as bread).batter !== undefined
  }

  /**
   * 文字列リテラル型
   */
  private stringLiteral(season: Season) {
    switch (season) {
      case 'spring':
        console.log('春')
        break;
      case 'summer':
        console.log('夏')
        break;
      case 'autumn':
        console.log('秋')
        break;
      case 'winter':
        console.log('冬')
        break;
    }
  }
}
</script>
