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
    //
    bg_tmx      : "res/Map/32/chess.tmx",
    bg50_tmx    : "res/Map/50/chess2.tmx",
    bg5x5_tmx   : "res/Map/55/chessMap5x5.tmx",


    //other
    backgroundIcon  : "res/Other/background.jpg",
    GameIcon        : "res/Other/icon.png",
    God_png         : "res/Other/god.png",
    downArrow_png   : "res/Other/iconDownArrow.png",
    leftArrow_png   : "res/Other/iconLeftArrow.png",
    //


    //monster
    monster_plist_26    : "res/Chess/monster26.plist",
    monster_png_26      : "res/Chess/monster26.png",

    //game other
    crystal             : "res/Chess/new/crystal.png",


    //粒子
    particle_violet             : "res/Particle/VioletSmoke.plist",
    particle1_violet            : "res/Particle/blackFire.plist",
    particle_move_dust_black    : "res/Particle/blackFire2.plist",
    particle_move_dust_white    : "res/Particle/blackFire3.plist",
    particle_move_piantou       : "res/Particle/piantouAnim.plist",


    //ka
    kadi                : "res/card/kadi.png",
    kaditiao            : "res/card/kaditiao.png",
    kakuang             : "res/card/kakuang.png",
    katiao              : "res/card/katiao.png",

    //card原画
    guaiwu0001          : "res/card/monster/gw0001.png",

    //ui
    baceButton          : "res/UI/baceButton.png",



};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
