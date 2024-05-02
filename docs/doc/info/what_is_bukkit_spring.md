# BukkitSpring 是什么?

BukkitSpring 是一个 Bukkit 插件，融入了 SpringBoot ，使得你可以在 Bukkit 插件中使用 SpringBoot 的特性与生态。

## 使用场景

本项目定位是 **To B** 项目，面向的是各个服务器的**开发团队**。 为你的团队提供一个强有力的开发框架，
帮助你减少例如 MySQL Redis 等中间件带来的开发心智负担。

并且本项目可以完美兼容 TabooLib 并基于其特性进行拓展。

## 目前已整合的第三方框架 中间件 工具

  |    框架名称     |             项目地址              |        介绍         |                   备注                   |
  |:-----------:|:-----------------------------:|:-----------------:|:--------------------------------------:|
  |    Redis    |       https://redis.io/       |    提供了缓存与广播方案     |                                        |
  |  Redisson   |     https://redisson.pro/     |    高性能Redis客户端    |                                        |
  | MybatisPlus |     https://baomidou.com/     |    Mybatis增强工具    | 项目内提供为多数据源配置 如需动态切换需搭配Kotlin-Expansion |
  | PageHelper  | https://pagehelper.github.io/ | 对Mybatis查询的数据进行分页 |                                        |


## 开发体验

如果 你是一个从业于 Java 后端开发的**专业**开发者，那么你对 SpringBoot 一定不会陌生 在这里你可以获得到与 SpringBoot 一致的开发体验。

> 如果并无 SpringBoot 的开发经验 就请不要使用本框架 这会大大的增加你的开发负担

+ MybatisPlus: 使用注解开发 Mapper,Service,Entity 来实现你的 ORM 开发! 告别传统的JDBC
+ SpringCache: 利用注解来快捷的与 Redis 产生交互 对数据进行管理
...

还有更多! 剩下的就由你的团队 一起自定义吧。我们已经导入了常见的工具并封装。

如果团队有特殊需求可以**自行导入并管理** *(出现兼容问题BukkitSpring并不负主要责任无义务指导)*。

## 评论
<br/>

<comments/>

<script setup>

import Comments from '../../compose/Comments.vue'

</script>