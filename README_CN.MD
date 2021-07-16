## gitbook页面加锁功能插件

[![npm:download](https://img.shields.io/npm/dt/gitbook-plugin-lock)](https://www.npmjs.com/package/gitbook-plugin-lock)

### 前提:

一直想给部分文章进行加锁功能,但是又不想太复杂,看到一些大佬文章都加了锁,我也去实践了下,两种方案

- 方案1: 利用三方平台,注册,加入配置, 优点: 不用自己写代码 缺点: 页面底下有 由 xx 提供; 微信自动回复是个地址..
- 方案2: 自己开发,自己服务器做处理,前后端都需要写代码 优点: 自由; 缺点: 代码有点多

但是我用的 gitbook,纯静态的,所以我想了另外一个方法,不需要服务端的用法

> 几乎每行代码都利用了搜索引擎,毕竟我是后端, 花了好大的功夫才想起js的写法

### 实现方案

配置文件写好配置,多套匹配方式, 然后去微信里设置好 自动回复即可


### 使用文档:

1. 你的gitbook项目里(`book.json文件`)添加插件

```
"plugins": ["lock"]
```

2. 在你的gitbook项目里(`book.json文件`)添加配置

> 后面有配置详细解释

```
  "pluginsConfig": {
    "lock": {
      "lockTokenKey": "lock-token-key",
      "wechatName": "技术抛光",
      "wechatQr": "http://interview.wzcu.com/static/qrcode.jpg",
      "allPage": true,
      "articleHeightPercent":0.8,
      "verificationCode": [
        {
          "key": "demo1",
          "value": "demo1value"
        },{
          "key": "demo2",
          "value": "demo2value"
        },{
          "key": "demo3",
          "value": "demo3value"
        },{
          "key": "demo4",
          "value": "demo4value"
        }
      ]
    }
  }
```

3. 执行命令 `gitbook install`

4. 登录你微信公众号后台,自动回复里配置 上面 `verificationCode` 一致的回复.比如你设置了 `{"key":"你好","恭喜发财"}`,那么你需要在微信公众号后台里设置自动回复,关键词是 `你好` 然后自动回复 "恭喜发财"

### 配置解释

- `lockTokenKey`
    - 你存本地缓存的key
    - 可以不设置,有默认
- `wechatName`
    - 你公众号的名字,别人可以在微信里进行搜索的
    - 建议设置
- `wechatQr`
    - 你公众号的二维码,别人扫描即可关注
    - 建议设置
- `allPage`
    - 是否所有页面都设置 加锁的功能
    - 布尔类型, 填 true 就是所有页面都有加锁功能, 反之 页面有标签(`%pageLock%`)的就会进行加锁
- `articleHeightPercent`
    - 你想给页面文章多少进行加锁,比如想让用户看到百分之六十,那么写 `0.6` 即可
    - 默认 0.5
- `verificationCode`
    - 校验码的键值对,你可以设置任意组 `key` 对应的 `value`
    - 你需要在 公众号后台设置 相同的 `key` 然后自动回答 `value`
    - 用户每次刷新页面 都可能会随机任意一个 `key` 纯随机行为

### PS: 如果你想仅仅部分页面使用加锁功能, 设置 `allPage`: false, 然后在你想加锁的页面 比如  example.md 这个页面任意位置加上 %pageLock% 标签即可

### 如果有问题,请提交issue, 另外,请尽快提,因为时间久了,我就忘了我写了啥了