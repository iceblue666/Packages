(function(){
    // 保存曾经绑定过的所有事件处理函数
    // 以DOM元素为区分
    const events = [
        // {ele:div1, type:"click", callback:function(){} },
        // {ele:div2, type:"click", callback:function(){} },
        // {ele:div3, type:"keydown", callback:function(){} },

    ];


    // 事件绑定函数
    jQuery.fn.extend({
        // 绑定事件 $("").on("click",function(){})
        on(type, callback){
            this.each(function(index, element){
                element.addEventListener(type,callback);
            })

            return this;
        },
        // 解除绑定 $("").off("click")
        off(type){
            this.each(function(index, element){

                element.removeEventListener(type);
            })
        }
    })



})();