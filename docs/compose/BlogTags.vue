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
import {tagsStore} from '../store/TagsStore'
const tagStoreObj = tagsStore()
const tagData = tagStoreObj.values

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
