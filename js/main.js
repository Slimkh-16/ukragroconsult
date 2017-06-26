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
            //cartFunction
            this.cartFunction();
            //filterFunction
            if (document.querySelector('.filter-box') !== null) {
                this.filterFunction();
            }
            //productFunction
            if (document.querySelector('.product-char-col .change-size') !== null) {
                this.productFunction();
            }
        },
        productFunction: function(){
          $('.change-size span').on('click',function(){
              var weightProd = $(this).data('size'),
                  priceProd  = $(this).data('price');
              $('.change-size span').removeClass('active');
              $(this).addClass('active');
              $('.js_weight').text(weightProd);
              $('.js_prod_price').text(priceProd);
          });
        },
        filterFunction: function(){
          $('.filter-box__head ').on('click',function(){
            $(this).parents('.filter-box').toggleClass('visible');
            $(this).parents('.filter-box').find('.filter-bix__body').slideToggle(500);
          });
        },
        cartFunction: function(){
            //cart
            $('.js_cart').on('click',function(){
                $('.cart-section').toggleClass('visible');
                $('.overlay-cart').toggleClass('visible');
                $('body').toggleClass('noscroll');
                if($('.header').hasClass('fix')) {
                    if(window.innerWidth < 1023) {
                        heightcart (20)
                    } else {
                        heightcart (10)
                    }

                } else {
                    heightcart (0)
                }
                return false;
            });
            $(window).resize(function(){
                if($('.header').hasClass('fix')) {
                    if(window.innerWidth < 1023) {
                        heightcart (20)
                    } else {
                        heightcart (10)
                    }

                } else {
                    heightcart (0)
                }
            });
            $('.js_close_cart, .cont-shop').on('click',function(){
                $('.cart-section').removeClass('visible');
                $('.overlay-cart').removeClass('visible');
                $('body').removeClass('noscroll');
            });
            var totalPrice,thisValue,priceItem,rowCart;
            $('.count-cart').text($('.cart-body table tr').length);
            totalCart();
            $('.cart-body-table').find('.quantity').on('input', function () {
                this.value = this.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
            });
            $('.cart-body-table').find('.quantity').on('blur ', function () {
                rowCart = $(this).parents('tr').data('product-id');
                priceItem = parseFloat($('[data-product-id="'+ rowCart +'"]').find('.quantity').data('price-product')), thisValue = parseFloat($(this).val());
                $('[data-product-id="'+ rowCart +'"]').find('.js_total_product').text(priceItem * thisValue);
                totalCart();
            });
            $(document).on('click', '.js_remove', function () {
                rowCart = $(this).parents('tr').data('product-id');
                $('[data-product-id="'+ rowCart +'"]').remove();
                $('.count-cart').text($('.cart-body table tr').length);
                console.log($('.cart-body table tr').length )
                if ($('.cart-body table tr').length === 0) {

                    $('.cart-body-table').html('<div class="align-center empty-cart">Корзина пуста</div>');
                }
                totalCart();
            });
            function totalCart() {
                totalPrice = 0;
                $('.cart-body-table .js_total_product').each(function(i,item){
                    var thisPrice = parseInt($(item).text().replace(/\D+/g,""));
                    totalPrice = totalPrice + thisPrice;
                });
                $('.js_total').text(totalPrice);
            }
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
            var swiper_new = new Swiper('.new-product .swiper-container', {
                loop: true,
                speed: 1000,
                slidesPerView: 4,
                spaceBetween: 0,
                breakpoints: {
                    992: {
                        slidesPerView: 3
                    },
                    767: {
                        slidesPerView: 2
                    },
                    500: {
                        slidesPerView: 1
                    }
                }
            });
            var swiper_new = new Swiper('.popular-product .swiper-container', {
                loop: true,
                speed: 1000,
                slidesPerView: 4,
                spaceBetween: 0,
                nextButton: '.popular-product .swiper-button-next',
                prevButton: '.popular-product .swiper-button-prev',
                breakpoints: {
                    992: {
                        slidesPerView: 3
                    },
                    767: {
                        slidesPerView: 2
                    },
                    500: {
                        slidesPerView: 1
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
            //product char list
            $('.tab-box .product-char .product-char-row:gt(8)').hide();
            $('.js_all_char').on('click',function(){
               if($(this).hasClass('active')) {
                   $(this).removeClass('active');
                   $('.tab-box .product-char .product-char-row:gt(8)').hide('slow');
               } else {
                   $(this).addClass('active');
                   $('.tab-box .product-char .product-char-row').show('slow');
               }
            });
            //product char list
            //zoom plagin
            if(isMobile === false) {
                $(".product-big-images img").elevateZoom({
                    gallery:'gal-product',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    zoomType	: "lens",
                    lensShape : "round",
                    lensSize : 255,
                    imageCrossfade: true
                });
            }
            //zoom plagin
            // catalog
            $('.to-wishlist,.to-compare').on('click',function(){
               $(this).toggleClass('active');
               return false;
            });
            $('.materialboxed').materialbox();
            //massonry
            if(document.querySelector('.grid') !== null) {
                var msnry = new Masonry( '.grid', {
                    itemSelector: '.grid-item',
                    gutter: 30
                });
            }

            //hidden text
            $('.prod-txt').liTextLength({
                length: 70,
                afterLength: '...',
                fullText:false
            });

            $('.menu-button-general').sideNav({
                    menuWidth: 280,
                    edge: 'left',
                    closeOnClick: true,
                    draggable: true
                }
            );
            $('.dropdown-button').dropdown();
            if(isMobile === false) {
                $('.dropdown-head-nav').dropdown({
                    hover: true,
                    outDuration:500
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
                }, {accX: 0, accY: -200});
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
        if(scrollTopPosition > 50) {
            document.querySelector('.header').classList.add('fix')
        } else {
            document.querySelector('.header').classList.remove('fix')
        }
    });
    window.addEventListener('load', function () {

    });
    window.addEventListener('resize', function () {

    });
    function heightcart (coof) {
        document.querySelector('.cart-section').style.maxHeight = window.innerHeight - document.querySelector('.cart-section').offsetTop + coof + 'px';
    }
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
