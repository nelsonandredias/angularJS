/**
 * Created by andre on 3/19/2017.
 */

//component's creation
(function () {
//best practice for protecting us from making mistakes
    'use strict';

   angular.module('MenuApp')
        .component('itemList', {
            templateUrl: 'src/restaurantList/Items/template/itemsList.template.html',
            controller: ItemsComponentController,
            bindings:{
                items: '<',
                onRemove: '&'
            }
        });


})();


// Component's Controller
ItemsComponentController.$inject = ['$scope'];
function ItemsComponentController($scope){
    var $ctrl = this;

    //use life cycle methods of the component

    // $onInit method is only executed once, when the controller is instanciated
    $ctrl.$onInit = function () {
        console.log("We are in Items Component's $onInit();");

    };



}
