// 全局变量
var CenterItems = document.getElementsByClassName('center-item');
var Center = document.getElementsByClassName('center');
var Body = document.getElementById("Body")
var LeftItems = document.getElementsByClassName('left-item')
var ThemeFlag = 0;

// 导航栏的变量
var LeaveWordsArea = document.querySelector(".LeaveWordsArea")
var HomeBtn = LeaveWordsBtn = document.querySelector(".header .top .TopItem2");
var LeaveWordsBtn = document.querySelector(".header .top .TopItem3")
var ThemeBtn1 = document.querySelector(".ThemeColor .origin")
var ThemeBtn2 = document.querySelector(".ThemeColor .black")
var ThemeBtn3 = document.querySelector(".ThemeColor .white")

// 通用函数
$(document).ready(function(){
    $("input").focus(function(){
        $(this).css("background-color","#eaeaef");
      });
      $("input").blur(function(){
        $(this).css("background-color","#ffffff");
      });
      $("textarea").focus(function(){
        $(this).css("background-color","#eaeaef");
      });
      $("textarea").blur(function(){
        $(this).css("background-color","#ffffff");
      });
})


/* 返回首页 */
HomeBtn.onclick = function(){
    LeaveWordsArea.style.display = 'none';
    if(StudyshowPassageArea){
        StudyshowPassageArea.remove();
    }
    for(var i = 0; i < CenterItems.length;i++){
        CenterItems[i].style.display = 'block';
    }
    Center[0].style.display = 'block';
}

/* 打开留言板页面 */
LeaveWordsBtn.onclick = function(){
    LeaveWordsArea.style.display = 'block';
    Center[0].style.display  = 'none';
    if(StudyshowPassageArea){
        StudyshowPassageArea.remove();
    }
}



/* 选取主题 */
ThemeBtn1.onclick = function(){
    ThemeFlag  = 0;
    Body.style.color = "#fff";
    Body.style.background = "url(./img/bg.png) no-repeat fixed"
    for(var i = 0; i < CenterItems.length ;i ++){
        CenterItems[i].style.background = 'rgba(18,18,18,0.8)';
    }
    for(var i = 0; i < LeftItems.length ;i ++){
        LeftItems[i].style.background = 'rgba(18,18,18,0.8)';
    }
    if(StudyshowPassageArea){
        StudyshowPassageArea.style.background = 'rgba(18,18,18,0.8)';
    }
    LeaveWordsArea.style.backgroundColor  = 'rgba(18,18,18,0.8)';
}

ThemeBtn2.onclick = function(){
    ThemeFlag = 1;
    Body.style.color = "#4f92e0";
    Body.style.background = " #121212 no-repeat fixed"
    for(var i = 0; i < CenterItems.length ;i ++){
        CenterItems[i].style.background = 'rgba(193,76,59,0.8)';
    }
    for(var i = 0; i < LeftItems.length ;i ++){
        LeftItems[i].style.background = 'rgba(193,76,59,0.8)';
    }
    if(StudyshowPassageArea){
    StudyshowPassageArea.style.background = 'rgba(193,76,59,0.8)';
    }
    LeaveWordsArea.style.backgroundColor  = 'rgba(193,76,59,0.8)';
}

ThemeBtn3.onclick = function(){
    ThemeFlag = 2;
    Body.style.color = "#121212";
    Body.style.background = " #639a72 no-repeat fixed"
    for(var i = 0; i < CenterItems.length ;i ++){
        CenterItems[i].style.background = 'rgba(110, 86, 76, 0.8)';
    }
    for(var i = 0; i < LeftItems.length ;i ++){
        LeftItems[i].style.background = 'rgba(110, 86, 76, 0.8)';
    }
    if(StudyshowPassageArea){
        StudyshowPassageArea.style.background = 'rgba(110, 86, 76, 0.8)';
    }
    
    LeaveWordsArea.style.backgroundColor= 'rgba(110, 86, 76, 0.8)';
    
}


/* 轮播图 */
var SlideshowImgMove = 0;
var SlideshowImgMoveSpeed = 30;
var SlideshowTimer = null;
var SlideshowImg = document.querySelector(".Slideshow .img ul");
var PreBtn = document.querySelector(".PreBtn")
var NextBtn = document.querySelector(".NextBtn")
var SlideshowSelect = document.querySelectorAll(".Slideshow .img .select li")
var SlideshowImgNum = 0;

