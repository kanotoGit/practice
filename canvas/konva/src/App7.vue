<!-- zindex -->

<template>
  <div id="app"></div>
</template>

<script>
import Konva from "konva";

export default {
  name: 'App',
  data() {
    return {
      state: null,
      layer1: null,
      layer2: null,
    }
  },
  mounted() {
    this.stage = new Konva.Stage({
      container: 'app',
      width: 1000,
      height: 400,
      draggable: true,
    });
    this.layer1 = new Konva.Layer();
    this.layer2 = new Konva.Layer();
    this.layer3 = new Konva.Layer();

    this.stage.add(this.layer1, this.layer2);

    this.layer1.zIndex(2);
    this.layer2.zIndex(1);

    this.draw();
  },
  methods: {
    draw() {
      const rect1 = new Konva.Rect({
        width: 50,
        height: 50,
        x: 100,
        y: 100,
        fill: "#ee00ff",
        zindex: 100,
      });
      const rect2 = new Konva.Rect({
        width: 50,
        height: 50,
        x: 125,
        y: 100,
        fill: "#eeff00",
      });

      this.layer1.add(rect1)
      this.layer1.draw();

      this.layer2.add(rect2)
      this.layer2.draw();
    },
  }
}
</script>

<style>
  #app {
    background: #000;
  }
</style>
