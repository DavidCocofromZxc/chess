


/**
 *
 *  专用法力类- 手牌区域
 *
 * */
var UIEnergyBox = ccui.Layout.extend({
    initPowerCount  : 1, //默认初始法力值
    maxPowerCount   : 10,//最大法力值
    powerCount      : 0, //法力计数//初始0
    ctor: function(count) {
        this.initPowerCount = 1;
        this.maxPowerCount  = 10;
        this.powerCount     = 0;
        let pCount = count||this.initPowerCount;//默认1点法力初始化

        this._super();
        this.setAnchorPoint(0,0);
        this.setLayoutType(ccui.Layout.LINEAR_VERTICAL);
        // //高亮
        // this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // this.setBackGroundColor(cc.color(0,200,0));
        // this.setBackGroundColorOpacity(255 *0.5);
        //测试
        this.addPowerCount(pCount);
        // this.subtractPower(1);
        return true;
    },
    //加
    addPowerCount:function (count) {
        if(this.powerCount + count > this.maxPowerCount){
            this.powerCount = this.maxPowerCount;
        }else{
            this.powerCount += count;
        }
        this.setPowerUI();
    },
    //减
    subtractPowerCount:function(count){
        if(this.powerCount >= count){
            this.powerCount -= count;
            this.setPowerUI();
            return true;
        }else{
            return false;
        }
    },
    //重制UI
    setPowerUI:function () {
        this.removeAllChildren();//
        let jw = 1;//爱心之间的间距
        var hand = new ccui.ImageView(res.energy);
        for(var i = 0  ;i < this.powerCount ;i++){
            //卡片构造加入
            hand = new ccui.ImageView(res.energy);
            this.addChild(hand);
            var lpl = new ccui.LinearLayoutParameter();
            hand.setLayoutParameter(lpl);
            lpl.setGravity(ccui.LinearLayoutParameter.CENTER_VERTICAL);
            lpl.setMargin(0,jw,0,jw);
        }
        this.width = hand.width;
        this.height = (hand.height + 2*jw) * this.powerCount;
    },
});
