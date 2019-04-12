

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


        cc.log("--------------------------------------------------------------------------------------------");
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

    // }else{
    //     name = null;
    //     return text;
    // }

};


// Array.prototype.push2 = function(){
//     for(var i=0; i<arguments.length; i++){
//         var ele = args[i];
//         if(this.indexOf(ele) == -1){
//             this.push(ele);
//         }
//     }
// };　