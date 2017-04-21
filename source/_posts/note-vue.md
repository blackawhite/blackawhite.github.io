---
title: Vue
date: 2017-04-20 14:54:37
tags:
---
Vue学习中的一些注意点...
<!-- more -->
### 父子组件通信
<img src="/resources/images/pages/vue/props&emit.jpg" alt="">
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    .wrap{
        float: left;
        margin: 50px;
    }
    </style>
</head>
<body>
    <div id="app">
        <custom-select msg="请输入地址" :items="arr1"></custom-select>
        <custom-select msg="请输入水果" :items="arr2"></custom-select>
    </div>
    <script src="vue.js"></script>
    <script>
    Vue.component('customSelect', {
        data: function(){
            return {
                val: "",
                oBar: false
            }
        },
        props: ['msg', 'items'],
        template: `
        <div class="wrap">
            <input type="text" :placeholder="msg" :value="val" v-on:click="show">
            <custom-list :items="items" v-on:receive="aaa" v-show="oBar"></custom-list>
        </div>
        `,
        methods: {
            aaa: function(value){
                this.val = value;
                this.oBar = false;
            },
            show: function(){
                this.oBar = !this.oBar;
            }
        }
    });
    Vue.component('customList', {
        props: ['items'],
        template: `
        <ul>
            <li v-for="item in items" @click="changeValue(item)">{{item}}</li>
        </ul>
        `,
        methods: {
            changeValue: function(item){
                this.$emit('receive', item)
            }
        }
    });
    new Vue({
        el: "#app",
        data: {
            arr1: ["北京", "上海", "广州", "深圳"],
            arr2: ["西瓜", "橘子", "香蕉", "苹果"]
        }
    });
    </script>
</body>
</html>
```