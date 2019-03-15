
var Chess = cc.Sprite.extend({

    moveRecord      :[],   //对棋子移动情况的记录

    chessType       :"",   //枚举类型
    campColor       :"",   //持方

    chessInMapX     :0,
    chessInMapY     :0,

    _isPickUp       :false,


    ctor: function (fileName,rect,rotated) {
        this._super(fileName,rect,rotated);

        return true;
    },



    pickUp:function(){
        // cc.log("pickUp",this.campColor,this.chessType);
        // var blink = cc.blink(0.2,1);
        // var scalse =
        // this.runAction(blink);
        this.setScale(1.1);
        this.setOpacity(220);
        this._isPickUp = true;

    },

    pickDown:function(){
        this.setScale(1.0);
        this.setOpacity(255);
        this._isPickUp = false;
    },


    //获取棋子移动规则
    getChessMoveMobile:function(){

        /*
        *  这里的循环大小 7、8应该要通过map获得
        * */

        var incrementValue = [];
        var selfpoint = {x:this.chessInMapY,y:this.chessInMapX};//当前位置
        //步法规则
        //黑兵
        if(this.chessType == ChessTypeEnemu.PAWN  && this.campColor == CampEnemu.BLACK ){
            incrementValue = [{x:0,y:1},{x:0,y:2}];
        }//白兵
        else if(this.chessType == ChessTypeEnemu.PAWN  && this.campColor == CampEnemu.WHITE ){
            incrementValue = [{x:0,y:-1},{x:0,y:-2}];
        }//骑士
        else if(this.chessType == ChessTypeEnemu.KNIGHT){
            incrementValue = [  {x:1,y:2},{x:1,y:-2},{x:-1,y:2},{x:-1,y:-2},
                                {x:2,y:1},{x:-2,y:1},{x:2,y:-1},{x:-2,y:-1}];
        }//主教
        else if(this.chessType == ChessTypeEnemu.BISHOP){
            incrementValue = [{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}];
            for(var i = 2; i < 8 ; i ++){
                for(var j = 0 ; j < 4  ;j ++){
                    var resuPoint = selfpoint;
                    resuPoint = incrementValue[j];
                    resuPoint = {x:resuPoint.x * i ,y:resuPoint.y * i };
                    incrementValue.push(resuPoint);
                }
            }
        }
        //车
        else if(this.chessType == ChessTypeEnemu.ROOK){
            incrementValue = [{x:0,y:1},{x:0,y:-1},{x:-1,y:0},{x:1,y:0}];
            for(var i = 2; i < 8 ; i ++){
                for(var j = 0 ; j < 4  ;j ++){
                    var resuPoint = selfpoint;
                    resuPoint = incrementValue[j];
                    resuPoint = {x:resuPoint.x * i ,y:resuPoint.y * i };
                    incrementValue.push(resuPoint);
                }
            }
        }
        //王
        else if(this.chessType == ChessTypeEnemu.KING){
            incrementValue = [  {x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},
                                {x:0,y:1},{x:0,y:-1},{x:-1,y:0},{x:1,y:0}];
        }
        //后
        else if(this.chessType == ChessTypeEnemu.QUEEN){
            incrementValue = [  {x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},
                                {x:0,y:1},{x:0,y:-1},{x:-1,y:0},{x:1,y:0}];
            for(var i = 2; i < 8 ; i ++){
                for(var j = 0 ; j < 8  ;j ++){
                    var resuPoint = selfpoint;
                    resuPoint = incrementValue[j];
                    resuPoint = {x:resuPoint.x * i ,y:resuPoint.y * i };
                    incrementValue.push(resuPoint);
                }
            }
        }

        //在此之前只需要给出增量
        var result = [];

        //遍历判断是否超出屏幕，如果超出屏幕则不计入result
        for (var i = 0 ;i <incrementValue.length ; i++){

            var x = incrementValue[i].x + selfpoint.x;
            var y = incrementValue[i].y + selfpoint.y;
            if(x < 0 || x > 7 || y < 0 || y > 7 ){
                continue;
            }else{
                result.push(incrementValue[i]);
            }
        }
        return  result;
    },


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


        var size = MAPSH.getTileSize();//50
        //
        // this.x = this.parent.tiledMapRectArray[movePos.x][movePos.y].x + size.width/2;
        // this.y = this.parent.tiledMapRectArray[movePos.x][movePos.y].y + size.height/2;

        // this.moveTo(1,this.parent.tiledMapRectArray[movePos.x][movePos.y].x + size.width/2,this.parent.tiledMapRectArray[movePos.x][movePos.y].y + size.height/2);



        // var particle1 = new cc.ParticleSystem(res.particle1_violet);
        // particle1.duration = 0.5;
        // this.addChild(particle1);
        // particle1.setPosition(this.width/2 ,this.height/2 );
        //
        //
        var duration = 0.5;


        var p = cc.p(this.parent.tiledMapRectArray[movePos.x][movePos.y].x + size.width/2,this.parent.tiledMapRectArray[movePos.x][movePos.y].y + size.height/2)
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
        this.chessInMapX = movePos.x;
        this.chessInMapY = movePos.y;



    },



})
