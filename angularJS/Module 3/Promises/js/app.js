/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';

angular.module("ShoppingListPromiseApp", [])

.controller("ShoppingListController", ShoppingListController)
.service("ShoppingListService", ShoppingListService)
.service("WeightLossFilterService", WeightLossFilterService);


    //Shopping List Controller
    ShoppingListController.$inject = ['ShoppingListService']; //inject the service in the controller
    function ShoppingListController(ShoppingListService) {
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
         that is automatically attached to $scope for us*/
        var itemAdder = this;

        itemAdder.itemName = "";
        itemAdder.itemQuantity = "";

        itemAdder.items = ShoppingListService.getItems();



        itemAdder.addItem = function () {
            ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
        };

        itemAdder.removeItem = function (itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };

    }

    //function constructor Service "ShoppingListService"
    ShoppingListService.$inject = ["$q","WeightLossFilterService"]; //inject the other service and service promise
    function ShoppingListService($q, WeightLossFilterService) {
        var service = this;

        //List of shopping items
        var items = [];

        //Messy version - looks like a callback with lots of indentations
        /*service.addItem = function (name, quantity) {

            // addItem method is using async behavior to check the name
            var promise = WeightLossFilterService.checkName(name);

            promise.then(function (response) {

                //before we use the response, check if the quantity is ok through another async behavior
                var nextPromise = WeightLossFilterService.checkQuantity(quantity);

                nextPromise.then(function (result) {

                    //if everything was checked out, create a new item
                    var item = {
                        name: name,
                        quantity: quantity
                    };
                    items.push(item);
                }, function (errorResponse) { // if the nextPromise fails, a error message is displayed
                    console.log(errorResponse.message);
                });
            }, function (errorResponse) { // if the first promise fails, a error message is displayed
                console.log(errorResponse.message);
            });
        };*/

        //Cleaner version - a promise depends on the other
        /*service.addItem = function (name, quantity) {

            // addItem method is using async behavior to check the name
            var promise = WeightLossFilterService.checkName(name);

            /!*when i call the then method on this promise, i don't supply the 2nd function that's supposed to handle an error.
            We don't supply cause if there's an error, it will go ahead and propagate*!/
            promise
            .then(function (response) {

                //before we use the response, check if the quantity is ok through another async behavior
                return WeightLossFilterService.checkQuantity(quantity);
            })
            .then(function (response) {

                var item = {
                    name: name,
                    quantity: quantity
                };
                items.push(item);
            })
            /!*catch method will be executed when deferred is invoked.
             basically, it's catching any errors from any of the promises that were chained above it*!/
            .catch(function (errorResponse) {
               console.log(errorResponse.message);
            });
        };*/

        // Better version - promises are executed in parallel
        service.addItem = function (name, quantity) {

            // addItem method is using async behavior to check the name and get promise
            var namePromise = WeightLossFilterService.checkName(name);
            // addItem method is using async behavior to check the quantity and get promise
            var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

            //$q.all takes an array of promises
            $q.all([namePromise, quantityPromise])
            .then (function (response) { // then method will be executed once all promises in the array is deferred.resolve

                var item = {
                  name : name,
                    quantity: quantity
                };
                items.push(item);
            })
            /*if any of the promises is rejected (deferred.reject), then all promises are cancelled immediately
            and then catch method is invoked*/
            .catch(function (errorResponse) {
                console.log(errorResponse.message);
            })

        };


        service.removeItem = function (itemIndex) {
          items.splice(itemIndex, 1);
        };

        service.getItems = function () {
          return items;
        };
    }

    //function constructor Service "WeightLossFilterService"
    WeightLossFilterService.$inject["$q","$timeout"]; //inject the timeout service and service promise
    function WeightLossFilterService($q,$timeout) {

        var service = this;

        //method checkName to evaluate the name
        service.checkName = function (name) {

            var deferred = $q.defer(); //create async environment method

            var result = {
                message: ""
            };

            //timeout function will simulate an async behavior
            $timeout(function () {

                //Check for cookies
                if(name.toLowerCase().indexOf("cookie") === -1){ //check if cookie does not exists in the name
                    deferred.resolve(result);
                }else{
                    result.message = "Stay away from cookies, Nelson";
                    deferred.reject(result);
                }
            }, 3000);

            return deferred.promise; //return the promise back to the caller of this function
        };

        //method checkQuantity to evaluate the quantity
        service.checkQuantity = function (quantity) {

            var deferred = $q.defer(); // create async environment method

            var result = {
                message: ""
            };

            //timeout function will simulate an async behavior
            $timeout(function () {

                //Check for too many boxes
                if(quantity < 6){ //check if cookie boxes are ok
                    deferred.resolve(result);
                }else{
                    result.message = "That's too much, Nelson";
                    deferred.reject(result);
                }
            }, 1000);

            return deferred.promise; //return the promise back to the caller of this function

        };


    }

})();
