import { useSupabaseServices } from './useSupabaseServices'

const supabase = useSupabaseServices()

export function useAuthServices() {

    const authLogin = async (email, password) => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
    
        if (error) {
           const errorMessage = error
           console.log("auth error: ", errorMessage)
           return errorMessage
        } else {
            const apiAuth = data.session
            localStorage.setItem('lokaSess', JSON.stringify(apiAuth))
        }
    }

    const checkAuth = () => {
        return !!localStorage.getItem('lokaSess');
    }

    const authLogout = () => {
        localStorage.removeItem('lokaSess');
    }

    return {
        authLogin,
        checkAuth,
        authLogout
    }

} 