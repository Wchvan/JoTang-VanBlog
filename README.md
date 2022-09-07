[toc]
# VanBlog
个人博客

## HTML 和 CSS

这两个是前端的基础，是我暑期刚开始在bilibili学习的，所以做静态页面的过程就很简单，就先网上看了一些人的博客，大致有个自己的构建思路，然后就简单的写一下。
先用css分为公用样式和每个区域的样式
然后html中从上到下，从左到右的写网页。

## git

这是我看了招新题之后去廖雪峰的网站学习的，过程中主要遇到的麻烦只有一个：
就是我先构建了一个私有库，然后在构建一个新的库，然后在原来的库的本地文件夹下push和pull的时候发现出问题了；

```
[rejected] main -＞ main (non-fast-forward)error: failed to push some refs to
```

这是报错代码
网上说是pull的问题，然后我pull也没用，最后我自己看了廖雪峰的教程想了一个可能的解决思路：
我先创建一个新的文件夹，然后用SourceTree克隆过来，然后再将我的网页文件放入这个文件夹，然后push回去就解决了。

## Netlify

学习是看b站学习大致怎么用吧
然后deloy时候遇到一个404问题，报错大概是：
```
I’ve deployed my site but I still see “Page not found”
```
看了官方文档确定大致思路：
因为我的index.html是库里建一个博客文件夹然后放在里面，可能Netlify无法获取到index.html文件就没办法部署，所以我就把文件夹里的东西全部提取出来直接放到库文件夹里，然后提交，这样子库就能直接看到index.html文件，然后在Netlify里重新部署一下解决。