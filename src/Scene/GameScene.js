
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


var GameLayer = BaseScene.extend({
    // var GameLayer = cc.Layer.extend({
    textLabel           :   null,  //对话text条
    checkerboard        :   null,  //棋盘
    holdChess           :   null,  //举起棋子
    sysMailbox          :   null,  //信箱

    roundSurplusTime    :   12,     //每回合决策时间 //60s
    countdownBeginTime  :   10,     //开始倒数的时间

    gameStageState      :   GameStageStateEnemu.stagnation,//



    lookCard            :   null,

    // isNoStart       :true,
    // isStart       :true,
    // isMyRound   :false,


    ctor: function () {
        this._super();
        this.loadCheckerboard();    //构造棋盘
        this.loadMessageView();     //构造信箱
        this.loadLabel();           //构造屏中提示文字
        this.scheduleUpdate();      //开启调度
        this.gameStageState = GameStageStateEnemu.notStart; //初始化游戏状态
        return true;
    },
    //加载棋盘
    loadCheckerboard:function () {
        var node = new GWGameCheckerboard();
        this.addChild(node);
        node.setAnchorPoint(0,0);
        node.setPosition(   (cc.winSize.width - node.width)/2,
                                    (cc.winSize.height - node.height)/2);
        this.checkerboard = node;
    },
    //加载信息框
    loadMessageView:function () {
        var messageView = new GWMailbox();
        this.addChild(messageView);
        messageView.setPosition(10,10);
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
    // //加载按钮
    // loadLabel:function(){
    //     // var button = new ccui.Button();
    //     // this.addChild(button);
    //     // button.loadTextures(res.baceButton,"","");
    //     // button.setPosition(this.checkerboard.x + )
    //     //
    //     // // var text = new GWMessage();
    //     // // this.addChild(text,LocalZorderEnemu.DialogueText);
    //     // // text.setPosition( cc.winSize.width/2, cc.winSize.height/2);
    //     // // this.textLabel = text;
    // },



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



    //



    //准备开始游戏
    notStartGame:function(){
        this.gameStageState = GameStageStateEnemu.notStarting;
        //创建相关。。
        //通知棋盘 摆放国王
        this.checkerboard.initGameCrystal();
        //摆放卡组。。

        //进入开始游戏
        this.gameStageState = GameStageStateEnemu.start;
        this.sysMailbox.sendMessage("游戏开始");
        this.textLabel.addShowText("游戏开始");
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
        this.gameStageState = GameStageStateEnemu.pumpingCard;
    },


    /**>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    /**
     *  主循环
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

                //可行动
                // this.checkerboard.
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


        // [事件监听]查看卡片事件
        var listener = cc.EventListener.create({
            event       :   cc.EventListener.CUSTOM,
            target      :   this,
            eventName   :   SHOW_CARD_EVENT,
            callback    : function(event){
                var target = event.getCurrentTarget();
                var data =  event.getUserData();
                //card加入棋盘
                var card = data.card;
                card.setPosition(target.checkerboard.x + target.checkerboard.width + 10 ,100);
                target.addChild(card);
                target.lookCard = card;
            }
        });
        cc.eventManager.addListener(listener,this);
    },




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

        // //棋盘区域范围
        // var checkerboardRect = cc.rect( self.checkerboard.tmxMap.x,
        //                                 self.checkerboard.tmxMap.y,
        //                                 self.checkerboard.tmxMap.width,
        //                                 self.checkerboard.tmxMap.height);

        //棋盘区域范围
        var checkerboardRect = cc.rect( self.checkerboard.x,
                                        self.checkerboard.y,
                                        self.checkerboard.width,
                                        self.checkerboard.height);

        // //小雪区域范围
        // var xiaoxueRect = cc.rect(  self.demoChess.x,
        //     self.demoChess.y,
        //     self.demoChess.width,
        //     self.demoChess.height);

        // //判断是否落在棋盘内
        if(cc.rectContainsPoint(checkerboardRect,posInNode)){
            self.checkerboard.onTouchEnded(touch);    //触发传递
            return true;
        }

        // //判断是否落在选子区
        // else if(cc.rectContainsPoint(xiaoxueRect,posInNode)){
        //     cc.log("落在选棋内")
        //     // self.demoChess.onTouchBegan(touch,event);   //触发传递
        //     // self.demoChess.pickUp();
        //     self.checkerboard.pickUpChessInHand(self.demoChess);
        //
        //     return true;
        // }
        else{
            cc.log("no nothing")
            return false;
        }
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




var GameScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }

});