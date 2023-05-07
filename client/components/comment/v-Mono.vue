<template>
    <div>
        <div class="flex">
            <!-- avatar -->
            <div class="text-center text-xl">
                <div class="w-16 mx-auto">
                    <img class="w-12 h-12 rounded-full mx-auto" src="~~/assets/images/meo.jpg" alt="" />
                </div>
                <div class="flex flex-col items-center w-16 mx-auto">
                    <FavoriteVHeart :sl="data.favorite[0]?.count || 0" type="cmt" :model="data.id || data._id" />
                    <div @click="openComment = !openComment" class="btn btn-ghost btn-sm btn-circle">
                        <OtherVIcon class-icon=" text-xl" icon="fa-solid fa-share" />
                    </div>
                </div>
            </div>

            <!-- content and name author + time -->
            <div class="ml-2">
                <div class="text-2xl font-medium">{{ data.author[0]?.name }}</div>
                <div class="text-xs mb-2">{{ data.createdAt }}</div>
                <div>
                    {{ data.content }}
                </div>
            </div>
        </div>
        <div class="text-xs">
            <div v-if="!showChild && data.child[0]?.count > 0" @click="getChild()" class="btn btn-xs btn-ghost">
                Xem {{ data.child[0]?.count }} phản hồi khác...
            </div>
            <div v-if="showChild && data.child[0]?.count > 0" @click="showChild = false" class="btn btn-xs btn-ghost">
                Ẩn {{ data.child[0]?.count }} phản hồi khác...
            </div>
        </div>
        <!-- <CommentVInput :data="{ id: data.id || data._id, modelType: 'cmt' }" v-if="openComment" class="mx-3 mt-1" /> -->
        <CommentVInput v-if="openComment" :loading="loading" @send="send" :data="dataInput" class="mx-3 mt-1" />
        <div v-if="showChild" class="ml-10">
            <div class="divider"></div>

            <div v-for="(i, n) in listChild" :key="n">
                <CommentVMono :data="i" />
                <div v-if="n < listChild.length - 1" class="divider my-0"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { alertStore } from "~~/stores/alert.store";
import { authStore } from "~~/stores/auth.store";
import { commentStore } from "~~/stores/comment.store";

const useComment = commentStore();
const useAuth = authStore();
const useAlert = alertStore();
const props = defineProps({
    data: Object,
});

const loading = ref(false);

const dataInput = ref({
    id: props.data.id || props.data._id,
    modelType: "cmt",
});

const showChild = ref(false);
const listChild = ref([]);
const openComment = ref(false);

async function getChild() {
    showChild.value = true;
    try {
        listChild.value = await useComment.findBy(props.data.id || props.data._id);
    } catch (error) {
        console.log(error);
    }
}

async function send() {
    if (!useAuth.user) {
        useAlert.setInfo("bạn cần đăng nhập để dùng chức năng");
        return;
    }
    try {
        if (dataInput.value.content.length > 0) {
            loading.value = true;

            await useComment.create({
                author: useAuth.user.id,
                content: dataInput.value.content,
                model: dataInput.value.id,
                modelType: dataInput.value.modelType,
            });
            dataInput.value.content = "";
            useAlert.setSuccess("gửi thành công");
            loading.value = false;
            openComment.value = false;
            getChild();
        }
        return;
    } catch (error) {
        console.log(error);
    }
}
</script>

<style></style>
