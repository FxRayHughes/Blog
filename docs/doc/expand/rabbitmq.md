# RabbitMQ 订阅与发布消息

## RabbitMQ 是什么?

RabbitMQ 是一个开源的消息队列中间件，用于在分布式系统中传递和存储消息。
它实现了高级消息队列协议（AMQP）标准，提供了可靠的消息传递机制，用于解耦应用程序的不同组件之间的通信。

## 如何使用

```kotlin
object MyObject {

    // 发送消息
    fun messagePushDemo(){
        sendServerMessage(channelName = "test", "Hello, world!")
    }

    @Awake(LifeCycle.ENABLE)
    fun onEnable(){
        //开启服务器注册channel监听通道
        registerServerMessageListener("test"){
            println(it)
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