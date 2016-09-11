function adaptiveScreen() {
    'use strict';
    var xWidth,
        yHeight;

    // 获取浏览器宽度
    if (window.innerWidth) {
        xWidth = window.innerWidth;
    } else if (document.documentElement && document.documentElement.clientWidth) {
        xWidth = document.documentElement.clientWidth;
    } else if (document.body && document.body.clientWidth) {
        xWidth = document.body.clientWidth;
    }
    // 获取浏览器高度
    if (window.innerHeight) {
        yHeight = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        yHeight = document.documentElement.clientHeight;
    } else if (document.body && document.body.clientHeight) {
        yHeight = document.body.clientHeight;
    }
    // 返回浏览器宽高
    return {'x_width': xWidth, 'y_height': yHeight};
}

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

