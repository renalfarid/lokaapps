<script setup>
 import {ref, onMounted} from 'vue'
 import { useKelasStore } from '../../stores/kelas'
 
 const classStudent = ref([])
 const kelasStore = useKelasStore()

 onMounted(() => {
    classStudent.value = kelasStore.apiClassStudent
    console.log('kelas student: ', classStudent.value)
 })

</script>
<template>
  <div class="mt-10">
    <h1>Student Class : {{ classStudent.class_name || 'No Student Data' }}</h1>
  </div>
  <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
    <table class="w-full table-auto text-sm text-left">
        <thead class="text-gray-600 font-medium border-b">
            <tr>
                <th class="py-3 px-6">Student Name</th>
                <th class="py-3 px-6">Student Address</th>
            </tr>
        </thead>
        <tbody class="text-gray-600 divide-y">
            <tr v-for="(item, idx) in classStudent.students" :key="item.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ item.student_name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ item.student_alamat }}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>