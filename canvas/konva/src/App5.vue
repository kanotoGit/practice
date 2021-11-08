<!-- hover -->
<!-- // 【参考】 https://konvajs.org/docs/sandbox/Expand_Images_on_Hover.html -->

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
      layer: null,
    }
  },
  mounted() {
    this.stage = new Konva.Stage({
      container: 'app',
      width: 1000,
      height: 400,
      x: 500,
      y: 200,
      scaleX: this.scale,
      scaleY: this.scale,
      draggable: true,
    });
    this.layer = new Konva.Layer({
    });

    this.stage.add(this.layer);
    this.layer.draw();

    this.drawRect();
  },
  methods: {
    drawRect() {
      const group = new Konva.Group();

      const rect1 = new Konva.Rect({
        width: 50,
        height: 50,
        x: 100,
        y: 100,
        fill: "#eeff00",
      });
      const rect2 = new Konva.Rect({
        width: 50,
        height: 50,
        x: 170,
        y: 100,
        fill: "#eeff00",
      });

      group.add(rect1, rect2);

      this.layer.add(group)
      this.layer.draw();
      // this.layer.cache();

      rect1.on("mouseover", (event) => {
        event.target.fill("red");
        this.layer.draw();
      })
      rect1.on("mouseout", (event) => {
        event.target.fill("yellow")
        this.layer.draw();
      })
    },
  }
}
</script>

<style>
  #app {
    background: #000;
  }
</style>
