<template>
  <a-flex id="side_flex" gap="large" vertical justify="center">
    <a-card hoverable :bodyStyle="contentStyle">
      <div style="transform: translateX(23%)">
        <a-avatar draggable="'false'" id="avatar" :size="128" src="/my_avatar.png"/>
      </div>
      <div style="margin-top:8px;transform: translateX(40%)">
        <span> 枫 溪 </span>
      </div>
      <a-divider/>
      <a-row>
        <a-col :flex="3">
        </a-col>
        <a-col :flex="2">
          <a-statistic title="博客文章" :value="posts.length" style="margin-right: 50px"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card :bodyStyle="contentStyle" title="标签列表" >
      <a-tag class="tag_css" v-for="item in tagStoreObj.values" :color="item.key">{{ item.value }}</a-tag>
    </a-card>
  </a-flex>
</template>

<script lang="ts" setup>
import type {CSSProperties} from 'vue';
import {data as posts} from '../data/list.data.ts'
import {tagsStore} from "../store/TagsStore";

const tagStoreObj = tagsStore()


const contentStyle: CSSProperties = {
  flex: "content"
};
</script>

<style scoped>
#avatar:hover {
  transform: rotate(233turn) !important;
  transition-duration: 59s !important;
}

.tag_css {
  margin-bottom: 5px;
}

.tag_css:hover {
  border-color: transparent;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  transform: scale(1.1);
  transition-duration: 0.3s;
}
</style>
