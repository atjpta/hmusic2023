import { defineStore } from "pinia";
import commentService from "~~/services/comment.service";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import vi from 'dayjs/locale/vi'
dayjs.extend(localizedFormat);
dayjs.locale(vi);

export const commentStore = defineStore("commentStore", {
    id: 'comment',
    state() {
        return {
            comment: {},
            list: [],
        };
    },
    getters: {
    },
    actions: {

        setTime(time) {
            dayjs.extend(relativeTime)
            return dayjs(time).fromNow()
        },

        async findBy(id) {
            let list = await commentService.findby(id);
            list.forEach((e, i) => {
                list[i].createdAt = this.setTime(list[i].createdAt);
            });
            return list
        },
        async findOne(id) {
            this.comment = await commentService.findOne(id);
            return this.comment;
        },
        async findAll() {
            this.list = await commentService.findAll();
        },
        async update(data) {
            await commentService.update(data);
        },
        async deleteOne(id) {
            await commentService.deleteOne(id);
        },
        async create(data) {
            await commentService.create(data);
        },
        clear() {
            this.comment = {};
        },
    }
});
