<template>
    <div>
        <div class="relative">
            <div @click="show = !show" class="flex items-center">
                <OtherVIcon class-icon="text-2xl w-10 " icon="fa-solid fa-circle-plus" />
                Thêm vào playlist
            </div>
            <div v-show="show" class="absolute bottom-6 left-5 sm:left-52">
                <ul @mouseleave="show = false"
                    class="menu h-[300px] overflow-y-scroll carousel shadow bg-base-100 rounded-box w-60">
                    <div class="bg-gradient-to-l from-green-400/10 via-cyan-400/10 to-blue-400/10 rounded-box p-2">
                        <div class="mx-1">
                            <input v-model="key" placeholder="Tìm playlist" class="input input-success w-full"
                                type="text" />
                        </div>
                        <li @click="showDialog()">
                            <a>
                                <OtherVIcon class-icon="text-2xl w-10 " icon="fa-solid fa-circle-plus" />
                                <div class="truncate w-32 text-left">Tạo playlist mới</div>
                            </a>
                        </li>
                        <li @click="addMusic(i)" v-for="i in list" :key="i.id" class="hover-bordered w-56">
                            <a>
                                <OtherVIcon class-icon="text-2xl w-10 " icon="fa-solid fa-icons" />
                                <div class="truncate w-32 text-left">
                                    {{ i.name }}
                                </div>
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { dialogStore } from "~~/stores/dialog.store";
import vEdit from "~~/components/playlist/v-Edit.vue";
import { playlistStore } from "~~/stores/playlist.store";
import { authStore } from "~~/stores/auth.store";
import { alertStore } from "~~/stores/alert.store";

const props = defineProps({
    id: String,
});

const useDialog = dialogStore();
const usePlaylist = playlistStore();
const useAlert = alertStore();
const useAuth = authStore();
const key = ref("");
const list = computed(() => {
    let list_search = [];
    if (key.value.length > 0) {
        list_search = usePlaylist.list.filter((e) => {
            if (e.name) {
                return e.name.toLowerCase().trim().indexOf(key.value.toLowerCase().trim()) > -1;
            }
            return false;
        });
    } else {
        return usePlaylist.list;
    }
    return list_search;
});

function showDialog() {
    useDialog.showDialogCpn(vEdit);
}
const show = ref(false);

async function addMusic(playlist) {
    try {
        await usePlaylist.add({
            id: playlist.id,
            music: props.id,
        });
        useAlert.setSuccess("thêm thành công");
    } catch (error) {
        console.log(error);
    }
}

async function getApi() {
    if (!useAuth.user) {
        return;
    }
    try {
        await usePlaylist.findByUser(useAuth.user.id);
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    getApi();
});
</script>

<style></style>
