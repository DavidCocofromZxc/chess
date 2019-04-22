



/**
 *
 *  网络测试场景 -未完成
 *
 * */

// import Bmob from "hydrogen-js-sdk"
// import Bmob from  ""
// window.io;
// var SocketIO = SocketIO || window.io;

var NetWorkLayer = BaseScene.extend({

    socketIO    :null,

    ctor:function () {
        this._super();
        // this.loadSocketIO();
        this.test();
        return true;
    },

    test:function () {
        Bmob.initialize("ef0729f131d45699c3173d3fa16fe307", "05d0be62242c7a63ddcb2566253eaefd");
        Bmob.User.login('admin','12345').then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });

        const query = Bmob.Query("monster");
        query.find().then(res => {
            console.log(res)
        });
    },

    loadSocketIO:function () {
        var socketIO = SocketIO.connect('127.0.0.1:3000');
        this.socketIO = socketIO;
        var self = this;
        socketIO.on("connect",function (data) {
           cc.log("连接成功");
           socketIO.emit('login',JSON.stringify("{msg:\"hi\"}"));
        });

        socketIO.on("login",function (obj) {
            var data = JSON.parse(obj);
            cc.log("login data:",data);
        });
    },
});



var NetWorkScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new NetWorkLayer();
        this.addChild(layer);
    }
});
