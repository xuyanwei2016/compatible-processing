1.JSON是window的全局属性，它有两个方法
 JSON.parse()：把JSON格式的字符串，转成JSON格式的对象
 JSON.stringify()：把JSON格式的对象转成json格式的字符串

2.类数组转数组
 两种类数组：1）arguments  2）元素集合nodelist
 通过Array.prototype.slice 转换arguments是完全兼容
 元素集合通过Array.prototype.slice不兼容

浏览器异常捕获
try...catch(e)...finally...
因为无论走try，还是catch，finally中的运距都会执行，所以，一般不会用finally，try...catch(e)... e是错误原因

3.getCss:获取元素的样式值
"getComputedStyle" in window是兼容的情况下，可以直接获取到想要的样式

4.win:JS盒子模型-》获取和设置
JS盒子模型是否传参的两种方法
假如value没有传值就是获取，如果传值了就是替换
如果定义了形参，但是没有赋值拿到的是基本数据类型中的undefined；
如果用typeof来判断，得到的undefined一定加引号

5.offset:获取页面中任意元素距离BODY的偏移
到后来的写par = par.offsetParent;行代码 因为不写的话就一直是自己和自己父级之间的关系 不会找到父级的父级，就会形成一个死循环，
在IE8中offsetLeft下直接包含了边框，就不用写clientLeft,
用window.navigator.userAgent.indexOf('MSIE8')===-1就是看当前浏览器是不是ie8

6.hasClass:验证当前元素中是否包含className这个样式类名

7.addClass:给元素增加样式类名
验证元素身上，如果没有某个class名，进行添加，添加时一定要注意空格

8.removeClass:给元素移除样式类名
判断当前元素的样式中是否有传进来的这个样式名 有就会移除掉 被替换成空

9.setClass:给当前元素的某一个样式属性设置值(增加在行内样式上的)*
与addClass类似

10.给当前元素设置一组样式
调用的时候utils.setGroupCss(op,{width:100,height:500,background:'yellow'})

11.通过元素的样式类名获取一组元素集合

12.css:此方法实现了获取、单独设置、批量设置元素的样式值
是根据curEle里面的值来判断响应的作用 如果是一个值的话就是获取 如果是两个值的话就是单独设置 如果不是以上的个数的话就是批量设置

13.getChildren:获取当前元素下所有的子元素，并且可以有过滤的功能
或者以下的方法
//->children:获取所有的元素子节点
var flag = "getComputedStyle" in window;
    function children(curEle, tagName) {
        var ary = [];
        if (!flag) {
            var nodeList = curEle.childNodes;
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                curNode.nodeType === 1 ? ary[ary.length] = curNode : null;
            }
            nodeList = null;
        } else {
            ary = this.listToArray(curEle.children);
        }
        if (typeof tagName === "string") {
            for (var k = 0; k < ary.length; k++) {
                var curEleNode = ary[k];
                if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(k, 1);
                    k--;
                }
            }
        }
        return ary;
    }

14.prev:获取上一个哥哥元素节点
首先获取当前元素的上一个哥哥节点,判断是否为元素节点,不是的话基于当前的继续找上面的哥哥节点...一直到找到哥哥元素节点为止,如果没有哥哥元素节点,返回null即可

15.获取下一个弟弟元素节点








