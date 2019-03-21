
let ALLOWPLACE_COLOR = cc.color(102,182,129,255*0.4);
let NOT_ALLOWPLACE_COLOR = cc.color(219,54,71,255*0.4);



//localZOrder 影响node渲染顺序 越大越晚渲染 ，越靠近屏幕
let CHESS_LOCAL_ZORDER = 999; //棋子渲染层级
let LAYER_LOCAL_ZORDER = 21;  //落子范围/区域层级  //绿区

// let localZorder_MAP          =   12
// let localZorder_Dialogue     =   10
// let localZorder_DialogueText =   15




var TILE_MAP_SIZE = 32;

var MAPSH = null;




// 阵营
var CampEnemu = {

    NONE    :"none",//无
    BLACK   :"black",//黑
    WHITE   :"white",//白

    //
    BLACK_SUM   :"black_sum",//无棋但可以召唤黑
    WHITE_SUM   :"white_sum",//无棋但可以召唤白

};



//<<<<<<<<<< 国王骰 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<< 国王骰 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<< 国王骰 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<< 国王骰 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<< 国王骰 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//渲染 层级控制
let LocalZorderEnemu = {


    CHESS8          :   211,
    CHESS7          :   212,
    CHESS6          :   213,
    CHESS5          :   214,
    CHESS4          :   215,
    CHESS3          :   216,
    CHESS2          :   217,
    CHESS1          :   218,
    CHESS0          :   219,

    CHESS           :   220,
    MAP             :   200,
    Dialogue        :   220,
    DialogueText    :   250,
};


let PieceTypeEnemu = {

    BASE            :   0,//基础棋子
    MONSTER         :   1,//怪物棋子
};



// 阵营
var OwnerEnemu = {

    UNKNOWN     : "unknown",//未知的
    NEUTRAL     : "neutral",//无
    FRIENDS     : "Friends",//黑
    ENEMY       : "enemy",//白

};



//棋子类型
var ChessTypeEnemu = {


    CRYSTAL     :"crystal",    // 水晶

    //下面无用

    NONE        :"none",    // 无
    PAWN        :"pawn",   // 兵
    ROOK        :"rook",   // 黑车
    KNIGHT      :"knight",   // 黑骑
    BISHOP      :"bishop",   // 黑主教
    KING        :"king",   // 黑皇
    QUEEN       :"queen",   // 黑后

};

