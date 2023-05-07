
import { alertStore } from "~~/stores/alert.store";
import config from "~~/config";
import { authStore } from "~~/stores/auth.store";
const useAuth = authStore()
const useAlert = alertStore()
const url = config.url.api + '/song'

export default {

    upload: async (filePath, file) => {
        const { data: data, error } = await useFetch(url + `/uploadSong`, {
            headers: {
                authorization: authStore().getToken
            },
            body: file,
            method: "post",
        })

        if (error.value) {
            console.log(error.value.data);
            // useAlert.setError(error.value.data)
            throw new Error(error.value.data);
        }
        return data.value
    },


}