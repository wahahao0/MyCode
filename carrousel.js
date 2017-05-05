/*广告图片数组*/
var imgs=[
	{"i":0,"img":"images/1.jpg"},
    {"i":1,"img":"images/2.jpg"},
    {"i":2,"img":"images/3.jpg"},
    {"i":3,"img":"images/4.jpg"},
    {"i":4,"img":"images/5.jpg"},
];
var slider={
    LIWIDTH:670,//一张广告宽度
    $imgs:null,//保存ul imgs
    $idxs:null,//保存ul indexs
    DURATION:1000,//每次轮播时间
    WAIT:4000,//每次轮播等待时间
    timer:null,//保存自动轮播序号
    init(){//初始化:
        //获得id为slider的div的宽保存在LIWIDTH中
        this.LIWIDTH=parseFloat($("#slider").css("width"));
        //获得id为imgs的ul保存在$imgs中
        this.$imgs=$("#imgs");
        //获得id为indexs的ul保存在$idxs中
        this.$idxs=$("#indexs");
        //更新页面
        this.updateView();
        //启动自动轮播
        this.startAuto();
        //为$idxs添加鼠标进入事件委托 只允许li元素响应
        this.$idxs.on("mouseover","li",e=>{

            //if(!$(e.))
            //停止一次性定时器
            clearTimeout(this.timer);this.timer=null;
            this.$imgs.stop(true);
            //找到$idxs下class为hover的li 获取其内容把存在start
            var start=this.$idxs.children(".hover").html();
            //获取当前li的内容波存在end
            var end=$(e.target).html();
            //调用move 传入end-start
            this.move(end-start);
            });
    },
updateView(){//根据数组更新页面
        //遍历imgs中每个对象,同时定义空字符串imgsHTML和idxsHTML
        for(var i=0,imgsHTML="",idxsHTML="";i<imgs.length;i++){
          //向imgsHTML中拼接:
            //<li><img src=当前元素的img属性/></li>
            imgsHTML+=`<li><img src="${imgs[i].img}"/></li>`
          //向idxsHTML中拼接
            //<li>i+1</li>
            idxsHTML+=`<li>${i+1}</li>`;
        //(遍历结束)
        }
        //设置$imgs的内容为imgsHTML
        //设置$imgs的宽为imgs数组的元素个数*LIWIDTH
        this.$imgs.html(imgsHTML).css("width",imgs.length*this.LIWIDTH); 
        //设置$idxs的内容为idxsHTML
        this.$idxs.html(idxsHTML);
        //获得数字imgs中第0个元素的i属性保存在i中  
        //为$idxs下第i个子元素添加hover class
        this.$idxs.children(`:eq(${imgs[0].i})`).addClass("hover");
    },
        startAuto(){//启动自动轮播
            //启用定时器 调用move 传入1
            this.timer=setTimeout(this.move.bind(this,1),this.WAIT)
        },
        //启动轮播
        move(n){
            //n>0右移
            if(n>0){
            //$imgs的leftzaiDURATION时间内移动到-n*LIWIDTH
            this.$imgs.animate({
                left:-n*this.LIWIDTH
            },this.DURATION,()=>{
                //删除imgs数组来头的n个元素 拼接到结尾
                imgs=imgs.concat(imgs.splice(0,n));
                //更新界面
                this.updateView();
                //清除$imgs的left
                this.$imgs.css("left",0);

                this.startAuto();
                });
                //大到小
            }else{
                //n*-1
                n*=-1;
                //删除imgs结尾的n个元素 拼接到开头
                imgs=imgs.splice(-n,n).concat(imgs);
                //更新页面
                this.updateView();
                //修改$imgs的left-n*LIWIDTH
                var left=parseFloat(this.$imgs.css("left"));
                this.$imgs.css("left",left-n*this.LIWIDTH);
                //启动动画 让$imgs的left在DURATION时间内移动到0
                this.$imgs.animate({left:0},
                    this.DURATION,
                    ()=>this.startAuto()    
                );
            }
        },
}
slider.init();



















