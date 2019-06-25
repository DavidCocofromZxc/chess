



/**
 *
 *  网络测试场景 -未完成
 *
 * */

// import Bmob from "hydrogen-js-sdk"
// import Bmob from  ""
// window.io;
// var SocketIO = SocketIO || window.io;
// var mvs ;

var NetWorkLayer = BaseLayer.extend({

    socketIO    :null,


    ourCardsHandBox     :   null,   //手卡区域
    otherCardsHandBox   :   null,   //对方手卡区域
    ourCardGroup        :   null,   //我方卡组
    otherCardGroup      :   null,   //对方卡组

    dt  : 0,//暂时记录时间


    ctor:function () {
        this._super();

        this.ourCardsHandBox    =   null;   //手卡区域
        this.otherCardsHandBox  =   null;   //对方手卡区域
        this.ourCardGroup   =   null;   //我方卡组
        this.otherCardGroup =   null;   //对方卡组

        this.dt = 0;

        //test
        this.bgColorLayer.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.bgColorLayer.setBackGroundColor(cc.color(100,100,100));
        this.bgColorLayer.setBackGroundColorOpacity(255);

        this.test();
        return true;
    },

    test:function () {
        this.loadCheckerboard();
        this.loadGroup();
        this.loadHandCard();

        this.scheduleUpdate();      //开启调度

        this.scheduleOnce(function(){
            this.ourCardGroup.pumpingCard(5);
            this.otherCardGroup.pumpingCard(5);
        },1,"ok");
    },


    //加载棋盘
    loadCheckerboard:function () {
        var node = new GWGameCheckerboard();
        this.addChild(node,LocalZorderEnemu.MAP);
        node.setAnchorPoint(0,0);
        node.setPosition(   (cc.winSize.width - node.width)/2,
            (cc.winSize.height - node.height)/2);
        node.delegate = this;
        this.checkerboard = node;
    },


    //加载双方卡组
    loadGroup:function(){
        //模拟数据流
        var ourflow = "OXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2Nlg=";
        //我方卡组
        var ourGroup  = new GWCardGroupSelf(ourflow);
        this.addChild(ourGroup,LocalZorderEnemu.UI);
        ourGroup.setPosition(  this.checkerboard.x + this.checkerboard.width + 20,//缝隙
            this.checkerboard.y);
        //抽卡事件
        ourGroup.pumpCardEventAction = function (cardID) {
            var cardData = XCDATA.findMonsterData(cardID);
            this.ourCardsHandBox.addCard(cardData);
        }.bind(this);
        this.ourCardGroup = ourGroup;


        //模拟数据流
        var otherflow = "OXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2Nlg=";
        //对方卡组
        var otherCardGroup  = new GWCardGroupOther(otherflow);
        this.addChild(otherCardGroup,LocalZorderEnemu.UI);
        otherCardGroup.setAnchorPoint(1,1);
        otherCardGroup.setPosition(  this.checkerboard.x - 20,
            this.checkerboard.y + this.checkerboard.height);
        //抽卡事件
        otherCardGroup.pumpCardEventAction = function (cardID) {
            var cardData = XCDATA.findMonsterData(cardID);
            this.otherCardsHandBox.addCard(cardData);
        }.bind(this);
        this.otherCardGroup = otherCardGroup;
        // this.otherCardGroup.pumpingCard(1);
    },

    //加载手牌区域
    loadHandCard:function(){
        var sideWidth = 20; //添加边宽
        var hand = new GWCardsHandBox();//ancher 0,1
        this.addChild(hand,LocalZorderEnemu.UI);
        hand.setPosition(   this.checkerboard.x - sideWidth,
            this.checkerboard.y);
        hand.setContentSize(this.checkerboard.width + 2*sideWidth,100);
        //绑定 手牌中的选卡选中事件
        hand.selectCard = function(data){
            this.showLookCard(data);
        }.bind(this);

        //绑定取消事件
        hand.cancelSeleCard = function () {
            cc.log("cancelSeleCard");
            this.checkerboard.cancelPickUpCardInHand();
        }.bind(this);
        this.ourCardsHandBox = hand;


        var sideWidth = 20; //添加边宽
        var otherHand = new GWCardsHandBlackBox();//ancher 0,1
        this.addChild(otherHand,LocalZorderEnemu.UI);
        otherHand.setAnchorPoint(0,0);
        otherHand.setPosition(   this.checkerboard.x - sideWidth,
            this.checkerboard.y + this.checkerboard.height);
        otherHand.setContentSize(this.checkerboard.width + 2*sideWidth,100);
        //绑定选中事件
        otherHand.selectCard = function(uiData){
        }.bind(this);
        //绑定取消事件
        otherHand.cancelSeleCard = function () {
            // cc.log("cancelSeleCard");
            // this.checkerboard.cancelPickUpCardInHand();
        }.bind(this);
        this.otherCardsHandBox = otherHand;
    },



    // update:function (dt) {
        // this.dt += dt;
        // cc.log("dt",parseInt(this.dt));
        // if(parseInt(this.dt) == 4){
            // this.ourCardGroup.pumpingCard(5);
            // this.otherCardGroup.pumpingCard(5);
        // }
    // }


});



var NetWorkScene = BaseScene.extend({
    onEnter:function () {
        this._super();
        var layer = new NetWorkLayer();
        this.addChild(layer);
    }
});
