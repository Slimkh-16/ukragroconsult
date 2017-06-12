document.addEventListener("DOMContentLoaded", preloader);
function preloader() {
    document.querySelector('body').classList.add('loading');
}
(function () {

    "use strict";

    var body = document.querySelector('body'),
        isMobile = false,
        scrollTopPosition,
        browserYou,
        _winWidth = $(window).outerWidth(),
        swiper4, swiper5,swiper2,containerHeight;
    var genFunc = {

        initialized: false,

        initialize: function () {

            if (this.initialized) return;

            this.initialized = true;

            this.build();
        },

        build: function () {
            // preloader
            if (document.querySelector('.preloader') !== null) {
                this.pagePreloader();
            }

            // browser
            browserYou = this.getBrowser();
            if (browserYou.platform == 'mobile') {
                isMobile = true;
                document.documentElement.classList.add('mobile');
            } else {
                document.documentElement.classList.add('desktop');
            }
            if ((browserYou.browser == 'ie')) {
                document.documentElement.classList.add('ie');
            }
            if ((browserYou.browser == 'ie' && browserYou.versionShort < 9) || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18) || (browserYou.browser == 'firefox' && browserYou.versionShort < 30)) {
                alert('Обновите браузер');
            }
            // materialPlagin
            this.materialPlagins();
            // map
            if (document.getElementById('map') !== null) {
                this.mapFunction();
            }
            // swiper
            this.swiperSliders();
            //appear
            this.appearFunction();
            //copyright
            this.copyright();
            //validateForm
            this.validateForm();
            //mobileMenu
            this.mobileMenu();
        },

        mapFunction: function () {
            if ($('#map').length > 0) {
                var coords = $('#map').data('coords').split(',');
                var myLatlng = new google.maps.LatLng(coords[0], coords[1]);
                var myCenter = new google.maps.LatLng(coords[0], coords[1]);
                var mapOptions = {
                    zoom: 15,
                    center: myCenter,
                    scrollwheel: false,
                    disableDefaultUI: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById('map'), mapOptions);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: 'images/ico-16.png'
                });
            }
        },
        mobileMenu: function () {
            $('.menu-button').on('click',function(){
                if($(this).hasClass('open')) {
                    $(this).removeClass('open');
                    $('html').removeClass('open-menu open-level-1');
                    $('.mobile-level-level').removeClass('visible');
                    $('.mb-lev-1').removeClass('active');
                    $('.mobile-level').removeClass('active');
                } else {
                    $(this).addClass('open');
                    $('html').addClass('open-menu');
                    $('.mobile-level-level').addClass('visible');
                }
            });
            $('.mb-lev-1').on('click',function(){

                if($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).parents('li').find('.mobile-level').removeClass('active');
                    $('html').removeClass('open-level-1');
                }else {
                    $('.mb-lev-1').removeClass('active');
                    $('.mobile-level').removeClass('active');
                    $(this).addClass('active');
                    $(this).parents('li').find('.mobile-level').addClass('active');
                    $('html').addClass('open-level-1');
                }

                return false;
            });
            $('.mobile-level-back').on('click',function(){
                $('.mobile-level').removeClass('active');
                $('.mobile-level-menu a[class*="icon-"]').removeClass('active');
                $('html').removeClass('open-level-1');
                return false;
            });
            $(document).on('click','.drop-nav',function(){
                $(this).parents('.with-menu').toggleClass('active');
                $(this).parents('.with-menu').find('ul').slideToggle(500, "easeOutCubic");
            });
        },
        copyright: function () {
            var yearBlock = document.querySelector('.yearN'),
                yearNow = new Date().getFullYear().toString();
            if (yearNow.length) {
                yearBlock.innerText = yearNow
            }
        },
        getBrowser: function () {
            var ua = navigator.userAgent;
            var bName = function () {
                if (ua.search(/Edge/) > -1) return "edge";
                if (ua.search(/MSIE/) > -1) return "ie";
                if (ua.search(/Trident/) > -1) return "ie11";
                if (ua.search(/Firefox/) > -1) return "firefox";
                if (ua.search(/Opera/) > -1) return "opera";
                if (ua.search(/OPR/) > -1) return "operaWebkit";
                if (ua.search(/YaBrowser/) > -1) return "yabrowser";
                if (ua.search(/Chrome/) > -1) return "chrome";
                if (ua.search(/Safari/) > -1) return "safari";
                if (ua.search(/maxHhon/) > -1) return "maxHhon";
            }();

            var version;
            switch (bName) {
                case "edge":
                    version = (ua.split("Edge")[1]).split("/")[1];
                    break;
                case "ie":
                    version = (ua.split("MSIE ")[1]).split(";")[0];
                    break;
                case "ie11":
                    bName = "ie";
                    version = (ua.split("; rv:")[1]).split(")")[0];
                    break;
                case "firefox":
                    version = ua.split("Firefox/")[1];
                    break;
                case "opera":
                    version = ua.split("Version/")[1];
                    break;
                case "operaWebkit":
                    bName = "opera";
                    version = ua.split("OPR/")[1];
                    break;
                case "yabrowser":
                    version = (ua.split("YaBrowser/")[1]).split(" ")[0];
                    break;
                case "chrome":
                    version = (ua.split("Chrome/")[1]).split(" ")[0];
                    break;
                case "safari":
                    version = ua.split("Safari/")[1].split("")[0];
                    break;
                case "maxHhon":
                    version = ua.split("maxHhon/")[1];
                    break;
            }
            var platform = 'desktop';
            if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
            var browsrObj;
            try {
                browsrObj = {
                    platform: platform,
                    browser: bName,
                    versionFull: version,
                    versionShort: version.split(".")[0]
                };
            } catch (err) {
                browsrObj = {
                    platform: platform,
                    browser: 'unknown',
                    versionFull: 'unknown',
                    versionShort: 'unknown'
                };
            }
            return browsrObj;
        },
        swiperSliders: function () {
            var swiper = new Swiper('.general-slider .swiper-container', {
                loop: true,
                autoplay: 4000,
                speed: 2000,
                pagination: '.general-slider .swiper-pagination',
                paginationClickable: true,
                parallax: true
            });
            var swiper_brand = new Swiper('.brand-slider .swiper-container', {
                loop: true,
                autoplay: 2000,
                speed: 2000,
                slidesPerView: 6,
                spaceBetween: 15,
                breakpoints: {
                    1400: {
                        slidesPerView: 5,
                        spaceBetween: 15
                    },
                    1300: {
                        slidesPerView: 4,
                        spaceBetween: 15
                    },
                    805: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    500: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    }
                }
            });
        },
        pagePreloader: function () {
            window.addEventListener('load', function () {
                setTimeout(function () {
                    body.classList.add('loaded');
                }, 1000);
                setTimeout(function () {
                    document.querySelector('.preloader').style.display = 'none';
                }, 1600);
            });
        },
        validateForm: function () {
            $(document).on('click','.forgot-pass',function(){
                $('.input-field--oher-pass').slideToggle(500, "easeOutCubic");
                $(this).parents('form').toggleClass('act');
            });
            $('.js_validate button[type="submit"]').on("click", function () {
                return validate($(this).parent(".js_validate"));
            });
            function validate(form) {
                var error_class = "error";
                var norma_class = "pass";
                var item = form.find("[required]");
                var e = 0;
                var reg = undefined;
                var pass = form.find('.password').val();
                var pass_1 = form.find('.password_1').val();
                var email = false;
                var password = false;
                var phone = false;

                function mark(object, expression) {
                    if (expression) {
                        object.parents('.required-field').addClass(error_class).removeClass(norma_class);
                        e++;
                    } else
                        object.parents('.required-field').addClass(norma_class).removeClass(error_class);
                }

                form.find("[required]").each(function () {
                    switch ($(this).attr("data-validate")) {
                        case undefined:
                            mark($(this), $.trim($(this).val()).length === 0);
                            break;
                        case "email":
                            email = true;
                            reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            mark($(this), !reg.test($.trim($(this).val())));
                            email = false;
                            break;
                        case "phone":
                            phone = true;
                            reg = /[0-9 -()+]{10}$/;
                            mark($(this), !reg.test($.trim($(this).val())));
                            phone = false;
                            break;
                        case "pass":
                            password = true;
                            reg = /^[a-zA-Z0-9_-]{6,}$/;
                            mark($(this), !reg.test($.trim($(this).val())));
                            password = false;
                            break;
                        case "pass1":
                            mark($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
                            break;
                        default:
                            reg = new RegExp($(this).attr("data-validate"), "g");
                            mark($(this), !reg.test($.trim($(this).val())));
                            break;
                    }
                });
                $('.js_valid_radio').each(function () {
                    var inp = $(this).find('input.required');
                    var rezalt = 0;
                    for (var i = 0; i < inp.length; i++) {
                        if ($(inp[i]).is(':checked') === true) {
                            rezalt = 1;
                            break;
                        } else {
                            rezalt = 0;
                        }
                    }
                    if (rezalt === 0) {
                        $(this).addClass(error_class).removeClass(norma_class);
                        e = 1;
                    } else {
                        $(this).addClass(norma_class).removeClass(error_class);
                    }
                });
                if (e === 0) {
                    return true;
                }
                else {
                    form.find("." + error_class + " input:first").focus();
                    return false;
                }
            }
        },
        materialPlagins: function () {
            $('.menu-button-general').sideNav({
                    menuWidth: 240,
                    edge: 'left',
                    closeOnClick: true,
                    draggable: true
                }
            );
            $('.collapsible').collapsible();
            $('.dropdown-button').dropdown();
            if(isMobile === false) {
                $('.dropdown-head-nav').dropdown({
                    hover: true
                });
            }
            $('select').not('.my_select_box').material_select();
            $('.collapsible').collapsible();
            $('.modal').modal({
                opacity: 1,
                ready: function(el){
                    $('.overlay').fadeIn(500);
                },
                complete: function(){
                    $('.overlay').fadeOut(500);
                }
            });
            $('.materialboxed').materialbox();
            // chart
            // chartFunc();
            function chartFunc() {
                var chart = new CanvasJS.Chart("chartContainer",
                    {
                        title:{
                            text: "Speed And Distance Time Graph"
                        },
                        animationEnabled: true,
                        toolTip: {
                            shared: true,
                            content: function(e){
                                var body ;
                                var head ;
                                head = "<span style = 'color:DodgerBlue; '><strong>"+ (e.entries[0].dataPoint.x)  + " sec</strong></span><br/>";

                                body = "<span style= 'color:"+e.entries[0].dataSeries.color + "'> " + e.entries[0].dataSeries.name + "</span>: <strong>"+  e.entries[0].dataPoint.y + "</strong>  m/s<br/> <span style= 'color:"+e.entries[1].dataSeries.color + "'> " + e.entries[1].dataSeries.name + "</span>: <strong>"+  e.entries[1].dataPoint.y + "</strong>  m";

                                return (head.concat(body));
                            }
                        },
                        axisY:{
                            title: "Speed",
                            includeZero: false,
                            suffix : " m/s",
                            lineColor: "#369EAD"
                        },
                        axisY2:{
                            title: "Distance",
                            includeZero: false,
                            suffix : " m",
                            lineColor: "#C24642"
                        },
                        axisX: {
                            title: "Time",
                            suffix : " s"
                        },
                        data: [
                            {
                                type: "spline",
                                name: "speed",
                                dataPoints: [
                                    {x: 0 , y: 0} ,
                                    {x: 11 , y: 8.2} ,
                                    {x: 47 , y: 41.7} ,
                                    {x: 56 , y: 16.7} ,
                                    {x: 120 , y: 31.3} ,
                                    {x: 131 , y: 18.2} ,
                                    {x: 171 , y: 31.3} ,
                                    {x: 189 , y: 61.1} ,
                                    {x: 221 , y: 40.6} ,
                                    {x: 232 , y: 18.2} ,
                                    {x: 249 , y: 35.3} ,
                                    {x: 253 , y: 12.5} ,
                                    {x: 264 , y: 16.4} ,
                                    {x: 280 , y: 37.5} ,
                                    {x: 303 , y: 24.3} ,
                                    {x: 346 , y: 23.3} ,
                                    {x: 376 , y: 11.3} ,
                                    {x: 388 , y: 8.3} ,
                                    {x: 430 , y: 1.9} ,
                                    {x: 451 , y: 4.8}
                                ]
                            },
                            {
                                type: "spline",
                                axisYType: "secondary"  ,
                                name: "distance covered",
                                dataPoints: [
                                    {x: 0 , y: 0},
                                    {x: 11 , y: 90} ,
                                    {x: 47 , y: 1590} ,
                                    {x: 56 , y: 1740} ,
                                    {x: 120 , y: 3740} ,
                                    {x: 131 , y: 3940} ,
                                    {x: 171 , y: 5190} ,
                                    {x: 189 , y: 6290} ,
                                    {x: 221 , y: 7590} ,
                                    {x: 232 , y: 7790} ,
                                    {x: 249 , y: 8390} ,
                                    {x: 253 , y: 8440} ,
                                    {x: 264 , y: 8620} ,
                                    {x: 280 , y: 9220} ,
                                    {x: 303 , y: 9780} ,
                                    {x: 346 , y: 10780} ,
                                    {x: 376 , y: 11120} ,
                                    {x: 388 , y: 11220} ,
                                    {x: 430 , y: 11300} ,
                                    {x: 451 , y: 11400}
                                ]
                            }
                        ]
                    });

                chart.render();
            }
        },
        appearFunction: function () {
            if (isMobile === false) {
                $('.animated').appear(function () {
                    var elem = $(this);
                    var animation = elem.data('animation');
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        if (animationDelay) {
                            setTimeout(function () {
                                elem.addClass(animation + " visible");
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + " visible");
                        }
                    }
                }, {accX: 0, accY: -500});
            } else {
                $('.animated').each(function () {
                    var animation = $(this).data('animation');
                    $(this).addClass(animation + " visible");
                });
            }
        },
    };

    genFunc.initialize();
    window.addEventListener('scroll', function () {
        scrollTopPosition = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    });
    window.addEventListener('load', function () {
        containerHeight = window.innerHeight - document.querySelector('.header').clientHeight - document.querySelector('.footer').clientHeight;
        if (document.querySelector('.height_form') !== undefined) {
            heightContainer('.height_form',containerHeight);
        }
        if(document.querySelector('.file-body') !== undefined) {
            heightBlock('.file-body')
        }
    });
    window.addEventListener('resize', function () {
        containerHeight = window.innerHeight - document.querySelector('.header').clientHeight - document.querySelector('.footer').clientHeight;
        if (document.querySelector('.height_form') !== undefined) {
            heightContainer('.height_form',containerHeight);
        }
        if(document.querySelector('.file-body') !== undefined) {
            heightBlock('.file-body')
        }
    });
    function heightContainer(elem,elemHeight){
        for(var k = 0; k < document.querySelectorAll(elem).length; k++) {
            document.querySelectorAll(elem)[k].style.minHeight = elemHeight + 'px'
        }
    };
    function captionPosition(element) {
        [].slice.call(document.querySelectorAll(element)).forEach(function (i, item) {
            var thisHeight = i.clientHeight;
            i.style.marginTop = -thisHeight / 2 + 'px';
        });
    };
    function heightBlock(ell) {
        var elem = document.querySelectorAll(ell);
        var maxH = 0;
        for (var i = 0; i < elem.length; ++i) {
            elem[i].style.height = "";
            elem[i].removeAttribute("style");
            if (maxH < elem[i].offsetHeight) {
                maxH = elem[i].offsetHeight;
            }

            elem[i].style.height = maxH + "px";
        }
    };
})();

