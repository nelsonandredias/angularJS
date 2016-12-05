/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';



angular.module('myFirstApp', [])

.controller("mainCtrl", Evaluate);

    // use this array as guidance to see which service to inject into which argument and the Evaluate function itself
    mainCtrl.$inject = ['$scope'];

    function Evaluate ($scope){

        var comma = ","; //define separator
        var numItems =[]; //array of items
        var len = 0; //number of items in array
        var count = 0; //auxiliar variable to compare

        //auxiliar function - split string by specified separator
        function splitString(stringToSplit, separator){

            numItems = stringToSplit.split(separator);
            len = numItems.length;
            return len;
        }

        //Parse string and check if lunch is too much
        $scope.isToMuch = function (val){

            count = splitString(val, comma);
            if (count > 0){
                return true;
            }else{
                return false;
            }
        };


    };


})();
