<template>
  <div ref="container" class="scroll" @wheel.prevent="handleScroll">
    <div ref="wrapper" :style="{ left: left + 'px' }" class="scroll-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const padding = 15

const left = ref(0)
const container = ref(null)
const wrapper = ref(null)

const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 3;
  const containerWidth = container.value.offsetWidth;
  const wrapperWidth = wrapper.value.offsetWidth;

  if (eventDelta > 0) {
    left.value = Math.min(0, left.value + eventDelta);
  } else {
    if (containerWidth - padding < wrapperWidth) {
      if (left.value < -(wrapperWidth - containerWidth + padding)) {
        // eslint-disable-next-line no-self-assign
        left.value = left.value;
      } else {
        left.value = Math.max(
            left.value + eventDelta,
            containerWidth - wrapperWidth - padding
        );
      }
    } else {
      left.value = 0;
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  .scroll-wrapper {
    position: absolute;
  }
}
</style>