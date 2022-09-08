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
var StudyshowPassageItemList = new Array();
var StudyshowPassageArea = null;


function StudyshowPassageObj(topic,content){
    this.topic = topic;
    this.content = content;
    this.date = new Date();

    this.viewContent = document.createElement('div');

    this.viewContent.index = 0; // 用于确定该对象在数组的索引

    this.viewContent.className = "StudyshowPassageItem "
    this.viewContent.textContent = this.topic + "  " + this.date.getFullYear() + "/" + this.date.getMonth() +"/" + this.date.getDate() ;

    this.btn = document.createElement('span');
    this.btn.className = "iconfont icon-shanchu";
    this.viewContent.appendChild(this.btn);

    this.viewContent.firstElementChild.onclick = function(){
        this.parentElement.onclick = function(){
            return false;
        }
        if(StudyshowPassageArea){
            StudyshowPassageArea.display = 'none';
            for(var i = 1;i < CenterItems.length;i++){
                CenterItems[i].style.display = 'block';
            }
        }
        this.parentElement.remove()
    }

    StudyshowPassageList.append(this.viewContent);
}

// 每次表单提交后的事件
StudyshowSubmitBtn.onclick = function(){
    var StudyshowPassageItem = new StudyshowPassageObj(document.StudyshowSubmit.topic.value,document.StudyshowSubmit.content.value);
    StudyshowPassageItemList.push(StudyshowPassageItem);
    StudyshowPassageItem.viewContent.index = StudyshowPassageItemList.length - 1;
    StudyshowPassageItem.viewContent.onclick = StudyshowPassageItemClick;
}


// 文章标题点击的事件
function StudyshowPassageItemClick(){
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
