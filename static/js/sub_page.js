/* global $:true */
/* global isMobile:true */
/* global adaptiveScreen:true */
$(function () {
    'use strict';
    var x = adaptiveScreen().x_width;

    // show methodology sub nav
    if (x > 960) {
        $('.nav_service').on('mouseover', function () {
            $(this).find('div').show();
        });
        $('.nav_service').on('mouseleave', function () {
            $(this).find('div').hide();
        });
    }
    // show nav
    $('.s-menu').on('click', function () {
        if ($('header .js-nav').hasClass('show')) {
            $('header .js-nav, .s-share').addClass('hide').removeClass('show');
            $('.js-cover-all').hide();
        } else {
            $('header .js-nav, .s-share').addClass('show').removeClass('hide');
            $('.js-cover-all').show();
        }
    });
    $('.nav_abouts').on('mouseover', function () {
        $(this).find('div').show();
    });
    $('.nav_abouts').on('mouseleave', function () {
        $(this).find('div').hide();
    });
    if (isMobile.any()) {
        // MOBILE
        // show qr-code
        $('.e_img').addClass('sub_header');
        $('.js-wechat').on('touchstart', function () {
            if ($(this).find('.e_img').hasClass('hide')) {
                $(this).find('.e_img').addClass('show').removeClass('hide');
            } else {
                $(this).find('.e_img').addClass('hide').removeClass('show');
            }
        });
    } else {
        // PC
        $('.js-wechat').on('mouseover', function () {
            $(this).find('.e_img').addClass('show').removeClass('hide');
        });
        $('.js-wechat').on('mouseleave', function () {
            $(this).find('.e_img').addClass('hide').removeClass('show');
        });
    }
    $(window).on('resize', function () {
        var resizeX = adaptiveScreen().x_width;
        if (resizeX > 960) {
            $('.js-nav').addClass('show').removeClass('hide');
            $('.js-cover-all').hide();
            $('.s-share').addClass('hide').removeClass('show');
        } else {
            $('.js-nav').addClass('hide').removeClass('show');
            if ($('.js-nav').hasClass('hide')) {
                $('.js-cover-all').hide();
            }
        }
    });
});
