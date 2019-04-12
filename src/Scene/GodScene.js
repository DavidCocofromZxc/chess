


/**
 *
 *  教程场景
 *
 * */


// var GodLayer = cc.Layer.extend({

var GodLayer = BaseScene.extend({

    textLabel       :null,  //对话text条
    nodeSprite      :null,  //对话的sptire
    checkerboard    :null,  //棋盘
    demoChess       :null,  //棋子

    contentList     :[],

    ctor:function () {
        this._super();
        this.loadBody();
        this.loadLabel();
        this.loadDemoChess();
        this.loadContentList();
        this.registerEvent();
        return true;
    },

    /*
    *  init
    * */
    //加载对话主体
    loadBody:function(){
        var node = new GWDialogue(res.God_png);
        this.addChild(node,LocalZorderEnemu.Dialogue);
        node.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.nodeSprite = node;
    },
    //加载对话文字
    loadLabel:function(){
        var text = new GWText();
        this.addChild(text,LocalZorderEnemu.DialogueText);
        text.setPosition( cc.winSize.width/2, cc.winSize.height/2 - 100);
        this.textLabel = text;

    },
    //加载demo棋子
    loadDemoChess:function () {
        var chess = new GWMonster("26");
        this.addChild(chess,LocalZorderEnemu.CHESS);
        chess.chessType = ChessTypeEnemu.SNOW;
        chess.setPosition(cc.winSize.width/2 + 300,cc.winSize.height/2);
        chess.setAnchorPoint(0,0);
        chess.StateSummoning = SummoningStateEnemu.inHand;
        chess.setOpacity(0);
        this.demoChess = chess;
    },
    //加载棋盘
    loadCheckerboard:function () {
        var node = new GWIntroduceCheckerboard();
        this.addChild(node);
        node.setAnchorPoint(0,0);
        node.setPosition(   (cc.winSize.width - node.width)/2,
                                    (cc.winSize.height - node.height)/2);
        this.checkerboard = node;
    },
    //加载对话内容list
    loadContentList:function(){
        this.contentList = [    "你好",//0
            "我是这个世界的神",
            "我所处的世界已经支离破碎",
            "纵使是我、亦没有完整的肉身",
            "你可以称呼我 \"魅影\" ",
            "我需要你",
            "帮我在主神的游戏中获得胜利",//6
            "我用仅有的力量，向你展现一次战斗",//7
            "这是名为 \"国王骰\" 的游戏棋盘",//8
            "两边的水晶是敌对双方的胜利目标",//9
            "右侧是主神们随之游玩的棋子",//10
            "他们是各大位面搜集而来的英灵、亡者和未生之物",
            "这枚棋子叫小雪，它曾是我珍爱之物",//11
            "现在点击选中小雪吧",//12
        ];
    },
    //注册事件
    registerEvent:function(){

        //注册事件用于每一句对话结束的回调
        var listener = cc.EventListener.create({
            event       :   cc.EventListener.CUSTOM,
            target      :   this,
            eventName   :   TEXT_CALLBACK_EVENT,
            callback    : function(event){
                var target = event.getCurrentTarget();
                var data =  event.getUserData();
                target.showDialogueAction(data.key,data.isOver);
            }
        });
        cc.eventManager.addListener(listener,this);

        //单独对话的回调
        var listenerSing = cc.EventListener.create({
            event       :   cc.EventListener.CUSTOM,
            target      :   this,
            eventName   :   FREE_DIALOGRE_EVENT,
            callback    : function(event){
                var target = event.getCurrentTarget();
                var data =  event.getUserData();
                target.showDialogueAction(data.key,data.isOver);
            }
        });
        cc.eventManager.addListener(listenerSing,this);
    },

    /*
    *   logic
    * */
    //展开对话
    startConversation:function () {
        cc.log("bodyShowOver");
        if(this.contentList != [] && this.contentList.length > 0){
            this.textLabel.setContentListAndShowTops(this.contentList);
        }
    },
    //对话人动作
    showDialogueAction:function(key,isOver){

        switch (key) {
            /*
            *  自然事件
            * */
            case "我用仅有的力量，向你展现一次战斗":
                var fadIn = cc.fadeTo(0.2,255 * 0.2);
                var moveUp = cc.moveBy(0.4,cc.p(-(cc.winSize.width/3),0));
                var fadOut = cc.fadeTo(0.2,255 * 0.6);
                var blueSeq = cc.sequence(fadIn,moveUp,fadOut);
                this.nodeSprite.runAction(blueSeq);
                break;
            case "这是名为 \"国王骰\" 的游戏棋盘":
                //
                this.textLabel.setPosition(this.textLabel.x,this.textLabel.y - 170);
                //显示棋盘
                this.loadCheckerboard();
                break;
            case "两边的水晶是敌对双方的胜利目标":
                //加载 游戏逻辑-国王
                this.checkerboard.initGameCrystal();
                break;
            case "右侧是主神们随之游玩的棋子":
                //显示Demo棋子
                var fadeIn = cc.fadeIn(2);
                this.demoChess.runAction(fadeIn);
                break;
            case "现在点击选中小雪吧":
                this.registerTouchEvent();
                break;

                /*
                * 未知事件
                * */
            case "选中了小雪":
                this.textLabel.setContentListAndShowTops(["很好！现在点击绿色\"召唤区域"]);
                break;
            case "小雪召唤成功":
                this.textLabel.isAutomaticNext = true;
                this.textLabel.setContentListAndShowTops(["没错","现在选中小雪可以移动"],2);
                break;
            case "选中小雪请移动":
                this.textLabel.setContentListAndShowTops(["点击蓝色区域可以移动你的棋子"]);
                break;

            default:
                break;
        }
        // if(isOver){
        //     this.textLabel.stopAllActions();
        //     cc.eventManager.removeCustomListeners(this.textLabel.TEXT_CALLBACK_EVENT);
        //     cc.eventManager.removeCustomListeners(this..TEXT_CALLBACK_EVENT);
        //     this.textLabel.removeFromParent();
        //     this.textLabel = null;
        //     return ;
        // }
    },

    // registerFreeDialogue:function(){
    //     // [事件监听]触摸事件
    //     // var onTouchEventListener = cc.EventListener.create({
    //     //     event           : cc.EventListener.TOUCH_ONE_BY_ONE,//单指模式
    //     //     target          : this,
    //     //     swallowTouches  : true,
    //     //     callback    : function(event){
    //     //         var target = event.getCurrentTarget();
    //     //         var data =  event.getUserData();
    //     //         //
    //     //         target.showDialogueAction(data.index,data.isOver);
    //     //     }
    //     //     // onTouchBegan  : this.onTouchBegan,
    //     //     // onTouchMoved  : this.onTouchMoved,
    //     //     // onTouchEnded  : this.onTouchEnded
    //     // });
    //     // cc.eventManager.addListener(onTouchEventListener, this);
    // },
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
    },




    //touch event
    onTouchBegan:function (touch,event) {



        var self = event.getCurrentTarget();
        //将点击坐标转换为基于当前触发事件对象的本地坐标
        var posInNode = self.convertToNodeSpace(touch.getLocation());

        //棋盘区域范围
        var checkerboardRect = cc.rect( self.checkerboard.x,
                                        self.checkerboard.y,
                                        self.checkerboard.width,
                                        self.checkerboard.height);

        //小雪区域范围
        var xiaoxueRect = cc.rect(  self.demoChess.x,
                                    self.demoChess.y,
                                    self.demoChess.width,
                                    self.demoChess.height);

        // //判断是否落在棋盘内
        if(cc.rectContainsPoint(checkerboardRect,posInNode)){
            cc.log("落在棋盘内")
            self.checkerboard.onTouchEnded(touch);    //触发传递
            return true;
        }

        // //判断是否落在选子区
        else if(cc.rectContainsPoint(xiaoxueRect,posInNode)){
            cc.log("落在选棋内")
            // self.demoChess.onTouchBegan(touch,event);   //触发传递
            // self.demoChess.pickUp();
            self.checkerboard.pickUpChessInHand(self.demoChess);

            return true;
        }else{
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

});



var GodScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new GodLayer();
        this.addChild(layer);
    }

});