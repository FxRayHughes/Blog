# 基于 Redisson 的全局锁

## 什么是全局锁

在 Bukkit 开发中 你可能要经常考虑一个问题 ，如何保证多个区服的数据一致性。这时候就需要用到全局锁。

全局锁是一种分布式锁，它可以保证在多个服务器上的多个线程同时访问一个共享资源时，只有一个线程可以访问，其他线程需要等待。

## 如何使用

我们提供了三种模式 `单锁` `多锁` `公平锁` 你可以根据自己的需求选择

```kotlin
object MyObject {

    fun redissonDemo() {
        // 单锁
        rlock("lock_name") {

        }
        // 多锁
        rlockMulti("lock1", "lock2") {

        }
        // 公平锁
        rlockFair("lock_name") {

        }
    }

}
```

## 评论

<br/>

<comments/>

<script setup>

import Comments from '../../compose/Comments.vue'

</script>