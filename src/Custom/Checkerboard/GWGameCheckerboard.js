
/**
 *
 *  主游戏专用 游戏棋盘
 *
 * */



var GWGameCheckerboard = GWCheckerboard.extend({

    delegate            :null,

    ctor: function (){
        this._super();
        return true;
    },


    /**
     * Custom 重写虚函数
     * */
    //发起召唤
    eventTouchSummonChessStartAction:function(data){
        if(this.delegate != null  && this.delegate !== undefined){
            return this.delegate.eventTouchSummonChessStartAction(data);
        }
        return false;
    },
    //触摸事件 - 召唤棋子结束回调
    eventTouchSummonChessEndAction:function(state,data){

        if(this.delegate != null  && this.delegate !== undefined){
            this.delegate.eventTouchSummonChessEndAction(state,data);
        }else{
            switch (state) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
                default:
                    break;
            }
        }
    },


    //触摸事件 - 棋子移动开始回调
    eventTouchMoveChessStartAction:function(state){
        if(this.delegate != null  && this.delegate !== undefined){
            this.delegate.eventTouchMoveChessStartAction(state);
        }
    },
    //触摸事件 - 棋子移动结束回调
    eventTouchMoveChessEndAction:function(state){
        // switch (state) {
        //     case 0:
        //         break;
        //     case 1:
        //         break;
        //     case 2:
        //         var chess = obj;
        //
        //         if(chess.chessType == ChessTypeEnemu.SNOW){
        //             var event = new cc.EventCustom(TEXT_CALLBACK_EVENT);
        //             var data = {
        //                 isOver  :   false,
        //                 key     :   "小雪召唤成功",
        //             };
        //             event.setUserData(data);
        //             cc.eventManager.dispatchEvent(event);//
        //         }
        //
        //         break;
        //     default:
        //         break;
        // }
    },
    //触摸事件 - 点击空白回调
    eventTouchBlankAction:function(){

    },


    //触摸事件 - 选中棋子
    eventTouchChessAction:function(state,obj){
        switch (state) {
            case 0:

                // var event = new cc.EventCustom(SHOW_CARD_EVENT);
                // var data = {
                //     Card:obj.showCard(),
                // };
                // event.setUserData(data);
                // cc.eventManager.dispatchEvent(event);//


                break;
            case 1://
                var chess = obj;

                if(chess.chessType == ChessTypeEnemu.SNOW){
                    // var event = new cc.EventCustom(TEXT_CALLBACK_EVENT);
                    // var data = {
                    //     isOver  :   false,
                    //     key     :   "选中小雪请移动",
                    // };
                    // event.setUserData(data);
                    // cc.eventManager.dispatchEvent(event);//

                    // var event2 = new cc.EventCustom(MESSAGE_RECEIVE_EVENT);
                    // var data2 = {
                    //     text     :   "选中小雪请移动",
                    // };
                    // event.setUserData(data2);
                    // cc.eventManager.dispatchEvent(event2);//
                }



                // var event = new cc.EventCustom(SHOW_CARD_EVENT);
                // var data = {
                //     Card:obj.showCard(),
                // };
                // event.setUserData(data);
                // cc.eventManager.dispatchEvent(event);//

                break;
            default:
                break;
        }
    },
    //触摸事件 - 手牌中选中棋子
    eventTouchPickUpChessInHandAction:function (chess) {

        if(chess.chessType == ChessTypeEnemu.SNOW){
            // cc.log("选中了小雪");
            // // //事件 & 数据
            // var event = new cc.EventCustom(TEXT_CALLBACK_EVENT);
            // var data = {
            //     isOver  :   false,
            //     key     :   "选中了小雪",
            // };
            // event.setUserData(data);
            // cc.eventManager.dispatchEvent(event);//
        }
    },


});