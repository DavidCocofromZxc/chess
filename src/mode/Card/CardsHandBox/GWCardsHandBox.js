
/**
 *
 *  专用手牌类- 手牌区域
 *
 * */
var GWCardsHandBox = ccui.Layout.extend({
    /**
     * cardList 结构:
     * {
     *   Card    :hand, 卡UI-Sprite     //小卡
     *   index   :index                 //所在索引
     *   uiData  :cardUIData            //放大视图
     * }
     * */
    cardList        :   [],     //手牌列表-//视图逻辑的list
    selectHandCard  :   null,   //选中的手牌
    showCard        :   null,   //展示的卡片

    /**
     *  以后用js 网络配置
     * */
    //配置项-
    cardWidth       :   50,//
    cardFX          :   10,

    ctor: function() {
        this.cardList       = [];
        this.selectHandCard = null;
        this.showCard       = null;

        this._super();
        this.setAnchorPoint(0,1);
        // 高亮现实-用于测试
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color(200,200,200));
        this.setBackGroundColorOpacity(255 *0.2);
        return true;
    },
    //加入到手牌<小牌>
    //UI data
    //cardUIData不存在则使用默认,isBack是否使用背面默认不用背面
    addCard:function (cardData) {
        //组合小卡url
        let skUrl = "res/Card/Little/sk"+cardData.ID+".png"
        //获得小卡res
        let cardUrl = (cardData === undefined || cardData == null)?res.cardHand:skUrl;
        //构造小卡
        let hand = new GWHandCard(cardUrl,false);//ancher 0,1
        //数据对象处理
        // var index = this.cardList.length;
        this.cardList.push({card:hand,index:0,data:cardData});//对象和数据 均放入list
        // V
        //加入手牌区域
        this.addChild(hand);
        //< UI 调整>
        this.setCardsHandBoxUI(hand);
    },
    //UI重制
    setCardsHandBoxUI:function(hand){
        //参数配置
        var maxWidth    = this.width;           //手牌区域宽度
        var cardWidth   = this.cardWidth;       //每张手牌宽度
        var fx          = this.cardFX;          //缝隙
        var bj          = (maxWidth - this.cardList.length * (cardWidth + fx))/2;//边距

        if(bj < 0){
            fx = 5;
            bj = (maxWidth - this.cardList.length * (cardWidth + fx))/2;
        }
        //
        if(hand !== undefined && (typeof hand === "object")){
            // 调整hand 位置
            // 主要目的是为了保证hand已经在this区域中，可以让后面的调整动画变完整
            var y           = this.height - fx;
            hand.setPosition(maxWidth - cardWidth,y);
        }
        //遍历修改位置
        for(var i = 0 ,len = this.cardList.length;i < len; i++){
            this.cardList[i].index = i;
            var hand = this.cardList[i].card;
            var x = bj + i *(cardWidth + fx);
            var y = this.height - fx;
            hand.runAction(cc.moveTo(0.5,x,y));
        }
    },

    /**
     * touch event 用于上层方法传递事件
     * */

    //touch event
    onTouchBegan:function (touch,event) {
        // return this.customOnTouchBegan(touch,event);// false 会使点击失败
    },
    onTouchMoved:function (touch,event) {
        // this.cunstomOnTouchMoved(touch,event);
    },
    onTouchEnded:function (touch,event) {
        var self = (event === undefined)? this : event.getCurrentTarget();  //当前主体
        var posInNode = self.convertToNodeSpace(touch.getLocation());       //在当前node中 点击位置
        var rect = cc.rect(0,0,self.width,self.height); //在当前坐标系中允许点击的范围

        if(!(cc.rectContainsPoint(rect,posInNode))){    //判断是否在允许的点击范围内
            self.restoreScene();//点击在非法区域场景还原
            return false;//不合法直接return
        }
        //< 点选查看的逻辑 >
        //可以再优化
        var cardData = this.findTouchCard(posInNode);//查看
        if(cardData != null){ //点击手牌
            // var card = cardData.card;
            var isNeedSendMeg = false;
            //同一张卡->收起
            if(this.selectHandCard != null && this.selectHandCard.card ==  cardData.card){
                this.selectHandCard.card.y -= 10;
                this.selectHandCard = null;
            }//不同卡->收起->展开
            else if(this.selectHandCard != null && this.selectHandCard.card !=  cardData.card){
                this.selectHandCard.card.y -= 10;
                this.selectHandCard = null;
                this.selectHandCard = cardData;
                this.selectHandCard.card.y += 10;
                isNeedSendMeg = true;
            }//未选中卡->展开
            else if(this.selectHandCard == null){
                this.selectHandCard = cardData;
                this.selectHandCard.card.y += 10;
                isNeedSendMeg = true;
            }else{
                cc.log("in rect !!!!!!!!!!!!!!!!!!!!! handbox 3");
            }
            if(isNeedSendMeg){
                this.selectCard(cardData.data);
            }
        }
        else{
            this.restoreScene();
        }
    },

    //还原场景
    restoreScene:function(){
        if(this.selectHandCard != null){
            this.selectHandCard.card.y -= 10;
            this.selectHandCard = null;
            this.cancelSeleCard();
        }
    },
    //删除选中卡
    releaseCard:function(){
        if(this.selectHandCard != null){

            // this.cardList.push({card:hand,index:index,data:cardData});//对象和数据 均放入list
            this.cardList.splice(this.selectHandCard.index,1)
            this.selectHandCard.y -= 10;
            this.selectHandCard.card.removeFromParent();
            this.selectHandCard = null;
            this.cancelSeleCard();
            this.setCardsHandBoxUI();
        }
    },
    //找出点击的卡
    /**
     * 返回对象 cardData
     * {
     *   Card    :hand, 卡UI-Sprite
     *   index   :index
     *   uiData  :cardUIData
     * }
     * */
    findTouchCard:function (posInNode) {
        cc.log("findTouchCard",posInNode);
        for (var i = 0, len = this.cardList.length; i < len ; i++) {
            var cardData = this.cardList[i];//
            var card = cardData.card;
            var cardGroupRect   = cc.rect(  card.x,
                                            (card.y - card.height),
                                            card.width,
                                            card.height);
            //判断是否落在手牌
            if(cc.rectContainsPoint(cardGroupRect,posInNode)){
                return cardData;
            }
        }
        return null;
    },
    //
    findTouchCardIndex:function (posInNode) {
        cc.log("findTouchCard",posInNode);
        for (var i = 0, len = this.cardList.length;i<len;i++) {
            var card = this.cardList[i].card;
            var cardGroupRect   = cc.rect(  card.x,
                card.y * (1 - card.anchorY),
                card.width,
                card.height);
            //判断是否落在手牌
            if(cc.rectContainsPoint(cardGroupRect,posInNode)){
                return i;
            }
        }
    },

    /**
     *  bind 绑定函数用于 外部绑定
     * */
    selectCard:function(data){
        cc.log("selectCard null func:",data);
    },
    cancelSeleCard:function () {
        cc.log("cancelSeleCard null func");
    }

});
