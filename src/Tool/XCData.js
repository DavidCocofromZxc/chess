

// var MonsterData;
//
// var XCData = {
//
//
//
// };



let EnemuDataUrl = {
    monsterData     :   0,
    monsterUIData   :   1,
};


// var XCDATA = function() {
//
//     this.MONSTER_DATATABLE = [];
//     this.MONSTER_UITABLE   = [];
//
//     // Bmob
//     const monsterDataQuery = Bmob.Query("monsterData");
//     monsterDataQuery.find().then(res => {
//         this.MONSTER_DATATABLE = res;
//     });
//
//     const monsterUIDataQuery = Bmob.Query("monsterUI");
//     monsterUIDataQuery.find().then(res => {
//         this.MONSTER_UITABLE = res;
//     });
//
// };

//
function XCDATA(){

    // 如果已存在对应的实例
    if(typeof XCDATA.instance === 'object'){
        return XCDATA.instance
    }

    this.MONSTER_DATATABLE = [];
    this.MONSTER_UITABLE   = [];

    //Bmob
    const monsterDataQuery = Bmob.Query("monsterData");
    monsterDataQuery.find().then(res => {
        this.MONSTER_DATATABLE = res;
    });

    const monsterUIDataQuery = Bmob.Query("monsterUI");
    monsterUIDataQuery.find().then(res => {
        this.MONSTER_UITABLE = res;
    });

    // XCDATA
    XCDATA.findMonsterData = function(objectID){
        var monsterData = null;
        for(var i = 0 ,len = this.MONSTER_DATATABLE.length; i<len ;i++){
            var obj = this.MONSTER_DATATABLE[i];
            if(obj.objectId == objectID){
                monsterData = obj;
                break;
            }
        }
        return monsterData;
    }.bind(this);

    XCDATA.findMonsterUIData = function(objectID){
        var monsterData = null;
        for(var i = 0 ,len = this.MONSTER_UITABLE.length; i<len ;i++){
            var obj = this.MONSTER_UITABLE[i];
            if(obj.objectId == objectID){
                monsterData = obj;
                break;
            }
        }
        return monsterData;
    }.bind(this);

    // XCDATA.getMonsterData = function(index){
    //     var monsterData = null;
    //     if(this.MONSTER_DATATABLE.length > index){
    //         monsterData = this.MONSTER_DATATABLE[index];
    //     }
    //     return monsterData;
    // }.bind(this);

    // XCDATA.prototype.findMonsterUIData = function(objectID){
    //     var monsterData = null;
    //     for(var i = 0 ,len = this.MONSTER_UITABLE.length; i<len ;i++){
    //         var obj = this.MONSTER_UITABLE[i];
    //         if(obj.objectId == objectID){
    //             monsterData = obj;
    //             break;
    //         }
    //     }
    //     return monsterData;
    // }.bind(this);

    // 缓存
    XCDATA.instance = this;

    return this
};





// var XCData = ( function(){
//         var unique;
//         // var MonsterData;
//
//         function getInstance(){
//             if( unique === undefined ){
//                 unique = new Construct();
//             }
//             return unique;
//         }
//
//         function Construct(){
//             // ... 生成单例的构造函数的代码
//             // this.MonsterData = Bmob.Query("monsterData");
//         }
//
//
//
//
//         return {
//             getInstance : getInstance
//         }
//     }
// )();



//
// var XCData = cc.Class.extend({
//     // var unit :null;
//     unique : null,
//     // fun
//     // ctor:
//     ctor:function (){
//         this.
//     },
//
//
//     getInstance:function () {
//         if( unique === undefined ){
//             unique = new XCData();
//         }
//         return unique;
//     },
//
// });