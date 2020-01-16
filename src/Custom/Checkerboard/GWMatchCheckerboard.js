
var GWMatchCheckerboard = GWCheckerboard.extend({
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
        //我方
        let king = GWPiece.initPiece(ChessTypeEnemu.CRYSTAL);
        king.campType = CampEnemu.BLACK;
        //模拟移动结果//由配置决定
        let selfResult = {isInMap:true,cel:4,row:0,x:200,y:0};
        this.operatePieceInCheckerboard("join",king,ChessAnimeEnemu.FADEIN,selfResult);//joinPieceInCheckerboard
        //敌方
        let dKing = GWPiece.initPiece(ChessTypeEnemu.BLACK_CRYSTAL);
        dKing.campType = CampEnemu.WHITE;
        //模拟移动结果//由配置决定
        let otherResult = {isInMap:true,cel:4,row:8,x:200,y:400};//由配置决定
        this.operatePieceInCheckerboard("join",dKing,ChessAnimeEnemu.FADEIN,otherResult);
    },
    //发起召唤
    eventTouchSummonChessStartAction:function(data){
        if(this.delegate != null  && this.delegate !== undefined){
            return this.delegate.eventTouchSummonChessStartAction(data);
        }
        return false;
    },
});
