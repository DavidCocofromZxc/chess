

/**
 *
 *  专用数据类
 *
 *
 objectId: "IQow111i"

 name: "水晶"
 dsc: "训练场景所用的国王棋子"
 specials: [1]

 attack: 0
 health: 1
 movement: 0
 moveDirection: (8) [0, 0, 0, 0, 0, 0, 0, 0]
 summonRang: 1
 summonDirection: (8) [1, 1, 1, 1, 0, 0, 0, 0]
 *
 * */

var GWMonsterData = cc.Class.extend({

    objectId        :   "",
    name            :   "???",
    specials        :   [0],
    dsc             :   "...",
    attack          :   0,
    health          :   1,
    movement        :   0,

    moveDirection   :   [1, 1, 1, 1, 1, 1, 1, 1],
    summonRange     :   1,
    summonDirection :   [1, 1, 1, 1, 0, 0, 0, 0],


    ID              :   -99,
    specials        :   [1],
    energy          :   0,
    attackTimes     :   0,
    attackRange     :   0,
    moveTimes       :   0,




    // ctor:function (model,objectId,name,specials,dsc,attack,health,movement,moveDirection,summonRang,summonDirection) {
    //     if(model == null && (typeof model == "object")){
    //
    //     }
    //     this.objectId = objectId || "";
    //     this.name = name || "";
    //     this.specials = specials || [0];
    //     this.dsc = dsc || "";
    //     this.attack = attack || 0;
    //     this.health = health || 1;
    //     this.movement = movement || 0;
    //     this.summonRang = summonRang || 1;
    //     this.moveDirection = moveDirection || [1, 1, 1, 1, 1, 1, 1, 1];
    //     this.summonDirection = summonDirection || [1, 1, 1, 1, 0, 0, 0, 0];
    //     return true;
    // },

    ctor:function (model) {
        var bool = true;
        if(model == null || (typeof model != "object")){
            bool = false;
        }
        this.objectId = bool?model.objectId:"";
        this.name = bool?model.name:"";
        this.specials = bool?model.specials:[0];
        this.dsc = bool?model.dsc:"";
        this.attack = bool?model.attack:0;
        this.health = bool?model.health:1;
        this.movement = bool?model.movement:0;
        this.summonRange = bool?model.summonRange:1;
        this.moveDirection = bool?model.moveDirection:[1, 1, 1, 1, 1, 1, 1, 1];
        this.summonDirection = bool?model.summonDirection:[1, 1, 1, 1, 0, 0, 0, 0];

        //还没写，下班了
        this.ID = bool?model.ID:-99;
        this.specials = bool?model.specials:[1];
        this.energy = bool?model.energy:0;
        this.attackTimes = bool?model.attackTimes:0;
        this.attackRange = bool?model.attackRange:0;
        this.moveTimes = bool?model.moveTimes:0;
        return true;
    },

    // initMonsterData:function (objectId,name,specials,dsc,attack,health,movement,moveDirection,summonRang,summonDirection) {
    //     this.objectId = objectId || "";
    //     this.name = name || "";
    //     this.specials = specials || [0];
    //     this.dsc = dsc || "";
    //     this.attack = attack || 0;
    //     this.health = health || 1;
    //     this.movement = movement || 0;
    //     this.summonRang = summonRang || 1;
    //     this.moveDirection = moveDirection || [1, 1, 1, 1, 1, 1, 1, 1];
    //     this.summonDirection = summonDirection || [1, 1, 1, 1, 0, 0, 0, 0];
    // },

});

// GWMonsterData.initMonsterObj = function (obj) {
//     var model = new GWMonsterData
//     this.objectId = obj.objectId || "";
//     this.name = obj.name || "";
//     this.specials = obj.specials || [0];
//     this.dsc = obj.dsc || "";
//     this.attack = obj.attack || 0;
//     this.health = obj.health || 1;
//     this.movement = obj.movement || 0;
//     this.summonRang = obj.summonRang || 1;
//     this.moveDirection = obj.moveDirection || [1, 1, 1, 1, 1, 1, 1, 1];
//     this.summonDirection = obj.summonDirection || [1, 1, 1, 1, 0, 0, 0, 0];
// };

//检查合法性
GWMonsterData.checkModelLegal = function (model) {
    if(model == null || !( typeof model === "object") ){
        cc.log("model 不合法！");
        return false;
    }
    if(model.objectId == null){
        cc.log("objectId 不合法！");
        return false;
    }
    if(model.ID == null){
        cc.log("ID 不合法！");
        return false;
    }
    if(model.name == null){
        cc.log("name 不合法！");
        return false;
    }
    if(model.dsc == null){
        cc.log("dsc 不合法！");
        return false;
    }
    if(model.specials == null){
        cc.log("specials 不合法！");
        return false;
    }
    if(model.energy == null){
        cc.log("energy 不合法！");
        return false;
    }
    if(model.health == null){
        cc.log("health 不合法！");
        return false;
    }
    if(model.attack == null){
        cc.log("attack 不合法！");
        return false;
    }
    if(model.attackTimes == null ){
        cc.log("attackTimes 不合法！");
        return false;
    }
    if(model.attackRange == null ){
        cc.log("attackRange 不合法！");
        return false;
    }
    if(model.movement == null ){
        cc.log("movement 不合法！");
        return false;
    }
    if(model.moveTimes == null ){
        cc.log("moveTimes 不合法！");
        return false;
    }
    if(model.moveDirection == null || model.moveDirection == []){
        cc.log("moveDirection 不合法！");
        return false;
    }
    if(model.summonRange == null || model.summonRange == []){
        cc.log("summonRange 不合法！");
        return false;
    }
    if(model.summonDirection == null || model.summonDirection == []){
        cc.log("summonDirection 不合法！");
        return false;
    }
    return true;
};
