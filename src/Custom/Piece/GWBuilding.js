


/**
 *
 *  棋子类 ->建筑物棋子类
 *
 * */



var GWBuilding = GWPiece.extend({

    ctor: function (model,fileName,rect,rotated) {
        this._super(model,fileName,rect,rotated);
        this.pieceType = PieceTypeEnemu.BUILDING;
        return true;
    },

});
