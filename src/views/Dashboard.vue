<script setup>
import {ref,onMounted } from 'vue'
import AppLayout from './AppLayout.vue';
import { Chart } from 'chart.js/auto';

const chartCanvas = ref(null);
const chartData = {
      labels:['2005', '2006', '2007'],
      datasets: [
        {
          label: 'Deudas',
          backgroundColor: '#f87979',
          data: [10, 20, 30]
        },
        {
          label: 'Pagados',
          backgroundColor: '#22c55e',
          data: [32, 15, 26]
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: true
    };

  
    onMounted(() => {
  new Chart(chartCanvas.value, {
    type: 'bar',
    data: chartData,
    options: chartOptions
  });
});
</script>
<template>
    
    <AppLayout>
            <h1>Dashboard</h1>
            <div class="w-[550px]">
                <canvas  ref="chartCanvas"></canvas>
            </div>
            

    </AppLayout>
</template>