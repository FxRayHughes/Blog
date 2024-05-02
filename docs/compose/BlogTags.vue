<template>
  <div>
    <a-tag v-for="item in tagData"
           :key="item.key"
           :color="item.key"
           v-show="hasTag(item.value)"
    >{{ item.value }}
    </a-tag>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'

const tagData = [
  {key: "#ee7959", value: "插件"},
  {key: "#ecd452", value: "付费"},
  {key: "#a9be7b", value: "免费"},
  {key: "#5aa4ae", value: "杂谈"},
  {key: "#32788a", value: "教程"},
]

let props = defineProps({
  tags: {
    type: Array,
    required: true,
    default: []
  }
});

function hasTag(tag: string): boolean {
  for (let tag1 of props.tags) {
    if (tag1 == tag) {
      return true;
    }
  }
  return false;
}

</script>

<style scoped>

</style>
