


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


        this.setVisible(false);
        this.setOpacity(0);
        this.setTouchEnabled(false);//开启触摸事件
        this.setPropagateTouchEvents(false);//

        return true;
    },



    loadButton:function(){
        var button = new ccui.Button(res.GameIcon);
        button.setTouchEnabled(true);
        button.setAnchorPoint(0,0);
        button.setPosition(this.width,0);
        button.setVisible(false);
        button.setOpacity(0);
        button.addTouchEventListener(this.onButtonTouchEvent,this);
        this.addChild(button);
        this.downArrowBtn = button;
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
            this.parent.contentOver();
            //
        }
    },



    showText:function (text) {

        if( this.downArrowBtn == null){
            this.loadButton();
        }

        this.setVisible(true);
        this.setOpacity(0);
        this.setString(text);

        //
        var fadeIn = cc.fadeIn(1);
        this.runAction(fadeIn);

        //
        var time = cc.delayTime(0.8);
        this.downArrowBtn.setVisible(true);
        this.downArrowBtn.setOpacity(0);
        this.downArrowBtn.setPosition(this.width,0);//重新设置位置
        var fadeOutBtn = cc.fadeIn(1);
        this.downArrowBtn.runAction(cc.sequence(time,fadeOutBtn));
    },


    setContentList:function (array) {
        cc.log(this.dialogueContent);
        this.dialogueContent = array;
        // this.showText(this.dialogueContent[this.currentDialogIndex]);
    },


    setContentListAndShowTops:function (array) {
        cc.log(this.dialogueContent);
        this.dialogueContent = array;
        if(this.dialogueContent.length >= 1){
            // this.showText(this.dialogueContent[0]);
            this.showText("xzc");
        }else{
            this.showText("...");
        }
    },






});