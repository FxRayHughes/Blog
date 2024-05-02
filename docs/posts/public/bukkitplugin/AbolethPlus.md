---
title: AbolethPlus - 全新的变量管理系统
date: 2023-09-05 08:53:43
categories:
  - "插件"
  - "付费"
---
# AbolethPlus - 全新的变量管理系统
<blog-overview></blog-overview>

> [!CAUTION]
> AbolethPlus目前维护并不积极。
> 已暂停对外出售。

## 定价

*价格为 128 人民币*

[活动列表 你可以选择下面的一个活动 进行参与 不可重叠]

#### 双人成行

和小伙伴一起购买 两个人共花费 198元 (立省58)

#### FShop捆绑包

购买 Fshop I 的用户可以享受 **9** 折优惠

购买 Fshop II 的用户可以享受 **7.5** 折优惠

## 介绍

这是一个 基于ORM 架构的 积分系统 支持复杂的查询与管理 排序 默认值 过期时间等功能

是基于 Aboleth1.0 的完全重构 但是向下兼容Aboleth1.0

关于性能与效率 可以达到 **500w** 条数据 **46ms** 查询速度 （1tick = 300ms）

具体查看开发日志 （本网站 右上角寻找）

可以满足绝大多数服务器与开发者的需求

可以实现 全局变量 与 个人变量

## 指令

![指令列表](/img/blog/image-20230906155920200.png)

主要唤起指令是  /abolethplus 也可以使用别名 /abp

子指令也可以通过全程和别名进行唤醒 /abolethplusedit 可以简写为/abpe

+ /abpe 修改
+ /abps 查询与排序
+ /abpg 设置变量编组
+ /abpd 设置变量默认值

### 修改 /abpe

![abpe](/img/blog/image-20230906160302778.png)

+ set <变量名> <变量值> <目标>

> 设置变量

+ getAll <目标>

> 获取某个目标的全部变量

+ get <变量名> <目标>

> 获取某个目标的某个变量

+ edit <目标> <变量名> <动作> <值> <过期时间>

> 修改目标变量的值 允许不填写过期时间
>
> ![edit](/img/blog/image-20230906160508684.png)
>
> 可以使用这里面的所有动作(有补全)
>
> 过期时间写法:
>
> ![time](/img/blog/image-20230906160541858.png)
>
> 例如 2d3h4s 或 2s 或 5天

+ overTime <目标> <变量名> <过期时间>

> 设置过期时间

+ removeAll <目标>

> 删除某个人的所有变量

+ removeKey <变量名>

> 删除所有人的某个变量

+ ed <语法>

> Abolethplus 标准化语法 EditED
>
> 看下面的介绍

### 默认值 /abpd

![abpd](/img/blog/image-20230906160330443.png)

+ get <变量名>

> 获取某个变量的默认值

+ getAll

> 获取所有变量的默认值

+ set <变量名> <默认值>

> 设置某个变量的默认值

+ remove <变量名>

> 删除某个变量的默认值

### 查询 /abps

![abps](/img/blog/image-20230906160347588.png)

+ get <目标> <变量名>

> 获取某个变量名

+ group <目标>

> 根据group索引目标的所有变量

+ sort <变量名> [可选 <正序/倒序>] [可选<获取多少名>]

> 获取变量排行榜



### 关于全局变量

插件抽象了个玩家 叫做 BukkitServer 别名 server （已封禁这两个玩家ID）

对这两个ID进行操作即可操作全局变量 相当于是操作服务器的变量



## AbolethPlusEditED 语法

这是AbolethPlus 内聚的一种写法 应用于 Task 与 edit ed 命令

![Edit ED](/img/blog/image-20230906161055169.png)

### 参数介绍

1. target [ t , T , target , id ] 变量持有者 指令模式下 不填写默认为指令触发者
2. message [ message , msg , Message , Msg , m , M] 是否显示提示
3. key [ key , k , Key , K ] 变量名
4. value [ value , Value , v , V ] 变量值 不填为删除变量
5. overTime [ overTime , overtime , o , O ] 过期时间 格式 为 1d2h3m4s
6. mark [ mark , m , Mark , M ] 在log中的操作备注
7. action [ action , a , Action , A ] 动作 参考指令部分

