var oTab = document.getElementById("tab");

var oThead = oTab.tHead;
var oTBody = oTab.tBodies[0];
var aThs = oThead.rows[0].cells;// 注意这里的获取姿势
var aRows = oTBody.rows;

var data = null;

var xhr = new XMLHttpRequest;
xhr.open("get","./js/data.txt",false);// 同步
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
        data = utils.toJson(xhr.responseText);// 数组形式的JSON
    }
};
xhr.send();

function dataInit(){// 初始化数据
    var frg = document.createDocumentFragment();
    for(var i = 0;i < data.length;i ++){
        var oTr = document.createElement("tr");

        for(var key in data[i]){
            var oTd = document.createElement("td");
            if(key === "sex"){
                oTd.innerHTML = data[i][key] === 0 ? "男" : "女";
            }
            else{
                oTd.innerHTML = data[i][key];
            }
            
            oTr.appendChild(oTd);
        }

        frg.appendChild(oTr);
    }
    oTBody.appendChild(frg);
    frg = null;
}
dataInit();

function changeBg(){// 隔行变色
    for(var i = 0;i < aRows.length;i ++){
        aRows[i].style.backgroundColor = i % 2 === 0 ? "" : "pink";
    }
}
changeBg();

function sort(num){
    var aRowsArr = utils.listToArray(aRows);// 类数组转数组

    for(var i = 0;i < aThs.length;i ++){
        if(i !== this.index){
            aThs[i].flag = -1;
        }
    }
    this.flag *= -1;
    var _this = this;
    aRowsArr.sort(function(a,b){
        var cur = parseFloat(a.cells[num].innerHTML);
        var next = parseFloat(b.cells[num].innerHTML);
        var curCon = a.cells[num].innerHTML;
        var nextCon = b.cells[num].innerHTML;

        if(isNaN(cur) || isNaN(next)){
            return (curCon.localeCompare(nextCon)) * _this.flag;
        }
        else{
            return (cur - next) * _this.flag;
        }
    });

    for(var i = 0;i < aRowsArr.length;i ++){
        oTBody.appendChild(aRowsArr[i]);
    }
}

for(var i = 0;i < aThs.length;i ++){
    aThs[i].index = i;
    aThs[i].flag = -1;
    aThs[i].onclick = function(){
        sort.call(this,this.index);
        changeBg();
    };
}


