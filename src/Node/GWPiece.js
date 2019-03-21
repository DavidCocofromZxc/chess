


/*
* 专用棋子类
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



var GWPiece = cc.Sprite.extend({


    pieceType       : PieceTypeEnemu.BASE,  //棋子类型：基础,野兽

    ownerType       : OwnerEnemu.UNKNOWN,   //阵营

    //other

    moveRecord      :[],   //对棋子移动情况的记录

    chessType       :"",   //枚举类型       //类似chessid
    campColor       :"",   //持方           //颜色和持方

    chessInMapX     :0,
    chessInMapY     :0,

    _isPickUp       :false,//当前到选中状态



    //<<<<<<<<<<<<<<<<< 国王骰 >>>>>>>>>>>>>>>>>>>>>>
    movingDistance  :1,//移动范围
    movingDirection :[1,1,1,1,0,0,0,0],//移动8方向

    summonDistance  :1,//召唤范围
    summonDirection :[1,1,1,1,0,0,0,0],//召唤8方向


    defultColor     :null,  //默认颜色，用于取消选中时找回

    StateSummoning  :SummoningStateEnemu.inHand,


    enlargeCoefficient:1.1,





    ctor: function (fileName,rect,rotated) {
        this._super(fileName,rect,rotated);
        this.defultColor = this.getColor();
        return;
    },




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
    getMovingRange:function(){


        var incrementValue = [];
        var selfpoint = {x:this.chessInMapX,y:this.chessInMapY};//当前位置




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
    getSummonRange:function(){


        var incrementValue = [];
        var selfpoint = {x:this.chessInMapX,y:this.chessInMapY};//当前位置




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


    // 移动棋子在Map中到pos位置
    moveInMap:function(pos,y){

        this.pickDown();

        var movePos = {x:0,y:0};
        if( y === undefined){
            movePos = pos;
        }else{
            movePos.x = pos;
            movePos.y = y;
        }

        //本次增量
        let inx = movePos.x - this.chessInMapX;
        let iny = movePos.y - this.chessInMapY;

        let jt = inx > 0 ?"进":"退";
        let zy = iny > 0 ?"右":"左";

        if(inx == 0){
            cc.log("" + this.campColor + " " + this.chessType + zy + Math.abs(iny));
        }else if (iny == 0){
            cc.log("" + this.campColor + " " + this.chessType + jt + Math.abs(inx));
        }else{
            cc.log("" + this.campColor + " " + this.chessType + zy + Math.abs(iny) + "" + jt + Math.abs(inx));
        }


        //50
        var size = MAPSH.getTileSize();

        var duration = 0.5;


        var p = cc.p(
                    this.parent.tiledMapRectArray[movePos.x][movePos.y].x + this.anchorX * size.width,
                    this.parent.tiledMapRectArray[movePos.x][movePos.y].y + this.anchorY * size.height)
        var move = cc.moveTo(duration,p);
        this.runAction(move);



        var name = "res/Chess/Particle/blackFire2.plist";
        if(this.campColor == CampEnemu.WHITE){
            name = "res/Chess/Particle/blackFire3.plist";
        }

        var particle2 = new cc.ParticleSystem(name);
        this.addChild(particle2);
        particle2.duration = duration;
        particle2.setPosition(this.width/2,this.height/2);

        //
        this.chessInMapX = movePos.y;
        this.chessInMapY = movePos.x;

    },


    joinInMap:function (pos,y) {

        this.pickDown();

        var movePos = {x:0,y:0};
        if( y === undefined){
            movePos = pos;
        }else{
            movePos.x = pos;
            movePos.y = y;
        }


        //本次增量
        let inx = movePos.x ;//- this.chessInMapX;
        let iny = movePos.y ;//- this.chessInMapY;

        // let jt = inx > 0 ?"进":"退";
        // let zy = iny > 0 ?"右":"左";
        //
        // if(inx == 0){
        //     cc.log("" + this.campColor + " " + this.chessType + zy + Math.abs(iny));
        // }else if (iny == 0){
        //     cc.log("" + this.campColor + " " + this.chessType + jt + Math.abs(inx));
        // }else{
        //     cc.log("" + this.campColor + " " + this.chessType + zy + Math.abs(iny) + "" + jt + Math.abs(inx));
        // }


        //50
        var size = MAPSH.getTileSize();
        var duration = 0.5;
        cc.log(this.anchorX ,this.anchorY);

        var rect = this.parent.tiledMapRectArray[movePos.y][movePos.x];

        var p = cc.p(   rect.x + this.anchorX * size.width,
                        rect.y + this.anchorY * size.height
                    )

        var move = cc.moveTo(duration,p);
        this.runAction(move);

        this.chessInMapX = inx;
        this.chessInMapY = iny;
    },


});