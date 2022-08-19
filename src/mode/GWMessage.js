



/**
 *
 *  专用文字提示条类
 *      单条消息延迟显示
 *
 * */




var GWMessage = ccui.Text.extend({

    currentDialogIndex  :   0,  //对话指针索引
    dialogueContent     :   [], //对话内容队列    格式：{text:text,callback:callback,target:target}
    isShowing           :   false,

    ctor: function (textContent){

        this.currentDialogIndex = 0;
        this.dialogueContent = [];
        // this.isAutomaticNext = false;
        this.isShowing = false;

        var text = textContent | "";
        this._super(text,"AmericanTypewriter",30);

        this.setOpacity(0); //默认透明
        this.setPropagateTouchEvents(false);//

        this.setTouchEnabled(false);//开启触摸事件
        // this.addTouchEventListener(this.onTouchEvent,this);
        return true;
    },

    //展示 text 展示文字，bool延迟几秒后next
    addShowText:function (text,callback,target) {
        this.dialogueContent.push({text:text,callback:callback,target:target});
        if(!this.isShowing){  // 当前未显示文字 -说明停滞状态 -启动
            this.currentDialogIndex = 0;
            this.showText();
        }
    },

    //展示文字
    showText:function () {
        this.isShowing = true;
        var text        = this.dialogueContent[this.currentDialogIndex].text;
        var callback    = this.dialogueContent[this.currentDialogIndex].callback;
        var target      = this.dialogueContent[this.currentDialogIndex].target;
        //text默认隐藏
        this.setOpacity(0);
        this.setString(text);

        let fadeIn  = cc.fadeIn(1);    //text淡入
        let time    = cc.delayTime(0.5);    //延迟出现              < *延迟淡出时间* >
        let fadeOut = cc.fadeOut(1);        //淡出

        //执行序列
        var seqaction = cc.sequence(
            fadeIn,
            time,
            fadeOut,
            cc.callFunc(function(){
                if(callback !== undefined && target !== undefined){
                    callback.call(target);
                }
                if(this.currentDialogIndex < this.dialogueContent.length -1 ){// 索引小于长度-说明还有需要显示的text
                    this.currentDialogIndex++;  //索引自增
                    this.showText();            //显示条目
                }else{// 索引大于等于长度-说明显示完毕
                    this.dialogueContent = [];
                    this.currentDialogIndex = 0;
                    this.isShowing = false;
                }
            },this));
        this.runAction(seqaction)//
    },
});