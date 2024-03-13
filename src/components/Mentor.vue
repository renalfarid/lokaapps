<script setup>
  import { onMounted, ref } from "vue"
  import MentorForm from "./forms/MentorForm.vue"
  import { useMentorStore } from "../stores/mentor"

  const mentorStore = useMentorStore()

  const isVisible = ref(false)
  const mentor = ref([])

  const openAddMentor = () => {
    isVisible.value = true
  }

  const closeDialog = () => {
    handleFetchMentor()
    isVisible.value = false
  }

  const fetchMentor = async () => {
    await mentorStore.fetchMentor()
    mentor.value = mentorStore.apiMentor
  }

  const handleFetchMentor = () => {
    fetchMentor()
  }
  

  onMounted(() => {
    handleFetchMentor()
  })

</script>
<template>
  <section class="py-28">
    <div class="max-w-screen-lg mx-auto px-4 md:px-8">
      <div class="max-w-md mb-5">
        <h1 class="text-gray-800 text-2xl font-extrabold sm:text-3xl">Mentor List</h1>
        <p class="text-gray-600 mt-2">List mentor that we have :</p>
      </div>
      <div v-if="isVisible">
        <MentorForm :is_visible="isVisible" @close="closeDialog()" />
      </div>
      <div class="mt-3 md:mt-3">
          <button
              @click="openAddMentor()"
              class="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
              Add mentor
          </button>
      </div>
      <ul class="mt-12 divide-y space-y-3">
        <li v-for="(item, idx) in mentor" :key="idx" class="m-3 px-4 py-5 duration-150 bg-gray-50 hover:border-white hover:rounded-xl hover:bg-gray-70">
            <div class="flex items-center gap-x-3">
              <div class="bg-white w-14 h-14 border rounded-full flex items-center justify-center"><img :src="item.mentor_thumbnail" class="rounded-full" /></div>
              <div>
                <h3 class="text-base text-gray-800 font-semibold mt-1">{{ item.mentor_name }}</h3>
              </div>
            </div>
            
            <div v-html="item.mentor_description" class="mb-5 mt-5"></div>
            
        </li>
      </ul>
    </div>
  </section>
</template>