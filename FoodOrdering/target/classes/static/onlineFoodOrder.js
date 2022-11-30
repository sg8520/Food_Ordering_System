var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    const userId = localStorage.getItem("userId");
    $scope.userName = localStorage.getItem("userName");
    var URL = "https://fir-1c7de-default-rtdb.firebaseio.com";
    $scope.orderDetails = {};
    // $scope.foodMenuList = [{
    //     "imgUrl": "./img/tacos.jfif",
    //     "title": "Veg Crunchy Volcano",
    //     "description": "A crunchy volcano shell filled with beans & veg mix, chef's secret sauce, fresh onion & crisp lettuce.",
    //     "price": "15"
    // }, {
    //     "imgUrl": "./img/tikiburger.jfif",
    //     "title": "Tikki Twist Burger",
    //     "description": "Our new signature burger with spicy sauce, juicy tomato(seasonal), mix veg patty & a crunchy twist!",
    //     "price": "50"
    // }, {
    //     "imgUrl": "./img/cupCake.jfif",
    //     "title": "Chocolate Mousse Cup",
    //     "description": "Airy and creamy chocolate mousse topped with chocolate ganache and choco chips",
    //     "price": "20"
    // }, {
    //     "imgUrl": "./img/CreamyTomatoVeg.jpg",
    //     "title": "Creamy Tomato Pasta Veg",
    //     "description": "Instant Fusilli Pasta, Creamy Culinary Dressing, Onion, Olive, Green Capsicum, Parsley sprinkle",
    //     "price": "30"
    // }, {
    //     "imgUrl": "./img/MoroccanPastaVeg.jpg",
    //     "title": "Moroccan Spice Pasta Veg",
    //     "description": "Instant Fusilli Pasta, Harissa Sauce, Onion, Mushroom, Olives, Parsley sprinkle",
    //     "price": "35"
    // }, {
    //     "imgUrl": "./img/JalapenoVeg.jpg",
    //     "title": "Cheesy Jalapeno Pasta Veg",
    //     "description": "Instant Fusilli Pasta, Cheesy Jalapeno Sauce, Onion, Jalapeno, Parsley sprinkle",
    //     "price": "40"
    // }, {
    //     "imgUrl": "./img/PeppyChickenNuggets.jpg",
    //     "title": "Peppy Chicken Nuggets",
    //     "description": "Oven baked soft tender boneless nuggets sprinkled with peri peri seasoning",
    //     "price": "20"
    // }, {
    //     "imgUrl": "./img/MoroccanSpiceChickenChunks.jpg",
    //     "title": "Moroccan Spice Chicken Chunks",
    //     "description": "Soft juicy chicken pieces coated with spicy harissa sauce and sprinkled with basil parsley",
    //     "price": "25"
    // }, {
    //     "imgUrl": "./img/CheesyMeatballs.jpg",
    //     "title": "Cheesy Meatballs",
    //     "description": "Cheesy delicious chicken meatballs coated with a layer of spicy tangy sauces and exotic toppings",
    //     "price": "30"
    // }, {
    //     "imgUrl": "./img/veg_extravaganza.webp",
    //     "title": "Double Cheese Margherita",
    //     "description": "A classic delight loaded with extra 100% real mozzarella cheese",
    //     "price": "50"
    // }, {
    //     "imgUrl": "./img/IndianTandooriPaneer.webp",
    //     "title": "Indi Tandoori Paneer",
    //     "description": "It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum, red paprika & mint mayo",
    //     "price": "30"
    // }, {
    //     "imgUrl": "./img/margherita.webp",
    //     "title": "Margherita",
    //     "description": "Classic delight with 100% real mozzarella cheese",
    //     "price": "20"
    // }, {
    //     "imgUrl": "./img/Choco_Lava.webp",
    //     "title": "Choco Lava Cake",
    //     "description": "Chocolate lovers delight! Indulgent, gooey molten lava inside chocolate cake",
    //     "price": "10"
    // }, {
    //     "imgUrl": "./img/Butterscotch.webp",
    //     "title": "Butterscotch Mousse Cake",
    //     "description": "Sweet temptation! Butterscotch flavored mousse",
    //     "price": "10"
    // }, {
    //     "imgUrl": "./img/Brownie_Fantasy.webp",
    //     "title": "Brownie Fantasy",
    //     "description": "Sweet Temptation! Hot Chocolate Brownie drizzled with chocolate fudge sauce",
    //     "price": "6"
    // }, {
    //     "imgUrl": "./img/pepsi.jfif",
    //     "title": "Pepsi King",
    //     "description": "Pepsi",
    //     "price": "10"
    // }, {
    //     "imgUrl": "./img/iceTea.jpg",
    //     "title": "Lipton Ice Tea",
    //     "description": "Ice Tea",
    //     "price": "10"
    // }, {
    //     "imgUrl": "./img/pepsiMedium.jfif",
    //     "title": "Pepsi Medium",
    //     "description": "Pepsi",
    //     "price": "6"
    // },];
    $("#orderDivId").show();
    $("#biilingId").hide();
    $("#iteamAddDivId").hide();
    getIteamList();
    $scope.viewOrderTableData = [];
    $scope.placeOrder = function (data) {
        $scope.orderDetails = data;
    }
    $scope.addOrder = function () {
        if ($("#deliveryAddressID").val() == "") {
            alert("Please fill address");
        } else {
            let reqstBody = {
                "price": $scope.orderDetails.price,
                "title": $scope.orderDetails.title,
                "orderDate": new Date().toISOString().split('T')[0],
                "status": "pending",
                "address": $("#deliveryAddressID").val()
            };
            $.ajax({
                type: 'post',
                contentType: "application/json",
                dataType: 'json',
                cache: false,
                url: URL + "/orderFood/" + userId + ".json",
                data: JSON.stringify(reqstBody),
                success: function (response) {
                    $('#placeOrderModalId').modal('hide');
                    $scope.switchMenu("BILLING", "billingTabId");
                    alert("Order placed sucessfully!!!");
                }, error: function (error) {
                    alert("Something went wrong");
                }
            });
        }
    }
    $scope.getOrderTableData = function (type) {
        $scope.viewOrderTableData = [];
        let orderList = [];
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/orderFood/" + userId + ".json",
            success: function (response) {
                for (let i in response) {
                    let eventData = response[i];
                    eventData["orderId"] = i;
                    orderList.push(eventData);
                }
                $scope.viewOrderTableData = orderList.filter(function (obj) {
                    if (type == "BILLING") {
                        return obj.status === "pending";
                    } else {
                        return obj.status != "pending";
                    }
                })
                $scope.$apply();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
    $scope.getOrderData = function (data) {
        $("#ammountId").val(data.price);
        $scope.orderDetails = data;

    }
    $scope.payBill = function () {
        if ($("#paymentModeId").val() == "") {
            alert("Please select payment mode");
        } else {
            let requestBody = {
                "status": $("#paymentModeId").val()
            }
            $.ajax({
                type: 'patch',
                contentType: "application/json",
                dataType: 'json',
                cache: false,
                url: URL + "/orderFood/" + userId + "/" + $scope.orderDetails.orderId + ".json",
                data: JSON.stringify(requestBody),
                success: function (response) {
                    $('#processToPayModalId').modal('hide');
                    $scope.getOrderTableData("BILLING");
                    alert("Payment sucessfully!!!");
                }, error: function (error) {
                    alert("Something went wrong");
                }
            });
        }
    }
    $scope.logout = function () {
        localStorage.removeItem("userId");
        localStorage.removeItem("userData");
        localStorage.clear();
        window.location.href = "loginRegOnlineFoodOrder.html";
    }
    function getIteamList() {
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/iteamNames.json",
            success: function (lresponse) {
                $scope.foodMenuList = [];
                for (let i in lresponse) {
                    let data = lresponse[i];
                    data["foodNameId"] = i;
                    $scope.foodMenuList.push(data);
                }
                $scope.$apply();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
    $scope.addIteam = function () {
        let requestBody = {
            "imgUrl": $scope.foodPic,
            "title": $("#foodNameId").val(),
            "description": $("#descriptionId").val(),
            "price": $("#priceId").val()
        };
        $.ajax({
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/iteamNames.json",
            data: JSON.stringify(requestBody),
            success: function (response) {
                alert("Data added sucessfully!!!");
                clearData();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
    $scope.removeIteam = function (data) {

        $.ajax({
            type: 'delete',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/iteamNames/" + data.foodNameId + ".json",
            success: function (response) {
                alert("Removed successfuly !!!");
                getIteamList();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });

    }

    function clearData() {
        $scope.foodPic = '';
        $("#foodNameId").val('');
        $("#descriptionId").val('');
        $("#priceId").val('');
        $('#foodPicId').next('.custom-file-label').html("Upload iteam photo");
    }
    $scope.switchMenu = function (type, id) {
        $(".menuCls").removeClass("active");
        $('#' + id).addClass("active");
        $("#orderDivId").hide();
        $("#biilingId").hide();
        $("#iteamAddDivId").hide();
        if (type == "MENU") {
            $("#orderDivId").show();
            getIteamList();
        } else if (type == "BILLING") {
            $("#biilingId").show();
            $scope.getOrderTableData("BILLING");
        } else if (type == "HISTORY") {
            $scope.userName == 'ADMIN' ? $scope.getAdminTableData() : $scope.getOrderTableData("HISTORY");
            $("#biilingId").show();

        } else if (type = "ADD_ITEAM") {

            $("#iteamAddDivId").show();
            clearData();
        }
    }
    $scope.getAdminTableData = function () {
        $scope.viewOrderTableData = [];
        let foodList = [];
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/orderFood.json",
            success: function (response) {
                for (let data in response) {
                    for (let x in response[data]) {
                        let eventData = response[data][x];
                        eventData["userId"] = data;
                        eventData["childUserId"] = x;
                        foodList.unshift(eventData);
                    }
                }
                $scope.viewOrderTableData = foodList.filter(function (obj) {
                    return obj.status != "pending";
                })
                $scope.$apply();
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
    $(document).ready(function () {
        $('#foodPicId').on('change', function () {
            debugger;
            var fileReader = new FileReader();
            fileReader.onload = function () {
                $scope.foodPic = fileReader.result;  // data <-- in this var you have the file data in Base64 format
            };
            fileReader.readAsDataURL($('#foodPicId').prop('files')[0]);
            var file = $('#foodPicId')[0].files[0].name;
            $(this).next('.custom-file-label').html(file);
        });
    });
});
