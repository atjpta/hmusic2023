import { defineStore } from "pinia";
import playlistService from "~~/services/playlist.service";
import { searchStore } from '~~/stores/search.store'
const useSearch = searchStore()
export const playlistStore = defineStore("playlistStore", {
    id: 'playlist',
    state() {
        return {
            playlist: {},
            list: [],
        };
    },
    getters: {
    },
    actions: {

        async getLength() {
            return await playlistService.getLength();
        },

        async findAllPage(page, size) {
            const list = await playlistService.findAllPage(page, size);
            this.list = list
            return list
        },
        async findByUser(user) {
            const list = await playlistService.findbyUser(user);
            this.list = list
            return list
        },
        async findOne(id) {
            this.playlist = await playlistService.findOne(id);
            return this.playlist;
        },
        async findAll() {
            this.list = await playlistService.findAll();
        },
        async update(data) {
            await playlistService.update(data);
        },
        async add(data) {
            await playlistService.add(data);
        },
        async remove(data) {
            await playlistService.remove(data);
        },
        async deleteOne(id) {
            await playlistService.deleteOne(id);
        },
        async create(data) {
            await playlistService.create(data);
        },
        clear() {
            this.playlist = {};
        },
    }
});
