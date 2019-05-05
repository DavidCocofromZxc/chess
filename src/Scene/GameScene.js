
/**
 * 开发板：
 * 1.屏幕适配
 * 2.主循环问题
 * 3.文字表现框
 * 4.逐字出现的text
 * */



/**
 *
 *  主游戏场景 ->
 *
 * */



//游戏阶段状态
let GameStageStateEnemu = {

    // < *ing > 是用于 *挂起的中转状态，
    // eg：notStart进入后，直接notStarting，防止轮训器不断轮训notStart进入
    notStart            :   0,
    notStarting         :   10,

    start               :   20,
    starting            :   21,

    myRound             :   30,
    myRounding          :   31,
    pumpingCard         :   32,

    oppositeRound       :   40,
    stagnation          :   -99,

};


var GameLayer = BaseLayer.extend({
    // var GameLayer = cc.Layer.extend({
    textLabel           :   null,   //对话text条//提示条
    checkerboard        :   null,   //棋盘
    holdChess           :   null,   //举起棋子
    sysMailbox          :   null,   //信箱
    btnRound            :   null,   //回合按钮
    cardsHandBox        :   null,   //手卡区域
    otherCardsHandBox   :   null,   //对方手卡区域

    ourCardGroup        :   null,   //我方卡组
    otherCardGroup      :   null,   //对方卡组
    ourBloodBar         :   null,   //我方血条
    otherBloodBar       :   null,   //对方血条
    ourEnergy           :   null,   //我方能量槽
    otherEnergy         :   null,   //对方能量槽

    roundSurplusTime    :   12,     //每回合决策时间 //60s
    countdownBeginTime  :   10,     //开始倒数的时间

    gameStageState      :   GameStageStateEnemu.stagnation,//

    lookCard            :   null,


    ctor: function () {

        this.textLabel      =   null,   //对话text条//提示条
        this.checkerboard   =   null,   //棋盘
        this.holdChess      =   null,   //举起棋子
        this.sysMailbox     =   null,   //信箱
        this.btnRound       =   null,   //回合按钮
        this.cardsHandBox   =   null,   //手卡区域
        this.otherCardsHandBox   =   null,   //对方手卡区域

        this.ourCardGroup   =   null,   //我方卡组
        this.otherCardGroup =   null,   //对方卡组
        this.ourBloodBar    =   null,   //我方血条
        this.otherBloodBar  =   null,   //对方血条
        this.ourEnergy      =   null,   //我方法力
        this.otherEnergy    =   null,   //对方法力

        this.roundSurplusTime    =   12,     //每回合决策时间 //60s
        this.countdownBeginTime  =   10,     //开始倒数的时间

        this.gameStageState      =   GameStageStateEnemu.stagnation,//
        this.lookCard            =   null,

        this._super();
        this.loadCheckerboard();    //构造棋盘
        this.loadMessageView();     //构造信箱
        this.loadLabel();           //构造屏中提示文字
        this.loadRoundButton();     //回合按钮
        this.loadGroup();           //构造卡组
        this.loadBlood();           //构造血条
        this.loadEnergy();
        this.loadHandCard();        //构造手牌 -《模拟》

        //方便测试
        this.registerTouchEvent();
        //通知棋盘 摆放国王
        // this.checkerboard.initGameCrystal();

        this.scheduleUpdate();      //开启调度
        this.gameStageState = GameStageStateEnemu.notStart; //初始化游戏状态
        return true;
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

        //发起召唤
        node.eventTouchSummonChessStartAction = function (data) {
            cc.log(data);
            let bool = this.ourEnergy.subtractPowerCount(data.energy);
            let str = bool?"你消耗了"+ data.energy +"点能量":"你的能量不足";
            this.sysMailbox.sendMessage(str);
            return bool;
        }.bind(this);
    },
    //加载棋盘 delegate
    //召唤结束的回调
    eventTouchSummonChessEndAction:function(state,data){
        switch (state) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                this.sysMailbox.sendMessage("成功召唤\""+ data.name+"\"");
                break;
            default:
                break;
        }
    },


    //加载信息框
    loadMessageView:function () {
        var messageView = new GWMailbox();
        this.addChild(messageView,LocalZorderEnemu.UI);
        messageView.setPosition(35,10);
        messageView.width = 200;
        messageView.height = cc.winSize.height -20;
        messageView.setOpacity(255* 0.8);
        messageView.openMessageReceive();
        this.sysMailbox = messageView;
    },
    //加载对话文字
    loadLabel:function(){
        var text = new GWMessage();
        this.addChild(text,LocalZorderEnemu.DialogueText);
        text.setPosition( cc.winSize.width/2, cc.winSize.height/2);
        this.textLabel = text;
    },
    //加载按钮
    loadRoundButton:function(){
        var button  = new GWButton("回合结束");
        this.addChild(button,LocalZorderEnemu.UI);
        button.setAnchorPoint(0,0.5);
        button.setPosition( this.checkerboard.x + this.checkerboard.width + 5,//20缝隙
            this.checkerboard.y + this.checkerboard.height/2);
        this.btnRound = button;
    },
    //加载双方卡组
    loadGroup:function(){
        //模拟数据流
        var ourflow = "OXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2Nlg=";
        //我方卡组
        var ourGroup  = new GWCardGroup(ourflow);
        this.addChild(ourGroup,LocalZorderEnemu.UI);
        ourGroup.setPosition(  this.checkerboard.x + this.checkerboard.width + 20,//缝隙
            this.checkerboard.y);
        //抽卡事件
        ourGroup.pumpCardAction = function (cardID) {
            var cardData = XCDATA.findMonsterData(cardID);
            this.cardsHandBox.addCard(cardData);
        }.bind(this);
        this.ourCardGroup = ourGroup;

        //模拟数据流
        var otherflow = "OXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2NlgtOXJZSDY2Nlg=";

        //对方卡组
        var otherCardGroup  = new GWCardGroup(otherflow);
        this.addChild(otherCardGroup,LocalZorderEnemu.UI);
        otherCardGroup.setAnchorPoint(1,1);
        otherCardGroup.setPosition(  this.checkerboard.x - 20,
                                            this.checkerboard.y + this.checkerboard.height);
        //抽卡事件
        otherCardGroup.pumpCardAction = function (cardID) {
            var cardData = XCDATA.findMonsterData(cardID);
            this.otherCardsHandBox.addCard(cardData);
        }.bind(this);
        this.otherCardGroup = otherCardGroup;
        // this.otherCardGroup.pumpingCard(1);
    },
    //加载双方血条
    loadBlood:function(){
        //
        var blood = new GWBloodBox();
        this.addChild(blood,LocalZorderEnemu.UI);
        blood.setPosition(this.checkerboard.x + this.checkerboard.width/2,this.checkerboard.y);
        this.ourBloodBar = blood;
        //
        var otherBloodBar = new GWBloodBox();
        this.addChild(otherBloodBar,LocalZorderEnemu.UI + 10);
        otherBloodBar.setPosition( this.checkerboard.x + this.checkerboard.width/2,
                                    this.checkerboard.y + this.checkerboard.height + 20);
        this.otherBloodBar = otherBloodBar;
    },
    //加载双方法力
    loadEnergy:function(){
        //
        var ourEnergy = new GWEnergyBox(10);
        this.addChild(ourEnergy,LocalZorderEnemu.UI);
        ourEnergy.setPosition(this.checkerboard.x + this.checkerboard.width,this.checkerboard.y);
        this.ourEnergy = ourEnergy;
        //
        var otherEnergy = new GWEnergyBox(10);
        this.addChild(otherEnergy,LocalZorderEnemu.UI);
        otherEnergy.setAnchorPoint(1,1)
        otherEnergy.setPosition( this.checkerboard.x , this.checkerboard.y + this.checkerboard.height);
        this.otherEnergy = otherEnergy;
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
        this.cardsHandBox = hand;


        var sideWidth = 20; //添加边宽
        var otherHand = new GWCardsHandBox();//ancher 0,1
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

    //侧栏-展示卡牌
    showLookCard:function(model){
        //如果当前已有在展示的卡牌、先移除
        if(this.lookCard != null){
            this.lookCard.removeFromParent();
            this.lookCard = null;
        }
        //构造
        var card = new GWCard();
        this.addChild(card,LocalZorderEnemu.CARD);
        card.setPosition(this.checkerboard.x + this.checkerboard.width + 10 ,100);
        card.setAnchorPoint(0,0);
        this.lookCard = card;
        //
        var data = XCDATA.findMonsterData(model.objectId);
        card.changeUiData(data,model);//设置数据
        this.checkerboard.pickUpDataInHand(data);//选卡传入
        //读取数据库
        // this.showLoading();
        // XCDATA().MONSTER_DATATABLE.get(uiData.objectId).then(data => {
        //     console.log(data);
        //     Card.setData(data,uiData);//设置数据
        //     this.checkerboard.pickUpCardInHand({data:data,uiData:uiData});//选卡传入
        //     this.stopLoading();
        // }).catch(err => {
        //     console.log(err)
        //     this.stopLoading();
        //     cc.log("数据传入失败！！！");
        // });
    },



    /**
     * 主循环梳理:
     */
    //进入主循环
    joinMainLoop:function () {
        for(var round = 1; round < 3;round++){
            this.sysMailbox.sendMessage("第"+ round +"回合：\n");
            for ( var i = 1 ; i < 3 ;i ++){
                this.sysMailbox.sendMessage("第"+ i +"位玩家行动");
                if(i == 1){//self
                    this.scheduleUpdate();//开启调度
                }else{
                    this.sysMailbox.sendMessage("模拟网络请求。。。");
                    this.sysMailbox.sendMessage("敌方行动。。。");
                    this.sysMailbox.sendMessage("行动结束。。。");
                }
            }
            this.sysMailbox.sendMessage("-----------\n");
        }
    },
    //准备开始游戏
    notStartGame:function(){
        this.gameStageState = GameStageStateEnemu.notStarting;
        //创建相关。。
        //通知棋盘 摆放国王
        this.checkerboard.initGameCrystal();
        //摆放卡组。。
        //抽取5张牌
        this.ourCardGroup.pumpingCard(5);
        this.otherCardGroup.pumpingCard(5);

        //进入开始游戏
        this.gameStageState = GameStageStateEnemu.start;
        this.sysMailbox.sendMessage("游戏开始");
        this.textLabel.addShowText("游戏开始");
        this.sysMailbox.sendMessage("双方各自抽5张");
    },

    //开始游戏
    startGame:function(){
        this.gameStageState = GameStageStateEnemu.starting;
        this.sysMailbox.sendMessage("裁判投币决定先后手");
        this.textLabel.addShowText( "裁判投币决定先后手");
        //决定先后手
        // var isOpen = Math.round(Math.random());
        var who = "先";//isOpen?"先":"后";
        this.sysMailbox.sendMessage("你获得了"+ who +"手");
        this.textLabel.addShowText( "你获得了"+ who +"手",
            function(){
            // 判断
                this.gameStageState = GameStageStateEnemu.myRound;
        },this);
    },

    //抽卡
    pumpingCard:function(){

        this.sysMailbox.sendMessage("抽卡");
        // this.textLabel.addShowText( "抽卡");

        this.gameStageState = GameStageStateEnemu.pumpingCard;
        //卡组中取出1张牌
        this.ourCardGroup.pumpingCard(1);
    },


    /**>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    /**
     *  主循环
     *
     *  流程如下：
     *  1。开始本局
     *  2。双方各抽5张
     *  3。裁判决定先后顺序
     *  4。进入持方回合
     *  5。回合循环
     *      1。抽卡
     *      2。执行操作->包含：召唤、移动、技能
     *      3。回合结束
     *      4。持方交换
     * */
    update:function (dt) {
        switch (this.gameStageState) {
            case GameStageStateEnemu.notStart:
                this.notStartGame();//开始游戏准备工作
                break;
                //开始本局
            case GameStageStateEnemu.start:
                this.startGame();
                break;
            case GameStageStateEnemu.myRound:
                //抽卡
                this.pumpingCard();//抽卡
                //允许行动
                this.registerTouchEvent();
                // //计时开始
                // this.roundSurplusTime -= dt;
                // //如果计时 进入倒计时 -则读秒
                // if(this.roundSurplusTime < this.countdownBeginTime ){
                //     cc.log(this.roundSurplusTime,this.countdownBeginTime);
                //     this.sysMailbox.sendMessage(parseInt(this.countdownBeginTime));
                //     this.countdownBeginTime -= 1//每读一次，读秒次数量/时间-1
                // }
                //
                // //读秒时间耗尽-说明我方回合时间到-进入搁置状态
                // if(this.countdownBeginTime < 0 ){
                //     //搁置-时间到-进入对方回合
                //     this.gameStageState = GameStageStateEnemu.stagnation;
                //     this.sysMailbox.sendMessage("回合结束");
                //     //时间重制
                //     this.roundSurplusTime = 12;
                //     this.countdownBeginTime = 10;
                // }
                break;
        }

    },



    /**>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     * 触摸事件:
     * */



    //注册触摸事件
    registerTouchEvent:function(){

        // [事件监听]触摸事件
        var onTouchEventListener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,//单指模式
            target          : this,
            swallowTouches  : true,
            onTouchBegan  : this.onTouchBegan,
            onTouchMoved  : this.onTouchMoved,
            onTouchEnded  : this.onTouchEnded
        });
        cc.eventManager.addListener(onTouchEventListener, this);



        // // [事件监听]查看卡片事件
        // var listener = cc.EventListener.create({
        //     event       :   cc.EventListener.CUSTOM,
        //     target      :   this,
        //     eventName   :   SHOW_CARD_EVENT,
        //     callback    : function(event){
        //         cc.log("callback function");
        //         var target = event.getCurrentTarget();
        //         // var data =  event.getUserData();
        //         //card加入棋盘 //show Card
        //         cc.log("callback Card t",target);
        //         cc.log("callback Card c",target.checkerboard);
        //
        //
        //         if(target.lookCard != null){
        //             target.lookCard.removeFromParent();
        //             target.lookCard = null;
        //         }
        //
        //
        //         var Card = new GWCard();
        //         target.addChild(Card,LocalZorderEnemu.CARD);
        //         Card.setPosition(target.checkerboard.x + target.checkerboard.width + 10 ,100);
        //         Card.setAnchorPoint(0,0);
        //         target.lookCard = Card;
        //         // target.addCard();
        //         // //show summonoo
        //         target.checkerboard.pickUpCardInHand(Card);
        //         //
        //         // cc.log("callback over");
        //     }
        // });
        // cc.eventManager.addListener(listener,this);
    },
    //
    // addCard:function(){
    //     cc.log("addCard");
    //     var Card = new GWCard();
    //     this.addChild(Card,LocalZorderEnemu.CARD);
    //     // Card.setPosition(this.checkerboard.x + this.checkerboard.width + 10 ,100);
    //     Card.setPosition(0 ,0);
    //     Card.setAnchorPoint(0,0);
    //     // this.lookCard = Card;
    //     // this.checkerboard.pickUpCardInHand(Card);
    // },

    //touch event
    onTouchBegan:function (touch,event) {
        cc.log("onTouchBegan");
        //获得主体
        var self = event.getCurrentTarget();
        //提前释放多余card
        if(self.lookCard != null){
            self.lookCard.removeFromParent();
            self.lookCard = null;
        }
        //将点击坐标转换为基于当前触发事件对象的本地坐标
        var posInNode = self.convertToNodeSpace(touch.getLocation());
        //棋盘区域范围
        var checkerboardRect = cc.rect( self.checkerboard.x,
                                        self.checkerboard.y,
                                        self.checkerboard.width,
                                        self.checkerboard.height);
        //手牌区域
        // *>这里的x,y其实和Ancher相关 -因为rectContainsPoint方法只会判断ancher（0，0）的rect
        //所以下行y的写法更严谨
        var cardGroupRect   = cc.rect(  self.cardsHandBox.x,
                                        self.cardsHandBox.y * (1 - self.cardsHandBox.anchorY),
                                        self.cardsHandBox.width,
                                        self.cardsHandBox.height);
        self.checkerboard.onTouchEnded(touch);//将触发传递至下层
        self.cardsHandBox.onTouchEnded(touch);//将触发传递至下层
        return true;//native下必须有return，否则触发次数会有问题
    },


    onTouchMoved:function (touch,event) {
        cc.log("onTouchMoved");
    },
    onTouchEnded:function (touch,event) {
        cc.log("onTouchEnded");
    },
    onExit:function(){
        this._super();
        console.log("GameScene onExit:");
    },

});




var GameScene = BaseScene.extend({

    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }

});