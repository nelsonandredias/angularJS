/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';

angular.module("ShoppingListApp", [])

.controller("ShoppingListAddController", ShoppingListAddCtrl)
.controller("ShoppingListShowController", ShoppingListShowCtrl)
.service("ShoppingListService", ShoppingListService);

    ShoppingListAddController.$inject = ["ShoppingListService"]; //inject the service in the controller
    function ShoppingListAddCtrl(ShoppingListService) {
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
         that is automatically attached to $scope for us*/
        var itemAdder = this;

        itemAdder.itemName = "";
        itemAdder.itemQuantity = "";

        itemAdder.addItem = function () {
            ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
        }
    }

    ShoppingListShowController.$inject = ["ShoppingListService"]; // inject the service in the controller
    function ShoppingListShowCtrl(ShoppingListService) {
        var showList = this;

        showList.items = ShoppingListService.getItems();

        showList.removeItem = function (itemIndex) {
          ShoppingListService.removeItem(itemIndex);
        };
    }

    //function constructor Service
    function ShoppingListService(){
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
        that is automatically attached to $scope for us*/
        var service = this;

        var items = []; // List of shopping items

        service.addItem = function (itemName, itemQuantity) { // service method responsible to add elements to Shopping List
          var item = {
            name: itemName,
            quantity: itemQuantity
          };
          items.push(item);
        };

        service.removeItem = function (itemIndex) { // service method responsible to remove elements of Shopping List
            items.splice(itemIndex, 1);
        };

        service.getItems = function () { // service method responsible to show all elements in Shopping List
            return items;
        };
    }





})();
