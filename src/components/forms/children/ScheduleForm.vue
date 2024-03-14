<script setup>
  import { ref, onMounted, watch } from "vue"
  import dayjs from 'dayjs'
  import { useKelasStore } from "../../../stores/kelas"
  import moment from "moment"

  const emit = defineEmits(['close'])
  const kelasStore = useKelasStore()

  const classTime = ref('');
  const props = defineProps(['is_visible'])
  const isVisible = ref(false) 
  const className = ref('')
  const classDate = ref('')
  const duration = ref(null)
  
  watch([className, classDate, classTime, duration], 
        ([newClassName, newClassdate, newClassTime, newDuration]) => {
          kelasStore.setClassName(newClassName)
          kelasStore.setCourseDate(newClassdate)
          kelasStore.setCourseTime(newClassTime)
          kelasStore.setDuration(newDuration)
    }, {
    immediate: true, // Run immediately
    deep: true // Detect changes inside objects (not needed here)
  });
  onMounted(() => {
    isVisible.value = props.is_visible
  })
</script>
<template>
  <div v-if="isVisible">
    <div class="p-2 flex items-center justify-between mt-4">
      <input v-model="className" type="text" placeholder="class name" class="w-full pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
    </div>
    <div class="p-2 flex items-center gap-3 mt-4">
      <a-date-picker v-model:value="classDate" class="pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
      <a-time-picker v-model:value="classTime" class="pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
      <input v-model="duration" type="number" placeholder="duration in hours" class="pl-2 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
    </div>
  </div>
</template>