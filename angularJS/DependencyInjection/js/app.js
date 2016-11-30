/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

/*(function(){

//best practice for protecting us from making mistakes
'use strict';


//define our main app (- responsible for some chunck of HTML in index.html)
angular.module('myFirstApp', [])
// name of the module and array of dependencies

//define the view of our model
.controller("myFirstCtrl", DIController);

    function DIController ($scope, $filter, $injector){
        $scope.name = "Nelson";


        $scope.lower = function(){
            var lowCase = $filter('lowercase');
            $scope.name = lowCase($scope.name);
        };

        $scope.upper = function(){
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };

        console.log($injector.annotate(DIController));
    }

    function AnnotateMe( name, job, salary){
        var sentence = "My name is " + name + " , my job is " + job + " and i get " + salary;
        return sentence;
    }

    console.log(AnnotateMe());

})();*/


// Code minification-friendly
!function(){"use strict";function n(e,o,r){e.name="Nelson",e.lower=function(){var n=o("lowercase");e.name=n(e.name)},e.upper=function(){var n=o("uppercase");e.name=n(e.name)},console.log(r.annotate(n))}function e(n,e,o){var r="My name is "+n+" , my job is "+e+" and i get "+o;return r}angular.module("myFirstApp",[]).controller("myFirstCtrl",["$scope","$filter","$injector",n]),console.log(e())}();