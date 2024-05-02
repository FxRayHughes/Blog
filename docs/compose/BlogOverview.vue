<template>
  <a-flex gap="middle">
    <span title="作者">
      <UserOutlined/> 枫溪
    </span>
    <span title="文章最后更新日期">
      <ClockCircleOutlined/> {{ timestampToTime(router.route.data.lastUpdated) }}
    </span>
  </a-flex>
  <a-flex style="margin-top: 20px">
    <a-tag v-for="item in router.route.data.frontmatter.categories"
           :key="item" :color="getTagColor(item)">
      {{ item }}
    </a-tag>
  </a-flex>
</template>

<script lang="ts" setup>
import {UserOutlined, ClockCircleOutlined} from "@ant-design/icons-vue";
import {useRouter} from "vitepress";
import {tagsStore} from "../store/TagsStore";

let tagStoreObj = tagsStore();
let router = useRouter();

function getTagColor(tag: string): string {
  return tagStoreObj.values.find((item) => item.value === tag)?.key || 'default';
}

// 时间戳转日期
function timestampToTime(timestamp: number) {
  let date = new Date(timestamp);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y + M + D + h + m + s;
}

</script>

<style scoped>

</style>
