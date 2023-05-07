<template>
  <div
    class="bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 rounded-md p-5"
  >
    <div class="flex flex-wrap">
      <div v-for="i in menuAdmin" :key="i">
        <nuxtLink :to="'/favorite' + i.url" class="flex space-x-1 btn btn-sm mr-1 mb-1">
          <div>
            {{ i.title }}
          </div>
        </nuxtLink>
      </div>
    </div>

    <div class="mt-3 space-y-5" v-if="loadingSkeleton">
      <div v-for="i in 7" :key="i">
        <!-- <AdminVSkeleton /> -->
      </div>
    </div>

    <NuxtPage v-else />
  </div>
</template>

<script setup>
import { alertStore } from "~~/stores/alert.store";
import { authStore } from "~~/stores/auth.store";
import { searchStore } from "~~/stores/search.store";
import { userStore } from "~~/stores/user.store";
const useSearch = searchStore();
const useUser = userStore();
const useAuth = authStore();
const route = useRoute();
const useAlert = alertStore();
const loadingSkeleton = ref(false);
const menuAdmin = ref([
  {
    title: "Bài hát",
    url: "/music",
  },
  {
    title: "ca sĩ",
    url: "/singer",
  },
  {
    title: "Playlist",
    url: "/playlist",
  },
]);
definePageMeta({
  middleware: "auth",
});
</script>

<style></style>
