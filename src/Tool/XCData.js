

// var MonsterData;
//
// var XCData = {
//
//
//
// };



function XCDATA(){
    // 如果已存在对应的实例
    if(typeof XCDATA.instance === 'object'){
        return XCDATA.instance
    }
    //否则正常创建实例
    this.MONSTER_DATATABLE = Bmob.Query("monsterData");
    this.MONSTER_UITABLE   = Bmob.Query("monsterUI");

    // 缓存
    XCDATA.instance = this
    return this
}




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