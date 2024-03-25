<script setup>
  import { onMounted, ref } from "vue"
  const props = defineProps(['is_visible'])
  const emit = defineEmits(['close'])

  console.log("props: ", props.is_visible)

  const courseName = ref('')
  const className = ref('')
  const question = ref('')
  const isVisible = ref(false)
  const selected = ref('Class Name')

  const closeDialog = () => {
    emit('close')
  }
  const addQuiz = () => {

  }

  const getClassNameOption = async () => {
    //await fetchSelectedClass()
  }

  onMounted(() => {
    isVisible.value = props.is_visible
  })
</script>
<template>
  <div v-if="isVisible" class="fixed inset-0 w-full h-full">
    <div class="fixed inset-0 w-full h-full bg-black opacity-40" @click="closeDialog()"></div>
      <div class="fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full mx-auto px-4">
        <div class="w-full h-full bg-white rounded-md shadow-lg px-4 py-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-800">
              Create quiz
            </h2>
            <button @click="closeDialog()" class="p-2 text-gray-400 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-left text-gray-500">
            Create quiz
          </p>
          <div class="p-2 relative max-w mx-auto mt-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-4"
            viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd" />
            </svg>
            <select v-model="className" class="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                <option value="" :selected="selected" disabled>Class Name</option>
                <option>Software engineer</option>
                <option>IT manager</option>
                <option>UI / UX designer</option>
            </select>
          </div>
          
          <div class="p-2 flex items-center justify-between mt-4">
            <input v-model="courseName" type="text" placeholder="course name" class="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          </div>
          <div class="p-2 flex items-center justify-between mt-4">
            <textarea v-model="question" rows="5" placeholder="question" class="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          </div>
          <button @click="addQuiz()" class="text-sm mt-3 py-2.5 px-8 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
            Add Quiz
          </button>
          
      </div>
    </div>
  </div>
</template>