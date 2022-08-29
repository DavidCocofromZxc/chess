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
    baseButton: "res/UI/baseButton.png",
    cardGroup: "res/UI/cardGroup.png",
    cardGroupSingle: "res/UI/cardGroupSingle.png",
    loading: "res/UI/loading.png", //加载

    //地图相关
    chessMap5x5: "res/Map/55/chessMap5x5.tmx", //地图


    //other
    god: "res/Other/god.png",
    iconDownArrow: "res/Other/iconDownArrow.png",
    iconLeftArrow: "res/Other/iconLeftArrow.png",
    redHeart: "res/Other/redHeart.png",
    energy: "res/Other/energy.png",
    gold16z: "res/Other/Gold/gold16z.png",
    gold16f: "res/Other/Gold/gold16f.png",


    //monster 棋子
    // monster_plist_26: "res/piece/monster26.plist",
    // monster_png_26: "res/piece/monster26.png",
    qz1001: "res/piece/monster/qz1001.png",
    // monster1001: "res/piece/monster/qz1001.png",

    //粒子
    piantouAnim: "res/Particle/piantouAnim.plist",
    blackFire2x: "res/Particle/blackFire2x.plist",

    //卡组成 UI
    kadi: "res/Card/Base/kadi.png",
    kaditiao: "res/Card/Base/kaditiao.png",
    kakuang: "res/Card/Base/kakuang.png",
    katiao: "res/Card/Base/katiao.png",

    //卡组成 基础icon
    kaFY: "res/Card/Base/kaFY.png",//费用
    kaGJL: "res/Card/Base/kaGJL.png",//攻击力
    kaYDL: "res/Card/Base/kaYDL.png",//移动力
    kaSMZ: "res/Card/Base/kaSMZ.png",//生命值

    //卡组成 特性
    kaT_FJ: "res/Card/Base/kaT_FJ.png",//反击

    //card原画
    monsterDefault: "res/Card/monster/monsterDefault.png",

    //小卡
    cardHandBack: "res/Card/Little/cardHandBack.png",//小卡背
    sk1002: "res/Card/Little/sk1002.png",


    //piece icon
    // crystal: "res/piece/building/1000.png",  //水晶

    //json
    // datajson:"res/json/data.json",

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
