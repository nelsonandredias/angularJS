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
angular.module('msgApp', [])

//define the view of our model
.controller("msgCtrl", msgController)
//register filter factory with module
.filter("loves", LovesFilter)
.filter("truth", TruthFilter);

   // use this array as guidance to see which service to inject into which argument and the msg function itself and protect against minification
   msgCtrl.$inject = ['$scope', 'lovesFilter' ];

   function msgController($scope, lovesFilter) {

       $scope.name = "Nelson";
       $scope.state = "hungry";


       $scope.sayMessage =function (){
           var message = "Nelson likes to eat healthy snacks at night";
           return message;
       };

       $scope.sayLovesMessage =function (){
           var message = "Nelson likes to eat healthy snacks at night";
           message = lovesFilter(message); //calls filter function
           return message;
       };

       $scope.feed = function(){

           $scope.state = "fed";
       };

   }

   //Define a filter factory function
   function LovesFilter(){
       return function (input) {
           input = input || ""; //check if input exits
           input = input.replace("likes", "loves");
           return input;
       };
   }

   //Define a filter factory function
    function TruthFilter() {
        return function (input, target, replace) {
            input = input || ""; //check if input exits
            input = input.replace(target, replace);
            return input;
        };
    }

})();
