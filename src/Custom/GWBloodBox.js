


/**
 *
 *  国王专用/棋盘专用 血条类
 *
 * */


var GWBloodBox = ccui.Layout.extend({
    heartCount  :   0,
    ctor: function() {
        this.heartCount = 0;

        this._super();
        this.setAnchorPoint(0.5,0.5);
        this.setLayoutType(ccui.Layout.LINEAR_HORIZONTAL);
        //区域高亮
        // this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // this.setBackGroundColor(cc.color(0,200,0));
        // this.setBackGroundColorOpacity(255 *0.5);
        //测试
        this.addHeartCount(3);
        // this.subtractHeart(1);

        return true;
    },

    //加
    addHeartCount:function (count) {
        this.heartCount += count;
        this.setHeartUI();
    },
    //减
    subtractHeart:function(count){
        if(this.heartCount > count){
            this.heartCount -= count;
        }else{
            this.heartCount == 0;
        }
        this.setHeartUI();
    },
    //重制UI
    setHeartUI:function () {
        this.removeAllChildren();//
        let jw = 1;//爱心之间的间距
        for(var i = 0  ;i < this.heartCount ;i++){
            //卡片构造加入
            var hand = new ccui.ImageView(res.redHeart);
            this.addChild(hand);
            var lpl = new ccui.LinearLayoutParameter();
            hand.setLayoutParameter(lpl);
            lpl.setGravity(ccui.LinearLayoutParameter.CENTER_HORIZONTAL);
            lpl.setMargin(jw,0,jw,0);
        }

        this.width = (hand.width + 2*jw) * this.heartCount;
        this.height = hand.height;
    },

});
