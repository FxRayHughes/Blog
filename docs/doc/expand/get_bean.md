# 获取 Bean 实例

## 1. 通过 `@Autowired` 注解获取 Bean 对象

::: code-group

```kotlin [kotlin]
class MyService {
    @Autowired
    private lateinit var myDao: MyDao
}
```

```java [java]
public class MyService {
    @Autowired
    private MyDao myDao;
}
```

:::

## 2. 通过 `@Resource` 注解获取 Bean 对象

::: code-group

```kotlin [kotlin]
class MyService {
    @Resource
    private lateinit var myDao: MyDao
}
```

```java [java]
public class MyService {
    @Resource
    private MyDao myDao;
}
```

:::

## 3. 通过委托来实现

这个使用场景 多是在 Kotlin 的 object 中出现

```kotlin

object MyObject {
    val myDao: MyDao by SpringProxy
}

```

## 4. 通过 API 获取

::: code-group

```kotlin [kotlin]
class MyService {
    private val myDao by lazy { SpringApi.getBean(MyDao::class.java) }
}
```

```java [java]
public class MyService {
    private MyDao myDao = SpringApi.getBean(MyDao.class);
}
```

## 评论

<br/>

<comments/>

<script setup>

import Comments from '../../compose/Comments.vue'

</script>