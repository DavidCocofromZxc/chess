


/*
* 专用棋子类
* */

/**
 *
 *  棋子基础类
 *
 * */

//移动方向枚举
var DirectionEnemu = {
    up:0,
    down:1,
    left:2,
    right:3,

    upLeft:4,
    downLeft:5,
    upRight:6,
    downRight:7,
};

//召唤状态
var SummoningStateEnemu = {
    inHand:0,
    inCheckerboard:1,
};

//棋子出现动画类型
var ChessAnimeEnemu = {

    MOVE     :"move",    // 移动进入
    FADEIN   :"FADEIN",  // 淡出
};

var GWPiece = cc.Sprite.extend({

    pieceType       : PieceTypeEnemu.BASE,  //棋子类型：基础,野兽
    campType        : CampEnemu.UNKNOWN,


    //other
    moveRecord      :[],   //对棋子移动情况的记录
    chessType       :"",   //枚举类型       //类似chessid
    campColor       :"",   //持方           //颜色和持方


    // chessInMapX     :0,
    // chessInMapY     :0,
    mapPos          :{x:0,y:0},


    _isPickUp       :false,//当前到选中状态
    //<<<<<<<<<<<<<<<<< 国王骰 >>>>>>>>>>>>>>>>>>>>>>
    chessID         :-99999,

    movingDistance  :1,//移动范围
    movingDirection :[1,1,1,1,0,0,0,0],//移动8方向

    summonDistance  :1,//召唤范围
    summonDirection :[1,1,1,1,0,0,0,0],//召唤8方向

    StateSummoning  :SummoningStateEnemu.inHand,        //召唤状态（当前在手中、还是在棋盘上、未来可能有更多分类）
    enlargeCoefficient:1.1,                             //缩放比例

    defultColor     :null,                              //默认颜色，用于取消选中时找回
    myCard          :null,      //用于跟踪卡

    //这里用fileName构造
    ctor: function (fileName,rect,rotated) {
        this._super(fileName,rect,rotated);
        this.defultColor = this.getColor();//记录原始颜色
        return;
    },

    // initPiece:function(chessID){
    //
    //     var piece = null;
    //     var pieceName = "";
    //
    //     if(chessID >= 0){
    //         if(chessID < 20000 ){//基础棋子类
    //             pieceName = res.crystal;
    //             piece = new GWBuilding(pieceName);
    //         }else{//怪物棋子类
    //             switch (chessID) {
    //                 case 20001:
    //                     pieceName = "26";
    //                     break;
    //                 default:
    //                     break;
    //             }
    //             piece = new GWMonster(pieceName);
    //         }
    //     }else {
    //         console.log("棋子创建异常");
    //     }
    //     return piece;
    // },


    /**
     *  操作fun
     *
     * */

    //选中棋子
    pickUp:function(){
        this.setScale(this.enlargeCoefficient);
        this.setOpacity(220);
        // this.setColor(cc.color(166,174,209));
        this.setColor(cc.color(241,234,219));
        this._isPickUp = true;
    },

    //放下棋子
    pickDown:function(){
        this.setColor(this.defultColor);
        this.setScale(1.0);
        this.setOpacity(255);
        this._isPickUp = false;
    },


    //可移动区域
    //获得可移动点数组
    getMovingRange:function(){
        var incrementValue = [];
        var selfpoint = this.mapPos;//{x:this.chessInMapX,y:this.chessInMapY};//当前位置
        //距离 （移动格数）
        for (var i = 1;i <= this.movingDistance ; i++){
            //方向
            for (var j = 0; j < this.movingDirection.length ; j ++){
                var tagretX = 0;
                var tagretY = 0;
                //如果方向规则不同意
                if(!this.movingDirection[j]){
                    break;
                }
                switch (j) {
                    case DirectionEnemu.up:
                        tagretY += i;
                        break;
                    case DirectionEnemu.down:
                        tagretY -= i;
                        break;
                    case DirectionEnemu.left:
                        tagretX -= i;
                        break;
                    case DirectionEnemu.right:
                        tagretX += i;
                        break;
                    case DirectionEnemu.upLeft:
                        tagretX -= i;
                        tagretY += i;
                        break;
                    case DirectionEnemu.downLeft:
                        tagretX -= i;
                        tagretY -= i;
                        break;
                    case DirectionEnemu.upRight:
                        tagretX += i;
                        tagretY += i;
                        break;
                    case DirectionEnemu.downRight:
                        tagretX += i;
                        tagretY -= i;
                        break;
                    default:
                        break;
                }
                var x = tagretX + selfpoint.x;
                var y = tagretY + selfpoint.y;
                if(x < 0 || x > 8 || y < 0 || y > 8 ){
                    continue;
                }else{
                    incrementValue.push({x:x,y:y});
                }
            }
        }
        return incrementValue;
    },



    //可召唤区域
    //获得可召唤点
    getSummonRange:function(){
        var incrementValue = [];
        var selfpoint = this.mapPos;//{x:this.chessInMapX,y:this.chessInMapY};//当前位置
        //距离 （移动格数）
        for (var i = 1;i <= this.summonDistance ; i++){
            //方向
            for (var j = 0; j < this.summonDirection.length ; j ++){
                var tagretX = 0;
                var tagretY = 0;
                //如果方向规则不同意
                if(!this.summonDirection[j]){
                    break;
                }
                switch (j) {
                    case DirectionEnemu.up:
                        tagretY += i;
                        break;
                    case DirectionEnemu.down:
                        tagretY -= i;
                        break;
                    case DirectionEnemu.left:
                        tagretX -= i;
                        break;
                    case DirectionEnemu.right:
                        tagretX += i;
                        break;
                    case DirectionEnemu.upLeft:
                        tagretX -= i;
                        tagretY += i;
                        break;
                    case DirectionEnemu.downLeft:
                        tagretX -= i;
                        tagretY -= i;
                        break;
                    case DirectionEnemu.upRight:
                        tagretX += i;
                        tagretY += i;
                        break;
                    case DirectionEnemu.downRight:
                        tagretX += i;
                        tagretY -= i;
                        break;
                    default:
                        break;
                }
                var x = tagretX + selfpoint.x;
                var y = tagretY + selfpoint.y;
                if(x < 0 || x > 8 || y < 0 || y > 8 ){
                    continue;
                }else{
                    incrementValue.push({x:x,y:y});
                }
            }
        }
        return incrementValue;
    },


    //获取棋子移动规则
    // getChessMoveMobile:function(){

        /*
        *  这里的循环大小 7、8应该要通过map获得
        * */

        // var incrementValue = [];
        // var selfpoint = {x:this.chessInMapY,y:this.chessInMapX};//当前位置
        // //步法规则
        // //黑兵
        // if(this.chessType == ChessTypeEnemu.PAWN  && this.campColor == CampEnemu.BLACK ){
        //     incrementValue = [{x:0,y:1},{x:0,y:2}];
        // }//白兵
        // else if(this.chessType == ChessTypeEnemu.PAWN  && this.campColor == CampEnemu.WHITE ){
        //     incrementValue = [{x:0,y:-1},{x:0,y:-2}];
        // }//骑士
        // else if(this.chessType == ChessTypeEnemu.KNIGHT){
        //     incrementValue = [  {x:1,y:2},{x:1,y:-2},{x:-1,y:2},{x:-1,y:-2},
        //         {x:2,y:1},{x:-2,y:1},{x:2,y:-1},{x:-2,y:-1}];
        // }//主教
        // else if(this.chessType == ChessTypeEnemu.BISHOP){
        //     incrementValue = [{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}];
        //     for(var i = 2; i < 8 ; i ++){
        //         for(var j = 0 ; j < 4  ;j ++){
        //             var resuPoint = selfpoint;
        //             resuPoint = incrementValue[j];
        //             resuPoint = {x:resuPoint.x * i ,y:resuPoint.y * i };
        //             incrementValue.push(resuPoint);
        //         }
        //     }
        // }
        // //车
        // else if(this.chessType == ChessTypeEnemu.ROOK){
        //     incrementValue = [{x:0,y:1},{x:0,y:-1},{x:-1,y:0},{x:1,y:0}];
        //     for(var i = 2; i < 8 ; i ++){
        //         for(var j = 0 ; j < 4  ;j ++){
        //             var resuPoint = selfpoint;
        //             resuPoint = incrementValue[j];
        //             resuPoint = {x:resuPoint.x * i ,y:resuPoint.y * i };
        //             incrementValue.push(resuPoint);
        //         }
        //     }
        // }
        // //王
        // else if(this.chessType == ChessTypeEnemu.KING){
        //     incrementValue = [  {x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},
        //         {x:0,y:1},{x:0,y:-1},{x:-1,y:0},{x:1,y:0}];
        // }
        // //后
        // else if(this.chessType == ChessTypeEnemu.QUEEN){
        //     incrementValue = [  {x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},
        //         {x:0,y:1},{x:0,y:-1},{x:-1,y:0},{x:1,y:0}];
        //     for(var i = 2; i < 8 ; i ++){
        //         for(var j = 0 ; j < 8  ;j ++){
        //             var resuPoint = selfpoint;
        //             resuPoint = incrementValue[j];
        //             resuPoint = {x:resuPoint.x * i ,y:resuPoint.y * i };
        //             incrementValue.push(resuPoint);
        //         }
        //     }
        // }
        //
        // //在此之前只需要给出增量
        // var result = [];
        //
        // //遍历判断是否超出屏幕，如果超出屏幕则不计入result
        // for (var i = 0 ;i <incrementValue.length ; i++){
        //
        //     var x = incrementValue[i].x + selfpoint.x;
        //     var y = incrementValue[i].y + selfpoint.y;
        //     if(x < 0 || x > 7 || y < 0 || y > 7 ){
        //         continue;
        //     }else{
        //         result.push(incrementValue[i]);
        //     }
        // }
        // return  result;
    // },




    setMapPos:function(pos,y){
        var movePos = {x:0,y:0};
        if( y === undefined){
            movePos = pos;
        }else{
            movePos.x = pos;
            movePos.y = y;
        }
        // this.chessInMapX
        this.mapPos = movePos;
    },



    // // 移动棋子在Map中到pos位置
    // moveInMap:function(pos,y){
    //     this.pickDown();
    //     var movePos = {x:0,y:0};
    //     if( y === undefined){
    //         movePos = pos;
    //     }else{
    //         movePos.x = pos;
    //         movePos.y = y;
    //     }
    //     //本次增量
    //     let inx = movePos.x - this.mapPos.x;
    //     let iny = movePos.y - this.mapPos.y;
    //
    //
    //
    //     //50
    //     var size = 50;//MAPSH.getTileSize();
    //     var duration = 0.5;//以后做成系统配置
    //     var rect = this.parent.tiledMapRectArray[movePos.y][movePos.x];
    //     var p = cc.p(
    //         rect.x + this.anchorX * size.width,
    //         rect.y + this.anchorY * size.height)
    //     var move = cc.moveTo(duration,p);
    //     this.runAction(move);
    //
    //
    //     //粒子效果
    //     // var name = "res/Chess/Particle/blackFire2.plist";
    //     // if(this.campColor == CampEnemu.WHITE){
    //     //     name = "res/Chess/Particle/blackFire3.plist";
    //     // }
    //     //
    //     // var particle2 = new cc.ParticleSystem(name);
    //     // this.addChild(particle2);
    //     // particle2.duration = duration;
    //     // particle2.setPosition(this.width/2,this.height/2);
    //
    //
    //
    //     //渲染层级
    //     var localZor = LocalZorderEnemu.CHESS;
    //     switch (iny) {
    //         case 0:
    //             localZor = LocalZorderEnemu.CHESS0;
    //             break;
    //         case 1:
    //             localZor = LocalZorderEnemu.CHESS1;
    //             break;
    //         case 2:
    //             localZor = LocalZorderEnemu.CHESS2;
    //             break;
    //         case 3:
    //             localZor = LocalZorderEnemu.CHESS3;
    //             break;
    //         case 4:
    //             localZor = LocalZorderEnemu.CHESS4;
    //             break;
    //         case 5:
    //             localZor = LocalZorderEnemu.CHESS5;
    //             break;
    //         case 6:
    //             localZor = LocalZorderEnemu.CHESS6;
    //             break;
    //         case 7:
    //             localZor = LocalZorderEnemu.CHESS7;
    //             break;
    //         case 8:
    //             localZor = LocalZorderEnemu.CHESS8;
    //             break;
    //         default:
    //             break;
    //     }
    //     this.setLocalZOrder(localZor);
    //
    //     // this.chessInMapX = movePos.x;
    //     // this.chessInMapY = movePos.y;
    //     this.mapPos = movePos;
    // },




    // //加入到棋盘中某位置
    // joinInMap:function (pos,y,animType) {
    //     this.pickDown();
    //     //棋盘坐标
    //     var movePos = {x:0,y:0};
    //     if( y === undefined){
    //         movePos = pos;
    //     }else{
    //         movePos.x = pos;
    //         movePos.y = y;
    //     }
    //     //50
    //     var size = MAPSH.getTileSize();
    //     var rect = this.parent.tiledMapRectArray[movePos.y][movePos.x];
    //     //获得位置
    //     var p = cc.p(   rect.x + this.anchorX * size.width,
    //                     rect.y + this.anchorY * size.height)
    //     //
    //     var duration = 0.5;
    //     //移动进入
    //     var move = null ;
    //     //
    //     if(animType == ChessAnimeEnemu.FADEIN){
    //         this.setOpacity(0);
    //         this.setPosition(p);
    //         move = cc.fadeIn(duration * 3)
    //         //particle_blackFire
    //         var particleA = new cc.ParticleSystem(res.particle_blackFire);
    //         this.addChild(particleA,999);
    //
    //         particleA.setAnchorPoint(0.5,0.5);
    //         particleA.setPosition(this.width/2, this.height/2 -10);
    //     }else{//默认move进入
    //         move = cc.moveTo(duration, p);
    //     }
    //     this.runAction(move);
    //
    //     //渲染层级
    //     var localZor = LocalZorderEnemu.CHESS;
    //     switch ( movePos.y) {
    //         case 0:
    //             localZor = LocalZorderEnemu.CHESS0;
    //             break;
    //         case 1:
    //             localZor = LocalZorderEnemu.CHESS1;
    //             break;
    //         case 2:
    //             localZor = LocalZorderEnemu.CHESS2;
    //             break;
    //         case 3:
    //             localZor = LocalZorderEnemu.CHESS3;
    //             break;
    //         case 4:
    //             localZor = LocalZorderEnemu.CHESS4;
    //             break;
    //         case 5:
    //             localZor = LocalZorderEnemu.CHESS5;
    //             break;
    //         case 6:
    //             localZor = LocalZorderEnemu.CHESS6;
    //             break;
    //         case 7:
    //             localZor = LocalZorderEnemu.CHESS7;
    //             break;
    //         case 8:
    //             localZor = LocalZorderEnemu.CHESS8;
    //             break;
    //         default:
    //             break;
    //     }
    //     this.setLocalZOrder(localZor);
    //
    //     this.StateSummoning = SummoningStateEnemu.inCheckerboard;//召唤状态
    //     // this.chessInMapX = movePos.x;
    //     // this.chessInMapY = movePos.y;
    //     this.mapPos = movePos;
    // },






    // setChessInMapY:function (value) {
    //
    // },

    lookUpCard:function () {
        // this.addChild(Card);
        // Card.setPosition(0,0);
    },
    showCard:function () {
        if(this.myCard == null){
            this.myCard = new GWCard();
        }
        return this.myCard;
    }



});



//工厂模式-
//根据ID去分拣类
//0-20000为建筑棋子，20000以上为怪物棋子
GWPiece.initPiece = function(chessID){

    var piece = null;
    var pieceName = "";

    //通过id进行Data绑定
    //需要完成 ：构造，data绑定，图片的Anchor
    if(chessID >= 0){
        if(chessID < 20000 ){//基础棋子类
            //
            pieceName = "res/piece/building/"+ chessID + ".png";  //水晶//res.crystal;
            //
            piece = new GWBuilding(pieceName);
            piece.setAnchorPoint(0.5,0);//默认修改瞄点





        }else{//怪物棋子类
            switch (chessID) {
                case 20001:
                    pieceName = "26";
                    break;
                default:
                    break;
            }
            piece = new GWMonster(pieceName);
        }
    }else {
        console.log("棋子创建异常");
    }
    return piece;
};
