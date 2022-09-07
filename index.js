// 轮播图
var SlideshowImgMove = 0;
var SlideshowImgMoveSpeed = 30;
var SlideshowTimer = null;
var SlideshowImg = document.querySelector(".Slideshow .img ul");
var PreBtn = document.querySelector(".PreBtn")
var NextBtn = document.querySelector(".NextBtn")
var SlideshowSelect = document.querySelectorAll(".Slideshow .img .select li")
var SlideshowImgNum = 0;


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

NextBtn.onclick = function(){
    let next = Math.floor( -SlideshowImgMove / 500) + 1;
    if(next == 6){
        next = 0;
    }
    SlideshowImgChange(next);
    SlideshowSelectChange(next);
}

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

