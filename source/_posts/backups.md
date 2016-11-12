---
title: Hexo备份
date: 2016-11-12 21:53:15
tags:
---
### 在主分支下进行开发完并备份：

``` bash
git add .    #add后就可以分支间互相切换了，此时各分支内容时一样的
```
``` bash
git commit -m '.'
```
``` bash
git branch source    #新建分支，若已存在，git branch -d source删除后重建，因为再建的分支默认和主分支是保持一致的
```
``` bash
git push -u origin source    #在主分支上push即可，-u可省
```

### 在source分支下进行开发并备份：

``` bash
git branch source    #新建分支
```
``` bash
git checkout source    #切换到source分支，然后一只在此分支上开发就可以了，push完毕之后再回到主分支
```
``` bash
git merge source    #切换回主分支时，发现source分支开发的内容会不见了，需要merge，当然也可以不merge一直在source分支开发
```

以上是备份source同时不影响本地部署的方法...待续