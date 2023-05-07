<template>
    <div class="bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 rounded-md p-5 flex">
        <!-- chi tiết bài hát -->
        <div>
            <div>
                <PlaylistVDelta :data="usePlaylist.playlist" />
            </div>
        </div>

        <!-- ds các bài hát khác -->
        <div class="w-full">
            <div class="space-y-5 lg:ml-10">
                <div v-for="i in usePlaylist.playlist.list" :key="i._id">
                    <MusicVMono2 :data="i" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { musicStore } from "~~/stores/music.store";
import { playStore } from "~~/stores/play.store";
import { playlistStore } from "~~/stores/playlist.store";
const useMusic = musicStore();
const usePlay = playStore();
const usePlaylist = playlistStore();
const route = useRoute();
async function getApi() {
    try {
        await usePlaylist.findOne(route.params.id);
        usePlay.list = usePlaylist.playlist.list;
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getApi();
});
</script>

<style></style>
