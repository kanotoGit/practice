<!-- ライン -->

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
      width: 400,
      height: 400
    });
    this.layer = new Konva.Layer();

    this.stage.add(this.layer);
    this.layer.draw();

    this.drawRect();
  },
  methods: {
    drawLine() {
      const line = new Konva.Line({
        x: 0,
        y: 0,
        points: [5, 70, 140, 23, 250, 60, 300, 20, 5, 70],
        stroke: "red",
        tension: 0,
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round',
      });
      this.layer.add(line);
      this.layer.draw();
    },
    drawRect() {
      const group = new Konva.Group();
      this.layer.add(group);
      for(let i = 0; i < 30; i++) {
        for(let j = 0; j < 30; j++) {
          const rect = new Konva.Rect({
            width: 5,
            height: 5,
            x: i*5,
            y: j*5,
            fill: "#eeff00",
          });
          group.add(rect);
          this.layer.draw();
        }
      }
    },
  }
}
</script>

<style>
  #app {
    background: #000;
  }
</style>
