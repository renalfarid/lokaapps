<script setup>
  import {ref, onMounted} from "vue"
  import ChartBar from "../components/chart/ChartBar.vue"
  import { useAuthServices } from "../composables/useAuthServices"
  import router from "../router";
  const error = ref(null);
  
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.hash.substr(1));
  if (urlParams.has('error')) {
    router.push("/login")
    error.value = urlParams.get('error_description');
  }

  const authServices = useAuthServices()
 
  const stats = ref([])

  onMounted(() => {
    stats.value = [
        { data: '20+', title: 'Course' },
        { data: '10+', title: 'Students' },
        { data: '40+', title: 'Transactions' },
        { data: '30+', title: 'Registration' },
      ]
 
  })
</script>
<template>
  <section class="py-14">
    <div class="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <p class="mt-3 text-xl font-semibold">
          Statistik Loka Academy
        </p>
      </div>
      <div class="mt-12 mb-5">
        <ul class="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x">
          <li
            v-for="(item, index) in stats"
            :key="index"
            class="text-center px-12 md:px-16"
          >
            <h4 class="text-4xl text-indigo-600 font-semibold">
              {{ item.data }}
            </h4>
            <p class="mt-3 font-medium">
              {{ item.title }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section>
    <div class="m-10">
          <ChartBar />
        </div>
  </section>
</template>
<style scoped>
</style>