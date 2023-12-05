var scroll_time = 500;
var page_top_limit = 100;

$(function() {

    genHtmlUser = function() {
        $.get('/api/MailBoxApi/CheckMailNew', function(data) {
            if (data > 0) {
                $(".user-notify .icon-notify").addClass('show');
            }
            $("#btn-user-detail").popover({
                html: true,
                content: "<ul class='user-func-lst'>{0}</ul>".format($("ul.user-func-lst").html()),
                trigger: 'hover',
                placement: 'bottom',
                container: '#btn-user-detail'
            });
        })
    }

    $.ajax({
        url: '/BookBuy/getHtmlUser',
        type: 'Get',
        success: function(data) {
            if (data != "") {
                $(".has-user-info").append(data);
                genHtmlUser();
            }
            //ematic email
            (function(i, s, o, g, r, a, m) {
                i['EmaticsObject'] = r;
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//api.ematicsolutions.com/v1/ematic.min.js', 'ematics');
            var ematicApikey = "7c319d6019e211e7be9a0242ac110002-sg6";
            var opt = {
                email: $("#CurrentUserEmail") != null ? $("#CurrentUserEmail").val() : "",
                country_iso: "vietnam",
                currency_iso: "VND",
                language_iso: "VN"
            };
            //define the event before initializing
            opt.events = {
                onAfterSubscribe: function(email) {
                    $.ajax({
                        url: "/MailchimpAPI/UpdateMember",
                        dataType: "json",
                        data: {
                            "email": email
                        },
                        success: function(data) {}
                    });
                    //execute your code
                }
            };
            //initialize
            ematics("create", ematicApikey, opt);
        }
    });

    $.ajax({
        url: '/BookBuy/getHtmlUserMobile',
        type: 'Get',
        success: function(data) {
            if (data != "") {
                $(".has-user-info-mobile").prepend(data);
            }
        }
    });

    //$.get('/api/News/CheckNewsNew', function (data) {
    //    if (data) {
    //        $("#btn-news-trigger").append('<img  class="slimmage icon-new-hightlight" src="/Images/frontend/base/icon_new.gif" /> ');
    //    }
    //})

    //$.get('/api/PromotionApi/CheckPromotionNew', function (data) {
    //    if (data) {
    //        $("#btn-prmotion-trigger").append('<img class="slimmage icon-new-hightlight" src="/Images/frontend/base/icon_new.gif" /> ');
    //    }
    //})

    $(".header-newsletter-toggle").click(function() {
        if ($(".newsletter-toggle").hasClass("active")) {
            $(".newsletter-toggle span.toggle-error").empty();
            $(".newsletter-toggle span.toggle-success").empty();
            $(".newsletter-toggle").removeClass("active");
        } else
            $(".newsletter-toggle").toggleClass("active")
    });

    setTimeout(function() {
        if (!ParseBool(readCookie('registedEmail')))
            $(".newsletter-toggle").css("display", "block")
    }, 20000);

    $(".navbar-collapse ul li").removeClass("active");
    var lastScrollTop = 0;

    $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop();

        if (scrollPosition > 80) {
            $('.mn-topmost-new').addClass('mn-topmost-new-fixed').removeClass('mn-topmost-new').animate();
        } else {
            $('.mn-topmost-new-fixed').addClass('mn-topmost-new').removeClass('mn-topmost-new-fixed');
        }
        lastScrollTop = scrollPosition;
    });

    var minWidth = $(window).width(),
        handleMinWidthMedia = function(width) {
            if (width <= 1024) {
                $("#fblike").hide();
                $("#ggplus").hide();
            } else if (width > 1024 && width < 1200) {
                $("#ggplus").hide();
                $("#fblike").show();
            } else {

                $("#fblike").show();
                $("#ggplus").show();

            }
        };

    handleMinWidthMedia(minWidth);

    $(window).resize(function() {
        minWidth = $(window).width();
        handleMinWidthMedia(minWidth);
    });


    jQuery.extend(jQuery.validator.methods, {
        date: function(value, element) {
            var isChrome = window.chrome;
            if (isChrome) {
                var d = new Date();
                return this.optional(element) ||
                    !/Invalid|NaN/.test(new Date(d.toLocaleDateString(value)));
            } else {
                return this.optional(element) ||
                    !/Invalid|NaN/.test(new Date(value));
            }
        }
    });

    $(".navbar-right").on("click", "#btn-logout", function() {
        $("form#logoutForm").submit();
    })

    $(".panel-mb").on("click", "#btn-logout-mb", function() {
        $("form#logoutForm").submit();
    })

    $('.menu-cat-mobile .panel-body .list-group-item').on('click', function() {
        $('.bs-navbar-collapse').collapse('hide');
    });

    $(".main-menu .childmenu-box").each(function() {
        var items_per_box = 9;
        var items;
        items = $("ul li:first a", $(this)).size();
        var self = $(this);
        while (items > items_per_box) {
            $("<li></li>")
                .append($("ul li:first a", self).slice(items_per_box, items_per_box * 2))
                .appendTo($("ul", self));
            items = $("ul li:first a", self).size();
        }
    });

    $(".main-menu .menu-trigger").on({
        "mouseenter": function() {
            $(".menu-box").show();
        },
        "mouseleave": function() {
            $(".menu-box").hide();
        }
    });
    var $menu = $(".main-menu ul.menu");

    // jQuery-menu-aim: <meaningful part of the example>
    // Hook up events to be fired on menu row activation.
    $menu.menuAim({
        activate: activateSubmenu,
        deactivate: deactivateSubmenu,
        exit: exitSubmenu
    });

    function activateSubmenu(row) {
        $(".main-menu ul.menu>li:hover a").addClass('actived');
        $(".childmenu-box", $(row)).show();
    }

    function deactivateSubmenu(row) {
        $(".main-menu ul.menu>li a").removeClass('actived');
        $(".childmenu-box", $(row)).hide();
    }

    function exitSubmenu(row) {
        setTimeout(function() {

            if ($('.childmenu-box:hover').length == 0 && $(".main-menu ul.menu>li:hover").length == 0) {
                $(".main-menu ul.menu>li a").removeClass('actived');
                $(".childmenu-box", $(row)).hide();

            }
        }, 200);

    }

    var menuids = ["rootmenu"];
    BookBuy.Menu.SideBarMenu(menuids);

    var hover_timer, delay_timer;
    var scope = angular.element("body").scope()
    var productFac = angular.element("body").injector().get('productFac');
    $("#bb-body").on("mouseenter", ".product-item .img-view:not(.week-book .product-item .img-view), .product-item-inline .img-view", function() {
        var self = $(this);
        delay_timer = setTimeout(function() {
            var isout = self.attr("isout"),
                iscomming = self.attr("iscomming"),
                btn_cart = $("#express-buy-dialog").find(".btn-buy"),
                productid = self.attr("productid"),
                btn_pre = $("#express-buy-dialog").find(".btn-pre"),
                btn_request = $("#express-buy-dialog").find(".btn-request"),
                hid_id = $("#express-buy-dialog").find(".productid");
            hid_id.val(productid);


            if (hover_timer) hover_timer = clearTimeout(hover_timer);
            var pos = self.offset();
            var ex_w = $("#express-buy-dialog").width();
            var item_w = self.width();
            var l;
            if (pos.left + item_w + ex_w > $(window).width()) {
                l = pos.left - ex_w;
                if (l < 0)
                    l = 0;
                $("#express-buy-dialog")
                    .addClass("express-buy-l")
                    .removeClass("express-buy-r");
            } else {
                l = pos.left + item_w;
                if (l < 0)
                    l = 0;

                $("#express-buy-dialog")
                    .addClass("express-buy-r")
                    .removeClass("express-buy-l");
            }
            $("#express-buy-dialog")
                .css({
                    'top': pos.top,
                    'left': l
                })
                .fadeIn();

            $("#express-buy-dialog .loading").bbLoading();

            productFac.productDetail(productid).success(function(data) {
                scope.productItem = data;
                $("#express-buy-dialog .loading").bbLoading('stop');
                setTimeout(function() {
                    $(".fussed-choose .fussed-list input.ischoonse:first-child").addClass("active");
                    $(".fussedid").val($(".item-fussed.active").attr("rel"));
                }, 500);
            });
        }, 300);


    }).on("mouseleave", ".product-item, .product-item-inline", function() {
        hover_timer = setTimeout(function() {
            $("#express-buy-dialog").hide();
            $(".express-loading").hide();
            scope.productItem = null;
        }, 300);
        if (delay_timer) delay_timer = clearTimeout(delay_timer);
        $(".Sizes").val("");
        $(".size-choose .bg-size span").on("click", function() {
            $(".bg-size span").removeClass("actived");
            $(this).addClass("actived");
            scope.SizeID = $(this).parent().attr("data");
            $(".Sizes").val(scope.SizeID);
            return;

        });

        $(".colorid").val("");
        $("#express-buy-dialog").on("click", ".color-choose .bg-size .color-item", function() {
            $(".bg-size .color-item").removeClass("actived");
            $(this).addClass("actived");
            scope.colorid = $(this).attr("data");
            $(".colorid").val(scope.colorid);
            return;
        });

        $("#express-buy-dialog").on("click", ".fussed-choose .fussed-list .item-fussed", function() {
            $(".fussed-choose .fussed-list .item-fussed").removeClass("active");
            $(this).addClass("active");
            scope.fussedid = $(this).attr("rel");
            $(".fussedid").val(scope.fussedid);
            return;
        });

    });

    $("#express-buy-dialog").mouseenter(function() {
        if (hover_timer) hover_timer = clearTimeout(hover_timer);
    }).mouseleave(function() {
        hover_timer = setTimeout(function() {
            $("#express-buy-dialog").hide();
            $(".express-loading").hide();
            scope.productItem = null;
        }, 300);
    });


    $("#express-buy-dialog").on("click", ".btn-request", function() {
        var productid = scope.productItem.ID;
        if ($("#CurrentUserID").val() != undefined) {
            RequestInfoMember(productid);
            $("#express-buy-dialog").hide();
            $(".express-loading").hide();
        } else {

            $("#request-info-dialog #RequestInfo_ProductID").val(productid);
            $("#request-info-dialog").modal("show");

            $("#express-buy-dialog").hide();
            $(".express-loading").hide();
            scope.productItem = null;
        }


    });

    $("#express-buy-dialog .btn-fav").on("click", function() {
        $("#express-buy-dialog").hide();
        $(".express-loading").hide();
        scope.productItem = null;
        $(this).parent().submit();
    });


    $("#express-buy-dialog .btn-buy, #express-buy-dialog .btn-pre").on("click", function() {
        if ($(this).hasClass('add-to-cart'))
            $("#express-buy-dialog").hide();
        $(".express-loading").show();
        scope.productItem = null;
    });

    var login_html =
        "<a href='/dang-nhap.html' class='btn btn-bb'>Tài khoản BookBuy</a>\
        <br />\
         <a href='/login/facebook?returnurl={0}' class='btn btn-fb'>\
            <i class='fa fa-facebook'></i>\
            Tài khoản Facebook\
         </a>".format(window.location.href);

    $("#btn-login-trigger").popover({
        html: true,
        content: login_html,
        trigger: 'hover',
        placement: 'bottom',
        container: '#btn-login-trigger'
    });


    $.get('/api/News/NewsCollectionByID/6/1/3', function(data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += "\
                <li>\
                    <div class='l'>\
                        <a href='{0}'>{1}</a>\
                    </div>\
                    <div class='r'>\
                        <img class='slimmage' src='/Res/Images/Event/{2}?w=80' />\
                        {3} </div>\
                    <div class='clearfix'></div>\
                </li>".format(data[i].Link, data[i].Title, data[i].URL, data[i].IsNew ? '<img class="slimmage" src="/Images/frontend/base/icon_new.gif" />' : '')
        }
        if (html != "") {
            $("#btn-news-trigger").popover({
                html: true,
                title: 'Tin mới',
                content: "<ul class='popup-news'>{0}</ul>".format(html),
                trigger: 'hover',
                placement: 'bottom',
                container: '#btn-news-trigger'
            });
        }
    })



    //gift info
    $(".product-item i.gift").tooltip();


    $("#Term").onTextEnter({
        btnToTrigger: $(".button-search")
    });
    $("#TermTop").onTextEnter({
        btnToTrigger: $(".button-search-top")
    });

    var productType = 0;
    var xhrp = undefined;
    $("#Term, #TermTop").on('keydown', function(e) {
        if (e.which == 38 || e.which == 40) {
            $(".dropdown-menu li").removeClass("item-active");
        }
    }).autocomplete({
        delay: 0,

        source: function(request, response) {
            if (xhrp != undefined) {
                xhrp.abort();
                xhrp = undefined;
            }
            xhrp = $.ajax({
                url: "/BookBuy/SearchResultVirtual",
                dataType: "json",
                data: {
                    "term": request.term
                },
                success: function(data) {
                    $.ajax({
                        url: "/BookBuy/SearchResultJson?type=" + productType + "&term=" + data,
                        dataType: "json",
                        success: function(data) {
                            response($.map(data, function(item) {
                                return item;
                            }));
                        }
                    });

                }
            });
        },
        select: function(evt, ui) {
            var url = "";
            if (ui.item.Link != "" && ui.item.Link != null)
                url = ui.item.Link;
            else
                url = "/tim-kiem?key={0}&cat={1}&page=1".format(ui.item.Title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s{1,}|[?<>#^'="*&$]/g, "+"), productType);
            window.location.href = url;
        },
        focus: function(evt, ui) {
            $(".dropdown-menu li").removeClass("item-active");
            var liActive = $("li[data='" + ui.item.FocusIndex + "']");
            if (liActive != undefined)
                liActive.addClass("item-active");
            return false;
        }
    })

    $.ui.autocomplete.prototype._renderItem = function(ul, item) {
        ul.attr("class", "");
        ul.addClass("dropdown-menu")

        ul.append(item.URL != null && $(".dropdown-menu .header-auto-search").length == 0 ? "<li class='h3 header-auto-search'>Sản phẩm liên quan</li>" : "");
        return $("<li data='{0}'></li>".format(item.FocusIndex))
            .data("item.autocomplete", item)
            .append("<a class='item-search'>{0}<span>{1}</span><span class='spanprice'>{2}</span></a> <div class='clearfix'></div>".format(item.URL != null ? "<img class='slimmage item-img' src='//bookbuy.vn/Res/Images/Product/{0}?width=40' />".format(item.URL) : "", item.Title, item.Price != null ? (item.RealPrice != item.Price ? "<span class='realprice'>" + item.RealPrice.formatMoney(0, '.', ',') + " ₫ </span><span class='price'>" + item.Price.formatMoney(0, '.', ',') + " ₫ </span> " : "<span class='realprice'>" + item.Price.formatMoney(0, '.', ',') + " ₫ </span>") : ""))
            .appendTo(ul);
    }



    goTop();

    //search
    $(".button-search").click(function() {
        var txt = $.trim($("#Term").val());


        if (txt != "" && txt != $("#Term").attr("data")) {
            var url = "";
            $.ajax({
                url: '/BookBuy/SearchResultJsonForEnter',
                type: 'Post',
                async: false,
                data: {
                    term: txt
                },
                success: function(data) {
                    if (data.Link != "") {
                        url = data.Link;
                    }
                }
            });
            if (url == "")
                url = "/tim-kiem?key={0}&cat={1}&page=1".format(txt.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s{1,}/g, "+"), productType);
            window.location.href = url;
        }
    });

    $(".button-search-top").click(function() {
        var txt = $.trim($("#TermTop").val());


        if (txt != "" && txt != $("#TermTop").attr("data")) {
            var url = "";
            $.ajax({
                url: '/BookBuy/SearchResultJsonForEnter',
                type: 'Post',
                async: false,
                data: {
                    term: txt
                },
                success: function(data) {
                    if (data.Link != "") {
                        url = data.Link;
                    }
                }
            });
            if (url == "")
                url = "/tim-kiem?key={0}&cat={1}&page=1".format(txt.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s{1,}/g, "+"), productType);
            window.location.href = url;
        }
    });

    $(".search-new-box .dropdown-menu li a").on("click", function() {
        productType = $(this).attr("cat");
        $("#Term").autocomplete("option", "source", "/BookBuy/SearchResultJson?type=" + productType);
        $(".search-new-box .btn-category").html($(this).text() + "<span class='caret'></span>");
    });

    //$(".popout .toggle i.fa").on("click", function () {
    //    if (!$(this).parent().attr("data") || $(this).parent().attr("data") == "1") {
    //        $(this).parent().attr("data", "0");
    //        $(".popout").animate({ "bottom": "-200px" });
    //        $(".popout .toggle i.fa-plus").show();
    //        $(".popout .toggle i.fa-minus").hide();
    //    }
    //    else {
    //        $(this).parent().attr("data", "1");
    //        $(".popout").animate({ "bottom": "0px" });
    //        $(".popout .toggle i.fa-plus").hide();
    //        $(".popout .toggle i.fa-minus").show();
    //    }
    //})

    $(".bt-close-float-ev").on("click", function() {
        $(".float-banner-ev-bottom").hide();
        createFlagSession('popupBottom');
    })


    $(".submit-letter-toggle").click(function() {
        var gender = $(this).data('gender');
        $('#sexIdToggle').val(gender);
        if (!BookBuy.Email.IsValid($("#emaillettertoggle").val())) {
            $(".newsletter-toggle span.toggle-error").empty().append("Email không đúng !");
        } else {
            $("#emailletter-toggle").submit();
        }
    });

    $(".action-submit li").click(function(e) {
        if (e.target.localName != 'a') {
            $($(this).find('a')[0]).trigger('click');
        } else {
            return false;
        }
    })

    $(".submit-letter-canh-cam").click(function() {
        var gender = $(this).data('gender');
        $('#sexId').val(gender);
        var hasErrors = false;
        if (!BookBuy.Email.IsValid($("#submit-letter").val())) {
            $(".form-letter .entry-form span.email-error").text("* Email không đúng !");
            hasErrors = true;
        }
        var name = $.trim($("#EmailLetterName").val());
        if (name == '') {
            $(".form-letter .entry-form span.name-empty").text("* Chưa nhập tên !");
            hasErrors = true;
        }
        if (!hasErrors) {
            $("#emailletter-bottom").submit();
        }
    });

    //Khoi tao popup gio hang

    $("#checkoutform button[type=submit], #checkoutform input[type=submit],#checkoutformmb button[type=submit], #checkoutformmb input[type=submit], #express-buy-dialog input[type=submit]").click(function() {
        $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $("button[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
        if ($(this).hasClass("buy-now"))
            $(this).parents("form").find("#actiontype").val('buy-now');
        else if ($(this).hasClass("buy-tragop"))
            $(this).parents("form").find("#actiontype").val('tragop');
        else
        if ($(this).hasClass("add-to-cart")) {
            var productid = $(this).parents("form").find("input[name='productid']").val();
            if (productid != null && productid != undefined) {
                productFac.productDetail(productid).success(function(data) {
                    scope.productCartItem = data;
                    scope.productCartItem.URL = "//bookbuy.vn/Res/Images/Product/" + scope.productCartItem.URL + "?width=140";

                });
            }
            $(this).parents("form").find("#actiontype").val('add-to-cart');
        }

    });
});

