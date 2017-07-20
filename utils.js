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

/*getElementsByClass:通过元素的样式类名获取一组元素集合*/
function getElementsByClass(strClass, context) {
    context = context || document;
    if ("getComputedStyle" in window) {
        return this.makeArray(context.getElementsByClassName(strClass));
    }
    //->IE6~8  'c1 c2'  ['c1','c2']
    var ary = [], strClassAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/g);
    var nodeList = context.getElementsByTagName("*");
    for (var i = 0, len = nodeList.length; i < len; i++) {
        var curNode = nodeList[i];
        var isOk = true; // div className = 'c1 c2 '  ' c3 c2 '  c2
        for (var k = 0; k < strClassAry.length; k++) {
            var reg = new RegExp("(^| +)" + strClassAry[k] + "( +|$)");
            if (!reg.test(curNode.className)) {
                isOk = false;
                break;
            }
        }
        if (isOk) {
            ary[ary.length] = curNode;
        }
    }
    return ary;
}

/*css:此方法实现了获取、单独设置、批量设置元素的样式值*/
function css(curEle) {
    var argTwo = arguments[1], ary = Array.prototype.slice.call(arguments, 1);
    if (typeof argTwo === "string") {
        if (typeof arguments[2] === "undefined") {
            return getCss.apply(curEle, ary);
        }
        setCss.apply(curEle, ary);
    }
    argTwo = argTwo || 0;
    if (argTwo.toString() === "[object Object]") {
        setGroupCss.apply(curEle, ary);
    }
}

/*getChildren:获取当前袁术下所有的子元素，并且可以有过滤的功能*/
function getChildren(curEle,tagName){
    //获取所有的子节点
    var nodeList=curEle.childNodes;
    var ary=[];
    //逐个验证每个子节点是否为元素节点
    for(var i=0;i<nodeList.length;i++){
        var cur=nodeList[i];
        if(cur&&cur.nodeType===1){
            //第二个参数不存在：没有过滤的功能
            if (tagName===undefined){
                ary.push(cur);
            }else{
                //说明第二个参数不存在，又过滤的功能
                if(cur.tagName.toLocaleLowerCase()===tagName.toLowerCase()){
                    ary.push(cur);
                }
            }
        }
    }
    return ary;
}

/*prev:获取上一个哥哥元素节点*/
function prev(curEle) {
    if ("getComputedStyle" in window) {
        return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
}

/*next:获取下一个弟弟元素节点*/
function next(curEle) {
    if ("getComputedStyle" in window) {
        return curEle.nextElementSibling;
    }
    var nex = curEle.nextSibling;
    while (nex && nex.nodeType !== 1) {
        nex = nex.nextSibling;
    }
    return nex;
}

/*sibling:获取相邻的两个元素节点*/
function sibling(curEle) {
    var pre = this.prev(curEle);
    var nex = this.next(curEle);
    var ary = [];
    pre ? ary.push(pre) : null;
    nex ? ary.push(nex) : null;
    return ary;
}

/*siblings:获取所有的兄弟元素节点*/
function siblings(curEle) {
    return this.prevAll(curEle).concat(this.nextAll(curEle));
}

/*prevAll:获取所有的哥哥元素节点*/
function prevAll(curEle) {
    var ary = [];
    var pre = this.prev(curEle);
    while (pre) {
        ary.unshift(pre);
        pre = this.prev(pre);
    }
    return ary;
}
