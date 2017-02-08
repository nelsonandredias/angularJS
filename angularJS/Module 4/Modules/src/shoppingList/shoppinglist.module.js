/**
 * Created by nelson.dias on 07/02/2017.
 */

//creation of the module
(function () {

'use strict';

// ShoppingListModule depends on SpinnerModule
angular.module('ShoppingListModule', ['SpinnerModule']);

angular.module('ShoppingListModule')
//config function runs before any services, factories or controllers are created
.config(function () {
    console.log("ShoppingListModule config fired!");
})
/*get executed after the injector is created and are used to kickstart the application.
Only instances and constants can be injected into run blocks.
This is to prevent further system configuration during application run time.*/
.run(function () {
    console.log("ShoppingListModule run fired!");
});

})();