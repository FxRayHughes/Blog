<template>

  <a-card id="nav-tags" title="文章列表">
    <a-flex>
      <a-input-search v-model:value="searchValue"
                      @search="onSearch"
                      placeholder="搜索文章标题"
                      style="width: 20vw; margin-bottom: 10px"/>
      <a-button :icon="h(RedoOutlined)" @click="onReset"></a-button>
    </a-flex>
    <a-table :columns="columns" :data-source="dataTable" @change="onChange" :custom-row="customRow">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'categories'">
        <span>
          <a-tag
              v-for="tag in record.categories"
              :key="tag"
              :color="getTagColor(tag)"
          >
            {{ tag }}
          </a-tag>
        </span>
        </template>
        <template v-else-if="column.key === 'date'">
          {{ record[column.key].string }}
        </template>
      </template>
    </a-table>
  </a-card>

</template>

<script lang="ts" setup>
import {RedoOutlined, StarFilled, StarTwoTone} from '@ant-design/icons-vue';
import {ref, h} from 'vue'
import type {TableColumnType, TableProps} from 'ant-design-vue';
import {data as posts} from '../data/list.data.ts'
import {tagsStore} from "../store/TagsStore";
import {useRouter} from "vitepress";

const tagStoreObj = tagsStore()
let router = useRouter();
const searchValue = ref<string>("");

function hasTag(tags: string[], tag: string): boolean {
  for (let tag1 of tags) {
    if (tag1 == tag) {
      return true;
    }
  }
  return false;
}

const customRow = (record: TableDataType) => {
  return {
    onClick: () => {
      router.go(record.url.replace(".html", ""));
    }
  };
};

function getTagColor(tag: string): string {
  return tagStoreObj.values.find((item) => item.value === tag)?.key || 'default';
}

type TableDataType = {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
  categories: string[]
};

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '标签',
    dataIndex: 'categories',
    key: 'categories',
    filters: tagStoreObj.values.map((item) => ({text: item.value, value: item.value})),
    onFilter: (value: string, record: TableDataType) => hasTag(record.categories, value),
  },
  {
    title: '发布日期',
    dataIndex: 'date',
    key: 'date',
    sorter: (a: TableDataType, b: TableDataType) => a.date.time - b.date.time,
  },
];

// const dataTable: TableDataType[] = posts as TableDataType[];
const dataTable = ref(posts as TableDataType[]);
const onChange: TableProps<TableDataType>['onChange'] = (pagination, filters, sorter) => {

};

function onSearch(value: string) {
  dataTable.value = posts.filter((item) => item.title.includes(value)) as TableDataType[];
}

function onReset() {
  searchValue.value = '';
  dataTable.value = posts as TableDataType[];
}
</script>

<style scoped>
#nav-tags {
  margin: 2vw 5vw;
}
</style>
