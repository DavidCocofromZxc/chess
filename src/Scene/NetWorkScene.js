



/**
 *
 *  网络测试场景 -未完成
 *
 * */

// import Bmob from "hydrogen-js-sdk"
// import Bmob from  ""
// window.io;
// var SocketIO = SocketIO || window.io;

var NetWorkLayer = BaseLayer.extend({

    socketIO    :null,

    ctor:function () {
        this._super();
        this.test();
        return true;
    },

    test:function () {

        // var Matchvs = require("matchvs.all");
        // var engine = new Matchvs.MatchvsEngine();
        var engine = new MVS.MatchvsEngine();


        // var Matchvs = require("matchvs.all");
        // var engine = new Matchvs.MatchvsEngine();
        // var winEngine = window.MatchvsEngine();
        //
        var response = new MVS.MatchvsResponse();
        var result = winEngine.init(response,'Matchvs','alpha','200978', "4fd4a67c10e84e259a2c3c417b9114f4", 1);
        if(result === 0) {
            console.log("初始化请求成功");
        }


        // this.showLoading();
        //
        // const query = Bmob.Query("monsterData");
        // query.find().then(res => {
        //     console.log("data",res)
        //     var aa = new GWMonsterData();//.initMonsterObj(res[0]);
        //     aa.initMonsterObj(res[0]);
        //     cc.log("aa:",aa);
        //     this.stopLoading();
        // });
    },

    //加载手牌区域
    loadHandCard:function(){
        var hand = new GWCard();//ancher 0,1
        hand.setPosition(200,200);
        this.addChild(hand);
        hand.setData(GWMonsterData.initMonsterData());
    },

    // loadSocketIO:function () {
    //     var socketIO = SocketIO.connect('127.0.0.1:3000');
    //     this.socketIO = socketIO;
    //     var self = this;
    //     socketIO.on("connect",function (data) {
    //        cc.log("连接成功");
    //        socketIO.emit('login',JSON.stringify("{msg:\"hi\"}"));
    //     });
    //
    //     socketIO.on("login",function (obj) {
    //         var data = JSON.parse(obj);
    //         cc.log("login data:",data);
    //     });
    // },
});



var NetWorkScene = BaseScene.extend({
    onEnter:function () {
        this._super();
        var layer = new NetWorkLayer();
        this.addChild(layer);
    }
});