function EmailRegisterBottomSuccess(response) {
    if (response.error == 0) {
        $(".form-letter .entry-form span.name-empty").empty();
        $(".form-letter .entry-form span.email-error").empty();
        $("#submit-letter").val('');
        $("#EmailLetterName").val('');
        createCookie('registedEmail', "true", 1);
        $("#register-letter-success").modal('show');
    } else {
        $("span.email-error").empty().append(response.msg);
    }
}

function EmailRegisterBottomFailure(response) {
    $(".form-letter .entry-form span.toggle-error").empty().append(response.msg);
}


function EmailRegisterToggleSuccess(response) {
    if (response.error == 0) {
        $(".newsletter-toggle span.toggle-error").empty();
        $(".newsletter-toggle span.toggle-success").empty().append(response.msg);
        $("#emaillettertoggle").val('');
        createCookie('registedEmail', "true", 1);
        setTimeout(function() {
            $(".newsletter-toggle").css("display", "none");
        }, 5000)
    } else {
        $(".newsletter-toggle span.toggle-error").empty().append(response.msg);
    }
}

function EmailRegisterToggleFailure(response) {
    $(".newsletter-toggle span.toggle-error").empty().append(response.msg);
}

function delay(object) {
    $(object).css("display", "none");
}

var detectButtonSubmit;

