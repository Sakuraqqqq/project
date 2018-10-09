function ShowImg(ele) {
    if (typeof ele === 'string') {
        ele = document.querySelector(ele);
    }
    this.$ele = ele;
}
ShowImg.prototype.showImg = function () {
    var _this = this;
    function init() {
        this.$tipBox = _this.$ele.querySelector('.main-banner-prc');
        this.$tipLiAll = this.$tipBox.children;
        this.$bannerBox = _this.$ele.querySelector('.main-img-box');
        this.$bannerLiAll = this.$bannerBox.children;
        var first = this.$bannerLiAll[0];
        var last = this.$bannerBox.lastElementChild;
        this.$bannerBox.appendChild(first.cloneNode(true));
        this.$bannerBox.insertBefore(last.cloneNode(true), first);
        this.$bannerBox.style.left = '-680px';
        for (var i = 0; i < this.$tipLiAll.length; i++) {
            this.$tipLiAll[i].index = i;
        }
        this.index = 0;
        event();
        autoPlay();
    }   
    init();
    function event() {
        var _this = this;
        this.$tipBox.onclick = function (e) {
            clearInterval(timer);
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.nodeName == 'LI') {
                showImage(target.index);
                autoPlay();
            }
        }
    }
    function showImage(index) {
        var maxIndex = this.$tipLiAll.length - 1;
        if (index > maxIndex) {
            index = 0;
            this.$bannerBox.style.left = 0;
        } else if (index < 0) {
            index = maxIndex;
            this.$bannerBox.style.left = -680 * (maxIndex + 2) + 'px';
        }
        this.index = index;
        for (var i = 0; i < this.$tipLiAll.length; i++) {
            this.$tipLiAll[i].removeAttribute('class');
        }
        this.$tipLiAll[index].className = 'active';
        move(this.$bannerBox, 'left', -680 * (index + 1));
    }
    function autoPlay() {
        _this=this;
        timer = setInterval(function () {
            showImage(_this.index+1);
        }, 2000)
    }
}
function move(ele, attr, target) {
    if (typeof ele == 'string') {
        ele = document.querySelector(ele);
    }
    clearInterval(ele.timer);
    var init = parseInt(getStyle(ele, attr));
    ele.timer = setInterval(function () {
        var speed = (target - init) / 20;
        if(speed > 0) {
            speed = Math.ceil(speed);
        } else {
            speed = Math.floor(speed);
        }
        init += speed
        if ((speed >= 0 && init >= target) || (speed <= 0 && init <= target)) {
            init = target;
            clearInterval(ele.timer);
        }
        ele.style[attr] = init + 'px';
    }, 10)

}

function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
}