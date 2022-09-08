<!-- toc -->
# VanBlog
个人博客

## 网页主要功能介绍

### 轮播图

1. 正常情况下滚动播放图片
2. 当按下前后按钮的时候可以实现图片向前/后定位一张
3. 当按下底部圆点时可以实现看第几张图片

### 学习记录

1. 右侧放输入框，可以在上面提交我们的学习记录
2. 然后就会在学习记录区域出现一条区域
3. 点击删除键就会将这条记录删除
4. 点击题目右侧就保留置顶区域，余下区域显示学习记录具体内容
5. 区域中包含两个键 “首页” 和 “删除记录”  来实现功能、

## 实现功能的大致思路

### 初始页面
上网看了一些人的网页以及CSDN等，决定页面布局大概就是上部导航栏，中间放一些自己想放的东西，个人介绍和导航栏放左侧

### 轮播图

我暑假是有在b站上网课学习过js的，所以大致知识点都会，然后看到轮播图的时候我思考大概两种解决思路：
1. 图片拼接成雪碧图
2. 通过ul li img 设置 ul的宽度和img的宽度然后让li浮动实现伪雪碧图

然后我选择了第二个，因为我不太会p图。
最主要的就是settimer的一些函数来实现轮播，然后用像素实现图片定位等，然后比较重要的一点就是div和img宽度设为一样保证展示区域，然后ul的宽度设为七张图用于达到伪雪碧图的效果。
然后大致的设计思路就是：
1. 建立一个div作为轮播图的空间并在里面设置ul li img及其css属性
2. 给div 和 img的宽高设置成一样
3. 设置成轮播的形式，发现最后会有一个空白，然后就再加了第一张图片到末尾，但是判定条件仍然是六张图，ul的宽度改为7张图
4. 去iconfont网站下载svg图片，用定位的知识设置位置，用onclick设置点击后的效果
5. 增加下面数字表示当前播放第几张然后鼠标悬浮时页面不动，离开时才动


### 学习记录区域

我看到个人介绍下面有一块空的区域，就想好了大致思路就是这个地方放导航栏，然后通过导航栏来实现具体操作：
1. 首先我意识到在这块小区域放置具体内容不现实且不美观，所以只负责导航栏和输入的作用
2. 然后先做导航栏的静态页面，这个没什么困难
3. 然后做具体事件，通过js来实现点击不同按钮的时候发生的事件：

具体产生的事件是：

1. 通过form元素构建一个浏览器能接受传输信息的表单，里面包括标题、具体内容和提交按钮。
2. 点击提交上侧就出现一个记录，通过 append函数实现，并且new一个对象用于存储记录，并建立viewcontent用于HTML中展示
3. 点击记录就在右侧建立一个区域展示这个记录的具体内容，通过用循环将主区域除了顶部的元素的display全设为none，然后创建一个新的区域展示记录
4. 点击记录的删除键就删除这个记录，通过删除这个对象的viewcontent来实现页面删除记录（但后台中没有删除，可以留到后期恢复数据）如果右侧是展示区域的话就返回首页（用到第五点的知识）
5. 点击区域的首页键就返回首页，通过remove展示区域，并且通过循环恢复原始区域
6. 点击区域的删除键就删除这个记录并返回首页，通过remove展示区域，通过循环恢复，并删除这个对象的viewcontent。



## 学习过程的记录

### HTML 和 CSS

这两个是前端的基础，是我暑期刚开始在bilibili学习的，所以做静态页面的过程就很简单，就先网上看了一些人的博客，大致有个自己的构建思路，然后就简单的写一下。
先用css分为公用样式和每个区域的样式
然后html中从上到下，从左到右的写网页。
遇到的第一个问题：
当缩小网页之后发现网页头部右侧变成空的，我想出了两个解决方案：
一个是把网页所有的width从px改为百分比，二是在头部的css加上属性min-width
最后通过min-widthh解决问题


### git

这是我看了招新题之后去廖雪峰的网站学习的，过程中主要遇到的麻烦只有一个：
就是我先构建了一个私有库，然后在构建一个新的库，然后在原来的库的本地文件夹下push和pull的时候发现出问题了；

```
[rejected] main -＞ main (non-fast-forward)error: failed to push some refs to
```

这是报错代码
网上说是pull的问题，然后我pull也没用，最后我自己看了廖雪峰的教程想了一个可能的解决思路：
我先创建一个新的文件夹，然后用SourceTree克隆过来，然后再将我的网页文件放入这个文件夹，然后push回去就解决了。

### Netlify


学习是看b站学习大致怎么用吧
然后deloy时候遇到一个404问题，报错大概是：
```
I’ve deployed my site but I still see “Page not found”
```
看了官方文档确定大致思路：
因为我的index.html是库里建一个博客文件夹然后放在里面，可能Netlify无法获取到index.html文件就没办法部署，所以我就把文件夹里的东西全部提取出来直接放到库文件夹里，然后提交，这样子库就能直接看到index.html文件，然后在Netlify里重新部署一下解决。

