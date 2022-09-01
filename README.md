#Project directory
-res 资源文件
|-Card 卡牌组成
|-data
|-Map
|-Other
|-Particle
|-piece
|-UI
|-loading.js
-
-src 脚本文件
|


# development log

I'm making a chess game with cocos-js. You can link me QQ num 670633205.

4.12
    
    Starting today,i will keep updating my game development diary.
    to record ideas in my mind,and daily trivialities.
    
    1.i need some UI in my GameScenen.first ,button will be join.i will write button class;
    2.tomorrow ,i must to buy some Yu Gi Oh card，to give more Originality;
    
    
4.14
 
    I am too lazy.
    On the weekend, I hardly knocked on the code. I attended a colleague's wedding.
    Button class simply wrote one. Icon is still not appropriate.
    
    I suddenly realized that I had to use low-resolution pixel style in the project to make the overall style unified, 
    because this type of material had been used in the beginning.
    
    
4.15
    
    i must make a development plan.
    plan:   2 months later, the game is ready to play.
            In this month, Network modules can be used，Then，i can link my friend Y.
            In this week, i must be solved Data issues and most basic view issues.
    
    today,update handcard & cardGroup.
    
5.5
    棋盘中可以优化：
        移动次数仍大于1的单位应该播放默认动作，
        移动次数用尽的单位应该停止所有动画，而产生静止的感觉
        
6.25
    想法：
    1.更换引擎的想法暂时延后，还是先做点东西出来吧
    2.选中卡&棋子时、左侧的提示卡牌内容应该再补充，类似移动步数、次数
    3.召唤卡牌时，左侧的法力值闪烁以提示用户当前费用更好，可否召唤颜色不同。
    4.在喵点时，最好有提示框。
    5.卡牌上应该有费用、攻击、移动等图标。
    
    
1.19
    GameScene做场景类的开发
    TestScene做棋盘类的开发


2022.8.25
    单机化
    data处理：
            1.json  -> 只允许native
            2.用代码去写    ->工作量大 不易更改
            3.sqlite
    ->>需要一个python来生成json文件
        ->>execl->>json->>obj供使用

8.26
    尝试修改cocos run
    ->>改使用python方案
    ->>需要调整加载优先级
    ->>工具完成✅

8.29
    继承关系优化
    ai？
    右边框要允许折叠展开
    左边的卡要考虑动态？
    选地图？（类似97）
    小地图制作
    游戏逻辑讨论：
        -->模仿游戏王类型抽卡  -->意味着第一回合的多牌
                            -->过牌系统
        -->模仿炉石传说的费用系统
                            -->意味着前期的慢节奏
                            -->过牌系统
        -->期望
                -->火焰纹章？-->角色不死-->pass
                -->要有核心 -->植物园、动物园、海洋、亡灵
                -->建筑卡概念
                -->要有骰子（随机）-->pass
                -->恢复能量的概念   -->pass

    确定规则：
        1.20-80张卡
        2.每回合抽2张卡
        3.每回合上怪数量不限制
        4.卡类型：  -->怪物卡-->直用直召
                    -->建筑卡-->摆放、建造、召唤、无法移动
                    -->魔法卡-->生效
                    -->陷阱卡-->条件、触发
        5.图鉴里没有的卡，在实战中看不到效果说明和属性
    
    *工作清单：
    1.工程结构优化
    2.优化继承关系
        -> 
        -> 合并相似 类
    3.代码优化
        <!-- UIPieceMonster -->
        <!-- checkerboard -->
        <!-- 网络 -->
        ->cardGroup 串流
        ->UIMailbox 做一个单例流
    4.要高点资源了