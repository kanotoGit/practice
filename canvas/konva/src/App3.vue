<!-- キャッシュ -->

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
      rate: 0,
    }
  },
  mounted() {
    this.stage = new Konva.Stage({
      container: 'app',
      width: 1000,
      height: 400,
    });
    this.layer = new Konva.Layer({
      draggable: true,
    });

    this.stage.add(this.layer);
    this.layer.draw();

    this.drawRect();

    this.stage.on("dragmove", () => {
      // console.log(event);
      // this.drawRect();
    })
  },
  methods: {
    drawRect() {
      const group = new Konva.Group();

      for(let i = 0; i < 20; i++) {
        for(let j = 0; j < 20; j++) {
          const rect = new Konva.Rect({
            width: 5,
            height: 5,
            x: i*5,
            y: j*5,
            fill: "#eeff00",
          });
          group.add(rect);
        }
      }

      this.layer.add(group)
      this.layer.batchDraw();
      this.layer.cache();
    },
  }
}
</script>

<style>
  #app {
    background: #000;
  }
</style>
