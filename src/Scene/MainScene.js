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


var MainLayer = cc.Layer.extend({


    camp_Type               : "",

    tmxMap                  : null,
    tmxBgLayer              : null,

    holder_Chess            : null,  // 手举棋子


    arrayNewLayerInMap      : [],   //临时layer数组 用于跟踪 remove     //temporaryMapLayerArray
    arraySurvivalChess      : [],   // 我方存活棋子Array      //survivalChessArray


    tiledMapRectArray       : [],   // 瓦片地图区域[二维区域]
    tiledMapRectArrayMap    : [],   // 瓦片地图区域映射



    ctor:function () {

        this._super();

        this.camp_Type = CampEnemu.BLACK;//默认黑色持方
        this.arraySurvivalChess = [];



        this.loadTiledMap();
        this.loadMapRectArray();    // 瓦片地图区域[二维区域]
        this.loadMapRectArrayMap(); // 瓦片地图区域映射



        this.placeChessmen();
        this.registerEvent();

        /* 粒子添加 * */
        // var particle1 = new cc.ParticleSystem(res.particle1_violet);
        // particle1.duration = 10;
        // this.addChild(particle1);
        // particle1.setPosition(this.width/2 + MAPSH.getTileSize().width/2,this.height/2 + MAPSH.getTileSize().width/2);
        //
        //
        // var particle2 = new cc.ParticleSystem(res.particle2_violet);
        // this.addChild(particle2);
        // particle2.setPosition(this.width/2,this.height/2);


        return true;
    },



    // 瓦片地图区域[二维区域]
    loadTiledMap:function () {
        //加载地图
        var node = new cc.TMXTiledMap(res.bg50_tmx);
        this.addChild(node);
        node.setPosition((cc.winSize.width - node.width)/2,(cc.winSize.height - node.height)/2);
        node.setAnchorPoint(0,0);
        this.tmxMap = node;
        this.tmxBgLayer = this.tmxMap.getLayer("bg");
        MAPSH = node;
    },



    // 瓦片地图区域映射
    loadMapRectArray:function(){


        //初始化 rect Array
        //[进入二层循环 第一层：j为Y轴]
        for(var j = 0;j< this.tmxMap.getMapSize().height;j++) {
            this.tiledMapRectArray[j] = [];
            //[第二层：i为X轴]
            for(var i = 0; i< this.tmxMap.getMapSize().width;i++){
                this.tiledMapRectArray[j][i] = cc.rect( this.tmxMap.x + i * this.tmxBgLayer.getMapTileSize().width,
                                                        this.tmxMap.y + j * this.tmxBgLayer.getMapTileSize().height,
                                                        this.tmxBgLayer.getMapTileSize().width,
                                                        this.tmxBgLayer.getMapTileSize().height);
            }
        }
    },


    //初始化 映射 Array
    loadMapRectArrayMap:function(){
        var mapSize = this.tmxMap.getMapSize();
        for (var i = 0; i < mapSize.height; i++) {
            this.tiledMapRectArrayMap[i] = [];
            for (var j = 0; j < mapSize.width; j++) {
                this.tiledMapRectArrayMap[i][j] = CampEnemu.NONE;
            }
        }
    },



    registerEvent:function(){

        // [事件监听]触摸事件
        var onTouchEventListener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan  : this.onTouchBegan,
            onTouchMoved  : this.onTouchMoved,
            onTouchEnded  : this.onTouchEnded
        });
        cc.eventManager.addListener(onTouchEventListener, this);
    },


    //摆放棋子
    placeChessmen:function () {

        //初始化两边持方
        var selfColor = CampEnemu.NONE;
        var enemyColor = CampEnemu.NONE;
        switch (this.camp_Type) {
            case CampEnemu.BLACK:
                selfColor = CampEnemu.BLACK;
                enemyColor = CampEnemu.WHITE;
                break;
            case CampEnemu.WHITE:
                selfColor = CampEnemu.WHITE;
                enemyColor = CampEnemu.BLACK;
                break;
        }


        //[进入二层循环 第一层：j为Y轴]
        for(var j = 0;j< this.tmxMap.getMapSize().height;j++) {

            // //[确认当前落子颜色]
            var campColor = selfColor;
            switch (j) {
                //我方区域
                case 0:case 1:
                    campColor = selfColor;break;
                //对方区域
                case 6:case 7:
                    campColor = enemyColor;break;
                //无子区域
                default:
                    campColor = CampEnemu.NONE;break;
            }

            //[第二层：i为X轴]
            for(var i = 0; i< this.tmxMap.getMapSize().width;i++){

                //默认棋子类型 无
                var chessType = ChessTypeEnemu.NONE;

                if( j == 1 || j == 6){// [士兵]
                    chessType = ChessTypeEnemu.PAWN;
                }else if (j == 0 || j == 7){
                    if( i == 0 || i == 7 ){ // [车]
                        chessType = ChessTypeEnemu.ROOK;
                    }else if ( i == 1 || i == 6){// [骑士]
                        chessType = ChessTypeEnemu.KNIGHT;
                    }else if ( i == 2 || i == 5){// [主教]
                        chessType = ChessTypeEnemu.BISHOP;
                    }else if (( i == 3 && j == 0 ) || i == 4 && j == 7 ){ // [皇后]
                        chessType = ChessTypeEnemu.QUEEN;
                    }else if (( i == 4 && j == 0 ) || i == 3 && j == 7 ){ // [国王]
                        chessType = ChessTypeEnemu.KING;
                    }
                }

                //映射地图中（j,i）区域中落子情况（无，黑，白）
                this.tiledMapRectArrayMap[j][i] = campColor;



                //有type 则添加
                if(chessType != ChessTypeEnemu.NONE){

                    //名称确认
                    var chessname = "res/Chess/"+ campColor + "_" + chessType +".png";
                    var node = new Chess(chessname);
                    node.chessType = chessType;
                    node.campColor = campColor;
                    node.chessInMapX = j;
                    node.chessInMapY = i;

                    // set
                    node.setAnchorPoint(0.5,0.5);//瞄点修改
                    // 地图位置 + 瞄点修正 + 单个瓦片size
                    node.setPosition(
                        this.tmxMap.x + (i + 0.5) * this.tmxBgLayer.getMapTileSize().width ,
                        this.tmxMap.y + (j + 0.5) *this.tmxBgLayer.getMapTileSize().height
                    );

                    this.addChild(node,CHESS_LOCAL_ZORDER);    //加入到map中
                    this.arraySurvivalChess.push(node);//记录在存活棋子中
                }

            }
        }
    },




    //touch event
    onTouchBegan:function (touch,event) {
        cc.log("onTouchBegan");
        return true;
    },



    onTouchMoved:function (touch,event) {
        cc.log("onTouchMoved");
    },


    onTouchEnded:function (touch,event) {

        cc.log("onTouchEnded");
        var self = event.getCurrentTarget();
        //将点击坐标转换为基于当前触发事件对象的本地坐标
        var posInNode = self.convertToNodeSpace(touch.getLocation());

        //设置允许点击的范围
        var rect = cc.rect( self.tmxMap.x, self.tmxMap.y, self.tmxMap.width, self.tmxMap.height);

        //判断是否在允许的点击范围内
        if(!(cc.rectContainsPoint(rect,posInNode))){
            return false;
        }

        cc.log("onTouchEnded",posInNode);
        cc.log("onTouchEnded",touch.getLocation());
        cc.log("onTouchEnded",self.getInfoFromMapByPos(posInNode.x,posInNode.y));


        //获取地图改点状态
        var result = self.getInfoFromMapByPos(touch.getLocation().x, touch.getLocation().y);
        // 触摸到地图区域内
        if (result.isInMap) {

            // //举起棋子 & 其他 操作
            if(self.holder_Chess != null){

                //是否点击layer
                for(var  i = 0; i < self.arrayNewLayerInMap.length ; i++){
                    //获取区域映射
                    let pos = self.arrayNewLayerInMap[i].pos;//
                    var chess = self.holder_Chess;
                    //选中了某一个layer
                    if(result.row == pos.x && result.cel == pos.y){

                        var layerRect = self.tiledMapRectArrayMap[result.row][result.cel];

                        //目标区域情况
                        if( layerRect == CampEnemu.NONE){
                            cc.log("目标区域无棋子，允许落子");

                            //地图 映射 更新
                            self.tiledMapRectArrayMap[chess.chessInMapX][chess.chessInMapY] = CampEnemu.NONE;
                            self.tiledMapRectArrayMap[result.row][result.cel] =  chess.campColor;

                            chess.moveInMap(result.row,result.cel);

                        }else if(layerRect == chess.campColor){
                            cc.log("目标区域有我方棋子，不允许落子");
                        }else {
                            cc.log("目标区域有对方棋子，不允许落子");
                        }
                    }
                }
                self.removeMapLayerArray();//移除layer
                self.holder_Chess.pickDown();
                self.holder_Chess = null;
                return;
            }

            //未举起棋子


            //点击空白区域
            if(self.tiledMapRectArrayMap[result.row][result.cel] == CampEnemu.NONE){
                cc.log("无棋子");
            }
            else{

                cc.log("有棋子",result);
                var currentChess = self.pickUpChessInMapPoint(posInNode);
                currentChess.pickUp();
                self.holder_Chess = currentChess;


                //绘制区域
                self.drawMapLayerArray(self.getPlaceabelMapArray(currentChess));

            }
        }
    },



    //计算chess 的落子范围增量 增量保存数组返回
    getPlaceabelMapArray:function(chess){

        var result = [];

        var incrementValue = chess.getChessMoveMobile();//获取棋子移动规则


        for(var i = 0 ;i < incrementValue.length; i ++){

            //判断 （利用增量判断） 有无存活棋子
            var isSureChess = false;
            for(var index = 0; index < this.arraySurvivalChess.length;index++){
                var node = this.arraySurvivalChess[index];
                if(node.chessInMapX != (chess.chessInMapX + incrementValue[i].y)){
                    continue;
                }else{
                    if(node.chessInMapY != (chess.chessInMapY + incrementValue[i].x)){
                        continue;
                    }else{
                        isSureChess = true;
                    }
                }
            }

            //通过增量 计算得出映射 将映射传递
            result.push({isAllow:!isSureChess,posInMap:{    x:chess.chessInMapX + incrementValue[i].y,
                                                            y:chess.chessInMapY + incrementValue[i].x }});

        }
        return result;
    },



    //绘制layer
    drawMapLayerArray:function(array){

        for(var i = 0;i<array.length;i++){
            let pos = array[i].posInMap;//获取映射
            let rect = this.tiledMapRectArray[pos.x][pos.y];//通过映射获取rect

            let userColor = array[i].isAllow?ALLOWPLACE_COLOR:NOT_ALLOWPLACE_COLOR;

            var layer = new cc.LayerColor(  userColor,
                                            this.tmxMap.getTileSize().width,
                                            this.tmxMap.getTileSize().height);
            layer.setPosition(rect.x,rect.y);
            this.arrayNewLayerInMap.push({layer:layer,pos:pos});//layer 跟踪
            this.addChild(layer,LAYER_LOCAL_ZORDER);
        }
    },


    //移除layer
    removeMapLayerArray:function(){

        for(var i = 0;i< this.arrayNewLayerInMap.length;i++){
            var layer = this.arrayNewLayerInMap[i].layer;
            layer.removeFromParent();
        }
        this.arrayNewLayerInMap = [];
    },






    //传入点击位置
    pickUpChessInMapPoint:function(pos,y){

        var posInNode = new cc.p(0,0);

        if(y === undefined){
            posInNode = pos;
        }else{
            posInNode.x = pos;
            posInNode.y = y;
        }

        for (var i = 0;i < this.arraySurvivalChess.length ; i++){
            var node = this.arraySurvivalChess[i];
            var rect = new cc.rect( node.x - 0.5 *this.tmxBgLayer.getMapTileSize().width,
                                    node.y - 0.5 *this.tmxBgLayer.getMapTileSize().height,
                                    node.width,
                                    node.height);
            //判断是否在允许的点击范围内
            if(cc.rectContainsPoint(rect,posInNode)){
                return node;
            }
        }
    },


    //转换正常坐标
    transformationNormalCoordinate:function (pos,y) {
        if (y === undefined) {
            return cc.p(pos.x, 7 - pos.y);
        } else {
            return cc.p(pos,7 - y);
        }
    },


    // 根据坐标获取在地图中的信息
    getInfoFromMapByPos : function(x, y){
        cc.assert(y !== undefined, "GPMainLayer.getInfoFromMapByPos(): Y坐标不能为空！");

        var isInMap = false;
        var index = {
            x : -1,
            y : -1
        };

        var rect = null;
        for (var i = 0; i < this.tiledMapRectArray.length; i++) {
            for (var j = 0; j < this.tiledMapRectArray[i].length; j++) {
                rect = this.tiledMapRectArray[i][j];
                if (cc.rectContainsPoint(rect, cc.p(x, y))) {
                    index.row = i;
                    index.cel = j;
                    index.x = rect.x;
                    index.y = rect.y;
                    isInMap = true;
                }
            }
        }

        return {
            isInMap : isInMap,
            row : index.row,  // 行
            cel : index.cel,  // 列
            x : index.x,
            y : index.y
        };
    }

});




var MainScene = cc.Scene.extend({

    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }

});

