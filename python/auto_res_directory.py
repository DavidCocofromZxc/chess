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
TARGET_JSON = "resource22.js";

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
		json.dump(json_str, f)
	return;


# 获得文件列表
def getFileListString(path, file):
	# print("path:", path);
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
		print("-=-=-=:dd:", dirpath, f, filenames);
		for filename in filenames:
			wzpath = os.path.join(dirpath, filename);
			wzpath = wzpath.replace(path, "");
			wzpath = "\"" + wzpath + "\",\n";
			fname = filename.split(".")[0];
			# print("fname",filename);
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
	# dirs = os.listdir('..');
	if(checkEnvironment()):
		path = os.path.dirname(os.path.abspath('.'));
		path +=  "/";#+ "/" + "resource22.js";
		print("\n\n");
		print(getFileListString(path,TARGET_DIRECTORY));
		print("\n\n");
