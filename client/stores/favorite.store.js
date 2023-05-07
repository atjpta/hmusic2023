import { defineStore } from "pinia";
import favoriteService from "~~/services/favorite.service";
import { searchStore } from '~~/stores/search.store'
const useSearch = searchStore()
export const favoriteStore = defineStore("favoriteStore", {
    id: 'favorite',
    state() {
        return {
            favorite: {},
            list: [],
        };
    },
    getters: {
    },
    actions: {

        async findSlBy(id) {
            return await favoriteService.findSlBy(id);
        },

        async findModelByUSer(modelType, user) {
            this.list = await favoriteService.findModelByUSer(modelType, user);
        },

        async findByUser(model, user) {
            const favorite = await favoriteService.findOnebyUser(model, user);
            return favorite;
        },
        async findOne(id) {
            this.favorite = await favoriteService.findOne(id);
            return this.favorite;
        },
        async findAll() {
            this.list = await favoriteService.findAll();
        },
        async update(data) {
            await favoriteService.update(data);
        },
        async deleteOne(id) {
            await favoriteService.deleteOne(id);
        },
        async create(data) {
            await favoriteService.create(data);
        },
        clear() {
            this.favorite = {};
        },
    }
});
