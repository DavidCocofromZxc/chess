


/**
 *
 *  场景基类
 *  -方便调试   -左上角固定返回按钮
 *  -视觉醒目   -添加背景
 *
 * */


var BaseLayer = cc.Layer.extend({

    backButton      :null,
    bgColorLayer    :null,
    //下面这个两个可以封装在一起
    loading         :null,
    isShowloading   :false,

    ctor:function () {
        this.backButton     = null;
        this.bgColorLayer   = null;
        this.loading        = null;
        this.isShowloading  = false;

        this._super();
        this.loadButton();      //加载button
        this.loadBgColorLayer();//bgColor
        return true;
    },

    /** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * load
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  */

    //加载button
    loadButton:function(){
        var btn = new ccui.Button(res.leftArrow_png);
        btn.setScale(2,2);
        this.addChild(btn,999);
        let bj = 5;//边距
        btn.setAnchorPoint(0,1);
        btn.setPosition( bj,cc.winSize.height - btn.height - bj);
        //附加点击事件
        btn.setTouchEnabled(true);
        btn.addTouchEventListener(this.onTouchEvent,this);//cc.widget.touch事件
        this.backButton = btn;
    },
    //加载bg
    loadBgColorLayer:function(){
        var bg = new ccui.Layout();
        this.addChild(bg,0);
        bg.setAnchorPoint(0,0);
        this.bgColorLayer = bg;
    },

    /** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * other
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  */

    //设置白
    setWhiteStyleBg:function(){
        if(this.bgColorLayer ==  null){
            var bg = new ccui.Layout();
            this.addChild(bg,0);
            bg.setAnchorPoint(0,0);
            bg.setContentSize(cc.winSize.width,cc.winSize.height);
            this.bgColorLayer = bg;
        
        }
        this.bgColorLayer.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.bgColorLayer.setBackGroundColor(cc.color(100,100,100));
        this.bgColorLayer.setBackGroundColorOpacity(255);
    },
    //显示加载条&加载状态
    showLoading:function(){
        if(this.loading == null){
            var load = new cc.Sprite(res.loading);
            this.addChild(load,999);
            load.setAnchorPoint(0.5,0.5);
            load.setPosition(cc.winSize.width/2,cc.winSize.height/2);
            this.loading = load;
        }
        if(this.isShowloading == false){
            var rotateA = cc.rotateBy(0.5,-180);
            var rotateB = cc.rotateBy(0.25,-90);
            var rotateC = cc.rotateBy(0.45,-90);
            var sequence = cc.sequence(rotateA,rotateB,rotateC);
            this.loading.runAction(sequence.repeatForever());
            this.isShowloading = true;
        }
    },
    //停止加载
    stopLoading:function(){
        if(this.loading != null){
            this.loading.stopAllActions();
            this.loading.removeFromParent();
            this.loading = null;
        }
        if(this.isShowloading != false){
            this.isShowloading = false;
        }
    },


    /** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * touch event 
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  */

    /**
     * 好像是无效的
    */

    //touch事件
    onTouchEvent :function(sender,type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                console.log("touch button");
                cc.director.popScene();
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
            default:
                break;
        }
    },
});


var BaseScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BaseLayer();
        this.addChild(layer);
    }
});

