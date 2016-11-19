---
title: Git使用
date: 2016-11-15 22:07:50
tags: Git
---
### 设置
``` bash
git config --global user.name "blackawhite"
git config --global user.email "dangpugui@126.com"
git config --global user.name    #查看
git config --list
```
### 初始化
``` bash
git init    #使用Git就要先初始化
```
### 三个区
工作区：就是你当前写东西的目录
暂存区：作为过度层、避免误操作、保护工作区和版本区、分支处理
版本区：
添加、修改、删除，红色代表工作区内容、绿色暂存区，+添加，~修改，-删除，！冲突
``` bash
git status查看状态
```
添加到暂存区：
``` bash
git add fileName
git add .
git add --all   #git add -A
```
添加到版本库（版本区）：
``` bash
git commit demo1.html >> 回车 >> 写注释 >>关闭
git commit -m "change demo1.html"
从工作区直接到版本库
git commit -a -m "add drag.js"第一次时不能这样使用
```
从暂存区撤回到工作区：
``` bash
git reset HEAD demo1.html
```
### 查看提交历史
``` bash
git log     #回车时显示后面的，退出按q键即可
git log --pretty=oneline    #精简版显示

```
### 对比
``` bash
git diff    #查看修改内容，工作区和暂存区的比较
git diff --cached(--staged)    #暂存区与版本区的对比
git diff master(分支名字)   #工作区与版本库
git diff HEAD -- readme.txt
```
### 撤销
``` bash
git reset HEAD <file.name>      #撤销暂存区的提交/提交，在没有commit的情况下，从新回到未add状态
git checkout -- <file.name>     #工作区撤销到版本区的状态，例如误删或误改了文件
git commit -m "aa" --amend      #误提交后和上一个提交的作为一次提交，让两次不同提交变成一次
```
### 删除
``` bash
git rm <file.name>      #在工作区已经删除的情况下删除暂存区
git rm -f <file.name>   #在工作区一删除或未删除的情况下删除工作区和暂存区，暂存区必须存在
fit rm --cached <file.name>     #在工作区还在或不在时都能，删除缓存区，而工作区不受影响
```
### 恢复
``` bash
git checkout Id <file.name>     #恢复指定文件
git reset --hard HEAD^    #恢复到上一次commit的版本
git reset --hard Id     #恢复指定版本
git reset --hard HEAD^      #往下恢复后之前的log就没有了通过git reglog
git reset --hard HEAD~num
```
### 同步Github
``` bash
git remote      #查看远程仓库名字
git remote -v   #对应远程仓库地址
ssh-keygen -t rsa -C "youremail@example.com"    #创建SSH
git remote rm origin<主机名>     #删除远程仓库
git remote add origin git@...   #添加远程仓库
git push origin(远端名字) master(分支名字)      #推送
```
### 克隆
``` bash
git clone url
```

### 拉取
``` bash
git pull    #直接合并
git fetch     #手动合并，手动解决
git diff master origin/master   #查看区别
git merge origin/master
```
### 参与开源项目
``` bash
Fork 开了一个新的分支，克隆了一个版本
　　>>命令行克隆自己fork过来的，然后修改并提交
　　>>Pull request
　　>>New pull request
　　>>Create pull request
对方：
　　>>Merge pull request
　　>>confirm
　　回复技巧：选中对方信息，按R键
```

### 分支
稳定版本库的分支 >> 开发  >>  合并到稳定的版本，master 一般默认为项目的主分支，不同的开发人员在不同的分支上进行开发互相不影响。

``` bash
git branch  #查看当前分支
git branch new1     #创建分支，github上也可直接创建
git checkout new1   #切换分支
git checkout -b new2    #创建并切换
git merge new1      #合并分支，合并分支先切换到master
git branch --merged     #查看当前分支所合并的分支
git branch --no-merged  #查看与当前分支未合并的分支
git branch -d new1      #删除合并后的没用的new1分支
git branch -D new2      #删除没有合并的分支
git status      #查看冲突的文件，人工解决合并文件的冲突后然后再提交
```
### 标签
``` bash
releases 里程碑 版本 打标签
git tag  查看
git tag v1.0  打标签，也可github上直接创建
git push origin v1.0  提交打的标签/版本
```
### 进阶
``` bash
http://git.oschina.net/progit/
http://www.liaoxuefeng.com/
https://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5
```

### 技巧
``` bash
ls目录结构
mkdir创建
sublime hello.txt
tab自动补全
git config --global alias.co checkout  co等于checkout，设置别名
git config --list，查看别名
```


