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

var res = {

    //Game UI
    baceButton      : "res/UI/baceButton.png",
    cardGroup       : "res/UI/cardGroup.png",
    cardGroupSingle : "res/UI/cardGroupSingle@15x.png",
    loading         : "res/UI/loading.png", //加载

    //地图相关
    bg5x5_tmx       : "res/Map/55/chessMap5x5.tmx", //地图
    crystal         : "res/piece/new/crystal.png",  //水晶

    //other
    God_png         : "res/Other/god.png",
    downArrow_png   : "res/Other/iconDownArrow.png",
    leftArrow_png   : "res/Other/iconLeftArrow.png",
    redHeart        : "res/Other/redHeart.png",
    energy          : "res/Other/energy.png",

    //monster 棋子
    monster_plist_26    : "res/piece/monster26.plist",
    monster_png_26      : "res/piece/monster26.png",
    defaultMonster      : "res/piece/monster/qz1001.png",
    monster1001         : "res/piece/monster/qz1001.png",

    //粒子
    particle_move_piantou       : "res/Particle/piantouAnim.plist",
    particle_blackFire          : "res/Particle/blackFire2x.plist",

    //卡组成 UI
    kadi                : "res/Card/Base/kaBasedi.png",
    kaditiao            : "res/Card/Base/kaBaseditiao.png",
    kakuang             : "res/Card/Base/kaBasekuang.png",
    katiao              : "res/Card/Base/kaBasetiao.png",

    //卡组成 基础icon
    kaFY               : "res/Card/Base/kaIconF.png",//费用
    kaGJL              : "res/Card/Base/kaIconG.png",//攻击力
    kaYDL              : "res/Card/Base/kaIconM.png",//移动力
    kaSMZ              : "res/Card/Base/kaIconS.png",//生命值

    //卡组成 特性
    kaT_FJ             : "res/Card/Base/TX_FJ.png",//反击


    //card原画
    guaiwu0001          : "res/Card/monster/gw1001.png",
    monsterDefault      : "res/Card/monster/monsterDefault.png",

    //小卡
    cardHandBack        : "res/Card/Little/cardHandBack.png",//小卡背
    cardHand            : "res/Card/Little/sk1001.png",


};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
