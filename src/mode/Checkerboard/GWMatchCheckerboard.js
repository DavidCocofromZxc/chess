
var GWMatchCheckerboard = GWBaseCheckerboard.extend({
    //可以不用，但是有这两个数组更方便
    arrayFriendsSurvivalChess   : [],   //black Array
    arrayEnemySurvivalChess     : [],   //white Array
    ctor: function (){
        this._super();
        return true;
    },
    //  <*独立方法*>
    // 初始化棋盘 -水晶/国王
    initGameCrystal:function () {
        //模拟移动结果//由配置决定
        let selfResult = {isInMap:true,cel:4,row:0,x:200,y:0};
        let otherResult = {isInMap:true,cel:4,row:8,x:200,y:400};//由配置决定
        //我方
        let king = GWBasePiece.initPiece(ChessTypeEnemu.CRYSTAL);
        king.campType = CampEnemu.BLACK;
        this.operatePieceInCheckerboard("summon",king,ChessAnimeEnemu.FADEIN,selfResult);
        //敌方
        let dKing = GWBasePiece.initPiece(ChessTypeEnemu.BLACK_CRYSTAL);
        dKing.campType = CampEnemu.WHITE;
        this.operatePieceInCheckerboard("summon",dKing,ChessAnimeEnemu.FADEIN,otherResult);
    },
    /**
     * 回调 继承
     * */
    //发起召唤
    eventTouchSummonChessStartAction:function(data){
        if(this.delegate != null  && this.delegate !== undefined){
            return this.delegate.eventTouchSummonChessStartAction(data);
        }
        return false;
    },
    //触摸事件 - 选中棋子
    eventTouchChessAction:function(state,obj){
        if(this.delegate == null || this.delegate === undefined){
            return ;
        }
        switch (state) {
            case -1:
                return this.delegate.eventTouchChessAction(-1);
                break;
            // case  PieceTypeEnemu.BASE:
            //     return this.delegate.eventTouchChessAction(state,obj);
            //     break;
            // case  PieceTypeEnemu.BUILDING:
            //     return this.delegate.eventTouchChessAction(state,obj);
            //     break;
            // case  PieceTypeEnemu.MONSTER:
            //     return this.delegate.eventTouchChessAction(state,obj);
            //     break;
            default:
                return this.delegate.eventTouchChessAction(state,obj);
                break;
        }
    },
});
