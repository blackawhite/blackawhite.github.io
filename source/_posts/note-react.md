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
        componentDidMount: function() {
            {/* componentDidMount 方法在 React 组件渲染以后将被自动调用 */}
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
    var destination = document.querySelector("#container");

    var Counter = React.createClass({
        render: function(){
            var textStyle = {
                fontSize: 72,
                fontFamily: "sans-serif",
                color: "#333",
                fontWeight: "bold"
            };
            return (
                <div style={textStyle}>
                    {this.props.display}
                </div>
            );
        }
    });

    var CounterParent = React.createClass({
        getInitialState: function(){
            return {
                count: 0
            };
        },
        increase: function(e){
            var currentCount = this.state.count;
            if(e.shiftKey){
                currentCount += 10;
            }
            else{
                currentCount += 1;
            }
            this.setState({
                count:  currentCount
            });
        },
        render: function(){
            var backgroundStyle = {
                padding: 50,
                backgroundColor: "#FFC53A",
                width: 250,
                height: 100,
                borderRadius: 10,
                textAlign: "center"
            };
            var buttonStyle = {
                fontSize: "1em",
                width: 30,
                height: 30,
                fontFamily: "sans-serif",
                color: "#333",
                fontWeight: "bold",
                lineHeight: "3px"
            };
            return (
                <div style={backgroundStyle}>
                    <Counter display={this.state.count}/>
                    <button onClick={this.increase} style={buttonStyle}>+</button>
                </div>
            );
        }
    });
    ReactDOM.render(
        <div>
            <CounterParent/>
        </div>,
        destination
    );
    </script>
</body>
</html>
```
不能在组件上监听事件
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
    // 不能直接在组件上监听事件
    var destination = document.querySelector("#container");

    var Counter = React.createClass({
        render: function(){
            var textStyle = {
                fontSize: 72,
                fontFamily: "sans-serif",
                color: "#333",
                fontWeight: "bold"
            };
            return (
                <div style={textStyle}>
                    {this.props.display}
                </div>
            );
        }
    });

    var CounterParent = React.createClass({
        getInitialState: function(){
            return {
                count: 0
            };
        },
        increase: function(e){
            var currentCount = this.state.count;
            if(e.shiftKey){
                currentCount += 10;
            }
            else{
                currentCount += 1;
            }
            this.setState({
                count:  currentCount
            });
        },
        render: function(){
            var backgroundStyle = {
                padding: 50,
                backgroundColor: "#FFC53A",
                width: 250,
                height: 100,
                borderRadius: 10,
                textAlign: "center"
            };
            var buttonStyle = {
                fontSize: "1em",
                width: 30,
                height: 30,
                fontFamily: "sans-serif",
                color: "#333",
                fontWeight: "bold",
                lineHeight: "3px"
            };
            return (
                <div style={backgroundStyle}>
                    <Counter display={this.state.count}/>
                    {/* <button onClick={this.increase} style={buttonStyle}>+</button> */}
                    <PlusButton clickHandler={this.increase}/>
                </div>
            );
        }
    });
    var PlusButton = React.createClass({
        render: function(){
            return (
                <button onClick={this.props.clickHandler}>+
                </button>
            );
        }
    });
    ReactDOM.render(
        <div>
            <CounterParent/>
        </div>,
        destination
    );
    </script>
</body>
</html>
```
对于那些 React 官方不能识别的事件，你必须用传统的 addEventListener，加上一些额外的手段，就像下面这样：
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
    var Something = React.createClass({
        handleMyEvent: function(e) {
            // do something
        },
        // 在组件被渲染时自动调用
        componentDidMount: function() {
            window.addEventListener("someEvent", this.handleMyEvent);
        },
        componentWillUnmount: function() {
            window.removeEventListener("someEvent", this.handleMyEvent);
        },
        render: function() {
            return (
                <div>Hello!</div>
            );
        }
    }); 
    </script>
</body>
</html>
```
### 单页应用
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="js/react.js"></script>
    <script src="js/react-dom.js"></script>
    <script src="js/browser.min.js"></script>
    <script src="js/ReactRouter.min.js"></script>
    <style>
    #container{
        padding: 50px;
        background-color: #fff;
    }
    body {
        background-color: #FFCC00;
        padding: 20px;
        margin: 0;
    }
    h1, h2, p, ul, li {
        font-family: Helvetica, Arial, sans-serif;
    }
    ul.header li {
        display: inline;
        list-style-type: none;
        margin: 0;
    }
    ul.header {
        background-color: #111;
        padding: 0;
    }
    ul.header li a {
        color: #FFF;
        font-weight: bold;
        text-decoration: none;
        padding: 20px;
        display: inline-block;
    }
    .content {
        background-color: #FFF;
        padding: 20px;
    }
    .content h2 {
        padding: 0;
        margin: 0;
    }
    .content li {
        margin-bottom: 10px;
    }
    .active {
        background-color: #0099FF;
    }
    </style>
</head>
<body>
    <div id="container"></div>
    <script type="text/babel">
    var Home = React.createClass({
        render: function() {
            return (
                <div>
                    <h2>HELLO</h2>
                    <p>Cras facilisis urna ornare ex volutpat, et
                    convallis erat elementum. Ut aliquam, ipsum vitae
                    gravida suscipit, metus dui bibendum est, eget rhoncus nibh
                    metus nec massa. Maecenas hendrerit laoreet augue
                    nec molestie. Cum sociis natoque penatibus et magnis
                    dis parturient montes, nascetur ridiculus mus.</p>
                    <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
                </div>
            );
        }
    });
    var Contact = React.createClass({
        render: function() {
            return (
                <div>
                    <h2>GOT QUESTIONS?</h2>
                    <p>The easiest thing to do is post on our <a href="http://forum.kirupa.com">forums</a>.</p>
                </div>
            );
        }
    });
    var Stuff = React.createClass({
        render: function() {
            return (
                <div>
                    <h2>STUFF</h2>
                    <p>Mauris sem velit, vehicula eget sodales vitae,
                    rhoncus eget sapien:</p>
                    <ol>
                        <li>Nulla pulvinar diam</li>
                        <li>Facilisis bibendum</li>
                        <li>Vestibulum vulputate</li>
                        <li>Eget erat</li>
                        <li>Id porttitor</li>
                    </ol>
                </div>
            );
        }
    });
    var App = React.createClass({
        render: function() {
            return (
                <div>
                    <h1>Simple SPA</h1>
                    <ul className="header">
                        <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                        <li><Link to="/stuff" activeClassName="active">Stuff</Link></li>
                        <li><Link to="/contact" activeClassName="active">Contact</Link></li>
                    </ul>
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            )
        }
    });
    var destination = document.querySelector("#container");
    var {
        Router,
        Route,
        IndexRoute,
        IndexLink,
        Link
    } = ReactRouter;
    ReactDOM.render(
        <Router>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="stuff" component={Stuff} />
                <Route path="contact" component={Contact} />
            </Route>
        </Router>,
        destination
    );
    </script>    
</body>
</html>
```