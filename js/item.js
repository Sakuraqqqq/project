var glass = (function () {

    return {
        init: function () {
            // 获取最大的盒子
            this.$box = document.querySelector('.goods-detail');
            // 获取展示图片的盒子
            this.$showImage = this.$box.querySelector('.show-box');
            // 获取放大图片的盒子
            this.$showBigImage = this.$box.querySelector('.bigImg');
            // 获取小图片的盒子
            this.$ulbox = this.$box.querySelector('.slider-thumb');
            // 获取每一张图片的li集合
            this.$liAll = this.$ulbox.children;
            // 获取移动的小黑块(放大镜)
            this.$filter = this.$showImage.querySelector('.filter');
            // 给每一li添加索引， 方便获取
            for (var i = 0; i < this.$liAll.length; i++) {
                this.$liAll[i].index = i;
            }
            this.event();

        },
        event: function () {
            var _this = this;
            // 利用事件委托，给每一个li添加点击事件
            this.$ulbox.onmouseover = function (ev) {
                ev = ev || window.event;
                // 获取目标元素
                var target = ev.target || ev.srcElement;
                // 这里点击的是img
                if (target.nodeName == 'IMG') {
                    _this.showImage(target.parentNode.parentNode.index);
                }

            }

            // 这里用onmouseenter： 子元素不触发事件
            this.$showImage.onmouseenter = function () {
                // 放大镜显示
                _this.$filter.style.display = 'block';
                // 展示大图片显示
                _this.$showBigImage.style.display = 'block';
                // 注意: 需要放大镜显示以后,才可以获取真正的放大镜尺寸
                _this.maxX = this.children[0].clientWidth - _this.$filter.offsetWidth+this.children[0].offsetLeft;
                _this.maxY = this.children[0].clientHeight - _this.$filter.offsetHeight+this.children[0].offsetTop;
            }
            this.$showImage.onmouseleave = function () {
                _this.$filter.style.display = 'none';
                _this.$showBigImage.style.display = 'none';
            }
            // 在展示图片盒子里移动
            this.$showImage.onmousemove = function (ev) {
                // 计算放大镜的位置
                var x = ev.pageX - _this.$filter.offsetWidth / 2 - _this.$showImage.offsetLeft-145;
                var y = ev.pageY - _this.$filter.offsetHeight / 2 - _this.$showImage.offsetTop-260;
                // 边界处理
                if (x < this.children[0].offsetLeft) {
                    x = this.children[0].offsetLeft;
                } else if (x > _this.maxX) {
                    x = _this.maxX;
                }
                if (y < this.children[0].offsetTop) {
                    y = this.children[0].offsetTop;
                } else if (y > _this.maxY) {
                    y = _this.maxY;
                }
                console.log(x,y)
                _this.$filter.style.left = x + 'px';
                _this.$filter.style.top = y +'px';

                // 移动大图片
                var img = _this.$showBigImage.querySelector('img');
                img.style.left = x * -2 + 'px';
                img.style.top = y * -2 + 'px';

            }

        },
        showImage: function (index) {
            console.log(index);
            for (var i = 0; i < this.$liAll.length; i++) {
                this.$liAll[i].className = ''
            }
            this.$liAll[index].className = 'active';
            // 修改对应的图片地址
            var src = this.$liAll[index].querySelector('img').getAttribute('src');
            this.$showImage.querySelector('img').src = src.replace('_small', '');
            this.$showBigImage.querySelector('img').src = src.replace('_small', '');
            console.log(src);

        }
    }
}())







// var glass =(function () {

//     return {

//         // x为放大倍数
//         init: function (x) {
//             this.Multiple = x || 2;
//             // 获取最大的盒子
//             this.$box = document.querySelector('.goods-detail');
//             // 获取展示图片的盒子
//             this.$showImage = this.$box.querySelector('.show-box');
//             // 获取放大图片的盒子
//             this.$showBigImage = this.$box.querySelector('.bigImg');
//             // 获取小图片的盒子
//             this.$ulbox = this.$box.querySelector('.slider-thumb');
//             // 获取每一张图片的li集合
//             this.$liAll = this.$ulbox.children;
//             // 获取移动的小黑块(放大镜)
//             this.$filter = this.$showImage.querySelector('.filter');


//             // 给每一li添加索引， 方便获取
//             for (var i = 0; i < this.$liAll.length; i++) {
//                 this.$liAll[i].index = i;
//             }

//             this.event();
//         },
//         event: function () {
//             var _this = this;
//             // 利用事件委托，给每一个li添加点击事件
//             this.$ulbox.onclick = function (ev) {
//                 ev = ev || window.event;
//                 var target = ev.target || ev.srcElement;
//                 console.log(target.nodeName);
//                 // 点击时，真正触发的为图片。
//                 if (target.nodeName === 'IMG') {
//                     // 获取li的索引 =》target.parentNode.index
//                     // 点击触发更换图片
//                     _this.showImage(target.parentNode.parentNode.index)
//                 }
//             }

//             // 这里用onmouseenter： 子元素不触发事件
//             this.$showImage.onmouseenter = function () {
//                 // 放大镜显示
//                 _this.$filter.style.display = 'block';
//                 // 展示大图片显示
//                 _this.$showBigImage.style.display = 'block';

