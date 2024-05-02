---
title: SX-Item - 专注于随机的物品管理系统
date: 2023-08-23 20:54:47
categories:
  - "插件"
  - "免费"
---

# SX-Item

## 前言

经历了 三四年的迭代 *(2018~至今)* 从 最初的 SX-Attribute2.0 迭代到 SX-Attribute 3.0
现在将SX-Attribute3.0的物品功能分离出来（重写）

1. 易用性
2. 快捷性
3. 自定义性
4. 多关联
5. 稳健性

> SX-Attribute用户请不要直接迁移物品库到SX-Item
> 两者之间拥有细微的差别

> 注：开发者均为专业开发者从事或学习软件行业

## 说用说明

### 基础用法

细节都在默认生成的配置文件中有体现

```yaml
Default-1:
  Name: <s:DefaultPrefix>&c炎之洗礼<s:DefaultSuffix> <s:<l:品质>Color><l:品质>
  ID: <l:<l:职业>ID>
  Lore:
    - '&6品质等级: <s:<l:品质>Color><l:品质>'
    - '<b:<l:品质>:优秀:史诗>&6限制职业: <l:职业>'
    - '&6物品类型: 主武器'
    - '&6限制等级: <c:int 10 * <s:<l:品质>基数>>级'
    - '&c攻击力: +<l:攻击力>'
    - '<l:攻一-10>'
    - '<l:攻二-10>'
    - '<l:攻三-10>'
    - '<l:材质>'
    - '<s:<l:品质>宝石孔>'
    #   - '&7耐久度: <c:int <r:300_350> * <s:<l:品质>基数>>/<c:int 400 * <s:<l:品质>基数>>'
    - '&7耐久度: <c:int <d:0.6_0.9> * <l:耐久度>>/<l:耐久度>'
    - '<b:<l:品质>:史诗>&c已绑定'
    - '&a到期时间: <t:10m>'
    #   - '&a到期时间: <t:600>'
    - '<b:<l:品质>:优秀:史诗>                                    '
    - '<b:<l:品质>:优秀:史诗><s:DefaultLore>'
  EnchantList:
    - <s:<l:职业>附魔>
  ClearAttribute: true
  Random:
    攻击力: <c:20 * <s:<l:品质>基数>>
    耐久度: <c:int <r:350_400> * <s:<l:品质>基数>>
  NBT:
    arg1.arg2: 测试NBT
    sx:
    attribute:
      - '词条一'
      - '词条二'
      - '词条三'
      - 'SX-Attribute预留属性接口'
      - '如需使用随机则需学习高等随机'
  ProtectNBT: #保护附魔NBT不被更新
    - "Enchantments"
```

### 随机节点

形如 <key:value> 格式

key是结构的类型

value是参与结构运行的内容

例如 <d:0.6_0.9> 实际上就是个小数随机 0.6~0.9之间的数 抽取一个

结构汇总：

| 名称     | Key | 例子                                 | 说明                        |
|--------|-----|------------------------------------|---------------------------|
| 整行判断   | b   | <b:匹配名:匹配词1:匹配词2:匹配词3:匹配词4>        |                           |
| 时间格式   | t   | <t:1Y1M1D1h1m1s>                   |                           |
| 计算器    | c   | <c:+6+> 或 <c:int 7+7.5>            | 使用压栈计算器实现                 |
| 锁定随机   | l   | <l:某个随机组>                          | 使用l:后同步此值                 |
| 一般随机   | s   | <s:某个随机组>                          | 使用s: 每次重新获取               |
| 小数随机   | d   | <d:0.6_0.9>                        |                           |
| 整数随机   | i   | <i:1_25565>                        |                           |
| 脚本随机   | j   | <j:script.eval#<l:品质>,<d:0.5_1.0>> | <j:文件名.方法名#参数>            |
| UUID随机 | u   | <u:random> 或 <u:文字>                | 生成一个完全随机的UUI或者根据字符串生成UUID |

> 注：如果在高版本使用 JS 需要使用 momojs 这种拓展库

### 随机组

#### 权重与概率

传统SX2.0写法:

```yaml
品质:
  - "普通"
  - "普通"
  - "优秀"
```

SXItem写法:

```yaml
品质:
  - 2: "普通"
  - 1: "优秀"
```

前面的数字 就是本条的权重

也可以使用js的形式

```javascript
function drawResult(docker, args) {
    const result = Math.random() < 0.333 ? '优秀' : '普通';
    return result;
}
```

