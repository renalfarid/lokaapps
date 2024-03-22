import { defineStore } from 'pinia'
import { useSupabaseServices } from '../composables/useSupabaseServices'

const supabase = useSupabaseServices()

export const useAuthStore = defineStore('authStore', {
    state: () => ({ 
        email: null,
        password: null,
        apiAuth: null,
        successMessage: null,
        errorMessage: null
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

        }
    }
})