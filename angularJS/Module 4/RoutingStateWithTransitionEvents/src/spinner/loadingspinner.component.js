(function () {
'use strict';

angular.module('Spinner')
.component('loadingSpinner', {
  templateUrl: 'src/spinner/loadingspinner.template.html',
  controller: SpinnerController
});


SpinnerController.$inject = ['$rootScope'];
function SpinnerController($rootScope) {
  var $ctrl = this;
  //cancel array
  var cancellers = [];

  // we're listening for some of those events - $stateChangeStart, $stateChangeSuccess,$stateChangeError
  $ctrl.$onInit = function () {
    var cancel = $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
      // spinner image is turned on
      $ctrl.showSpinner = true;
    });
    cancellers.push(cancel);

    //when the transition is finished, spinner image is turned off
    cancel = $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
      //spinner image is turned off
      $ctrl.showSpinner = false;
    });
    cancellers.push(cancel);

    // if the transition got error, spinner image is also turned off
    cancel = $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error){
      //spinner image is turned off
      $ctrl.showSpinner = false;
    });
    cancellers.push(cancel);
  };

  // take our cancellers array and for each index of the array, invoke a function that cancel listening for that particular event
  $ctrl.$onDestroy = function () {
    cancellers.forEach(function (item) {
      item();
    });
  };

};

})();
