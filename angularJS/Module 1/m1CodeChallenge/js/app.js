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

        var count = 0;
        var separator = ",";
        $scope.message = "";
        var numSplits = 0;
        var newInput = "";
        var newEvaluation = "";

        //function that splits string and return result
        function splitString(stringToSplit, separator){
            var newStr = "";
            var arrayofStrings = "";
            var lastChar = stringToSplit.slice(-1);
            //check if last char is a ","
            if(lastChar == ','){
                newStr = stringToSplit.substring(0, stringToSplit.length-1); //remove last character
                newEvaluation = checkEmptyItems(newStr);
                $scope.evaluation = newEvaluation; // update input text
                arrayofStrings = newEvaluation.split(separator);
             }else{
                newStr = stringToSplit;
                newEvaluation = checkEmptyItems(newStr);
                $scope.evaluation = newEvaluation; // update input text
                arrayofStrings = newEvaluation.split(separator);
             }
            return arrayofStrings.length;
        }

        //function that checks empty items towards the count
        function checkEmptyItems (nStr){
            var array = [];
            numSplits = nStr.split(separator);
            for(var i=0; i < numSplits.length; i++){
                if(numSplits[i].length>0){
                    array.push(numSplits[i]);
                }
            }
            newInput = array.join();
            return newInput;
        }

        $scope.validateFood = function (val) {


         if (val){
              count = splitString(val, separator);
              if(count > 3){
                $scope.message = "Too much!";
                $scope.myStyle = {color: 'green'};
                $scope.myText = {border:  '1px solid green'};
              }else{
                $scope.message = "Enjoy!";
                $scope.myStyle = {color: 'green'};
                $scope.myText = {border:  '1px solid green'};
              }
          }else{
            $scope.message = "Please enter data first";
            $scope.myStyle = {color: 'red'};
            $scope.myText = {border:  '1px solid red'};
          }

        };

    }


})();
