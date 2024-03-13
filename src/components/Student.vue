<script setup>
  import {ref, onMounted} from "vue"
  import { useStudentStore } from "../stores/student"
  
  const studentStore = useStudentStore()

  const studentData = ref([])

  const handleFetchStudent = async () => {
    await studentStore.handleFetchStudent()
  }

  onMounted(() => {
    handleFetchStudent()
    studentData.value = studentStore.apiStudent
    //console.log('student: ', studentStore.apiStudent)
  })
</script>
<template>
  <div class="mt-10 max-w-screen-xl mx-auto px-4 md:px-8">
    <div class="items-start justify-between md:flex">
        <div class="max-w-lg">
            <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">
                Student Course
            </h3>
            <p class="text-gray-600 mt-2">
                Data student course
            </p>
        </div>
    </div>
    <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table class="w-full table-auto text-sm text-left">
            <thead class="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                    <th class="py-3 px-6">Name</th>
                    <th class="py-3 px-6">Email</th>
                    <th class="py-3 px-6">Mobile Number</th>
                    <th class="py-3 px-6">Alamat</th>
                </tr>
            </thead>
            <tbody class="text-gray-600 divide-y">
                <tr v-for="item,idx in studentStore.apiStudent" :key="idx">
                    <td class="px-6 py-4 whitespace-nowrap">{{item.registration.name}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{item.registration.email}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{item.registration.mobile_number}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{item.registration.alamat}}</td>
                    
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>