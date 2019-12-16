
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
        var king = GWPiece.initPiece(ChessTypeEnemu.CRYSTAL);
        king.campType = CampEnemu.BLACK;
        king.setMapPos(4,0);//可以由配置获得
        this.joinPieceInCheckerboard(king,ChessAnimeEnemu.FADEIN);

        //地方
        var dKing = GWPiece.initPiece(ChessTypeEnemu.BLACK_CRYSTAL);
        dKing.campType = CampEnemu.WHITE;
        dKing.setMapPos(4,8);//可以由配置获得
        this.joinPieceInCheckerboard(dKing,ChessAnimeEnemu.FADEIN);
    },


    //发起召唤
    eventTouchSummonChessStartAction:function(data){
        if(this.delegate != null  && this.delegate !== undefined){
            return this.delegate.eventTouchSummonChessStartAction(data);
        }
        return false;
    },



});
