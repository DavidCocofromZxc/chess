



/**
 *
 *  网络测试场景 -未完成
 *
 * */


// var SocketIO = SocketIO || window.io;

var NetWorkLayer = BaseScene.extend({

    // socketIO        : null,



    ctor:function () {
        this._super();
        this.test();
        return true;
    },


    test:function(){




        var bg = new ccui.Layout();
        this.addChild(bg);
        bg.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        bg.setBackGroundColor(cc.color(0,220,0));
        // bg.setBackGroundColorOpacity(255*0.5);
        bg.setPosition(0,0);
        bg.setContentSize(cc.winSize.width,cc.winSize.height);




        var card = new GWCard();
        this.addChild(card);
        card.setPosition(cc.winSize.width/2,cc.winSize.height/2);

        /**
         *
         * 220, 308
         *      ||
         * 200, 19
         * 200, 185
         * 200, 105
         *
         * */

        // //展开点
        // var targetPoint = cc.vertex2(cc.winSize.width/2,cc.winSize.height/2);
        // //原画点
        // // var artworkPoint = cc.vertex2(cc.winSize.width/2,cc.winSize.height/2 + 105);
        // //费用点
        // var fyPoint = cc.vertex2(targetPoint.x + 24,targetPoint.y + 285);
        // //攻击点
        // var gjPoint = cc.vertex2(targetPoint.x + 24,targetPoint.y + 30);
        // //描述
        // var dscPoint = cc.vertex2(targetPoint.x + 24,targetPoint.y + 80);
        //
        //
        //
        //
        // var kaA = new cc.Sprite(res.kakuang);
        // kaA.setPosition(targetPoint.x,targetPoint.y);
        // kaA.setAnchorPoint(0,0);
        // var kaB = new cc.Sprite(res.katiao);
        // kaB.setPosition(targetPoint.x,targetPoint.y);
        // kaB.setAnchorPoint(0,0);
        // var kaC = new cc.Sprite(res.kaditiao);
        // kaC.setPosition(targetPoint.x,targetPoint.y);
        // kaC.setAnchorPoint(0,0);
        // var kaD = new cc.Sprite(res.kadi);
        // kaD.setPosition(targetPoint.x,targetPoint.y);
        // kaD.setAnchorPoint(0,0);
        //
        // //原画
        // var gw = new cc.Sprite(res.guaiwu0001);
        // gw.setPosition(targetPoint.x,targetPoint.y + 100);
        // gw.setAnchorPoint(0,0);
        //
        // //费用
        // var fyLbl = new cc.LabelTTF("4","Arial",20);
        // fyLbl.setPosition(fyPoint.x,fyPoint.y);
        // this.addChild(fyLbl,101);
        //
        // //攻击力
        // var gjLbl = new cc.LabelTTF("4","Arial",20);
        // gjLbl.setFontFillColor(0,0,0,255);
        // gjLbl.setPosition(gjPoint.x,gjPoint.y);
        // this.addChild(gjLbl,101);
        //
        // //生命力
        // var smLbl = new cc.LabelTTF("8","Arial",20);
        // smLbl.setFontFillColor(0,0,0,255);
        // smLbl.setPosition(gjPoint.x + 175,gjPoint.y);
        // this.addChild(smLbl,101);
        //
        //
        //
        // //名称
        // var name = new cc.LabelTTF("沉默の勇士","Arial",8);
        // name.setPosition(fyLbl.x + 35,fyLbl.y);
        // this.addChild(name,101);
        //
        // //描述
        // var dsc = new cc.LabelTTF("沉默寡言的武者，对贸然来犯对的敌人\n给予猛烈的反击","Arial",8);
        // dsc.setPosition(dscPoint.x,dscPoint.y);
        // this.addChild(dsc,101);
        //
        //
        //
        // this.addChild(kaA,100);
        // this.addChild(kaB,90);
        // this.addChild(kaC,80);
        // this.addChild(gw,75);
        // this.addChild(kaD,70);


        // if(!cc.sys.isNative){
        //     return;
        // }
        // this.database = new sql.SQLiteWrapper();
        // this.databasePath = this.database.initializing("data.db","res","");
        // if(this.database.open(this.databasePath)){
        //     cc.log("打开成功！");
        // }





        //
        // var socketIO = io.connect("http://127.0.0.1:3000");
        //
        // // var socketIO = SocketIO.connect("http://127.0.0.1:3000");
        // // var socketIO = SocketIO.open("http://127.0.0.1:3000");
        // // this.socketIO = socketIO;   // 保存socketIO
        //
        // console.log("socket:",socketIO);
        //
        //
        // //
        // // var self = this;
        // var aa = socketIO.on("connection", function(data){
        //         console.log("data:",data);
        //
        //         console.log("socket:",socketIO);
        //
        //         cc.log("连接服务器成功...");
        //         // 发送[登录请求]
        //         socketIO.emit('login', JSON.stringify(self.playerData));
        //
        //         // 监听[玩家登录]
        //         socketIO.on('login', function(obj){
        //             var data = JSON.parse(obj);
        //             self.isLogin = true;
        //             self.onlineCountText.setString("在线人数：" + data.onlineCount);
        //             cc.log("玩家【" + data.player.playerName + "】进入游戏了！");
        //         });
        //
        //         // 监听[玩家聊天]
        //         socketIO.on('message', function(obj){
        //             var data = JSON.parse(obj);
        //             var string = data.playerName + "[" + data.playerId + "] 说：" + data.content;
        //             self.applyMessageText(string);
        //         });
        //
        //         // 监听[玩家退出]
        //         socketIO.on('logout', function(obj){
        //             var data = JSON.parse(obj);
        //             self.onlineCountText.setString("在线人数：" + data.onlineCount);
        //             cc.log("玩家【" + data.player.playerName + "】退出游戏！");
        //         });
        //     });
        // console.log("aa:",aa);
        //
        // socketIO.emit('login', "hi!server");
        // socketIO.disconnect();



        // var self = this;
        // var socket = new WebSocket("ws://echo.websocket.org");
        // this.socket = socket;
        // socket.binaryType = "arraybuffer";
        // socket.onopen = function(event) {    // 打开
        //     cc.log("连接成功！开始发送数据");
        // };
        // socket.onmessage = function(event) { // 响应
        //     var arrData = new Uint16Array(event.data);
        //     var data = "";
        //     for (var i = 0; i < arrData.length; i++) {
        //         if (arrData[i] == 0) {
        //             data += "\'\\0\'";
        //         } else {
        //             var hexChar = "0x" + arrData[i].toString("16").toUpperCase();
        //             data += String.fromCharCode(hexChar);
        //         }
        //     }
        //     cc.log("收到响应数据：", data);
        // };
        // socket.onerror = function(event) {   // 错误
        //     cc.log("发生错误！");
        // };
        // socket.onclose = function(event) {   // 关闭
        //     cc.log("链接关闭！");
        //     self.socket = null;
        // };
        //
        // // 延迟一段时间之后发送数据
        // var delay = cc.delayTime(2);
        // var callFunc = cc.callFunc(function(){
        //     if (socket.readyState == WebSocket.OPEN) {
        //         var strData = "这是客户端发送的字符码数据。";
        //         var arrData = new Uint16Array(strData.length);
        //         for (var i = 0; i < strData.length; i++) {
        //             arrData[i] = strData.charCodeAt(i);
        //         }
        //         socket.send(arrData.buffer);
        //         cc.log("数据发送完毕！");
        //     } else {
        //         cc.log("连接未打开！");
        //     }
        // }.bind(this));
        // this.runAction(cc.sequence(delay, callFunc));

    },


});

var NetWorkScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new NetWorkLayer();
        this.addChild(layer);
    }
});
