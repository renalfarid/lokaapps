<script setup>
  import {ref, onMounted, watch} from "vue"
  import { useEnrollmentStore } from "../stores/enrollment"
  import RegistrationForm from "./forms/RegistrationForm.vue"
  import ErrorEnrollment from "./enrollment/ErrorEnrollment.vue"
  
  const enrollmentStore = useEnrollmentStore()
  
  const enrollmentError = ref(null)
  const isError = ref(false)
  const isVisible = ref(false)

  const handleEnrollment = async () => {
    await enrollmentStore.getEnrollment()
    if (enrollmentStore.enrollmentError) {
        enrollmentError.value = enrollmentStore.enrollmentError
        console.log(enrollmentError.value)
    }
    //console.log('enrollment data: ', enrollmentData.value)
  }

  const closeApprove = () => {
    isVisible.value = false
    handleEnrollment()
  }

  const approveStudent = async () => {
    await enrollmentStore.approveStudent()
    await enrollmentStore.handleAddStudent()
    handleEnrollment()
  }

  const rejectStudent = async () => {
    await enrollmentStore.rejectStudent()
    handleEnrollment()
  }

  const handleApprove = (id) => {
    enrollmentStore.setId(id)
    enrollmentStore.setStatus('Approve')
    approveStudent()

  }

  const handleReject = (id) => {
    enrollmentStore.setId(id)
    enrollmentStore.setStatus('Reject')
    rejectStudent()
  }

  watch(() => enrollmentStore.isError, (newValue) => {
        isError.value = newValue;
    });

  onMounted(() => {
    handleEnrollment()
  })

</script>
<template>
  <div v-if="isError">
    <ErrorEnrollment/>
  </div>
  <div class="mt-10 max-w-screen-xl mx-auto px-4 md:px-8">
    <div class="items-start justify-between md:flex">
        <div class="max-w-lg">
            <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">
                Registrasi Student
            </h3>
            <p class="text-gray-600 mt-2">
                Data registrasi student
            </p>
        </div>
        <div class="mt-3 md:mt-0">
            <RegistrationForm />
        </div>
    </div>
    <div class="mt-12 shadow-sm border rounded-lg">
        <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                    <th class="py-3 px-6">Name</th>
                    <th class="py-3 px-6">Email</th>
                    <th class="py-3 px-6">Mobile Number</th>
                    <th class="py-3 px-6">Alamat</th>
                    <th class="py-3 px-6"></th>

                </tr>
            </thead>
            <tbody class="text-gray-600 h-full">
                <tr v-for="item,idx in enrollmentStore.apiEnrollment" :key="idx">
                        <td class="px-6 py-4 whitespace-nowrap">{{item.name}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{item.email}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{item.mobile_number}}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{item.alamat}}</td>
                        <td v-if="item.status==='Apply'" class="text-right px-6 whitespace-nowrap">
                            <div class="flex">
                                <div class="flex-1 mt-5">
                                    <div class="py-2 px-3 font-medium rounded-lg">
                                        <button @click="handleApprove(item.id)" type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-grren-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                          Approve
                                        </button>
                                    </div>            
                                </div>
                                <div class="flex-1 mt-5">
                                    <div class="py-2 px-3 font-medium rounded-lg">
                                        <button @click="handleReject(item.id)" type="button" class="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                          Reject
                                        </button>
                                    </div>            
                                </div>                
                            </div>
                            
                        </td>
                        <td v-else-if="item.status==='Reject'" class="text-right px-6 whitespace-nowrap">
                            <div class="flex items-center justify-center flex-none w-6 h-6 mx-auto bg-red-100 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 40 40">
                                    <path fill="#f78f8f" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"></path>
                                    <path fill="#c74343" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"></path><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"></path>
                                </svg>
                            </div>
                        </td>
                        <td v-else-if="item.status==='Approve'" class="text-right px-6 whitespace-nowrap">
                            <div class="flex items-center justify-center w-6 h-6 mx-auto bg-green-100 rounded-full">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 text-green-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                />
                                </svg>
                            </div>
                            
                        </td>
                    </tr>
            </tbody>
        </table>
    </div>
    
  </div> 
</template>
<style scoped>
</style>