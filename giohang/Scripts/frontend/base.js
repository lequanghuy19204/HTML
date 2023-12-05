BookBuy = {};

BookBuy.Email = {
    IsValid: function(str) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return filter.test(str);
    }
};
Number.prototype.formatMoney = function(c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


BookBuy.Menu = {
    SideBarMenu: function(menuids) {
        for (var i = 0; i < menuids.length; i++) {
            var $this = document.getElementById(menuids[i]);
            if ($this == null) return;
            var ultags = $this.getElementsByTagName("ul");
            for (var t = 0; t < ultags.length; t++) {
                ultags[t].parentNode.getElementsByTagName("a")[0].className += " subfolderstyle";
                if (ultags[t].parentNode.parentNode.id == menuids[i])
                    ultags[t].style.left = ultags[t].parentNode.offsetWidth + "px";
                else
                    ultags[t].style.left = ultags[t - 1].getElementsByTagName("a")[0].offsetWidth + "px";
                ultags[t].parentNode.onmouseover = function() {
                    this.getElementsByTagName("ul")[0].style.display = "block";
                }
                ultags[t].parentNode.onmouseout = function() {
                    this.getElementsByTagName("ul")[0].style.display = "none";
                }
            }
            for (var t = ultags.length - 1; t > -1; t--) {
                ultags[t].style.visibility = "visible";
                ultags[t].style.display = "none";
            }
        }
    }
};

BookBuy.Banner = {
    IncreaseClickCount: function(bannerid) {
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: "{bannerid:'" + bannerid + "'}",
            url: "/Admin/IncreaseBannerClickCount",
            async: false,
            success: function(data) {
                debugger;
            },
            error: function(a, b, c) {
                debugger;
            }
        });
    }
};

Date.prototype.GetDaysOfMonth = function(m, y) {
    return 32 - new Date(y, m - 1, 32).getDate();
};


String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

