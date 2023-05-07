<template>
  <div class="space-y-2 my-5">
    <div v-for="i in useFavorite.list" :key="i">
      <FavoriteVMono :data="i" />
    </div>
    <div v-if="useFavorite.list.length == 0">Bạn chưa yêu thích</div>
  </div>
</template>

<script setup>
import { authStore } from "~~/stores/auth.store";
import { favoriteStore } from "~~/stores/favorite.store";

const useFavorite = favoriteStore();
const useAuth = authStore();
async function getApi() {
  try {
    await useFavorite.findModelByUSer("playlist", useAuth.user.id);
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getApi();
});
</script>

<style></style>
