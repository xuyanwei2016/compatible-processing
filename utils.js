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

/*win:操作浏览器的盒子模型信息*/
function win(attr, value) {
    if (typeof value === "undefined") {
        return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = value;
    document.body[attr] = value;
}

/*offset:获取页面中任意元素距离BODY的偏移*/
function offset(curEle) {
    var disLeft = curEle.offsetLeft, disTop = curEle.offsetTop, par = curEle.offsetParent;
    while (par) {
        if (navigator.userAgent.indexOf("MSIE 8") === -1) {
            disLeft += par.clientLeft;
            disTop += par.clientTop;
        }
        disLeft += par.offsetLeft;
        disTop += par.offsetTop;
        par = par.offsetParent;
    }
    return {left: disLeft, top: disTop};
}

/*hasClass:验证当前元素中是否包含className这个样式类名*/
function hasClass(curEle, className) {
    var reg = new RegExp("(^| +)" + className + "( +|$)");
    return reg.test(curEle.className);
}

/*addClass:给元素增加样式类名*/
function addClass(curEle, className) {
    var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
    for (var i = 0, len = ary.length; i < len; i++) {
        var curName = ary[i];
        if (!this.hasClass(curEle, curName)) {
            curEle.className += " " + curName;
        }
    }
}

/*removeClass:给元素移除样式类名*/
function removeClass(curEle, className) {
    var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
    for (var i = 0, len = ary.length; i < len; i++) {
        var reg=new RegExp('(^| +)'+ary[i]+'( +|$)','g');
        if (reg.test(curEle.className)) {
            curEle.className=curEle.className.replace(reg,' ').replace(/(^ +)|( +$)/g,'').replace(/\s+/g,'');
        }
    }
}

/*setCss:给当前元素的某一个样式属性设置值(增加在行内样式上的)*/
function setCss(attr, value) {
    if (attr === "float") {
        this["style"]["cssFloat"] = value;
        this["style"]["styleFloat"] = value;
        return;
    }
    if (attr === "opacity") {
        this["style"]["opacity"] = value;
        this["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
        return;
    }
    var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
    if (reg.test(attr)) {
        if (!isNaN(value)) {
            value += "px";
        }
    }
    this["style"][attr] = value;
}

/*setGroupCss:给当前元素批量的设置样式属性值*/
function setGroupCss(curEle,opt) {
    for (var attr in opt) {//attr:width,height,opt:100
        this.setCss(curEle,attr,opt[attr]);
    }
}









