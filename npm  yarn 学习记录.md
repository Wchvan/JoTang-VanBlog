# npm ypm学习记录

## package.json 属性说明

>name - 包名。
version - 包的版本号。
description - 包的描述。
homepage - 包的官网 url 。
author - 包的作者姓名。
contributors - 包的其他贡献者姓名。
dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
keywords - 关键字

## npm

### npm常用命令

[npm常用命令](https://blog.csdn.net/qq575792372/article/details/122150069?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166297662716800192244915%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166297662716800192244915&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-122150069-null-null.142^v47^pc_rank_34_default_2,201^v3^control_1&utm_term=npm%E5%91%BD%E4%BB%A4&spm=1018.2226.3001.4187)

补充：
1.  使用npm unpublish package@version ---可以撤销发布自己发布过的某个版本代码。
2.  在package.json所在目录下使用npm install . -g可先在本地安装当前命令行程序，可用于发布前的本地测试。


## yarn

yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具，yarn 是为了弥补 npm 的一些缺陷而出现的。

[yarn常用命令](https://blog.csdn.net/mjzhang1993/article/details/70092902?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166297656916782390592202%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166297656916782390592202&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-70092902-null-null.142^v47^pc_rank_34_default_2,201^v3^control_1&utm_term=yarn%E5%91%BD%E4%BB%A4&spm=1018.2226.3001.4187)


## yarn 与 npm 区别

1. 并行安装：yarn安装包会同时执行多个任务，npm 需等待上一个任务安装完成才能运行下一个任务
2. 离线模式：如果你已经安装过一个包，用 yarn 再次安装会从缓存中获取，而 npm 会从网络下载
3. 版本锁定：yarn 默认有一个 yarn.lock 文件锁定版本，保证环境统一，而 npm 默认从网络下载最新的最稳定的，版本锁定可以解决包之间版本不兼容问题，npm 也可以通过命令实现版本锁定
4. 更简洁的输出：yarn 安装包时输出的信息较少，npm 输出信息冗余

### npm存在的一些不足：

npm install 下载速度慢，即使是重新 install 时速度依旧慢

同一个项目，安装的无法保持一致性。原因是因为 package.json 文件中版本号的特点导致在安装的时候代表不同的含义。

使用 npm 安装多个 js 包时，包会在同一时间下载和安装。安装过程中，其中一个包抛出了一个异常，但 npm 会继续安装其他包，所以错误信息就会在一大堆提示信息中丢失掉，以至于直到执行前，都不会发现实际发生的错误。

### Yarn的优点：

安装速度快 (服务器速度快 , 并且是并行下载)
版本锁定，安装版本统一
缓存机制，如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了
输出简洁并且多注册来源处理。安装包时，直观地打印出必要的信息；不管包被不同的库间接关联引用多少次，只会从一个注册来源去装，防止出现混乱不一致。
