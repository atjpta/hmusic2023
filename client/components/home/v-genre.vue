<template>
    <div class="">
        <div>
            <div class="flex justify-between mb-3">
                <span
                    class="italic before:h-[98%] before:my-auto py-1 before:block before:absolute before:-inset-1 before:-skew-y-3 before:-skew-x-12 before:bg-gradient-to-r before:from-green-400 before:via-cyan-400 before:to-blue-400 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 relative inline-block">
                    <span class="relative text-white text-3xl font-black px-5">Thể loại</span>
                </span>
                <div @click="navigateTo('/genre')" class="btn btn-primary btn-outline btn-sm">
                    xem thêm
                </div>
            </div>
            <div class="carousel">
                <div class="carousel-item" v-for="i in useStore.list" :key="i.id">
                    <GenreVMono :data="i" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { genreStore } from "~~/stores/genre.store";

const useStore = genreStore();
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
