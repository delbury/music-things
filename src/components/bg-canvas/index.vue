<template>
  <div
    ref="wrapper"
    class="comp-bg-canvas"
  >
    <!-- <div>fps: {{ fps }}</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TheWorker from './help.worker?worker';
import { InitCanvasWorkerEvent, CanvasWorkerPostEvent } from '/@types/index';

export default defineComponent({
  setup() {
    const wrapper = ref<HTMLDivElement>();
    const count = ref<number>(1000);
    const fps = ref<number>(0);

    onMounted(() => {
      if(wrapper.value) {
        const wrapperSize = wrapper.value.getBoundingClientRect();
        // 使用 worker 渲染 offscreencanvas
        const worker = new TheWorker(); // 创建 worker
        const canvas = document.createElement('canvas'); // 创建 canvas
        canvas.classList.add('absolute-tl'); // 绝对定位
        wrapper.value.append(canvas);

        const offscreen = canvas.transferControlToOffscreen();
        const event: InitCanvasWorkerEvent = {
          type: 'init',
          width: wrapperSize.width,
          height: wrapperSize.height,
          count: count.value,
          canvas: offscreen,
        };
        // 获取 fps
        worker.addEventListener('message', (ev: MessageEvent<CanvasWorkerPostEvent<number>>) => {
          fps.value = ev.data.data;
        });

        worker.postMessage(event, [offscreen]);
      }
    });

    return {
      wrapper,
      fps,
    };
  },
});
</script>

<style lang="scss" scoped>
.comp-bg-canvas {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
