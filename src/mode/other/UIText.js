



/**
 *
 *  专用聊天文字条类
 *      包含列表文字功能
 *
 *
 * */



var UIText = ccui.Text.extend({


    btnDownArrow        : null,//对话旁的提示小箭头//

    currentDialogIndex  :   0,  //对话指针索引
    dialogueContent     :   [], //对话内容array

    temporaryIndex      :   0,
    temporaryContent    :   [], //临时对话框

    isAutomaticNext     :   false,


    ctor: function (textContent){

        var text = textContent | "";
        this._super(text,"AmericanTypewriter",30);


        this.setOpacity(0); //默认透明
        this.setPropagateTouchEvents(false);//

        this.setTouchEnabled(true);//开启触摸事件
        this.addTouchEventListener(this.onTouchEvent,this);



        return true;
    },



    // 进入下一句
    nextContent:function(){
        cc.log("nextContent");

        //关闭自动跳转 // 防止多余的next
        this.isAutomaticNext = false;

        this.setOpacity(0);
        this.btnDownArrow.setOpacity(0);

        this.stopAllActions();
        this.btnDownArrow.stopAllActions();


        //事件 & 数据
        var event = new cc.EventCustom(TEXT_CALLBACK_EVENT);
        var data = {
            isOver  :   false,
            key     :   "",
        };


        var text = "";


        //存在临时对话
        if(this.temporaryIndex < (this.temporaryContent.length - 1)){
            this.temporaryIndex ++;
            text = this.temporaryContent[this.temporaryIndex];
        }else{
            //无临时对话
            //当前索引要小于 数组最大索引
            //下一句
            if(this.currentDialogIndex < (this.dialogueContent.length - 1)){
                this.currentDialogIndex ++;
                text = this.dialogueContent[this.currentDialogIndex];
            }//结束了 -循环显示最后一句
            else if(this.currentDialogIndex == (this.dialogueContent.length - 1)){
                text = this.dialogueContent[this.dialogueContent.length - 1];
            }//异常
            else{
                text = "...";
            }
        }

        this.showText(text);
        data.key = text;

        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);//

    },



    //展示 text 展示文字，bool延迟几秒后next
    showText:function (text,bool) {

        if( this.btnDownArrow == null){
            this.loadButton();
        }


        //text默认隐藏
        this.setOpacity(0);
        this.setString(text);

        //button 默认隐藏
        this.btnDownArrow.setVisible(true);
        this.btnDownArrow.setOpacity(0);

        //text淡出
        let fadeIn = cc.fadeIn(1);
        this.runAction(fadeIn);

        //延迟 ，淡出
        let time = cc.delayTime(0.5);//延迟出现
        this.refreshUIFrames();
        var fadeInBtn = cc.fadeIn(1);


        //
        // this.isAutomaticNext = true;


        //执行序列
        var seqaction = cc.sequence(time,fadeInBtn,cc.callFunc(function(){
            var moveUp = cc.moveBy(0.2,cc.p(0,2));
            var moveDown = cc.moveBy(0.2,cc.p(0,-2));
            var blueSeq = cc.sequence(moveUp,moveDown).repeatForever();
            this.btnDownArrow.runAction(blueSeq);

            //开启5秒自动跳转
            //this.isAutomaticNext 防止多余的next
            if(bool != undefined && this.isAutomaticNext){
                this.scheduleOnce(function(){
                    this.nextContent();
                },bool);
            }

        },this));

        this.btnDownArrow.runAction(seqaction);

    },


    //设置临时对话
    setTemporaryContentAndShow:function(array){

        cc.log(this.temporaryContent);
        this.temporaryContent = array;
        this.temporaryIndex = 0;
        if(this.temporaryContent.length >= 1){
            this.showText(this.temporaryContent[this.temporaryIndex]);
        }else{
            this.showText("...");
        }

    },


    //设置对话队列 并且显示第一条 //bool
    setContentListAndShowTops:function (array,bool) {
        cc.log(this.dialogueContent);
        this.dialogueContent = array;
        this.currentDialogIndex = 0;
        if(this.dialogueContent.length >= 1){
            this.showText(this.dialogueContent[this.currentDialogIndex],bool);
        }else{
            this.showText("...");
        }
    },

    //
    // addTextToContentList:function(text,bool){
    //
    //     if(this.dialogueContent.length == 0){
    //         // this.dialogueContent
    //
    //         this.dialogueContent.push(text);
    //         this.showText(this.dialogueContent[this.currentDialogIndex],bool);
    //     }else{
    //
    //     }
    //
    // }

    /*
    *  button 相关
    * */

    //加载button
    loadButton:function(){
        var arrow = new ccui.Button(res.iconDownArrow);
        arrow.setTouchEnabled(true);
        arrow.setAnchorPoint(0,0);
        arrow.setVisible(false);
        //默认透明
        arrow.setOpacity(0);
        //附加点击事件
        arrow.addTouchEventListener(this.onTouchEvent,this);
        this.addChild(arrow);
        this.btnDownArrow = arrow;
    },

    refreshUIFrames:function(){
        if(this.btnDownArrow != null){
            this.btnDownArrow.setPosition(this.width + 5,5);
        }
    },



    /*
    *
    *  touch event
    *
    * */


    //附加button点击回调
    onTouchEvent :function(sender,type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.nextContent();
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
            default:
                break;
        }
    },







});