

/**
 *
 *  专用卡组类
 *
 * */



var GWCardGroup = cc.Sprite.extend({
    mainLabel         : null,
    cardList          : [],
    ctor: function(flow) {

        this.mainLabel = null;
        this.cardList  = (flow === undefined)?[]: XCBase64.arrayDecode(flow);

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

    //抽卡
    pumpingCard:function (count) {
        for(var i = 0 ; i < count ; i++){
            var card = this.pumpingOneCard();
            this.pumpCardAction(card);
        }
    },
    // <私有>抽一张卡
    pumpingOneCard:function () {
        var targetCard = this.cardList.shift();//
        this.mainLabel.string = "" + this.cardList.length;
        return targetCard;
    },
    // <虚函数> 抽卡事件
    pumpCardAction:function (cardID) {
        cc.log("pumpCardAction:",cardID);
    },


});
