/**
 * Created by andre on 3/19/2017.
 */

//creation of the module
(function () {
//best practice for protecting us from making mistakes
    'use strict';

    angular.module('data')
        .component('categoriesList', {
            templateUrl: 'src/restaurantList/Categories/template/categoriesList.template.html',
            controller: CategoriesComponentController,
            bindings:{
                category: '<',
                onRemove: '&'
            }
        });


})();

// Component's Controller
CategoriesComponentController.$inject = ['$scope'];
function CategoriesComponentController($scope){
    var $ctrl = this;


    //use life cycle methods of the component

    // $onInit method is only executed once, when the controller is instanciated
    $ctrl.$onInit = function () {
        console.log("We are in $onInit();");

    };



}