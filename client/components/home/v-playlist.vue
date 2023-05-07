<template>
  <div class="">
    <div>
      <div class="flex justify-between mb-2">
        <span
          class="italic before:h-[98%] before:my-auto py-1 before:block before:absolute before:-inset-1 before:-skew-y-3 before:-skew-x-12 before:bg-gradient-to-r before:from-green-400 before:via-cyan-400 before:to-blue-400 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 relative inline-block">
          <span class="relative text-white text-3xl font-black px-5">Playlist</span>
        </span>
        <div @click="navigateTo('/playlist')" class="btn btn-primary btn-outline btn-sm">
          xem thêm
        </div>
      </div>
      <div class="carousel space-x-5">
        <div class="carousel-item" v-for="item in useStore.list" :key="item.id">
          <PlaylistVMono :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { playlistStore } from "~~/stores/playlist.store";

const useStore = playlistStore();
async function getApi() {
  try {
    await useStore.findAllPage(0, 9);
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getApi();
});
</script>

<style></style>
