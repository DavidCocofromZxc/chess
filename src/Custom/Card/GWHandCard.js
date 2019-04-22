


/**
 *
 *  专用手牌类-单牌
 *
 * */


// var GWHandCard = ccui.ImageView.extend({
var GWHandCard = cc.Sprite.extend({

    ctor: function() {
        this._super(res.cardHand);
        this.setAnchorPoint(0,1);


        return true;
    },


    //
    addCard:function () {

    },
});
