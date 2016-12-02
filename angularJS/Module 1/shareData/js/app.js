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
.controller("myFirstCtrl", function(){
// name of view model(controller) and a function that defines the functionality of this controller


});

})();