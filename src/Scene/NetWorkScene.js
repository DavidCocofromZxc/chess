



/**
 *
 *  网络测试场景 -未完成
 *
 * */

// import Bmob from "hydrogen-js-sdk"
// import Bmob from  ""
// window.io;
// var SocketIO = SocketIO || window.io;
// var mvs ;

var NetWorkLayer = BaseLayer.extend({

    socketIO    :null,

    ctor:function () {
        this._super();
        this.test();
        return true;
    },

    test:function () {
    },

    initCallback: function () {
        cc.log("mactvhSDK init");
    },

});



var NetWorkScene = BaseScene.extend({
    onEnter:function () {
        this._super();
        var layer = new NetWorkLayer();
        this.addChild(layer);
    }
});
