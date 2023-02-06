<script setup lang="ts">

defineProps<{
  spinning: boolean
}>();

</script>

<template>

  <div class="horizontal-bar-wrap" v-if="spinning">
    <div class="bar1 bar"></div>
  </div>

</template>

<style scoped lang="scss">

@keyframes barWidth {
  0% {
    width: 0;
  }
  25% {
    width: 50%;
  }
  50% {
    width: 100%;
  }
  75% {
    width: 50%;
  }
  100% {
    width: 0;
  }
}

.horizontal-bar-wrap {
  height: 4px;
  width: 100%;

  .bar {
    position: relative;
    width: 0;
    height: 100%;
    margin: 0 auto;
    animation: barWidth;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    &.bar1 {
      animation-delay: 0s;
      background: #02a09a;
      top: 50px;
      z-index: 1;
    }
  }
}
</style>