<j:script.drawResult>

#### 多行随机

通常你可以这样写

```yaml
射手附魔:
  - - ARROW_DAMAGE:<r:0_2>
    - ARROW_INFINITE:<r:0_1>
  - - ARROW_DAMAGE:<r:0_2>
    - ARROW_FIRE:<r:0_2>
  - - ARROW_DAMAGE:<r:0_2>
    - DURABILITY:<r:0_1>
```

当然你也可以用 js

注意：因为脚本引擎限制 无法使用 [] 创建数组 请使用 Utils.mutableList();

```javascript
function subAttribute(docker, args) {
    var amount = args[0];
    var level = parseInt(args[1]);
    var mutab = parseFloat(args[2]);
    var def = level * 0.25 * mutab + 5;

    var lore = Utils.mutableList();
    for (var i = 1; i <= amount; i++) {
        var attr = docker.replace("<s:副属性>");
        var value = Utils.randomDouble(def - level * 0.5, def + level * 0.25);
        if (attr.indexOf("率") != -1) {
            lore.add(" &7" + attr + ":&f " + value.toFixed(2) + "%");
        } else {
            lore.add(" &7" + attr + ":&f " + value.toFixed(2));
        }
    }
    return lore;
}
```

### 全局随机组与局部随机组

#### 全局随机组

指的是写在 RandomString 文件夹的随机组

可以在任意位置调用

#### 局部随机组

```yaml
Lore:
  - '&7覆盖全局变量结果-> <s:DefaultPrefix>'
  - '&7全局和局部混合结果-> <s:DefaultLore>'
Random:
  DefaultPrefix: "Prefix"
  DefaultLore:
    # 2/3的概率随机到Lore，1/3的概率随机到全局变量
    - 2: "Lore"
    - 1: ~
```

优先级： 全局 > 局部

所以 局部会覆盖全局的值

### MythicMob Hook

#### 掉落

```yaml
废弃村镇_蜘蛛女王:
  Type: SPIDER
  Display: '&c蜘蛛女王'
  Health: 200
  Damage: 8
  SX-Drop:
    - 材料_水元素 1-6 1
    - 材料_蛛母复眼 1-2 1
    - 货币_拾取_随机 1 1 F:1 T:10
    - 阅历_拾取_随机 1 1 F:1 T:20
  Options:
    MovementSpeed: 0.3
    PreventOtherDrops: true
  Skills:
    - skill{s=蛛母_跃击} @target ~onTimer:150
    - skill{s=蛛母_召唤} @Self ~onTimer:350
    - skill{s=蛛母_召唤} @Self ~onSpawn
```

SX-Drop

然后和mm自带的掉落一样 物品名 数量 概率

但是后续可以跟随自定义参数 变量名:变量值

上述的例子对应的物品如下

```yaml
货币_拾取_随机:
  Name: '&7货币'
  ID: <j:Default.getMoneyType#<l:Value>>
  Lore:
    - '&f '
    - '&f  价值: <l:Value>'
    - '&6 '
    - '&f  常用的货币  '
    - '&f '
    - '&7一曰 · 春风'
  Update: true
  Random:
    F: 0
    T: 0
    Value: <d:<l:F>_<l:T>>
  NBT:
    Money:
      value: <l:Value>
```

#### 装备

```yaml
SX-Equipment:
  - 物品ID:位置 概率
  - 物品ID:位置 概率 局部变量
    - 物品ID:位置 概率 Key1:Value1 Key2:Value2
```

#### 内置变量

如果物品从怪物身上掉落下来 可以使用以下变量

| 变量名               | 说明     |
|-------------------|--------|
| mob_level         | 怪物等级   |
| mob_name_display  | 怪物显示名字 |
| mob_name_internal | 怪物内部ID |
| mob_uuid          | 怪物UUID |

例如

```yaml
货币_拾取_随机:
  Name: '&7货币'
  ID: <j:Default.getMoneyType#<l:Value>>
  Lore:
    - '&f '
    - '来源: <s:mob_name_display>'
```

这样就可以实现随机货币(物品)掉落了

### 动作拓展

想用SX-Item做一些道具？
试试这个吧

https://ray_hughes.gitee.io/fx-blog/2023/08/24/MythicItemStyrke

包含的内容:

+ PAPI变量 显示玩家SXItem物品
+ 快捷指令 给予 / 扣除 玩家的 SXItem物品
+ 对SXItem物品的一些动作拓展 监听动作
+ 对龙核插件的槽位拓展兼容
+ 对MythicMobsItem物品同样兼容以上功能

