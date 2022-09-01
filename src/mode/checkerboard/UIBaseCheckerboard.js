
/**
 *
 * 棋盘基础类/地图类
 *
 * */
//其他层枚举
var EnemuOtherLayer = {
    MOVE    :0, //移动层
    SUMMON  :1, //召唤层
    ALL     :99,//all
};
var UIBaseCheckerboard = cc.TMXTiledMap.extend({
    campType                    : CampEnemu.BLACK,   //当前阵营
    tmxBgLayer                  : null, //bg 层
    selectChess                 : null, //选中棋子
    selectHandCardData          : null, //选中牌data -用于沟通手牌和棋盘的传递
    //
    tiledMapRectArray           : [],   //地图rect数组，存储瓦片的rect信息
    tiledMapLeaveArray          : [],   //地图映射数组，存储瓦片的占用状态，有无棋子等等
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    arrayFriendsSurvivalChess   : [],   //black Array
    arrayEnemySurvivalChess     : [],   //white Array
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    arraySummonLayerInMap       : [],   //临时-召唤区域layer数组
    arrayMoveLayerInMap         : [],   //临时-移动区域layer数组
    ctor: function (){
        //数据初始化
        this.campType       = ""; //
        this.tmxBgLayer     = null;
        this.selectChess    = null;
        this.selectHandCardData = null;
        //
        this.tiledMapRectArray  = [];
        this.tiledMapLeaveArray = [];
        //
        this.arrayFriendsSurvivalChess  = [];
        this.arrayEnemySurvivalChess    = [];
        //
        this.arraySummonLayerInMap      = [];
        this.arrayMoveLayerInMap        = [];
        //模拟数据
        this.campType = CampEnemu.BLACK;   //默认黑色持方  >>初始化我方持方//配置
        //地图构造
        this._super(res.chessMap5x5);
        //其他构造
        this.loadTiledMap();        // 初始化部分参数+记录
        this.loadMapRectArray();    // 地图区域 rectArray 构造
        this.loadMapLeaveArray();   // 瓦片地图区域映射
        return true;
    },
    // 瓦片地图区域[二维区域] -old
    loadTiledMap:function () {
        this.setAnchorPoint(0,0);
        this.tmxBgLayer = this.getLayer("bg");
    },
    // 地图rect数组初始化
    loadMapRectArray:function(){
        var tileSizeWidth = this.tmxBgLayer.getMapTileSize().width;     //瓦片宽度
        var tileSizeHeight = this.tmxBgLayer.getMapTileSize().height;   //瓦片高度
        //< * 初始化 * >
        //[进入二层循环 第一层：j为Y轴]
        // for(var j = 0;j< this.tmxMap.getMapSize().height;j++) {
        for(var j = 0;j< this.getMapSize().height;j++) {
            this.tiledMapRectArray[j] = [];
            //[第二层：i为X轴]
            // for(var i = 0; i< this.tmxMap.getMapSize().width;i++){
            for(var i = 0; i< this.getMapSize().width;i++){
                this.tiledMapRectArray[j][i] = cc.rect(
                    this.x + i * tileSizeWidth,
                    this.y + j * tileSizeHeight,
                    tileSizeWidth,
                    tileSizeHeight
                );
            }
        }
    },
    // 地图映射数组
    loadMapLeaveArray:function(){
        var mapSize = this.getMapSize();
        for (var i = 0; i < mapSize.height; i++) {
            this.tiledMapLeaveArray[i] = [];
            for (var j = 0; j < mapSize.width; j++) {
                this.tiledMapLeaveArray[i][j] = CampEnemu.NONE;//每个瓦片当前的状态为空
            }
        }
    },
    /**
     *  手牌区域-互动方法
     *
     */
    //  <*独立方法*>
    // Card 应该传入UI Node 而不是数据对象
    pickUpCardInHand:function(card){
        cc.log("pickUpCardInHand",card);
        this.selectHandCardData = card;//选中卡
        this.drawMapCurrentSummonLayer();//绘制召唤区域
        this.eventTouchPickUpCardInHandAction(card);
    },

    //选中卡牌
    pickUpDataInHand:function(data){
        cc.log("pickUpCardInHand");
        this.selectHandCardData = data;//选中卡data
        this.drawMapCurrentSummonLayer();//绘制召唤区域
        this.eventTouchPickUpCardInHandAction(data);
    },
    // 取消选中
    cancelPickUpCardInHand:function(){
        cc.log("cancelPickUpCardInHand");
        this.restoreScene();
    },
    /**
     * touch event 用于上层方法传递事件
     * */
    //还原场景      -还原至无选中，无召唤区域，无移动区域
    restoreScene:function(){
        this.removeMapLayerArray();
        //如果有选中棋子-> 还原
        if(this.selectChess != null){
            this.selectChess.pickDown();
            this.selectChess = null;
        }
        //如果 当前所展示的卡
        if(this.selectHandCardData != null){
            // this.selectHandCard.removeFromParent();
            this.selectHandCardData = null;
        }
    },
    //touch event
    onTouchBegan:function (touch,event) {
        // return this.customOnTouchBegan(touch,event);// false 会使点击失败
    },
    onTouchMoved:function (touch,event) {
        // this.cunstomOnTouchMoved(touch,event);
    },
    onTouchEnded:function (touch,event) {
        var self = (event === undefined)? this : event.getCurrentTarget();  //当前主体
        var posInNode = self.convertToNodeSpace(touch.getLocation());       //在当前node中 点击位置
        var rect = cc.rect(0,0,self.width,self.height); //在当前坐标系中允许点击的范围
        //点击在棋盘外-执行取消操作
        if(!(cc.rectContainsPoint(rect,posInNode))){    //判断是否在允许的点击范围内
            self.restoreScene();//还原操作
            self.eventClickOutside();
            return false;//不合法直接return
        }
        //点击在棋盘内
        var result = self.getInfoFromMapByPos(posInNode.x, posInNode.y);//根据posInNode 获取瓦片信息
        if (result.isInMap) {// 触摸到地图区域内
            // XCLog("leaveList:",self.tiledMapLeaveArray);//格式化打印棋盘状态
            //是否点击空白区域
            if(self.tiledMapLeaveArray[result.cel][result.row] == CampEnemu.NONE){
                //召唤区域已展开&手上拿着牌--<配置 其实这里是发动牌>
                if(self.arraySummonLayerInMap.length > 0 && self.selectHandCardData != null){
                    cc.log("召唤牌");
                    if(self.resultContainsSummonLayer(result)){//点击在召唤Layer
                        //获取映射情况
                        var campType = self.tiledMapLeaveArray[result.cel][result.row];//取出目标区域映射
                        if(campType !== CampEnemu.NONE){
                            cc.log("有棋子，无法召唤召唤");
                        }else{
                            cc.log("无棋子，召唤条件满足",self.selectHandCardData);
                            //目标数据
                            let data = self.selectHandCardData;
                            //发起召唤-召唤条件判断
                            if(self.eventTouchSummonChessStartAction(data)){//召唤其他判断-这里是给上层做法力值判断
                                self.joinPiecesInChess(data,result);//加入到棋盘中
                                self.eventTouchSummonChessEndAction(2,data);//召唤棋子结束回调
                            }
                        }
                    }
                    self.restoreScene();//还原操作
                    this.eventTouchBlankAction();//发出回调
                    return false;
                }
                //<移动范围已展开>
                if(self.arrayMoveLayerInMap.length > 0 && self.selectChess != null){
                    cc.log("移动棋子");
                    if(self.resultContainsMoveLayer(result)){
                        if(self.selectChess.currentMoveTimes >= 1){
                            var layerRect = self.tiledMapLeaveArray[result.cel][result.row];//取出目标区域映射
                            if(layerRect == CampEnemu.BLACK){//目标区域有黑方棋子，不允许落子
                                cc.log("目标区域有我方棋子，不允许落子");
                                // this.eventTouchMoveChessAction(0);//发出回调
                            }else if(layerRect == CampEnemu.WHITE){//"目标区域有对方棋子，不允许落子"
                                cc.log("目标区域有对方棋子，不允许落子");
                                // this.eventTouchMoveChessAction(1);//发出回调
                            }else{//CampEnemu.NONE //目标区域无棋子，允许落子"
                                cc.log("目标区域无棋子，允许落子：",layerRect);
                                self.movePiecesInChess(self.selectChess,result);
                                XCLog("leaveList:",self.tiledMapLeaveArray);
                                // this.eventTouchMoveChessEndAction(2,chess);
                            }
                        }else{
                            this.eventTouchChessMoveFailAction();//发出开始移动的失败的回调
                        }
                    }
                    self.restoreScene();//还原操作
                    this.eventTouchBlankAction();//发出回调
                    return false;
                }
                self.restoreScene();//还原操作
                this.eventTouchBlankAction();//发出回调
                return false;
            }
            else{//未点击空白区域
                if(self.selectChess != null && self.selectChess !== undefined ){
                    self.restoreScene();//还原操作
                    self.eventTouchChessAction(-1);
                    return;
                }
                self.restoreScene();//还原操作
                let currentChess = self.pickUpChessInMapPoint(posInNode);//根据posInNode获得当前选中棋子
                if(currentChess === undefined) {
                    cc.log("【warn!!!】未点击空白区域，但无棋子，逻辑有问题！！！");
                    return ;//无棋子直接结束//如果能到这里说明前面判断逻辑有漏洞
                }
                // //能到这里说有棋子
                currentChess.pickUp();//选中当前棋子
                self.selectChess = currentChess;//选中
                switch (currentChess.pieceType) {
                    case PieceTypeEnemu.BASE:
                        cc.log("点击基础棋子！暂无内容");
                        break;
                    case PieceTypeEnemu.BUILDING:
                        cc.log("点击建筑棋子！展开召唤区域");
                        self.drawMapCurrentSummonLayer();
                        self.eventTouchChessAction(1,currentChess);
                        break;
                    case PieceTypeEnemu.MONSTER:
                        cc.log("点击怪物棋子！展开移动范围");
                        self.drawChessMovingLayer(currentChess);
                        self.eventTouchChessAction(1,currentChess);
                        break;
                }
            }
        }
    },
    //判断是否在召唤区域中
    resultContainsSummonLayer:function(result){
        for(var  i = 0 ,len = this.arraySummonLayerInMap.length; i < len ; i++){
            let pos = this.arraySummonLayerInMap[i].pos;//获取瓦片位置
            if(result.cel == pos.x && result.row == pos.y){//说明同一个瓦片
                return true;
            }
        }
        return false;
    },
    //判断是否在移动区域中
    resultContainsMoveLayer:function(result){
        for(var  i = 0 ,len = this.arrayMoveLayerInMap.length; i < len ; i++){
            let pos = this.arrayMoveLayerInMap[i].pos;//获取瓦片位置
            let hasPiece = this.arrayMoveLayerInMap[i].hasPiece;
            if(hasPiece){//如果有棋子，直接调入下一步
                continue;
            }
            if(result.cel == pos.x && result.row == pos.y){//说明同一个瓦片
                return true;
            }
        }
        return false;
    },
    //绘制当前召唤区域
    drawMapCurrentSummonLayer:function(){
        var result = [];
        cc.log("drawMapCurrentSummonLayer",this.arrayFriendsSurvivalChess.length,this.arrayFriendsSurvivalChess);
        // < 三层循环：>
        // < 循环体一：遍历友方棋子 ->获得所有友方棋子的可召唤位置list >
        for (var i = 0 ,len = this.arrayFriendsSurvivalChess.length; i < len;i++ ){
            let chess = this.arrayFriendsSurvivalChess[i];
            let ranges = chess.getSummonRange();//获取召唤区域
            // < 循环体二：遍历召唤位置list中的单格 >
            for (var j = 0,rangesLen = ranges.length; j < rangesLen ; j++){
                let rang = ranges[j];//获取召唤单格
                let isAllow = true;//默认允许加入
                // < 循环体三：1.遍历每当前结果list中是否重复 >
                //重复判断：
                for ( var r = 0,resultLen = result.length ; r < resultLen ;r++){
                    let hasRang = result[r];//<>
                    if(hasRang.posInMap.x == rang.x && hasRang.posInMap.y == rang.y ){
                        isAllow = false;
                        break;//相同则j++，跳出第3循环
                    }
                }
                //如果已经不合法了，直接跳过本次循环
                if(!isAllow){
                    continue;
                }
                // < 判断目标位置 是否存在棋子 >
                var leave = this.tiledMapLeaveArray[rang.x][rang.y];
                if(leave == CampEnemu.BLACK || leave == CampEnemu.WHITE){
                    isAllow = false;
                }
                //true，加入result
                if(isAllow){
                    result.push({isAllow:true, posInMap:{x:rang.x, y:rang.y}});
                }
            }
        }
        this.drawMapLayerArray(result,EnemuOtherLayer.SUMMON);
    },
    //绘制目标移动区域
    drawChessMovingLayer:function(chess){
        var result = [];
        var mappings = chess.getMovingRange();//获得移动区域
        // 过滤目标映射中，已含棋子的映射，将其标记，并返回// mappings目标格坐标list
        for( var i = 0 ; i < mappings.length ; i++ ){
            // < 判断 目标位置 -有无存活我方棋子 >
            var isSureChess = false;
            // < 利用映射 判断目标位置 是否存在棋子 >
            var leave = this.tiledMapLeaveArray[mappings[i].x][mappings[i].y];
            if( leave == CampEnemu.BLACK || leave == CampEnemu.WHITE ){
                isSureChess = true;
            }
            // 通过增量 计算得出映射 将映射传递
            result.push({   isAllow:!isSureChess,
                            posInMap:{
                                x:mappings[i].x,
                                y:mappings[i].y
                            }
                        });
        }
        this.drawMapLayerArray(result,EnemuOtherLayer.MOVE);
    },
    //绘制layer
    drawMapLayerArray:function(array,layerType ){
        //绘制
        for(var i = 0;i<array.length;i++){
            let pos = array[i].posInMap; //获取映射
            //要注意这里是x-y相反
            let rect = this.tiledMapRectArray[pos.y][pos.x];//通过映射获取rect
            let userColor = array[i].isAllow?ALLOWPLACE_COLOR:NOT_ALLOWPLACE_COLOR;
            var layer = new cc.LayerColor(userColor,
                // this.tmxMap.getTileSize().width,
                // this.tmxMap.getTileSize().height);
                this.getTileSize().width,
                this.getTileSize().height);
            layer.setPosition(rect.x,rect.y);
            if(layerType == EnemuOtherLayer.MOVE){
                this.arrayMoveLayerInMap.push({layer:layer,pos:pos,hasPiece:!array[i].isAllow});
            }
            else if(layerType == EnemuOtherLayer.SUMMON){
                this.arraySummonLayerInMap.push({layer:layer,pos:pos,hasPiece:!array[i].isAllow});
                layer.setColor(COLOR_ALLOWSUMMON);//修改颜色
            }
            this.addChild(layer,LAYER_LOCAL_ZORDER);
        }
    },
    //移除layer ->summon ->move
    removeMapLayerArray:function(layerType){
        //移除绘制
        if(layerType === undefined || layerType == EnemuOtherLayer.ALL || layerType == EnemuOtherLayer.MOVE){
            for(var i = 0;i< this.arrayMoveLayerInMap.length;i++){
                var layer = this.arrayMoveLayerInMap[i].layer;
                layer.removeFromParent();
            }
            this.arrayMoveLayerInMap = [];
        }
        if(layerType === undefined || layerType == EnemuOtherLayer.ALL || layerType == EnemuOtherLayer.SUMMON){
            for(var i = 0;i< this.arraySummonLayerInMap.length;i++){
                var layer = this.arraySummonLayerInMap[i].layer;
                layer.removeFromParent();
            }
            this.arraySummonLayerInMap = [];
        }
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
        //<* 这里仅判断了我方数组 *>//<* 这里仅判断了我方数组 *>//<* 这里仅判断了我方数组 *>//<* 这里仅判断了我方数组 *>
        //<* 未来需要改进 *>//<* 未来需要改进 *>//<* 未来需要改进 *>//<* 未来需要改进 *>//<* 未来需要改进 *>//<* 未来需要改进 *>
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
    // 根据坐标获取在地图中的信息 返回所点击的瓦片信息
    getInfoFromMapByPos : function(x, y){
        cc.assert(y !== undefined, "GPMainLayer.getInfoFromMapByPos(): Y坐标不能为空！");
        var isInMap = false;
        var index = {x : -1, y : -1};
        var rect = null;
        for (var i = 0; i < this.tiledMapRectArray.length; i++) {
            for (var j = 0; j < this.tiledMapRectArray[i].length; j++) {
                rect = this.tiledMapRectArray[i][j];
                if (cc.rectContainsPoint(rect, cc.p(x, y)))
                {
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
    },
    /**
     * Custom 自定义虚函数 用于重写or回调
     * */
    //触摸事件 - 召唤棋子开始回调 - 用户判断发起召唤
    //***
    eventTouchSummonChessStartAction:function(data){
        cc.log("无继承 发起召唤 失败");
        return false;
    },
    //触摸事件 - 点击空白回调
    //***
    eventTouchChessAction:function(state){
        cc.log("无继承 ",state);     //state -1 意味着取消点击，其他则是PieceTypeEnemu
    },
    //***触摸事件 -手牌中选中手牌
    eventTouchPickUpCardInHandAction:function (chess) {
        cc.log("无继承，选中牌",chess);
    },


    //触摸事件 - 召唤棋子结束回调
    eventTouchSummonChessEndAction:function(state){
    },
    //触摸事件 - 棋子移动失败
    eventTouchChessMoveFailAction:function(){
        cc.log("无继承 棋子移动失败，移动次数用尽");
    },
    //触摸事件 - 棋子移动结束回调
    eventTouchMoveChessEndAction:function(state){
    },
    //触摸事件 - 点击空白回调
    eventTouchBlankAction:function(){
        cc.log("无继承 点击棋盘空白处");
    },

    eventClickOutside:function(){
        cc.log("无继承 点击棋盘外");
    },
    /**
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  棋子相关
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     */
    //  <*独立方法*>
    // 初始化棋盘 -水晶/国王
    //还在修改中
    initGameCrystal:function () {
        cc.log("待修改");
        //模拟移动结果//由配置决定
        let selfResult = {isInMap:true,cel:4,row:0,x:200,y:0};
        let otherResult = {isInMap:true,cel:4,row:8,x:200,y:400};//由配置决定
        //我方
        let king = UIBasePiece.initPiece(ChessTypeEnemu.CRYSTAL);
        king.campType = CampEnemu.BLACK;
        this.operatePieceInCheckerboard("summon",king,ChessAnimeEnemu.FADEIN,selfResult);
        //敌方
        let dKing = UIBasePiece.initPiece(ChessTypeEnemu.BLACK_CRYSTAL);
        dKing.campType = CampEnemu.WHITE;
        this.operatePieceInCheckerboard("summon",dKing,ChessAnimeEnemu.FADEIN,otherResult);
    },
    /**
     * operatePieceInCheckerboard 操作棋子在甲板上
     * type     操作类型 0join 1move
     * piece    需要移动的棋子
     * animType 动画类型 ChessAnimeEnemu
     * result   需要执行的结果（多为结构体直接包含）
     * */
    operatePieceInCheckerboard:function (type,piece,animType,result) {
        piece.pickDown();//本身先还原//防止存在放大、染色等
        //棋格位置
        let oldLoc = piece.mapPos;
        let newLoc = {x:result.cel,y:result.row};
        //计算位置
        let size = this.getTileSize(); //50
        let rect = this.tiledMapRectArray[result.row][result.cel];//
        let pLoc = cc.p(rect.x + piece.anchorX * size.width, rect.y + piece.anchorY * size.height);

        piece.setMapPos(newLoc.x,newLoc.y);
        this.tiledMapLeaveArray[newLoc.x][newLoc.y] = piece.campType;//映射地图
        piece.runAnimaTypeAction(animType,pLoc);//动画执行
        piece.setLocalZOrder(LocalZorderEnemu.CHESS -1 - piece.mapPos.y);//渲染层级修改
        switch (type) {
            case EnemuPieceOperate.SUMMON:
                this.addChild(piece,LocalZorderEnemu.CHESS);//加入到棋盘中
                this.pieceJoinCamp(piece); //修改阵营
                break;
            case EnemuPieceOperate.MOVE:
                this.tiledMapLeaveArray[oldLoc.x][oldLoc.y] = CampEnemu.NONE;
                piece.currentMoveTimes--;
                break;
            default:
                break;
        }
    },
    //棋子加入棋盘 -多用于召唤
    joinPiecesInChess:function(data,result){
        let piece = new UIPieceMonster(data);
        piece.campType = this.campType;// <配置 ***  这里可能逻辑有问题>
        this.operatePieceInCheckerboard("summon",piece,ChessAnimeEnemu.FADEIN,result);
    },
    //
    movePiecesInChess:function (piece,result) {
        this.operatePieceInCheckerboard("move",piece,ChessAnimeEnemu.MOVE,result);
    },
    //阵营修改-以后可能存在其他阵营:类似中立，类似抢夺等等
    pieceJoinCamp:function (piece) {
        switch (piece.campType) {
            case CampEnemu.BLACK :
                this.arrayFriendsSurvivalChess.push(piece);//加入队友棋子
                break;
            case CampEnemu.WHITE :
                this.arrayEnemySurvivalChess.push(piece);
                break;
            default:
                this.arrayFriendsSurvivalChess.push(piece);
                break;
        }
    },


    /**
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  棋盘相关
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     */

    returnRandomPleace:function (){
        // XCLog("leaveList:",self.tiledMapLeaveArray);//格式化打印棋盘状态
        XCLog("tiledMapRectArray",this.tiledMapRectArray);
        XCLog("tiledMapLeaveArray",this.tiledMapLeaveArray);
        XCLog("arrayFriendsSurvivalChess",this.arrayFriendsSurvivalChess);
        XCLog("arrayEnemySurvivalChess",this.arrayEnemySurvivalChess);
    },
});
