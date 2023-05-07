import { defineStore } from "pinia";
import imageService from "~~/services/image.service";
import config from "~~/config";
export const imageStore = defineStore("imageStore", {
    id: 'image',
    state() {
        return {
            previewImage: null,
            image: null,
            url: null,
            name: null,
            loading: false,
        };
    },
    getters: {
    },
    actions: {


        async previewFiles(event) {
            this.reset();
            const file = event.target.files[0];
            const theReader = new FileReader();
            theReader.onloadend = async () => {
                this.previewImage = await theReader.result;
            };
            theReader.readAsDataURL(file);
            this.image = new FormData();
            this.image.append("image", file);
            this.name = file.name
            this.url = config.url.apiImage + this.name;
            console.log(this.url);

        },

        async upload() {
            await imageService.upload(this.name, this.image);
            this.previewImage = null
            this.image = null
            return this.url;
        },

        reset() {
            this.previewImage = null;
            this.image = null;
            this.url = null;
            this.name = null;
        },
    }
}

);
