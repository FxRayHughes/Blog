# IOC 容器的使用

## 什么是 IOC?

IOC 是 Inversion of Control（控制反转）的缩写。它是一种软件设计模式，用于解耦组件之间的依赖关系，并提高代码的可重用性和可测试性。

在传统的编程模型中，组件之间的依赖关系通常是硬编码在代码中的，这导致了高度耦合的系统。而 IOC 模式通过将控制权由组件自身转移到外部容器（通常称为
IOC 容器）来实现解耦。

在IOC模式中，组件不再负责自己的依赖关系的获取和管理，而是将这些责任委托给外部的 IOC
容器。组件只需要声明它所需要的依赖，而不需要关心如何获取这些依赖。容器负责创建组件的实例，并自动解析和注入依赖。

## IOC 容器的使用

举个例子 自动注册 Bukkit 的 **EventListener**

```java
public final class JavaExpansion extends JavaPlugin {

    @Override
    public void onEnable() {
        SpringApi.getApplicationContext().getBeansOfType(Listener.class).values().forEach(listener -> {
            getServer().getPluginManager().registerEvents(listener, this);
        });
    }

}
```

我们在这个例子中 使用了 `SpringApi.getApplicationContext().getBeansOfType(Listener.class)` 来获取所有实现了 `Listener`
接口的类，并将其注册为 Bukkit 的事件监听器。

## 评论
<br/>

<comments/>

<script setup>

import Comments from '../../compose/Comments.vue'

</script>