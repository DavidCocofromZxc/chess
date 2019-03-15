



//专用的人物对话类

var GWDialogue = cc.Sprite.extend({

    // nodeSprite      :null,
    textLabel       :null,
    // isAllowSaw      :false,

    contentList     :[],

    ctor: function (fileName,contentList,rect,rotated) {

        this._super(fileName,rect,rotated);
        this.contentList = contentList;

        this.loadLabel();
        this.showBody();

        return true;
    },


    loadLabel:function(){
        var text = new GWText();
        this.addChild(text);
        // text.setPosition( this.nodeSprite.x, this.nodeSprite.y -100);
        text.setPosition( this.x, this.y -100);
        this.textLabel = text;
    },


    //展示躯体
    showBody:function(){

        var fadIn = cc.fadeIn(1);
        var scale = cc.scaleTo(1,2.5);
        var spawn = cc.spawn(fadIn,scale);


        var action = cc.sequence(spawn,cc.callFunc(
            function () {
                // this.isAllowSaw = true;
                this.startConversation();
            }
            ,this));
        this.runAction(action);

        var moveUp = cc.moveBy(0.5,cc.p(0,20));
        var moveDown = cc.moveBy(0.5,cc.p(0,-20));
        var blueSeq = cc.sequence(moveUp,moveDown).repeatForever();
        this.runAction(blueSeq);
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