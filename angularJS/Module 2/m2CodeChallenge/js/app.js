/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';



angular.module('ShoppingListCheckOff', [])
.controller("ToBuyController", ToBuyCtrl)
.controller("AlreadyBoughtController", AlrBoughtCtrl);





})();
