<template>
    <div class="indicator">
        <div class="lg:w-[50vw] w-[80vw] h-[70vh]">
            <div class="">
                <div class="text-4xl font-semibold">Bình luận</div>
                <div class="divider"></div>
            </div>
            <div class="pb-32 h-full">
                <div class="h-full overflow-y-scroll carousel flex flex-col">
                    <div v-for="(i, n) in useComment.list" :key="n">
                        <CommentVMono :data="i" />
                        <div v-if="n < useComment.list.length - 1" class="divider"></div>
                    </div>
                    <div v-if="useComment.list.length < 1" class="text-center text-2xl">
                        không có bình luận nào hết!!
                    </div>
                </div>
            </div>
            <CommentVInput :loading="loading" @send="send" :data="useDialog.props"
                class="indicator-item indicator-center indicator-bottom lg:w-[50vw] w-[80vw]" />
        </div>
    </div>
</template>

<script setup>
import { alertStore } from "~~/stores/alert.store";
import { authStore } from "~~/stores/auth.store";
import { commentStore } from "~~/stores/comment.store";
import { dialogStore } from "~~/stores/dialog.store";

const useDialog = dialogStore();
const useComment = commentStore();
const useAuth = authStore();
const loading = ref(false);
const useAlert = alertStore();

async function getApi() {
    try {
        useComment.list = await useComment.findBy(useDialog.props.id);
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
        if (useDialog.props.content.length > 0) {
            loading.value = true;

            await useComment.create({
                author: useAuth.user.id,
                content: useDialog.props.content,
                model: useDialog.props.id,
                modelType: useDialog.props.modelType,
            });
            useComment.list = await useComment.findBy(useDialog.props.id);
            useAlert.setSuccess("gửi thành công");
            loading.value = false;
            useDialog.props.content = "";
        }
        return;
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getApi();
});
</script>

<style></style>
