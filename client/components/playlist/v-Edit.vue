<template>
    <div>
        <div class="space-y-3">
            <div class="text-3xl font-semibold text-center">Chỉnh sửa playlist</div>
            <div>
                <input v-model="data.name" class="input input-success w-full" placeholder="nhập tên playlist" type="text" />
            </div>
            <div>
                <div class="text-xl font-extrabold mt-5">
                    Ảnh
                    <div class="tooltip" data-tip="không được để trống">
                        <div class="btn-xs btn btn-ghost rounded-full h-1 w-6">
                            <OtherVIcon class-icon="text-error" icon="fa-solid fa-star-of-life" />
                        </div>
                    </div>
                </div>

                <UploadVUploadSimple :data="data.url_image" />
            </div>
            <div class="flex items-center justify-between">
                <div>
                    <div class="text-2xl">công khai</div>
                    <div class="">mọi người có thể nhìn thấy playlist này</div>
                </div>
                <input v-model="data.isPublic" type="checkbox" class="toggle toggle-success" checked />
            </div>
            <div @click="save()" :class="loading ? 'loading' : ''" class="btn btn-primary btn-block">
                Lưu
            </div>
        </div>
    </div>
</template>

<script setup>
import { alertStore } from "~~/stores/alert.store";
import { dialogStore } from "~~/stores/dialog.store";
import { imageStore } from "~~/stores/image.store";
import { playlistStore } from "~~/stores/playlist.store";
import { authStore } from "~~/stores/auth.store";

const usePlaylist = playlistStore();
const useAlert = alertStore();
const useImage = imageStore();
const loading = ref(false);
const useDialog = dialogStore();
const useAuth = authStore();
const props = defineProps({
    id: String,
});

const data = ref({
    isPublic: true,
});
async function save() {
    if (data.value.name && useImage.url) {
    } else {
        useAlert.setSuccess("nhập đủ tên và ảnh của playlist");
        return;
    }
    loading.value = true;
    try {
        if (useImage.url) {
            await useImage.upload();
            data.value.url_image = useImage.url;
        }
        data.value.author = useAuth.user.id;
        await usePlaylist.create(data.value);
        await usePlaylist.findByUser(useAuth.user.id);
        useDialog.hiddenDialog();
        useAlert.setSuccess("tạo thành công");
        loading.value = false;
    } catch (error) {
        console.log(error);
    }
}

async function getApi() {
    try {
        console.log(props.id);
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getApi();
});
</script>

<style></style>
