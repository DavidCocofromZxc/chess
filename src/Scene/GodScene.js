


/**
 *
 *  教程场景
 *
 * */
var GodLayer = BaseLayer.extend({

    contentList: [],//对话内容
    textLabel: null, //对话text条
    nodeSprite: null, //对话的sptire

    checkerboard: null, //棋盘
    ourCardGroup: null, //我方卡组
    cardsHandBox: null, //我方手牌区域
    lookCard: null, //查看卡
    
    /** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * load
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  */

    ctor: function () {
        this.lookCard = null;
        this._super();
        this.loadBody();    //加载对话主体
        this.loadLabel();    //加载对话文字
        this.loadContentList(); //加载对话内容list
        this.registerEvent();   //注册事件
        return true;
    },
    //加载对话主体
    loadBody: function () {
        var node = new UIDialogue(res.god);
        this.addChild(node, LocalZorderEnemu.Dialogue);
        node.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.nodeSprite = node;
        //绑定展示完成后的方法
        node.showBodyOver = function () {
            if (this.contentList != [] && this.contentList.length > 0) {
                this.textLabel.setContentListAndShowTops(this.contentList);
            }
        }.bind(this);
    },
    //加载对话文字
    loadLabel: function () {
        var text = new UIText();
        this.addChild(text, LocalZorderEnemu.DialogueText);
        text.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 100);
        this.textLabel = text;
    },
    //加载棋盘
    loadCheckerboard: function () {
        var node = new UIIntroduceCheckerboard();
        this.addChild(node);
        node.setAnchorPoint(0, 0);
        node.setPosition((cc.winSize.width - node.width) / 2,
            (cc.winSize.height - node.height) / 2);
        this.checkerboard = node;
    },
    //加载卡组
    loadGroup: function () {
        var ourGroup = new UIBaseCardGroup();//我方卡组
        this.addChild(ourGroup, LocalZorderEnemu.UI);
        ourGroup.setPosition(this.checkerboard.x + this.checkerboard.width + 20,//缝隙
            this.checkerboard.y);
        //抽卡事件
        ourGroup.pumpCardAction = function (cardID) {
            var data = JSDataTool.monster[cardID];
            this.cardsHandBox.addCard(data);
        }.bind(this);
        this.ourCardGroup = ourGroup;
        // this.ourCardGroup.setOpacity(0.1 *255);
        this.ourCardGroup.setOpacity(0);
    },
    //加载手牌区域
    loadHandCard: function () {
        var sideWidth = 20; //添加边宽
        var hand = new UIHandCardOwn();//ancher 0,1
        this.addChild(hand, LocalZorderEnemu.UI);
        hand.setPosition(this.checkerboard.x - sideWidth,
            this.checkerboard.y);
        hand.setContentSize(this.checkerboard.width + 2 * sideWidth, 100);
        this.cardsHandBox = hand;
        //绑定选中事件
        hand.selectCard = function (data) {
            this.showLookCard(data);
        }.bind(this);
        //绑定取消事件
        hand.cancelSeleCard = function () {
            cc.log("cancelSeleCard");
            this.checkerboard.cancelPickUpCardInHand();
        }.bind(this);
    },
    /** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * other func
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  */

    //侧栏-展示卡牌
    showLookCard: function (model) {
        if (this.lookCard != null) {
            this.lookCard.removeFromParent();
            this.lookCard = null;
        }
        var card = new UICard();
        this.addChild(card, LocalZorderEnemu.CARD);
        card.setPosition(this.checkerboard.x + this.checkerboard.width + 10, 100);
        card.setAnchorPoint(0, 0);
        this.lookCard = card;
        var data = JSDataTool.monster[1002];
        card.changeUiData(data, model);//设置数据
        this.checkerboard.pickUpDataInHand(data);//拿起
    },

    //加载对话内容list
    loadContentList: function () {
        this.contentList = [
            "你好",//0
            "我是这个世界的神",
            "我所处的世界已经支离破碎",
            "纵使是我、亦没有完整的肉身",
            "你可以称呼我 \"魅影\" ",
            "我需要你",
            "帮我在主神的游戏中获得胜利",//6
            "我用仅有的力量，向你展现一次战斗",//7
            "这是名为 \"国王骰\" 的主神游戏",//8
            "两边的水晶是敌对双方的胜利目标",//9
            "右侧是主神们随之游玩的卡片",//10
            "他们是各大位面搜集而来的英灵、亡者和未生之物",
            "这张卡是我叫做沉默番兵，它曾是我珍爱之物",
            "现在点击选中番兵吧",//12
        ];
    },

    /** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * about talk event
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  */

    //注册事件
    registerEvent: function () {
        //注册事件用于每一句对话结束的回调
        var listener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target: this,
            eventName: TEXT_CALLBACK_EVENT,
            callback: function (event) {
                var target = event.getCurrentTarget();
                var data = event.getUserData();
                target.showDialogueAction(data.key, data.isOver);
            }
        });
        cc.eventManager.addListener(listener, this);

        //单独对话的回调
        var listenerSing = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            target: this,
            eventName: FREE_DIALOGRE_EVENT,
            callback: function (event) {
                var target = event.getCurrentTarget();
                var data = event.getUserData();
                target.showDialogueAction(data.key, data.isOver);
            }
        });
        cc.eventManager.addListener(listenerSing, this);
    },
    //对话人动作
    showDialogueAction: function (key, isOver) {
        switch (key) {
            /*
            *  自然事件
            * */
            case "我用仅有的力量，向你展现一次战斗":
                var fadIn = cc.fadeTo(0.2, 255 * 0.2);
                var moveUp = cc.moveBy(0.4, cc.p(-(cc.winSize.width / 3), 0));
                var fadOut = cc.fadeTo(0.2, 255 * 0.6);
                var blueSeq = cc.sequence(fadIn, moveUp, fadOut);
                this.nodeSprite.runAction(blueSeq);
                break;
            case "这是名为 \"国王骰\" 的主神游戏":
                //
                this.textLabel.setPosition(this.textLabel.x, this.textLabel.y - 100);
                //加载&显示棋盘
                this.loadCheckerboard();
                this.loadGroup();
                this.loadHandCard();
                break;
            case "两边的水晶是敌对双方的胜利目标":
                //加载 游戏逻辑-国王
                this.checkerboard.initGameCrystal();
                break;
            case "右侧是主神们随之游玩的卡片":
                //显示Demo棋子
                var fadeIn = cc.fadeIn(2);
                this.ourCardGroup.runAction(fadeIn);
                break;
            case "这张卡是我叫做沉默番兵，它曾是我珍爱之物":
                this.ourCardGroup.pumpingCard(1);
                break;
            case "现在点击选中番兵吧":
                this.registerTouchEvent();//开放touch
                break;

            // /*
            // * 未知事件
            // * */
            // case "选中了小雪":
            //     this.textLabel.setContentListAndShowTops(["很好！现在点击绿色\"召唤区域"]);
            //     break;
            // case "小雪召唤成功":
            //     this.textLabel.isAutomaticNext = true;
            //     this.textLabel.setContentListAndShowTops(["没错", "现在选中小雪可以移动"], 2);
            //     break;
            // case "选中小雪请移动":
            //     this.textLabel.setContentListAndShowTops(["点击蓝色区域可以移动你的棋子"]);
            //     break;

            default:
                break;
        }
    },

    /** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * about touch event
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  */

    //注册触摸事件
    registerTouchEvent: function () {
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
    //
    onTouchBegan: function (touch, event) {
        return true;
    },
    //
    onTouchMoved: function (touch, event) {
        cc.log("onTouchMoved");
    },
    //
    onTouchEnded: function (touch, event) {
        cc.log("onTouchEnded");
        var self = event.getCurrentTarget();
        //将触发传递至下层
        self.checkerboard.onTouchEnded(touch);
        self.cardsHandBox.onTouchEnded(touch);
    },
});

var GodScene = BaseScene.extend({
    onEnter: function () {
        this._super();
        var layer = new GodLayer();
        this.addChild(layer);
    }
});