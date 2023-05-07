<template>
  <div>
    <span
      class="italic before:h-[98%] before:my-auto py-1 before:block before:absolute before:-inset-1 before:-skew-y-3 before:-skew-x-12 before:bg-gradient-to-r before:from-green-400 before:via-cyan-400 before:to-blue-400 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 relative inline-block"
    >
      <span class="relative text-white text-3xl font-black px-5">Tìm kiếm</span>
    </span>
    <!-- <SearchVInput /> -->
    <div class="form-control mt-3">
      <div class="input-group">
        <input
          v-model="useSearch.key"
          type="text"
          placeholder="Tìm kiếm…"
          class="input lg:input-md input-sm input-bordered lg:w-1/2 w-3/5"
        />
        <button class="btn btn-square lg:btn-md btn-sm">
          <OtherVIcon icon="fa-solid fa-magnifying-glass" />
        </button>
      </div>
    </div>
    <div class="flex flex-wrap mt-3">
      <div v-for="i in menuAdmin" :key="i">
        <nuxtLink :to="'/search' + i.url" class="flex space-x-1 btn btn-sm mr-1 mb-1">
          <div>
            {{ i.title }}
          </div>
        </nuxtLink>
      </div>
    </div>

    <NuxtPage />
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
    title: "Ca sĩ",
    url: "/singer",
  },
  {
    title: "Playlist",
    url: "/playlist",
  },
]);

onMounted(() => {
  // getApi();
});
</script>

<style></style>
