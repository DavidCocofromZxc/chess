/**
 *
 *  棋子类 ->建筑物棋子类
 *
 * */

var UIPieceBuilding = UIBasePiece.extend({

    ctor: function (model,fileName,rect,rotated) {
        this._super(model,fileName,rect,rotated);
        this.pieceType = PieceTypeEnemu.BUILDING;
        return true;
    },

});
