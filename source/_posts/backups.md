---
title: Hexo备份
date: 2016-11-12 21:53:15
tags:
---
### 主分支开发并add，source分支commit：
#新建分支，删除分支命令：git branch -d source
``` bash
git branch source
```
#切换到source分支
``` bash
git checkout source
```
#add
``` bash
git add .
```
#注意提交操作是在source分支下进行的
``` bash
git commit -m '.'
```
#正常push即可，要指定分支的名字，需要拉取操作时一样要指定名字，就像git pull origin source
``` bash
git push -u origin source
```
#若要切换回主分支时，发现新建的文章或source分支开发的内容会不见了，**需要merge一下就出来了**，一直merge保持分支同步是好的，但有时也有点麻烦，例如当你删除一篇文章并提交后，回到主分支发现却还在，此时还需要再次merge删除主分支的，所以建议一直在source目录下进行一切工作就可以了
``` bash
git merge source
```
**先备份的话，部署工作都是在source分支下进行的，也可merge后在主分支下进行，先部署就无所谓了**
以上是备份source目录同时不影响本地部署的方法，待续...