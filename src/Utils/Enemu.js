
let ALLOWPLACE_COLOR = cc.color(102,182,129,255*0.4);
let NOT_ALLOWPLACE_COLOR = cc.color(219,54,71,255*0.4);

//localZOrder 影响node渲染顺序 越大越晚渲染 ，越靠近屏幕
let CHESS_LOCAL_ZORDER = 999; //棋子渲染层级
let LAYER_LOCAL_ZORDER = 99;  //落子范围/区域层级

var TILE_MAP_SIZE = 32;

var MAPSH = null;


//棋子类型
var ChessTypeEnemu = {

    NONE        :"none",    // 无
    PAWN        :"pawn",   // 兵
    ROOK        :"rook",   // 黑车
    KNIGHT      :"knight",   // 黑骑
    BISHOP      :"bishop",   // 黑主教
    KING        :"king",   // 黑皇
    QUEEN       :"queen",   // 黑后

};

// 阵营
var CampEnemu = {

    NONE    :"none",//无
    BLACK   :"black",//黑
    WHITE   :"white",//白

};
