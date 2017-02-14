/**
 * Created by nelson.dias on 14/02/2017.
 */

//creation of the module
(function (){
//best practice for protecting us from making mistakes
'use strict';

angular.module("RoutingModuleApp")
//config function runs before any services, factories or controllers are created
.config(RoutesConfig);

RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    //Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise("/");

    //Set up UI states
    $stateProvider
        //Home page
        .state("home",{
            url: "/",
            templateUrl: "src/shoppingList/templates/home.template.html"
        })
        //Premade list page
        .state("mainList",{
            url:"/main-list",
            templateUrl: "src/shoppingList/templates/main-shoppingList.template.html",
            controller: "MainShoppingListController as mainList"
        });
}

})();