function AddToCartBegin(productid) {
    var shoppingCartId = readCookie('BBNewShoppingCartID');
    if (shoppingCartId != null && shoppingCartId != '') {
        var result = checkproductInCart(shoppingCartId);
        var itemCart = $.grep(result, function(n, i) {
            return n.ID == productid;
        })[0];

        if (itemCart != undefined && itemCart != null) {
            var check = confirm("Đã có " + itemCart.Quantity + " sản phẩm này trong giỏ hàng, Ok để mua thêm, Cancel để tới trang giỏ hàng!");
            if (!check) {
                setTimeout(function() {
                    location.href = '/gio-hang.html';
                }, 200);
                return false;
            }

        }
    }

    if ($(".p-view .size-choose .content").attr("data") == 'true' && $(".size-choose .bg-size span").hasClass("actived") == false) {
        $("#post-success-dialog .modal-title").text("Lỗi");
        $("#post-success-dialog .modal-body").html("<p style='font-size: 15px;'>Chưa chọn size !</p>");
        $("#post-success-dialog").modal('show');
        $(".express-loading").hide();
        return false;
    }

    if ($(".p-view .color-choose .content").attr("data") == 'true' && $(".color-choose .bg-size .color-item").hasClass("actived") == false) {
        $("#post-success-dialog .modal-title").text("Lỗi");
        $("#post-success-dialog .modal-body").html("<p style='font-size: 15px;'>Chưa chọn màu !</p>");
        $("#post-success-dialog").modal('show');
        $(".express-loading").hide();
        return false;
    }

    if (productid == null || productid.data != undefined) productid = $("#express-buy-dialog >.content").attr("id");
    if ($("#fussed-" + productid).length > 0 && $("#fussed-" + productid).attr("hasfussed") == 'true' && $("#fussed-" + productid + " .item-fussed").hasClass("active") == false) {
        $("#post-success-dialog .modal-title").text("Lỗi");
        $("#post-success-dialog .modal-body").html("<p style='font-size: 15px;'>Chưa chọn kiểu dáng !</p>");
        $("#post-success-dialog").modal('show');
        $(".express-loading").hide();
        return false;
    }

    detectButtonSubmit = $("input[type=submit][clicked=true]");
    if (detectButtonSubmit.length == 0)
        detectButtonSubmit = $("button[type=submit][clicked=true]");
    detectButtonSubmit.attr('disabled', '');
    if ($(detectButtonSubmit).hasClass("add-to-cart")) {
        $("#add-cart-success-dialog").modal('show');

    }
    return true;
}


