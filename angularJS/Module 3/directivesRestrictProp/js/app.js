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

.controller("ShoppingListController1", ShoppingListController1)
.controller("ShoppingListController2", ShoppingListController2)
.factory("ShopListFact", ShoppingListFactory)
.directive("listItemDescription", ListItemDescription) //directive to display items and quantities in ng-repeat
.directive("listItem", ListItem); // directive to display ng-repeat

    //factory directive function - to display item description
    function ListItemDescription() {
        var ddo = {
            template: "{{item.quantity}} of {{item.name}}"
        };
        return ddo;
    }

    //factory directive function - to display items
    function ListItem() {
        var ddo = {
            //templateUrl allow us to point to a HTML template or HTML file and place it into my file
            templateUrl: "listItem.html",
            restrict: 'E'
        };
        return ddo;
    }

    //List 1 - Controller
    ShoppingListController1.$inject = ["ShopListFact"]; //inject the factory in the controller
    function ShoppingListController1(ShoppingListFactory) {
        var list1 = this;

        //User factory to create a new Shopping List Service
        var shoppingList = ShoppingListFactory();

        list1.items = shoppingList.getItems();

        list1.itemName = "";
        list1.itemQuantity = "";

        list1.addItem = function () {
            shoppingList.addItem(list1.itemName, list1.itemQuantity);
        }

        list1.removeItem = function (itemIndex) {
            shoppingList.removeItem(itemIndex);
        };
    }

    ShoppingListController2.$inject = ["ShopListFact"]; // inject the factory in the controller
    function ShoppingListController2(ShoppingListFactory) {
        var list2 = this;

        // User factory to create a new Shopping List Service - passing the number max of items 3
        var shoppingList = ShoppingListFactory(3);

        list2.items = shoppingList.getItems();

        list2.itemName = "";
        list2.itemQuantity = "";
        
        list2.addItem = function () {
            try{
                shoppingList.addItem(list2.itemName, list2.itemQuantity);
            }catch (error){
                list2.errorMessage = error.message;
            }
        }

        list2.removeItem = function (itemIndex) {
            shoppingList.removeItem(itemIndex);
        };
        
    }

    //function constructor Service that it will be produced in factory function
    function ShoppingListService(maxItems){
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
        that is automatically attached to $scope for us*/
        var service = this;

        var items = []; // List of shopping items

        service.addItem = function (itemName, itemQuantity) { // service method responsible to add elements to Shopping List

          if((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)){
            var item = {
                name: itemName,
                quantity: itemQuantity
            };
            items.push(item);
          }else{
            throw new Error("Max Items ("+ maxItems +") reached.");
          }

        };

        service.removeItem = function (itemIndex) { // service method responsible to remove elements of Shopping List
            items.splice(itemIndex, 1);
        };

        service.getItems = function () { // service method responsible to show all elements in Shopping List
            return items;
        };
    }

    /*
     We do not want Angular to create the service for us...we want to create the service ourselves*/
    function ShoppingListFactory() {
        var factory = function (maxItems) { // factory function that creates a service "ShoppingListService"
          return new ShoppingListService(maxItems);
        };

        return factory;
    }


})();
