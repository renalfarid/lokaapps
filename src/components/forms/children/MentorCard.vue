<script setup>
  import {ref, onMounted} from "vue"
  import { useKelasStore } from "../../../stores/kelas"

  const kelasStore = useKelasStore()
  const props = defineProps(['is_visible'])
  const emit = defineEmits(['close'])
  const mentor = ref([])
  const isVisible = ref(false)

  const closeMentorCard = () => {
    isVisible.value = false
  }

  const selectMentor = (id) => {
    kelasStore.setSelectedMentor(id)
    console.log("selected mentor: ", kelasStore.selectedMentor)
    emit('close')
    closeMentorCard()
  }

  const fetchMentor = async() => {
    await kelasStore.selectMentor()
    mentor.value = kelasStore.apiMentorList
  }
  onMounted(() => {
    isVisible.value = props.is_visible
    fetchMentor()
  })
</script>
<template>
    <div v-if="isVisible">
      <ul class="mt-12 divide-y space-y-3">
        <li v-for="(item, idx) in mentor" :key="idx" class="m-3 px-4 py-5 duration-150 hover:cursor-pointer hover:border-white hover:rounded-xl hover:bg-gray-50">
            <div class="flex items-center gap-x-3" @click="selectMentor(item.id)">
              <div class="bg-white w-14 h-14 border rounded-full flex items-center justify-center"><img :src="item.mentor_thumbnail" class="rounded-full" /></div>
              <div>
                <h3 class="text-base text-gray-800 font-semibold mt-1">{{ item.mentor_name }}</h3>
              </div>
            </div>           
        </li>
      </ul>
    </div>
</template>