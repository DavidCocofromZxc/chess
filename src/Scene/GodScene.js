


var GodLayer = cc.Layer.extend({

    textLabel       :null,  //对话text条
    nodeSprite      :null,  //对话的sptire
    checkerboard    :null,  //棋盘
    demoChess       :null,  //棋子

    contentList     :[],

    ctor:function () {

        this._super();

        this.loadBody();
        this.loadLabel();

        this.contentList = [    "你好",                       //0
                                "我是这个世界的神",             //1
                                "你可以称呼我 \"魅影\" ",       //2
                                "我所处的世界已经支离破碎",     //3
                                "纵使是神、亦没有完整的肉身",    //4
                                "我需要你",                    //5
                                "帮我在对弈中获得胜利",          //6
                                "这是名为 \"国王骰\" 的游戏棋盘",//7
                                "而右侧是主神们随之游玩的棋子",   //8
                                "他们是各大位面搜集而来的英灵、亡者和未生之物",//9
                                "这枚棋子叫小雪，是我珍视之物",//10
                                "我用仅有的力量，向你展现一次战斗",//11
                                "现在点击选中小雪",//12
                                "..."
                            ];
        return true;
    },


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
        text.setPosition( this.width/2, this.height/2 - 100);
        this.textLabel = text;

        var listener = cc.EventListener.create({
            event       :   cc.EventListener.CUSTOM,
            target      :   this,
            eventName   :   text.TEXT_CALLBACK_EVENT,
            callback    : function(event){
                var target = event.getCurrentTarget();
                var data =  event.getUserData();
                target.showDialogueAction(data.index,data.isOver);
            }
        });
        cc.eventManager.addListener(listener,this);
    },


    //展开对话
    startConversation:function () {
        cc.log("bodyShowOver");
        if(this.contentList != [] && this.contentList.length > 0){
            this.textLabel.setContentListAndShowTops(this.contentList);
        }
    },



    //对话人动作     index-对话编号
    showDialogueAction:function(index,isOver){

        switch (index) {
            case 3:
                var fadIn = cc.fadeTo(0.2,255 * 0.2);
                var moveUp = cc.moveBy(0.4,cc.p(-(cc.winSize.width/3),0));
                var fadOut = cc.fadeTo(0.2,255 * 0.6);
                var blueSeq = cc.sequence(fadIn,moveUp,fadOut);
                this.nodeSprite.runAction(blueSeq);
                break;
            case 6:
                //加载棋盘
                this.textLabel.setPosition(this.textLabel.x,this.textLabel.y - 150);
                cc.log("index 4");
                this.loadCheckerboard();
                break;
            case 7:
                //加载展示棋子
                this.loadDemoChess();
                break;
            case 8:
                //加载 游戏逻辑-国王
                this.checkerboard.placeChessCrystal();
                this.registerEvent();//监听注册开启

                // cc.log("showDialogueAction 8：",this.checkerboard.tmxMap.x,this.checkerboard.tmxMap.y);
                break;
            default:
                break;

        }

        if(isOver){
            this.textLabel.stopAllActions();
            cc.eventManager.removeCustomListeners(this.textLabel.TEXT_CALLBACK_EVENT);
            this.textLabel.removeFromParent();
            this.textLabel = null;
            return ;
        }


    },


    loadCheckerboard:function () {

        var node = new GWCheckerboard();
        this.addChild(node);
        node.setAnchorPoint(0,0);
        node.setPosition(0,0);
        this.checkerboard = node;

    },



    //展示demo棋子
    loadDemoChess:function () {

        var chess = new GWMonster("26");
        // chess.setScale(2);
        this.addChild(chess,LocalZorderEnemu.CHESS);
        chess.setPosition(cc.winSize.width/2 + 300,cc.winSize.height/2 );
        chess.setAnchorPoint(0,0);
        chess.setOpacity(0);

        var fadeIn = cc.fadeIn(2);
        chess.runAction(fadeIn);
        chess.StateSummoning = SummoningStateEnemu.inHand;
        this.demoChess = chess;

    },






    registerEvent:function(){

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
        var checkerboardRect = cc.rect( self.checkerboard.tmxMap.x,
                                        self.checkerboard.tmxMap.y,
                                        self.checkerboard.tmxMap.width,
                                        self.checkerboard.tmxMap.height);

        //小雪区域氛围
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