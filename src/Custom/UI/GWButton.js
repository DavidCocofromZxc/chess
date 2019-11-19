

/**
 * 专用button类
 * */

var GWButton = ccui.Button.extend({

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
            if(beforeAction !== undefined && (typeof beforeAction ==="function")){
                beforeAction();
            }
            var anminA = cc.scaleTo(0.3,1,0);
            var anminB = cc.callFunc( function(){
                if(middleAction !== undefined && (typeof middleAction ==="function")){
                    middleAction();
                }
            },this);
            var anminC = cc.scaleTo(0.3,1,1);
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
