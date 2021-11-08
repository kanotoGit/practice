<!-- tooltip -->

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
      tooltipGroup: null,
    }
  },
  mounted() {
    this.stage = new Konva.Stage({
      container: 'app',
      width: 1000,
      height: 400,
      draggable: true,
    });
    this.layer = new Konva.Layer();
    this.tooltipGroup = new Konva.Layer();

    this.stage.add(this.layer,this.tooltipGroup);

    this.draw();
  },
  methods: {
    draw() {
      const rect = new Konva.Rect({
        width: 20,
        height: 20,
        x: 100,
        y: 100,
        fill: "#ee00ff",
        zindex: 100,
      });
      rect.on("mouseover", (event) => {
        this.drawTooltip(event);
      });
      rect.on("mouseout", () => {
        this.unDrawTooltip();
      });

      this.layer.add(rect)
      this.layer.draw();
    },
    drawTooltip(event) {
      const targetPosition = {
        x: event.target.getAttr("x") + 20,
        y: event.target.getAttr("y") + 20
      };

      const tooltip = new Konva.Label({
        ...targetPosition,
      });

      tooltip.add(
        new Konva.Tag({
          fill: 'white',
          pointerDirection: 'up',
          pointerWidth: 10,
          pointerHeight: 10,
          lineJoin: 'round',
          shadowColor: 'black',
          shadowBlur: 10,
          shadowOffsetX: 10,
          shadowOffsetY: 10,
          shadowOpacity: 0.5,
        })
      );
      tooltip.add(
        new Konva.Text({
          text: 'Tooltip pointing down\naa',
          fontFamily: 'Calibri',
          fontSize: 18,
          lineHeight: 1.4,
          padding: 10,
          fill: 'black',
        }),
      );

      this.tooltipGroup.add(tooltip);
      this.tooltipGroup.draw();
    },
    unDrawTooltip() {
      this.tooltipGroup.clear();
    },
  }
}
</script>

<style>
  #app {
    background: #339966;
  }
</style>
