<!-- scale of image -->

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
      scale: 3,
    }
  },
  mounted() {
    this.stage = new Konva.Stage({
      container: 'app',
      width: 1000,
      height: 400,
      scale: {
        x: this.scale,
        y: this.scale
      },
      draggable: true,
    });
    this.layer = new Konva.Layer();

    this.stage.add(this.layer);

    this.draw();
  },
  methods: {
    draw() {
      var imageObj = new Image();
      imageObj.onload = () => {
        var image = new Konva.Image({
          x: 0,
          y: 0,
          image: imageObj,
          width: 300,
          height: 300
        });

        this.layer.add(image)
        this.layer.draw();
      };
      imageObj.onerror = (error) => {
        console.log(error);
      }
      imageObj.src = '/image.jpg'
    },
  }
}
</script>

<style>
  #app {
    background: #000;
  }
</style>
