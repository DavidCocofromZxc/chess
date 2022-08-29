###
#
#
#	project‘jsList 目录生成工具
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
	# print("path:",path);	
	json_str = "";
	with open(path, "r") as f:
		json_str = json.load(f);
		jj = json.loads(filelistString);
		json_str["jsList"] = jj["jsList"];
	with open(path, "w") as f:
		json.dump(json_str,f)
	return ;


# 获得文件列表
def getFileListString(path,file):
	targetString = "";
	earthString = "";
	firstString = "";#后期改成数组

	filelist = os.walk(path + file)
	for dirpath,f, filenames in filelist:
		for filename in filenames:
			wzpath = os.path.join(dirpath, filename);
			wzpath = wzpath.replace(path,"");
			wzpath = "\"" + wzpath + "\",\n"; 
			if(filename == "Enemu.js"):#
				firstString +=wzpath;
			elif("Base" in filename ):
				earthString += wzpath;
			else:
				targetString += wzpath;
	targetString = "{\"jsList\":[" + firstString + earthString + targetString;
	count = len(targetString) - 2;
	targetString = targetString[0:count];
	targetString += "]}";
	return targetString;


#  合法性 检查
def checkEnvironment(dirs):
	hassrc = False;
	hasjson = False;

	for file in dirs:
		# print("file:",file);
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
		jsonHandle(getFileListString(path,TARGET_DIRECTORY));
