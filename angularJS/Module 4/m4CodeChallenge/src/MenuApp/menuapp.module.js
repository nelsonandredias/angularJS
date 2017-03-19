/**
 * Created by andre on 3/19/2017.
 */

(function () {
    'use strict';

    // we are importing the ui-router
    angular.module('MenuApp', ['ui.router', 'data']);

    angular.module('MenuApp')

    //config function runs before any services, factories or controllers are created
        .config(function () {
            console.log("menuapp1 module was fired!");
        })
        /*get executed after the injector is created and are used to kickstart the application.
         Only instances and constants can be injected into run blocks.
         This is to prevent further system configuration during application run time.*/
        .run(function () {
            console.log("menuapp2 module is fired!");
        });


})();