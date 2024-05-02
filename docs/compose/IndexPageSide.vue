<template>
  <a-flex id="side_flex" vertical justify="center">
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
  </a-flex>
</template>

<script lang="ts" setup>
import type {CSSProperties} from 'vue';
import {data as posts} from '../data/list.data.ts'


const contentStyle: CSSProperties = {
  flex: "content"
};
</script>

<style scoped>
#avatar:hover {
  transform: rotate(233turn) !important;
  transition-duration: 59s !important;
}
</style>
