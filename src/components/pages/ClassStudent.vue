<script setup>
 import {ref, onMounted} from 'vue'
 import { useKelasStore } from '../../stores/kelas'
 import router from '../../router'

 
 const classStudent = ref([])
 const kelasStore = useKelasStore()

 const backKelas = () => {
    router.push("/kelas")
 }

 onMounted(() => {
    classStudent.value = kelasStore.apiClassStudent
    console.log('kelas student: ', classStudent.value)
 })

</script>
<template>
  <div class="mt-10">
    <h1>Student Class : {{ classStudent.class_name || 'No Student Data' }}</h1>
  </div>
  <div class="mt-5">
    <button @click="backKelas()" class="px-2.5">
        <img width="30" height="30" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADiElEQVR4nO2aSWsUURDHf8GYjChqJmbBkx4lon4Jl7jG3OJyU+LFhejV5ayeAgE/hxJDAipx342KS0w8uRxEvRkVlZHCf0OhM5Punl5G8Q8Nmbx6r+p11avtNfzHv4si0AOcAoaB58BH4Kse+/uZxoxmG9BCnaAA7AbGgB9AKeLzHRgFdgHNeWxgHnAYeOuE+gJcBI5KMyv0xufqadH/bOwYcElzgvlvgAG9nEywCXjpBLgD7AEWxVhrMbAXuOvWmwa6SRH2ps44hveAdQmuvwF44NYfSkM7nRLcGHwC9gNzkmbCrzUPAjNO2x1JLb5c6i7J66wkfawCJsVzSjLUhDa34G1gCdmhBbgq3i9lFbFQcOZ0HZhP9pgP3HRmFuvMnHHmZMEuL7Q6qzAHENnFBgc7izMR5szMSCbzbqGDXRAnzDvVCw65wx/KxI64OJGGi42LRmBCstmmqqJZqYIRr6X+sFGyvZ1NK7uch4iDTqUbN0gHDc6T7qhGOCYiy53ibOKp5t8X0zTQLx4jlQiKSqu/xEgAO9wmntUSvEIGSqtvvlWSc7sEuUA0tAOPNdeKqaWkj3Hx21Ju8LQGrZ6IooknGWnC44R4nqQMhjW4lfB5WNaa+N16zlIGLzRoVVwUc8pSEwG63Av8Ax80WAyhiUc5aSLAEvF/Rxl81WATldHgNpHmc4XZA3fQJ4i9kYcZbORyLRuJY1qTOZlWWzXT+mcO+7AGrQMY1f1mrZneau43CIjWPPurA2KPBq1bGAXtOWhmXPw2V0rGgqTROoD1mjQWXdK4sBLRqISxNmYtabxVcmlhn3icr0a0U0RWHBFzMxNq4aSBBtU6JmPfbIHmtQjXU3/YLNlehbmGGHBVXr01Hx5KtgNhJhRcr9cayvWCAecZQ18KdWvSjJpjeWMN8FkyRb7KGHJvwNqWeaFNTTmTZTDOAgW1hUryQnk0sRcAtyTDrVruGduUmAXXCvY7KxSBa+I9ncSFz3KnWjOz1WRzJqbE07LyZUkt3OHMbEa9V3OHSaNR3umzMyfL5RJFwTmAIA3pTjBi21WGrz4H07573+DUHnTt+2N+xVBU7hSkHSWZUpK3xbNq55BLZ0rKSC29Pq6+U5fcdpOeVl0a9Ypm3PUJgrTjQF5fQDSrKz6iEiBqk+GbKtO+vDZQDovUi7Wq7Zzqkvfuo5r3SvPPimZLtXriP/jL8RMhpXAUmuIBHwAAAABJRU5ErkJggg==">
    </button>

  </div>
  <div class="mt-5 shadow-sm border rounded-lg overflow-x-auto">
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