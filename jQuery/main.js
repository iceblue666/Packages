(function(global){
    function jQuery(selector){
        // 1. 获取页面所有元素
        // 2. 把这个元素放到一个对象中

        return new jQuery.prototype.init(selector);
    }



    jQuery.fn = jQuery.prototype = {
        constructor:jQuery,
        init:function(selector){
            // jQuery 内部封装一个Sizzle引擎DOM元素
    
            const elements = document.querySelectorAll(selector);
    
            // jQuery为了操作方便，实际上是把元素变成一个数组绑定在自己身上，可以用for遍历，这样的对象特性就是【伪数组】
    
            for(let i = 0;i < elements.length; i++){
                var ele = elements[i]
                this[i] = ele;
            }
            this.length = elements.length;
            
        },
        css(name, value) {
            for(let i = 0; i < this.length; i++){
                let element = this[i];
                element.style[name] = value;
            }
        }
    }

    jQuery.prototype.init.prototype = jQuery.prototype;

    jQuery.fn.extend = jQuery.extend = function (...args) { 
        let target,source = [];

        source = [...args];
        // 判断是谁调用
        if(source.length === 1){
            // $.extend
            target = this;
        }
        else{

            target = args[0];
            
            source.splice(0,1);
            
        }

        source.forEach(function(item,index){
            // item:每个源对象

            // 去除对象的每一个属性
            Object.keys(item).forEach(function(key){
                target[key] = item[key];
            })
        })
        return target;
    }

    // 授人以鱼不如授人以渔
    // $.ajax等工具类方法
    // jQuery.extend({
    //     each:function(){
    //         console.log("each");
    //     },
    //     ajax:function(){
    //         console.log("ajax");
    //     }
    // })

    // $("")对象的方法
    // jQuery.fn.extend({
    //     attr(){

    //     },
    //     on(){

    //     }
    // })

    //global.jQuery = jQuery;
    //global.$ = jQuery;

    // $.each([1,9,6,3],function(index,value){})
    // $.each({name:"Hello",age:18},function(key,value){})
    // $.each工具类：遍历对象或者数组
    jQuery.extend({
        each(obj, callback){
            // 有两种情况
            // 数组和对象

            // Object.prototype.toString(obj) === "[object Array]")可以判断数组
            // 但是不能判断伪数组，如{0:100, length:1}
            // 判断的方法就是是否含有length属性，且值>=0
            if((length in obj) && (obj.length >= 0)){
                for(let i = 0; i < obj.length; i++){
                    callback.call(obj[i], i, obj[i]);
                }
            }
            else{
                for(let i in obj){
                    callback.call(obj[i], i, obj[i]);
                }
            }
        }
    })

    global.$ = global.jQuery = jQuery;
})(window)