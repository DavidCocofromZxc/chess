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


var LoginLayer = cc.Layer.extend({


    beginParticle   :   null,   //背景光效
    mainMenu        :   null,

    // sprite:null,
    ctor:function () {
        this._super();
        this.loadUI();
        return true;
    },

    loadUI:function () {


        //
        var particle = new cc.ParticleSystem(res.particle_move_piantou);
        this.addChild(particle);
        particle.setPosition(   this.width/2,
                                        this.height/4 * 3);
        this.beginParticle = particle;


        var beginGame = new cc.LabelTTF("开始游戏","Arial",36);
        var beginGameItem = new cc.MenuItemLabel(beginGame,this.beginAction,this);
        beginGameItem.setPosition(0,0);

        var delay = cc.delayTime(5);
        var anminB = cc.rotateTo(0.1,-5,-5);
        var anminC = cc.rotateTo(0.1,5,5);
        var anminD = cc.rotateTo(0.1,0,0);

        var sequence = cc.sequence(delay,anminB,anminC,anminD);
        beginGame.runAction(sequence.repeatForever());



        var exit = new cc.LabelTTF("继续","Arial",36);
        var exitItem = new cc.MenuItemLabel(exit,this.exitAction,this);
        exitItem.setPosition(beginGameItem.x,beginGameItem.y - 80);


        var menu = new cc.Menu(beginGameItem,exitItem)
        this.mainMenu = menu;
        this.addChild(menu);


    },

    beginAction:function(){
        cc.log("touch beginAction");
        let aa = false;//第一次点击进入
        if(!aa){
            let duration = 2;//消失时间
            this.beginParticle.duration  = duration;
            let anim = cc.fadeOut(duration);
            this.mainMenu.runAction(anim);
            cc.director.runScene(new GodScene());//
        }else{
            cc.director.runScene(new MainScene());//
        }

    },

    exitAction:function(){
        cc.log("touch exitAction");

        cc.director.runScene(new MainScene());//
    },


});



var LoginScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }

});

