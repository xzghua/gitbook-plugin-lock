## gitbook-plugin-lock

[![npm:download](https://img.shields.io/npm/dt/gitbook-plugin-lock)](https://www.npmjs.com/package/gitbook-plugin-lock)

[中文文档](./README_CN.MD)


### presupposition:

I have always wanted to lock some articles, but I don't want to be too complicated. I saw that some of the big-name articles have been locked. I also went to practice. That has two solutions
- plan one: Use the three-party platform, register, and add configuration. Advantages: No need to write code yourself. Disadvantages: There is at the bottom of the page Provided by xx; WeChat automatic reply is an address..
- plan two: Develop by yourself, do the processing on your own server, and you need to write code for both front and back ends. Advantages: Freedom; Disadvantages: a bit more code

But the gitbook I used is purely static, so I thought of another method, which does not require server-side usage

> Almost every line of code uses search engines. After all, I am a back-end, and it took a lot of effort to remember how js is written.

### Implementation plan

Write the configuration file in the configuration file, multiple sets of matching methods, and then go to WeChat to set up the automatic reply.


### How use:

1. Add the plugin to your gitbook project (`book.json`)

```
"plugins": ["lock"]
```

2. Add configuration to your gitbook project (`book.json`)

> The configuration is explained in detail later

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

3. Excuting an order `gitbook install`

4. Log in to the background of your WeChat official account, and configure the above `verificationCode` consistent response in the automatic reply. For example, if you set `{"key":"Hello", "Gongxi Fa Cai"}`, then you need to log in to the WeChat official account Set up an automatic reply in the background, the keyword is `Hello`, and then automatically reply "Gong Xi Fa Cai"

### Configuration explanation

- `lockTokenKey`
    - You save the locally cached key
    - Can not be set, there is a default
- `wechatName`
    - The name of your official account, others can search on WeChat
    - Recommended setting
- `wechatQr`
    - The QR code of your official account, others can scan it to follow
    - Recommended setting
- `allPage`
    - Whether all pages are set to lock function
    - Boolean type, fill in true means all pages have a lock function, otherwise the page with a label (`%pageLock%`) will be locked
- `articleHeightPercent`
    - How much do you want to lock the page articles, for example, if you want users to see 60%, then write `0.6`
    - Default 0.5
- `verificationCode`
    - The key-value pair of the check code, you can set any set of `key` corresponding to `value`
      -You need to set the same `key` in the background of the official account and then automatically answer the `value`
      -Every time the user refreshes the page, he may randomly select any `key` purely random behavior
      
### PS: If you want to use the lock function for only part of the page, set `allPage`: false, and then add the %pageLock% tag to the page you want to lock, such as example.md

### If there is a problem, please submit an issue. In addition, please raise it as soon as possible, because after a long time, I forgot what I wrote