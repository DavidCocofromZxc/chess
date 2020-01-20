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
