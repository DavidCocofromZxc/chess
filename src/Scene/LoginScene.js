


/**
 *
 *  引导入口
 *
 * */



var LoginLayer = cc.Layer.extend({


    beginParticle   :   null,   //背景光效
    // mainMenu        :   null,

    ctor:function () {

        this.beginParticle = null;
        // this.mainMenu = null;

        this._super();
        this.loadUI();
        this.loginBmob();//用户登录bmob
        return true;
    },

    loadUI:function () {
        this.removeAllChildren();
        //背景
        //粒子
        var particle = new cc.ParticleSystem(res.particle_move_piantou);
        this.addChild(particle);
        particle.setPosition(   this.width/2,
                                        this.height/4 * 3);
        this.beginParticle = particle;

        //button
        var beginGame = new cc.LabelTTF("教程入口","Arial",36);
        var beginGameItem = new cc.MenuItemLabel(beginGame,this.beginAction,this);
        beginGameItem.setPosition(0,0);
        var delay = cc.delayTime(5);
        var anminB = cc.rotateTo(0.1,-5,-5);
        var anminC = cc.rotateTo(0.1,5,5);
        var anminD = cc.rotateTo(0.1,0,0);
        var sequence = cc.sequence(delay,anminB,anminC,anminD);
        beginGame.runAction(sequence.repeatForever());

        cc.fadeIn()

        //button
        var aiGame = new cc.LabelTTF("AI游戏","Arial",36);
        var aiGameItem = new cc.MenuItemLabel(aiGame,this.aiGameAction,this);
        aiGameItem.setPosition(beginGameItem.x,beginGameItem.y - 80);

        //button
        var netGame = new cc.LabelTTF("匹配游戏","Arial",36);
        var netGameItem = new cc.MenuItemLabel(netGame,this.netGameAction,this);
        netGameItem.setPosition(aiGameItem.x,aiGameItem.y - 80);

        //button
        var next = new cc.LabelTTF("测试入口","Arial",36);
        var nextItem = new cc.MenuItemLabel(next,this.nextAction,this);
        nextItem.setPosition(netGameItem.x,netGameItem.y - 80);

        //Menu
        var menu = new cc.Menu(beginGameItem,aiGameItem,netGameItem,nextItem);
        // this.mainMenu = menu;
        this.addChild(menu);

        menu.setOpacity(0);
        var fadeIn = cc.fadeIn(5);
        menu.runAction(fadeIn);
    },

    loginBmob:function(){
        Bmob.initialize("ef0729f131d45699c3173d3fa16fe307", "05d0be62242c7a63ddcb2566253eaefd");
        Bmob.User.login('admin','12345').then(res => {
            console.log(res)
            // XCData.getInstance();//初始化
            XCDATA();
        }).catch(err => {
            console.log(err)
        });
    },

    beginAction:function(){
        cc.log("touch beginAction");
        if ( this.CheckDatabase){
            cc.director.pushScene(new GodScene());
        }else{
            cc.log("CheckDatabase error");
        }
    },

    aiGameAction:function(){
        cc.log("touch aiGameAction");
        if ( this.CheckDatabase()){
            cc.director.pushScene(new GameScene());
        }else{
            cc.log("CheckDatabase error");
        }
    },
    netGameAction:function(){
        cc.log("touch netGameAction");
        // cc.alert()
        alert("test");

        // if ( this.CheckDatabase()){
        //     cc.director.pushScene(new GameScene());
        // }else{
        //     cc.log("CheckDatabase error");
        // }
    },

    nextAction:function () {
        cc.log("touch nextAction");
        if (this.CheckDatabase()){
            cc.director.pushScene(new NetWorkScene());
        }else{
            cc.log("CheckDatabase error");
        }
    },
    //数据库检查
    CheckDatabase:function(){
        if(XCDATA.instance.MONSTER_DATATABLE === undefined || XCDATA.instance.MONSTER_UITABLE === undefined){
            return false
        }


        if(  XCDATA.instance.MONSTER_DATATABLE.length > 0 & XCDATA.instance.MONSTER_UITABLE.length > 0){
            return true;
        }else{
            return false;
        }
    },

    //
    onExit:function(){
        this._super();
        console.log("LoginScene onExit:");
        this.removeAllChildren()
    },


});



var LoginScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }

});

