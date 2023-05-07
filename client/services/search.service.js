import { alertStore } from "~~/stores/alert.store";
import config from "~~/config";
import { authStore } from "~~/stores/auth.store";
const useAuth = authStore()
const useAlert = alertStore()
const url = config.url.api + '/search'

export default {


    search: async (type, key) => {
        const { data: data, error } = await useFetch(url + `/${type}/${key}`, {
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

} 