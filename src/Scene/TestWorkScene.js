



/**
 *
 *  测试专用场景 -未完成
 *
 * */

var TestWorkLayer = BaseLayer.extend({
    socketIO: null,

    ourCardsHandBox: null,   //手卡区域
    otherCardsHandBox: null,   //对方手卡区域
    ourCardGroup: null,   //我方卡组
    otherCardGroup: null,   //对方卡组

    gameStageState: GameStageStateEnemu.stagnation,//

    currentRoundSurplusTime: 10,     //当前决策时间
    currentCountdownTime: 10,     //剩下倒计时时间

    isAllowControl: false,
    /**
     *  以后用js 网络配置
     * */
    //配置项-
    beginGameDrawCount: 1,      //游戏开始时抽卡数量
    roundSurplusTime: 60,     //每回合决策时间 //60s
    countdownTime: 10,     //倒计时时间

    ctor: function () {
        this._super();

        this.ourCardsHandBox = null;   //手卡区域
        this.otherCardsHandBox = null;   //对方手卡区域
        this.ourCardGroup = null;   //我方卡组
        this.otherCardGroup = null;   //对方卡组

        this.isAllowControl = false;
        //test
        this.bgColorLayer.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.bgColorLayer.setBackGroundColor(cc.color(100, 100, 100));
        this.bgColorLayer.setBackGroundColorOpacity(255);

        // this.test();
        this.test1();

        return true;
    },
    test1: function () {
        var a = 1001;
        // console.log(JSDataTool.monster[a]);
        // console.log(typeof(JSDataTool.monster[a]));
        // console.log(XCDataTool.monster[002]);
        // console.log(XCDataTool.monster[2]);
    },

    test: function () {
        this.loadCheckerboard();    //构造棋盘
        this.loadMessageView();     //构造信箱
        this.loadLabel();           //构造屏中提示文字
        this.loadRoundButton();     //回合按钮
        this.loadBlood();           //构造血条
        this.loadEnergy();          //构造法力
        this.loadHandCard();        //构造手牌区
        this.loadGroup();           //构造卡组

        // this.checkerboard.initGameCrystal();
        // this.showLookCard();
        //test
        this.ourCardGroup.pumpingCard(1); //抽卡时会自动调起ourCardGroup'pumpCardEventAction
        this.checkerboard.initGameCrystal();
        this.registerTouchEvent();

        // this.ourCardGroup.pumpingCard(1);
        // this.scheduleUpdate();      //开启调度
        // this.gameStageState = GameStageStateEnemu.notStart; //初始化游戏状态
    },

    //加载棋盘
    loadCheckerboard: function () {
        let node = new UIMatchCheckerboard();
        this.addChild(node, LocalZorderEnemu.MAP);
        node.setAnchorPoint(0, 0);
        node.setPosition((cc.winSize.width - node.width) / 2,
            (cc.winSize.height - node.height) / 2);
        node.delegate = this;
        this.checkerboard = node;
    },
    //加载信息框
    loadMessageView: function () {
        var messageView = new GWMailbox();
        this.addChild(messageView, LocalZorderEnemu.UI);
        messageView.setPosition(35, 10);
        messageView.width = 200;
        messageView.height = cc.winSize.height - 20;
        messageView.setOpacity(255 * 0.8);
        messageView.openMessageReceive();
        this.sysMailbox = messageView;
    },
    //加载对话文字
    loadLabel: function () {
        var text = new GWMessage();
        this.addChild(text, LocalZorderEnemu.DialogueText);
        text.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.textLabel = text;
    },
    //加载"回合"按钮
    loadRoundButton: function () {
        var button = new GWRoundEndButton("回合结束");
        this.addChild(button, LocalZorderEnemu.UI);
        button.setAnchorPoint(0, 0.5);
        button.setPosition(this.checkerboard.x + this.checkerboard.width + 5,//20缝隙
            this.checkerboard.y + this.checkerboard.height / 2);

        button.addClickFlipAnimCustomEvent(
            function () {
                this.gameStageState = GameStageStateEnemu.otherRound;
            }, function () {
                button.setTitleText("对方回合");
                button.setTouchEnabled(false);
                button.setColor(cc.color(100, 100, 100));
            });
        this.btnRound = button;
    },
    //加载双方卡组
    loadGroup: function () {
        //模拟数据流
        var ourflow = "MTAwMi0xMDAyLTEwMDItMTAwMg==";
        //我方卡组
        var ourGroup = new UICardGroupOwn(ourflow);
        this.addChild(ourGroup, LocalZorderEnemu.UI);
        ourGroup.setPosition( //缝隙20
            this.checkerboard.x + this.checkerboard.width + 20,
            this.checkerboard.y);
        //注册抽卡完成时候的回调事件
        ourGroup.pumpCardEventAction = function (cardID) {
            let cardData = XCDATA.findMonsterData(cardID);  //找到对应Data
            this.ourCardsHandBox.addCard(cardData);         //置入手牌中
        }.bind(this);
        this.ourCardGroup = ourGroup;

        //模拟数据流
        var otherflow = "MTAwMi0xMDAyLTEwMDItMTAwMg==";
        //对方卡组
        var otherCardGroup = new UICardGroupOther(otherflow);
        this.addChild(otherCardGroup, LocalZorderEnemu.UI);
        otherCardGroup.setAnchorPoint(1, 1);
        otherCardGroup.setPosition(this.checkerboard.x - 20,
            this.checkerboard.y + this.checkerboard.height);
        //抽卡事件
        otherCardGroup.pumpCardEventAction = function (cardID) {
            var cardData = XCDATA.findMonsterData(cardID);
            this.otherCardsHandBox.addCard(cardData);
        }.bind(this);
        this.otherCardGroup = otherCardGroup;
    },
    //加载双方血条
    loadBlood: function () {
        var blood = new UIBloodBox();
        this.addChild(blood, LocalZorderEnemu.UI);
        blood.setPosition(this.checkerboard.x + this.checkerboard.width / 2, this.checkerboard.y);
        this.ourBloodBar = blood;
        var otherBloodBar = new UIBloodBox();
        this.addChild(otherBloodBar, LocalZorderEnemu.UI + 10);
        otherBloodBar.setPosition(this.checkerboard.x + this.checkerboard.width / 2,
            this.checkerboard.y + this.checkerboard.height + 20);
        this.otherBloodBar = otherBloodBar;
    },
    //加载双方法力
    loadEnergy: function () {
        //
        var ourEnergy = new GWEnergyBox(10);
        this.addChild(ourEnergy, LocalZorderEnemu.UI);
        ourEnergy.setAnchorPoint(1, 0)
        ourEnergy.setPosition(this.checkerboard.x, this.checkerboard.y);
        this.ourEnergy = ourEnergy;
        //
        var otherEnergy = new GWEnergyBox(10);
        this.addChild(otherEnergy, LocalZorderEnemu.UI);
        otherEnergy.setAnchorPoint(0, 1)
        otherEnergy.setPosition(this.checkerboard.x + this.checkerboard.width, this.checkerboard.y + this.checkerboard.height);
        this.otherEnergy = otherEnergy;
    },
    //加载手牌区域
    loadHandCard: function () {
        var sideWidth = 20; //添加边距
        var hand = new UIHandCardOwn();//ancher 0,1    //透明手牌区域，常用于己方。
        this.addChild(hand, LocalZorderEnemu.UI);
        hand.setPosition(this.checkerboard.x - sideWidth,
            this.checkerboard.y);
        hand.setContentSize(this.checkerboard.width + 2 * sideWidth, 100);
        //绑定 手牌中的选卡选中事件
        hand.selectCard = function (data) {
            let model = this.showLookCard(data);
            this.checkerboard.pickUpDataInHand(model);//选卡传入
            XCLookModel(model);
        }.bind(this);

        //绑定取消事件
        hand.cancelSeleCard = function () {
            cc.log("cancelSeleCard");
            // this.checkerboard.cancelPickUpCardInHand();
        }.bind(this);
        this.ourCardsHandBox = hand;

        var sideWidth = 20; //添加边距
        var otherHand = new UIHandCardOther();//ancher 0,1  //黑背手牌区域，常用于对方。
        this.addChild(otherHand, LocalZorderEnemu.UI);
        otherHand.setAnchorPoint(0, 0);
        otherHand.setPosition(this.checkerboard.x - sideWidth,
            this.checkerboard.y + this.checkerboard.height);
        otherHand.setContentSize(this.checkerboard.width + 2 * sideWidth, 100);
        //绑定选中事件
        otherHand.selectCard = function (uiData) {
        }.bind(this);
        //绑定取消事件
        otherHand.cancelSeleCard = function () {
            // cc.log("cancelSeleCard");
            // this.checkerboard.cancelPickUpCardInHand();
        }.bind(this);
        this.otherCardsHandBox = otherHand;
    },
    //侧栏-展示卡牌
    showLookCard: function (model) {
        //如果当前已有在展示的卡牌、先移除
        if (this.lookCard != null) {
            this.lookCard.removeFromParent();
            this.lookCard = null;
        }
        //构造
        var card = new UICard();
        this.addChild(card, LocalZorderEnemu.CARD);
        card.setPosition(this.checkerboard.x + this.checkerboard.width + 10, 100);
        card.setAnchorPoint(0, 0);
        this.lookCard = card;//重新记录
        //
        let data = XCDATA.findMonsterData(model.ID);
        card.changeUiData(data, model);//设置数据
        return data;// 可用可不用
    },
    //注册触摸事件
    registerTouchEvent: function () {
        this.isAllowControl = true;
        // [事件监听]触摸事件
        var onTouchEventListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,//单指模式
            target: this,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(onTouchEventListener, this);
    },
    /**>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     /**
     *  delegate 相关
     */
    //棋盘 delegate //发起召唤的回调

    eventTouchSummonChessStartAction: function (data) {
        //法力消耗判断
        let bool = this.ourEnergy.subtractPowerCount(data.energy);
        let str = bool ? "你消耗了" + data.energy + "点能量" : "你的能量不足";
        this.sysMailbox.sendMessage(str);
        return bool;
    },
    //触摸事件 - 选中棋子
    // ***
    eventTouchChessAction: function (state, obj) {
        if (state == 1) {
            switch (obj.pieceType) {
                case PieceTypeEnemu.BASE:
                    cc.log(state, obj);
                    break;
                case PieceTypeEnemu.BUILDING:
                    cc.log(state, obj);
                    break;
                case PieceTypeEnemu.MONSTER:
                    cc.log(state, obj);
                    this.showLookCard(obj.dataModel);
                    break;
                default:
                    break;
            }
        } else {
            cc.log("收起");
        }
    },
    //召唤结束的回调
    eventTouchSummonChessEndAction: function (state, data) {
        switch (state) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                this.ourCardsHandBox.releaseCard();
                this.sysMailbox.sendMessage("成功召唤\"" + data.name + "\"");
                break;
            default:
                break;
        }
    },
    //触摸事件 - 棋子移动开始回调
    eventTouchMoveChessStartAction: function (state) {
        switch (state) {
            case 0:
                this.sysMailbox.sendMessage("无法移动！行动次数不足");
                break;
            default:
                break;
        }
    },

    /**>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
    //touch event
    onTouchBegan: function (touch, event) {
        cc.log("onTouchBegan");
        //获得主体
        var self = event.getCurrentTarget();
        //提前释放多余card
        if (self.lookCard != null) {
            self.lookCard.removeFromParent();
            self.lookCard = null;
        }
        //将点击坐标转换为基于当前触发事件对象的本地坐标
        var posInNode = self.convertToNodeSpace(touch.getLocation());
        //棋盘区域范围
        var checkerboardRect = cc.rect(self.checkerboard.x,
            self.checkerboard.y,
            self.checkerboard.width,
            self.checkerboard.height);
        //手牌区域
        // *>这里的x,y其实和Ancher相关 -因为rectContainsPoint方法只会判断ancher（0，0）的rect
        //所以下行y的写法更严谨
        var cardGroupRect = cc.rect(self.ourCardsHandBox.x,
            self.ourCardsHandBox.y * (1 - self.ourCardsHandBox.anchorY),
            self.ourCardsHandBox.width,
            self.ourCardsHandBox.height);
        self.checkerboard.onTouchEnded(touch);//将触发传递至下层
        self.ourCardsHandBox.onTouchEnded(touch);//将触发传递至下层
        return true;//native下必须有return，否则触发次数会有问题
    },

    onTouchMoved: function (touch, event) {
        cc.log("onTouchMoved");
    },
    onTouchEnded: function (touch, event) {
        cc.log("onTouchEnded");
    },
    onExit: function () {
        this._super();
        console.log("GameScene onExit:");
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
    update: function (dt) {
        switch (this.gameStageState) {
            //开始游戏-准备工作
            case GameStageStateEnemu.notStart:
                this.readyToStartGame();
                break;
            //开始本局
            case GameStageStateEnemu.start:
                this.startGame();
                break;
            //回合开始
            case GameStageStateEnemu.myRound:

                this.sysMailbox.sendMessage("回合开始");
                this.textLabel.addShowText("回合开始", this.pumpingCard(), this);
                // this.pumpingCard();//开场抽牌
                break;
            case GameStageStateEnemu.myRounding:
                if (this.isAllowControl === false) {
                    //允许行动-开放注册
                    this.registerTouchEvent();
                }
                this.gameStageState = GameStageStateEnemu.stagnation;
                // //计时开始
                // this.currentRoundSurplusTime -= dt;
                // //如果计时 进入倒计时 -则读秒
                // if(this.currentRoundSurplusTime < this.currentCountdownTime ){
                //     cc.log("roundSurplusTime:",this.currentRoundSurplusTime,"this.countdownBeginTime:",this.currentCountdownTime);
                //     this.sysMailbox.sendMessage(parseInt(this.currentCountdownTime));
                //     this.currentCountdownTime -= 1;//每读一次，读秒次数量/时间-1
                // }
                // //读秒时间耗尽-说明我方回合时间到-进入搁置状态
                // if(this.currentCountdownTime < 0 ){
                //     //搁置-时间到-进入对方回合
                //     this.gameStageState = GameStageStateEnemu.stagnation;
                //     this.sysMailbox.sendMessage("回合结束");
                //     //时间重制
                //     this.currentRoundSurplusTime    = this.roundSurplusTime;
                //     this.currentCountdownTime       = this.countdownTime;
                // }
                break;
            case GameStageStateEnemu.otherRound:
                break;
        }
    },

    //准备开始游戏
    readyToStartGame: function () {
        this.gameStageState = GameStageStateEnemu.notStarting;
        //创建相关。。
        //通知棋盘 摆放国王
        this.checkerboard.initGameCrystal();
        //摆放卡组。。

        //进入开始游戏
        this.sysMailbox.sendMessage("游戏开始");
        this.textLabel.addShowText("游戏开始");
        this.sysMailbox.sendMessage("双方各自抽5张");

        // //抽取5张牌
        this.ourCardGroup.pumpingCard(this.beginGameDrawCount);
        this.otherCardGroup.pumpingCard(this.beginGameDrawCount);
        this.gameStageState = GameStageStateEnemu.start;//stagnation//start
    },

    //开始本局
    startGame: function () {
        this.gameStageState = GameStageStateEnemu.starting;
        this.sysMailbox.sendMessage("裁判投币决定先后手");
        this.textLabel.addShowText("裁判投币决定先后手", function () {
            cc.log("textlabel 裁判");
            var jb = new UIGold();
            this.addChild(jb, LocalZorderEnemu.DialogueGold);
            jb.setPosition(screen.width / 2, screen.height / 2);

            var self = this;
            var result = jb.playCoinAnimation(
                function () {
                    var str = "你获得了" + (result ? "先" : "后") + "手";
                    // this.sysMailbox.sendMessage(str);
                    self.sysMailbox.sendMessage(str);
                    self.textLabel.addShowText(str);
                    // this.textLabel.addShowText(str);
                    cc.log(str);
                }, 1, function () {
                    jb.removeFromParent();
                    //模拟先手情况
                    self.gameStageState = GameStageStateEnemu.myRound;//stagnation//start
                    cc.log("yeah");
                });
        }, this);
    },

    //抽卡
    pumpingCard: function () {
        this.gameStageState = GameStageStateEnemu.pumpingCard;
        this.textLabel.addShowText("抽卡");
        this.sysMailbox.sendMessage("抽卡");
        //卡组中取出1张牌
        this.ourCardGroup.pumpingCard(1); //抽卡时会自动调起ourCardGroup'pumpCardEventAction
        this.gameStageState = GameStageStateEnemu.myRounding;
    },
});

var TestWorkScene = BaseScene.extend({
    onEnter: function () {
        this._super();
        var layer = new TestWorkLayer();
        this.addChild(layer);
    }
});
