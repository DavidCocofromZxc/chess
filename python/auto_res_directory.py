###
#
#
#	resource【】生成工具
#
#
###

import os

TARGET_DIRECTORY = "res";
TARGET_LEGITIMACY = "src";
TARGET_JSON = "resource.js";

# json操作
def jsonHandle(filelistString):
	path = os.path.dirname(os.path.abspath('.'));
	path = path + "/" + TARGET_LEGITIMACY + "/" + TARGET_JSON;
	with open(path, "w") as f:
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
				continue;
			else:
				targetString += fname + ":" + wzpath;
	targetString = earthString + targetString + overString;
	return targetString;

#  合法性 检查
def checkEnvironment():
	path = os.path.dirname(os.path.abspath('.'));
	path +=  "/" + TARGET_LEGITIMACY + "/" + "resource.js";
	if(os.path.exists(path) == False):
		print("checkEnvironment fails")
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
