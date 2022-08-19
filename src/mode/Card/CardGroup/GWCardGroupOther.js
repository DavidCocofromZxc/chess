

/**
 *
 *  专用卡组类 -other
 *
 * */



var GWCardGroupOther = GWCardGroup.extend({

    ctor: function(flow) {
        this._super(flow);
        return true;
    },

    // <私有>抽卡动画
    pumpingOneCardAnim:function(callback){
        var cardSingle = new cc.Sprite(res.cardGroupSingle);
        this.addChild(cardSingle);
        cardSingle.setPosition(this.width/2 ,this.height/2);
        var move = cc.moveBy(this.drawCardAnimationDuration,cc.p(0,1 * this.drawCardDistance));
        var scale = cc.scaleBy(this.drawCardAnimationDuration,this.drawCardAnimationZoomRatio);
        var spawn = cc.spawn(move,scale);
        var move2 = cc.moveBy(this.drawCardAnimationDuration,cc.p( 1 * 50,0));
        var fadeOut = cc.fadeOut(this.drawCardAnimationDuration);
        //结束时执行
        var call = cc.callFunc(callback);
        cardSingle.runAction(cc.sequence(spawn,move2,fadeOut,call));
    },

});
