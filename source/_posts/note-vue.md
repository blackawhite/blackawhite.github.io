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
### 组件
#### 模态框
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        p,h4{
            margin:0;
        }
        .modal{
            width: 500px;
            background-color: #fff;
            border: 1px solid rgba(0,0,0,.2);
            border-radius: 6px;
            box-shadow: 0 3px 9px rgba(0,0,0,.5);

        }
        .modal-header {
            padding: 15px;
            border-bottom: 1px solid #e5e5e5;
        }
        .modal-content div {
            padding: 20px;
        }
        .modal-footer {
            padding: 15px;
            text-align: right;
            border-top: 1px solid #e5e5e5;
        }
        .btn {
            padding: 5px 15px;
            border: none;
            outline: none;
        }
        .blue {
            color: #fff;
            background-color: #39f;
            border-color: #39f;
        }
    </style>
    <script src="vue-new.js"></script>
</head>
<body>
    <div id="app">
        <!-- 注意:modal-title和modal-title的区别 -->
        <m-modal modal-title="提醒" @my-confirm="confirm" @my-cancel="cancel">
            <div slot="modal-content">
                <ul>
                    <li v-for="item in items">{{item}}</li>
                </ul>
            </div>
            <div slot="modal-footer">
                <span @click="confirm">确定</span>
                <span @click="cancel">取消</span>
            </div>
        </m-modal>
    </div>
    <script>
    /*
        设置的props：
            modalTitle 提醒信息 默认为 '这是一个模态框'

        定制模板：
            slot为modal-content     定制提醒信息模板
            slot为modal-footer      定制底部模板

        监控子组件状态变化：
            事件名my-confirm        点击确定触发
            事件名my-cancel         点击取消触发
    */

    Vue.component("m-modal",{
        props: {
            modalTitle: {
                type: String,
                default: "这是一个模态框"
            }
        },
        template:`
        <div class="modal">
            <div class="modal-header">
                <h4>{{modalTitle}}</h4>
            </div>
            <div class="modal-content">
                <slot name="modal-content">
                    <div>这是内容</div>
                </slot>
            </div>
            <div class="modal-footer">
                <slot name="modal-footer">
                    <input class="btn blue" type="button" value="确定" @click="confirm" />
                    <input class="btn" type="button" value="取消" @click="cancel" />
                </slot>
            </div>
        </div>
        `,
        methods: {
            confirm: function() {
                this.$emit('my-confirm');
            },
            cancel: function() {
                this.$emit('my-cancel');
            }
        }
    });
    new Vue({
        el: "#app",
        data: {
            items: ["吃饭", "睡觉", "打豆豆"]
        },
        methods: {
            confirm: function() {
                console.log('子组件点击了确定');
            },
            cancel: function() {
                console.log('子组件点击了取消');
            }
        }
    })
    </script>
</body>
</html>
```