import { alertStore } from "~/stores/alert.store";
import { authStore } from "~~/stores/auth.store"
const useAuth = authStore()
const useAlert = alertStore()
export default defineNuxtRouteMiddleware((to, from) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        if (to.path == '/') {
            return navigateTo('/')
        }
    }
    else if (to.fullPath != '/') {
        useAlert.setWarning('bạn cần đăng nhập để vào trang đó')
        return navigateTo('/')
    }

})