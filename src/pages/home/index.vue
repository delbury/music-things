<template>
  <div class="page page-home">
    <bg-canvas ref="bg"></bg-canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import BgCanvas from '/@/components/bg-canvas/index.vue';

export default defineComponent({
  components: {
    BgCanvas,
  },
  setup() {
    const bg = ref<HTMLCanvasElement>();

    return {
      bg,
    };
  },
});
</script>


<style lang="scss" scoped>

</style>
