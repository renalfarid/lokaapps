<script setup>
import { ref, onMounted } from "vue"
import CourseCard from "./children/CourseCard.vue"
import MentorCard from "./children/MentorCard.vue"
import ScheduleForm from "./children/ScheduleForm.vue"
import { useKelasStore } from "../../stores/kelas"

const kelasStore = useKelasStore()

const props = defineProps(['is_visible'])
const emit = defineEmits(['close'])
const isVisible = ref(false)
const courseVisible = ref(false)
const mentorVisible = ref(false)
const scheduleVisible = ref(false)


const closeDialog = () => {
  emit('close')
  isVisible.value = false
}

const closeCourseCard = () => {
  courseVisible.value = false
  mentorVisible.value = true
  scheduleVisible.value = false
}

const closeMentorCard = () => {
  courseVisible.value = false
  mentorVisible.value = false
  scheduleVisible.value = true
}

const addClass = async () => {
  //console.log("class name: ", kelasStore.className)
  kelasStore.convertTime()
  kelasStore.convertDate()
  await kelasStore.createCourseClass()
  //console.log("class date: ", kelasStore.courseDate)
  //console.log("class time: ", kelasStore.courseTime)
  //console.log("duration: ", kelasStore.courseDuration)
  closeDialog()
}

onMounted(() => {
    isVisible.value = props.is_visible
    courseVisible.value = true
})
</script>
<template>
  <div v-if="isVisible" class="fixed">
    <div class="fixed inset-0 w-full h-full bg-black opacity-40" @click="closeDialog()"></div>
      <div class="fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50%] mx-auto px-4">
        <div class="w-full h-full bg-white rounded-md shadow-lg px-4 py-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-800">
              Create course
            </h2>
            <button @click="closeDialog()" class="p-2 text-gray-400 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-left text-gray-500">
            Create course you want to make
          </p>
          <div v-if="courseVisible">
            <CourseCard :is_visible="courseVisible" @close="closeCourseCard()" />
          </div>
          <div v-else-if="mentorVisible">
            <MentorCard :is_visible="mentorVisible" @close="closeMentorCard()" />
          </div>
          <div v-else="scheduleVisible">
            <ScheduleForm :is_visible="scheduleVisible" />
          </div>
          <button @click="addClass()" class="text-sm mt-3 py-2.5 px-8 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
            Create
          </button>
      </div>
      
    </div>
  </div>
</template>