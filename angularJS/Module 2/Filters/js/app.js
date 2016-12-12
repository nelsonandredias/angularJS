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
.controller("msgCtrl", msgController);

   // use this array as guidance to see which service to inject into which argument and the msg function itself and protect against minification
   msgCtrl.$inject = ['$scope', '$filter'];

   function msgController($scope, $filter) {

       $scope.name = "Nelson";
       $scope.state = "hungry";
       $scope.cookieCost = 0.45;

       $scope.sayMessage =function (){
           var message = "Nelson likes to eat healthy snacks at night";
           var output = $filter('uppercase')(message);
           return output;
       };

       $scope.feed = function(){

           $scope.state = "fed";
       };

   }



})();
