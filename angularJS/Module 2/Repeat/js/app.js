/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';

    var shoppingList1 = ["Milk", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"];

    var shoppingList2 = [
        {name: "Milk",
            quantity: "2"
        },
        {name: "Donuts",
            quantity: "200"
        },
        {name: "Cookies",
            quantity: "200"
        },
        {name: "Chocolate",
            quantity: "5"
        }
    ];

//define our main app (- responsible for some chunck of HTML in index.html)
angular.module('shoppingApp', [])

//define the view of our model
.controller("shoppingCtrl", shoppingController);

   // use this array as guidance to see which service to inject into which argument and the msg function itself and protect against minification
   shoppingCtrl.$inject = ['$scope'];

   function shoppingController($scope) {

       $scope.shoppingList1 = shoppingList1;
       $scope.shoppingList2 = shoppingList2;
       
       //function that add new item to list
       $scope.addToList = function () {
         //create new item object
         var newItem = {
            name: $scope.newItemName,
            quantity: $scope.newItemQuantity
         };
         //push it into array
         $scope.shoppingList2.push(newItem);
       };
   }



})();