;
(function($) {
    $.fn.advScroll = function(option) {
            $.fn.advScroll.option = {
                marginTop: 20,
                easing: '',
                timer: 400,
            };

            option = $.extend({}, $.fn.advScroll.option, option);

            return this.each(function() {
                var el = $(this);
                $(window).scroll(function() {
                    t = parseInt($(window).scrollTop()) + option.marginTop;
                    el.stop().animate({
                        marginTop: t
                    }, option.timer, option.easing);
                })
            });
        },
        $.fn.HintText = function(options) {
            var defaults = {
                text: 'Nhập từ'
            };
            var opts = $.extend(defaults, options);
            return this.each(function() {
                var self = $(this);
                self
                    .attr("data", opts.text)
                    .val(opts.text)
                    .bind("focus", function() {
                        if (self.val() == self.attr('data')) self.val('');
                    }).bind("blur", function() {
                        if (self.val() == '') self.val(self.attr('data'));
                    });
            });
        },
        $.fn.EditPaging = function(options) {
            var defaults = {
                formId: 'mainform',
                pageId: 'Search_Page',
                beforeSubmit: function() {}
            };
            var opts = $.extend(defaults, options);
            return this.each(function(options) {

                var href = $(this).attr("href");

                if (href != "" && href != undefined) {
                    var page;
                    if (href.indexOf(".html") != -1)
                        page = href.substring(href.lastIndexOf('/') + 1, href.indexOf('.'));
                    else
                        page = href.substring(href.lastIndexOf('/') + 1);
                    $(this).attr("href", "javascript:void()");
                    $(this)
                        .click(function() {
                            opts.beforeSubmit.call(this);
                            $("form#" + opts.formId + " #" + opts.pageId).val(page);
                            $("form#" + opts.formId).submit();
                        });
                }
            });
        },
        $.fn.jqueryMenu = function(options) {
            var defaults = {};
            var obj = $.extend(defaults, options);
            return this.each(function() {
                var self = $(this);
                if (!self.is("ul")) {
                    alert("element must be a ul");
                    return;
                }
                self.find("li>ul").css({
                    "display": "none",
                    "position": "absolute"
                });
                $(">li", self).hover(function() {
                    $("ul", this).show();
                }, function() {
                    $("ul", this).hide();
                });
            });
        },

        $.fn.sideBarMenu = function(options) {
            var defaults = {};
            var obj = $.extend(defaults, options);
            return this.each(function() {
                var self = $(this);
                $("li", self).each(function() {
                    $(this).css("position", "relative");
                    if ($(this).find("ul").size() > 0) {
                        $(this).addClass("has-sub");
                    }
                });
                self.find("li>ul").css({
                    "display": "none",
                    "position": "absolute"
                });
                $("li", self).hover(function() {
                    $(">ul", this).show();
                }, function() {
                    $(">ul", this).hide();
                });
            });
        },
        $.fn.onTextEnter = function(options) {
            var defaults = {
                btnToTrigger: null
            };
            var opts = $.extend(defaults, options);
            return this.each(function() {
                var self = $(this);
                self.bind('keypress', function(evt) {
                    if (evt.which && evt.which == 13) {
                        if (opts.btnToTrigger != null) opts.btnToTrigger.trigger('click');
                        return false;
                    } else return true;
                });
            });
        },
        $.fn.fadeSlide = function(options) {
            var defaults = {
                duration: 4000,
                transition: 7000,
                navTitle: false
            };
            var opts = $.extend(defaults, options);

            return this.each(function() {
                var currentIndex = 1;
                var nextIndex = 1;
                var self = $(this);
                var ul = $("ul", self);
                self.css({
                    "position": "relative",
                    "display": "block"
                });
                ul.css({
                    "position": "relative",
                    "list-style-type": "none"
                });
                var li = $("li", ul);
                if (li.size() > 1)
                    li
                    .css({
                        "top": "0",
                        "left": "0",
                        "position": "absolute",
                        "opacity": "0.0",
                        "display": "none"
                    });

                var controls = $("<div class='controls hide-responsive'></div>").css({
                    "position": "absolute"
                });
                for (var i = 1; i <= li.size(); i++) {
                    var anchor = $("<a data='" + i + "' href='javascript:void'></a>")
                        .bind("click", function() {
                            if (li.size() > 1) {
                                clearInterval(timer);
                                var aindex = parseInt($(this).attr("data"));
                                if (aindex == currentIndex) return;
                                $("a[data='" + currentIndex + "']", controls).removeClass("current");
                                $(this).addClass("current");
                                $("ul li:nth-child(" + aindex + ")", self).css("display", "block").animate({
                                    "opacity": "1"
                                }, opts.duration);
                                $("ul li:nth-child(" + currentIndex + ")", self).animate({
                                    "opacity": "0"
                                }, opts.duration).css("display", "none");
                                currentIndex = aindex;
                                nextIndex = aindex;
                                timer = setInterval(nextSlide, opts.transition);
                            }
                        })
                    anchor.html(opts.navTitle ? "<strong>" + $("ul li:nth-child(" + i + ")", self).attr("title") + "</strong>" : "");
                    controls.append(anchor);
                }
                self.append(controls);

                $("a[data='" + currentIndex + "']", controls).addClass("current");
                $("ul li:nth-child(" + currentIndex + ")", self).css("display", "block").animate({
                    "opacity": "1"
                }, opts.duration);
                if (li.size() > 1) timer = setInterval(nextSlide, opts.transition);

                function nextSlide() {
                    nextIndex += 1;
                    if (nextIndex > li.size()) nextIndex = 1;
                    $("a[data='" + nextIndex + "']", controls).addClass("current");
                    $("a[data='" + currentIndex + "']", controls).removeClass("current");
                    $("ul li:nth-child(" + nextIndex + ")", self).css("display", "block").animate({
                        "opacity": "1"
                    }, opts.duration);
                    $("ul li:nth-child(" + currentIndex + ")", self).animate({
                        "opacity": "0"
                    }, opts.duration).css("display", "none");
                    currentIndex = nextIndex;
                }

            });
        },

        $.fn.effectSlide = function(options) {
            var defaults = {
                duration: 4000,
                transition: 7000,
                navTitle: false
            };
            var opts = $.extend(defaults, options);

            return this.each(function() {
                var currentIndex = 1;
                var nextIndex = 1;
                var self = $(this);
                var ul = $("ul", self);
                self.css({
                    "position": "relative",
                    "display": "block"
                });
                ul.css({
                    "position": "relative",
                    "list-style-type": "none"
                });
                var li = $("li", ul);
                if (li.size() > 1)
                    li
                    .css({
                        "top": "0",
                        "left": "0",
                        "position": "absolute",
                        "opacity": "0.0",
                        "display": "none"
                    });

                var controls = $("<div class='controls hide-responsive'></div>").css({
                    "position": "absolute"
                });
                for (var i = 1; i <= li.size(); i++) {
                    var anchor = $("<a data='" + i + "' href='javascript:void'></a>")
                        .bind("click", function() {
                            if (li.size() > 1) {
                                clearInterval(timer);
                                var aindex = parseInt($(this).attr("data"));
                                if (aindex == currentIndex) return;
                                $("a[data='" + currentIndex + "']", controls).removeClass("current");
                                $(this).addClass("current");
                                $("ul li:nth-child(" + aindex + ")", self).css("display", "block").animate({
                                    "opacity": "1"
                                }, opts.duration);
                                $("ul li:nth-child(" + currentIndex + ")", self).animate({
                                    "opacity": "0"
                                }, opts.duration).css("display", "none");
                                currentIndex = aindex;
                                nextIndex = aindex;
                                timer = setInterval(nextSlide, opts.transition);
                            }
                        })
                    anchor.html(opts.navTitle ? "<img src='" + $("ul li:nth-child(" + i + ")", self).attr("thumb") + "'><strong>" + $("ul li:nth-child(" + i + ")", self).attr("title") : "");
                    controls.append(anchor);
                }
                self.append(controls);

                $("a[data='" + currentIndex + "']", controls).addClass("current");
                $("ul li:nth-child(" + currentIndex + ")", self).css("display", "block").animate({
                    "opacity": "1"
                }, opts.duration);
                if (li.size() > 1) timer = setInterval(nextSlide, opts.transition);

                function nextSlide() {
                    nextIndex += 1;
                    if (nextIndex > li.size()) nextIndex = 1;
                    $("a[data='" + nextIndex + "']", controls).addClass("current");
                    $("a[data='" + currentIndex + "']", controls).removeClass("current");
                    $("ul li:nth-child(" + nextIndex + ")", self).css("display", "block").animate({
                        "opacity": "1"
                    }, opts.duration);
                    $("ul li:nth-child(" + currentIndex + ")", self).animate({
                        "opacity": "0"
                    }, opts.duration).css("display", "none");
                    currentIndex = nextIndex;
                }

            });
        },


        $.fn.moveSlide = function(options) {
            var defaults = {
                autoplay: false,
                duration: 700,
                transition: 5000,
                direction: 'vertical',
                itemsVisible: 1,
                showItemControl: true,
                showNextPrev: false,
                controlImage: false,
                controlTitle: false
            };
            var opts = $.extend(defaults, options);

            return this.each(function() {
                var currentIndex = 0;
                var nextIndex = 0;
                var self = $(this);
                self.css({
                    'position': 'relative',
                    'overflow': 'hidden'
                });
                var ul = $("ul", self);
                ul.css({
                    "list-style-type": "none",
                    "position": "absolute",
                    "left": "0",
                    "top": "0"
                });
                var lis = $("li", ul);
                lis.css("height", self.height() + "px");
                var liW = lis.eq(0).outerWidth(true);
                var liH = lis.eq(0).outerHeight();
                if (opts.direction == 'horizontal') {
                    lis.css("float", "left");
                    ul.css({
                        "width": (lis.size() * liW) + "px"
                    })
                }
                var control, ulControl, timer, pre, next;
                if (opts.showItemControl) {
                    control = $("<div class='controls hide-responsive'></div>").appendTo(self);
                    ulControl = $("<ul></ul>").css({
                        "list-style-type": "none"
                    }).appendTo(control);
                    for (var i = 0; i < lis.size(); i++) {
                        var li = lis.eq(i);
                        var aControl = $("<a>" + (options.controlImage ? "<img src='" + li.attr("img") + "' />" : "") + (opts.controlTitle ? "<span>" + li.attr("title") + "</span>" : "") + "</a>")
                            .bind("click", function() {
                                if (lis.size() > 1) {
                                    var aindex = parseInt($(this).parent().attr("data"));
                                    self.trigger("controlItemClick", [aindex]);
                                    clearInterval(timer);
                                    if (aindex == currentIndex) return;
                                    $("li[data='" + currentIndex + "']", ulControl).removeClass("current");
                                    $(this).parent().addClass("current");
                                    currentIndex = aindex;
                                    nextIndex = aindex;
                                    moveSlide();
                                    if (lis.size() > 1 && opts.autoplay) timer = setInterval(nextSlide, opts.transition);
                                }
                            });
                        var liControl = $("<li data='" + i + "'></li>").append(aControl).appendTo(ulControl);
                    }
                }

                if (opts.showNextPrev) {
                    pre = $("<div class='ctr-pre'><a ><i class='icon icon-chevron-sign-left'></i></a></div>").
                    bind('click', preHandler).insertBefore(self);

                    next = $("<div class='ctr-next'><a><i class='icon icon-chevron-sign-right'></i></a></div>").
                    bind('click', nextHandler).insertAfter(self);
                    setPreNext();
                }

                if (opts.showItemControl) $("li[data='" + currentIndex + "']", ulControl).addClass("current");
                if (lis.size() > 1 && opts.autoplay) timer = setInterval(nextSlide, opts.transition);


                function preHandler() {
                    if (currentIndex >= opts.itemsVisible - 1) currentIndex -= opts.itemsVisible;
                    moveSlide();
                }

                function nextHandler() {
                    if (currentIndex + opts.itemsVisible < lis.size()) currentIndex += opts.itemsVisible;
                    moveSlide();
                }

                function moveSlide() {
                    var posTogo;
                    if (opts.direction == "horizontal") {
                        posTogo = currentIndex * liW;
                        ul.animate({
                            "left": -posTogo + "px"
                        }, opts.duration);
                    } else {
                        posTogo = currentIndex * liH;
                        ul.animate({
                            "top": -posTogo + "px"
                        }, opts.duration);
                    }
                    if (opts.showNextPrev) setPreNext();
                }

                function nextSlide() {
                    nextIndex += opts.itemsVisible;
                    if (nextIndex >= lis.size()) nextIndex = 0;
                    $("li[data='" + nextIndex + "']", ulControl).addClass("current");
                    $("li[data='" + currentIndex + "']", ulControl).removeClass("current");
                    currentIndex = nextIndex;
                    moveSlide();
                    if (opts.showNextPrev) setPreNext();
                }

                function setPreNext() {
                    if (currentIndex + opts.itemsVisible >= lis.size()) next.css({
                        "display": "none"
                    });
                    else next.css({
                        "display": "block"
                    });
                    if (currentIndex == 0) pre.css({
                        "display": "none"
                    });
                    else pre.css({
                        "display": "block"
                    });
                }

            })
        },

        $.fn.bbToolTip = function(options) {
            var defaults = {
                content: ''
            };
            var opts = $.extend(defaults, options);
            return this.each(function() {
                var self = $(this),
                    hol = $("<div class='bbtooltip-hol'></div>")
                    .css({
                        "position": "absolute",
                        "display": "none"
                    })
                    .append(opts.content);

                self
                    .css("position", "relative")
                    .append(hol)
                    .hover(function() {
                            $(".bbtooltip-hol", $(this)).show();
                        },
                        function() {
                            $(".bbtooltip-hol", $(this)).hide();
                        });

            });
        },
        $.fn.SelectCustomCheckBox = function() {
            return this.each(function(index) {
                var chkbox = $("<input type='checkbox' name='IDsSelect[" + index + "]' id='IDsSelect[" + index + "]' />")
                    .click(function() {
                        if ($(this).prop("checked") == true) {
                            $("<input type='hidden' name='IDsSelected' />")
                                .val($(this).prev().val())
                                .appendTo($(this).parent());
                        } else {
                            $(this).next().remove();
                        }
                    });

                $(this)
                    .append(chkbox);
            });
        },
        $.fn.CustomCheckBoxAll = function() {
            return this.each(function() {
                var chkbox = $("<input name='IsWrapPlastic' id='IsWrapPlastic' type='checkbox'>")
                    .click(function() {
                        if ($(this).prop("checked") == true) {
                            $(".lst-detail .chkbox input[type='checkbox']").each(function() {
                                if ($(this).attr("checked") != "checked") {
                                    $(this).prop("checked", true);
                                    $("<input type='hidden' name='IDsSelected' />")
                                        .val($(this).prev().val())
                                        .appendTo($(this).parent());
                                }
                            });
                        } else {
                            $(".lst-detail .chkbox input[type='checkbox']").each(function() {
                                if ($(this).prop("checked") == true) {
                                    $(this).removeAttr("checked");
                                    $(this).next().remove();
                                }
                            });
                        }
                    });

                $(this)
                    .append(chkbox);
            });
        },

        $.fn.popUp = function(options) {
            var defaults = {
                top: 100,
                title: '',
                content: '',
                divdialog: 'bb-dialog',
                contentId: null,
                showClose: true,
                closeButton: null,
                clickShowEnable: true,
                overlay: true
            };
            var opts = $.extend(defaults, options);
            var overlay;
            if ($(".bb-overlay").size() == 0)
                overlay = $("<div class='bb-overlay'></div>").css({
                    "position": "fixed",
                    "left": "0",
                    "top": "0",
                    "width": "100%",
                    "height": "100%",
                    "background": "#000",
                    "opacity": "0.5",
                    "display": "none",
                    "z-index": "999999"
                }).appendTo("body");
            else overlay = $(".bb-overlay");

            var dlg, dlgHol;

            if ($("." + opts.divdialog).size() == 0) {
                dlg = $("<div class='" + opts.divdialog + "'></div>").css("display", "none").appendTo("body");
                dlgHol = $("<div class='bb-hol'></div>").appendTo(dlg);
            } else {
                dlg = $("." + opts.divdialog);
                dlgHol = $(".bb-hol", dlg);
            }

            var dlgW;


            var show_dlg = function() {
                $("h3.bb-title", dlg).remove();
                dlgHol.empty();
                if (opts.title != '') dlg.prepend($("<h3 class='bb-title'></h3>").html("<span class='icon-dialog'></span>" + opts.title));
                if (opts.contentId != null) {
                    dlgHol.append($("#" + opts.contentId).css("display", "block"));
                    dlgW = $("#" + opts.contentId).outerWidth();
                } else if (opts.content != '') {
                    dlgHol.append(opts.content);
                    dlgW = dlg.outerWidth();
                }

                if (opts.showClose) {
                    if (opts.closeButton == null) $(".modal_close", dlg).remove();
                    var closeBtn = opts.closeButton != null ? $(opts.closeButton) : $("<a href='javascript:void()' class='modal_close' ></a>").appendTo(dlg);
                    $(closeBtn).click(function() {
                        close();
                    });
                }

                overlay.show();
                dlg
                    .css({
                        "z-index": "99999999",
                        "position": "fixed",
                        "left": "35%",
                        "top": opts.top + "px",
                        "background-color": "#fff",
                        "border": "1px",
                        "border-color": "#000",
                        "padding": "10px"
                    })
                    .fadeIn();
            };
            this.showDlg = function() {
                show_dlg();
            };

            var close = function() {
                if (opts.overlay) {
                    overlay
                        .fadeOut("slow");
                }
                dlg
                    .fadeOut("slow", function() {
                        if (opts.contentId != null) $("#" + opts.contentId, dlg).css("display", "none").appendTo("body");
                    });


            };

            this.closeDlg = function() {
                close();
            };

            var changeContent = function(html) {
                opts.content = html;
            };
            this.changeContent = function(html) {
                changeContent(html);
            };

            return this.each(function() {
                var self = $(this);
                self.click(function() {
                    if (opts.clickShowEnable) show_dlg();
                });
            });
        },

        $.fn.imgAjaxLoad = function(options) {
            var defaults = {
                tempImg: '/Images/frontend/base/blank.png'
            };
            var opts = $.extend(defaults, options);
            return this.each(function() {
                var self = $(this);
                self
                    .attr("src", opts.tempImg)
                    .one("load", function() {
                        $(this).attr("src", $(this).attr("orgurl"));
                    });
            });
        },

        $.fn.bbLoading = function(options) {
            var defaults = {
                width: 30,
                height: 30,
                opacity: 0.0,
                iconsize: 'large'
            };
            var opts = $.extend(defaults, options);

            return this.each(function() {
                var self = $(this);
                if (options == 'stop') {
                    self.find("div.loading-overlay").remove();
                    self.find("i[data=loading]").remove();
                    self.css("position", "");
                    return;
                }
                var h = self.height();
                if (h <= 80) h = 80;
                var x = (self.width() - opts.width) / 2;
                var y = (h - opts.height) / 2;
                self.css("position", "relative")
                var bb_overlay = $("<div class='loading-overlay'></div>")
                    .css({
                        "position": "absolute",
                        "left": "0",
                        "top": "0",
                        "width": self.width() + "px",
                        "height": h + "px",
                        "zIndex": "10000",
                        "background": "#000",
                        "opacity": opts.opacity,
                        "paddingLeft": x + "px",
                        "paddingTop": y + "px"
                    });
                var loading = $("<i data='loading' class='vloader bb-loading'  ></i>")
                    .css({
                        "position": "absolute",
                        "top": y + "px",
                        left: x + "px",
                        "zIndex": "10001"
                    });
                self
                    .append(bb_overlay)
                    .append(loading);
            });
        }
})(jQuery);


