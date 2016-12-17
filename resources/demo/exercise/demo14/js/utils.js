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
    }
};