### 用法参考

#### 删除变量

`-key Key`

当 value 为空时 就删除了变量

#### 设置与新增

`-k 变量名 -v 值`

当 value 不等于空的时候 那么久设置这个变量的值

#### 给操作增加备注

`-key 变量名 -v 值 -m 一条备注`

这会在你的数据库中进行体现

#### 让数据 +1

`-k 变量名 -v 1 -a +`

action 为 + 可以参考指令模块

#### 设置过期时间

`-k 变量名 -o 1d`

设置变量一天后过期



## 操作日志

你的所有 操作 除了get 外 都会进行记录

可以用第三方数据库查看工具进行查看

![sql](/img/blog/image-20230906162440393.png)



## 调度器

继承了 1.0 的所有设计思路 然后配合 **企业级** 任务调度器框架 - **quartz**

进行的高精度高性能调度器 咱们要玩就玩真的 直接上企业级框架捏

> 框架使用动态加载形式 在开启服务器时下载

## 每日刷新

也是调度器的一种使用方式 但是给抽离出来了 单独封装好提供给用户使用
只需要在配置文件 `update.yml` 里面书写 K:Value 就可以啦
```yaml
体力: 200
```
如此简单 然后就会进行刷新？
其实刷新的说法并不准确 实际上是一个调度器 然后每秒去判断玩家的 Update_Key 变量时间
不等于当日就进行刷新

### 用法?

只需要在 task/ 目录下创建一个 yaml 支持多yaml与嵌套

```yaml
TaskPlayer:
  group: 'default'
  type: 'command'
  cron: "0/5 * * * * ?"
  action:
    - "say Hello <target.name>"

```

### 类型

##### online

全体在线玩家没有就不执行 支持变量<target.name> <target.uuid> action语法: kether 

##### online ed

全体在线 支持变量<target.name> <target.uuid> action语法: aboEdit的 abpe ed 语法

##### all

全体用户 包括离线 语法 aboEdit的 abpe ed 语法

##### server

服务器 语法 aboEdit的 abpe ed 语法

##### command

服务器执行命令

##### kether

执行kether 如果有玩家会选取一个玩家作为载体 没有就不执行

##### player

当玩家进入游戏后 增加一个跟随的调度器 玩家离开后 调度器 结束  语法：Kether

注：player模式下 cron位置填写 tick 

进入游戏后 延迟 tick 然后触发一次 然后接下来 按照这个频率进行周期调度

调度为同步调度 无异步操作



### Cron 时间区间

采用了 标准的 cron 区间写法 让你可以100% 达到想要的需求

编辑器 https://cron.qqe2.com/

介绍 https://juejin.cn/post/7262982840019124284

使用 cron 表达式 你可以做到 每分钟 每个工作日的十二点的第一分钟 等等具体操作

### action 动作

根据 type类型 选择在 kether edited command 中选择

<target.uuid> 代表了执行者的UUID

<target.name> 代表了执行者的name



## papi变量

本次直接弃用简单版本的Papi变量 使用灵活的 变量模式

速记: %abp_get% 与 %abp_sort%

### 参数与缩写

本次增加了大量的参数别名

你可以使用参数的 首字母 大写或缩写

> 例外： Default 与 Desc的缩写 是 D = default dc = desc

+ key
+ default
+ format
+ type
+ desc

比如 Key 可以缩写为 K k

注意 Id无法使用缩写 Type中的参数也无法缩写

### 获取 - get

> 后面写参数即可 如果遇到不可以写空格的场景使用 `<r>`即可代替空格

例如 查询玩家 Ray_Hughes 的 TEST 变量

%abp_get -id Ray_Hughes -key TEST%

也可以使用缩写

%abp_get -id Ray_Hughes -k TEST%

