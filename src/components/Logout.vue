<template>
    <button @click="handleLogout()" class="logout-button">Logout</button>
</template>

<script setup>
import { ref } from "vue"
import { useAuthServices } from "../composables/useAuthServices"
import router from "../router";
const authServices = useAuthServices()
const isLoggedOut = ref(false)

const handleLogout = async () => {
    isLoggedOut.value = await authServices.authLogout()
    
    if (!isLoggedOut.value) {
        isLoggedOut.value = authServices.authLogout()
    } else {
        router.push("/login")
    }
}

</script>