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

.controller("ShoppingListController", ShoppingListController)
.factory("ShopListFactory", ShoppingListFactory)
.directive("shoppingList", ShoppingListDirective); //directive to display items and quantities in ng-repeat

    //factory directive function - to display item description
    function ShoppingListDirective() {
        var ddo = {
            templateUrl: "shoppingList.html",
            scope: {
                    items: "<", // one way-binding because we don't want to change anything about the items
                    title: "@title",
                    badRemove: "=",
                    onRemove: "&"
            },
            controller: ShoppingListDirectiveController,
            bindToController: true, // tell angular we want to bind all of the scope variables to our controller
            controllerAs: "list", // label used inside shoppingList.html
        };
        return ddo;
    }

    // Directive Controller
    function ShoppingListDirectiveController(){
        var list = this;

        //if there is a cookie in the shooping list, display a warning
        // this functionality is just inside of our controller
        list.cookiesInList = function(){
            for (var i=0; i < list.items.length; i++){
                var name = list.items[i].name;
                if(name.toLowerCase().indexOf("cookie") !== -1){
                    return true;
                }
            }

            return false;
        };

    }


    //List 1 - Controller
    ShoppingListController.$inject = ["ShopListFactory"]; //inject the factory in the controller
    function ShoppingListController(ShoppingListFactory) {
        var list1 = this;
        var origTitle = "Shopping List #1";

        //User factory to create a new Shopping List Service
        var shoppingList = ShoppingListFactory();

        list1.items = shoppingList.getItems();

        list1.itemName = "";
        list1.itemQuantity = "";

        list1.addItem = function () {
            shoppingList.addItem(list1.itemName, list1.itemQuantity);
            list1.title = origTitle + " (" + list1.items.length + " items )";
        }

        list1.removeItem = function (itemIndex) {
            console.log("´this´ is: ", this);
            this.lastRemoved = "Last item removed was: " + this.items[itemIndex].name;
            shoppingList.removeItem(itemIndex);
            this.title = origTitle + " (" + list1.items.length + " items )";
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
