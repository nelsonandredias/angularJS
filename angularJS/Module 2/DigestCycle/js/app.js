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
angular.module('digestApp', [])

//define the view of our model
.controller("digestCtrl", digestController);

   // use this array as guidance to see which service to inject into which argument and the msg function itself and protect against minification
    digestCtrl.$inject = ['$scope'];

   function digestController($scope) {

       $scope.onceCounter = 0;
       $scope.counter = 0;
       $scope.name = "Nelson";

       $scope.showNumberOfWatchers =function (){
         console.log("number of Watchers:", $scope.$$watchersCount);
       };

       $scope.countOnce =function (){
           $scope.onceCounter = 1;
       };

       $scope.upCounter = function () {
           $scope.counter++;
       };

       //see that digest cycle was triggered
       $scope.$watch(function(){
           console.log("Digest Loop Fired");
       });

       //Set up 2 watchers manually
    /*
       //set up a watch for our "onceCounter" variable
       // the first arg is the name of the property we aim to watch
       // the second arg is a function that is going to watch this arguments
       $scope.$watch('onceCounter', function(newValue, oldValue){
          console.log("onceCounter old value:", oldValue);
          console.log("onceCounter new value:", newValue);
       });

       //set up a watch for our "counter" variable
       $scope.$watch('counter', function(newValue, oldValue){
           console.log("counter old value:", oldValue);
           console.log("counter new value:", newValue);
       });
        */
   }



})();
