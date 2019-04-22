


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

    ctor:function () {

        this.backButton     = null;
        this.bgColorLayer   = null;

        this._super();
        this.loadButton();      //加载button
        // this.loadBgColorLayer();//bgColor
        return true;
    },
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
        bg.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        bg.setBackGroundColor(cc.color(100,100,100));
        bg.setBackGroundColorOpacity(255);
        bg.setAnchorPoint(0,0);
        bg.setContentSize(cc.winSize.width,cc.winSize.height);
        this.bgColorLayer = bg;
    },
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

