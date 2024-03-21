<script setup>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import {computed, onMounted, ref, reactive} from "vue"
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
 
  const chartData = ref({
          labels: [ 'January', 'February', 'March' ],
          datasets: [{ label: 'Data Student',
                        backgroundColor: '#f87979', 
                        data: [40, 20, 12] }]
        })
  const chartOptions = ref({responsive: true})

  const chartStyle = computed(() => {
    return {height: "300px"}
  })


</script>
<template>
  <div class="flex justify-center mt-15">
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      :style="chartStyle"
    />
  </div>
    
  </template>
  