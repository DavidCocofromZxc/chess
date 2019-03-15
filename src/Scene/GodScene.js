


var GodLayer = cc.Layer.extend({
    //
    // nodeSprite      :null,
    // textLabel       :null,
    //
    // contentList     :[  "你好",
    //                     "我是这个世界的神",
    //                     "你可以称呼我 \"魅影\" ",
    //                     "多说无意，继续前行吧",
    // ],


    ctor:function () {
        this._super();

        this.loadBody();
        // this.showBody();

        // var text = new GWText();
        // this.addChild(text);
        // text.setPosition(node.x,node.y -100);
        // this.textLabel = text;

        return true;
    },


    loadBody:function(){

        let contentlist = [ "你好",
                            "我是这个世界的神",
                            "你可以称呼我 \"魅影\" ",
                            "多说无意，继续前行吧",
                        ];
        var node = new GWDialogue(res.God_png,contentlist);
        this.addChild(node);
        node.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.nodeSprite = node;
    },

    // showBody:function(){
    //     var fadIn = cc.fadeIn(1);
    //     var scale = cc.scaleTo(1,2.5);
    //     var spawn = cc.spawn(fadIn,scale);
    //
    //
    //     var action = cc.sequence(spawn,cc.callFunc(
    //     function () {
    //         this.startConversation();
    //     }
    //     ,this));
    //     this.nodeSprite.runAction(action);
    //
    //     var moveUp = cc.moveBy(0.5,cc.p(0,20));
    //     var moveDown = cc.moveBy(0.5,cc.p(0,-20));
    //     var blueSeq = cc.sequence(moveUp,moveDown).repeatForever();
    //     this.nodeSprite.runAction(blueSeq);
    //
    // },


    // startConversation:function () {
    //     cc.log("bodyShowOver");
    //
    //     var text = new GWText("000",this.tryfunc,this);
    //     this.addChild(text);
    //     text.setPosition( this.nodeSprite.x, this.nodeSprite.y -100);
    //     this.textLabel = text;
    //     this.textLabel.setContentListAndShowTops(this.contentList);
    //
    // },


    // contentOver:function(){
    //     var fadIn = cc.fadeTo(0.2,128);
    //     var moveUp = cc.moveBy(0.4,cc.p(-(cc.winSize.width/3),0));
    //     var fadOut = cc.fadeIn(0.2);
    //     var blueSeq = cc.sequence(fadIn,moveUp,fadOut);
    //     this.nodeSprite.runAction(blueSeq);
    //     this.textLabel.removeFromParent();
    //     this.textLabel = null;
    // },


});



var GodScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new GodLayer();
        this.addChild(layer);
    }

});