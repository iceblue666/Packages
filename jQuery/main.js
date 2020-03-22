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
        if(this === jQuery){
            // $.extend
            target = args[0];
            
            source.splice(0,1);
        }
        else{
            // $.fn.extend
            target = this;
            
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



    //global.jQuery = jQuery;
    //global.$ = jQuery;

    global.$ = global.jQuery = jQuery;
})(window)