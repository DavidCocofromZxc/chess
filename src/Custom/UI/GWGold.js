


var GWGold = ccui.ImageView.extend({
    oldColor        : null,

    ctor: function () {
        this._super(res.gold16z);
        this.oldColor = this.color;
        return true;
    },
    // 翻转动画-->> afterAction-->> 淡出动画-->> endAction-->> remove self
    playCoinAnimation(afterAction,fadeOutDuration,endAction){
        var outDuration = 1;
        if(afterAction !== undefined && (typeof afterAction === "number")){
            outDuration = afterAction;
        }else  if(fadeOutDuration !== undefined && (typeof fadeOutDuration === "number")){
            outDuration = fadeOutDuration;
        }
        var zf = parseInt(Math.random()*100)%2;//正反结果
        var actionList = new Array();

        var anminA = cc.callFunc(function () {
            this.loadTexture(res.gold16f);
        },this);
        var anminB = cc.callFunc(function () {
            this.loadTexture(res.gold16z);
        },this);
        for (var i = 0,sx = 1,sy = 1 ,duration = 0.06;i < 16 + zf;i++ ){
            if(i < 10){
                sx = sx + 0.1;
                sy = sy + 0.1;
                duration = duration + 0.003;
            }else{
                sx = sx - 0.1;
                sy = sy - 0.1;
                duration = duration - 0.006;
            }

            var anmin1 = cc.scaleTo(duration,sx,0);
            var anmin2 = cc.scaleTo(duration,sx,sy);
            if(i%2 > 0){
                actionList = actionList.concat(anmin1,anminA,anmin2);
            }else{
                actionList = actionList.concat(anmin1,anminB,anmin2);
            }
            cc.log(i);
        }
        cc.log(zf);
        //
        if(afterAction !== undefined && (typeof afterAction ==="function")){
            actionList = actionList.concat(cc.callFunc(function(){
                afterAction();
            }));
        }
        var anminRemove =  cc.fadeOut(outDuration);//淡出
        actionList = actionList.concat(anminRemove);
        //
        if(endAction !== undefined && (typeof endAction ==="function")){
            actionList = actionList.concat(cc.callFunc(function(){
                endAction();
            }));
        }
        var sequence = cc.sequence(actionList);
        this.runAction(sequence);
        return zf?true:false;
    }
});
