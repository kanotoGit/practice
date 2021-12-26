<template>
  <div class="TypeScript2">
    主にClass周り: {{hoge}}
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Person } from "./ts/classSample"
import { Triangle as TriangleAbstract } from "./ts/classSampleAbstract"
import { Triangle as TriangleInterface } from "./ts/classSampleInterface"
declare function numMapToVoid(obj: {[key: string]: number}): void;
export default class TypeScript extends Vue {
  #data = 10
  hoge = "hoge!!"

  mounted() {
    // クラス
    const person = new Person('平賀', 28, 170, 72)
    person.show()
    // person.privateMethod() // エラーになる
    // console.log(person.tall) // エラーになる
    console.log(person.gender)

    // abstractのサンプル
    const triangle = new TriangleAbstract(20, 20)
    console.log(triangle.getArea())

    // interfaceのサンプル
    const triangle2 = new TriangleInterface(30, 30)
    triangle2.showConsole()
  }
}
</script>
