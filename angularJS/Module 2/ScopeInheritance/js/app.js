/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';

angular.module("ControllerAsApp", [])

.controller("ParentController1", ParentController1)
.controller("ChildController1", ChildController1)
.controller("ParentController2", ParentController2)
.controller("ChildController2", ChildController2)

    ParentController1.$inject['$scope'];

    function ParentController1($scope) {
        $scope.parentValue = 1;
        $scope.pc = this;
        $scope.pc.parentValue = 1;
    }

    ChildController1.$inject = ['$scope'];

    function ChildController1($scope) {
        /*console.log("$scope.parentValue: ", $scope.parentValue);
        console.log("Child $scope:", $scope );

        // example where childController mask the parentValue property to 5. Parent property remains as 1
        $scope.parentValue = 5;
        console.log("*** Changed: $scope.parentValue= 5 ***");
        console.log("$scope.parentValue: ", $scope.parentValue);
        console.log($scope);

        //example where childController changes the property of object, so it will also change the property in Parent's object
        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
        $scope.pc.parentValue = 5;
        console.log("** CHANGED: $scope.pc.parentValue = 5; **");
        console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
        console.log("$scope: ", $scope);

        console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);*/
    }

    //Controller as Syntax
    ParentController2.$inject = ['$scope'];

    function ParentController2($scope) {
        var parent = this; // local variable to keyword this
        parent.value = 1;
    }

    ChildController2.$inject = ['$scope'];

    function ChildController2($scope) {
        var child = this; // local variable to keyword this
        child.value = 5;
        console.log("ChildController2 $scope: ", $scope);
    }


})();
