/**
 * Created by nelson.dias on 07/02/2017.
 */

(function () {

'use strict';

angular.module('SpinnerModule')
.component('loadingSpinner', {
    templateUrl: 'src/spinner/loadingspinner.template.html',
    controller: SpinnerController
});


SpinnerController.$inject = ['$rootScope'];
function SpinnerController($rootScope) {
    var $ctrl = this;

    // the $on function returns a deregistration function - associate to a variable
    var cancelListener = $rootScope.$on('shoppinglist:processing', function (event, data) {
        console.log("Event: ", event);
        console.log("Data: ", data);

        if (data.on) {
            $ctrl.showSpinner = true;
        }
        else {
            $ctrl.showSpinner = false;
        }
    });

    //the eventListener is destroyed
    $ctrl.$onDestroy = function () {
        cancelListener();
    };

};

})();