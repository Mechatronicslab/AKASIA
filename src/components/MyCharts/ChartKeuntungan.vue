<template>
  <Bar :data="data" :height="150" />
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  components: {
    Bar,
  },
  props: {
    label: {
      type: Array,
      default: null,
    },
    value: {
      type: Array,
      default: null,
    },
    year: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      data: {
        labels: this.label,
        datasets: [
          {
            label: `Data ${this.title} Tahun ${this.year}`,
            backgroundColor: ["#1976D2", "#1976D2"],
            borderRadius: 6,
            data: this.value,
            maxBarThickness: 100,
            minBarLength: 10,
          },
        ],
      },
    };
  },
};
</script>
