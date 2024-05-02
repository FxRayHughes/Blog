# 快速开始

## 须知

由于 SpringBoot 要对你的类进行扫描 所以你无法直接使用仓库中的项目 你需要先clone到本地然后进行操作

## 安装

### 克隆代码

```shell
git clone https://github.com/Bukkit-Spring/Spring-Api.git
```

::: details 为什么我要直接克隆代码?

1. 本框架已经稳定运行 几乎不需要我们进行修改
2. 这样更方便使用者团队的二次开发
3. 无需担心开源协议 本项目是 MIT 协议

:::

### 修改配置

首先 我们假定一个场景，我们的项目包目录为 `com.bukkitspring.xxx` xxx为子项目名

<br/>

#### 1. 修改 SpringBoot 启动类

```java {4}

@EnableCaching
@EnableAspectJAutoProxy(exposeProxy = true)
@SpringBootApplication(scanBasePackages = {"com.ning", "com.bukkitspring", "top.maplex"})
public class SpringLoader {
    // ...
}


```

> 加入我们的 `com.bukkitspring` 包前缀，这样 SpringBoot 才能扫描到我们的类

<br/>

#### 2. 注册资源查找器

`com.ning.spring.classloader.RySpringClassLoader`

```java {5}
public class RySpringClassLoader extends URLClassLoader {
    @Override
    public Enumeration<URL> getResources(String name) throws IOException {
        List<Enumeration<URL>> list = new ArrayList<>();
        boolean isScanPackage = "com/bukkitspring/".equalsIgnoreCase(name) || "com/ning/".equalsIgnoreCase(name) || "aosuo/ning/".equalsIgnoreCase(name);
        // ...
    }
}
```

> 照着这个格式抄写就可以了 `"com/bukkitspring/".equalsIgnoreCase(name) || `

<br/>

#### 3. 修改配置文件

`spring.yml`

::: details 配置文件比较长 折叠了一下
```yaml {9,30-33,52-54,61-63}
# Mybatis-Plus配置
mybatis-plus:
  global-config:
    banner: false
    db-config:
      id-type: assign_id
      table-underline: true
  # Mybatis-Plus Mapper扫描路径
  mapper-locations: classpath*:com/ning/**/xml/*Mapper.xml,classpath*:aosuo/ning/**/xml/*Mapper.xml
pagehelper:
  helper-dialect: mysql
  reasonable: true
# Spring配置
spring:
  # 多数据源配置
  datasource:
    # 默认数据源
    default:
      driver-class-name: com.mysql.jdbc.Driver
      hikari:
        auto-commit: true
        connection-test-query: SELECT 1
        connection-timeout: 30000
        idle-timeout: 600000
        max-lifetime: 1800000
        maximum-pool-size: 80
        minimum-idle: 20
        pool-name: DataSourceHikariCP1
        register-mbeans: true
      jdbc-url: jdbc:mysql://yh.mu2n.com:3306/rpg?useUnicode=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&useSSL=false&autoReconnect=true&failOverReadOnly=false
      password: ''
      type: com.zaxxer.hikari.HikariDataSource
      username: root
    # 额外拓展数据源
    playerdata:
      driver-class-name: com.mysql.jdbc.Driver
      hikari:
        auto-commit: true
        connection-test-query: SELECT 1
        connection-timeout: 30000
        idle-timeout: 600000
        max-lifetime: 1800000
        maximum-pool-size: 80
        minimum-idle: 20
        pool-name: DataSourceHikariCP2
        register-mbeans: true
      jdbc-url: jdbc:mysql://yh.mu2n.com:3306/player_data?useUnicode=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&useSSL=false&autoReconnect=true&failOverReadOnly=false
      password: ''
      type: com.zaxxer.hikari.HikariDataSource
      username: root
  # Redis 配置
  redis:
    database: 15
    host: 127.0.0.1
    lettuce:
      pool:
        max-active: 200
        max-idle: 80
        max-wait: 30000ms
        min-idle: 50
    password: ''
    port: 6379
    timeout: 5000ms

```
:::

<br/>

#### 4. 打包 - 运行文件

我们要修改一下 `pom.xml`

1. 注释掉 maven 打包插件中的`maven-assembly-plugin`, 只留前面两个
```xml {14-17}
<project>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <!-- 省略了详细的内容 -->
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <!-- 省略了详细的内容 -->
            </plugin>
<!--                        <plugin>-->
<!--                            <artifactId>maven-assembly-plugin</artifactId>-->
<!--                            <version>2.2-beta-5</version>-->
<!--                             省略了详细的内容 -->
        </plugins>
    </build>
</project>
```

2. 执行 `mvn clean package` 打包

3. 将打包出的 **Spring-1.0.0-RELEASE.jar** 与 **Spring-Api 文件夹**, 共同放入服务器插件目录下, 并启动服务器即可
>  默认配置文件无任何配置信息 启动会报错 尚未配置数据库连接信息
>  数据库内容请点击左侧查看

<br/>

#### 5. 打包 - 开发依赖

1. 注释掉 maven 打包插件中的前两个, 只留最后一个(maven-assembly-plugin)
```xml {5-14}

<project>
    <build>
        <plugins>
            <!--            <plugin>-->
            <!--                <groupId>org.apache.maven.plugins</groupId>-->
            <!--                <artifactId>maven-dependency-plugin</artifactId>-->
            <!--                             省略了详细的内容 -->
            <!--            </plugin>-->
            <!--            <plugin>-->
            <!--                <groupId>org.apache.maven.plugins</groupId>-->
            <!--                <artifactId>maven-jar-plugin</artifactId>-->
            <!--                             省略了详细的内容 -->
            <!--            </plugin>-->

            <plugin>
                <artifactId>maven-assembly-plugin</artifactId>
                <version>2.2-beta-5</version>
                <configuration>
                    <descriptorRefs>
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

2. 执行 `mvn clean assembly:assembly` 打包

3. 将打包出的 **Spring-1.0.0-RELEASE-jar-with-dependencies.jar** 作为开发依赖即可

## 评论
<br/>

<comments/>

<script setup>

import Comments from '../../compose/Comments.vue'

</script>