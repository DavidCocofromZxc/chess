


/*
* 专用棋子类
* */

/**
 *
 *  卡牌基础类
 *
 * */



var GWCard = cc.Sprite.extend({

    fyLabel         : null,
    nameLabel       : null,
    dscLabel        : null,
    attackLabel     : null,
    lifeLabel       : null,

    ctor: function () {


        this.fyLabel        = null;
        this.nameLabel      = null;
        this.dscLabel       = null;
        this.attackLabel    = null;
        this.lifeLabel      = null;


        this._super();
        this.test();
        return;
    },


    test:function(){

        /**
         *
         * 220, 308
         *      ||
         * 200, 19
         * 200, 185
         * 200, 105
         *
         * */


        //<* 适配 *>
        // 模拟展开点
        var targetPoint = cc.vertex2(cc.winSize.width/2,cc.winSize.height/2);

        let cardWidth           = 220;  //卡宽度
        let cardHeight          = 300;  //卡高度
        let cardHeadHeight      = 27;   //卡顶部高度
        let cardBodyHeight      = 165;  //卡主体高度
        let cardWaistHeight     = 15;   //卡腰高度
        let cardBottomHeight    = 93;   //卡底部高度 ok

        let leftSpacing         = 20;   //左侧间距
        let bottomSpacing       = 25;   //底部间距



        //
        // var head = new ccui.Layout();
        // this.addChild(head,1000);
        // head.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // head.setBackGroundColor(cc.color(100,100,100,100));
        // head.setPosition(0,cardBodyHeight + cardBottomHeight);
        // head.setContentSize(cardWidth,cardHeadHeight);


        // var body = new ccui.Layout();
        // this.addChild(body,1000);
        // body.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // body.setBackGroundColor(cc.color(100,100,100,250));
        // body.setPosition(0,cardBodyHeight + cardBottomHeight);
        // body.setContentSize(cardWidth,cardHeadHeight);




        var artPoint    = cc.vertex2(cardWidth/2,cardBottomHeight +cardBodyHeight/2);      //原画点
        var fyPoint     = cc.vertex2(  leftSpacing,cardBottomHeight + cardWaistHeight + cardBodyHeight + 10);       //费用点
        var namePoint   = cc.vertex2(leftSpacing +45,cardBottomHeight + cardWaistHeight + cardBodyHeight + 10);  //name
        var gjPoint     = cc.vertex2(leftSpacing,bottomSpacing);                //攻击点
        var smPoint     = cc.vertex2(leftSpacing +180 ,bottomSpacing);     //生命点
        var dscPoint    = cc.vertex2(leftSpacing,cardBottomHeight -30);     //描述  //？30




        //
        // var head = new ccui.Layout();
        // this.addChild(head,1000);
        // head.setLayoutType(ccui.Layout.LINEAR_HORIZONTAL);
        // head.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // head.setBackGroundColor(cc.color(100,100,100));
        // head.setBackGroundColorOpacity(255*0.5);
        // head.setPosition(0,cardBottomHeight + cardWaistHeight + cardBodyHeight);
        // head.setContentSize(cardWidth,cardHeadHeight);
        //
        //
        // //费用
        // var fyLbl = new ccui.Text("4","Arial",20);
        // fyLbl.setPosition(0,0);
        // fyLbl.setAnchorPoint(0,0);
        // head.addChild(fyLbl,101);
        //
        // //名称
        // var name = new ccui.Text("沉默の武者","Arial",7);
        // // name.setPosition(namePoint.x,namePoint.y);
        // name.setAnchorPoint(0,0);
        // head.addChild(name,101);





        // var body = new ccui.Layout();
        // this.addChild(body,1000);
        // body.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // body.setBackGroundColor(cc.color(100,100,100));
        // body.setBackGroundColorOpacity(255*0.5);
        // body.setPosition(0,cardBottomHeight + cardWaistHeight);
        // body.setContentSize(cardWidth,cardBodyHeight);


        // var waist = new ccui.Layout();
        // this.addChild(waist,1000);
        // waist.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // waist.setBackGroundColor(cc.color(100,100,100));
        // waist.setBackGroundColorOpacity(255*0.5);
        // waist.setPosition(0,cardBottomHeight);
        // waist.setContentSize(cardWidth,cardWaistHeight);
        //
        //
        // //
        // var bottom = new ccui.Layout();
        // this.addChild(bottom,1000);
        // bottom.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // bottom.setBackGroundColor(cc.color(100,100,100));
        // bottom.setBackGroundColorOpacity(255*0.5);
        // bottom.setPosition(0,0);
        // bottom.setContentSize(cardWidth,cardBottomHeight);




        //<* 图构 *>
        var kaA = new cc.Sprite(res.kakuang);
        kaA.setPosition(0,0);
        kaA.setAnchorPoint(0,0);
        var kaB = new cc.Sprite(res.katiao);
        kaB.setPosition(0,0);
        kaB.setAnchorPoint(0,0);
        var kaC = new cc.Sprite(res.kaditiao);
        kaC.setPosition(0,0);
        kaC.setAnchorPoint(0,0);
        var kaD = new cc.Sprite(res.kadi);
        kaD.setPosition(0,0);
        kaD.setAnchorPoint(0,0);


        //原画
        var gw = new cc.Sprite(res.guaiwu0001);
        gw.setPosition(artPoint.x,artPoint.y);
        gw.setAnchorPoint(0.5,0.5);



        //费用
        var fyLbl = new cc.LabelTTF("4","Arial",20);
        fyLbl.setPosition(fyPoint.x,fyPoint.y);
        this.addChild(fyLbl,101);
        this.fyLabel = fyLbl;


        //攻击力
        var gjLbl = new cc.LabelTTF("4","Arial",20);
        gjLbl.setFontFillColor(0,0,0,255);
        gjLbl.setPosition(gjPoint.x,gjPoint.y);
        this.addChild(gjLbl,101);
        this.attackLabel    = gjLbl;

        //生命力
        var smLbl = new cc.LabelTTF("8","Arial",20);
        smLbl.setFontFillColor(0,0,0,255);
        smLbl.setPosition(smPoint.x,gjPoint.y);
        this.addChild(smLbl,101);
        this.lifeLabel = smLbl;



        //
        //名称
        var name = new cc.LabelTTF("沉默の武者","Arial",7);
        name.setPosition(namePoint.x,namePoint.y);
        this.addChild(name,101);
        this.nameLabel = name;

        var text = "沉默寡言的武者，对贸然来犯对的敌人给予猛烈的反击"
        var sizeStr = XCReturnStringWidth(text,"Arial",2,180);

        //描述
        var dsc = new cc.LabelTTF(sizeStr.str,"Arial",2);
        dsc.setFontFillColor(0,0,0,255);
        dsc.setAnchorPoint(0,0);
        dsc.setPosition(dscPoint.x,dscPoint.y - sizeStr.h);
        this.addChild(dsc,101);
        this.dscLabel = dsc;


        this.addChild(kaA,100);
        this.addChild(kaB,90);
        this.addChild(kaC,80);
        this.addChild(gw,75);
        this.addChild(kaD,70);
    },


    remove:function () {

        this.fyLabel.removeFromParent();
        this.nameLabel.removeFromParent();
        this.dscLabel.removeFromParent();
        this.attackLabel.removeFromParent();
        this.lifeLabel.removeFromParent();
    },


});

