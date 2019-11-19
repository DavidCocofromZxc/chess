

/**
 *
 *  基础工具类
 *         功能：1.格式化打印棋盘棋子状态
 *
 * */


var XCLog = function (strobj,obj) {
    if(strobj.constructor === String){
        cc.log(strobj + ":");
    }
    if(obj.constructor === Array){
        var list = obj;
        cc.log("XCLog--------------------------------------------------------------------------------------------");
        for (var i = 0 ; i < list.length ; i++){
            var celStr = "";
            for (var j = 0 ; j < list[i].length ; j++){
                var str = "";
                if(j == 0){
                    str += "「" + list[i][j];
                }else if( j == (list[i].length -1) ){
                    str += list[i][j] + "」";
                }else{
                    str += list[i][j] + " ";
                }
                for(;str.length < 11 ;){
                    str += " ";
                }
                celStr += str;
            }
            cc.log(i,celStr);
        }
        cc.log("-------------------------------------------------------------------------------棋盘专用打印类");
    }
};


//返回字符串宽度
var XCReturnStringWidth = function (text,fontName, fontSize,maxWidth){

    if(text.length > 0){
        var name = new cc.LabelTTF(text[0],fontName,fontSize);
        var sigWidth = name.width;
        var sigHeight = name.height;
        var result = "";
        var resultWidth = 0;
        var resultHeight = 0;
        for (var i = 0,len = text.length ; i < len ; i++){
            var char = text[i];
            result += char;
            resultWidth += sigWidth;

            if(resultWidth >= maxWidth){
                result += "\n";
                resultWidth = 0;
                resultHeight += sigHeight;
            }
        }
        name = null;
        return {w:resultWidth,h:resultHeight,str:result};
    }else{
        return {w:0,h:0,str:text};
    }
};

//打印 数据信息
var XCLookModel = function (obj) {
    if(obj === undefined){
        cc.log("obj error");
    }else{
        cc.log("XCLookModel<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        cc.log(obj.name,"("+obj.ID+")["+obj.objectId+"]");
        cc.log("specials:",obj.specials);
        cc.log("dsc:",obj.dsc);
        cc.log("energy:",obj.energy,"health:",obj.health);
        cc.log("----------------------------");
        cc.log("「attack」\n");
        cc.log("value:",obj.attack,"times:",obj.attackTimes,"range:",obj.attackRange);
        cc.log("----------------------------");
        cc.log("「move」\n");XCLogDirectionArray(obj.moveDirection);
        cc.log("value:",obj.movement,"times:",obj.moveTimes);
        cc.log("----------------------------");
        cc.log("「summon」\n");XCLogDirectionArray(obj.summonDirection);
        cc.log("Range:",obj.summonRange);
        cc.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Model专用打印类");
    }
};

var XCLogDirectionArray = function(array){
      if(array.length !== 8){
          cc.log("error XCLogDirectionArray func");
      }else{
          var arr = [   array[4],array[0],array[6],
                        array[2],0,array[3],
                        array[5],array[1],array[7],
                    ];
          cc.log("|",array[4],array[0],array[6],"|\n");
          cc.log("|",array[2],0,array[3],"|\n");
          cc.log("|",array[5],array[1],array[7],"|");
      }
};

/**
 * attack = 4
 attackRange = 1
 attackTimes = 1
 createdAt = "2019-04-22 14:36:00"
 dsc = "沉默寡言的武者，对贸然来犯对的敌人给予猛烈的反击"
 energy = 4
 health = 4
 movement = 2
 moveDirection = Array(8)
 moveTimes = 1
 name = "沉默の武士"
 objectId = "9rYH666X"
 specials = Array(1)
 summonDirection = Array(8)
 summonRange = 1
 updatedAt = "2019-05-05 11:23:09"
 ID = 1001
 * */


// Array.prototype.push2 = function(){
//     for(var i=0; i<arguments.length; i++){
//         var ele = args[i];
//         if(this.indexOf(ele) == -1){
//             this.push(ele);
//         }
//     }
// };　
