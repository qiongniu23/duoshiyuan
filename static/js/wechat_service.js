function initHeight() {
	$(".explain-city").outerHeight($(".explain-document").outerHeight());
}
function fetchCode(self) {
	$.getJSON(captchaUrl, {t: Math.random()}, function(json) {
        self.siblings(".captcha").attr("src", json.image_url);
        self.siblings("#id_captcha_0").attr("value", json.key);
    });
}
$(function () {
	"use strict";
	$(window).on("load resize", initHeight);

	if (isMobile.any()) {
		if ($(window).width() > 641) {
			$(".exp-box").click(function () {
				$(".cover-instraction").css("visibility", "hidden");
				$(this).find(".cover-instraction").css("visibility", "visible");
				$(".cover-instraction").on("click", function () {
					$(this).css("visibility", "hidden");
				});
			});
		}
	}
	$("body").on("click", ".show-form", function () {
		var serverName = $(this).closest(".kinds-list").find(".service-name").text(),
			serverForm = Handlebars.compile($("#server-form").html());

		$(".bgk").html(serverForm({name: serverName}));
		$(".float-layer").show();
		$(".inputfont").each(function () {
			$(this).find(".js-len").outerWidth($(this).width() - $(this).find(".font").outerWidth() - 1);
		});
		$(".js-change-code").click();
	});
	$("body").on("click", ".no", function () {
		$(this).closest(".bgk").empty().closest(".float-layer").hide();
	});

	$('body').on("click", ".js-change-code", function() {
		var self = $(this);
        fetchCode(self);
    });
	$("body").on("submit", "#service_send", function (e) {
		e.preventDefault();
		var url, data, type;
		var self = $(this),
			regEmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            regCode =  /^\w{4}$/;

        if (self.find("input[name=type]").val()) {
        	if (self.find("input[name=name]").val()) {
        		if (self.find("input[name=duty]").val()) {
        			if (self.find("input[name=duty]").val()) {
        				if (regEmail.test(self.find("input[name=email]").val())) {
							if (self.find("input[name=content]")) {
								url = self.attr("action");
						        data = self.serialize();
						        type = self.attr("method");
	        					$.ajax({
						        	type: type,
						        	url: url,
						        	data: data,
						        	success: function (response) {
						        		if (response.state) {
						        			alert("Success");
						        		} else {
						        			alert(response.error);
						        		}
						        		$(".js-change-code").click();
						        	},
						        	error: function (error) {
						        		alert(error);
						        	}
						        });
	        				} else {
	        					alert("请输入补充问题");
	        				}
        				} else {
        					alert("请输入正确邮箱");
        				}
        			} else {
        				alert("请输入邮箱");
        			}
        		} else {
        			alert("请输入职位");
        		}
        	} else {
        		alert("请输入姓名");
        	}
        } else {
        	alert("请输入服务类型");
        }
	});
});
