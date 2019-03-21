

//专用棋盘类


var GWCheckerboard = cc.Node.extend({





    camp_Type                   : "",

    tmxMap                      : null,
    tmxBgLayer                  : null,

    holder_Chess                : null,  // 手举棋子

    //arrayNewLayerInMap
    arrayMoveLayerInMap         : [],   //临时layer数组 用于跟踪 remove     //temporaryMapLayerArray
    arrayFriendsSurvivalChess   : [],   // 我方存活棋子Array      //survivalChessArray

    // tiledMapRectArray       : [],   // 瓦片地图区域[二维区域]
    // tiledMapRectArrayMap    : [],   // 瓦片地图区域映射



    tiledMapRectArray           : [],   // 地图rect list
    tiledMapLeaveArray          : [],   // 棋子存放 状态 list




    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // array
    arrayEnemySurvivalChess     :[],//敌方存活棋子Array

    arraySummonLayerInMap         :[],




    ctor: function (){
        this._super();


        this.camp_Type = CampEnemu.BLACK;//默认黑色持方
        this.arrayFriendsSurvivalChess = [];
        this.arrayEnemySurvivalChess = [];


        this.loadTiledMap();
        this.loadMapRectArray();    // 地图区域 rect
        this.loadMapLeaveArray(); // 瓦片地图区域映射



        //摆放棋子
        // this.placeChessCrystal();
        // this.registerEvent();



        return true;
    },





    // 瓦片地图区域[二维区域]
    loadTiledMap:function () {
        //加载地图
        // var node = new cc.TMXTiledMap(res.bg50_tmx);
        var node = new cc.TMXTiledMap(res.bg5x5_tmx);
        this.addChild(node);
        node.setPosition((cc.winSize.width - node.width)/2,(cc.winSize.height - node.height)/2);
        node.setAnchorPoint(0,0);
        this.tmxMap = node;
        this.tmxBgLayer = this.tmxMap.getLayer("bg");
        MAPSH = node;
    },



    // 地图区域 rect
    loadMapRectArray:function(){

        var tileSizeWidth = this.tmxBgLayer.getMapTileSize().width;
        var tileSizeHeight = this.tmxBgLayer.getMapTileSize().height;

        //初始化 rect Array
        //[进入二层循环 第一层：j为Y轴]
        for(var j = 0;j< this.tmxMap.getMapSize().height;j++) {
            this.tiledMapRectArray[j] = [];
            //[第二层：i为X轴]
            for(var i = 0; i< this.tmxMap.getMapSize().width;i++){
                this.tiledMapRectArray[j][i] = cc.rect(
                    this.tmxMap.x + i * tileSizeWidth,
                    this.tmxMap.y + j * tileSizeHeight,
                    tileSizeWidth,
                    tileSizeHeight
                );
            }
        }

    },




    //初始化  Array
    loadMapLeaveArray:function(){

        var mapSize = this.tmxMap.getMapSize();

        for (var i = 0; i < mapSize.height; i++) {
            this.tiledMapLeaveArray[i] = [];
            for (var j = 0; j < mapSize.width; j++) {
                this.tiledMapLeaveArray[i][j] = CampEnemu.NONE;
            }
        }
    },






    // //摆放象棋棋子
    // placeChessmen:function () {
    //
    //
    //     //初始化两边持方
    //     var selfColor = CampEnemu.NONE;
    //     var enemyColor = CampEnemu.NONE;
    //     switch (this.camp_Type) {
    //         case CampEnemu.BLACK:
    //             selfColor = CampEnemu.BLACK;
    //             enemyColor = CampEnemu.WHITE;
    //             break;
    //         case CampEnemu.WHITE:
    //             selfColor = CampEnemu.WHITE;
    //             enemyColor = CampEnemu.BLACK;
    //             break;
    //     }
    //
    //
    //     //[进入二层循环 第一层：j为Y轴]
    //     for(var j = 0;j< this.tmxMap.getMapSize().height;j++) {
    //
    //         // //[确认当前落子颜色]
    //         var campColor = selfColor;
    //         switch (j) {
    //             //我方区域
    //             case 0:case 1:
    //                 campColor = selfColor;break;
    //             //对方区域
    //             case 6:case 7:
    //                 campColor = enemyColor;break;
    //             //无子区域
    //             default:
    //                 campColor = CampEnemu.NONE;break;
    //         }
    //
    //         //[第二层：i为X轴]
    //         for(var i = 0; i< this.tmxMap.getMapSize().width;i++){
    //
    //             //默认棋子类型 无
    //             var chessType = ChessTypeEnemu.NONE;
    //
    //             if( j == 1 || j == 6){// [士兵]
    //                 chessType = ChessTypeEnemu.PAWN;
    //             }else if (j == 0 || j == 7){
    //                 if( i == 0 || i == 7 ){ // [车]
    //                     chessType = ChessTypeEnemu.ROOK;
    //                 }else if ( i == 1 || i == 6){// [骑士]
    //                     chessType = ChessTypeEnemu.KNIGHT;
    //                 }else if ( i == 2 || i == 5){// [主教]
    //                     chessType = ChessTypeEnemu.BISHOP;
    //                 }else if (( i == 3 && j == 0 ) || i == 4 && j == 7 ){ // [皇后]
    //                     chessType = ChessTypeEnemu.QUEEN;
    //                 }else if (( i == 4 && j == 0 ) || i == 3 && j == 7 ){ // [国王]
    //                     chessType = ChessTypeEnemu.KING;
    //                 }
    //             }
    //
    //             //映射地图中（j,i）区域中落子情况（无，黑，白）
    //             this.tiledMapLeaveArray[j][i] = campColor;
    //
    //
    //
    //             //有type 则添加
    //             if(chessType != ChessTypeEnemu.NONE){
    //
    //                 //名称确认
    //                 var chessname = "res/Chess/"+ campColor + "_" + chessType +".png";
    //                 var node = new Chess(chessname);
    //                 node.chessType = chessType;
    //                 node.campColor = campColor;
    //                 node.chessInMapX = j;
    //                 node.chessInMapY = i;
    //
    //                 // set
    //                 node.setAnchorPoint(0.5,0.5);//瞄点修改
    //                 // 地图位置 + 瞄点修正 + 单个瓦片size
    //                 node.setPosition(
    //                     this.tmxMap.x + (i + 0.5) * this.tmxBgLayer.getMapTileSize().width ,
    //                     this.tmxMap.y + (j + 0.5) *this.tmxBgLayer.getMapTileSize().height
    //                 );
    //
    //                 this.addChild(node,CHESS_LOCAL_ZORDER);    //加入到map中
    //                 this.arrayFriendsSurvivalChess.push(node);//记录在存活棋子中
    //             }
    //
    //         }
    //     }
    // },




    //摆放棋子  初始化棋盘 part
    placeChessCrystal:function () {

        var selfkingPos = {x:4,y:0};
        var otherkingPos = {x:4,y:8};


        var selfking = new GWPiece(res.crystal);
        selfking.setAnchorPoint(0.5,0);
        selfking.setPosition(
            this.tmxMap.x + (selfkingPos.x + selfking.anchorX) * this.tmxBgLayer.getMapTileSize().width ,
            this.tmxMap.y + (selfkingPos.y + selfking.anchorY) *this.tmxBgLayer.getMapTileSize().height
        );
        selfking.chessType = ChessTypeEnemu.CRYSTAL;
        selfking.ownerType = OwnerEnemu.FRIENDS;
        selfking.chessInMapX = selfkingPos.x;
        selfking.chessInMapY = selfkingPos.y;
        selfking.StateSummoning = SummoningStateEnemu.inCheckerboard;//召唤状态


        this.addChild(selfking,LocalZorderEnemu.CHESS);
        this.arrayFriendsSurvivalChess.push(selfking);//加入队友棋子
        this.tiledMapLeaveArray[selfkingPos.x][selfkingPos.y] = CampEnemu.BLACK;

        var sumRange = selfking.getSummonRange();
        for(var i = 0 ;i < sumRange.length;i++){
            this.tiledMapLeaveArray[sumRange[i].x][sumRange[i].y] = CampEnemu.BLACK_SUM;
        }









        var otherking = new GWPiece(res.crystal);
        otherking.setAnchorPoint(0.5,0);
        otherking.setPosition(
            this.tmxMap.x + (otherkingPos.x + otherking.anchorX) * this.tmxBgLayer.getMapTileSize().width ,
            this.tmxMap.y + (otherkingPos.y + otherking.anchorY) *this.tmxBgLayer.getMapTileSize().height
        );

        otherking.chessType = ChessTypeEnemu.CRYSTAL;
        otherking.ownerType = OwnerEnemu.ENEMY;
        otherking.chessInMapX = otherking.x;
        otherking.chessInMapY = otherking.y;
        otherking.StateSummoning = SummoningStateEnemu.inCheckerboard;//召唤状态

        // 特殊处理 -无图片 -加色处理
        otherking.setColor(cc.color(100,100,100));
        this.addChild(otherking,LocalZorderEnemu.CHESS);
        this.arrayEnemySurvivalChess.push(otherking);//加入敌方棋子
        this.tiledMapLeaveArray[otherkingPos.x][otherkingPos.y] = CampEnemu.WHITE;



        var osumRange = otherking.getSummonRange();
        for(var i = 0 ;i < osumRange.length;i++){
            this.tiledMapLeaveArray[osumRange[i].x][osumRange[i].y] = CampEnemu.WHITE_SUM;
        }

        cc.log(this.tiledMapLeaveArray);
    },


    //从手牌中拿出一个棋子
    pickUpChessInHand(chess){


        // if(this.holder_Chess != undefined){
            // this.holder_Chess
        // }

        if(this.holder_Chess != null){
            this.removeMapLayerArray();
            this.holder_Chess.pickDown();
            this.holder_Chess = null;
        }else{
            this.holder_Chess = chess;
            this.holder_Chess.pickUp();


            //显示召唤区域
            var result = [];
            for (var i = 0; i< 8; i++){
                for (var j = 0; j< 8; j++){
                    var state = this.tiledMapLeaveArray[i][j];
                    if(state == CampEnemu.BLACK_SUM){
                        // var rect = this.tiledMapRectArray[i][j];
                        result.push({   isAllow:true,
                                        posInMap:{
                                            x:i,
                                            y:j
                                        }
                                    });
                    }
                }
            }
            this.drawMapLayerArray(result,0);//move


            // for (var i = 0; i<this.tiledMapLeaveArray.length ; i++){
            //     var state = this.tiledMapLeaveArray[i];
            //     // var rect =
            //     if(state == )
            //
            //     result = result.concat( this.getMapRectInMapIncrement(chess.getSummonRange())  )//
            // }
            // this.drawMapLayerArray(result);

        }

        //getSummonRange

        // self.drawMapLayerArray(self.getMapRectInMapIncrement(currentChess.getMovingRange()));


        // this.holder_Chess = chess;
        // chess.pickUp();
    },






    // registerEvent:function(){
    //
    //     // [事件监听]触摸事件
    //     var onTouchEventListener = cc.EventListener.create({
    //         event           : cc.EventListener.TOUCH_ONE_BY_ONE,
    //         target          : this,
    //         swallowTouches  : true,
    //         onTouchBegan  : this.onTouchBegan,
    //         onTouchMoved  : this.onTouchMoved,
    //         onTouchEnded  : this.onTouchEnded
    //     });
    //     cc.eventManager.addListener(onTouchEventListener, this);
    // },




    /*
    *
    *
    *   touch event
    *
    *
    *
    * */



    //touch event
    onTouchBegan:function (touch,event) {
        // cc.log("Checkerboard onTouchBegan",touch,event);
        return true;// false 会使点击失败
    },



    onTouchMoved:function (touch,event) {
        cc.log("Checkerboard onTouchMoved");
    },


    onTouchEnded:function (touch,event) {

        cc.log("Checkerboard onTouchEnded");

        var self = (event === undefined)? this : event.getCurrentTarget();
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
                for(var  i = 0; i < self.arrayMoveLayerInMap.length ; i++){
                    //获取区域映射
                    let pos = self.arrayMoveLayerInMap[i].pos;//
                    var chess = self.holder_Chess;
                    //选中了某一个layer
                    if(result.cel == pos.x && result.row == pos.y){

                        var layerRect = self.tiledMapLeaveArray[result.row][result.cel];

                        //目标区域情况
                        if( layerRect == CampEnemu.NONE){
                            cc.log("目标区域无棋子，允许落子");


                            //地图 映射 更新
                            if(chess.StateSummoning == SummoningStateEnemu.inHand){


                                var localZor = LocalZorderEnemu.CHESS;
                                if(result.row == 1){
                                    localZor = LocalZorderEnemu.CHESS0;
                                }




                                //从scene移除
                                chess.removeFromParent();
                                // 加入到棋盘中
                                self.addChild(chess,localZor);


                                //棋子化处理
                                chess.StateSummoning = SummoningStateEnemu.inCheckerboard;
                                chess.setAnchorPoint(0.5,0.5);
                                chess.setScale(2);
                                chess.movingDistance = 3;
                                chess.movingDirection = [1,1,1,1,1,1,1,1];
                                this.arrayFriendsSurvivalChess.push(chess);






                                //现在位置
                                self.tiledMapLeaveArray[result.cel][result.row] =  chess.campColor;


                                chess.joinInMap(result.cel,result.row);
                            }
                            else{
                                //原来位置
                                self.tiledMapLeaveArray[chess.chessInMapX][chess.chessInMapY] = CampEnemu.NONE;

                                //现在位置
                                self.tiledMapLeaveArray[result.cel][result.row] =  chess.campColor;


                                chess.moveInMap(result.row,result.cel);
                            }



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
            if(self.tiledMapLeaveArray[result.cel][result.row] == CampEnemu.NONE){
                cc.log("无棋子");
            }
            else{

                cc.log("有棋子",result);
                var currentChess = self.pickUpChessInMapPoint(posInNode);
                //


                if(currentChess === undefined){
                    return ;
                }

                if(currentChess.pieceType == PieceTypeEnemu.BASE){
                    //基础棋子 点击后查看召唤区域
                    currentChess.pickUp();
                    self.holder_Chess = currentChess;
                    // //绘制区域 （-映射转化为区域 （-获得移动映射））
                    self.drawMapLayerArray(self.getMapRectInMapIncrement(currentChess.getMovingRange()),0);
                }else{
                    //其他类型棋子 点击后查看召唤区域和移动区域
                    currentChess.pickUp();
                    self.holder_Chess = currentChess;
                    // //绘制区域 （-映射转化为区域 （-获得移动映射））
                    self.drawMapLayerArray(self.getMapRectInMapIncrement(currentChess.getMovingRange()),0);
                }
            }
        }

    },





    //计算chess 的落子范围增量 增量保存数组返回
    getMapRectInMapIncrement:function(mappings){

        var result = [];

        // var incrementValue = chess.getsumm;//获取棋子移动规则


        for(var i = 0 ;i < mappings.length; i ++){

            //判断 （利用增量判断） 有无存活棋子
            var isSureChess = false;
            for(var index = 0; index < this.arrayFriendsSurvivalChess.length;index++){
                var node = this.arrayFriendsSurvivalChess[index];

                // if(node.chessInMapX != (chess.chessInMapX + chessIncrements[i].y)){
                //     continue;
                // }else{
                //     if(node.chessInMapY != (chess.chessInMapY + chessIncrements[i].x)){
                //         continue;
                //     }else{
                //         isSureChess = true;
                //     }
                // }
                //
                // if( (node.chessInMapX == (chess.chessInMapX + chessIncrements[i].x)) &&
                //     (node.chessInMapY == (chess.chessInMapY + chessIncrements[i].y))
                // ){
                //     isSureChess = true;
                // }


                if( (node.chessInMapX == mappings[i].x) &&
                    (node.chessInMapY == mappings[i].y)
                ){
                    isSureChess = true;
                }

            }

            //通过增量 计算得出映射 将映射传递
            result.push({   isAllow:!isSureChess,
                            posInMap:{
                                x:mappings[i].x,
                                y:mappings[i].y
                            }
                        });

        }
        return result;
    },





    //计算chess 的落子范围增量 增量保存数组返回
    getPlaceabelMapArray:function(chess){

        var result = [];

        var incrementValue = chess.getChessMoveMobile();//获取棋子移动规则


        for(var i = 0 ;i < incrementValue.length; i ++){

            //判断 （利用增量判断） 有无存活棋子
            var isSureChess = false;
            for(var index = 0; index < this.arrayFriendsSurvivalChess.length;index++){
                var node = this.arrayFriendsSurvivalChess[index];
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
    drawMapLayerArray:function(array,type ){

        for(var i = 0;i<array.length;i++){
            let pos = array[i].posInMap; //获取映射
            //要注意这里是x-y相反
            let rect = this.tiledMapRectArray[pos.y][pos.x];//通过映射获取rect

            let userColor = array[i].isAllow?ALLOWPLACE_COLOR:NOT_ALLOWPLACE_COLOR;

            var layer = new cc.LayerColor(  userColor,
                this.tmxMap.getTileSize().width,
                this.tmxMap.getTileSize().height);
            layer.setPosition(rect.x,rect.y);
            //move
            if(type == 0){
                this.arrayMoveLayerInMap.push({layer:layer,pos:pos});//layer 跟踪
            }else{//summon
                //arraySummonLayerInMap
                this.arraySummonLayerInMap.push({layer:layer,pos:pos});
            }
            this.addChild(layer,LAYER_LOCAL_ZORDER);
        }
    },


    //移除layer
    removeMapLayerArray:function(){

        for(var i = 0;i< this.arrayMoveLayerInMap.length;i++){
            var layer = this.arrayMoveLayerInMap[i].layer;
            layer.removeFromParent();
        }
        this.arrayMoveLayerInMap = [];




        for(var i = 0;i< this.arraySummonLayerInMap.length;i++){
            var layer = this.arraySummonLayerInMap[i].layer;
            layer.removeFromParent();
        }
        this.arraySummonLayerInMap = [];
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

        for (var i = 0;i < this.arrayFriendsSurvivalChess.length ; i++){
            var node = this.arrayFriendsSurvivalChess[i];
            cc.log("node ach:",node.anchorX,node.anchorY);
            //x: node.x + 修正
            //y: node.y + 修正
            //width: layer方格大小//防止由于ui导致点击困难
            var rect = new cc.rect(
                node.x - node.anchorX * this.tmxBgLayer.getMapTileSize().width,
                node.y - node.anchorY * this.tmxBgLayer.getMapTileSize().height,
                this.tmxBgLayer.getMapTileSize().width,
                this.tmxBgLayer.getMapTileSize().height);
            //判断是否在允许的点击范围内
            if(cc.rectContainsPoint(rect,posInNode)){
                return node;
            }
        }
    },


    // //转换正常坐标
    // transformationNormalCoordinate:function (pos,y) {
    //     if (y === undefined) {
    //         return cc.p(pos.x, 7 - pos.y);
    //     } else {
    //         return cc.p(pos,7 - y);
    //     }
    // },


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






})