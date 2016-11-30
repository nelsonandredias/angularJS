/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';


//define our main app (- responsible for some chunck of HTML in index.html)
angular.module('myFirstApp', [])
// name of the module and array of dependencies

//define the view of our model
.controller("myFirstCtrl", DIController);

    // use this array as guidance to see which service to inject into which argument and the DIController function itself
    myFirstCtrl.$inject = ['$scope', '$filter'];

    function DIController ($scope, $filter){
        $scope.name = "Nelson";


        $scope.lower = function(){
            var lowCase = $filter('lowercase');
            $scope.name = lowCase($scope.name);
        };

        $scope.upper = function(){
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };
    }

})();

// minification-friendly code
!function(){"use strict";function e(e,n){e.name="Nelson",e.lower=function(){var r=n("lowercase");e.name=r(e.name)},e.upper=function(){var r=n("uppercase");e.name=r(e.name)}}angular.module("myFirstApp",[]).controller("myFirstCtrl",e),myFirstCtrl.$inject=["$scope","$filter"]}();