

/**
 * 专用button类
 * */

var GWButton = ccui.Button.extend({



    ctor: function (text) {
        this._super();
        //load
        this.loadTextures(res.baceButton,"","");//
        this.setTitleText(text);
        //set
        this.setAnchorPoint(0,0);
        this.setTouchEnabled(true);
        this.addTouchEventListener(this.onTouchEvent,this);
        return true;
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


    //弃之
    // mainLabel         : null,
    // this.loadLabel();
    // loadLabel:function (text) {
    //     var str = text || "label";//
    //     var lbl = new ccui.Text(str,"AmericanTypewriter","18");
    //     this.addChild(lbl);
    //     lbl.setAnchorPoint(0.5,0.5);
    //     lbl.setPosition(this.width/2,this.height/2);
    // },


});
