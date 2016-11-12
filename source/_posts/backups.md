---
title: Hexo备份
date: 2016-11-12 21:53:15
tags:
---
### 主分支开发并add，source分支commit：

``` bash
#新建分支，删除分支命令：git branch -d source
git branch source
```
``` bash
#切换到source分支，然后一只在此分支上开发就可以了
git checkout source
```
``` bash
#add后就可以分支间互相切换了，此时各分支内容时一样的
git add .
```
``` bash
#注意提交操作是在source分支下进行的
git commit -m '.'
```
``` bash
#正常push即可，要指定分支的名字，拉取操作时一样要指定名字，就像git pull origin source
git push -u origin source
```
``` bash
#当切换回主分支时，发现新建的文章或source分支开发的内容会不见了，**需要merge**，当然也可以不merge一直在source分支开发并备份，一直merge也有一个问题，例如当你删除一篇文章并提交后，回到主分支发现却还在，此时需要再次merge就没啦，所以建议一直在source目录下进行一切工作
git merge source
```
**注意的部署工作都是在source分支下进行的，也可merge后在主分支下进行**
以上是备份source目录同时不影响本地部署的方法，待续...