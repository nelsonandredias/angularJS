/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';

angular.module("ShoppingListComponentApp", [])

.controller("ShoppingListController", ShoppingListController)
.factory("ShopListFactory", ShoppingListFactory)
.component("shoppingList", {
    templateUrl: 'shoppingList.template.html',
    controller: ShoppingListComponentController,
    // we won't define the "controller as", because angular will create an $ctrl scope automatically for us
    //define inputs and outputs with bindings
    bindings:{
        items: '<', // one-way binding object
        myTitle: '@title', //DOM atribute value
        onRemove: '&'
    }
});

    // Component's Controller
    ShoppingListComponentController.$inject = ['$element'];
    function ShoppingListComponentController($element){
        var $ctrl = this;
        var totalItems;

        //if there is a cookie in the shooping list, display a warning
        // this functionality is just inside of our controller
        $ctrl.cookiesInList = function(){
            for (var i=0; i < $ctrl.items.length; i++){
                var name = $ctrl.items[i].name;
                if(name.toLowerCase().indexOf("cookie") !== -1){
                    return true;
                }
            }
            return false;
        };

        // this function will call the onRemove function on bindings{}
        $ctrl.remove = function (myIndex) {
            //the key(we're mapping index on index.html) has to match the name used in the binding on our shopping list Component (index.html)
            $ctrl.onRemove({index: myIndex});
        };


        //use life cycle methods of the component

            // $onInit method is only executed once, when the controller is instanciated
            $ctrl.$onInit = function () {
              totalItems = 0;
              console.log("totalItems Init: ", totalItems);

            };

            // $onChanges method that's going to have a changeObj that's going to get pass to controller by the angular framework
            $ctrl.$onChanges = function (changeObj) {
              console.log("Changes: ", changeObj);

            };


            // $doCheck method is called every time the digest cycle runs. By using this method we can avoid using $scope 
            $ctrl.$doCheck = function () {
                if($ctrl.items.length !== totalItems){
                    console.log("number of items changed. Checking for Cookies");
                    totalItems = $ctrl.items.length;
                    if($ctrl.cookiesInList()){
                        console.log("Cookies Alert!");
                        var warningElem = $element.find('div.error');
                        warningElem.slideDown(900);
                    }else{
                        console.log("No Cookies Here!");
                        var warningElem = $element.find('div.error');
                        warningElem.slideUp(900);
                    }
                }

            };


    }


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

    /*
     We do not want Angular to create the service for us...we want to create the service ourselves*/
    function ShoppingListFactory() {
        var factory = function (maxItems) { // factory function that creates a service "ShoppingListService"
          return new ShoppingListService(maxItems);
        };

        return factory;
    }


})();
