/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';

angular.module("ShoppingListEventApp", [])

.controller("ShoppingListController", ShoppingListController)
.factory("ShopListFactory", ShoppingListFactory)
.service("WeightLossFilterService", WeightLossFilterService)
.component("shoppingList", {
    templateUrl: 'shoppinglist.template.html',
    controller: ShoppingListComponentController,
    // we won't define the "controller as", because angular will create an $ctrl scope automatically for us
    //define inputs and outputs with bindings
    bindings:{
        items: '<', // one-way binding object
        myTitle: '@title', //DOM atribute value
        onRemove: '&'
    }
})
.component("loadingSpinner",{
    templateUrl: 'loadingspinner.template.html',
    controller: SpinnerController
});

    // Component's Controller
    SpinnerController.$inject = ['$rootScope'];
    function SpinnerController($rootScope) {
        var $ctrl = this;

        // the $on function returns a deregistration function - associate to a variable
        var cancelListener = $rootScope.$on('shoppinglist:processing', function (event, data) {

            console.log("Event: ", event);
            console.log("data: ", data);

            if(data.on){
                $ctrl.showSpinner = true;
            }else{
                $ctrl.showSpinner = false;
            }

        });

        // when it detroys the eventListener
        $ctrl.$onDestroy = function () {
            cancelListener();
        }
    };





    //List 1 - Controller
    ShoppingListController.$inject = ["ShopListFactory"]; //inject the factory in the controller
    function ShoppingListController(ShoppingListFactory) {
        var list = this;
        var origTitle = "Shopping List #1";

        //User factory to create a new Shopping List Service
        var shoppingList = ShoppingListFactory();

        list.items = shoppingList.getItems();

        list.title = origTitle + " (" + list.items.length + " items )";

        list.warning = "COOKIES DETECTED";

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function () {
            shoppingList.addItem(list.itemName, list.itemQuantity);
            list.title = origTitle + " (" + list.items.length + " items )";
        }

        list.removeItem = function (itemIndex) {
            console.log("´this´ is: ", this);
            this.lastRemoved = "Last item removed was: " + this.items[itemIndex].name;
            shoppingList.removeItem(itemIndex);
            this.title = origTitle + " (" + list.items.length + " items )";
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



    WeightLossFilterService.$inject = ['$q', '$timeout'];
    function WeightLossFilterService($q, $timeout) {
        var service = this;

        service.checkName = function (name) {
            var deferred = $q.defer();

            var result = {
                message: ""
            };

            $timeout(function () {
                // Check for cookies
                if (name.toLowerCase().indexOf('cookie') === -1) {
                    deferred.resolve(result)
                }
                else {
                    result.message = "Stay away from cookies, Yaakov!";
                    deferred.reject(result);
                }
            }, 3000);

            return deferred.promise;
        };


        service.checkQuantity = function (quantity) {
            var deferred = $q.defer();
            var result = {
                message: ""
            };

            $timeout(function () {
                // Check for too many boxes
                if (quantity < 6) {
                    deferred.resolve(result);
                }
                else {
                    result.message = "That's too much, Yaakov!";
                    deferred.reject(result);
                }
            }, 1000);

            return deferred.promise;
        };
    }

})();
