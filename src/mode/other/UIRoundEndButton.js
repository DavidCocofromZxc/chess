

/**
 * 专用
 * 回合结束button类
 * */

var UIRoundEndButton = ccui.Button.extend({

    roundState: 0,//state 0我的回合，1对方回合
    defaultColor:null,

    ctor: function () {
        this._super();
        this.loadTextures(res.baseButton,"","");//
        this.setAnchorPoint(0,0);
        this.defultColor = this.getColor();//记录原始颜色
        this.setState(0);
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
                this.changeState();
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
    },

    changeState:function(){
        if(this.roundState == 0){
            this.setState(1);//state = 1;
        }else{
            this.setState(0);
        }
    },

    setState:function (state) {
        if(state == 0){
            this.setTitleText("我方回合");
            this.setTouchEnabled(true);
            this.setColor(this.defultColor);
        }else{
            this.setTitleText("对方回合");
            this.setTouchEnabled(true);
            this.setColor(cc.color(100,100,100));
        }
        this.roundState = state;
    },

});
