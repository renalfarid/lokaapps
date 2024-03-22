import { defineStore } from 'pinia'
import { useSupabaseServices } from '../composables/useSupabaseServices'
import router from '../router'

const supabase = useSupabaseServices()

export const useAuthStore = defineStore('authStore', {
    state: () => ({ 
        email: null,
        password: null,
        apiAuth: null,
        successMessage: null,
        errorMessage: null,
        isLogout: false,
    }),
    actions: {
        async handleAuthLogin() {
            let { data, error } = await supabase.auth.signInWithPassword({
                email: this.email,
                password: this.password
            })

            if (error) {
               this.errorMessage = error
               console.log("auth error: ", this.errorMessage)
            } else {
                this.apiAuth = data
                localStorage.setItem('lokaSess', JSON.stringify(data.session))
            }

        },

        async handleAuthLogout() {

            let { error } = await supabase.auth.signOut()
            if (error) {
                this.errorMessage = error
            } else {
                this.isLogout = true
                if (this.isLogout) {
                    router.push("/login")
                }
                console.log("success: ", this.successMessage)
            }

        }
    }
})