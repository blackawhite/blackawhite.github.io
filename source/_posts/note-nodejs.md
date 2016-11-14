---
title: Node读书笔记
date: 2016-11-13 18:11:26
tags: Node笔记
categories: Node
---
## FS API的应用
需求：展示当前目录下列表并给出选择，当选择文件时显示内容，选择目录时，显示该目录下文件信息。<!--more-->
### fs.readdir()
读取目录
``` javascript
console.log(fs.readdirSync(__dirname));//同步获取当前目录的文件列表
```
readdir()第一个参数的3种写法
``` javascript
fs.readdir('.',function(err,files){});
```
``` javascript
fs.readdir(__dirname,function(err,files){});
```
``` javascript
fs.readdir(process.cwd(),function(err,files){});
```
### fs.readFile()
读取文件
``` javascript
fs.readFile(filename,utf-8,function(err,data){})
```
### fs.stat()
读取文件或目录的元数据
``` javascript
fs.stat(filename,function(err,stat){})
```
### 代码展示
``` javascript
var fs = require('fs'),
    stdin = process.stdin,//可读流
    stdout = process.stdout;//可写流

//process.cwd()返回运行当前脚本的工作路径
fs.readdir(process.cwd(),function(err,files){
    //输出一个空行，便于阅读
    console.log('');

    if(!files.length){
        //文件不存在直接提示并返回
        return console.log('No files to show!');
    }
    //提示用户选择
    console.log('Select which file or direcrory you want to see\n');
    //后面会多次用到，保存一下
    var stats = [];

    function file(i){
        //filename可能是目录或着文件所以下面要利用fs.stat()作出判断
        var filename = files[i];
        //fs.stat会给出文件或者目录的元数据
        fs.stat(__dirname + '/' + filename,function(err,stat){
            stats[i] = stat;
            //输出目录或文件的名字
            if(stats[i].isDirectory()){//如果是目录
                console.log('目录：' + i + '    ' + filename);
            }
            else{//如果说文件
                console.log('文件：' + i + '    ' + filename); 
            }
            //说明文件或目录输出完毕
            if(++i == files.length){
                //接下来的操作就是让用户输入选择
                read();
            }
            //继续输出
            else{
                file(i);
            }
        });
    }
    function read(){
        console.log('');
        //不换行输出选择提示信息
        stdout.write('Enter your choice:');
        //等待用户输入
        stdin.resume();
        //使支持特殊字符
        stdin.setEncoding('utf8');
        //监听用户输入的信息
        stdin.on('data',option);
    }
    //用户的操作
    function option(data){
        var filename = files[Number(data)]
        if(!filename){
            //若输入的内容不在列出内容之中
            stdout.write('Enter you choice again:');
        }
        else{
            stdin.pause();
            //读取目录或文件，stats数组已经保存了所有文件或目录的元数据
            if(stats[Number(data)].isDirectory()){//若是目录
                //读取目录
                fs.readdir(__dirname + '/' + filename,function(err,files){
                    console.log('');
                    console.log(files.length + 'files');
                    //files是一个数组，里面存的说filename
                    files.forEach(function(file){
                        console.log('    _   ' + file);
                    });
                    console.log('');
                });
            }
            else{//若是文件
                fs.readFile(__dirname + '/' + filename,'utf8',function(err,data){
                    console.log('');
                    //输出内容
                    console.log(data);
                });
            }
        }
    }
    file(0);
});
```