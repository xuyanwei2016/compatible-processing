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

/*getCss:获取元素的样式值*/
function getCss(attr) {
    var val = null, reg = null;
    if ("getComputedStyle" in window) {
        val = window.getComputedStyle(this, null)[attr];
    } else {
        if (attr === "opacity") {
            val = this.currentStyle["filter"];
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
            val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        } else {
            val = this.currentStyle[attr];
        }
    }
    reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
    return reg.test(val) ? parseFloat(val) : val;
}



