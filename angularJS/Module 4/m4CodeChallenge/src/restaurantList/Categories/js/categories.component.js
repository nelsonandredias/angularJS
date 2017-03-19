/**
 * Created by andre on 3/19/2017.
 */

//creation of the module
(function () {
//best practice for protecting us from making mistakes
    'use strict';

    angular.module('data')
        .component('categories', {
            templateUrl: 'src/restaurantList/Categories/template/categories.template.html',
            controller: ShoppingListComponentController,
            bindings:{
                items: '<',
                myTitle: '@title',
                onRemove: '&'
            }
        });


})();