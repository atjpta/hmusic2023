<template>
    <div>
        <div class="lg:h-96 lg:w-96 w-60 h-60 overflow-hidden">
            <img class="lg:h-96 lg:w-96 w-60 h-60 hover:scale-110 duration-500 rounded-md" :src="data.url_image" alt="" />
        </div>

        <div class="my-5 indicator w-full">
            <div class="space-y-2">
                <div class="font-extrabold text-2xl">{{ data.name }}</div>
                <div>
                    <div class="space-y-1">
                        <div class="flex space-x-2 items-center">
                            <div class="tooltip w-5" data-tip="ca sĩ">
                                <OtherVIcon icon="fa-solid fa-microphone-lines" />
                            </div>
                            <div @click="navigateTo(`/singer/${i._id}`)"
                                class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                v-for="i in data.singer" :key="i._id">
                                {{ i.name }}
                            </div>
                        </div>
                        <div class="flex space-x-2 items-center">
                            <div class="tooltip w-5" data-tip="thể loại">
                                <OtherVIcon icon="fa-solid fa-table-cells-large" />
                            </div>
                            <div @click="navigateTo(`/genre/${i._id}`)"
                                class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                v-for="i in data.genre" :key="i._id">
                                {{ i.name }}
                            </div>
                        </div>
                        <div class="flex space-x-2 items-center">
                            <div class="tooltip w-5" data-tip="quốc gia">
                                <OtherVIcon icon="fa-solid fa-globe" />
                            </div>
                            <div @click="navigateTo(`/country/${i._id}`)"
                                class="btn btn-xs btn-ghost bg-gradient-to-l from-green-400/30 via-cyan-400/30 to-blue-400/30"
                                v-for="i in data.country" :key="i._id">
                                {{ i.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex indicator-item mt-4 mr-2">
                <div class="dropdown sm:dropdown-top sm:dropdown-right dropdown-left dropdown-top">
                    <label tabindex="0" class="btn btn-sm btn-circle btn-ghost hover:text-blue-400">
                        <OtherVIcon class-icon="text-2xl " icon="fa-solid fa-ellipsis" />
                    </label>
                    <ul tabindex="0" class="dropdown-content shadow bg-base-100 rounded-box w-60">
                        <div class="bg-gradient-to-l from-green-400/10 via-cyan-400/10 to-blue-400/10 rounded-box p-2">
                            <li
                                class="hover-bordered no-animation btn btn-ghost btn-block justify-start justify-items-center">
                                <a>
                                    <PlaylistVAdd :id="data.id" />
                                </a>
                            </li>
                            <li @click="showDialog()" class="hover-bordered btn btn-ghost btn-block justify-start">
                                <OtherVIcon class-icon="text-2xl w-10 mr-1 " icon="fa-solid fa-comments" />
                                Bình luận
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <div>{{ sl }} lượt yêu thích</div>
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
