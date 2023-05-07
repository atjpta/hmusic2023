
import { alertStore } from "~~/stores/alert.store";
import config from "~~/config";
import { authStore } from "~~/stores/auth.store";
const useAuth = authStore()
const useAlert = alertStore()
const url = config.url.api + '/image'

export default {

    upload: async (filePath, file) => {
        const { data: data, error } = await useFetch(url + `/uploadImage`, {
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








// import { alertStore } from "~~/stores/alert.store";
// const useAlert = alertStore()
// const supabase = useSupabaseClient()
// export default {


//     upload: async (filePath, file) => {
//         let { error: uploadError } = await supabase.storage
//             .from("hmusic-files/image")
//             .upload(filePath, file);
//         if (uploadError?.statusCode == 409) {
//             return
//         }
//         else if (uploadError) {
//             useAlert.setError(" lỗi upload ảnh: " + uploadError?.message);
//             throw uploadError;
//         }

//         // useAlert.setSuccess("tải ảnh lên thành công");
//         return;
//     },

// } 