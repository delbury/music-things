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
import CanvasAnimation from './CanvasAnimation';

export default defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement>();
    const wrapper = ref<HTMLDivElement>();

    onMounted(() => {
      if(canvas.value && wrapper.value) {
        const ca = new CanvasAnimation(canvas.value);
        const wrapperSize = wrapper.value.getBoundingClientRect();
        ca.setSize(wrapperSize.width, wrapperSize.height);
        ca.clear('#000');
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