//                 // 如果展示盒子的尺寸不变， 需要修改放大镜的尺寸，和图片的尺寸，保持等比关系
//                 // 获取展示盒子的宽度高度
//                 _this.bigWidth = _this.$showBigImage.clientWidth;
//                 _this.bigHeight = _this.$showBigImage.clientHeight;
//                 // 设置小盒子宽高
//                 _this.$filter.style.width = _this.bigWidth / _this.Multiple + 'px';
//                 _this.$filter.style.height = _this.bigHeight / _this.Multiple + 'px';
//                 // 设置大图片宽度
//                 _this.$showBigImage.querySelector('img').style.width = this.offsetWidth * _this.Multiple + 'px';
//             }
//             this.$showImage.onmouseleave = function () {
//                 _this.$filter.style.display = 'none';
//                 _this.$showBigImage.style.display = 'none';
//             }
//             this.$showImage.onmousemove = function (ev) {
//                 ev = ev || window.event;
//                 // 计算小方块定点坐标
//                 var x = ev.pageX - this.offsetLeft - _this.$filter.offsetWidth-_this.$filter.offsetWidth/2;
//                 var y = ev.pageY - this.offsetTop - _this.$filter.offsetHeight- _this.$filter.offsetHeight;
//                 // 获取小方块移动的最大坐标
//                 var maxL = this.clientWidth - _this.$filter.offsetWidth,
//                     maxT = this.clientHeight - _this.$filter.offsetHeight;
//                 if (x >= maxL) {
//                     x = maxL
//                 } else if (x <= 0) {
//                     x = 0;
//                 }
//                 if (y >= maxT) {
//                     y = maxT;
//                 } else if (y <= 0) {
//                     y = 0;
//                 }
//                 _this.$filter.style.left = x + 'px';
//                 _this.$filter.style.top = y + 'px';

//                 var img = _this.$showBigImage.querySelector('img');
//                 img.style.left = -_this.Multiple * x + 'px';
//                 img.style.top = -_this.Multiple * y + 'px';
//             }
//         },
//         showImage: function (index) {
//             console.log(index);
//             for (var i = 0; i < this.$liAll.length; i++) {
//                 this.$liAll[i].className = ''
//             }
//             this.$liAll[index].className = 'active';
//             // 修改对应的图片地址
//             var src = this.$liAll[index].querySelector('img').getAttribute('src');
//             this.$showImage.querySelector('img').src = src.replace('_small', '');
//             this.$showBigImage.querySelector('img').src = src.replace('_small', '');
//             console.log(src);
//         }
//     }

// }())
var index_js = (function () {
    // 获取已添加的商品列表，没有商品的时候，获取的是undifinde，默认给一个空数组
    var shopList = localStorage.shopList || '[]';
    shopList = JSON.parse(shopList);
    return {
        init() {
            this.$ul = document.getElementById('detail');
            console.log(this)
            this.events();
        },
        addShop(obj) {

            // 从本地数据库获取数据， 查看商品是否已拥有。
            // -> 拥有 在原来的基础上累加数量
            // -> 未拥有 新增一条新的数据
            // 假设把商品存到了shopList属性里

            // 在没有添加数据时，字段值为undefined，给一个默认数组
            // var shopList = localStorage.shopList || '[]'
            // shopList = JSON.parse(shopList);
            // 添加一个锁
            var add = true;
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            for (var i = 0; i < shopList.length; i++) {
                if (obj.name == shopList[i].name) {
                    add = false
                    shopList[i].count += obj.count;
                    break;
                }
            }
            if (add) {
                // 如果没找到， 把当前商品数据添加到本地数据库
                shopList.push(obj);
            }
            // 真正意义把数据存储到本地数据库
            localStorage.shopList = JSON.stringify(shopList);
            // console.log(localStorage.shopList)
        },
        events() {
            var _this = this;
            _this.$ul.onclick = function (ev) {
                ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                if (target.nodeName == 'BUTTON') {
                    var goodsName = target.parentNode.parentNode.parentNode.children[0].children[0].children[1].innerText;
                    var $goodsUl = target.parentNode.parentNode.parentNode.children[1].children[0];
                    var $count = target.parentNode.parentNode.children[1].children[1].children[0].children[0].value;
                    console.log($count)
                    var $liAll = $goodsUl.children;
                    var obj = {
                        // id:$goodsUl.attr('id'),
                        count: Number($count),
                        name: goodsName,
                        price: $liAll[1].children[1].children[0].innerText
                    }
                    _this.addShop(obj);
                }
            }
            // $ul.on('click', '.cart-btn', function() {
            //     // 目的： 获取商品信息，存到本地数据库
            //     var tr = $(this).parentNode.parentNode.parentNode.children(1).children(0);
            //     console.log(tr);
            //     // 先找到tr，通过tr获取下面的td
            //     var tdAll = tr.children('td');
            //     var obj = {
            //         // 再次添加商品时，通过id判断是否已拥有
            //         id: tr.attr('id'),
            //         // 获取购买数量
            //         count: Number(tdAll.find('input').val()),
            //         // 获取商品名称
            //         name: tdAll.eq(0).html(),
            //         // 获取商品价格
            //         price: tdAll.eq(1).html()
            //     }
            //     _this.addShop(obj);
            // })
        }
    }
})()
