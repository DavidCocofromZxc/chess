


/**
 *
 *  棋子类 ->建筑物棋子类
 *
 * */



var GWBuilding = GWPiece.extend({

    ctor: function (fileName,rect,rotated) {
        this._super(fileName,rect,rotated);
        this.pieceType = PieceTypeEnemu.BUILDING;
        return true;
    },

});