// 实现自己移动
function run(){
    if(SlideshowImgMove<=-3000){
        SlideshowImgMove = 0;
    }
    SlideshowImgNum = Math.floor(-SlideshowImgMove / 500)
    SlideshowImg.style.marginLeft = SlideshowImgMove +'px';
    SlideshowImgMoveSpeed = (SlideshowImgMove % 500 == 0) ? SlideshowImgMoveSpeed = 1200 : 10
    SlideshowImgMove -= 10;
    SlideshowTimer = setTimeout(run,SlideshowImgMoveSpeed);
    SlideshowSelectChange(SlideshowImgNum);
}

run()

// 图片定位函数
function SlideshowImgChange(temp){
    let left = -(temp * 500);
    SlideshowImg.style.marginLeft  = left + "px";
    SlideshowImgMove = left;
}

// 向前
PreBtn.onclick = function(){
    let pre = Math.floor( -SlideshowImgMove / 500) - 1;
    console.log(pre)
    if(pre == -1){
        pre = 5;
    }
    console.log(pre)
    SlideshowImgChange(pre);
    SlideshowSelectChange(pre);
}

// 向后
NextBtn.onclick = function(){
    let next = Math.floor( -SlideshowImgMove / 500) + 1;
    if(next == 6){
        next = 0;
    }
    SlideshowImgChange(next);
    SlideshowSelectChange(next);
}

// 圆点序号的改变
function SlideshowSelectChange(temp){
    for(let index = 0; index < SlideshowSelect.length;index ++){
        SlideshowSelect[index].style.backgroundColor = '';
    }
    if(temp < SlideshowSelect.length){
        SlideshowSelect[temp].style.backgroundColor = "#73374B";
    }
}

for(let i = 0;i < SlideshowSelect.length;i++){
    SlideshowSelect[i].onclick = function(){
        SlideshowImgChange(i);
        SlideshowSelectChange(i);
    }
    SlideshowSelect[i].onmouseover = function(){
        clearTimeout(SlideshowTimer);
     }
     SlideshowSelect[i].onmouseout = function(){
        run();
    }
}





/* 学习记录区域 */

var StudyshowPassageList = document.querySelector(".StudyshowPassage");
var StudyshowSubmitBtn = document.querySelector(".StudyshowSubmitBtn");
var StudyshowPassageSortBtn = document.querySelector(".icon-paixu")
var StudyshowPassageDelSomeBtn = document.querySelector(".icon-piliangshanchu")
var StudyshowPassageItemList = new Array();
var StudyshowPassageArea = null; // 右侧展示文章的区域
var StudyshowPassageDelItemList = new Array(); // 存放批量删除的对象
var passagecount = parseInt(localStorage.getItem("passagecount")) // 读取之前的对象列表长度

var StudyshowPassageDelSomeFlag = 0; // 用于判定批量删除两次按下不同的事件
var StudyshowPassageSortFlag = 0; // 用于排序的判定

// 获取本地存储信息,导进之前写过的文章
for(var i = 0; i < passagecount; i++){
    if(localStorage.getItem('StudyshowPassage' + i)){
        let item = JSON.parse(localStorage.getItem('StudyshowPassage' + i));
        if(item.flag ==1){
            let passage = new StudyshowPassageObj(item.topic,item.content,item.date);
            StudyshowPassageItemList.push(passage)
            passage.viewContent.index = StudyshowPassageItemList.length - 1;
            passage.btn.index = passage.viewContent.index;
            passage.viewContent.onclick = StudyshowPassageItemClick;
            item = JSON.stringify(passage);
            localStorage['StudyshowPassage'+ passage.viewContent.index] = item;
        }
    }
}

// 清除本地存储中没用的数据
for(i = StudyshowPassageItemList.length; i < passagecount; i++){
    if(localStorage.getItem('StudyshowPassage' + i)){
        localStorage.removeItem('StudyshowPassage' + i)
    }
}

