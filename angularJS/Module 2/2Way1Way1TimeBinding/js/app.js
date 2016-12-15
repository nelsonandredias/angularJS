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
angular.module('BindingApp', [])

//define the view of our model
.controller("BindingCtrl", BindingController);

   // use this array as guidance to see which service to inject into which argument and the msg function itself and protect against minification
    BindingCtrl.$inject = ['$scope'];

   function BindingController($scope) {

       $scope.firstName = "Nelson";

       $scope.showNumberOfWatchers = function () {
         console.log("Number of Watchers: ", $scope.$$watchersCount);
       };

       // once we click and bound "Nelson Dias" to "fullName" property, this watcher disappears
       $scope.setFullName = function () {
         $scope.fullName = $scope.firstName + " " + "Dias";
       };

       $scope.logFirstName = function () {
           console.log("First Name is: ", $scope.firstName);
       };

       $scope.logFullName = function () {
           console.log("Full Name is: ", $scope.fullName);
       };

       //see that digest cycle was triggered
       $scope.$watch(function(){
           console.log("Digest Loop Fired");
       });

   }



})();
