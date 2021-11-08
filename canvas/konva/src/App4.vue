<!-- 拡大縮小 -->

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
      scale: 1.5,  // 1.00 ~ 2.00
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

    this.stage.on("wheel", (event) => {
      // 【参考】 https://jsfiddle.net/Lhankor_Mhy/pvwr8b2g/
      // https://konvajs.org/docs/sandbox/Zooming_Relative_To_Pointer.html#page-title

      // 倍率
      const rate = 0.01;

      // 現在の拡大率
      const oldScale = this.stage.scaleX();

      // 拡大率の設定
      this.scale = event.evt.deltaY < 0 ? oldScale + rate : oldScale - rate;
      if(this.scale > 2) {
        this.scale = 2
      } else if(this.scale < 1) {
        this.scale = 1
      }
      this.stage.scale({ x: this.scale, y: this.scale });

      // stageのポジションの設定
      var mousePoint = {
        x: this.stage.getPointerPosition().x / oldScale - this.stage.x() / oldScale,
        y: this.stage.getPointerPosition().y / oldScale - this.stage.y() / oldScale
      };

      var newPos = {
        x: -(mousePoint.x - this.stage.getPointerPosition().x / this.scale) * this.scale,
        y: -(mousePoint.y - this.stage.getPointerPosition().y / this.scale) * this.scale
      };
      this.stage.position(newPos);
      this.stage.batchDraw();
    })
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
        x: 150,
        y: 100,
        fill: "#00eeaa",
      });
      const rect3 = new Konva.Rect({
        width: 50,
        height: 50,
        x: 150,
        y: 150,
        fill: "#ffffff",
      });
      const rect4 = new Konva.Rect({
        width: 50,
        height: 50,
        x: 100,
        y: 150,
        fill: "#00aaee",
      });
      group.add(rect1, rect2, rect3, rect4);

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
