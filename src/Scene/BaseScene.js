


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
        this.loadButton();   //加载button
        return true;
    },

    //加载button
    loadButton:function(){
        var btn = new ccui.Button(res.leftArrow_png);
        btn.setTouchEnabled(true);
        btn.setAnchorPoint(0,0);
        btn.setScale(2,2);
        btn.setPosition(20,cc.winSize.height/2);
        // btn.setPosition( 20,cc.winSize.height - btn.height - 20);
        //附加点击事件
        btn.addTouchEventListener(this.onTouchEvent,this);//cc.widget.touch事件
        this.addChild(btn);
        this.backButton = btn;
    },

    //加载b g
    loadButton:function(){
        var btn = new ccui.Button(res.leftArrow_png);
        btn.setTouchEnabled(true);
        btn.setAnchorPoint(0,0);
        btn.setScale(2,2);
        btn.setPosition(20,cc.winSize.height/2);
        // btn.setPosition( 20,cc.winSize.height - btn.height - 20);
        //附加点击事件
        btn.addTouchEventListener(this.onTouchEvent,this);//cc.widget.touch事件
        this.addChild(btn);
        this.backButton = btn;
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

