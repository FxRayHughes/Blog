<script setup>
import {ref} from "../.vitepress/cache/deps/vue.js";

const data = ref({
  "token": {
    "colorPrimary": "#2e59a7",
    "fontSize": 13,
    "borderRadius": 2,
    "colorSuccess": "#4f794a",
    "colorWarning": "#fac03d",
    "colorError": "#c8161d",
    "colorInfo": "#007175",
    "wireframe": true
  }
})

</script>

<template>
  <a-config-provider
      :theme="data"
  ></a-config-provider>
</template>

<style scoped>

</style>
