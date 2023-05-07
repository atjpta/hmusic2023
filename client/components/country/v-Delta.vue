<template>
    <div>
        <div class="lg:h-96 lg:w-96 w-60 h-60 overflow-hidden">
            <img class="lg:h-96 lg:w-96 w-60 h-60 hover:scale-110 duration-500 rounded-md" :src="data.url_image" alt="" />
        </div>
        <div class="my-5 indicator w-full">
            <div class="space-y-2">
                <div class="font-extrabold text-2xl">{{ data.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { dialogStore } from "~~/stores/dialog.store";
import { favoriteStore } from "~~/stores/favorite.store";
import { playStore } from "~~/stores/play.store";
import VComment from "~~/components/comment/v-Comment.vue";

const usePlay = playStore();
const useDialog = dialogStore();
const props = defineProps({
    data: Object,
});
const useFavorite = favoriteStore();
const route = useRoute();
const sl = ref();

function showDialog() {
    useDialog.showDialogCpn(VComment, {
        id: props.data.id,
        modelType: "music",
    });
}

async function getApi() {
    try {
        sl.value = await useFavorite.findSlBy(route.params.id);
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getApi();
});
</script>

<style></style>
