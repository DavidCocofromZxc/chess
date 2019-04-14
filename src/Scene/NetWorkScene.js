



/**
 *
 *  网络测试场景 -未完成
 *
 * */


// var SocketIO = SocketIO || window.io;

var NetWorkLayer = BaseScene.extend({

    // socketIO        : null,



    ctor:function () {
        this._super();
        this.test();
        return true;
    },


    test:function(){




        // var bg = new ccui.Layout();
        // this.addChild(bg);
        // bg.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // bg.setBackGroundColor(cc.color(0,220,0));
        // // bg.setBackGroundColorOpacity(255*0.5);
        // bg.setPosition(0,0);
        // bg.setContentSize(cc.winSize.width,cc.winSize.height);

        // var card = new GWCard();
        // this.addChild(card);
        // card.setPosition(cc.winSize.width/2,cc.winSize.height/2);


        var button  = new ccui.Button();
        this.addChild(button);
        button.loadTextures(res.baceButton,"","");
        button.setPosition( 100,100);
        button.setTouchEnabled(true);
        button.addTouchEventListener(this.onTouchEvent,this);


        var lbl = new ccui.Text("label","AmericanTypewriter","18");
        button.addChild(lbl);
        lbl.setAnchorPoint(0.5,0.5);
        lbl.setPosition(lbl.parent.width/2,lbl.parent.height/2);

    },




    //附加button点击回调
    onTouchEvent :function(sender,type){
        cc.log("onTouchEvent");
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("TOUCH_BEGAN");
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("TOUCH_MOVED");
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.log("TOUCH_ENDED");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                cc.log("TOUCH_CANCELED");
                break;
            default:
                break;
        }
    },




});

var NetWorkScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new NetWorkLayer();
        this.addChild(layer);
    }
});
