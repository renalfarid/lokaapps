<script setup>
  import { ref } from "vue"
  //import { useAuthStore } from "../stores/auth"
  import { useAuthServices } from "../composables/useAuthServices"
 
  //const authStore = useAuthStore()
  const authServices = useAuthServices()

  const userEmail = ref('')
  const userPassword = ref('')
  const authSession = ref(null)

  const handleUserAuth = async () => {
    //authStore.email = userEmail.value
    //authStore.password = userPassword.value
    await authServices.authLogin(userEmail.value, userPassword.value)
    //await authStore.handleAuthLogin()
    authSession.value = JSON.parse(localStorage.getItem('lokaSess'))
    console.log("auth data", authSession.value)
  }


</script>
<template>
    <div class="w-full h-screen flex flex-col items-center justify-center px-4">
        <div class="max-w-sm w-full text-gray-600">
            <div class="text-center">
                <img src="/images/loka.jpeg" width="150" class="mx-auto" />
                <div class="mt-5 space-y-2">
                    <p class="">Don't have an account? <a href="javascript:void(0)" class="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
                </div>
            </div>
            <form
                onsubmit="event.preventDefault()"
                class="mt-8 space-y-5"
            >
                <div>
                    <label class="font-medium">
                        Email
                    </label>
                    <input v-model="userEmail" type="email" required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
                </div>
                <div>
                    <label class="font-medium">
                        Password
                    </label>
                    <input v-model="userPassword" type="password" required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
                </div>
                <button @click="handleUserAuth()" class="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                    Sign in
                </button>
                <div class="text-center">
                    <a href="javascript:void(0)" class="hover:text-indigo-600">Forgot password?</a>
                </div>
            </form>
        </div>
    </div>
</template>