// 建立一个对象用于存储学习记录
function StudyshowPassageObj(topic,content,date){
    // 基本属性设置
    this.topic = topic;
    this.content = content;
    if(date){
        this.date = date;
    }else{
        this.date = new Date();
        this.date = this.date.getFullYear() + "/" + this.date.getMonth() + "/" +this.date.getDate() + "";
    }
    this.flag = 1;// 用于判断该元素是否被删除

    this.viewContent = document.createElement('div');

    this.viewContent.index = 0; // 用于确定该对象在数组的索引

    this.viewContent.className = "StudyshowPassageItem "
    this.viewContent.textContent = this.topic + "  " + this.date ;

    // 按钮的设置
    this.btn = document.createElement('span');
    this.btn.className =  "iconfont icon-shanchu";
    this.btn.index = -1; // 用于确定该对象在数组的索引
    this.btn.Delindex = -1; //用于确定该对象在删除数组的索引
    this.btn.flag = 0; // 用来判定文章标题旁边删除按钮的变化
    
    this.viewContent.appendChild(this.btn);

    this.viewContent.firstElementChild.onclick = StudyshowPassageObjDelBtn;
    StudyshowPassageList.appendChild(this.viewContent);
}

// 每次表单提交后的事件
StudyshowSubmitBtn.onclick = function(){

    if(document.StudyshowSubmit.topic.value == ''){
        alert("请输入标题")
        return ;
    }

    if(document.StudyshowSubmit.content.value == ''){
        alert("请输入内容")
        return ;
    }

    // 创立学习记录
    var StudyshowPassageItem = new StudyshowPassageObj(document.StudyshowSubmit.topic.value,document.StudyshowSubmit.content.value);
    // 存进学习记录的数组
    StudyshowPassageItemList.push(StudyshowPassageItem);
    // 获取当前记录在数组中的索引值
    StudyshowPassageItem.viewContent.index = StudyshowPassageItemList.length - 1;
    StudyshowPassageItem.btn.index = StudyshowPassageItem.viewContent.index;
    
    // 对象存储到Local Storage
    let item = JSON.stringify(StudyshowPassageItem)
    localStorage.setItem('StudyshowPassage'+ StudyshowPassageItem.viewContent.index,item)
    
    // 数组总长度记录到Local Storage
    let length = StudyshowPassageItemList.length ;
    localStorage.setItem('passagecount',length)

    StudyshowPassageItem.viewContent.onclick = StudyshowPassageItemClick;
}


// 文章标题点击的事件
function StudyshowPassageItemClick(){

    
    // 把右侧区域隐藏除了头部 
    LeaveWordsArea.style.display = 'none';
    Center[0].style.display = 'block';
    for(var i = 1;i < CenterItems.length;i++){
        CenterItems[i].style.display = 'none';
        if(StudyshowPassageArea){
            StudyshowPassageArea.remove()
        }
    }

    // 选择当前的文章对象
    var StudyshowPassageItemSelected = StudyshowPassageItemList[this.index];

    // 展示区域
    
    StudyshowPassageArea = document.createElement('div');
    StudyshowPassageArea.className = 'StudyshowPassageArea center-item';
    if(ThemeFlag == 0){
        StudyshowPassageArea.style.background = '#121212';
        StudyshowPassageArea.style.opacity = '0.8';
    }else if(ThemeFlag == 1){
        StudyshowPassageArea.style.background = '#c14c3b';
        StudyshowPassageArea.style.opacity = '0.8';
    }else if(ThemeFlag == 2){
        StudyshowPassageArea.style.background = 'rgba(110, 86, 76, 0.8)';
    }

    Center[0].append(StudyshowPassageArea);

    // 创建展示标题
    var StudyshowPassageTopic = document.createElement('div');
    StudyshowPassageTopic.className = "StudyshowPassageTopic";
    StudyshowPassageTopic.textContent = StudyshowPassageItemSelected.topic + '';
    StudyshowPassageArea.appendChild(StudyshowPassageTopic);

    // 创建展示的内容
    var StudyshowPassageContent =  document.createElement('div');
    StudyshowPassageContent.className = "StudyshowPassageContent";
    StudyshowPassageContent.textContent = StudyshowPassageItemSelected.content + '';
    StudyshowPassageArea.appendChild(StudyshowPassageContent);

    // 创建返回首页和删除的按钮
    var StudyshowPassageHomeBtn = document.createElement('button');
    var StudyshowPassageDelBtn = document.createElement('button');
    StudyshowPassageHomeBtn.className = 'StudyshowPassageHomeBtn';
    StudyshowPassageDelBtn.className = 'StudyshowPassageDelBtn';
    StudyshowPassageHomeBtn.textContent = '首页';
    StudyshowPassageDelBtn.textContent = '删除';
    StudyshowPassageArea.appendChild(StudyshowPassageHomeBtn);
    StudyshowPassageArea.appendChild(StudyshowPassageDelBtn);

    // 为按钮添加事件
    StudyshowPassageHomeBtn.onclick = function(){
        StudyshowPassageArea.remove();
        for(var i = 0;i < CenterItems.length;i++){
            CenterItems[i].style.display = 'block';
        }
    }
    
    // 删除之后默认返回首页
    StudyshowPassageDelBtn.onclick = function(){
        LeaveWordsArea.style.display = 'none';
        StudyshowPassageArea.remove();
        Center[0].style.display = 'block';
        for(var i = 0;i < CenterItems.length;i++){
            CenterItems[i].style.display = 'block';
        }
        
        StudyshowPassageItemSelected.flag = 0;
        let item = JSON.stringify(StudyshowPassageItemSelected);
        localStorage['StudyshowPassage' +  StudyshowPassageItemSelected.viewContent.index] = item;
        StudyshowPassageItemSelected.viewContent.remove();
    }
}

