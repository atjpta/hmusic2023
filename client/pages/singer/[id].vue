<template>
  <div
    class="bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 rounded-md p-5 flex"
  >
    <!-- chi tiết bài hát -->
    <div>
      <div>
        <SingerVDelta :data="useSinger.singer" />
      </div>
    </div>

    <!-- ds các bài hát khác -->
    <div class="w-full">
      <div class="space-y-5 lg:ml-10">
        <div v-for="i in useMusic.list" :key="i._id">
          <MusicVMono2 :data="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { musicStore } from "~~/stores/music.store";
import { playStore } from "~~/stores/play.store";
import { singerStore } from "~~/stores/singer.store";
const useMusic = musicStore();
const useSinger = singerStore();
const usePlay = playStore();
const route = useRoute();
async function getApi() {
  try {
    await useSinger.findOne(route.params.id);
    await useMusic.findAllTypePage("singer", route.params.id, 0, 999);
    usePlay.list = useMusic.list;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getApi();
});
</script>

<style></style>
