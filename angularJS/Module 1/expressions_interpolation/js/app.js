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
.controller("myFirstCtrl", msgFunction);

    // use this array as guidance to see which service to inject into which argument and the msg function itself
    //and protect against minification
    myFirstCtrl.$inject = ['$scope'];

    function msgFunction ($scope){
        $scope.name = "Nelson";
        $scope.state = "hungry";

        $scope.sayMessage =function (){
            return "Nelson is attending a Coursera course";
        }

        $scope.feed = function(){

            $scope.state = "fed";
        }


    }


})();
