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
### v-for/v-if
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <ul>
            <li v-for="item in items" v-if="!item.isComplete">
                {{item.text}}
            </li>
        </ul>
    </div>
    <script src="vue.js"></script>
    <script>
    new Vue({
        el: '#app',
        data: {
            items: [
                {
                    text: 'aaa',
                    isComplete: true
                },
                {
                    text: 'bbb',
                    isComplete: false
                },
                {
                    text: 'ccc',
                    isComplete: true
                }
            ]
        }
    });
    </script>
</body>
</html>
```
### 自定义事件
使用$on(eventName)监听，$emit(eventName)触发
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <p>{{total}}</p>
        <!-- 监听 -->
        <my-button v-on:add="changeValue"></my-button>
        <my-button v-on:add="changeValue"></my-button>
    </div>
    <script src="vue.js"></script>
    <script>
    Vue.component('myButton', {
        // <button v-on:click="$emit('add')">click</button>
        template: `
            <button v-on:click="chufa">click</button>
        `,
        methods: {
            chufa: function() {
                // 触发
                this.$emit('add');
            }
        }
    });
    new Vue({
        el: '#app',
        data: {
            total: 0
        },
        methods: {
            changeValue: function() {
                this.total += 1;
            }
        }
    });
    </script>
</body>
</html>
```
### 单项数据流
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <p>父：{{num}}</p>
        <!-- 自定义事件 -->
        <my-custom :trans-num="num" v-on:change="numOpera"></my-custom>
    </div>
    <script src="vue.js"></script>
    <script>
    Vue.component('my-custom', {
        props: ['transNum'],
        data: function() {
            return {
                // 注意这里是this.transNum
                getNum: this.transNum
            }
        },
        template: `
            <div>
                <button @click="changeNum">ChangeValue</button><br>
                <span>{{getNum}}</span><br>
                <span>{{addNum}}</span>
            </div>
        `,
        methods: {
            changeNum: function(){
                // 不要直接改变传递过来的值：this.transNum ++
                // 用data或data配合计算属性
                this.getNum ++;

                // 触发自定义事件
                this.$emit('change');
            }
        },
        computed: {
            addNum: function() {
                return this.getNum;
            }
        }
    });
    new Vue({
        el: "#app",
        data: {
            num: 0
        },
        methods: {
            numOpera: function() {
                // console.log('子组件点击了');
                this.num ++;
            }
        }
    })
    </script>
</body>
</html>
```