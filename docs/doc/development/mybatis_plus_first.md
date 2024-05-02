# 设置 MybatisPlus

## 什么是 MybatisPlus?

MybatisPlus 是一个 Mybatis 的增强工具，它在 Mybatis 的基础上进行了扩展，简化了开发，提高了开发效率。

利用 MybatisPlus，我们可以使用注解来开发 Mapper、Service、Entity，而不再需要使用传统的 JDBC。

来实现你的 **ORM** 开发!

## 如何使用 MybatisPlus?

1. 注册数据源 (可选)
2. 注册 Mapper 扫描类 (**必选**)
3. 注册 Mapper XML 文件 (可选)

> 不想注册数据源的话，可以直接使用默认的数据源 提供了 default 和 playerdata 两个数据源

## 注册数据源

### 1. 注册数据源枚举

`com.ning.spring.configuration.datasource.DataSourceType`

```java {5}

@Getter
public enum DataSourceType {
    DEFAULT_DATASOURCE("default", "默认数据库"),
    PLAYER_DATASOURCE("playerdata", "玩家数据库"),
    GUGU_DATASOURCE("gugu", "咕咕数据库"),
}
```

> 你可以根据你的需求添加更多的数据源 这里 gugu 就是我增加的数据源

<br/>

### 2. 修改 MybatisPlus 配置

`com.ning.spring.configuration.MybatisPlusConfiguration`

```java {3,8-14,19,32}

@Configuration
@MapperScan(value = {"com.ning.**.mapper*", "aosuo.ning.**.mapper*", "top.maplex.**.mapper*", "top.maplex.**.*Mapper"})
public class MybatisPlusConfiguration {
    @Resource
    private Environment env;

    @Bean(name = "guguDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.gugu")
    public DataSource guguDataSource() {
        HikariDataSource dataSource = (HikariDataSource) DataSourceBuilder.create(Main.getLoader()).build();
        initHikariConfig(dataSource, "spring.datasource.gugu");
        return dataSource;
    }

    @Bean(name = "dynamicDataSource")
    public DynamicDataSource dataSource(@Qualifier("defaultDataSource") DataSource defaultDataSource,
                                        @Qualifier("playerDataSource") DataSource playerDataSource,
                                        @Qualifier("guguDataSource") DataSource guguDataSource
    ) {
        // ...
        return dynamicDataSource;
    }

    @Bean(name = "sqlSessionFactory")
    public SqlSessionFactory sqlSessionFactory(@Qualifier("dynamicDataSource") DynamicDataSource dynamicDataSource, @Qualifier("mpConfig") GlobalConfig config) throws Exception {
        // ...
        try {
            List<String> mappers = new ArrayList<>();
            mappers.add("classpath*:com/ning/**/xml/*Mapper.xml");
            mappers.add("classpath*:aosuo/ning/**/xml/*Mapper.xml");
            mappers.add("classpath*:top/maplex/**/xml/*Mapper.xml");
            // ...
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return sqlSessionFactoryBean.getObject();
    }
}
```

### 3. 更改spring.yml配置文件

```yaml {9}
# Mybatis-Plus配置
mybatis-plus:
  global-config:
    banner: false
    db-config:
      id-type: assign_id
      table-underline: true
  # Mybatis-Plus Mapper扫描路径
  mapper-locations: classpath*:com/ning/**/xml/*Mapper.xml,classpath*:aosuo/ning/**/xml/*Mapper.xml
```

> 这里的 `com.ning` `aosuo.ning` `top.maplex` 是我项目的包名 需要根据你的项目包名进行修改

## 多数据源切换

这部分 仅提供 Kotlin的解决方案 Java方案需要自行开发
见目录 **拓展 -> 数据源选择**

## 评论

<br/>

<comments/>

<script setup>

import Comments from '../../compose/Comments.vue'

</script>