<script setup>
  import { ref, onMounted } from "vue"

  const props = defineProps(['is_visible'])
  const isVisible = ref(false) 

  onMounted(() => {
    isVisible.value = props.is_visible
  })
</script>
<template>
  <div v-if="isVisible">
    <h1>Schedule Form</h1>
  </div>
</template>