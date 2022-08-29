


/**
 *
 *  专用手牌类-单卡
 *
 * */


var UIHandCard = cc.Sprite.extend({
    ctor: function(resuUrl,isBack) {
        var show = isBack || false;
        //true则使用默认背面
        var url = show?res.cardHandBack:resuUrl
        this._super(url);
        this.setAnchorPoint(0,1);
        return true;
    },
    //
    addCard:function () {

    },
});
