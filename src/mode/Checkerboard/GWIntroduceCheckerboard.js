

/**
 *
 *  教程专用 介绍专用棋盘
 *
 * */


var GWIntroduceCheckerboard = GWCheckerboard.extend({


    ctor: function (){
        this._super();
        return true;
    },


    eventTouchSummonChessStartAction:function(data){
        return true;
    },


    //触摸事件 - 召唤棋子回调
    eventTouchSummonChessAction:function(state,obj){
        
        switch (state) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                var chess = obj;

                if(chess.chessType == ChessTypeEnemu.SNOW){
                    var event = new cc.EventCustom(TEXT_CALLBACK_EVENT);
                    var data = {
                        isOver  :   false,
                        key     :   "小雪召唤成功",
                    };
                    event.setUserData(data);
                    cc.eventManager.dispatchEvent(event);//
                }

                break;
            default:
                break;
        }
    },


    //触摸事件 - 移动棋子回调
    eventTouchMoveChessAction:function(state,obj){
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
                break;
            case 1:
                var chess = obj;

                if(chess.chessType == ChessTypeEnemu.SNOW){
                    var event = new cc.EventCustom(TEXT_CALLBACK_EVENT);
                    var data = {
                        isOver  :   false,
                        key     :   "选中小雪请移动",
                    };
                    event.setUserData(data);
                    cc.eventManager.dispatchEvent(event);//

                    // var event2 = new cc.EventCustom(MESSAGE_RECEIVE_EVENT);
                    // var data2 = {
                    //     text     :   "选中小雪请移动",
                    // };
                    // event.setUserData(data2);
                    // cc.eventManager.dispatchEvent(event2);//
                }

                chess.lookUpCard();

                break;
            default:
                break;
        }



    },
    //触摸事件 - 手牌中选中棋子
    eventTouchPickUpChessInHandAction:function (chess) {

        if(chess.chessType == ChessTypeEnemu.SNOW){
            cc.log("选中了小雪");
            // //事件 & 数据
            var event = new cc.EventCustom(TEXT_CALLBACK_EVENT);
            var data = {
                isOver  :   false,
                key     :   "选中了小雪",
            };
            event.setUserData(data);
            cc.eventManager.dispatchEvent(event);//
        }
    },


});