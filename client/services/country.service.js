import { alertStore } from "~~/stores/alert.store";
import config from "~~/config";
import { authStore } from "~~/stores/auth.store";
const useAuth = authStore()
const useAlert = alertStore()
const url = config.url.api + '/country'

export default {

    getLength: async () => {
        const { data: data, error } = await useFetch(url + `/getLength`, {
            headers: {
                authorization: authStore().getToken
            },
            method: "get",
        })

        if (error.value) {
            // useAlert.setError(error.value.data)
            console.log(error.value.data);
            throw new Error(error.value.data);
        }
        return data.value
    },

    findAllPage: async (page, size) => {
        const { data: data, error } = await useFetch(url + `/${page}/${size}`, {
            headers: {
                authorization: authStore().getToken
            },
            method: "get",
        })

        if (error.value) {
            // useAlert.setError(error.value.data)
            console.log(error.value.data);
            throw new Error(error.value.data);
        }
        return data.value
    },

    create: async (dataO) => {
        const { data: data, error } = await useFetch(url, {
            headers: {
                authorization: authStore().getToken
            },
            body: dataO,
            method: "post",
        })

        if (error.value) {
            useAlert.setError(error.value.data)
            throw new Error(error.value.data);
        }
        return data.value
    },

    deleteOne: async (id) => {
        const { data: data, error } = await useFetch(url + `/${id}`, {
            headers: {
                authorization: authStore().getToken
            },
            method: "delete",
        })

        if (error.value) {
            useAlert.setError(error.value.data)
            throw new Error(error.value.data);
        }
        return data.value
    },

    update: async (dataO) => {
        const { data: data, error } = await useFetch(url + `/${dataO.id}`, {
            headers: {
                authorization: authStore().getToken
            },
            body: dataO,
            method: "put",
        })

        if (error.value) {
            useAlert.setError(error.value.data)
            throw new Error(error.value.data);
        }
        return data.value
    },
    findOne: async (id) => {
        const { data: data, error } = await useFetch(url + `/${id}`, {
            headers: {
                authorization: authStore().getToken
            },
            method: "get",
        })

        if (error.value) {
            useAlert.setError(error.value.data)
            throw new Error(error.value.data);
        }
        return data.value
    },


    findAll: async (id) => {
        const { data: data, error } = await useFetch(url, {
            headers: {
                authorization: authStore().getToken
            },
            method: "get",
        })

        if (error.value) {
            useAlert.setError(error.value.data)
            throw new Error(error.value.data);
        }
        return data.value
    },

    findAllSelect: async () => {
        const { data: data, error } = await useFetch(url + `/select`, {
            headers: {
                authorization: authStore().getToken
            },
            method: "get",
        })

        if (error.value) {
            useAlert.setError(error.value.data)
            throw new Error(error.value.data);
        }
        return data.value
    },

} 