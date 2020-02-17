

/**
 * 专用
 * 人物切换-button类
 * */

var GWPlayerController = ccui.Button.extend({

    ctor: function (text) {
        this._super();
        this.loadTextures(res.baceButton,"","");//
        this.setTitleText(text);
        this.setAnchorPoint(0,0);
        return true;
    },

    addClickFlipAnimCustomEvent:function(beforeAction,
                                         middleAction,
                                         afterAction,){
        this.addClickEventListener(function(){
            //事件一
            if(beforeAction !== undefined && (typeof beforeAction ==="function")){
                beforeAction();
            }
            //翻转动画开始
            var anminA = cc.scaleTo(0.3,1,0.2);
            //事件二
            var anminB = cc.callFunc( function(){
                if(middleAction !== undefined && (typeof middleAction ==="function")){
                    middleAction();
                }
            },this);
            //翻转动画结束
            var anminC = cc.scaleTo(0.3,1,1);
            //事件三
            var anminD = cc.callFunc( function () {
                if(afterAction !== undefined && (typeof afterAction ==="function")){
                    afterAction();
                }
            },this);
            var sequence = cc.sequence(anminA,anminB,anminC,anminD);
            this.runAction(sequence);
        }.bind(this));
    }
});
