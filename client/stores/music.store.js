import { defineStore } from "pinia";
import musicService from "~~/services/music.service";
import { searchStore } from '~~/stores/search.store'
const useSearch = searchStore()
export const musicStore = defineStore("musicStore", {
    id: 'music',
    state() {
        return {
            previewmusic: null,
            music: {},
            list: [],
            url: null,
            url_image: [
                "https://khydqeqdyigehckvjaci.supabase.co/storage/v1/object/public/hmusic-files/image/734997.png",
                "https://khydqeqdyigehckvjaci.supabase.co/storage/v1/object/public/hmusic-files/image/city.jpg",
                "https://khydqeqdyigehckvjaci.supabase.co/storage/v1/object/public/hmusic-files/image/ling-xiang-9.jpg",
                "https://khydqeqdyigehckvjaci.supabase.co/storage/v1/object/public/hmusic-files/image/miku.png",
                "https://khydqeqdyigehckvjaci.supabase.co/storage/v1/object/public/hmusic-files/image/meo.jpg",
                "https://khydqeqdyigehckvjaci.supabase.co/storage/v1/object/public/hmusic-files/image/734997.png",
                "https://khydqeqdyigehckvjaci.supabase.co/storage/v1/object/public/hmusic-files/image/city.jpg",
                "https://khydqeqdyigehckvjaci.supabase.co/storage/v1/object/public/hmusic-files/image/ling-xiang-9.jpg",
                "https://khydqeqdyigehckvjaci.supabase.co/storage/v1/object/public/hmusic-files/image/miku.png",
                "https://khydqeqdyigehckvjaci.supabase.co/storage/v1/object/public/hmusic-files/image/meo.jpg",
            ],
            name: null,
            loading: false,
        };
    },
    getters: {
        list_search(state) {
            let list_search = [];
            if (useSearch.key.length > 0) {
                list_search = state.list.filter((e) => {
                    if (e.name) {
                        return (
                            e.name.toLowerCase().trim().indexOf(useSearch.key.toLowerCase().trim()) > -1
                        );
                    }
                    return false;
                });
            }
            else {
                return state.list
            }
            return list_search
        },
    },
    actions: {

        async findRandom(size, id) {
            this.list = await musicService.findRandom(size, id);
        },
        async findOneEdit(id) {
            this.music = await musicService.findOne(id);
            return this.music;
        },
        async findAll() {
            this.list = await musicService.findAll();
        },
        async findAllTypePage(type, id, page, size) {
            this.list = await musicService.findAllTypePage(type, id, page, size);
        },
        async findAllPage(page, size) {
            this.list = await musicService.findAllPage(page, size);
        },
        async getLength() {
            return await playlistService.getLength();
        },
        async update(data) {
            await musicService.update(data);
        },
        async deleteOne(id) {
            await musicService.deleteOne(id);
        },
        async create(data) {
            await musicService.create(data);
        },
    }
}

);
