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

})();