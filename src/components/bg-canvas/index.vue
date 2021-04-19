<template>
  <div
    ref="wrapper"
    class="comp-bg-canvas"
  >
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TheWorker from './help.worker?worker';
import { InitCanvasWorkerEvent } from '/@types/index';

export default defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement>();
    const wrapper = ref<HTMLDivElement>();

    onMounted(() => {
      if(canvas.value && wrapper.value) {
        const wrapperSize = wrapper.value.getBoundingClientRect();
        // 使用 worker 渲染 offscreencanvas
        const worker = new TheWorker();
        const offscreen = canvas.value.transferControlToOffscreen();
        const event: InitCanvasWorkerEvent = {
          type: 'init',
          width: wrapperSize.width,
          height: wrapperSize.height,
          canvas: offscreen,
        };
        worker.postMessage(event, [offscreen]);
      }
    });

    return {
      canvas,
      wrapper,
    };
  },
});
</script>

<style lang="scss" scoped>
.comp-bg-canvas {
  width: 100%;
  height: 100%;
}
</style>
