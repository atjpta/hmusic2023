import { defineStore } from "pinia";
import searchService from "~~/services/search.service";
export const searchStore = defineStore("searchStore", {
    id: 'search',
    state() {
        return {
            key: '',
            list: [],
        };
    },
    getters: {

    },
    actions: {
        async search(type) {
            this.list = await searchService.search(type, this.key)
        }
    }
});
