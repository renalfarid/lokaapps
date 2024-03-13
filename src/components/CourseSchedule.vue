<script setup>
  import {ref, onMounted} from "vue"
  import moment from "moment"
  import CourseClassForm from "./forms/CourseClassForm.vue"
  
  const courseData = ref([])
  const isVisible = ref(false)

  const openClassForm = () => {
    isVisible.value = true
  }

  const closeClassform = () => {
    isVisible.value = false
  }

  const handleCourse = async () => {
     //await courseStore.getCourseSchedule()
     //courseData.value = courseStore.apiCourse
     //console.log("jadwal kursus: ", courseData.value)
  }

  const convertDate = (dateCourse) => {
    return  moment(dateCourse).format('DD MMMM YYYY')
  }

  const convertTime = (dateCourse, timeCourse) => {
    const date = new Date(`${dateCourse} ${timeCourse}`)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  }

  onMounted(() => {
    handleCourse()
   // handleEnrollment()
  })

</script>
<template>
  <div class="mt-10 max-w-screen-xl mx-auto px-4 md:px-8">
    <div class="items-start justify-between md:flex">
        <div class="max-w-lg">
            <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">
                Course Class
            </h3>
            <p class="text-gray-600 mt-2">
                Class and Schedule
            </p>
        </div>
        <div v-if="isVisible">
            <CourseClassForm :is_visible="isVisible" @close="closeClassform()" />
        </div>
        <div class="mt-3 md:mt-3">
            <button @click="openClassForm()" class="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm">
                Buat Kelas
            </button>
        </div>
    </div>
    <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table class="w-full table-auto text-sm text-left">
            <thead class="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                    <th class="py-3 px-6">Class Name</th>
                    <th class="py-3 px-6">Course Name</th>
                    <th class="py-3 px-6">Duration</th>
                    <th class="py-3 px-6">Date - Time</th>
                    <th class="py-3 px-6"></th>

                </tr>
            </thead>
            <tbody class="text-gray-600 divide-y">
                <tr v-for="item,idx in courseData" :key="idx">
                    <td class="px-6 py-4 whitespace-nowrap">{{item.class_name}}</td> 
                    <td class="px-6 py-4 whitespace-nowrap">{{item.course.course_name}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{`${item.duration} jam`}}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{{ convertDate(item.date) }} - {{ convertTime(item.date, item.time) }}</td>        
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>
<style scoped>
</style>