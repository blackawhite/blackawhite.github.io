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