function AddToCartSuccess(response) {
    if (response.actiontype == undefined || response.actiontype == null)
        return;
    detectButtonSubmit.removeAttr('disabled');
    switch (response.actiontype) {
        case "buy-now":
            window.location.href = response.redirect;
            break;
        case "tragop":
            window.location.href = response.redirect;
            break;
        case "add-to-cart":
            if ($("form#ShoppingCartForm").length > 0) {
                $("form#ShoppingCartForm").submit();
                $("#add-cart-success-dialog").modal('hide');
                $("html, body").animate({
                    scrollTop: 0
                }, 500);

            }
            var scope = angular.element("body").scope()
            scope.$apply(function() {
                scope.shoppingCartCount = scope.shoppingCartCount + response.quantity;
                scope.quantityAdd = response.quantity;
                scope.totalAllCart = scope.totalAllCart + response.price * response.quantity;

            });

            break;
    }
    $("#add-cart-success-dialog .modal-dialog").bbLoading('stop');
}


function RequestInfoBegin(response) {
    $("#request-info-dialog #validateErr").empty();
    $("#request-info-dialog .modal-dialog").bbLoading();

}

function RequestInfoSuccess(response) {
    $("#request-info-dialog .modal-dialog").bbLoading('stop');
    if (response.ContentErr != undefined) {
        $("#request-info-dialog #validateErr").append(response.ContentErr);
    } else {

        $("#request-info-dialog").modal('hide');
        $("#post-success-dialog .modal-title").text("Yêu cầu thông báo khi có hàng");
        $("#post-success-dialog .modal-body").text(response.Content);
        $("#post-success-dialog").modal('show');
    }
    grecaptcha.reset(widgetId);
}

