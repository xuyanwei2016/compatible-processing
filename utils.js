/*jsonParse:功能是把JSON格式的字符串转成JSON格式的对象*/
function jsonParse(jsonStr) {
    return 'JSON'in window?JSON.parse(jsonStr):eval('('+jsonStr+')');
}

/*makeArray类数组转数组*/
function makeArray(arg) {
    try{//浏览器支持，直接使用slice+call方法
        return Array.prototype.slice.call(arg);
    }catch(e){//浏览器不支持的时候
        var ary=[];
        for(var i=0;i<arg.length;i++){
            ary.push(arg[i])
        }
        return ary;
    }
}




