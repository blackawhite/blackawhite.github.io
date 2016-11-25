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
    <!-- React 核心库 -->
    <script src="react.js"></script>
    <!-- React DOM 库 -->
    <script src="react-dom.js"></script>
    <!-- Babel 编译器，将 JSX 变成 JavaScript -->
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
<!-- more -->
### 使用组件
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- React 核心库 -->
    <script src="react.js"></script>
    <!-- React DOM 库 -->
    <script src="react-dom.js"></script>
    <!-- Babel 编译器，将 JSX 变成 JavaScript -->
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
    <!-- React 核心库 -->
    <script src="react.js"></script>
    <!-- React DOM 库 -->
    <script src="react-dom.js"></script>
    <!-- Babel 编译器，将 JSX 变成 JavaScript -->
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
    <!-- React 核心库 -->
    <script src="react.js"></script>
    <!-- React DOM 库 -->
    <script src="react-dom.js"></script>
    <!-- Babel 编译器，将 JSX 变成 JavaScript -->
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
    <!-- React 核心库 -->
    <script src="react.js"></script>
    <!-- React DOM 库 -->
    <script src="react-dom.js"></script>
    <!-- Babel 编译器，将 JSX 变成 JavaScript -->
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
### 传递属性
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="js/react.js"></script>
    <script src="js/react-dom.js"></script>
    <script src="js/browser.min.js"></script>
</head>

<body>
    <div id="container"></div>
    <script type="text/babel">

    var Display = React.createClass({
        render: function() {
            {/* 返回真正结果 */}
            return (
                <div>
                    <p>{this.props.color}</p>
                    <p>{this.props.num}</p>
                    <p>{this.props.size}</p>
                </div>
            );
        }
    });

    var Label = React.createClass({
        render: function() {
            {/* 调用 Display */}
            return (
                <Display {...this.props}/>
            );
        }
    });

    var Shirt = React.createClass({
        render: function() {
            {/* 调用 Label */}
            return (
                <Label {...this.props}/>
            );
        }
    });

    ReactDOM.render(
        <div>
            {/* 调用 Shirt */}
            <Shirt color="steelblue" num="3.14" size="medium" />
        </div>,
        document.querySelector("#container")
    );
    </script>
</body>
</html>
```
### 处理状态
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="js/react.js"></script>
    <script src="js/react-dom.js"></script>
    <script src="js/browser.min.js"></script>
</head>

<body>
    <div id="container"></div>
    <script type="text/babel">

    var LightningCounter = React.createClass({
        getInitialState: function() {
            return {
                strikes: 0
            };
        },
        timerTick: function() {
            {/* 调用 setState 并更新 state 对象中一些东西，render 方法也会被自动调用 */}
            this.setState({
                strikes: this.state.strikes + 100
            });
        },
        {/* componentDidMount 方法在 React 组件渲染以后将被自动调用 */}
        componentDidMount: function() {
            setInterval(this.timerTick, 1000);
        },
        render: function() {
            return (
                <h1>{this.state.strikes}</h1>
            );
        }
    });

    var LightningCounterDisplay = React.createClass({
        render: function() {
            var divStyle = {
                width: 250,
                textAlign: "center",
                backgroundColor: "black",
                padding: 40,
                fontFamily: "sans-serif",
                color: "#999",
                borderRadius: 10
            };

            return(
                <div style={divStyle}>
                    <LightningCounter/>
                </div>
            );
        }
    });

    ReactDOM.render(
        <LightningCounterDisplay/>,
        document.querySelector("#container")
    );
    </script>
</body>
</html>
```
### 从数据到UI
显示一个圆
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="js/react.js"></script>
    <script src="js/react-dom.js"></script>
    <script src="js/browser.min.js"></script>
</head>

<body>
    <div id="container"></div>
    <script type="text/babel">

    var Circle = React.createClass({
        render: function() {
            var circleStyle = {
                padding: 10,
                margin: 20,
                display: "inline-block",
                backgroundColor: this.props.bgcolor,
                borderRadius: "50%",
                width: 100,
                height: 100,
            };

            return (
                <div style={circleStyle}>
                </div>
            );
        }
    });

    var destination = document.querySelector("#container");
    function showCircle() {
        var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363"];
        var ran = Math.floor(Math.random() * colors.length);
        return <Circle bgcolor={colors[ran]}/>;
    };
    ReactDOM.render(
        <div>
            {showCircle()}
        </div>,
        destination
    );
    </script>
</body>
</html>
```
显示多个圆
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="js/react.js"></script>
    <script src="js/react-dom.js"></script>
    <script src="js/browser.min.js"></script>
</head>

<body>
    <div id="container"></div>
    <script type="text/babel">

    var Circle = React.createClass({
        render: function() {
            var circleStyle = {
                padding: 10,
                margin: 20,
                display: "inline-block",
                backgroundColor: this.props.bgcolor,
                borderRadius: "50%",
                width: 100,
                height: 100,
            };

            return (
                <div style={circleStyle}>
                </div>
            );
        }
    });

    var destination = document.querySelector("#container");
    var colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363",
              "#85FFC7", "#297373", "#FF8552", "#A40E4C"];

    var renderData = [];
    for (var i = 0; i < colors.length; i++) {
        var color = colors[i];
        // React 可以用这个唯一的标识符来优化任何将来的 UI 更新
        renderData.push(<Circle key={i + color} bgcolor={color}/>);
    }
    ReactDOM.render(
        <div>
            {renderData}
        </div>,
        destination
    );
    </script>
</body>
</html>
```
### React中的事件