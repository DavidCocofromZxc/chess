

/**
 *
 *  专用卡组类 -基类
 *
 * */



var GWCardGroup = cc.Sprite.extend({
    //UI about
    mainLabel         : null,   //顶部label
    drawCardAnimationDuration   : 0.5,  //抽卡动画持续时间
    drawCardDistance            : 100,  //抽卡移动距离
    drawCardAnimationZoomRatio  : 0.65, //抽卡动画缩放比例

    //data about
    cardList          : [],     //卡列表

    ctor: function(flow) {
        this.mainLabel = null;
        this.cardList = ["1002","1002","1002","1001"];//(flow === undefined)?["1002,1002,1002,1001"]: XCBase64.arrayDecode(flow);//flow不存在则使用默认
        this.drawCardAnimationDuration  = 0.5;
        this.drawCardDistance           = 100;
        this.drawCardAnimationZoomRatio = 0.65;

        // cc.log("ctor1: functio :",this.cardList);
        // cc.log("ctor2: functio :",this.cardList.count);
        // var ourflow = "OXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2Nlg=";
        // cc.log("ctor3: :",XCBase64.arrayDecode(ourflow));
        
        this._super(res.cardGroup);
        this.loadLabel();
        this.setAnchorPoint(0,0);
        this.setData();
        return true;
    },

    loadLabel:function () {
        var str = "" + this.cardList.length;//
        var lbl = new ccui.Text(str,"AmericanTypewriter","18");
        this.addChild(lbl);
        lbl.setAnchorPoint(0.5,0.5);
        lbl.setPosition(this.width/2,this.height/2);
        this.mainLabel = lbl;
    },

    //模拟数据注入
    setData:function (core) {
        //模拟数据
        // this.cardList.length = 50;
        this.mainLabel.string = "" + this.cardList.length;
    },

    //抽卡 循环count次
    pumpingCard:function (count) {
        //递归 count 次
        if(count == 0) return;
        //如果牌被耗尽则停止抽卡
        if(this.cardList.length == 0){
            this.cardExhaust();//<***>这里要加入疲劳事件
            return;
        }
        this.pumpingOneCardAnim(function(){
            cc.log("pumpingOneCardAnim callback");
            let card = this.pumpingOneCard();
            this.pumpCardEventAction(card); //调起-抽卡事件
            this.pumpingCard(count -1);
        }.bind(this));
    },

    // <私有> 继承-抽卡动画
    pumpingOneCardAnim:function(callback){
        cc.log("play pumpingOneCardAnim 抽卡动画");
        callback();
    },

    // <私有>抽一张卡
    pumpingOneCard:function () {
        //如果牌被耗尽则停止抽卡
        if(this.cardList.length == 0){
            this.cardExhaust();//<***>这里要加入疲劳事件
            return;
        }
        console.log("cardList",this.cardList);
        //抽卡动画
        let targetCard = this.cardList.shift();             //抽出第一个元素
        this.mainLabel.string = "" + this.cardList.length;  //调整卡组总数-显示
        return targetCard;                                  //返回这张卡
    },

    // <虚函数> 抽卡事件-用于返回抽出的卡
    pumpCardEventAction:function (cardID) {
        cc.log("pumpCardAction:",cardID);
        this.pumpCardAction(cardID);
    },

    //卡牌抽完<***>这里要加入疲劳事件
    cardExhaust:function () {
        //发出一个事件
        this.mainLabel.setOpacity(0);
        this.setOpacity(0);
    }


});
