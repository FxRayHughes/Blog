# 多数据源切换

> [!IMPORTANT]
> 本文依赖 Kotlin-Taboolib 拓展组件。

## 用法

只需要在需要操作的 行为 上进行注解 即可

对本 Service 类中 所有的方法都切换到此数据源
```kotlin
@Service
@SwitchDataSource(DataSourceType.PLAYER_DATASOURCE)
class PlayerDataService : ServiceImpl<PlayerDataMapper, PlayerData>(), IPlayerDataService {
}
```

对某方法进行切换
```kotlin
@Service
class PlayerDataService : ServiceImpl<PlayerDataMapper, PlayerData>(), IPlayerDataService {
    
    @SwitchDataSource(DataSourceType.PLAYER_DATASOURCE)
    override fun savePlayer(player: Player): PlayerData {
        // ..
    }
}
```

## 注解

```kotlin
/**
 * 切换数据源
 * 可用于class或具体方法上
 */
@Retention(AnnotationRetention.RUNTIME)
@Target(AnnotationTarget.FUNCTION, AnnotationTarget.CLASS)
annotation class SwitchDataSource(val type: DataSourceType)
```

## 评论

<br/>

<comments/>

<script setup>

import Comments from '../../compose/Comments.vue'

</script>