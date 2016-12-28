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

        itemAdder.toBuyList = ShoppingListCheckOffService.getBuyItems();



        itemAdder.addItem = function () {
            ShoppingListCheckOffService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
        };

        itemAdder.removeItem = function (itemIndex) {
            ShoppingListCheckOffService.removeItem(itemIndex);
        };

    }

    //Already Bought Controller
    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]; // inject the service in the controller
    function AlrBoughtCtrl(ShoppingListCheckOffService) {
        var showList = this;

        showList.boughtList = ShoppingListCheckOffService.getBoughtItems();


    }


//function constructor Service
    function ShoppingListCheckOffService(){
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
         that is automatically attached to $scope for us*/
        var service = this;

        // List of items to buy
        var toBuyList = [{name: "Cookies", quantity: 10},
            {name: "Milk", quantity: 1},
            {name: "Soda", quantity: 2},
            {name: "Chips", quantity: 3},
            {name: "Chicken", quantity: 2},
            {name: "Water", quantity: 5}];

        // List of items already bought
        var boughtList = [];

        // service method responsible to add items to Buy List
        service.addItem = function (itemName, itemQuantity) {
            var Buyitem = {
                name: itemName,
                quantity: itemQuantity
            };
            toBuyList.push(Buyitem);
        };

        // service method responsible to remove elements of "To Buy" list and add to "Already Bought" list
        service.removeItem = function (itemIndex) {
            boughtList.push(toBuyList[itemIndex]);
            toBuyList.splice(itemIndex, 1);

        };

        // service method responsible to show all elements of "To Buy" List
        service.getBuyItems = function () {
                return toBuyList;
        };

        // service method responsible to show all elements in "Already Bought" List
        service.getBoughtItems = function () {
            return boughtList;
        };

    }


})();
