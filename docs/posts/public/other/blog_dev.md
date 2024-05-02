---
title: RayBlog - 开发心得
date: 2024-5-2
categories:
  - "杂谈"
  - "前端"
---

# RayBlog - 开发心得

<blog-overview></blog-overview>

## 起因

为什么我要开发这个网站呢？ 那一定得谈谈 GiteePage 了，之前一直使用的是 GiteePage + Hexo 的模式也很方便。

但是难免出现很多局限性问题，框架限制的内容很多且不太容易更改。而且 Hexo 的主题也不太好找，而且我也不太会写主题。

趁着这次 GiteePage 下架的机会，我就想着自己写一个博客网站，这样就可以自由的更改网站的内容和样式了。

本次采用的技术栈是 VitePress + AntUI .

## 参考

不是没想过直接用别人的主题，但是一旦用了主题那么又提高了这个页面开发的学习成本。

今天是劳动节假日 我想着不去学习新的技术了，对最近学习的技术进行一下实践与巩固。

所以我仿照了 https://sugarat.top/ 粥里有勺糖 大佬的博客样式，进行设计。

## 关于配色

博客中的配色是来自于 "中国古典配色·二十四节气" 这个配色方案。

网站的风格就是素雅，所以配色也尽力是质朴，抛弃了所有的花哨的颜色。

## 开发

实际上 开发与 Vue3 页面开发无异，就是增加了一些 Markdown 的解析。

并且可以在 md 中使用 Vue3 的组件，这样就可以实现很多复杂的页面了。 比如下面的那个评论区。

## 评论

<br/>

<comments></comments>

<script setup>

import Comments from '../../../compose/Comments.vue';
import BlogOverview from '../../../compose/BlogOverview.vue';

</script>
