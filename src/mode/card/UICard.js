

/**
 *
 *  卡牌基础 -< 开展态 >
 *  卡牌 浏览器
 * */

var UICard = cc.Sprite.extend({
    //组件
    fyLabel         : null,
    nameLabel       : null,
    dscLabel        : null,
    attackLabel     : null,
    lifeLabel       : null,
    originalPainting: null,
    //icon
    fyIcon          : null,//
    //font
    attributeFontSize   : 0,   //基本属性字符font
    nameFontSize        : 0,    //名称字符font
    desFontSize         : 0,    //描述font
    //data
    fyText          : "0",
    gjText          : "0",
    smText          : "0",
    desText         : "...",
    nameText        : "???",
    fontName        : "Arial",

    ctor: function () {
        //初始化
        this.fyLabel          = null;
        this.nameLabel        = null;
        this.dscLabel         = null;
        this.attackLabel      = null;
        this.lifeLabel        = null;
        this.originalPainting = null;
        //
        this.fyIcon           = null;
        //初始化字体大小
        this.attributeFontSize  = 20;
        this.nameFontSize       = 14;
        this.desFontSize        = 10;
        //native下 修改字体大小
        if(cc.sys.isNative){
            this.attributeFontSize   = 25;
            this.nameFontSize        = 15;
            this.desFontSize         = 15;
        }
        //data defult
        this.fyText         = "0";
        this.gjText         = "0";
        this.smText         = "0";
        this.desText        = "...";
        this.nameText       = "???";
        this.fontName       = "Arial";
        //构建
        this._super(res.kadi);  //默认需要有一个构建，否则各种在外部width/size获取不到
        this.initCardUI();
        return;
    },
    //
    initCardUI:function(){
        /**
         *
         * 220, 308
         *      ||
         * 200, 19
         * 200, 185
         * 200, 105
         *
         * */

        // <* 适配 *>
        // 建议UI适配修改这里
        // 模拟展开点
        var targetPoint = cc.p(cc.winSize.width/2,cc.winSize.height/2);

        let cardWidth           = 220;  //卡宽度
        let cardHeight          = 300;  //卡高度

        let cardHeadHeight      = 27;   //卡顶部高度
        let cardBodyHeight      = 165;  //卡主体高度
        let cardWaistHeight     = 15;   //卡腰高度
        let cardBottomHeight    = 93;   //卡底部高度 ok

        let leftSpacing         = 20;   //左侧间距
        let bottomSpacing       = 25;   //底部间距
        //<* 适配 计算点 *>
        //原画点：卡宽/2
        var artPoint    = cc.p(cardWidth/2,cardBottomHeight +cardWaistHeight +cardBodyHeight/2);    //ancher(0.5,0.5)
        var fyPoint     = cc.p(leftSpacing,cardBottomHeight + cardWaistHeight + cardBodyHeight + 10);       //费用点
        var fyIconPoint = cc.p(leftSpacing -1,cardBottomHeight + cardWaistHeight + cardBodyHeight + 10 + 2);       //费用点
        var namePoint   = cc.p(leftSpacing +47,cardBottomHeight + cardWaistHeight + cardBodyHeight + 8);//ancher(0,0)
        var gjPoint     = cc.p(leftSpacing,bottomSpacing);                //攻击点
        var smPoint     = cc.p(leftSpacing +180 ,bottomSpacing);     //生命点
        var dscPoint    = cc.p(leftSpacing,cardBottomHeight -30);     //描述  //？30
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
        // var kaD = new cc.Sprite(res.kadi);
        // kaD.setPosition(0,0);
        // kaD.setAnchorPoint(0,0);
        //原画
        var gw = new cc.Sprite(res.monsterDefault);
        gw.setPosition(artPoint.x,artPoint.y);
        gw.setAnchorPoint(0.5,0.5);
        this.originalPainting = gw;
        //费用
        var fyLbl = new cc.LabelTTF(this.fyText,this.fontName ,this.attributeFontSize);
        fyLbl.setPosition(fyPoint.x,fyPoint.y);
        this.addChild(fyLbl,101);
        this.fyLabel = fyLbl;
        //费用icon
        var fyIcon = new cc.Sprite(res.kaFY);
        fyIcon.setPosition(fyIconPoint.x,fyIconPoint.y);
        fyIcon.setScale(1.5);
        this.addChild(fyIcon,100);
        this.fyIcon = fyIcon;
        //攻击力
        var gjLbl = new cc.LabelTTF(this.gjText,this.fontName ,this.attributeFontSize);
        gjLbl.setFontFillColor(cc.color(0,0,0));
        gjLbl.setPosition(gjPoint.x,gjPoint.y);
        this.addChild(gjLbl,101);
        this.attackLabel    = gjLbl;
        //生命力
        var smLbl = new cc.LabelTTF(this.smText,this.fontName ,this.attributeFontSize);
        smLbl.setFontFillColor(cc.color(0,0,0));
        smLbl.setPosition(smPoint.x,gjPoint.y);
        this.addChild(smLbl,101);
        this.lifeLabel = smLbl;
        //名称
        var name = new cc.LabelTTF(this.nameText,this.fontName ,this.nameFontSize);
        name.setPosition(namePoint.x,namePoint.y);
        this.addChild(name,101);
        this.nameLabel = name;
        var text = this.desText;
        var sizeStr = XCReturnStringWidth(text,this.fontName,this.desFontSize,180);
        //描述
        var dsc = new cc.LabelTTF(sizeStr.str,this.fontName ,this.desFontSize);
        dsc.setFontFillColor(cc.color(0,0,0));
        dsc.setAnchorPoint(0,0);
        dsc.setPosition(dscPoint.x,dscPoint.y - sizeStr.h);
        this.addChild(dsc,101);
        this.dscLabel = dsc;
        this.addChild(kaA,90);
        this.addChild(kaB,80);
        this.addChild(kaC,70);
        this.addChild(gw,65);
        // this.addChild(kaD,70);
    },
    //
    changeUiData:function(data,uiData){
        console.log("changeUiData",data);
        // let texture = cc.textureCache.addImage("res/Card/monster/gw" + data.ID +".png");
        let texture = cc.textureCache.addImage("res/Card/monster/gw1002.png");
        this.originalPainting.setTexture(texture);
        //原画
        //Card/monster/gw1001.png
        //uiData.originalPainting
        // this.originalPainting.setSpriteFrame("res/Card/monster/gw1001.png");
        // this.originalPainting.setSprite()
        //费用
        this.fyLabel.setString(data.energy);
        //攻击力
        this.attackLabel.setString(data.attack);
        //生命力
        this.lifeLabel.setString(data.health);
        //名称
        this.nameLabel.setString(data.name);
        //描述
        let leftSpacing         = 20;   //左侧间距
        let cardBottomHeight    = 93;   //卡底部高度 ok
        let dscPoint    = cc.p(leftSpacing,cardBottomHeight -30);     //描述  //？30
        let text = data.dsc;//
        let sizeStr = XCReturnStringWidth(text,this.fontName,this.desFontSize,180);
        this.dscLabel.setString(sizeStr.str);
        this.dscLabel.setPosition(dscPoint.x,dscPoint.y - sizeStr.h);
    },
    //
    remove:function () {
        this.fyLabel.removeFromParent();
        this.nameLabel.removeFromParent();
        this.dscLabel.removeFromParent();
        this.attackLabel.removeFromParent();
        this.lifeLabel.removeFromParent();
    },
});