// 文章旁边删除按钮的事件
function StudyshowPassageObjDelBtn(){
    this.parentElement.onclick = function(){
        return false;
    }
    if(this.flag == 0){
        if(StudyshowPassageArea){
            LeaveWordsArea.style.display = 'none';
            StudyshowPassageArea.remove();
            Center[0].style.display = 'block';
            for(var i = 1;i < CenterItems.length;i++){
                CenterItems[i].style.display = 'block';
            }
        }
        StudyshowPassageItemList[this.index].flag = 0;
        let item = JSON.stringify(StudyshowPassageItemList[this.index]);
        localStorage['StudyshowPassage' +  this.index] = item;
        this.parentElement.remove()
        
    }else if(this.flag == 1){
        this.style.backgroundColor = 'red';
        StudyshowPassageDelItemList.push(StudyshowPassageItemList[this.index]);
        this.Delindex = StudyshowPassageDelItemList.length - 1; // 保存索引
        this.flag = 2;
    }else{
        this.style.backgroundColor = '';
        StudyshowPassageDelItemList.splice(this.Delindex,1);
        this.Delindex = -1;
        this.flag = 1;
    }
}


// 批量删除按钮
StudyshowPassageDelSomeBtn.onclick = StudyshowPassageDelSome;

function StudyshowPassageDelSome(){
    StudyshowPassageDelFlag = 1;
    if(!StudyshowPassageDelSomeFlag){
        for(var i = 0; i < StudyshowPassageItemList.length; i++){
            if(StudyshowPassageItemList[i].viewContent){
                StudyshowPassageItemList[i].btn.className= "StudyshowPassageObjDel";
                StudyshowPassageItemList[i].btn.flag = 1;
            }
        }
        StudyshowPassageDelSomeFlag = 1;
    }else{
        LeaveWordsArea.style.display = 'none';
        if(StudyshowPassageArea){
            StudyshowPassageArea.remove();
            for(var i = 1;i < CenterItems.length;i++){
                CenterItems[i].style.display = 'block';
            }
        }
        for(var i = 0;i< StudyshowPassageDelItemList.length;i++){
            StudyshowPassageDelItemList[i].flag = 0;
            let item =  JSON.stringify(StudyshowPassageDelItemList[i]) ;
            localStorage['StudyshowPassage'+StudyshowPassageDelItemList[i].viewContent.index] = item
            StudyshowPassageDelItemList[i].viewContent.remove();
        }
        for(var i = 0; i < StudyshowPassageItemList.length; i++){
            if(StudyshowPassageItemList[i].viewContent){
                StudyshowPassageItemList[i].btn.className= "iconfont icon-shanchu";
                StudyshowPassageItemList[i].btn.flag = 0;
            }
        }
        StudyshowPassageDelSomeFlag = 0;
    }
}

// 排序按钮功能
StudyshowPassageSortBtn.onclick = function(){
    StudyshowPassageList.innerHTML='<div class="iconfont icon-piliangshanchu">批量删除</div>';
    StudyshowPassageDelSomeBtn = document.querySelector(".icon-piliangshanchu")
    StudyshowPassageDelSomeBtn.onclick = StudyshowPassageDelSome;
    if(!StudyshowPassageSortFlag){
        for(var i = StudyshowPassageItemList.length - 1; i >= 0;i--){
            if(StudyshowPassageItemList[i].flag){
                StudyshowPassageList.appendChild(StudyshowPassageItemList[i].viewContent);
            }
        }
        StudyshowPassageSortFlag = 1;
    }else{
        for(var i = 0; i < StudyshowPassageItemList.length;i++){
            if(StudyshowPassageItemList[i].flag){
                StudyshowPassageList.appendChild(StudyshowPassageItemList[i].viewContent);
            }
        }
        StudyshowPassageSortFlag = 0;
    }   
}





