/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/




/**
 *
 *  引导入口
 *
 * */



var LoginLayer = cc.Layer.extend({


    beginParticle   :   null,   //背景光效
    mainMenu        :   null,


    ctor:function () {

        this.beginParticle = null;
        this.mainMenu = null;

        this._super();
        this.loadUI();
        this.loginBmob();//用户登录bmob
        return true;
    },

    loadUI:function () {
        this.removeAllChildren();
        //粒子
        var particle = new cc.ParticleSystem(res.particle_move_piantou);
        this.addChild(particle);
        particle.setPosition(   this.width/2,
                                        this.height/4 * 3);
        this.beginParticle = particle;
        //button A
        var beginGame = new cc.LabelTTF("教程入口","Arial",36);
        var beginGameItem = new cc.MenuItemLabel(beginGame,this.beginAction,this);
        beginGameItem.setPosition(0,0);

        var delay = cc.delayTime(5);
        var anminB = cc.rotateTo(0.1,-5,-5);
        var anminC = cc.rotateTo(0.1,5,5);
        var anminD = cc.rotateTo(0.1,0,0);

        var sequence = cc.sequence(delay,anminB,anminC,anminD);
        beginGame.runAction(sequence.repeatForever());
        //button B
        var exit = new cc.LabelTTF("主游戏","Arial",36);
        var exitItem = new cc.MenuItemLabel(exit,this.exitAction,this);
        exitItem.setPosition(beginGameItem.x,beginGameItem.y - 80);
        //button C
        var next = new cc.LabelTTF("测试入口","Arial",36);
        var nextItem = new cc.MenuItemLabel(next,this.nextAction,this);
        nextItem.setPosition(exitItem.x,exitItem.y - 80);
        //Menu
        var menu = new cc.Menu(beginGameItem,exitItem,nextItem)
        this.mainMenu = menu;
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

    exitAction:function(){
        cc.log("touch exitAction");
        if ( this.CheckDatabase){
            cc.director.pushScene(new GameScene());
        }else{
            cc.log("CheckDatabase error");
        }
    },

    nextAction:function () {
        cc.log("touch nextAction");
        if ( this.CheckDatabase){
            cc.director.pushScene(new NetWorkScene());
        }else{
            cc.log("CheckDatabase error");
        }
    },
    //数据库检查
    CheckDatabase:function(){
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

