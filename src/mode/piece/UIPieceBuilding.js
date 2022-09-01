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
    //召唤动画
    summonAnimation:function(point,duration){
        let anim = this._super(point,duration);
        return anim;
    },
    //移动动画
    moveAnimation:function(point,duration){
        let anim = this._super(point,duration);
        return anim;
    },

});
