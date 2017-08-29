/*
* dynamicNav（options）//标题特效
* direction:"up", //动画切换方向，总共4种up 、down 、left 、right
* duration:100  //三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000)
* */
(function($){
    $.fn.dynamicNav=function(options){

        //默认配置
        var defaults = {
            direction:"up", //动画切换方向，总共4种up 、down 、left 、right
            duration:100  //三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000)
        };

        // 覆盖默认配置
        var opts = $.extend(defaults, options);

        this.each(function(){
            var navList=$(this).find("li"),
                navLink=navList.find("a");

            //在a标签外侧插入span
            navList.wrapInner("<span></span>");

            var span=navLink.parent();

            //判断是否垂直切换
            if(opts.direction=="up" || opts.direction=="down"){
                var v=true;
            }

            //判断是否改变span初始位置及a样式
            if(opts.direction=="right" || opts.direction=="down"){
                var restSpan=true;
            }

            navLink.each(function(){

                //获取a高度和宽度
                var w=$(this).outerWidth(),
                    p=$(this).parent();

                //初始复制现有a标签
                $(this).clone().appendTo(p).addClass("over");

                //如果是垂直切换
                if(v){
                    p.css("width",w);
                }else{
                    p.css("width",2*w).parent().css("width",w);
                }

            });

            //如果向右或向下切换，改变span初始位置及a样式
            if(restSpan){
                span.each(function(){

                    if(opts.direction=="right"){
                        $(this).css({"margin-left":-$(this).outerWidth()/2});
                    }

                    if(opts.direction=="down"){
                        $(this).css({"margin-top" : -$(this).outerHeight()/2});
                    }

                    $(this)
                        .find('a')
                        .last()
                        .removeClass("over")
                        .prev()
                        .addClass("over");
                });
            }

            //鼠标经过时动画函数
            function over(o){
                o.animate(v?{"margin-top": -o.outerHeight()/2}:{"margin-left": -o.outerWidth()/2}, opts.duration);
            }

            //鼠标移开时动画函数
            function out(o){
                o.animate(v?{"margin-top":0}:{"margin-left": 0}, opts.duration);
            }

            //鼠标经过和离开
            span.hover(function(){
                restSpan ? out($(this)) : over($(this));
            },function(){
                restSpan ? over($(this)) : out($(this));
            });

        });
    };

})(jQuery);
