



//专用的人物对话类

var GWDialogue = cc.Sprite.extend({



    ctor: function (fileName,rect,rotated) {
        this._super(fileName,rect,rotated);
        this.setOpacity(0)
        this.showBody();
        return true;
    },


    //展示躯体
    showBody:function(){

        // var fadIn = cc.fadeIn(1);
        var fadTo = cc.fadeTo(1,255 * 0.6);
        var scale = cc.scaleTo(1,2.5);
        var spawn = cc.spawn(fadTo,scale);

        var action = cc.sequence(spawn,cc.callFunc(
            function () {
                if(this.parent.startConversation != undefined){
                    this.parent.startConversation();
                }
            }
            ,this));
        this.runAction(action);

        var moveUp = cc.moveBy(0.5,cc.p(0,20));
        var moveDown = cc.moveBy(0.5,cc.p(0,-20));
        var blueSeq = cc.sequence(moveUp,moveDown).repeatForever();
        this.runAction(blueSeq);
    },



});