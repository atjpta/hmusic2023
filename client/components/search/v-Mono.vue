<template>
  <div>
    <div
      class="hover:bg-gradient-to-l from-green-400/10 via-cyan-400/10 to-blue-400/10 rounded-2xl"
    >
      <div class="flex justify-between items-center mr-5 cursor-pointer">
        <!-- ảnh -->
        <div
          @click="navigateTo(`/${type}/${data.id}`)"
          class="flex space-x-3 cursor-pointer"
        >
          <img class="w-12 h-12 rounded-2xl" :src="data.url_image" alt="" />
          <!-- tên -->
          <div class="space-y-1">
            <div class="font-extrabold text-2xl">{{ data.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
  type: String,
});
</script>

<style></style>