## 获取插件

https://github.com/Saukiya/SX-Item/releases

官方链接

## 常见问题

+ SX-Item 会有 PickListsner 刷物品的BUG吗?
    + 不会, 请你在拓展插件中 在扣除物品环节之前 延迟1tick
+ SX-Item 操作NBT会不会大量使用 Copy 占用内存?
    + 不会, 本插件使用了NBTWrapper用代理的方式操作NBT不产生冗余对象
+ 我想加载自己的配置文件自己管理!
    + 可以的 在ItemManager类中操作loadItem(组名,文件)
    + 具体见下方API

## API速览

### ItemManager

#### 加载物品

加载由你的配置文件传递的物品，通常我们可以把物品配置上传云端

例如自己的管理系统 或者是OSS镜像 来实现多服同步配置文件

```java
    /**
 * 加载物品列表
 * 注意事项:
 * 1. 不可以覆盖其他group的key值
 * 2. 不会被SX重载时清除
 * 3. 每次加载清空上次的存储
 * 4. 覆盖会清空之前的值
 *
 * @param group     组名
 * @param directory 文件夹
 */
public void loadItem(String group,File directory)
public void loadItem(String group,ConfigurationSection...configs)
public void loadItem(String group,Map<String, ConfigurationSection> configs)

```

#### 获取一个物品

```java
/**
 * 获取一个物品
 *
 * @param itemName  物品名
 * @param player 玩家
 * @param args 额外参数(局部变量) K,V,K,V 形式传递
 *
 */
public ItemStack getItem(String itemName,@Nonnull Player player,Object...args)

//用法:
        SXItem.getItemManager().getItem("item_name",player,"key","value")
```

#### 存入物品

分为 SXITEM 模式 (Default)

无损 Import 模式 (Import)

```java

/**
 * 保存物品
 *
 * @param key  编号
 * @param item 物品
 * @param type 类型 Default / Import
 * @return boolean
 * @throws IOException IOException
 */
public boolean saveItem(String key,ItemStack item,String type)throws IOException

```

#### 数字ID兼容

老东西们 这是适合1.7.10遗老的玩具
数字ID转换

```java
    /**
 * 获取物品材质
 *
 * @param key 索引
 * @return 材质
 */
public static Material getMaterial(String key)
```

### Event

#### MM死亡后物品放入背包事件

```java
SXItemMythicMobsGiveToInventoryEvent{

// 物品抽象
private final IGenerator item;

// 获得物品的玩家
private final Player player;

// 怪物类型
private final String mobType;

// 物品实例
private final ItemStack itemStack;

// 是否取消
private boolean cancelled;

        }
```

#### 插件重载事件

```java
SXItemReloadEvent
```

#### 物品更新与生成

```java
SXItemSpawnEvent
        SXItemUpdateEvent
```

例子 兼容 ItemsAdder 来自拓展工具包

```kotlin
    @SubscribeEvent(priority = EventPriority.LOWEST)
fun itemsAdder(event: SXItemSpawnEvent) {
    val items = event.ig.config?.getString("ItemsAdder") ?: return
    val ia = CustomStack.getInstance(items)?.itemStack ?: return
    val customData = ia.itemMeta?.customModelData ?: return
    val item = event.item ?: return
    item.modifyMeta<ItemMeta> {
        setCustomModelData(customData)
    }
    val old = item.itemMeta?.clone() ?: return
    item.type = ia.type
    item.itemMeta = old
}

@SubscribeEvent(priority = EventPriority.LOWEST)
fun itemsAdder(event: SXItemUpdateEvent) {
    val items = event.ig.config?.getString("ItemsAdder") ?: return
    val ia = CustomStack.getInstance(items)?.itemStack ?: return
    val customData = ia.itemMeta?.customModelData ?: return
    val item = event.item ?: return
    item.modifyMeta<ItemMeta> {
        setCustomModelData(customData)
    }
    val old = item.itemMeta?.clone() ?: return
    item.type = ia.type
    item.itemMeta = old
}
```

不被保护的NBT是不会被继承的 通常为Lore MetaData

自定义NBT可以通过保护的手段来不被更新

但是原版的NBT 比如 Lore就要通过这种方式

或者是可以把lore放入NBT 然后Lore中进行``<s>``引用

也可以实现动态跟进

### PAPIHOOK

```txt
%sxitem_r:6_7%
```

