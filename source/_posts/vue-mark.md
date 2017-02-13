---
title: Vue-mark
date: 2017-02-13 11:30:08
tags: Vue
---
官网教程和API都很详细，把学习的过程记录下来以便加深理解和记忆。
<!-- more -->
### 指令

``` javascript
v-model = "msg"

{{msg}}    // 双向绑定：数据更新，视图也更新

{{*msg}}    // 数据只是初始化时绑定一次

{{{msg}}}    // HTML转义

{{ arr }}    // 数组

{{ json }}    // json

v-for = "value in arr"    {{value}}    {{$index}}

v-for = "value in json"    {{value}}    {{$index}}    {{$key}}

v-for = "(k,v) in json"    {{k}}    {{v}}    {{$index}}    {{$key}}

v-show = "true/false"

v-show = "val"    // 这里也可以接受变量
```
### 事件
``` javascript
v-on:click = "add()"

@click = "add()"    // 简写

@click = "show($event)"    // 事件对象

ev.cancelBubble = true    // 阻止冒泡
ev.stopPropagation()

@click.stop = "add()"    // Vue中的写法

ev.returnValue = true;    // 阻止默认行为
ev.preventDefault();

@contextmenu.prevent = ""    // Vue中的写法

@keydown = "show($event)"    // 键盘事件

ev.keyCode

@keydown.13 = "show"
@keydown.enter = "show"

@keydown.up = "show"
@keydown.delete = "show"
```
### 绑定属性
``` html
<img src="{{url}}" alt="">    // 控制台有报错

<img v-bind:src="url" alt="">    // 正确姿势

<img :src="url" alt="">    // 简写

<img :src="url" alt="" :width="w" :title="t">    // 里面放的是变量

// 特殊的:class

<strong :class="[r,b]">20160213</strong>    // r是data中的数据
data: {
    r: "red",
    b: "blue"
}

<strong :class="{red:true,blue:true}">20160213</strong>    // red,blue直接是class

<strong :class="{red:a,blue:b}">20160213</strong>    // true或false也可以直接从data中获取

<strong :class="json">20160213</strong>    // 直接从数据中获取json，推荐
data: {
    json: {
        red: true,
        blue: true
    }
}

// 特殊的:style

<strong :style="[r,b]">fsdfdsf</strong>
data: {
    r: {color: "red"},
    b: {background: "blue"}
}


<strong :style="json">fsdfdsf</strong>    // 推荐
data: {
    json: {
        color: "red",
        background: "blue"
    }
}
```
### 过滤器
``` javascript
{{"welcome"|uppercase}}

{{msg|filterA|filterB}}

{{"welcome"|capitalize}}    // 首字母大写

{{12|currency}}    // 美元

{{12|currency "&yen;"}}    // 通过空格加参数，传参
```
### 交互
``` javascript
get / post / jsonp 需要依赖vue-resource

// GET
<input type="button" value="按钮" @click="get()">
methods: {
   get: function(){
        this.$http.get('a.txt').then(function(res){
            console.log(res.data);
        },function(){
            console.log(res.status);
        });
   }
}

methods: {
   get: function(){
        this.$http.get('get.php',{
            a: 1,
            b: 2
        }).then(function(res){
            console.log(res.data);
        },function(){
            console.log(res.status);
        });
   }
}
<?php
    $a = $_GET["a"];
    $b = $_GET["b"];
    echo $a + $b;
?>

// POST
methods: {
    post: function(){
        this.$http.post('post.php',{
            a: 1,
            b: 2
        },{
            emulateJSON: true
        }).then(function(res){
            console.log(res.data);
        },function(){
            console.log(res.status);
        });
    }
}

// JSONP

// https://sug.so.360.cn/suggest?callback=suggest_so&word=af
methods: {
   jsonp: function(){
        this.$http.jsonp('https://sug.so.360.cn/suggest',{
            word: "a"
        }).then(function(res){
            console.log(res.data.s);// s
        },function(){
            console.log(res.status);
        });
   }
}


// https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a&cb=
methods: {
   jsonp: function(){
        this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
            wd: "a"
        },{
            jsonp: "cb"// 默认是callback，此接口中是cb
        }).then(function(res){
            console.log(res.data.s);// s
        },function(){
            console.log(res.status);
        });
   }
}
```
