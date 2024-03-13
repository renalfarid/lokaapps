<script setup>
  import {ref, onMounted} from "vue"
  import { useKelasStore } from "../../../stores/kelas"

  const kelasStore = useKelasStore()
  const props = defineProps(['is_visible'])
  const emit = defineEmits(['close'])
  const course = ref([])
  const isVisible = ref(false)

  const closeCourseCard = () => {
    isVisible.value = false
    emit('close')
  }

  const selectCourse = (id) => {
    kelasStore.setSelectedCourse(id)
    console.log("selected course: ", kelasStore.selectedCourse)
    emit('close')
  }

  const fetchCourse = async () => {
    await kelasStore.selectCourse()
    course.value = kelasStore.apiCourseList
  }

  onMounted(() => {
    isVisible.value = props.is_visible
    fetchCourse()
  })
</script>
<template>
    <div v-if="isVisible">
      <ul class="mt-12 divide-y space-y-3">
        <li v-for="(item, idx) in course" :key="idx" class="m-3 px-4 py-5 duration-150 hover:cursor-pointer hover:border-white hover:rounded-xl hover:bg-gray-50">
            <div class="flex items-center gap-x-3" @click="selectCourse(item.id)">
              <div class="bg-white w-14 h-14 border rounded-full flex items-center justify-center"><img :src="item.thumbnail" class="rounded-full" /></div>
              <div>
                <h3 class="text-base text-gray-800 font-semibold mt-1">{{ item.course_name }}</h3>
              </div>
            </div>           
        </li>
      </ul>
    </div>
</template>