/**
 * Created by andre on 3/19/2017.
 */

//creation of the module
(function () {
//best practice for protecting us from making mistakes
    'use strict';

    angular.module('MenuApp')
        .controller("ItemsController", ItemsController);

//MainShoppingListController depends on resolve property "items" declared on state
    ItemsController.$inject = ["listOfMenuItems"];
    function ItemsController(listOfMenuItems) {
        var list = this;

        list.allMenuItems = listOfMenuItems.data.menu_items;

        console.log("controller: " + JSON.stringify(listOfMenuItems.data.menu_items));

    }

})();