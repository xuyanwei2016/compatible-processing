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





