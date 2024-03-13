<script setup>
  import SideBar from "./SideBar.vue";
  import DefaultView from "./View.vue"
</script>
  
<template>
  <div class="grid md:grid-cols-4  md:grid-cols-4 grid-flow-col auto-cols-max">
    <div>
      <SideBar />
    </div>
    <div class="col-span-3">
      <DefaultView />
    </div>
      
  </div>
</template>