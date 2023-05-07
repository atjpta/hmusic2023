<template>
  <div>
    <div class="bg-base-100 rounded-2xl">
      <div
        class="rounded-2xl bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 p-5"
      >
        <div class="space-y-3">
          <div v-for="i in useSearch.list" :key="i.id">
            <SearchVMono type="singer" :data="i" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { searchStore } from "~~/stores/search.store";

const useSearch = searchStore();

async function search() {
  try {
    await useSearch.search("singer");
  } catch (error) {
    console.log(error);
  }
}

watch(useSearch, () => {
  search();
});
onMounted(() => {
  search();
});
</script>

<style></style>
