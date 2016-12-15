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
    digestCtrl.$inject = ['$scope', '$timeout'];

   function digestController($scope, $timeout) {

       $scope.counter = 0;

       /*$scope.upCounter = function () {
           setTimeout(function () { // this timeout is not being called inside the angular context, it means the digest cycle cannot kick off
               $scope.counter++;
               console.log("Counter incremented");
               // in order to kick off manually, use $digest
               $scope.$digest();
           }, 2000);
       };*/

       //better way of doing the same process
       /*$scope.upCounter = function () {
           setTimeout(function () { // this timeout is not being called inside the angular context, it means the digest cycle cannot kick off
               $scope.$apply(function () { // $apply kicks it off automatically
                   $scope.counter++;
                   console.log("Counter incremented");
               });
           }, 2000);
       };*/

       $scope.upCounter = function () {
           $timeout(function () { 
                   $scope.counter++;
                   console.log("Counter incremented");
           }, 2000);
       };

       //see that digest cycle was triggered
       $scope.$watch(function(){
           console.log("Digest Loop Fired");
       });

   }



})();