不写空格可以用 以下方式

`%abp_get<r>-id<r>Ray_Hughes<r>-k<r>TEST% `

具体参数如下:

#### 参数

0. id 变量的持有者 不填为变量获取者
1. key (必填) 变量名
2. default 默认值 为空返回默认值 默认为 ""
3. format 格式 当Type = Value时 代表小数格式 当 Type = time时 表示时间格式
4. type 返回值格式 可选 time / value 不填默认为 value

#### 例子

%abp_get -k TEST -t time -f YYY-SSS%

%abp_get -k TEST -f ##.###%

### 排序 - Sort

获取变量排行榜

```
%abp_sort -key Key -limit 10 -desc true -def Def -type User/Value%
```

#### 参数

1. key (必填) 变量名
2. default 默认值 为空返回默认值 默认为 ""
3. limit 获取第几名
4. type 返回值类型 value / user 默认为 value

### 求和 - sum

求全服玩家某个变量的和

```
%abp_sum -key Key -format #.00%
```

#### 参数

1. key (必填) 变量名
2. format 格式 小数格式


#### 获取调度器时间

> %abp_task -id TaskPlayer -format yyyy-MM-dd_hh:mm:ss -type next/last%

获取调度器的上一次时间 与下一次时间 可以自定义格式



## Kether (@嘿鹰)

### 编辑变量

公有语句: **abolethplusedit** (别名: **abpe**) 

* abpe 变量名 (操作符) 变量值 [可选: @ (sever|玩家ID)] [可选: mark "操作记录"]

1. 编辑 玩家 / server 变量

> ```
> abpe key = value @ server           			-> 设
> abpe key + value @ otherPlayerID mark ""     	-> 加
> abpe key - value mark ""     					-> 减
> abpe key * value      							-> 乘
> abpe key / value      							-> 除
> ```

2. 删除 玩家 / server 变量

> ```
> abpe key ~ val @ server
> abpe key ~ val @ otherPlayerID
> abpe key ~ val
> ```

3. 编辑 / 删除 变量名 的默认值

> ```
> abpe key ~ def			-> 删除 key 的全局默认值
> abpe key def value		-> 设置 key 的全局默认值为 value
> ```

### 获取变量

公有语句: **abolethplusget** (别名: **abpg**) 

* abpg {action} [def [{action}]] [@ (server|ID)]

1. 获取 玩家 / server 变量值

> ```
> abpg key @ server
> abpg key def value @ server
> abpg key @ otherPlayerID
> abpg key def value @ otherPlayerID
> abpg key
> abpg key def value
> ```

2. 获取 变量名 的默认值

> ```
> abpg key def
> ```



## API

如何基于AbolethPlus 开发附属呢？

### 自己用

直接引入AbolethPlus.jar 本体即可

入口为 AbolethPlusAPI 也可以使用一些复杂的自定义操作 入口为 AbolethDao



### 发布公开插件？

你需要使用通用接口 AbolethAdder.jar http://maplefx.top:6520/s/m4akpl

引用这个插件作为依赖进行开发 让你的用户也装配这个插件即可~

使用AbolethAdder开发插件 方便你我 方便社区~



额外说明 当你使用Get 获取到 AbolethDtoAdp 对象的时候

你可以使用 AbolethDtoAdp内置的 setValue / setOverTime 方法 这会**被动**更新这个数据库 这也是**ORM**设计的一种体现





## 从1.0迁移到2.0

把大象放入冰箱要几步？

1. 卸载服务器的Aboleth插件
2. 下载 Aboleth-接收器版本 http://maplefx.top:6520/s/6jkfj6
3. 把 Aboleth-接收器版本 与 AbolethPlus 一起放入服务器中
4. 开启服务器
5. 输入/aboleth toUp
6. 检查数据库
7. 完成



## 评论

<br/>

<comments></comments>

<script setup>

import Comments from '../../../compose/Comments.vue';
import BlogOverview from '../../../compose/BlogOverview.vue';

</script>
