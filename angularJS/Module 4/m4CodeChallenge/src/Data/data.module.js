/**
 * Created by andre on 3/19/2017.
 */

//creation of the module
(function (){
//best practice for protecting us from making mistakes
    'use strict';

    angular.module("data", []);

    angular.module('data')

    //config function runs before any services, factories or controllers are created
        .config(function () {
            console.log("data1 module was fired!");
        })
        /*get executed after the injector is created and are used to kickstart the application.
         Only instances and constants can be injected into run blocks.
         This is to prevent further system configuration during application run time.*/
        .run(function () {

            console.log("data2 module is fired!");

        });


})();