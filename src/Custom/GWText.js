


var GWText = ccui.Text.extend({

    button              :   null,
    downArrowBtn        :   null,
    dialogueContent     :   [], //对话内容
    currentDialogIndex  :   0,  //对话指针索引


    ctor: function (textContent){

        if(textContent === undefined){
            this._super("","AmericanTypewriter",30);
        }else{
            this._super(textContent,"AmericanTypewriter",30);
        }

        this.setOpacity(0);
        this.setTouchEnabled(true);//开启触摸事件
        this.setPropagateTouchEvents(false);//

        return true;
    },



    loadButton:function(){
        var button = new ccui.Button(res.downArrow_png);
        button.setTouchEnabled(true);
        button.setAnchorPoint(0,0);
        button.setVisible(false);
        button.setOpacity(0);
        button.addTouchEventListener(this.onButtonTouchEvent,this);
        this.addChild(button);
        this.downArrowBtn = button;
        this.setButtonPos();
    },

    setButtonPos:function(){
        if(this.downArrowBtn != null){
            this.downArrowBtn.setPosition(this.width + 5,5);
        }
    },


    onTouchBegan:function () {
        this.nextContent();
    },


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

    //
    nextContent:function(){
        cc.log("nextContent");

        this.setOpacity(0);
        this.downArrowBtn.setOpacity(0);


        if((this.currentDialogIndex + 1) < this.dialogueContent.length){
            this.currentDialogIndex ++;
            var text = this.dialogueContent[this.currentDialogIndex];
            this.showText(text);
        }else{
            cc.log("场景转换 over");
            this.downArrowBtn.setOpacity(0);
            this.parent.contentOver();
        }
    },


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
        //button
        this.downArrowBtn.runAction(seqaction);


    },


    setContentList:function (array) {
        cc.log(this.dialogueContent);
        this.dialogueContent = array;
        // this.showText(this.dialogueContent[this.currentDialogIndex]);
    },


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

});