


/**
 *
 *  棋子类 ->怪物棋子类
 *
 * */


var GWMonster = GWPiece.extend({

    //基础模型
    // model           : null,
    //动画帧
    framesUp        : [],
    framesDown      : [],
    framesLeft      : [],
    framesRight     : [],
    framesDefult    : [],
    // 其他ui参数
    roundMaxMoveTimes      :1, //每回合最大移动次数
    roundMaxAttackTimes    :1, //每回合最大攻击次数
    currentMoveTimes       :0, //当前剩余移动次数
    currentAttackTimes     :0, //当前剩余攻击次数

    ctor: function (model,fileName,rect,rotated) {
        // this.model          = null;
        this.framesUp       = [];
        this.framesDown     = [];
        this.framesLeft     = [];
        this.framesRight    = [];
        this.framesDefult   = [];
        this.roundMaxMoveTimes     = 1;
        this.roundMaxAttackTimes   = 1;
        this.currentMoveTimes      = 0;
        this.currentAttackTimes    = 0;
        // var monsterName = "" //+ chessID;
        // if(model != null || model !== undefined){
        //     monsterName = "" + model.ID;
        //     this.model = model;
        //     this.roundMaxMoveTimes = model.moveTimes;
        //     this.roundMaxAttackTimes = model.attackTimes;
        //     this.currentMoveTimes =  this.roundMaxMoveTimes;
        //     this.currentAttackTimes =  this.roundMaxAttackTimes;
        // }
        // this._super("#monster" + monsterFileName + "_1.png",rect,rotated);

        // if()



        //棋子
        if(model == null || model === undefined){
            this._super(null,res.defaultMonster,rect,rotated);
        }else{
            this._super(model,"res/piece/monster/qz"+model.ID+".png",rect,rotated);
        }
        //部分数据初始化&修改
        this.enlargeCoefficient = 2;//缩放比例//修改父类数据
        this.pieceType = PieceTypeEnemu.MONSTER;
        this.roundMaxMoveTimes = this.model.moveTimes;
        this.roundMaxAttackTimes = this.model.attackTimes;
        this.currentMoveTimes =  this.roundMaxMoveTimes;
        this.currentAttackTimes =  this.roundMaxAttackTimes;
        //动画
        var monsterFileName = "26";
        var plistName = "res/piece/monster" + monsterFileName + ".plist";
        var pngName = "res/piece/monster" + monsterFileName + ".png";
        cc.spriteFrameCache.addSpriteFrames(plistName,pngName);
        this.loadAnimation(monsterFileName);
        return true;
    },


    //怪物移动
    moveInMap:function(pos,y){
        var movePos = {x:0,y:0};
        if( y === undefined){
            movePos = pos;
        }else{
            movePos.x = pos;
            movePos.y = y;
        }
        //本次增量
        let inx = movePos.x - this.mapPos.x;
        let iny = movePos.y - this.mapPos.y;
        //
        if(Math.abs(inx) <= Math.abs(iny)){
            if(iny > 0){//向上
                this.doActionUp();
            }else{//向下
                this.doActionDown();
            }
        }else{
            if(inx > 0){//向左
                this.doActionRight();
            }else{//向右
                this.doActionLeft();
            }
        }
        this.currentMoveTimes --;
        this._super(pos,y);
        // if(this.currentMoveTimes != 0){
        //     this.currentMoveTimes --;
        //     return true;
        // }else{
        //     return false;
        // }
        // this.currentMoveTimes --;
        // if(this)
        // return
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
                case 1: case 2: case 3:
                    framesUp.push(frame);
                    break;
                case 4: case 5: case 6:
                    framesDown.push(frame);
                    break;
                case 7: case 8: case 9:
                    framesLeft.push(frame);
                    break;
                case 10: case 11: case 12:
                    framesRight.push(frame);
                    break;
                case 13: case 14: case 15: case 16:
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
        // var animation = new cc.Animation(framesDefult,0.3);
        // animation.setRestoreOriginalFrame(true);
        // var animate = cc.animate(animation).repeatForever();
        // this.runAction(animate);
    },


    /*
    *  animates
    * */
    doActionUp:function () {
        this.stopAllActions();
        var animation = new cc.Animation(this.framesUp,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);//.repeatForever();
        this.runAction(animate);
    },
    doActionDown:function () {
        this.stopAllActions();
        var animation = new cc.Animation(this.framesDown,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);//.repeatForever();
        this.runAction(animate);
    },
    doActionLeft:function () {
        this.stopAllActions();
        var animation = new cc.Animation(this.framesLeft,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);//.repeatForever();
        this.runAction(animate);
    },
    doActionRight:function () {
        this.stopAllActions();
        var animation = new cc.Animation(this.framesRight,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);//.repeatForever();
        this.runAction(animate);
    },
    doActionDefult:function () {
        this.stopAllActions();
        var animation = new cc.Animation(this.framesDefult,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);//.repeatForever();
        this.runAction(animate);
    },

});
