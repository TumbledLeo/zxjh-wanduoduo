let root = "http://www.chncpa.org/ncpa/myn2018/";
// 加载
let loader = new resLoader({
    resources: [
        root + 'images/logo.png',
        root + 'images/musicBtn.png',
        root + 'images/text_title.png',
        root + 'images/text_1.png',
        root + 'images/text_2.png',
        root + 'images/text_3.png',
        root + 'images/text_4.png',
        root + 'images/girl.png',
        root + 'images/ticket_btn.png',
        root + 'images/nav_itembg.png',
        root + 'images/title_bg.png',
        root + 'images/section_bg01.jpg',
        root + 'images/section_bg02.jpg',
        root + 'images/section_bg03.jpg',
        root + 'images/section_bg04.jpg'
    ],
    onStart: function (total) {
        // 开始的回调
    },
    onProgress: function (current, total) {
        // 加载中的回调
        let percent = current / total * 100;
        $('.progressbar').css('width', percent + '%');
    },
    onComplete: function (total) {
        // 加载完的回调
        $('#progress').fadeOut();

        if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
            new WOW().init();
        }
    }
});
loader.start();

$(function () {
    // tab切换
    function tabCtrl(ele) {
        $(ele + '>.tabContents>.tabContent').hide().eq(0).show();
        $(ele + '>.tabs>.tab').eq(0).addClass('cur');
        $(ele + '>.tabs>.tab').click(function (e) {
            e.stopPropagation();
            e.preventDefault();
            if ($(this).hasClass('cur')) {
                return;
            }
            $(this).addClass('cur').siblings().removeClass('cur');
            let me = $(this);
            let index = 0;
            $(ele + '>.tabs>.tab').each(function (i) {
                if (me.get(0) === $(this).get(0)) {
                    index = i;
                }
            });
            $(ele + '>.tabContents>.tabContent').hide().eq(index).fadeIn();
        });
    }

    tabCtrl('#jmjq');
    tabCtrl('.fmjq');
    tabCtrl('#zczy');
    tabCtrl('#jmjx');

    // 主演
    let swiper_zy = new Swiper('.zy .swiper-container', {
        navigation: {
            nextEl: '.zy .swiper-button-next',
            prevEl: '.zy .swiper-button-prev',
        },
        observer: true,
        observeParents: true
    });

    let swiper_jmjx = new Swiper('.jmjx .swiper-container', {
        slidesPerView: 'auto',
        direction: 'vertical',
        freeMode: true,
        scrollbar: {
            el: '.jmjx .swiper-scrollbar',
            draggable: true
        },
        mousewheel: true,
        observer: true,
        observeParents: true,
    });
    // swiper_jmjx.scrollbar.$el.css('width','8px');

    let swiper_wmsx = new Swiper('.wmsx .swiper-container', {
        effect: 'flip',
        speed:800,
        navigation: {
            nextEl: '.wmsx .swiper-button-next',
            prevEl: '.wmsx .swiper-button-prev',
        },
        loop: true
    });

    //导航
    let isClick = false;
    $('.nav a').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        isClick = true;
        $('html,body').animate({scrollTop: $(this.hash).offset().top - 100}, 600, function () {
            isClick = false;
        });
        // 修改颜色
        $(this).parent().siblings().removeClass('cur');
        $(this).parent().addClass('cur');
    });

    let t;
    let t0 = $('#jmjq').offset().top - 200;
    let t1 = $('#zczy').offset().top - 200;
    let t2 = $('#jmjx').offset().top - 200;
    let t3 = $('#wmsx').offset().top - 200;
    let t4 = $('#mtzs').offset().top - 200;
    console.log(t0);
    console.log(t1);
    console.log(t2);
    console.log(t3);
    console.log(t4);
    $(window).scroll(function () {
        t = $(window).scrollTop();
        if (!isClick) {
            if (t >= 0 && t < t0) {
                $('nav li').removeClass('cur');
            } else if (t >= t0 && t < t1) {
                $('nav li').removeClass('cur');
                $('nav li').eq(0).addClass('cur');
            } else if (t >= t1 && t < t2) {
                $('nav li').removeClass('cur');
                $('nav li').eq(1).addClass('cur');
            }
            else if (t >= t2 && t < t3) {
                $('nav li').removeClass('cur');
                $('nav li').eq(2).addClass('cur');
            }
            else if (t >= t3 && t < t4) {
                $('nav li').removeClass('cur');
                $('nav li').eq(3).addClass('cur');
            }
            else if (t >= t4) {
                $('nav li').removeClass('cur');
                $('nav li').eq(4).addClass('cur');
            }
            //    返回顶部
            if (t > t1) {
                $('.back').fadeIn();
            } else {
                $('.back').fadeOut();
            }
        }
    });

    // 返回顶部
    $('.back').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('html,body').animate({scrollTop: 0}, 600);
    });

    let music = document.getElementById('music');
    let isMusicPlay = true;
    $('#music-btn').click(function () {
        if ($(this).hasClass('on')) {
            music.pause();
            $(this).removeClass('on');
            isMusicPlay = false;
        } else {
            music.play();
            $(this).addClass('on');
            isMusicPlay = true;
        }
    });

    // 视频
    let video = document.getElementById('video');
    $('.video_btn').on('click',function (e) {
        e.preventDefault();
        $('.dialog_video').fadeIn();
        if(isMusicPlay){
            music.pause();
        }
    });

    $('.close_btn').on('click',function (e) {
        e.preventDefault();
        $('.dialog_video').fadeOut();
        video.pause();
        if(isMusicPlay){
            music.play();
        }
    });

    let video2 = document.getElementById('video_2');
    video2.addEventListener('play',function () {
        if (isMusicPlay) {
            music.pause();
        }
    });

    video2.addEventListener('pause',function () {
        if (isMusicPlay) {
            music.play();
        }
    });
});