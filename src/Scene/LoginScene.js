


/**
 *
 *  引导入口
 *
 * */

var LoginLayer = cc.Layer.extend({
    _beginParticle   :      null,   //背景光效
    _titleNameList   :      [],
    ctor:function () {
        //data init
        this._beginParticle = null;
        this._titleNameList = ["教程入口","AI游戏","匹配游戏","测试入口"];
        this._super();

        this.dbLoad();//用户登录bmob
        // this.loadUI();
        return true;
    },

    dbLoad:function(){
        var self = this;
        JSDataTool.init();
        self.loadUI();
        // Bmob.initialize("ef0729f131d45699c3173d3fa16fe307", "05d0be62242c7a63ddcb2566253eaefd");
        // Bmob.User.login('admin','12345').then(res => {
            // console.log("bmob 登录成功",res);
            // XCDATA();
            // self.loadUI();
        // }).catch(err => {
        //     console.log("bmob 加载失败",err);
        // });
    },

    loadUI:function () {
        this.removeAllChildren();
        //背景
        //粒子
        var particle = new cc.ParticleSystem(res.piantouAnim);
        this.addChild(particle);
        particle.setPosition(   this.width/2,
                                        this.height/4 * 3);
        this._beginParticle = particle;
        //button
        var btn0 = new cc.LabelTTF(this._titleNameList[0],"Arial",36);
        var btn1 = new cc.LabelTTF(this._titleNameList[1],"Arial",36);
        var btn2 = new cc.LabelTTF(this._titleNameList[2],"Arial",36);
        var btn3 = new cc.LabelTTF(this._titleNameList[3],"Arial",36);
        //菜单项
        var item0 = new cc.MenuItemLabel(btn0,this.btn0Action,this);
        item0.setPosition(0,0);
        var item1 = new cc.MenuItemLabel(btn1,this.btn1Action,this);
        item1.setPosition(item0.x,item0.y - 80);
        var item2 = new cc.MenuItemLabel(btn2,this.btn2Action,this);
        item2.setPosition(item1.x,item1.y - 80);
        var item3 = new cc.MenuItemLabel(btn3,this.btn3Action,this);
        item3.setPosition(item2.x,item2.y - 80);
        //Menu
        var menu = new cc.Menu(item0,item1,item2,item3);
        this.addChild(menu);
        //动画：抖动
        var delay = cc.delayTime(5);
        var anminB = cc.rotateTo(0.1,-5,-5);
        var anminC = cc.rotateTo(0.1,5,5);
        var anminD = cc.rotateTo(0.1,0,0);
        var sequence = cc.sequence(delay,anminB,anminC,anminD);
        btn1.runAction(sequence.repeatForever());
        //动画：渐出
        menu.setOpacity(0);
        var fadeIn = cc.fadeIn(5);
        menu.runAction(fadeIn);
    },

    //Actions
    btn0Action:function(){
        cc.log("touch beginAction");
        if ( this.CheckDatabase){
            cc.director.pushScene(new GodScene());
        }else{
            cc.log("CheckDatabase error");
        }
    },
    btn1Action:function(){
        cc.log("touch aiGameAction");
        if ( this.CheckDatabase()){
            cc.director.pushScene(new GameScene());
        }else{
            cc.log("CheckDatabase error");
        }
    },
    btn2Action:function(){
        cc.log("touch netGameAction");
        // cc.alert()
        // alert("test");

        // if ( this.CheckDatabase()){
        //     cc.director.pushScene(new GameScene());
        // }else{
        //     cc.log("CheckDatabase error");
        // }
    },
    btn3Action:function () {
        cc.log("touch nextAction");
        if (this.CheckDatabase()){
            cc.director.pushScene(new TestWorkScene());
        }else{
            cc.log("CheckDatabase error");
        }
    },
    //数据库检查
    CheckDatabase:function(){
        // if(XCDATA.instance.MONSTER_DATATABLE === undefined || XCDATA.instance.MONSTER_UITABLE === undefined){
        //     return false
        // }
        // if(  XCDATA.instance.MONSTER_DATATABLE.length >= 0 & XCDATA.instance.MONSTER_UITABLE.length >= 0){
            return true;
        // }else{
        //     return false;
        // }
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

