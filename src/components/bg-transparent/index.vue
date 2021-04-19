<template>
  <div class="wrapper">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import workletUrl from './worklet.ts?url';
console.log(workletUrl);
// CSS.paintWorklet.addModule(workletUrl);

export default defineComponent({});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 500px;
  height: 500px;
  color: skyblue;
  background-image: paint(bg-transparent);
}
</style>
