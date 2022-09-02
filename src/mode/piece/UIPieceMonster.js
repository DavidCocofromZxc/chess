/**
 *
 *  棋子类 ->怪物棋子类
 *
 * */

var UIPieceMonster = UIBasePiece.extend({
    //基础模型
    // model           : null,
    //动画帧
    framesUp        : [],
    framesDown      : [],
    framesLeft      : [],
    framesRight     : [],
    framesDefault    : [],
    // 其他ui参数
    roundMaxMoveTimes      :1, //每回合最大移动次数
    roundMaxAttackTimes    :1, //每回合最大攻击次数
    currentMoveTimes       :0, //当前剩余移动次数
    currentAttackTimes     :0, //当前剩余攻击次数

    ctor: function (model,rect,rotated) {
        // this.model          = null;
        this.framesUp       = [];
        this.framesDown     = [];
        this.framesLeft     = [];
        this.framesRight    = [];
        this.framesDefault   = [];
        this.roundMaxMoveTimes     = 1;
        this.roundMaxAttackTimes   = 1;
        this.currentMoveTimes      = 0;
        this.currentAttackTimes    = 0;
        //棋子
        if(model == null || model === undefined){
            this._super(null,res.qz1001,rect,rotated);
        }
        else{
            let monsterFileName = model.objectId;
            let uName = "res/piece/frame/" + monsterFileName + "_01" + ".png";
            this._super(model,uName,rect,rotated);
        }
        //部分数据初始化&修改
        this.enlargeCoefficient = 2;//缩放比例//修改父类数据
        this.pieceType = PieceTypeEnemu.MONSTER;
        //
        this.roundMaxMoveTimes = this.dataModel.moveTimes;
        this.roundMaxAttackTimes = this.dataModel.attackTimes;
        this.currentMoveTimes =  this.roundMaxMoveTimes;
        this.currentAttackTimes =  this.roundMaxAttackTimes;
        //动画
        let monsterFileName = model.objectId;
        this.loadAnimation(monsterFileName);
        this.doActionUp();
        return true;
    },
    //召唤动画
    summonAnimation:function(point,duration){
        let anim = this._super(point,duration);
        //在棋子中加入粒子动画-以后可以改成，对应棋子有对应的粒子，业务上类似于出场动画的概念
        //获取粒子文件
        let particleA = new cc.ParticleSystem(res.blackFire2xplist);
        this.addChild(particleA,999);//在棋子上加入粒子效果
        particleA.setAnchorPoint(0.5,0.5);
        particleA.setPosition(this.width/2, this.height/2 -10);
        return anim;
    },
    //移动动画
    moveAnimation:function(point,duration){
        cc.log("move  p:(",this.mapPos,")  ->p:(",point,")");
        let anim = this._super(point,duration);
        let a =  this.doActionUp();
        let spawn = cc.spawn(anim,a); 
        return spawn;
    },

    // //怪物移动
    // moveInMap:function(pos,y){
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
    //     //
    //     console.log("in:",inx,iny);
    //     if(Math.abs(inx) <= Math.abs(iny)){
    //         if(iny > 0){//向上
    //             this.doActionUp();
    //         }else{//向下
    //             this.doActionDown();
    //         }
    //     }else{
    //         if(inx > 0){//向左
    //             this.doActionRight();
    //         }else{//向右
    //             this.doActionLeft();
    //         }
    //     }
    //     this.currentMoveTimes --;
    //     this._super(pos,y);
    //     // if(this.currentMoveTimes != 0){
    //     //     this.currentMoveTimes --;
    //     //     return true;
    //     // }else{
    //     //     return false;
    //     // }
    //     // this.currentMoveTimes --;
    //     // if(this)
    //     // return
    // },



    /** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * loadAnimation
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  */
    //动画加载
    loadAnimation:function(monsterName){
        // cc.log("loadAnimation",monsterName);
        var frames          = [];//全动画帧
        var framesUp        = [];//上动画帧
        var framesDown      = [];//下动画帧
        var framesLeft      = [];//左动画帧
        var framesRight     = [];//右动画帧
        var framesDefault    = [];//默认动画帧
        //
        let plistName = "res/piece/frame/" + monsterName + ".plist";
        let pngName = "res/piece/frame/" + monsterName + ".png";
        cc.spriteFrameCache.addSpriteFrames(plistName,pngName);
        //
        for(var i = 1 ; i <= 16 ; i++){
            var char = i;
            if(i < 10){
                char = "0" + i;
            }
            var str = monsterName + "_" + char + ".png";
            cc.log("loadAnimation1:",str);
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            frames.push(frame);
            /*
            *   未来需要制定协议
            * */
            switch (i) {
                case 1: case 2: case 3: case 4:
                    framesDown.push(frame);
                    break;
                case 5: case 6: case 7: case 8:
                    framesLeft.push(frame);
                    break;
                case 9: case 10: case 11: case 12:
                    framesUp.push(frame);
                    break;
                case 13: case 14: case 15: case 16:
                    framesRight.push(frame);
                    break;
                case 1: case 3: 
                    framesDefault.push(frame);
                    break;
            }
        }

        cc.log("loadAnimation2");
        this.framesUp = framesUp;
        this.framesDown = framesDown;
        this.framesLeft = framesLeft;
        this.framesRight = framesRight;
        this.framesDefault = framesDefault;

        cc.log("loadAnimation3:",this);
         //播放默认动画
        // var animation = new cc.Animation(framesDefault,0.3);
        // animation.setRestoreOriginalFrame(true);
        // var animate = cc.animate(animation).repeatForever();
        // this.runAction(animate);
    },
    /*
    *  animates
    * */
    doActionUp:function () {
        console.log("doActionUp");
        // this.stopAllActions();
        var animation = new cc.Animation(this.framesUp,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);//.repeatForever();
        this.runAction(animate);
    },
    //
    doActionDown:function () {
        // this.stopAllActions();
        var animation = new cc.Animation(this.framesDown,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);//.repeatForever();
        this.runAction(animate);
    },
    //
    doActionLeft:function () {
        // this.stopAllActions();
        var animation = new cc.Animation(this.framesLeft,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);//.repeatForever();
        this.runAction(animate);
    },
    //
    doActionRight:function () {
        // this.stopAllActions();
        var animation = new cc.Animation(this.framesRight,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);//.repeatForever();
        this.runAction(animate);
    },
    //
    doActionDefult:function () {
        // this.stopAllActions();
        var animation = new cc.Animation(this.framesDefault,0.4);
        animation.setRestoreOriginalFrame(true);
        var animate = cc.animate(animation);//.repeatForever();
        this.runAction(animate);
    },
});
