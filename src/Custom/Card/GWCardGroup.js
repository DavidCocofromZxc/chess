



var GWCardGroup = cc.Sprite.extend({

    cardCount         : 0,
    mainLabel         : null,

    ctor: function() {
        this.cardCount = 0;
        this.mainLabel = null;

        this._super(res.cardGroup);
        this.loadLabel();
        this.setAnchorPoint(0,0);
        this.setData();
        return true;
    },
    loadLabel:function () {
        var str = "" + this.cardCount;//
        var lbl = new ccui.Text(str,"AmericanTypewriter","18");
        this.addChild(lbl);
        lbl.setAnchorPoint(0.5,0.5);
        lbl.setPosition(this.width/2,this.height/2);
        this.mainLabel = lbl;
    },

    //模拟数据注入
    setData:function (core) {
        //模拟数据
        this.cardCount = 50;
        this.mainLabel.string = "" + this.cardCount ;
    },
});