var widgetId;
var widgetIdForm;
var widgetIdForm1;
var onloadCallback = function() {
    widgetId = grecaptcha.render(document.getElementById('request-captcha'), {
        'sitekey': '6Lf-weUcAAAAAMbLZg32ldx59eaVbzovA9j63zFO'
    });
    if (document.getElementById('request-captchaform')) {

        widgetIdForm = grecaptcha.render(document.getElementById('request-captchaform'), {
            'sitekey': '6Lf-weUcAAAAAMbLZg32ldx59eaVbzovA9j63zFO'
        });
    }
    if (document.getElementById('request-captchaform1')) {

        widgetIdForm = grecaptcha.render(document.getElementById('request-captchaform1'), {
            'sitekey': '6Lf-weUcAAAAAMbLZg32ldx59eaVbzovA9j63zFO'
        });
    }
};

function RequestInfoMember(productid) {
    $.ajax({
        url: '/BookBuy/RequestInfoForMember',
        type: 'Post',
        async: false,
        data: {
            ProductID: productid
        },
        success: function(data) {
            if (data.ContentErr != undefined) {
                $("#request-info-dialog #validateErr").append(data.ContentErr);
            } else {
                $("#post-success-dialog .modal-title").text("Yêu cầu thông báo khi có hàng");
                $("#post-success-dialog .modal-body").text(data.Content);
                $("#post-success-dialog").modal('show');
            }
        }
    });
}

