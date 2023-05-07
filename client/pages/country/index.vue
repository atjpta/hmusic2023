<template>
    <div class="bg-gradient-to-r from-green-400/20 via-cyan-400/20 to-blue-400/20 rounded-md">
        <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 xl:gap-x-20 p-5 mx-auto w-fit">
            <div v-for="i in useModel.list" :key="i.id">
                <CountryVMono :data="i" />
            </div>
        </div>
        <!-- btn chuyển trang -->
        <div class="form-control mx-auto w-fit my-3 pb-3">
            <div class="input-group lg:input-group-md input-group-sm">
                <button @click="selectPage -= 1" :disabled="selectPage == 1" class="btn lg:btn-md btn-sm">
                    <OtherVIcon class-icon="text-xl" icon="fa-solid fa-angle-left" />
                </button>
                <select v-model="selectPage" class="select select-bordered lg:select-md select-sm">
                    <option :value="i" :disabled="i == selectPage" v-for="i in maxPage" :key="i">
                        Trang {{ i }}
                    </option>
                </select>
                <button @click="selectPage += 1" :disabled="selectPage == maxPage" class="btn btn-sm lg:btn-md text-2xl">
                    <OtherVIcon class-icon="text-xl" icon="fa-solid fa-angle-right" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { countryStore } from "~~/stores/country.store";

const useModel = countryStore();
const n = 9;

const maxPage = ref(1);
const selectPage = ref(1);

async function getApi(page) {
    try {
        await useModel.findAllPage(page, n);
    } catch (error) {
        console.log(error);
    }
}

async function getLength() {
    try {
        const length = await useModel.getLength();
        maxPage.value = Math.ceil(length / n);
    } catch (error) {
        console.log(error);
    }
}

watch(selectPage, async () => {
    await getApi(selectPage.value - 1);
});

onMounted(() => {
    getApi(0);
    getLength();
});
</script>

<style></style>
