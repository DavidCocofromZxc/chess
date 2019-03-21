

//专用聊天文字条类

var GWText = ccui.Text.extend({


    TEXT_CALLBACK_EVENT : "TEXT_CONTENT_OVER",//每条对话结束的回调事件名

    downArrowBtn        :   null,//对话旁的提示小箭头

    dialogueContent     :   [], //对话内容array
    currentDialogIndex  :   0,  //对话指针索引


    ctor: function (textContent){

        var text = textContent | "";
        this._super(text,"AmericanTypewriter",30);



        this.setOpacity(0); //默认透明
        this.setTouchEnabled(true);//开启触摸事件
        this.setPropagateTouchEvents(false);//

        return true;
    },


    // 进入下一句
    nextContent:function(){
        cc.log("nextContent");


        //无对话
        if(this.dialogueContent.length == 0){
            return ;
        }

        this.setOpacity(0);
        this.downArrowBtn.setOpacity(0);

        this.stopAllActions();
        this.downArrowBtn.stopAllActions();

        //事件 & 数据
        var event = new cc.EventCustom(this.TEXT_CALLBACK_EVENT);
        var data = {    index   :   this.currentDialogIndex,
            isOver  :   false
        };

        //是否为最后一句话
        if((this.currentDialogIndex + 1) < this.dialogueContent.length){
            this.currentDialogIndex ++;
            var text = this.dialogueContent[this.currentDialogIndex];
            this.showText(text);
        }else{//最后一句话时：
            this.downArrowBtn.setOpacity(0);
            this.setOpacity(0);
            data.isOver = true;
        }
        event.setUserData(data);
        cc.eventManager.dispatchEvent(event);
    },



    //展示 text
    showText:function (text) {

        if( this.downArrowBtn == null){
            this.loadButton();
        }

        //text默认隐藏
        this.setOpacity(0);
        this.setString(text);

        //button 默认隐藏
        this.downArrowBtn.setVisible(true);
        this.downArrowBtn.setOpacity(0);

        //text淡出
        let fadeIn = cc.fadeIn(1);
        this.runAction(fadeIn);

        //延迟 ，淡出
        let time = cc.delayTime(0.5);//延迟出现
        this.setButtonPos();
        var fadeInBtn = cc.fadeIn(1);


        //执行序列
        var seqaction = cc.sequence(time,fadeInBtn,cc.callFunc(function(){
            var moveUp = cc.moveBy(0.2,cc.p(0,2));
            var moveDown = cc.moveBy(0.2,cc.p(0,-2));
            var blueSeq = cc.sequence(moveUp,moveDown).repeatForever();
            this.downArrowBtn.runAction(blueSeq);
        },this));

        this.downArrowBtn.runAction(seqaction);

    },



    //设置对话队列
    setContentList:function (array) {
        cc.log(this.dialogueContent);
        this.dialogueContent = array;
        // this.showText(this.dialogueContent[this.currentDialogIndex]);
    },



    //设置对话队列 并且显示第一条
    setContentListAndShowTops:function (array) {
        cc.log(this.dialogueContent);
        this.dialogueContent = array;
        this.currentDialogIndex = 0;
        if(this.dialogueContent.length >= 1){
            this.showText(this.dialogueContent[this.currentDialogIndex]);
        }else{
            this.showText("...");
        }
    },




    onTouchBegan:function () {
        this.nextContent();
    },



    /*
    *  button 相关
    * */

    //加载button
    loadButton:function(){
        var button = new ccui.Button(res.downArrow_png);
        button.setTouchEnabled(true);
        button.setAnchorPoint(0,0);
        button.setVisible(false);
        //默认透明
        button.setOpacity(0);
        //附加点击事件
        button.addTouchEventListener(this.onButtonTouchEvent,this);
        this.addChild(button);
        this.downArrowBtn = button;
        //设置button 位置
        this.setButtonPos();
    },




    //重新设置button位置
    setButtonPos:function(){
        if(this.downArrowBtn != null){
            this.downArrowBtn.setPosition(this.width + 5,5);
        }
    },





    //附加button点击回调
    onButtonTouchEvent :function(sender,type){
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