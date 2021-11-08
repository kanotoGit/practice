<template>
  <div id="app">
    <!-- <canvas id="base"></canvas> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      canvas: null,
      context: null,
    }
  },
  mounted() {
    this.baseCanvas = document.getElementById('base');
    this.baseContext = this.baseCanvas.getContext('2d');
    this.mapCanvas = document.createElement('canvas');
    this.mapContext = this.mapCanvas.getContext('2d');

    this.baseCanvas.width = 500;
    this.baseCanvas.height = 500;
    this.mapCanvas.width = 500;
    this.mapCanvas.height = 500;

    this.setImage(this.mapContext, './image.png', 50, {x:1, y:1});

    // this.setMap();
    //
    this.addMoveEvent();
  },
  methods: {
    setImage(context, src, size, position) {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        context.drawImage(img, size * position.x, size * position.y, 100, 100)
        this.concatCanvas();
      }
    },
    // setMap() {
    //   for(let i = 0; i < 1; i++) {
    //     for(let j = 0; j < 1; j++) {
    //       this.setImage(this.context, './image.png', 256, {x: j, y: i});
    //     }
    //   }
    // },
    addMoveEvent() {
      // let counter = 0;
      const startPoint = {
        x: 0,
        y: 0
      };
      const mapCanvasPoint = {
        x: 0,
        y: 0
      };

      this.baseCanvas.addEventListener('mousedown', (event) => {
        startPoint.x = event.clientX;
        startPoint.y = event.clientY;

        this.baseCanvas.addEventListener('mousemove', moveCanvas);
      })

      this.baseCanvas.addEventListener('mouseup', (event) => {
        mapCanvasPoint.x = event.clientX - this.mapCanvas.offsetLeft;
        mapCanvasPoint.y = event.clientY - this.mapCanvas.offsetTop;

        this.baseCanvas.removeEventListener('mousemove', moveCanvas);
      })

      const moveCanvas = (event) => {
        const distanceX = mapCanvasPoint.x + event.clientX - startPoint.x;
        const distanceY = mapCanvasPoint.y + event.clientY - startPoint.y;


        this.baseContext.clearRect(0, 0, 500, 500);
        this.baseContext.drawImage(this.mapCanvas, distanceX, distanceY)
      }
    },
    concatCanvas() {
      this.baseContext.drawImage(this.mapCanvas, 0, 0)
    },
  }
}
</script>

<style>

</style>
