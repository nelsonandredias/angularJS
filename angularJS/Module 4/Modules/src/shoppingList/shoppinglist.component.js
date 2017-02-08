/**
 * Created by nelson.dias on 07/02/2017.
 */

(function(){

//best practice for protecting us from making mistakes
'use strict';

angular.module("ShoppingListModule")
.component('shoppingList', {
    templateUrl: 'src/shoppinglist/shoppinglist.template.html',
    controller: ShoppingListComponentController,
    bindings:{
        items: '<',
        myTitle: '@title',
        onRemove: '&'
    }
});

// Component's Controller
//ShoppingListComponentController depends on WeigthLossFilterService
ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];
function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService){
    var $ctrl = this;
    var totalItems;


    //use life cycle methods of the component

    // $onInit method is only executed once, when the controller is instanciated
    $ctrl.$onInit = function () {
        totalItems = 0;
        console.log("totalItems Init: ", totalItems);

    };


    // $doCheck method is called every time the digest cycle runs. By using this method we can avoid using $scope
     $ctrl.$doCheck = function () {

         //check if number of items in our items array changed
         if($ctrl.items.length !== totalItems){

            console.log("number of items changed. Checking for Cookies");
            totalItems = $ctrl.items.length;

            // broadcast an event to loadingSpinner component, starting from the ng-app($rootScope)
            // broadcast goes down in the chain scope
            // we are passing an object with the value "true"
            $rootScope.$broadcast('shoppinglist:processing', {on: true});

            // make an asynchronous call to WeightLossFilterService
            var promises = [];
            for(var i=0; i< $ctrl.items.length; i++){
                promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
            }

            // deal with multiple asynchronous promises all at once in parallel
            $q.all(promises)
            .then(function (result) { // If all promises returns a positive result, remove the error message

                //Remove cookies warning
                var warningElem = $element.find('div.error');
                warningElem.slideUp(900);

            })
            .catch(function (result) { // The first time it detects a cookie, the rest of them will get cancelled

                //Show cookies warning
                var warningElem = $element.find('div.error');
                warningElem.slideDown(900);

            })
            .finally(function () { // when asynchronous communication is done, turn off the spinner

                $rootScope.$broadcast('shoppinglist:processing', {on: false});

            });

         }

    };

    $ctrl.remove = function (myIndex) {
        $ctrl.onRemove({ index: myIndex });
    };

}

})();