function AddToFavBegin(response) {
    $("#post-success-dialog .modal-title").text("Thêm sản phẩm yêu thích");
    $("#post-success-dialog .modal-body").text("");
    $("#post-success-dialog .modal-dialog").bbLoading();
    $("#post-success-dialog").modal('show');
}

function AddToFavSuccess(response) {

    $("#post-success-dialog .modal-dialog").bbLoading('stop');
    $("#post-success-dialog .modal-body").text(response);
}

function goTop() {
    if ($(this).scrollTop() > page_top_limit) {
        $("#toTop").fadeIn()
    } else {
        $("#toTop").fadeOut()
    }
    $(window).scroll(function() {
        if ($(this).scrollTop() > page_top_limit) {
            $("#toTop").fadeIn()
        } else {
            $("#toTop").fadeOut()
        }
    });
    $("#toTop").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false
    })
}

function ParseString(object) {
    if (IsNullOrEmpty(object)) {
        return "";
    }

    return object.toString();
}

function IsNullOrEmpty(object) {
    if (object == null || object.toString().trim() == "null") {
        return true;
    } else {
        if (object.toString().trim() == "") {
            return true;
        } else {
            return false;
        }
    }
}

function ParseBool(object) {
    if (IsNullOrEmpty(object)) {
        return false;
    }
    if (ParseString(object).toLowerCase() == 'true') {
        return true;
    } else {
        return false;
    }
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();

        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        var expires = '; expires=' + date.toGMTString();
    } else {
        expires = '';
    }

    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = decodeURIComponent(ca[i]);

        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
}

