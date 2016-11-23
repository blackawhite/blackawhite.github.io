---
title: React初探
date: 2016-11-23 21:29:01
tags: React
categories: React
---
### 第一个React程序
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- React核心库 -->
    <script src="react.js"></script>
    <!-- React DOM库 -->
    <script src="react-dom.js"></script>
    <!-- Babel编译器，将 JSX 变成 JavaScript -->
    <script src="browser.min.js"></script>
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
    var destination = document.querySelector("#container");
    ReactDOM.render(
        <h1>Hello World</h1>,
        destination
    );
    /*ReactDOM.render(React.createElement(
        "h1",
        null,
        "Hello World"
    ), destination);*/
    </script>
</body>
</html>
```
### 使用组件
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- React核心库 -->
    <script src="react.js"></script>
    <!-- React DOM库 -->
    <script src="react-dom.js"></script>
    <!-- Babel编译器，将 JSX 变成 JavaScript -->
    <script src="browser.min.js"></script>
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
    {/* 定义 */}
    var HelloWorld = React.createClass({
        render: function() {
            return (
                <p>Hello, {this.props.greetTarget}!</p>
            );
        }
    });
    ReactDOM.render(
        <div>
            {/* 调用 */}
            <HelloWorld greetTarget="Batman"/>
            <HelloWorld greetTarget="Iron Man"/>
            <HelloWorld greetTarget="Nicolas Cage"/>
            <HelloWorld greetTarget="Mega Man"/>
            <HelloWorld greetTarget="Bono"/>
            <HelloWorld greetTarget="Catwoman"/>
        </div>,
        document.querySelector("#container")
    );
    </script>
</body>
</html>
```
在组件调用中也可以放子元素
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- React核心库 -->
    <script src="react.js"></script>
    <!-- React DOM库 -->
    <script src="react-dom.js"></script>
    <!-- Babel编译器，将 JSX 变成 JavaScript -->
    <script src="browser.min.js"></script>
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
    var Buttonify = React.createClass({
        render: function() {
            return (
                <button type={this.props.behavior}>{this.props.children}</button>
            );
        }
    });   
    ReactDOM.render(
        <div>
            <Buttonify behavior="Submit">SEND DATA</Buttonify>
        </div>,
        document.querySelector("#container")
    );    
    </script>
</body>
</html>
```
### React中设置样式
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- React核心库 -->
    <script src="react.js"></script>
    <!-- React DOM库 -->
    <script src="react-dom.js"></script>
    <!-- Babel编译器，将 JSX 变成 JavaScript -->
    <script src="browser.min.js"></script>
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
    var Letter = React.createClass({
        render: function() {
            var letterStyle = {
              padding: 10,
              margin: 10,
              backgroundColor: this.props.bgcolor,
              color: "#333",
              display: "inline-block",
              fontFamily: "monospace",
              fontSize: "32px",
              textAlign: "center"
            };
            return (
                <div style={letterStyle}>
                    {this.props.children}
                </div>
            );
        }
    });

    var destination = document.querySelector("#container");

    ReactDOM.render(
        <div>
            <Letter bgcolor="red">A</Letter>
            <Letter bgcolor="green">E</Letter>
            <Letter bgcolor="blue">I</Letter>
            <Letter bgcolor="black">O</Letter>
            <Letter bgcolor="pink">U</Letter>
        </div>,
        destination
    );
    </script>
</body>
</html>
```
### 创建复杂的组件
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- React核心库 -->
    <script src="react.js"></script>
    <!-- React DOM库 -->
    <script src="react-dom.js"></script>
    <!-- Babel编译器，将 JSX 变成 JavaScript -->
    <script src="browser.min.js"></script>
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
    var Card = React.createClass({
        render: function() {
            var cardStyle = {
                height: 200,
                width: 150,
                padding: 0,
                backgroundColor: "#FFF",
                WebkitFilter: "drop-shadow(0px 0px 5px #666)",
                filter: "drop-shadow(0px 0px 5px #666)"
            };

            return (
                <div style={cardStyle}>
                    {/* 组件内部也可以调用组件 */}
                    {/* 一级一级的向上找 */}
                    <Square color={this.props.color}/>
                    <Label color={this.props.color}/>
                </div>
            );
        }
    });
    {/* 上 */}
    var Square = React.createClass({
        render: function() {
            {/* 一级一级的向上找 */}
            var squareStyle = {
                height: 150,
                backgroundColor: this.props.color
            };
            return(
                <div style={squareStyle}>

                </div>
            );
        }
    });
    {/* 下 */}
    var Label = React.createClass({
        render: function() {
            var labelStyle = {
                fontFamily: "sans-serif",
                fontWeight: "bold",
                padding: 13,
                margin: 0
            };
            {/* 一级一级的向上找 */}
            return (
                <p style={labelStyle}>{this.props.color}</p>
            );
        }
    });

    ReactDOM.render(
        <div>
            {/* 夷，找到啦 */}
            <Card color="#FF6663"/>
        </div>,
        document.querySelector("#container")
    );
    </script>
</body>
</html>
```
