$(function() {

    $("form#ShoppingCartForm").append("<input type='hidden' id='FunctionType' name='FunctionType' />");
    $("form#ShoppingCartForm").append("<input type='hidden' id='SingleID' name='SingleID' />");
    //$("#rounded-corner tbody tr td:first-child").InsertCheck1();
    //$("#rounded-corner th.rounded-company").InsertCheckAll();





    //$("#btnDeleteAll").BindDeleteAll();
    $(".box-del-product").click(function() {
        if (confirm("Xoá sản phẩm này ?")) {
            $("#SingleID")
                .val($(this)
                    .parent().parent()
                    .find("td:first-child input[type='hidden']:first-child")
                    .val()
                );
            $("#FunctionType").val("SingleDelete");
            $("form#ShoppingCartForm").submit();
        }
    });

    $(".add-fav-btn").on("click", function() {
        AddToFavBegin();
        $.ajax({
            type: "POST",
            url: '/BookBuy/AddToFavorite',
            contentType: "application/json; charset=utf-8",
            async: true,
            data: "{productid:'" + $(this).prev().val() + "'}",
            success: function(data) {
                AddToFavSuccess(data);
            },
            error: function(err) {
                debugger
            }

        })
    });

    //$("#btnUpdateAll").click(function () {
    //    if ($("#ShoppingCartForm").valid()) {
    //        $("#FunctionType").val("UpdateAll");
    //        $("#ShoppingCartForm").submit();
    //    }
    //});

    $("#btnDeleteAll").click(function() {
        if ($("input[name='ProductIDsSelected']").val() == undefined)
            return false;
        if ($("#ShoppingCartForm").valid()) {
            $("#FunctionType").val("MultipleDelete");
            $("#ShoppingCartForm").submit();
        }
    });

    //jQuery.validator.addMethod("qty", function (value, element) {
    //    return !isNaN(value) && parseInt(value) >= 0 && parseInt(value)<=100;
    //}, '*');


});

function UpdateCartSuccess(response) {
    //$(".cart-detail").bbLoading('stop');
    var scope = angular.element(".shopping-cart").scope();
    scope.$apply(function() {
        if (response.ShoppingCartDetails == undefined || scope.ShoppingCartDetails.length != response.ShoppingCartDetails.length) {
            location.reload();
            //    if (response.ShoppingCartDetails.length > scope.ShoppingCartDetails.length)
            //        location.reload();
            //    var shopcartIds = response.ShoppingCartDetails.map(function (obj) {
            //        return obj.ID + '';
            //        });
            //    $(".item-cart").each(function () { 
            //        if (shopcartIds.indexOf($(this).attr("data-id")) == -1) { 
            //        $(this).remove();
            //    }
            //});  
        }
        scope.ShoppingCartDetails = response.ShoppingCartDetails;

        scope.ShoppingTotal = response.ShoppingTotal
    });

}

function UpdateCartBegin(response) {
    //$(".cart-detail").bbLoading({ opacity: 0.2 });
}

function clearFuntionType() {
    $("#FunctionType").val('');
}


