/**
 * Created by nelson.dias on 13/02/2017.
 */

//creation of the module
(function (){

'use strict';

// RoutingModuleApp depends on ui-Router
angular.module('RoutingModuleApp', ['ui.router']);

angular.module('RoutingModuleApp')
//config function runs before any services, factories or controllers are created
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    //Redirect to tab 1 if no other URL matches
    $urlRouterProvider.otherwise('/tab1');

    //Set up UI states
    $stateProvider
    //state it's named 'tab1', which have a configuration object that represents the state
        .state('tab1',{
            url: '/tab1',
            templateUrl: 'src/tab1.html'
        })
        .state('tab2',{
            url: '/tab2',
            templateUrl: 'src/tab2.html'
        });

}

})();