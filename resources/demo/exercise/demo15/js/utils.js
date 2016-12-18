var utils = {
    listToArray: function(arguments){
        var arr = [];
        try{
            arr = Array.prototype.slice.call(arguments);
        }
        catch(e){
            for(var i = 0;i < arguments.length;i ++){
                arr[length] = arguments[i];
            }
        }
        return arr;
    },
    toJson: function(str){
        return "JSON" in window ? JSON.parse(str) : eval("("+ str +")");
    },
    getStyle: function(ele,attr){
        var val = null,reg = null;
        //var val = reg = null;// 这样写reg是全局的
        if(window.getComputedStyle){
            val = window.getComputedStyle(ele,null)[attr];
        }
        else{// ie6-8
            if(attr === "opacity"){
                val = ele.currentStyle["filter"];// alpha(opacty=10)
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            }
            else{
                val = ele.currentStyle[attr];
            }
        }
        // 负数、小数、单位可能出现或不出现
        reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
        return reg.test(val) ? parseFloat(val) : val;
    },
    offset: function(curEle){
        var totalLeft = 0;
        var totalTop = 0;
        var parent = curEle.offsetParent;
        totalLeft += curEle.offsetLeft;
        totalTop += curEle.offsetTop;
        while(parent){
            // 在标准的ie8中，offsetLeft已经把边框算进去了
            if(navigator.userAgent.indexOf("MSIE 8.0") === -1){// 不是ie8
                totalLeft += parent.clientLeft;// 边框
                totalTop += parent.clientTop;
            }
            totalLeft += parent.offsetLeft;
            totalTop += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {
            "top": totalTop,
            "left": totalLeft
        };
    },
    win: function(attr,value){
        if(typeof value === "undefined"){
            return document.documentElement[attr]||document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
};