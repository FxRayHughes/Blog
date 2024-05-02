<script setup>
import { data as posts } from '../data/list.data.ts'

console.log(posts)

</script>

<template>
  <a-config-provider
      :theme="{
      token: {
          colorPrimary: '#2e59a7',
          fontSize: 14,
          borderRadius: 2,
          colorSuccess: '#4f794a',
          colorWarning: '#fac03d',
          colorError: '#c8161d',
          colorInfo: '#007175',
          wireframe: true
      }
    }"
  ></a-config-provider>
</template>

<style scoped>

</style>
