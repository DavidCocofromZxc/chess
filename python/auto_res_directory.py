###
#
#
#	project‘jsList 目录生成工具
#
#
###

from cmath import log
from curses.ascii import NUL
from math import fabs
from operator import truediv
import os
import json
from pickle import TRUE
from sqlite3 import connect

TARGET_DIRECTORY = "res";
TARGET_LEGITIMACY = "src";
TARGET_JSON = "resource.js";

# json操作
def jsonHandle(filelistString):
	path = os.path.dirname(os.path.abspath('.'));
	path = path + "/" + TARGET_LEGITIMACY + "/" + TARGET_JSON;
	# print("path:",path,filelistString);
	with open(path, "w") as f:
		# print("open w");
		f.write(filelistString);
	return;

# 获得文件列表
def getFileListString(path, file):
	targetString = "";
	earthString = """
var res = {
	""";
	overString = """
	};
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
	""";  # 后期改成数组

	filelist = os.walk(path + file)
	for dirpath, f, filenames in filelist:
		for filename in filenames:
			wzpath = os.path.join(dirpath, filename);
			wzpath = wzpath.replace(path, "");
			wzpath = "\"" + wzpath + "\",\n";
			fname = filename.split(".")[0];
			if(fname == "" or len(fname) <= 0):
				connect;
			else:
				targetString += fname + ":" + wzpath;
	targetString = earthString + targetString + overString;
	return targetString;

#  合法性 检查
def checkEnvironment():
	path = os.path.dirname(os.path.abspath('.'));
	path +=  "/" + TARGET_LEGITIMACY + "/" + "resource22.js";
	return os.path.exists(path);

# main
if __name__ == "__main__":
	if(checkEnvironment()):
		path = os.path.dirname(os.path.abspath('.'));
		path +=  "/";
		print("\n\n");
		jsonHandle(getFileListString(path,TARGET_DIRECTORY))
		print("res success!");
		print("\n\n");
