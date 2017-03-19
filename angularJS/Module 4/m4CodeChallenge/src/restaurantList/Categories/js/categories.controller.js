/**
 * Created by andre on 3/19/2017.
 */

//creation of the module
(function () {
//best practice for protecting us from making mistakes
    'use strict';

    angular.module('MenuApp')
        .controller("CategoriesController", CategoriesController);

//MainShoppingListController depends on resolve property "items" declared on state
    CategoriesController.$inject = ["listOfCategories"];
    function CategoriesController(listOfCategories) {
        var list = this;


        list.allCategories = listOfCategories.data;

        console.log("controller: " + JSON.stringify(listOfCategories.data));

    }

})();