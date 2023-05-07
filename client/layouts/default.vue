<template>
  <div class="bg-cover bg-local bg-gradient-to-l from-green-400/10 via-cyan-400/10 to-blue-400/10" :style="image">
    <div class="backdrop-blur-xl">
      <OtherVDialog class="z-40" />
      <OtherVHeader class="sticky top-0 z-10" />
      <OtherVAlert class="h-0 z-50" />
      <div class="mx-5 lg:pl-60 mt-5 min-h-[100vh]">
        <!-- <button @click="randomImage" class="btn">get random image</button> -->
        <slot />
      </div>
      <OtherVFooter class="lg:mx-0 lg:pl-60 pt-20 sticky" />
      <OtherVFooterMusic class="sticky bottom-0 z-30" />
    </div>
  </div>
</template>

<script setup>
import { playStore } from "~~/stores/play.store";
const usePlay = playStore();

const image = computed(() => {
  if (usePlay.isBgImage) {
    return `background-image: url(${usePlay.song.url_image || usePlay.image})`;
  } else return "";
});
</script>

<style>
.btn {
  text-transform: none;
}
</style>
