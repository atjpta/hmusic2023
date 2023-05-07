<template>
    <div class="bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 rounded-md p-5 flex lg:flex-row flex-col">
        <!-- chi tiết bài hát -->
        <div class="">
            <div>
                <MusicVDelta :data="usePlay.song" />
            </div>
        </div>

        <!-- ds các bài hát khác -->
        <div class="w-full">
            <MusicVList :data="useMusic.list" />
        </div>
    </div>
</template>

<script setup>
import { musicStore } from "~~/stores/music.store";
import { playStore } from "~~/stores/play.store";
const useMusic = musicStore();
const usePlay = playStore();
const route = useRoute();
async function getApi() {
    try {
        await useMusic.findRandom(4, route.params.id);
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
