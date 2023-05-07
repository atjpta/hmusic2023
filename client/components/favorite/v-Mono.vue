<template>
  <div>
    <div
      class="hover:bg-gradient-to-l from-green-400/10 via-cyan-400/10 to-blue-400/10 rounded-2xl"
    >
      <div class="flex justify-between items-center mr-5 cursor-pointer">
        <!-- ảnh -->
        <div
          @click="navigateTo(`/${data.modelType}/${data.model._id}`)"
          class="flex space-x-3 cursor-pointer"
        >
          <img class="w-12 h-12 rounded-2xl" :src="data.model.url_image" alt="" />
          <!-- tên -->
          <div class="space-y-1">
            <div class="font-extrabold text-2xl">{{ data.model.name }}</div>
          </div>
        </div>
        <div
          @click="voteFavorite()"
          :class="loading ? 'loading' : ''"
          class="btn btn-ghost text-error"
        >
          <OtherVIcon icon="fa-solid fa-x" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authStore } from "~~/stores/auth.store";
import { favoriteStore } from "~~/stores/favorite.store";

const props = defineProps({
  data: Object,
});
const useFavorite = favoriteStore();
const useAuth = authStore();
const loading = ref(false);
async function voteFavorite() {
  loading.value = true;
  try {
    await useFavorite.deleteOne(props.data.id);
    await useFavorite.findModelByUSer(props.data.modelType, useAuth.user.id);
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
}
</script>

<style></style>
