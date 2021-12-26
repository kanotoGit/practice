<template>
  <div class="TypeScript2">
    主にClass周り
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class TypeScript extends Vue {

  mounted() {
    // ジェネリクス(string)
    const generics = new genericsClass<string>()
    generics.setValue("hoge")
    // generics.setValue(2) // エラー
    console.log(generics.getValue())

    // ジェネリクス(number)
    const generics2 = new genericsClass<number>()
    // generics2.setValue("hoge") // エラー
    generics2.setValue(2)
    console.log(generics2.getValue())

    // ジェネリクス(extends)
    const generics3 = new genericsClassExtends<FooHoge>()
    // const generics3 = new genericsClassExtends<number>() // エラー(Fooを含む必要がある)
    // generics3.setValue("hoge") // エラー
    generics3.setValue({hoge: "hoge!!", foo: "foo!"})
    console.log(generics2.getValue())

    // ジェネリクスメソッド
    genericsMethod<string>("hoge")
    genericsMethod<number>(1)
  }
}

// ジェネリクスの基本
class genericsClass<T> {
  #value!: T

  setValue(value: T) {
    this.#value = value
  }

  getValue(): T {
    return this.#value
  }
}

interface Foo {
  foo: string,
}
interface FooHoge extends Foo {
  hoge: string
}

// ジェネリクスの継承
class genericsClassExtends<T extends Foo> {
  #value!: T

  setValue(value: T) {
    this.#value = value
  }

  getValue(): T {
    return this.#value
  }
}

// ジェネリクスメソッド
const genericsMethod = function<T>(data: T): T {
  return data
}
</script>