/* 留言板 */


var LeaveWordsSubBtn = document.querySelector("#LeaveWords .submit");
var LeaveWordsAreaMain = document.querySelector(".LeaveWordsMain");
var LeaveWordsSelectBtn = document.querySelector("#LeaveWordsSelect .submit")

var leavewordscount = localStorage.getItem("leavewordscount");
var LeaveWordsItemList = new Array();

// 读取之前的留言记录
for(var i = 0; i < leavewordscount;i++){
    if(localStorage.getItem("leavewords" + i)){
        let item = JSON.parse(localStorage.getItem("leavewords" + i));
        if(item.flag == 1){
            let temp = new LeaveWordsObj(item.name,item.gender,item.grade,item.content,item.date);
            LeaveWordsItemList.push(temp);
            temp.viewContent.index = LeaveWordsItemList.length - 1;
            temp.btn.index = LeaveWordsItemList.length - 1;
            item = JSON.stringify(temp)
            localStorage.setItem("leavewords" + temp.btn.index,item);
        }
    }
}

for(var i = LeaveWordsItemList.length; i < leavewordscount;i++){
    if(localStorage.getItem("leavewords" + i)){
        localStorage.removeItem("leavewords" + i)
    }
}

// 创建一个对象用于存储留言
function LeaveWordsObj(name,gender,grade,content,date){
    this.name = name;
    this.gender = gender;
    this.grade = grade;
    this.content = content;
    this.flag = 1; // 用于判断留言是否已经删除
    if(date){
        this.date = date;
    }else{
        this.date = new Date();
        this.date = this.date.getFullYear() + "/" + this.date.getMonth() + "/" +this.date.getDate() + "";
    }

    this.viewContent = document.createElement('div');
    this.viewContent.className = "LeaveWordsBlock";
    this.viewContent.index = -1;
    LeaveWordsAreaMain.appendChild(this.viewContent)                                               
    
    this.owner = document.createElement('div');
    this.owner.className = "LeaveWordsBlockOwner";
    this.owner.textContent = name + "--" + gender + "--" + grade + "--" + this.date + ":";
    this.viewContent.appendChild(this.owner)

    this.txt = document.createElement("div");
    this.txt.className = "LeaveWordsBlockTxt";
    this.txt.textContent = content + "";
    this.viewContent.appendChild(this.txt);


    this.btn = document.createElement('span');
    this.btn.className = "LeaveWordsBlockBtn";
    this.btn.textContent = "删除";
    this.btn.index = -1;
    this.btn.onclick = LeaveWordsBlockDel;
    this.txt.appendChild(this.btn);
}

// 留言删除事件
function LeaveWordsBlockDel(){
    LeaveWordsItemList[this.index].flag = 0;
    let item = JSON.stringify(LeaveWordsItemList[this.index]);
    localStorage.setItem("leavewords"+this.index,item)
    LeaveWordsItemList[this.index].viewContent.remove();
}

