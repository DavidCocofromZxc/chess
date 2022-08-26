###
#
#
#	根目录生成工具
#
#
###

from cmath import log
from math import fabs
from operator import truediv
import os
import json

TARGET_DIRECTORY = "src";
TARGET_JSON = "project.json";

# json操作
def jsonHandle(filelistString):
	path = os.path.dirname(os.path.abspath('.'));
	path = path + "/" + TARGET_JSON;
	print("path:",path);	
	json_str = "";
	with open(path, "r") as f:
		json_str = json.load(f);
		jj = json.loads(filelistString);
		json_str["jsList"] = jj["jsList"];
	with open(path, "w") as f:
		json.dump(json_str,f)
	return ;


# 获得文件列表
def fileList(path,file):
	targetString = "";
	targetString +=  "{\"jsList\":[";
	filelist = os.walk(path + file)
	for dirpath,f, filenames in filelist:
		print("!!!",filenames,type(filenames));
		for filename in filenames:
			wzpath = os.path.join(dirpath, filename);
			wzpath = wzpath.replace(path,"");
			wzpath = "\"" + wzpath + "\",\n"; 
			targetString += wzpath;
	count = len(targetString) - 2;
	targetString = targetString[0:count];
	targetString += "]}";
	return targetString;


#  合法性 检查
def checkEnvironment(dirs):
	hassrc = False;
	hasjson = False;

	for file in dirs:
		print("file:",file);
		if(file == TARGET_DIRECTORY):
			hassrc = True;
			if(hasjson):
				break;
		if(file == TARGET_JSON):
			hasjson = True;
			if(hassrc):
				break;
	if(hassrc & hasjson):
		return True;
	else:
		return False;


# main
if __name__ == "__main__":
	path = os.path.dirname(os.path.abspath('.'));
	dirs = os.listdir('..');
	if(checkEnvironment(dirs)):
		path = path + "/";
		print("\n\n\n");
		fileList(path,TARGET_DIRECTORY);
		print("\n\n\n");

		# jsonHandle(fileList(path,TARGET_DIRECTORY));
		
# eg.  
# {
#     "project_type": "javascript",

#     "debugMode" : 1,
#     "showFPS" : true,
#     "frameRate" : 60,
#     "noCache" : false,
#     "id" : "gameCanvas",
#     "renderMode" : 0,
#     "engineDir":"frameworks/cocos2d-html5",

#     "modules" : ["cocos2d","ccui","external","bmobSDK"],

#     "jsList" : [
#         "src/resource.js",
#         "src/scene/BaseScene.js",
#         "src/scene/LoginScene.js",
#         "src/scene/GodScene.js",
#         "src/scene/GameScene.js",
#         "src/scene/TestWorkScene.js",
#         "src/utils/Enemu.js",
#         "src/tool/XCTool.js",
#         "src/tool/XCBase64Tool.js",
#         "src/tool/XCData.js",
#         "src/mode/GWText.js",
#         "src/mode/GWMessage.js",
#         "src/mode/GWMailbox.js",
#         "src/mode/GWDialogue.js",
#         "src/mode/GWBloodBox.js",
#         "src/mode/GWEnergyBox.js",
#         "src/mode/GWRoundEndButton.js",
#         "src/mode/GWPlayerController.js",
#         "src/mode/checkerboard/GWCheckerboard.js",
#         "src/mode/checkerboard/GWIntroduceCheckerboard.js",
#         "src/mode/checkerboard/GWGameCheckerboard.js",
#         "src/mode/checkerboard/GWMatchCheckerboard.js",
#         "src/mode/piece/GWPiece.js",
#         "src/mode/piece/GWMonster.js",
#         "src/mode/piece/GWBuilding.js",
#         "src/mode/data/GWMonsterData.js",
#         "src/mode/card/GWCard.js",
#         "src/mode/card/CardGroup/GWCardGroup.js",
#         "src/mode/card/CardGroup/GWCardGroupSelf.js",
#         "src/mode/card/CardGroup/GWCardGroupOther.js",
#         "src/mode/card/GWHandCard.js",
#         "src/mode/card/CardsHandBox/GWCardsHandBox.js",
#         "src/mode/card/CardsHandBox/GWCardsHandBlackBox.js",
#         "src/mode/ui/GWGold.js",
#         "src/mode/gameManager/PlayerManager.js",
#         "src/mode/gameManager/ConfigureManager.js"
#     ]
# }