function createFlagSession(name) {
    $.get('/BookBuy/SetFlagSession?name=' + name, function(data) {
        return ParseBool(data);
    });
}

function checkproductInCart(cartNumber) {
    var remote = $.ajax({
        type: "GET",
        url: '/BookBuy/CheckProductInCart?cartNumber=' + cartNumber,
        async: false
    }).responseJSON;
    return remote
}

function readFlagSession(name) {
    var remote = $.ajax({
        type: "GET",
        url: '/BookBuy/GetFlagSession?name=' + name,
        async: false
    }).responseText;
    return ParseBool(remote);
}

function getCurrentUser() {
    var remote = $.ajax({
        type: "GET",
        url: '/BookBuy/GetCurrentUser',
        async: false
    }).responseText;
    return parseInt(remote);
}

function SortByOrder(a, b) {
    if (a.Order)
        return ((a.Order < b.Order) ? -1 : ((a.Order > b.Order) ? 1 : 0));
}

angular
    .module('bookbuy')
    .controller('shared.ctrl', ['webContentFac', '$scope', '$sce', '$timeout', function(webContentFac, $scope, $sce, $timeout) {
        $scope.bindImage = function(url) {
            if (url != null)
                return pathImageWebContent + url;
            return "";
        }
        $scope.trustAsResourceUrl = function(url) {
            return $sce.trustAsResourceUrl(url);
        }
        $scope.renderHtml = function(html_code) {
            return $sce.trustAsHtml(html_code);
        };
        //first load frontend layout
        webContentFac.getListCategoriesByPages({
            Page: "Frontend"
        }).success(function(data) {
            $scope.loadContentPageByCategories("Frontend", data);
        });
        //get shoppingcart count
        webContentFac.getShoppingCartCount().success(function(data) {
            $scope.shoppingCartCount = data.shoppingCartCount;
            $scope.totalAllCart = data.Total;
        });

        //second load special page
        var page = $("#hdPage").val();
        if (page != "" && page != undefined) {
            webContentFac.getListCategoriesByPages({
                Page: page
            }).success(function(data) {
                $scope.loadContentPageByCategories(page, data);
            });
        }

        $scope.loadContentPageByCategories = function(Page, categories) {
            for (var i = 0; i < categories.length; i++) {
                webContentFac.getListContents({
                    Page: Page,
                    Category: categories[i]
                }).success(function(data) {
                    if (data.length > 0)
                        $scope[Page + '_' + data[0].Category] = data
                    $scope[Page + '_' + data[0].Category] = $scope[Page + '_' + data[0].Category].sort(SortByOrder);
                    for (var j = 0; j < data.length; j++) {
                        $scope[Page + '_' + data[j].Category + '_' + data[j].Name] = data[j];
                    }
                })
            }
        }

    }])