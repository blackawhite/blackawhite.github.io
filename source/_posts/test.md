---
title: test
date: 2016-11-12 18:04:52
tags:
---
主分支开发完毕后

git add .

git commit -m '.'

git branch source 新建分支

git push -u origin master

git checkout source




然后一只在source分支上开发就可以了，push完毕之后再回到主分支

在主分支上git merge source

然后git branch -d source删除合并后的分支


在主分支上开发的东西直接git push origin source上不行的，因为此时source分支的内容并没变

可以删除source分支再新建，在git push origin source

除了删除再新建的办法就是  git add . 后切换到source再提交


aaabbbccdd