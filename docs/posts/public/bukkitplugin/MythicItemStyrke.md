---
title: MythicItemStyrke - MM & SI 增强插件
date: 2023-08-23 12:26:22
categories:
  - "插件"
  - "免费"
---

# MythicItemStyrke
<blog-overview></blog-overview>

## 前言

项目主要是为了方便 MythicMobs的Item功能 与 SX-Item功能的使用

减少三方lore识别插件对服务器的迫害

## 功能说明

监听事件 对MM 与 SX-Item的物品进行反馈

### 指令

/ic run 物品名 玩家名(可选)

/ic take [SI/MM] 物品名 数量 玩家名(可选)

### PAPI变量

Type: SI 或 MM

判断玩家有没有这么多物品

> %mxi_hasItem::type::物品ID::数量% => boolen

判断玩家有多少这个物品

> %mxi_getItem::type::物品ID% => amount

获取物品的名称

> %mxi_getItemName::物品ID% => displayname

### 全局配置

```yaml
#触发周期
period: 200
#全身的定义是 slot的槽位 + 主手 + 副手 + 龙核槽位
Slot:
  - 36
  - 37
  - 38
  - 39
  - 40
#龙核的槽位
DSlot:
  - "测试槽位"
#是否开启
DSlot-Enable: false
```

### 配置写法

由于都是**寄生**在MythicMobs 和 SX-Item 中的

所以以下内容都是写在mm/sxitem物品配置里的

```yaml
工具_便携末影箱:
  Id: WARPED_SIGN
  Display: '&7 便携工具 [&f 末影箱&7]'
  Lore:
    - " "
    - "&8 右键打开末影箱"
  natur: true
  Styrke:
    cooldown:
      # 感谢 炼金师853193857
      # 需使用Abo插件作为前置 支持跨服冷却
      # https://xv5zac7cto.feishu.cn/docx/doxcnP4k0XN7IK7pcugdodQlJLh
      # 占用ID为 MICD::测试组
      enable: true
      group: "测试组"
      time: 5000 #单位ms
      message: "&c你还需要等待 &e{Time} &c秒才能使用 支持papi"
      actionbar: false
      # 冷却挂钩到MythicMobs的Skill中
      # 启用此功能后冷却不由abo控制
      # 本功能由 Tom.Bs 赞助
      mythic: "测试技能"
      # 是否启用本地冷却
      local: false
      # 优先级：mm > local > abo
      # mm 默认null local 默认false abo默认 false
    setting:
      place: false
      consume: 1
      hand: true
    food:
      add: 10
    action:
      onRightClick:
        - 'command *"ec" as op'
      onCommand:
        - 'random: 2'
        - '10 | command "这条命令的权重是10"'
        #(输出结果为重复两次的 上面这条命令)
        #更多动作查看 https://kether.tabooproject.org/
      onKeyRelease:
        #这里是具体看龙核写法
        key:
          - "Q"
          - "C"
        action:
          - "command ******"
```

### 细节解读

#### Setting

| 键       | 值                | 默认值  |
|---------|------------------|------|
| place   | 是否可放置在地上         | true |
| consume | 右键后扣除的数量         | 0    |
| food    | 增加多少饱食度          | 0    |
| hand    | 在龙核按键中 是否只判断手中物品 | true |

#### Action

| 动作名                 | 效果             | 可否取消 | 触发位置 |
|---------------------|----------------|------|------|
| onBlockBreak        | 使用该物品破坏方块触发    | 是    |      |
| onBlockPlace        | 尝试放置该物品时触发     | 是    |      |
| onTimer             | 每200tick触发一次   | 否    | 全身   |
| onItemBreak         | 物品损坏时触发        | 否    |      |
| onItemConsume       | 物品消耗时触发        | 是    |      |
| onPickUp            | 捡起物品时触发        | 是    |      |
| onDrop              | 丢弃物品时触发        | 是    |      |
| onSwapToOffhand     | 切换助手物品到副手触发    | 是    |      |
| onSwapToMainHand    | 切换副手物品到主手触发    | 是    |      |
| onStyrkeClickAll    | 点击就触发          | 是    |      |
| onLeftClick         | 左键触发           | 是    |      |
| onRightClick        | 右键触发           | 是    |      |
| onStyrkeClick       | 除左右键以外其他方式点击触发 | 是    |      |
| onCommand           | 通过 ic run 进行触发 |      |      |
| onSprint            | 切换疾跑时触发        | 否    | 全身   |
| onKeyRelease \[龙核\] | 按键抬起执行         | 是    | 全身   |

#### 拓展写法 随机

```yaml
  natur: true
  Styrke:
    action:
      onStyrkeClickAll:
        - 'random: 2'
        - '20 | tell color "B"'
        - '20 | tell color "A"'
        - '20 | tell color "C"'
        - '20 | tell color "D"'
```

random: 2 抽取两条

20 | 内容

20是权重

### ItemsAdderHook
物品里这样写 材质就会替换为 ItemsAdder
```yaml
工具_便携末影箱:
  Id: WARPED_SIGN
  Display: '&7 便携工具 [&f 末影箱&7]'
  Lore:
  - " "
  - "&8 右键打开末影箱"
  ItemsAdder: "test:item"
```
好处是 很稳健 只要内部ID不变 外部ID随便去变换

#### 冷却

```text
感谢 炼金师853193857 和 Tom.Bs  赞助
优先级：mm > local > abo
mm 默认null local 默认false abo默认 false
```

```yaml
  Styrke:
    cooldown:
      # 感谢 炼金师853193857
      # 需使用Abo插件作为前置 支持跨服冷却
      # https://xv5zac7cto.feishu.cn/docx/doxcnP4k0XN7IK7pcugdodQlJLh
      # 占用ID为 MICD::测试组
      enable: true
      group: "测试组"
      time: 5000 #单位ms
      message: "&c你还需要等待 &e{Time} &c秒才能使用 支持papi"
      actionbar: false
      # 冷却挂钩到MythicMobs的Skill中
      # 启用此功能后冷却不由abo控制
      # 本功能由 Tom.Bs 赞助
      mythic: "测试技能"
      # 是否启用本地冷却
      local: false
      # 优先级：mm > local > abo
      # mm 默认null local 默认false abo默认 false
```

## 获取

#### 下载地址: [点击跳转](https://xv5zac7cto.feishu.cn/docx/doxcnrlksuQlxSCSqVTdPMyVkCg)

#### Github: https://github.com/FxRayHughes/MythicItemStyrke

*部分代码创意来自: https://github.com/TabooLib/zaphkiel*

#### Kether脚本 https://kether.tabooproject.org/


## 评论

<br/>

<comments></comments>

<script setup>

import Comments from '../../../compose/Comments.vue';
import BlogOverview from '../../../compose/BlogOverview.vue';

</script>
