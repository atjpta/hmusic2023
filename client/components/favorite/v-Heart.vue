<template>
  <div class="flex items-center justify-center">
    <div
      @click="voteFavorite()"
      :class="loading ? 'loading' : ''"
      class="flex btn btn-sm btn-circle btn-ghost"
    >
      {{ data }}
      <OtherVIcon
        :class-icon="isFavorite.id ? 'text-2xl text-red-500' : ' text-2xl'"
        icon="fa-solid fa-heart"
      />
    </div>
    <div>{{ slF }}</div>
  </div>
</template>

<script setup>
import { alertStore } from "~~/stores/alert.store";
import { authStore } from "~~/stores/auth.store";
import { favoriteStore } from "~~/stores/favorite.store";
import { playStore } from "~~/stores/play.store";
const usePlay = playStore();
const useFavorite = favoriteStore();
const isFavorite = ref({});
const loading = ref(false);
const useAuth = authStore();
const useAlert = alertStore();
const props = defineProps({
  model: String,
  type: String,
  sl: String,
});

const slF = ref(props.sl);

async function getFavorite() {
  isFavorite.value = {};

  if (!useAuth.user) {
    return;
  }
  try {
    const favorite = await useFavorite.findByUser(props.model, useAuth.user.id);
    if (favorite.id) {
      isFavorite.value = favorite;
    }
  } catch (error) {
    console.log(error);
  }
}

async function voteFavorite() {
  if (!useAuth.user) {
    useAlert.setInfo("Bạn cần đăng nhập để sử dụng chức năng");
    return;
  }
  loading.value = true;
  try {
    if (isFavorite.value.id) {
      await useFavorite.deleteOne(isFavorite.value.id);
      if (slF.value) {
        slF.value = parseInt(slF.value) - 1;
      }
    } else {
      await useFavorite.create({
        model: props.model,
        user: useAuth.user.id,
        modelType: props.type,
      });
      if (slF.value) {
        slF.value = parseInt(slF.value) + 1;
      } else if (slF.value == 0) {
        slF.value = 1;
      }
    }
    await getFavorite();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

watch(props, () => {
  getFavorite();
});

onMounted(() => {
  if (props.type == "cmt") {
    getFavorite();
  }
});
</script>

<style></style>
