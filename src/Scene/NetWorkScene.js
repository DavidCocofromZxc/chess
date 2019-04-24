



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
        // this.loadSocketIO();
        this.test();
        // this.loadHandCard();
        return true;
    },

    test:function () {
        this.showLoading();

        const query = Bmob.Query("monsterData");
        query.find().then(res => {
            console.log("data",res)
            var aa = new GWMonsterData();//.initMonsterObj(res[0]);
            aa.initMonsterObj(res[0]);
            cc.log("aa:",aa);
            this.stopLoading();
        });
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
