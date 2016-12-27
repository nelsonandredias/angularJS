/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';



angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyCtrl)
.controller("AlreadyBoughtController", AlrBoughtCtrl)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    //Buy List Controller
    ToBuyController.$inject = ['ShoppingListCheckOffService']; //inject the service in the controller
    function ToBuyCtrl(ShoppingListCheckOffService) {
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
         that is automatically attached to $scope for us*/
        var itemAdder = this;

        itemAdder.itemName = "";
        itemAdder.itemQuantity = "";

        itemAdder.items = ShoppingListCheckOffService.getBuyItems();

        itemAdder.addItem = function () {
            ShoppingListCheckOffService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
        };
    }

    //Already Bought Controller
    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]; // inject the service in the controller
    function AlrBoughtCtrl(ShoppingListCheckOffService) {
        var showList = this;

        showList.items = ShoppingListCheckOffService.getBoughtItems();

        showList.removeItem = function (itemIndex) {
            ShoppingListCheckOffService.removeItem(itemIndex);
        };
    }


//function constructor Service
    function ShoppingListCheckOffService(){
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
         that is automatically attached to $scope for us*/
        var service = this;

        // List of items to buy
        var toBuyItems = [{name: "Cookies", quantity: 10},
            {name: "Cookies", quantity: 10},
            {name: "Cookies", quantity: 10},
            {name: "Cookies", quantity: 10},
            {name: "Cookies", quantity: 10},
            {name: "Cookies", quantity: 10}];

        var boughtItems = [];

        service.addItem = function (itemName, itemQuantity) { // service method responsible to add elements to Shopping List
            var item = {
                name: itemName,
                quantity: itemQuantity
            };
            toBuyItems.push(item);
        };

        service.removeItem = function (itemIndex) { // service method responsible to remove elements of Shopping List
            var ItemBought = 34;
            boughtItems.splice(ItemBought);
            toBuyItems.splice(itemIndex, 1);
        };

        service.getBuyItems = function () { // service method responsible to show all elements in Shopping List
            return toBuyItems;
        };

        service.getBoughtItems = function () { // service method responsible to show all elements in Shopping List
            return boughtItems;
        };
    }


})();
