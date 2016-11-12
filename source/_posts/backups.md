---
title: Hexo备份
date: 2016-11-12 21:53:15
tags:
---
### 在主分支下进行开发完并备份：

``` bash
#add后就可以分支间互相切换了，此时各分支内容时一样的
git add .
```
``` bash
git commit -m '.'
```
``` bash
#新建分支，若已存在，git branch -d source删除后重建，因为再建的分支默认和主分支是保持一致的
git branch source
```
``` bash
#在主分支上push即可，-u可省
git push -u origin source
```

### 在source分支下进行开发并备份：

``` bash
#新建分支
git branch source
```
``` bash
#切换到source分支，然后一只在此分支上开发就可以了，push完毕之后再回到主分支
git checkout source
```
``` bash
#若在source分支修改或增加了内容，当切换回主分支时，发现source分支开发的内容会不见了，需要merge，merge后的分支就可以删除了，当然也可以不merge一直在source分支开发并备份
git merge source
```
**注意多个分支时进行拉取操作时一定要指定分支名，像git pull origin source**
以上是备份source目录同时不影响本地部署的方法，待续......