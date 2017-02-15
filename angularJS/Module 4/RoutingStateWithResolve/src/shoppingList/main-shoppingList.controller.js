/**
 * Created by nelson.dias on 14/02/2017.
 */

//creation of the module
(function () {
//best practice for protecting us from making mistakes
'use strict';

angular.module('RoutingModuleApp')
.controller("MainShoppingListController", MainShoppingListController);

//MainShoppingListController depends on resolve property "items" declared on state
MainShoppingListController.$inject = ["items"];
function MainShoppingListController(items) {
    var mainList = this;
    mainList.items = [];

    // use resolved property to show list
    mainList.items = items;

}


})();