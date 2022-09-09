// 全局变量
var CenterItems = document.getElementsByClassName('center-item');
var Center = document.getElementsByClassName('center')


// 轮播图
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

// 学习记录区域

var StudyshowPassageList = document.querySelector(".StudyshowPassage");
var StudyshowSubmitBtn = document.querySelector(".StudyshowSubmitBtn");
var StudyshowPassageSortBtn = document.querySelector(".icon-paixu")
var StudyshowPassageDelSomeBtn = document.querySelector(".icon-piliangshanchu")
var StudyshowPassageItemList = new Array();
var StudyshowPassageArea = null; // 右侧展示文章的区域
var StudyshowPassageDelItemList = new Array(); // 存放批量删除的对象

var StudyshowPassageDelSomeFlag = 0; // 用于判定批量删除两次按下不同的事件
var StudyshowPassageSortFlag = 0; // 用于排序的判定

// 建立一个对象用于存储学习记录
function StudyshowPassageObj(topic,content){
    // 基本属性设置
    this.topic = topic;
    this.content = content;
    this.date = new Date();

    this.viewContent = document.createElement('div');

    this.viewContent.index = 0; // 用于确定该对象在数组的索引

    this.viewContent.className = "StudyshowPassageItem "
    this.viewContent.textContent = this.topic + "  " + this.date.getFullYear() + "/" + this.date.getMonth() +"/" + this.date.getDate() ;

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
    // 创立学习记录
    var StudyshowPassageItem = new StudyshowPassageObj(document.StudyshowSubmit.topic.value,document.StudyshowSubmit.content.value);
    // 存进学习记录的数组
    StudyshowPassageItemList.push(StudyshowPassageItem);
    // 获取当前记录在数组中的索引值
    StudyshowPassageItem.viewContent.index = StudyshowPassageItemList.length - 1;
    StudyshowPassageItem.btn.index = StudyshowPassageItem.viewContent.index;
    StudyshowPassageItem.viewContent.onclick = StudyshowPassageItemClick;
}


// 文章标题点击的事件
function StudyshowPassageItemClick(){

    
    // 把右侧区域隐藏除了头部 
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
    StudyshowPassageArea.className = 'StudyshowPassageArea';
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
        for(var i = 1;i < CenterItems.length;i++){
            CenterItems[i].style.display = 'block';
        }
    }
    
    // 删除之后默认返回首页
    StudyshowPassageDelBtn.onclick = function(){
        StudyshowPassageArea.remove();
        for(var i = 1;i < CenterItems.length;i++){
            CenterItems[i].style.display = 'block';
        }
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
            StudyshowPassageArea.display = 'none';
            for(var i = 1;i < CenterItems.length;i++){
                CenterItems[i].style.display = 'block';
            }
        }
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
StudyshowPassageDelSomeBtn.onclick = function(){
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
        if(StudyshowPassageArea){
            StudyshowPassageArea.display = 'none';
            for(var i = 1;i < CenterItems.length;i++){
                CenterItems[i].style.display = 'block';
            }
        }
        for(var i = 0;i< StudyshowPassageDelItemList.length;i++){
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
    if(!StudyshowPassageSortFlag){
        for(var i = StudyshowPassageItemList.length - 1; i >= 0;i--){
            if(StudyshowPassageItemList[i].viewContent){
                StudyshowPassageList.appendChild(StudyshowPassageItemList[i].viewContent);
            }
        }
        StudyshowPassageSortFlag = 1;
    }else{
        for(var i = 0; i < StudyshowPassageItemList.length;i++){
            if(StudyshowPassageItemList[i].viewContent){
                StudyshowPassageList.appendChild(StudyshowPassageItemList[i].viewContent);
            }
        }
        StudyshowPassageSortFlag = 0;
    }
    
}