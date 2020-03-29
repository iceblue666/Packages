(function(global){
    function jQuery(selector){
        // 1. 获取页面所有元素
        // 2. 把这个元素放到一个对象中

        return new jQuery.prototype.init(selector);
    }



    jQuery.fn = jQuery.prototype = {
        constructor:jQuery,
        init:function(selector){
            if(jQuery.type(selector) === "string"){
    
                // jQuery 内部封装一个Sizzle引擎DOM元素
        
                const elements = document.querySelectorAll(selector);
        
                // jQuery为了操作方便，实际上是把元素变成一个数组绑定在自己身上，可以用for遍历，这样的对象特性就是【伪数组】
        
                for(let i = 0;i < elements.length; i++){
                    var ele = elements[i]
                    this[i] = ele;
                }
                this.length = elements.length;

            }
            else{
                // 为了把一个DOM元素转化成jQuery对象
                this[0] = selector;
                this.length = 1;

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

    jQuery.extend({
        // $.each([1,9,6,3],function(index,value){})
        // $.each({name:"Hello",age:18},function(key,value){})
        // $.each工具类：遍历对象或者数组
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

            return this;
        },
        // $.type(1) --> "number"
        type(data){
            var type = Object.prototype.toString.call(data);
            return type.replace("[object ", "").replace("]", "").toLowerCase();
        }
    })

    // CSS样式类方法
    jQuery.fn.extend({

        // 1. 获取样式$("div").css("color") 只能获取到第一个div的颜色
        // 2. 设置样式
        //      $("div").css("color","red")
        //      $("div").css({"color":"red","backgroundColor":"blue"})
        css(...args) {
            var arg1 = args[0],
                arg2 = args[1];
            if(args.length === 1){
                // 参数个数 1
                if(jQuery.type(arg1) === "string"){
                    // a. 获取样式:只获取第一个元素的样式
                    let firstDom = this[0];
                    // 错误示例，style的方法只能获取行内样式
                    // return firstDom.style[arg1];
                    let domStyleObj = window.getComputedStyle(firstDom,null);
                    return domStyleObj[arg1];
                }
                else{
                    // b. 设置多个样式 是一个对象
                    // this.each(function(index, dom){
                    //     // jQuery.each(arg1, (key, value)=>{
                    //     //     this.style[key] = value;
                    //     // })
                    // })
                    var _that = this;
                    // 优化一下
                    jQuery.each(arg1, function(key, value) {
                        _that.css(key,value);
                    })

                    return _that;
                }

            }
            else{
                // 参数个数 2 设置每一个元素的单个样式

                // this.each(function(index, dom){
                //     this.style[arg1] = arg2;
                // })
                // return this;

                // 优化一下:在each方法中最后返回this
                return this.each(function(index, dom){
                    this.style[arg1] = arg2;
                })
            }
        },
        show(){
            // 让所有元素显示
            return this.css("display", "block");
        },
        hide(){
            return this.css("display", "none");
        },
        toggle(){
            return this.each(function(){
                // if(jQuery(this).css("display") === "none"){
                //     jQuery(this).show();
                // }
                // else{
                //     jQuery(this).hide();
                // }
                // jQuery(this).css("display") === "none"?
                //     jQuery(this).show():
                //     jQuery(this).hide();

                // 优化1
                // let $this = jQuery(this);
                // $this.css("display") === "none"?
                //     this.show():
                //     this.hide();

                // 优化2
                let $this = jQuery(this);
                $this[$this.css("display") === "none"?"show":"hide"]();


            })
        }
    })

    jQuery.fn.extend({
        each(callback){
            jQuery.each(this, callback);
        }

    })



    global.$ = global.jQuery = jQuery;
})(window)