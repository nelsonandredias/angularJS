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
.provider("ShoppingListService", ShoppingListServiceProvider)
.config(Configuration);

    //Create a custom configuration function for service function
    Configuration.$inject = ['ShoppingListServiceProvider'];
    function Configuration(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.maxItems = 2;
    }

    //List  - Controller
    ShoppingListController.$inject = ["ShoppingListService"]; //inject the service that provider will produce in the controller
    function ShoppingListController(ShoppingListService) {
        var list = this;

       list.items = ShoppingListService.getItems();

        list.itemName = "";
        list.itemQuantity = "";

        //function that add new item to list
        list.addItem = function () {
            try{
                ShoppingListService.addItem(list.itemName, list.itemQuantity);
            } catch(error){
                list.errorMessage = error.message;
            }
        };

        //function that remove item from list
        list.removeItem = function (itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };
    }

    //service function
    function ShoppingListService(maxItems) {
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


    /* We are defining the provider function*/
    function ShoppingListServiceProvider() {
        var provider = this;

        provider.defaults = { //Config object with some defaults
            maxItems: 10
        };

        /*the provider function "ShoppingListServiceProvider" will create a service
        called "ShoppingListService" and return that service */
        provider.$get = function () {

            var shoppingList = new ShoppingListService(provider.defaults.maxItems);

            return shoppingList;
        };

    }


})();
