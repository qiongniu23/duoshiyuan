/* eslint-disable no-alert, quotes */
/* global $,isMobile,adaptiveScreen:true */
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
        cirLen = $('.s1_img img').length,
        stopAnimate = false;

    function animateScroll(scrollNum) {
        'use strict';
        $('html,body').stop().animate({scrollTop: scrollNum}, 2000, function () {
            stopAnimate = false;
        });
    }
    function navMark(navScrollTop) {
        'use strict';
        var arr = [],
            scrollHeight;
        $('.container section').each(function () {
            arr.push(parseFloat($(this).offset().top - navScrollTop));
        });
        for (var i = 0; i < arr.length; i++) {
            if (i === 6) {
                scrollHeight = 500;
            } else {
                scrollHeight = 100;
            }
            if (arr[i] <= scrollHeight && arr[i] >= (-parseFloat($('.container section').eq(i).height()))) {
                $('header .ul-nav li').eq(i).addClass('nav_select').siblings().removeClass('nav_select');
            }
        }
    }
    function goDown(self) {
        'use strict';
        var offsetTop = self.closest('section').next('section').offset().top;

        scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (stopAnimate === false) {
            stopAnimate = true;
            animateScroll(offsetTop);
        }
    }
    function init(screenX, screenY) {
        'use strict';
        $('.s1_img').css({'width': screenX * cirLen, 'left': -screenX});
        $('.s1_img li, .s1_img img').css({'width': screenX});
        $('.s1_img img').css({'max-height': screenY + 20});
        if (screenX > 960) {
            ctrlClass($('.js-nav'), 'show', 'hide');
            $('.js-cover-all').hide();
            ctrlClass($('.s-share'), 'hide', 'show');
        } else {
            ctrlClass($('.js-nav'), 'hide', 'show');
            if ($('.js-nav').hasClass('hide')) {
                $('.js-cover-all').hide();
            }
        }
        navMark(scrollTop);
    }
    function ctrlClass(oneElement, classOne, classTwo) {
        'use strict';
        oneElement.addClass(classOne).removeClass(classTwo);
    }
    $(function () {
        'use strict';
        var x = adaptiveScreen().x_width,
            y = adaptiveScreen().y_height;

        init(x, y, scrollTop);
        // scroll
        window.onscroll = function () {
            scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            navMark(scrollTop);
        };
        // code click
        $('.js-change-code').on("click", function(){
            $.getJSON(captchaUrl, {t: Math.random()}, function(json) {
                $(".captcha").attr("src", json.image_url);
                $("#id_captcha_0").attr("value", json.key);
            });
        });
        $(".js-change-code").click();
        // nav click
        $('.ul-nav .ul-nav-list').each(function () {
            $(this).click(function () {
                if (stopAnimate === false) {
                    stopAnimate = true;
                    var index = $(this).index(),
                        offsetTop = $('.container').find('section').eq(index).offset().top;

                    animateScroll(offsetTop);
                    if (parseFloat($(window).width()) <= 960) {
                        $('.s-menu').click();
                    }
                }
            });
        });
        // to top
        $('.to_top').on('click', function () {
            animateScroll(0);
            $('.js-nav li').eq(0).addClass('nav_select').siblings().removeClass('nav_select');
        });

        // show qr-code & show expertise
        if (isMobile.any()) {
            // mobile
            // show qr-code
            $('.js-wechat').on('touchstart', function () {
                if ($(this).find('.e_img').hasClass('hide')) {
                    ctrlClass($(this).find('.e_img'), 'show', 'hide');
                // }else{
                //     ctrlClass($(this).find('.e_img'),'hide','show');
                }
            });
            $('.e_img').css({'position': 'fixed', 'top': '50%', 'left': '50%', 'margin-left': '-86px', 'margin-top': '-86px'});
            $('.e_img').on('touchstart', function (e) {
                e.stopPropagation();
                if ($(this).hasClass('show')) {
                    ctrlClass($(this), 'hide', 'show');
                }
            });
            // show expertise
            $('.js-exp_wrapper li').on('touchstart', function () {
                var i = $(this).index();

                if (i === 2 || i === 5) {
                    goDown($(this));
                } else {
                    if ($(this).find('.eg_ins').hasClass('hide')) {
                        ctrlClass($(this).find('.eg_ins'), 'show', 'hide');
                        // return false;
                    } else {
                        ctrlClass($(this).find('.eg_ins'), 'hide', 'show');
                        // return false;
                    }
                }
            });
            // show nav
            $('.s-menu').on('touchstart', function () {
                if ($('header .js-nav').hasClass('show')) {
                    ctrlClass($('header .js-nav,.s-share'), 'hide', 'show');
                    $('.js-cover-all').hide();
                    $('.js-s1_to_left,.js-s1_to_right').show();
                } else {
                    ctrlClass($('header .js-nav,.s-share'), 'show', 'hide');
                    $('.js-cover-all').show();
                    $('.js-s1_to_left,.js-s1_to_right').hide();
                }
            });
        } else {
            // PC
            // show qr-code
            $('.js-wechat').on('mouseover', function () {
                ctrlClass($(this).find('.e_img'), 'show', 'hide');
            });
            $('.js-wechat').on('mouseleave', function () {
                ctrlClass($(this).find('.e_img'), 'hide', 'show');
            });
            // show expertise
            $('.js-exp_wrapper li').on('mouseover', function () {
                var index = $(this).index();

                if (index === 2 || index === 5) {
                    return false;
                }
                ctrlClass($(this).find('.eg_ins'), 'show', 'hide');
            });

            $('.js-exp_wrapper li').on('mouseleave', function () {
                ctrlClass($(this).find('.eg_ins'), 'hide', 'show');
            });
            $('.js-exp_wrapper li').on('click', function () {
                var index = $(this).index();

                if (index === 2 || index === 5) {
                    goDown($(this));
                }
            });
            // show nav
            $('.s-menu').on('click', function () {
                if ($('header .js-nav').hasClass('show')) {
                    ctrlClass($('header .js-nav, .s-share'), 'hide', 'show');
                    $('.js-cover-all').hide();
                    $('.js-s1_to_left, .js-s1_to_right').show();
                } else {
                    ctrlClass($('header .js-nav, .s-share'), 'show', 'hide');
                    $('.js-cover-all').show();
                    $('.js-s1_to_left, .js-s1_to_right').hide();
                }
            });
            // show methodology sub-nav
            // $('.nav_service, .nav_abouts').on('mouseover', function () {
            //     $(this).find('.nav_service_wrapper').show();
            // });
            // $('.nav_service, .nav_abouts').on('mouseleave', function () {
            //     $(this).find('.nav_service_wrapper').hide();
            // });
        }

        // first screen
        // to left
        $('.js-s1_to_left').on('click', function () {
            $('.js-s1_to_left, .js-s1_to_right').fadeOut(100);
            var imgWidth = $('.s1-M img').css('width');

            if (stopAnimate === false) {
                stopAnimate = true;
                $('.s1_img').delay(100).animate({'left': '+=' + imgWidth}, 200, function () {
                    var imgLeft = $('.s1_img').css('left');

                    if (parseFloat(imgLeft) === 0) {
                        $('.js-s1_to_right').fadeIn(100);
                    } else {
                        $('.js-s1_to_left, .js-s1_to_right').fadeIn(100);
                    }
                    stopAnimate = false;
                });
            }
        });
        // to right
        $('.s1_to_right').on('click', function () {
            $('.js-s1_to_left, .js-s1_to_right').fadeOut(100);
            var imgWidth = $('.s1-M img').css('width');

            if (stopAnimate === false) {
                stopAnimate = true;
                $('.s1_img').delay(100).animate({'left': '-=' + imgWidth}, 200, function () {
                    var imgLeft = $('.s1_img').css('left');

                    if (Math.abs(parseFloat(imgLeft)) >= (cirLen - 1) * parseFloat(imgWidth)) {
                        $('.js-s1_to_left').fadeIn(100);
                    } else {
                        $('.js-s1_to_left, .js-s1_to_right').fadeIn(100);
                    }
                    stopAnimate = false;
                });
            }
        });
        // go down
        $('.go_down').on('click', function () {
            goDown($(this));
        });
        // send e-mail
        $('#send_email').on('submit', function (e) {
            e.preventDefault();
            var url,
                data,
                nameVal = $.trim($('.send_name').val()),
                emailVal = $.trim($('.send_email').val()),
                textareaVal = $.trim($('.send_msg').val()),
                codeVal = $.trim($(".code-content").val()),
                // regName = /^[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z]$/,
                regEmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
                regCode =  /^\w{4}$/;

            $('.js-mess').fadeIn();
            $('.js-msg').text(m9 + '...');

            // name
            if (nameVal === '') {
                $('.js-msg').text(m0);
                setTimeout(function () {
                    $('.js-mess').fadeOut(500);
                }, 1000);
                $('.send_name').focus();
                return false;
            // } else {
            //     if (!regName.test(nameVal)) {
            //         $('.js-msg').text('Please fill in correct name');
            //         setTimeout(function () {
            //             $('.js-mess').fadeOut(500);
            //         }, 1000);
            //         $('.send_name').focus();
            //         return false;
            //     }
            }
            // email
            if (emailVal === '') {
                $('.js-msg').text(m1);
                setTimeout(function () {
                    $('.js-mess').fadeOut(500);
                }, 1000);
                $('.send_email').focus();
                return false;
            } else {
                if (!regEmail.test(emailVal)) {
                    $('.js-msg').text(m2);
                    setTimeout(function () {
                        $('.js-mess').fadeOut(500);
                    }, 1000);
                    $('.send_email').focus();
                    return false;
                }
            }
            // content
            if (textareaVal === '') {
                $('.js-msg').text(m3);
                setTimeout(function () {
                    $('.js-mess').fadeOut(500);
                }, 1000);
                $('.send_msg').focus();
                return false;
            }
            // code
            if (codeVal === '') {
                $('.js-msg').text(m11);
                setTimeout(function () {
                    $('.js-mess').fadeOut(500);
                }, 1000);
                $('.code-content').focus();
                return false;
            } else {
                if (!regCode.test(codeVal)) {
                    $('.js-msg').text(m12);
                    setTimeout(function () {
                        $('.js-mess').fadeOut(500);
                    }, 1000);
                    $('.code-content').focus();
                    return false;
                }
            }
            url = $(this).attr('action');
            data = $(this).serialize();
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                dataType: 'json',
                success: function (response) {
                    if (response.state) {
                        $('.js-msg').text(m4);
                        setTimeout(function () {
                            $('.js-mess').fadeOut(500);
                        }, 1000);
                        $('.js-form-btn').val(m5).attr('disabled', 'disabled');
                    } else {
                        for (var key in response.error) {
                            $('.js-msg').text(response.error[key]);
                        }
                        setTimeout(function () {
                            $('.js-mess').fadeOut(500);
                        }, 1000);
                        $('.js-form-btn').val(m7);
                    }
                },
                error: function () {
                    $('.js-msg').text(m8);
                    setTimeout(function () {
                        $('.js-mess').fadeOut(500);
                    }, 1000);
                }
            });
        });
        $(window).on('resize', function () {
            var resizeX = adaptiveScreen().x_width,
                resizeY = adaptiveScreen().y_height;

            scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            init(resizeX, resizeY, scrollTop);
            $('.js-s1_to_left, .js-s1_to_right').show();
        });
    });
