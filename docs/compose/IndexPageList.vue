<template>
  <a-list id="list" item-layout="vertical" size="default" :pagination="pagination" :data-source="listData">
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <a-card :body-style="cardStyle" :loading="loading" hoverable @click="pushTo(item.url)">
          <a-list-item-meta>
            <template #title>
              <a class="blog_title">{{ item.title }}</a>
            </template>
          </a-list-item-meta>
          <a style="color: #9aa7b1">{{ item.excerpt }}</a>

          <footer style="margin-top: 8px">枫溪 | {{ item.date.string }}</footer>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts" setup>
import {data as posts} from '../data/list.data.ts'
import {type CSSProperties, ref} from 'vue';
import {useRouter} from "vitepress";

let router = useRouter();
const cardStyle: CSSProperties = {
  background: 'var(--vp-c-bg)',
};
function pushTo(path: string) {
  router.go(path);
}

const loading = ref(true);

const handleClick = () => {
  loading.value = !loading.value;
};

setTimeout(() => {
  loading.value = false;
}, 500);

const listData: Record<any, any>[] = [];


for (let i = 0; i < posts.length; i++) {
  listData.push({
    title: posts[i].title,
    url: posts[i].url,
    excerpt: removeHtmlTags(posts[i].excerpt),
    date: posts[i].date,
  });
}


const pagination = ref({
  onChange: (page: number) => {
    console.log(page);
  },
  onShowSizeChange: (current: number, size: number) => {
    console.log(current, size);
    pagination.value.pageSize = size;
  },
  pageSize: 10,
});

function removeHtmlTags(text: string): string {
  const strippedText = text.replace(/<[^>]+>/g, '');

  // 去除其他标记符
  return strippedText.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}\[\]\\/]/g, '')
      .replace("ZeroWidthSpace", ",");
}
</script>
<style scoped>
.blog_title {
  font-size: 20px;
  font-weight: bold;
}

</style>
