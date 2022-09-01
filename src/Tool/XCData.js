

/**
 * 数据类
 *
 * */
let EnemuDataUrl = {
    monsterData: 0,
    monsterUIData: 1,
};


/**
 * JSTool 工具类
 * 
 * 用于模拟本地json解析后的情况
 * 逐步替换XCData
 * */
var JSDataTool = {
    monster: {
        1001: null,
        1002: null,
    },
    init: function () {
        //模拟
        console.log("JSDataTool init");
        var monster1001 = new DMonsterData(
            {
                objectId: "1001",
                name: "水晶",
                dsc: "训练场景所用的国王棋子",
                specials: [1],
                attack: 0,
                health: 1,
                energy: 0,

                movement: 0,
                moveTimes: 1,
                moveDirection: [0, 0, 0, 0, 0, 0, 0, 0],

                summonRang: 1,
                summonTimes: 1,
                summonDirection: [1, 1, 1, 1, 0, 0, 0, 0],

                attackRange: 0,
                attackTimes: 0,
                attackDirection: [0, 0, 0, 0, 0, 0, 0, 0],
            },
        );
        this.monster[1001] = monster1001;

        var monster1002 = new DMonsterData(
            {
                objectId: "1002",
                name: "沉默番兵",
                specials: [0],
                dsc: "沉默寡言的外来士兵",
                attack: 4,
                health: 6,
                energy: 0,

                movement: 2,
                moveTimes: 1,
                moveDirection: [1, 1, 1, 1, 1, 1, 1, 1],
                summonRange: 1,
                summonTimes: 1,
                summonDirection: [1, 1, 1, 1, 0, 0, 0, 0],
                attackRange: 1,
                attackTimes: 1,
                attackDirection: [1, 1, 1, 1, 0, 0, 0, 0],
            },
        );
        this.monster[1002] = monster1002;

        return true;
    }
};

// function XCDATA() {
//     // 如果已存在对应的实例
//     if (typeof XCDATA.instance === 'object') {
//         return XCDATA.instance;
//     }
//     //
//     this.MONSTER_DATATABLE = [];
//     this.MONSTER_UITABLE = [];
//     //Bmob
//     // const monsterDataQuery = Bmob.Query("monsterData");
//     // monsterDataQuery.find().then(res => {
//     // this.MONSTER_DATATABLE = res;
//     // });
//     // const monsterUIDataQuery = Bmob.Query("monsterUI");
//     // monsterUIDataQuery.find().then(res => {
//     //     this.MONSTER_UITABLE = res;
//     // });


//     /**
//      * 8.23
//     */
//     var ii = Math.random() * 10 + 1;
//     console.log("Math.random", ii);
//     for (var count = 0; count < ii; count++) {
//         var data = new DMonsterData();
//         data.setModel("9rYH666X", "ceshi", [0], "nothing to here");
//         this.MONSTER_DATATABLE.push(data);
//     }
//     // this.MONSTER_DATATABLE = [];
//     this.MONSTER_UITABLE = [];

//     // // XCDATA
//     // XCDATA.findMonsterData = function (objectID) {
//     //     var monsterData = null;
//     //     for (var i = 0, len = this.MONSTER_DATATABLE.length; i < len; i++) {
//     //         var obj = this.MONSTER_DATATABLE[i];
//     //         if (obj.ID == objectID) {
//     //             monsterData = obj;
//     //             break;
//     //         }
//     //     }
//     //     return monsterData;
//     // }.bind(this);

//     // XCDATA.findMonsterUIData = function (objectID) {
//     //     var monsterData = null;
//     //     for (var i = 0, len = this.MONSTER_UITABLE.length; i < len; i++) {
//     //         var obj = this.MONSTER_UITABLE[i];
//     //         if (obj.objectId == objectID) {
//     //             monsterData = obj;
//     //             break;
//     //         }
//     //     }
//     //     return monsterData;
//     // }.bind(this);

//     // XCDATA.getMonsterData = function(index){
//     //     var monsterData = null;
//     //     if(this.MONSTER_DATATABLE.length > index){
//     //         monsterData = this.MONSTER_DATATABLE[index];
//     //     }
//     //     return monsterData;
//     // }.bind(this);

//     // XCDATA.prototype.findMonsterUIData = function(objectID){
//     //     var monsterData = null;
//     //     for(var i = 0 ,len = this.MONSTER_UITABLE.length; i<len ;i++){
//     //         var obj = this.MONSTER_UITABLE[i];
//     //         if(obj.objectId == objectID){
//     //             monsterData = obj;
//     //             break;
//     //         }
//     //     }
//     //     return monsterData;
//     // }.bind(this);

//     // 缓存
//     XCDATA.instance = this;
//     return this;
// };