angular
    .module('bookbuy')
    .controller('shoppingcart.ctrl', ['$scope', 'productFac', '$timeout', function($scope, productFac, $timeout) {
        $(".suggest-loading").bbLoading();

        $scope.data = {};
        $scope.data.CheckboxSelected = {};
        $scope.data.checkAll = false;
        $scope.ShoppingCartDetails = [];
        $scope.ShoppingTotal = {};
        $scope.CartItemTotal = 0;

        $scope.isEmpty = function(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        };
        $timeout(function() {
            $scope.flagInvalid = $.grep($scope.ShoppingCartDetails, function(n, i) {
                return n.QuantityInvalidStr != null && n.QuantityInvalidStr != '';
            }).length > 0 ? true : false;
        });

        ////$("#checkAll").on("click", function () {
        ////    console.log($scope.data.checkAll);

        ////});
        $scope.$watch(function() {
            return $scope.data.checkAll;
        }, function(newValue, oldValue) {
            if (newValue == oldValue)
                return;
            if ($scope.data.checkAll == true) {
                $("#rounded-corner tr td:first-child .item-cb").each(function() {
                    if (!$(this).hasClass("md-checked")) {
                        // $(this).prop("checked", true);
                        $scope.data.CheckboxSelected[$(this).attr("index")] = true;
                        $("<input type='hidden' name='ProductIDsSelected' />")
                            .val($(this).attr("index"))
                            .appendTo($(this).parent());
                    }
                });
            } else {
                $("#rounded-corner tr td:first-child .item-cb").each(function() {
                    if ($(this).hasClass("md-checked")) {
                        $scope.data.CheckboxSelected[$(this).attr("index")] = false;
                        $(this).next().remove();
                    }
                });
            }
        });


        //$scope.$watch(function () {
        //    return $.grep($scope.ShoppingCartDetails, function (n, i) { return n.Quantity; });
        //}, function (newValue, oldValue) {
        //    if (newValue != oldValue) {
        //        if ($("#ShoppingCartForm").valid()) {
        //            $("#FunctionType").val("UpdateAll");
        //            $("#ShoppingCartForm").submit();
        //        }
        //    }

        //})
        //     var delay_timer;
        //     $scope.$watch(function ($scope) {
        //         return $scope.ShoppingCartDetails.
        //             map(function (obj) {
        //                 return { "Quantity": obj.Quantity}
        //             });
        //     }, function (newValue, oldValue) {
        //         if (delay_timer) delay_timer = clearTimeout(delay_timer);
        //         if (newValue != oldValue && newValue.length == oldValue.length) {
        //             delay_timer = setTimeout(function () { 
        //                     $("#FunctionType").val("UpdateAll");
        //                     $("#ShoppingCartForm").submit();

        //             }, 200);
        //         }
        //}, true);
        $scope.updateQuantity = function() {
            $timeout(function() {
                $("#FunctionType").val("UpdateAll");
                $("#ShoppingCartForm").submit();
            }, 100)

        }
        $scope.$watch(function($scope) {
            return $scope.ShoppingCartDetails.map(function(obj) {
                return {
                    "QuantityInvalidStr": obj.QuantityInvalidStr
                }
            });
        }, function(newValue, oldValue) {
            if (newValue != oldValue) {
                var hasError = $.grep(newValue, function(n, i) {
                    return n.QuantityInvalidStr != null && n.QuantityInvalidStr != '';
                }).length;
                if (hasError > 0)
                    $scope.flagInvalid = true;
                else
                    $scope.flagInvalid = false;
            }
        }, true);
        $scope.$watch(function($scope) {
            return $scope.ShoppingCartDetails
        }, function(newValue, oldValue) {
            $scope.CartItemTotal = $scope.ShoppingCartDetails.reduce(function(sum, key) {
                return sum + key.Quantity;
            }, 0);
        }, true);
        //$scope.$watch(function () {
        //    return $(".qty").val();
        //}, function (newValue, oldValue) {
        //    if (newValue != oldValue) {
        //                if ($("#ShoppingCartForm").valid()) {
        //                    $("#FunctionType").val("UpdateAll");
        //                    $("#ShoppingCartForm").submit();
        //                }
        //            }
        //});

        //$("#rounded-corner tr td:first-child  .item-cb").on("click", function () {
        //    var current = $(this);
        //    console.log('after: '+$scope.data.CheckboxSelected[current.attr('index')]);
        //    $scope.$watch(function () {
        //        return $scope.data.CheckboxSelected[current.attr('index')];
        //    }, function (newValue, oldValue) {
        //        console.log('before: '+$scope.data.CheckboxSelected[current.attr('index')]);
        //        if (newValue) {

        //                $("<input type='hidden' name='ProductIDsSelected'/>")
        //                                    .val(current.attr("index"))
        //                                    .appendTo(current.parent());
        //            }
        //            else {

        //                current.next().remove();
        //            }


        //    });
        //});

        $("#rounded-corner tr td:first-child  .item-cb").on("click", function() {
            var current = $(this);
            var temp = $scope.$watch(function() {
                return $scope.data.CheckboxSelected[current.attr('index')];
            }, function(newValue, oldValue) {
                temp();
                if (newValue) {
                    $("<input type='hidden' name='ProductIDsSelected'/>")
                        .val(current.attr("index"))
                        .appendTo(current.parent());
                } else {
                    current.next().remove();
                }


            });


        });

        // $scope.FlagLoading = false;
        //productFac.productsSuggestByShoppingCartId(shoppingcartid).success(function (data) {
        //    $scope.productPath='//bookbuy.vn/Res/Images/Product/'
        //    $scope.suggestProductRights = data.slice(0, 5);
        //    //$scope.suggestProductBottoms = data.slice(5);
        //    $(".suggest-loading").remove();
        //    $scope.FlagLoading = true;

        //})
        //productFac.productViewed(1,10).success(function (data) { 
        //    $scope.ProductViewedBottoms = data;  

        //})
    }])