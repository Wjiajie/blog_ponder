---
title: 'wepub增加RSS源模式'
slug: wepub-add-rss
authors: [jiajiewu]
tags: [工具, 电子书]
keywords: ["blog", "网页转电子书", "Wepub"]
description: "介绍wepub新增的RSS源模式功能，支持从RSS源批量抓取文章并转换为电子书，同时优化了导出功能和抓取限制。"
draft: false
---
import ZoomImage from '@site/src/components/ZoomImage';

<ZoomImage src="https://s2.loli.net/2025/03/02/nO29MkPy1AUHZdB.png" alt="wepub RSS源模式界面" />

这周给[wepub](https://github.com/Wjiajie/wepub)（一个把网页转换为电子书的工具）增加了RSS源模式，你只需要输入网站的rss链接，工具会自动抓取rss中的所有有效链接，并解析为易于阅读的文章。

<!-- truncate -->

## RSS源模式使用方式

<ZoomImage src="https://s2.loli.net/2025/03/02/fV14dTwujBvNapL.png" alt="RSS源模式界面" />
首先找到你想转换文章的rss链接，以[paulgraham](https://paulgraham.com/index.html)的rss源为例子，你可以通过这个[链接](http://www.aaronsw.com/2002/feeds/pgessays.rss)访问到。

<ZoomImage src="https://s2.loli.net/2025/03/02/uhGUQnEk16aZloA.png" alt="填写RSS链接并开始解析" />
本地运行epub，填写rss链接，并勾选下方的RSS源模式，点击开始解析。
解析出来的链接可能有很多，如果你只想导出其中一部分，可以使用范围选择器的模式，如下图：
<ZoomImage src="https://s2.loli.net/2025/03/02/KrzjtSJeFZLbHfx.gif" alt="范围选择器演示" />
具体方式是，你可以先按住alt键，用鼠标左键点击你希望选中的开始文章，然后使用鼠标滚轮滚动列表即可，最后松开鼠标左键，即可选中一个范围内的文章。如果文章已经在选中态，使用上面的操作则为取消选中。

## 其他优化
<ZoomImage src="https://s2.loli.net/2025/03/02/OaXrzyeQ4MVYLUW.gif" alt="导出卡片演示" />

1. 普通解析模式不限制最大抓取数目
	最大页面数默认为-1，表示不限制抓取链接的上限。但需要注意，当前的文章内容是暂存在浏览器缓存，抓取过多的项目可能会超出缓存，你需要根据具体抓取的网页内容来调整数目。
2. 优化了导出卡片的功能
	现在导出卡片支持markdown格式的字段填写，支持文档标题、作者和其他内容，这些信息在生成电子书时会附加到首页。

注意事项，当前使用Percollate导出电子书，这个工具在导出网页数目过多时会直接报错，测试下来，一次性导出一百个网页没有问题，如果你需要大批量导出网页内容，可能需要分批次导出。