import { defineStore } from "pinia";
export const dialogStore = defineStore("dialogStore", {
    id: 'dialog',
    state() {
        return {
            data: {},
            dataInput: {},
            cb: null,
            cpn: null,
            props: {},
        };
    },
    getters: {

    },
    actions: {
        showDialog(data, cb) {
            this.data = data;
            this.cb = cb;
        },
        showDialogInput(data, cb) {
            this.dataInput = data;
            this.cb = cb;
        },
        hiddenDialog() {
            this.data = {};
            this.cb = null;
            this.dataInput = {}
            this.cpn = null;
            this.props = {}
        },
        showDialogCpn(cpn, props) {
            this.cpn = cpn;
            this.props = props
        },
    },
});
