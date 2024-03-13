<script setup>
import {ref, onMounted} from "vue"
import { useCourseStore } from "../stores/course"
import CourseForm from "./forms/CourseForm.vue"

const isVisible = ref(false)

const courseStore = useCourseStore()
const course = ref([])

const handleCourseList = async () => {
    await courseStore.getCourse()
    course.value = courseStore.apiCourseList
}

const openAddCourse = () => {
  isVisible.value = true
  console.log("is visible: ", isVisible.value)
}

const closeDialog = () => {
  handleCourseList()
  isVisible.value = false
  console.log("is visible: ", isVisible.value)
}

onMounted(() => {
    handleCourseList()
})

</script>
<template>
  <section class="py-28">
    <div class="max-w-screen-lg mx-auto px-4 md:px-8">
      <div class="max-w-md mb-5">
        <h1 class="text-gray-800 text-2xl font-extrabold sm:text-3xl">Course List</h1>
        <p class="text-gray-600 mt-2">List course that we have :</p>
      </div>
      <div v-if="isVisible">
        <CourseForm :is_visible="isVisible" @close="closeDialog()" />
      </div>
      <div class="mt-3 md:mt-3">
          <button
              @click="openAddCourse()"
              class="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
              Add course
          </button>
      </div>
      <ul class="mt-12 divide-y space-y-3">
        <li v-for="(item, idx) in course" :key="idx" class="m-3 px-4 py-5 duration-150 hover:border-white hover:rounded-xl hover:bg-gray-50">
            <div class="flex items-center gap-x-3">
              <div class="bg-white w-14 h-14 border rounded-full flex items-center justify-center"><img :src="item.thumbnail" class="rounded-full" /></div>
              <div>
                <h3 class="text-base text-gray-800 font-semibold mt-1">{{ item.course_name }}</h3>
              </div>
            </div>
            
            <div v-html="item.description" class="mb-5 mt-5"></div>
            
        </li>
      </ul>
    </div>
  </section>
</template>
  