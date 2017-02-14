/**
 * Created by nelson.dias on 14/02/2017.
 */

//creation of the module
(function () {
//best practice for protecting us from making mistakes
'use strict';

angular.module('RoutingModuleApp')
.controller("MainShoppingListController", MainShoppingListController);

//MainShoppingListController depends on ShoppingListService
MainShoppingListController.$inject = ["ShoppingListService"];
function MainShoppingListController(ShoppingListService) {
    var mainList = this;
    mainList.items = [];

    // we're using the ShoppingListService in order to initialize the mainList.items
    mainList.$onInit = function () {
        // we're using a promise
        ShoppingListService.getItems()
        .then(function (result) {
           mainList.items = result;
        });
    };

}


})();