var LocalStorageManager = {
    setValue: function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    getValue: function(key) {
        try {
            return JSON.parse(window.localStorage.getItem(key));
        } catch (e) {

        }
    }
};


var pageCurrent = $("#hdPage").val();
var angularMain;
if (pageCurrent == "ShoppingCart" || pageCurrent == "MailBoxIndex" || pageCurrent == "CheckOut") {
    angularMain = angular.module('bookbuy', ['ngRoute', 'countdownTimer', 'ngMaterial', 'afkl.lazyImage']);
} else {
    angularMain = angular.module('bookbuy', ['ngRoute', 'countdownTimer', 'afkl.lazyImage']);
}

angularMain

    .directive('lazyImg', function() {

        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                attrs.$observe('lazyImg', function() {

                    var options = {
                        bind: 'event',
                        delay: 0,
                        effectTime: 200,
                        beforeLoad: function(loadedElement) {

                            // Lazy will call this function, before the image gets loaded
                        },
                        onLoad: function(loadedElement) {
                            // while loading the image, especially on big images, this function will be called
                            console.log("loading");
                        },
                        afterLoad: function(loadedElement) {
                            // this will be called after the image is finally loaded
                            registerImage(loadedElement);
                        },
                        onError: function(loadedElement) {
                            // is fired when http request != 200
                            lazyError(loadedElement);
                        }
                    };

                    if (scope.lazyOptions != undefined) {
                        angular.extend(scope.lazyOptions, options);
                    }



                    var registerImage = function(loadedElement) {
                        // Firing the event upwards.
                        scope.$emit('ImgLazyLoaded', loadedElement);
                        element.attr("loaded", "true");
                    };

                    var lazyError = function(loadedElement) {
                        // Firing the event upwards.
                        scope.$emit('ImgNotLazyLoaded', [loadedElement, loadedElement.attr("data-src")]);
                    };

                    element.lazy(options);

                })

            }
        };
    })
    .directive('productSlide', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var paras = scope.$eval(attrs.productSlide);

                var wt = scope.$watch(attrs.valueToWatch, function(newValue, oldValue) {
                    if (newValue) {

                        var casl = $(element).data("tcl");
                        if (typeof casl !== 'undefined') casl.stop();
                        //  $(element).tinycarousel(paras);
                        if (typeof casl !== 'undefined') casl.start();
                        else {
                            var casl = $(element).data("tcl");
                            casl.start();
                        }
                    }
                })

            }
        }
    })
    .directive('tooltip', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                if (attrs.tooltip) {
                    $(element).tooltip(scope.$eval(attrs.tooltip));
                } else {
                    attrs.$observe('title', function(val) {
                        if (val != '' && !/{{.*?}}/.test(val)) {
                            $(element).tooltip({
                                container: 'body'
                            });
                        }
                    });
                }

            }
        }
    })
    .directive('fadeSlide', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var wt = scope.$watch(function() {
                    return parseInt(attrs.items) > 0 && parseInt(attrs.items) == $("li", element).size() && $.grep($("li", element), function(n, i) {
                        return !/{{.*?}}/.test($(n).attr("title"));
                    }).length == parseInt(attrs.items);
                }, function(newValue) {
                    if (newValue) {
                        wt();
                        $(element).fadeSlide({
                            navTitle: true
                        });
                    }

                })


            }
        }
    })
    .directive('moveSlide', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var wt = scope.$watch(function() {
                    return parseInt(attrs.items) > 0 && parseInt(attrs.items) == $("li", element).size() && $.grep($("li", element), function(n, i) {
                        return !/{{.*?}}/.test($(n).attr("title"));
                    }).length == parseInt(attrs.items);
                }, function(newValue) {
                    if (newValue) {
                        wt();
                        $(element).moveSlide(scope.$eval(attrs.moveSlide));
                    }

                })


            }
        }
    })
    .directive("owlCarousel", function() {
        return {
            restrict: 'E',
            transclude: false,
            link: function(scope) {
                scope.initCarousel = function(element) {
                    var defaultOptions = {};
                    if (typeof $(element).data('owlCarousel') != 'undefined') {
                        $(element).data('owlCarousel').destroy();
                        $(element).removeClass('owl-carousel');

                    }
                    var customOptions = scope.$eval($(element).attr('data-options'));
                    // combine the two options objects
                    for (var key in customOptions) {
                        defaultOptions[key] = customOptions[key];
                    }
                    // init carousel 
                    $(element).owlCarousel(defaultOptions);
                    $(".viewport-new .owl-prev").empty().append("<i class='fa fa-3x fa-chevron-left'></i>");
                    $(".viewport-new .owl-next").empty().append("<i class='fa fa-3x fa-chevron-right'></i>");
                };
            }
        };
    })
    .directive('owlCarouselItem', [function() {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope, element) {
                $(element.parents('data-owl-carousel').find(".owl-wrapper-outer")).remove();
                // wait for the last item in the ng-repeat then call init
                if (scope.$last) {
                    scope.initCarousel(element.parent());
                }
            }
        };
    }])
    .directive('ngScrollHot', function($window, $document) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                $("#viewmore-btn-hot").click(function() {
                    handlerhot();
                })
                var handlerhot = function() {

                    scope.$apply(attrs.ngScrollHot);
                    if (!scope.endListHot) {
                        promotion_hot.masonry.packery("layout");
                        $(element)
                        var i = $(element).find("[data-pagehot='" + scope.pagehot + "']");
                        promotion_hot.append(i);
                        productItem.init();
                    }

                };
            }
        }
    })
    .directive('ngScrollNew', function($window, $document) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                $("#viewmore-btn-new").click(function() {
                    handlernew();
                })
                var handlernew = function() {

                    scope.$apply(attrs.ngScrollNew);
                    if (!scope.endListNew) {
                        promotion_new.masonry.packery("layout");
                        $(element)
                        var i = $(element).find("[data-pagenew='" + scope.pagenew + "']");
                        promotion_new.append(i);
                        productItem.init();
                    }

                };
            }
        }
    })
    .directive('ngScrollComming', function($window, $document) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $("#viewmore-btn-comming").click(function() {
                    handlercomming();
                })
                var handlercomming = function() {

                    scope.$apply(attrs.ngScrollComming);
                    if (!scope.endListComming) {
                        promotion_comming.masonry.packery("layout");
                        $(element)
                        var i = $(element).find("[data-pagecomming='" + scope.pagecomming + "']");
                        promotion_comming.append(i);
                        productItem.init();
                    }

                };
            }
        }
    })
    .directive('ngScrollDisabled', function($window, $document) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                $("#viewmore-btn-disabled").click(function() {
                    handlerdisabled();
                })
                var handlerdisabled = function() {

                    scope.$apply(attrs.ngScrollDisabled);
                    if (!scope.endListDisabled) {
                        promotion_disabled.masonry.packery("layout");
                        $(element)
                        var i = $(element).find("[data-pagedisabled='" + scope.pagedisabled + "']");
                        promotion_disabled.append(i);
                        productItem.init();
                    }

                };
            }
        }
    })
    .factory('webContentFac', ['$http', function($http) {
        return {
            getListCategoriesByPages: function(search) {
                search.Language = "vietnam";
                var req = {
                    method: 'POST',
                    async: false,
                    url: "/api/WebContent/getListCategoriesByPages",
                    data: JSON.stringify(search),
                    contentType: "application/json; charset=utf-8"
                }
                return $http(req);
            },
            getListContents: function(search) {
                search.Language = "vietnam";
                var req = {
                    method: 'POST',
                    async: false,
                    url: "/api/WebContent/getListContents",
                    data: JSON.stringify(search),
                    contentType: "application/json; charset=utf-8"
                }
                return $http(req);
            },
            getShoppingCartCount: function() {

                var req = {
                    method: 'GET',
                    async: false,
                    url: "/api/WebContent/getShoppingCartCount",
                    contentType: "application/json; charset=utf-8"
                }
                return $http(req);
            }

        }
    }])
    .factory('promotionFac', ['$http', function($http) {
        return {
            prosHot: function(page) {
                return $http.get('/api/PromotionApi/Get?type=1&pageindex={0}&pagesize={1}&fieldwithorder={2}'.format(page, 1, "CREATED DESC"));
            },
            prosNew: function(page) {
                return $http.get('/api/PromotionApi/Get?isnew={3}&pageindex={0}&pagesize={1}&fieldwithorder={2}'.format(page, 100, "CREATED DESC", "True"));
            },
            prosComming: function(page) {
                return $http.get('/api/PromotionApi/Get?iscomming={3}&pageindex={0}&pagesize={1}&fieldwithorder={2}'.format(page, 100, "CREATED DESC", "True"));
            },
            prosDisabled: function(page) {
                return $http.get('/api/PromotionApi/Get?isdisabled={3}&pageindex={0}&pagesize={1}&fieldwithorder={2}'.format(page, 100, "CREATED DESC", "True"));
            },
        }
    }])
    .factory('categoryFac', ['$http', function($http) {
        return {
            userMenuByMaincat: function(maincat) {
                return $http.get('/api/CategoryApi/UserMenuByMaincat/' + maincat);
            },
            userMenuForProductCategory: function(cat) {
                return $http.get('/api/CategoryApi/UserMenuForProductCategory/' + cat);
            },
            makerMenuForProductCategory: function(obj) {
                return $http.post('/api/CategoryApi/MakerMenuForProductCategory', obj);
            },
            priceMenuForProductCategory: function(obj) {
                return $http.post('/api/CategoryApi/PriceMenuForProductCategory', obj);
            },
            CollectionForBookCategory: function(obj) {
                return $http.post('/api/CategoryApi/CollectionForBookCategory', obj);
            },
        }
    }])
    .factory('mailboxFac', ['$http', function($http) {
        return {

            mailboxGetDetail: function(id) {
                return $http.get('/api/MailBoxApi/GetDetailByID/' + id);
            },
            mailboxMarkIsRead: function(ids) {
                return $http.post('/api/MailBoxApi/MarkIsRead/', ids);
            },
            mailboxMarkUnRead: function(ids) {
                return $http.post('/api/MailBoxApi/MarkUnRead/', ids);
            },
            mailboxDelete: function(ids) {
                return $http.post('/api/MailBoxApi/DeleteMail/', ids);
            }

        }
    }])
    .factory('productFac', ['$http', function($http) {
        return {
            productCollectionsByProductID: function(id) {
                return $http.get('/api/Product/ProductCollectionsByProductID/' + id);
            },
            productSameCatByProductID: function(id, cat) {
                return $http.post('/api/Product/ProductSameCatByProductID/', {
                    ID: id,
                    Cat: cat
                });
            },
            productInterestByCat: function(id) {
                return $http.get('/api/Product/ProductInterestByCat/' + id);
            },
            productFavoriteByCat: function(id) {
                return $http.get('/api/Product/ProductFavoriteByCat/' + id);
            },
            bookSameAuthorByProductID: function(id) {
                return $http.get('/api/Product/BookSameAuthorByProductID/' + id);
            },
            productMostBuyByMainCat: function(id, page, pagesize, isoutoff) {
                return $http.get('/api/Product/ProductMostBuyByMainCat/{0}/{1}/{2}?isOutoff={3}'.format(id, page, pagesize, isoutoff));
            },
            bookTopicsHomePage: function(id) {
                return $http.get('/api/Product/BookTopicsHomePage');
            },
            productNewByMainCat: function(id, page, pagesize) {
                return $http.get('/api/Product/ProductNewByMainCat/{0}/{1}/{2}'.format(id, page, pagesize));
            },
            productCommingByMainCat: function(id, page, pagesize) {
                return $http.get('/api/Product/ProductCommingByMainCat/{0}/{1}/{2}'.format(id, page, pagesize));
            },

            productDiscountByMainCat: function(id) {
                return $http.get('/api/Product/ProductDiscountByMainCat/' + id);
            },
            productByVCat: function(id, page, pagesize, isoutoff) {
                return $http.get('/api/Product/ProductByVCat/{0}/{1}/{2}?isOutoff={3}'.format(id, page, pagesize, isoutoff != undefined ? isoutoff : null));
            },
            productViewed: function(page, pagesize) {
                return $http.get('/api/Product/ProductViewed/{0}/{1}'.format(page, pagesize));
            },
            productDetail: function(id) {
                return $http.get('/api/Product/ProductDetail/' + id);
            },
            productsSuggestByShoppingCartId: function(id) {
                return $http.get('/api/Product/ProductsSuggestByShoppingCartID/' + id);
            },
            searchProduct: function(searchObj) {
                return $http.post('/api/Product/SearchProduct/', searchObj);
            },
            searchProductMicrosite: function(searchObj) {
                return $http.post('/api/Product/SearchProductForMicrosite/', searchObj);
            },
            searchProductSevenGoldDay: function(id) {
                return $http.get('/api/Product/SearchProductForSevenGoldDay/' + id);
            },
            SearchProductByKey: function(key, cat, page, isexactly) {
                return $http.get('/api/Product/SearchProductByKey?key={0}&cat={1}&page={2}&isexactly={3}'.format(key, cat, page, isexactly));
            },
            productByCat: function(id, page, pagesize, isoutoff) {
                return $http.get('/api/Product/ProductByCat/{0}/{1}/{2}?isOutoff={3}'.format(id, page, pagesize, isoutoff));
            },
            productByCatDetail: function(id, page, pagesize, isoutoff) {
                return $http.get('/api/Product/ProductListDetailByCat/{0}/{1}/{2}?isOutoff={3}'.format(id, page, pagesize, isoutoff));
            }
        }
    }])
    .factory('shoppingcartFac', ['$http', function($http) {
        return {
            cartDetail: function(obj) {
                return $http.post('/api/Cart/CartDetailAndPromotionDiscount/', obj);
            },
            deleteCartByID: function(obj) {
                return $http.post('/api/Cart/DeleteCartByID/', obj);
            },
            updateCart: function(obj) {
                return $http.post('/api/Cart/UpdateCart/', obj);
            },
            doCheckout: function(obj) {
                return $http.post('/api/Cart/DoCheckout/', obj);
            },
            listBookGift: function() {
                return $http.get('/api/Cart/ListBookGift');
            },
            updatePayment: function(obj) {
                return $http.post('/api/Cart/UpdatePayment/', obj);
            },
            addManuals: function(productid) {
                return $http.get('/api/Cart/AddManuals/' + productid);
            },
            deleteCartAll: function(obj) {
                return $http.post('/api/Cart/DeleteCartAll/', obj);
            },
            cartDetailByOrder: function(orderId) {
                return $http.get('/api/Cart/CartDetailAndInvoice/' + orderId);
            },
            getInstallmentInfo: function(amount) {
                var url = "/api/Cart/getInstallmentInfo?amount=" + amount;
                return $http.get(url);
            },
            getOrderRequest: function(param) {
                var url = "/api/Cart/sendOrderToAlepay";
                var req = {
                    method: 'POST',
                    async: false,
                    crossDomain: true,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: url,
                    data: $.param(param)
                }
                return $http(req);
            },
        }
    }])
    .factory('discountFac', ['$http', function($http) {
        return {
            discountByCode: function(userid, shoppingcartid, code) {
                return $http.post('/api/Discount/DiscountByCode/', {
                    UserId: userid,
                    ShoppingCartID: shoppingcartid,
                    Code: code
                });
            },

        }
    }])

    .factory('memberFac', ['$http', function($http) {
        return {
            loginForCheckout: function(name, pass, shoppingcartid) {
                shoppingcartid
                return $http.post('/api/AccountApi/LoginForCheckout/', {
                    'UserName': name,
                    'Password': pass,
                    'ShoppingCartID': shoppingcartid
                });
            },
            refreshUserId: function() {
                return $http.get('/api/AccountApi/RefreshUserID');
            },
            userDetail: function(userid) {
                return $http.get('/api/AccountApi/UserDetail/' + userid);
            }

        }
    }])
    .factory('albumFac', ['$http', function($http) {
        return {
            albumDetailByID: function(id) {
                return $http.get('/api/Album/AlbumDetailByID/' + id);
            },

        }
    }])
    .factory('bannerFac', ['$http', function($http) {
        return {
            bannersByGroupID: function(id) {
                return $http.get('/api/Banner/BannersByGroupID/' + id);
            },
            bannersForHP: function() {
                return $http.get('/api/Banner/BannersForHP');
            },

        }
    }])
    .factory('locationFac', ['$http', function($http) {
        return {
            allCountries: function() {
                return $http.get('/api/Location/allCountries/');
            },
            citiesByCountryID: function(id) {
                return $http.get('/api/Location/CitiesByCountryID/' + id);
            },
            wardsByCityID: function(id) {
                return $http.get('/api/Location/WardsByCityID/' + id);
            },
            villagesByWardID: function(id) {
                return $http.get('/api/Location/VillagesByWardID/' + id);
            },
        }

    }])
    .factory('addressFac', ['$http', function($http) {
        return {
            deleteAddressByID: function(id) {
                return $http.delete('/api/Address/DeleteAddressByID/' + id);
            },
            deleteUserAddressByID: function(id) {
                return $http.delete('/api/Address/DeleteUserAddressByID/' + id);
            },
            updateUserAddress: function(obj) {
                return $http.post('/api/Address/UpdateUserAddress/', obj);

            },
        }

    }])
    .factory('feeFac', ['$http', function($http) {
        return {
            calculateFee: function(info) {
                return $http.post('/api/Fee/CalculateFee/', info);
            },

        }
    }])