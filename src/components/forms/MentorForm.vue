<script setup>
  import { ref, onMounted } from "vue"
  import { useMentorStore } from "../../stores/mentor"

  const mentorStore = useMentorStore()

  const props = defineProps(['is_visible'])
  const emit = defineEmits(['close'])

  const isVisible = ref(false)
  const file = ref(null)
  const isUpload = ref(false)
  const imagePath = ref('')
  const mentorName = ref('')
  const mentorDescription = ref('')
  
  const handleAddMentor = async () => {
    mentorStore.setMentorName(mentorName.value)
    mentorStore.setDescription(mentorDescription.value)
    await mentorStore.addMentor()
  }

  const closeDialog = () => {
    emit('close')
    isVisible.value = false
  }

  const addMentor = () => {
    handleAddMentor()
    closeDialog()
  }

  const handleUploadFile = async() => {
    await mentorStore.uploadThumbnail(file.value)
    imagePath.value = mentorStore.uploadPath
    isUpload.value = true;
    //console.log("selected file: ", file.value.files[0])
  }

  const onChangeFile = (event) => {
    file.value = event.target.files[0]
    handleUploadFile()
     console.log("target file: ", event.target.files[0])
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
              Create mentor
            </h2>
            <button @click="closeDialog()" class="p-2 text-gray-400 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-left text-gray-500">
            Create mentor
          </p>
          <div class="p-2 flex items-center justify-between mt-4">
            <input @change="onChangeFile" ref="file" type="file" name="thumbnail" accept="image/*" capture class="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          </div>
          <div v-if="isUpload" class="p-2 flex items-center justify-between mt-4">
            <img :src="imagePath" />
          </div>
          <div class="p-2 flex items-center justify-between mt-4">
            <input v-model="mentorName" type="text" placeholder="mentor name" class="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          </div>
          <div class="p-2 flex items-center justify-between mt-4">
            <textarea v-model="mentorDescription" rows="5" placeholder="mentor description html tag" class="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          </div>
          <button @click="addMentor()" class="text-sm mt-3 py-2.5 px-8 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
            Simpan
          </button>
          
      </div>
    </div>
  </div>
</template>