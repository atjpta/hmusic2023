<template>
    <div class="space-y-5 lg:ml-10">
        <div v-for="i in data" :key="i._id">
            <MusicVMono :data="i" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Array,
});
</script>

<style></style>
