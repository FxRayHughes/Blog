# Mybatis-Plus DSL

## 什么是 Mybatis-Plus DSL

Mybatis-Plus DSL 是 我们 提供的一种更加方便的查询方式，可以通过DSL调用的方式来构建 SQL 语句。

分为两个版本:

1. 以 Mapper 为基础的 DSL
2. 以 Service 为基础的 DSL

## Mapper DSL

```kotlin
val list = yourMapper.query {
    this::objectId eq objectId
    order by ::createTime
    order bt "create_time" with asc
}.page(1, 10).list()
```

> 你可以通过 `this::` 来调用字段，通过 `order by` 来排序，通过 `page` 来分页

## Service DSL

> 写法基本和 Wrapper 一样，只是调用方式不同
::: code-group

```kotlin [查询单个]
fastSelectOne {
    eq("uuid", player.uniqueId.toString())
}
```

```kotlin [查询多个]
fastSelectList {
    eq("uuid", uuid)
}
```

```kotlin [更新或新增]
// 插入的内容
val playerMaterialEntity = PlayerMaterialEntity()
fastPutOrUpdate(playerMaterialEntity, {
    // 查询条件
    eq("uuid", player.uniqueId.toString())
    eq("item", item)
}, {
    // 更新内容
    eq("uuid", player.uniqueId.toString())
    eq("item", item)
    setSql("amount = amount + $amount")
})

```

:::

## 评论

<br/>

<comments/>

<script setup>

import Comments from '../../compose/Comments.vue'

</script>