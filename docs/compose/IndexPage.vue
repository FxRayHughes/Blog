<template>
  <div id="index_page">
    <a-flex vertical>
      <index-page-title></index-page-title>
      <a-layout id="layouts">
        <a-layout-content :style="contentStyle">
          <IndexPageList/>
        </a-layout-content>
        <a-layout-sider :style="siderStyle" width="300">
          <IndexPageSide/>
        </a-layout-sider>
      </a-layout>
    </a-flex>
  </div>
  <a-back-top />

</template>
<script lang="ts" setup>
import {LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons-vue';
import type {CSSProperties} from 'vue';
import IndexPageList from "./IndexPageList.vue";
import IndexPageTitle from "./IndexPageTitle.vue";
import IndexPageSide from "./IndexPageSide.vue";

const contentStyle: CSSProperties = {
  minHeight: 120,
  lineHeight: '120px',
  background: 'var(--vp-c-bg)',
};

const siderStyle: CSSProperties = {
  lineHeight: '120px',
  background: 'var(--vp-c-bg)',
  paddingTop: '1.5vh',
};

const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 10,
};
const actions: Record<string, any>[] = [
  {icon: StarOutlined, text: '156'},
  {icon: LikeOutlined, text: '156'},
  {icon: MessageOutlined, text: '2'},
];
</script>

<style scoped>
#index_page {
  padding-left: 5vw;
  padding-right: 5vw;
  padding-bottom: 7vw;
}

#layouts {
  padding-top: 5vh;
  padding-bottom: 80px;
  padding-right: 2vw;
  background: var(--vp-c-bg)
}

</style>