// 表单提交事件
LeaveWordsSubBtn.onclick = function(){
    
    let name = document.LeaveWords.name.value;
    let gender = document.LeaveWords.gender.value;
    let grade = document.LeaveWords.grade.value;
    let content = document.LeaveWords.content.value;
    let number = document.LeaveWords.number.value;

    if(name == ""){
        alert("请输入你的名字")
        return ;
    }

    if(content == ""){
        alert("请输入你的留言内容")
        return ;
    }

    // 验证操作 2021091202009
    r = "202[0-2]|2019\\09\\120[1-3]|090[1-9]|09[1-2][0-9]|0930|16[1-6]\\^\d{3}$"
    r1 = "202209\\120[1-3]|090[1-9]|09[1-2][0-9]|0930|16[1-6]\\^\d{3}$"
    r2 = "09\\120[1-3]|090[1-9]|09[1-2][0-9]|0930|\\^\d{3}$"
    if(!number.match(r)){
        alert("你输错了学号！")
        return ;
    }else{
        if(grade == "大一" && !number.match(r1)){
            alert("你输错了学号！")
            return ;
        }
        if(grade == "大二" && !number.match('2021' + r2)){
            alert("你输错了学号！")
            return ;
        }
        if(grade == "大三" && !number.match('2020' + r2)){
            alert("你输错了学号！")
            return ;
        }
        if(grade == "大四" && !number.match('2019' + r2)){
            alert("你输错了学号！")
            return ;
        }
    }
    // if(number.length != 13){
    //     alert("你输错了学号！")
    //     return ;
    // }else{
    //     if(number.substr(0,4) != '2019' && number.substr(0,4) != '2020' && number.substr(0,4) != '2021' && number.substr(0,4) != '2022'){
    //         alert("你输错了学号！")
    //         return ;
    //     }
    //     if(number.substr(0,4) == '2019' && grade != "大四"){
    //         alert("你输错了学号！")
    //         return ;
    //     }
    //     if(number.substr(0,4) == '2020' && grade != "大三"){
    //         alert("你输错了学号！")
    //         return ;
    //     }
    //     if(number.substr(0,4) == '2021' && grade != "大二"){
    //         alert("你输错了学号！")
    //         return ;
    //     }
    //     if( number.substr(0,4) == '2022' && grade != "大一"){
    //         alert("你输错了学号！")
    //         return ;
    //     }

    //     if(number.substr(4,2) != '09'){
    //         alert("你输错了学号！")
    //         return ;
    //     }

    //     if(number.substr(6,2) != '09' && number.substr(6,2) != '12' && number.substr(6,2) != '16'){
    //         alert("你输错了学号！")
    //         return ;
    //     }

    //     if(number.substr(6,2) == '09' && (parseInt(number.substr(8,2))  < 0 || parseInt(number.substr(8,2)) > 30 )){
    //         alert("你输错了学号！")
    //         return ;
    //     }

    //     if(number.substr(6,2) == '12' && (parseInt(number.substr(8,2))  < 0 || parseInt(number.substr(8,2)) > 3)){
    //         alert("你输错了学号！")
    //         return ;
    //     }

    //     if( number.substr(6,2) == '16'&& (parseInt(number.substr(8,2))  < 0 || parseInt(number.substr(8,2)) > 6 ) && grade != "大一"){
    //         alert("你输错了学号！")
    //         return ;
    //     }
    // }

    var LeaveWordsItem = new LeaveWordsObj(name,gender,grade,content);
    LeaveWordsItemList.push(LeaveWordsItem);
    LeaveWordsItem.btn.index = LeaveWordsItemList.length - 1;
    LeaveWordsItem.viewContent.index = LeaveWordsItemList.length - 1;
    
    // 存入local storage
    let item =JSON.stringify(LeaveWordsItem);
    localStorage.setItem("leavewords" + LeaveWordsItem.btn.index,item);
    
    // 存入这个长度
    leavewordscount = LeaveWordsItemList.length;
    localStorage.setItem("leavewordscount",leavewordscount);
}

// 筛选
LeaveWordsSelectBtn.onclick = function(){
    let gender = document.LeaveWordsSelect.gender.value;
    let grade = document.LeaveWordsSelect.grade.value;
    alert(gender + grade)

    if(gender == "所有"){
        if(grade == "所有"){
            LeaveWordsAreaMain.innerHTML = "";
            for(var i = 0 ;i < LeaveWordsItemList.length;i++){
                if(LeaveWordsItemList[i].flag == 1){
                    LeaveWordsAreaMain.appendChild(LeaveWordsItemList[i].viewContent);
                }
            }
        }else{
            LeaveWordsAreaMain.innerHTML = "";
            for(var i = 0 ;i < LeaveWordsItemList.length;i++){
                if(LeaveWordsItemList[i].flag == 1 && LeaveWordsItemList[i].grade == grade){
                    LeaveWordsAreaMain.appendChild(LeaveWordsItemList[i].viewContent);
                }
            }
        }
    }else{
        if(grade == "所有"){
            LeaveWordsAreaMain.innerHTML = "";
            for(var i = 0 ;i < LeaveWordsItemList.length;i++){
                if(LeaveWordsItemList[i].flag == 1 && LeaveWordsItemList[i].gender == gender){
                    LeaveWordsAreaMain.appendChild(LeaveWordsItemList[i].viewContent);
                }
            }
        }else{
            LeaveWordsAreaMain.innerHTML = "";
            for(var i = 0 ;i < LeaveWordsItemList.length;i++){
                if(LeaveWordsItemList[i].flag == 1 && LeaveWordsItemList[i].gender == gender && LeaveWordsItemList[i].grade == grade){
                    LeaveWordsAreaMain.appendChild(LeaveWordsItemList[i].viewContent);
                }
            }
        }
    }
}
