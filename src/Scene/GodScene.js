


var GodLayer = cc.Layer.extend({

    textLabel       :null,
    contentList     :[],

    ctor:function () {
        this._super();


        this.loadBody();


        this.loadLabel();

        this.contentList = [    "你好",
                                "我是这个世界的神",
                                "你可以称呼我 \"魅影\" ",
                                "多说无意，继续前行吧",
                            ];
        return true;
    },


    loadBody:function(){

        var node = new GWDialogue(res.God_png);
        this.addChild(node);
        node.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.nodeSprite = node;
    },


    loadLabel:function(){

        var text = new GWText();
        this.addChild(text);

        text.setPosition( this.width/2, this.height/2 - 100);
        // text.setPosition( this.x, this.y);
        this.textLabel = text;
    },


    //展开对话
    startConversation:function () {
        cc.log("bodyShowOver");

        if(this.contentList != [] && this.contentList.length > 0){
            this.textLabel.setContentListAndShowTops(this.contentList);
        }
    },


    //对话结束的回调
    contentOver:function(){
        var fadIn = cc.fadeTo(0.2,128);
        var moveUp = cc.moveBy(0.4,cc.p(-(cc.winSize.width/3),0));
        var fadOut = cc.fadeIn(0.2);
        var blueSeq = cc.sequence(fadIn,moveUp,fadOut);
        this.nodeSprite.runAction(blueSeq);
        this.textLabel.removeFromParent();
        this.textLabel = null;
    },

});



var GodScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new GodLayer();
        this.addChild(layer);
    }

});