/**
 *
 *  专用棋子- 棋子基础类
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
//棋子操作执行类型
var EnemuPieceOperate = {
    SUMMON   :"summon",
    MOVE     :"move",
};
//
var UIBasePiece = cc.Sprite.extend({
    pieceType       : PieceTypeEnemu.BASE,  //棋子类型：基础,野兽
    campType        : CampEnemu.UNKNOWN,
    //other
    moveRecord      :[],   //对棋子移动情况的记录
    chessType       :"",   //枚举类型       //类似chessid
    campColor       :"",   //持方           //颜色和持方
    // chessInMapX     :0,
    // chessInMapY     :0,
    mapPos          :{x:0,y:0},
    //
    _isPickUp       :false,//当前到选中状态
    // StateSummoning  :SummoningStateEnemu.inHand,        //召唤状态（当前在手中、还是在棋盘上、未来可能有更多分类）
    enlargeCoefficient:1.1,                             //缩放比例
    //
    defultColor     :null,                              //默认颜色，用于取消选中时找回
    myCard          :null,      //用于跟踪卡
    //
    oldLocalZOrder     :200,//用于棋子记录渲染等级，影响在场景中的覆盖等级
    dataModel       :null,
    //<<<<<<<<<<<<<<<<< 国王骰 data >>>>>>>>>>>>>>>>>>>>>>
    chessID         :-99999,
    movingDistance  :1,//移动范围
    movingDirection :[1,1,1,1,1,1,1,1],//移动8方向
    summonDistance  :1,//召唤范围
    summonDirection :[1,1,1,1,0,0,0,0],//召唤8方向
    //<<<<<<<<<<<<<<<<< 国王骰 data >>>>>>>>>>>>>>>>>>>>>>
    ctor: function (model,fileName,rect,rotated) {
        // if(!XCCheckModelLegal(model)){
        //     this.dataModel =
        // }else{
        //     this.dataModel = model;
        // }
        if(DMonsterData.checkModelLegal(model)){
            this.dataModel = new DMonsterData(model);
            this.movingDistance = this.dataModel.movement;
            this.movingDirection = this.dataModel.moveDirection;
            this.summonDistance = this.dataModel.summonRange;
            this.summonDirection = this.dataModel.summonDirection;
        }
        this._super(fileName,rect,rotated);
        this.defultColor = this.getColor();//记录原始颜色
        return;
    },

    /** -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     * 操作func
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  */

    //选中棋子
    pickUp:function(){
        this.oldLocalZOrder = this._localZOrder;
        this.setLocalZOrder(this.oldLocalZOrder + 10);
        this.setScale(this.enlargeCoefficient);
        this.setOpacity(220);
        this.setColor(cc.color(241,234,219));
        this._isPickUp = true;
    },
    //放下棋子
    pickDown:function(){
        this.setLocalZOrder(this.oldLocalZOrder);
        this.setColor(this.defultColor);
        this.setScale(1.0);
        this.setOpacity(255);
        this._isPickUp = false;
    },
    //可移动区域 //获得可移动点数组
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
                    continue;
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
    //可召唤区域//获得可召唤点
    getSummonRange:function(){
        var incrementValue = [];
        var selfpoint = this.mapPos;//{x:this.chessInMapX,y:this.chessInMapY};//当前位置
        console.log("getsuoomon",this.summonDistance);
        console.log("getsuoomon",this.summonDirection);
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
    //
    setMapPos:function(pos,y){
        var movePos = {x:0,y:0};
        if( y === undefined){
            movePos = pos;
        }else{
            movePos.x = pos;
            movePos.y = y;
        }
        this.mapPos = movePos;
    },
    //
    lookUpCard:function () {
        // this.addChild(Card);
        // Card.setPosition(0,0);
    },
    //
    showCard:function () {
        if(this.myCard == null){
            this.myCard = new UICard();
        }
        return this.myCard;
    },
    /**
     *  根据animType类型执行动画
     *  animType    动画类型    ChessAnimeEnemu
     *  point       动画执行位置
     * */
    runAnimaTypeAction:function(animType,point){
        let p = point;
        let duration = 0.5;//配置获得
        let admin = null;//执行动画声明//移动进入
        //选取动画类型
        switch (animType) {
            case ChessAnimeEnemu.FADEIN:
                this.setOpacity(0);
                this.setPosition(p);
                admin = cc.fadeIn(duration * 3)
                //在棋子中加入粒子动画-以后可以改成，对应棋子有对应的粒子，业务上类似于出场动画的概念
                //获取粒子文件
                let particleA = new cc.ParticleSystem(res.blackFire2xplist);
                this.addChild(particleA,999);//在棋子上加入粒子效果
                particleA.setAnchorPoint(0.5,0.5);
                particleA.setPosition(this.width/2, this.height/2 -10);
                break;
            default:
                admin = cc.moveTo(duration, p);
                break;
        }
        this.runAction(admin);//*********播放完要移除//查看移除语句是否补齐
    }
});
//工厂模式-
//根据ID去分拣类
//0-20000为建筑棋子，20000以上为怪物棋子
UIBasePiece.initPiece = function(obj){
    var piece = null;
    var pieceId = "";
    var pieceModel = "";
    // cc.log(typeof chessID);
    // cc.log(chessID);

    // if(model == null || (typeof model ))
    if(typeof obj == "number"){
        pieceId = obj;
        pieceModel = JSDataTool.monster[obj];
    }else if(typeof  chessID == "object"){
        pieceId = obj.ID;
        pieceModel = obj;
    }
    // TODO:待完善
    //通过id进行Data绑定
    //需要完成 ：构造，data绑定，图片的Anchor
    if(obj >= 0){
        if(obj < 20000 ){//基础棋子类
            piece = new UIPieceBuilding(pieceModel,"res/piece/building/building"+ pieceId + ".png");
            piece.setAnchorPoint(0.5,0);//默认修改瞄点
        }else{//怪物棋子类
            switch (chessID) {
                case 20001:
                    // pieceName = "26";
                    break;
                default:
                    break;
            }
            piece = new UIPieceMonster(pieceModel,"26");
        }
    }else {
        console.log("棋子创建异常");
    }
    return piece;
};
