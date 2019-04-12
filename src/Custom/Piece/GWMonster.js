


/**
 *
 *  棋子类 ->怪物棋子类
 *
 * */


//专用的怪物类

var GWMonster = GWPiece.extend({



    framesUp        : [],
    framesDown      : [],
    framesLeft      : [],
    framesRight     : [],
    framesDefult    : [],


    ctor: function (chessID,fileName,rect,rotated) {


        //
        // var fileName = "";
        // //
        // switch (chessID) {
        //     case ChessTypeEnemu.CRYSTAL:
        //         fileName = res.crystal;
        //         break;
        //     default:
        //         break;
        // }



        var monsterName = "";

        if(chessID >= 0){
            if(chessID < 20000 ){//基础棋子类

            }else{//怪物棋子类


                switch (chessID) {
                    case 20001:
                        monsterName = "26";
                        break;
                    default:
                        break;
                }
            }
        }else {
            console.log("棋子创建异常");
        }



        var monsterFileName = monsterName|"26";
        var plistName = "res/Chess/monster" + monsterFileName + ".plist";
        var pngName = "res/Chess/monster" + monsterFileName + ".png";
        cc.spriteFrameCache.addSpriteFrames(plistName,pngName);


        this._super("#monster" + monsterFileName + "_1.png",rect,rotated);
        this.enlargeCoefficient = 2;//
        this.pieceType = PieceTypeEnemu.MONSTER;
        this.loadAnimation(monsterFileName);

        return true;
    },



    //动画加载
    loadAnimation:function(monsterName){

        var frames          = [];//全动画帧
        var framesUp        = [];//上动画帧
        var framesDown      = [];//下动画帧
        var framesLeft      = [];//左动画帧
        var framesRight     = [];//右动画帧
        var framesDefult    = [];//默认动画帧


        for(var i = 1 ; i <= 20 ; i++){
            var str = "monster" + monsterName + "_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);


            /*
            *   未来需要制定协议
            * */
            switch (i) {
                case 1: case 2: case 3: case 4:
                    framesUp.push(frame);
                    break;
                case 5: case 6: case 7: case 8:
                    framesDown.push(frame);
                    break;
                case 9: case 10:case 11:case 12:
                    framesLeft.push(frame);
                    break;
                case 13:case 14:case 15:case 16:
                    framesRight.push(frame);
                    break;
                case 17:case 18:case 19:case 20:
                    framesDefult.push(frame);
                    break;
            }
        }

        this.framesUp = framesUp;
        this.framesDown = framesDown;
        this.framesLeft = framesLeft;
        this.framesRight = framesRight;
        this.framesDefult = framesDefult;


        //播放默认动画
        var animation = new cc.Animation(framesDefult,0.3);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation).repeatForever();
        this.runAction(animate);
    },




    /*
    *  animates
    * */


    
    doActionUp:function () {
        this.stopAllActions();
        var animation = new cc.Animation(this.framesUp,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation).repeatForever();
        this.runAction(animate);
    },


    doActionDown:function () {
        this.stopAllActions();
        var animation = new cc.Animation(this.framesDown,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation).repeatForever();
        this.runAction(animate);
    },

    doActionLeft:function () {
        this.stopAllActions();
        var animation = new cc.Animation(this.framesLeft,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation).repeatForever();
        this.runAction(animate);
    },

    doActionRight:function () {
        this.stopAllActions();
        var animation = new cc.Animation(this.framesRight,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation).repeatForever();
        this.runAction(animate);
    },

    doActionDefult:function () {
        this.stopAllActions();
        var animation = new cc.Animation(this.framesDefult,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation).repeatForever();
        this.runAction(animate);
    },




});