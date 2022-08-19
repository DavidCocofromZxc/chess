
/**
 * 信箱类 -系统消息 +记录（目前考虑供玩家使用，和测试使用两种）
 * */


var GWMailbox = ccui.ScrollView.extend({

    textList    :   [],
    uiTextList  :   [],

    ctor: function () {

        this.textList = [];
        this.uiTextList = [];

        this._super();

        this.setAnchorPoint(0,0);
        this.setContentSize(cc.size(400,cc.winSize.height));
        this.setTouchEnabled(true);
        this.setBounceEnabled(true);//弹性
        this.setDirection(ccui.ScrollView.DIR_VERTICAL);//DIR_VERTICAL

        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color(200,200,200));
        this.setBackGroundColorOpacity(255 *0.8);
    },

    sendMessage:function(text){
        /**
         * 常量
         * */
        let fontSize = 14;//字符font大小
        let chatWidth = 14;//单个字符宽度
        let chatHeight = 17;//行高

        // 清空面板
        this.removeAllChildren();

        //包装前缀
        var str = ">" + text;

        //加入目标
        this.textList.push(str);//加入记录
        //如果大于100
        if(this.textList.length > 50){
            this.textList.shift();//顶部删除
        }


        var singleRowMaxCount = parseInt(this.width/chatWidth);//计算当前最大单行字符数
        var fontList = []//空的UIlist


        // ui 计算
        for( var y = this.innerHeight , i = 0 ,len = this.textList.length ; i < len; i++ ){
            var text = this.textList[i];
            var rowCount = parseInt(text.length/singleRowMaxCount);//需要显示这条text的行数-用于计算height

            //换行符判断
            for(var j = 0,strlen = text.length ; j < strlen ; j++){
                var chart = text[j];
                if(chart == "\n"){
                    rowCount++;
                }
            }

            //UI 计算
            var rect = cc.rect(0,y,this.width,chatHeight*(rowCount+1));
            fontList.push(rect);
            y -= chatHeight * (rowCount + 1);

            //超出屏幕的增加滑动height
            //<存在疑惑>
            //???为什么不会多加呢，还是已经多加了。看起来刚好而已
            if(y < 0){
                this.innerHeight += (-y);
            }
        }

        //label 放置
        for (var i = 0,len = this.textList.length ;i <len ;i++){
            var text = this.textList[i];
            var rect = fontList[i];

            var label = new ccui.Text(text,"AmericanTypewriter",fontSize);
            this.addChild(label);
            label.ignoreContentAdaptWithSize(false);
            label.setAnchorPoint(0,1);

            label.x = rect.x;
            label.y = rect.y;
            label.width = rect.width;
            label.height = rect.height;
        }

        // this.jumpToBottom();
        this.scrollToBottom(0.1,false);
    },

    //开启消息接收
    openMessageReceive:function(){
        this.registerEvent();
    },

    //注册事件
    registerEvent:function(){
        var listenerSing = cc.EventListener.create({
            event       :   cc.EventListener.CUSTOM,
            target      :   this,
            eventName   :   MESSAGE_RECEIVE_EVENT,
            callback    : function(event){
                var target = event.getCurrentTarget();
                var data =  event.getUserData();
                target.addGMMessage(data.text);
            }
        });
        cc.eventManager.addListener(listenerSing,this);
    },
});
