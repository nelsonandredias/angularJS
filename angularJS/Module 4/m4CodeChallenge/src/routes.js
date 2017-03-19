 /**
 * Created by nelson.dias on 14/02/2017.
 */

//creation of the module
(function (){
//best practice for protecting us from making mistakes
'use strict';

angular.module("MenuApp")
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
            templateUrl: "./src/restaurantList/Homepage/template/home.template.html"
        })
        //Premade list page
        .state("categories",{
            url:"/categories",
            templateUrl: "./src/restaurantList/Categories/template/categories.template.html",
            controller: "CategoriesController as CategoriesCtrl",
            //ui-router will wait that items property to get resolved before take us to this state
            resolve: {
                listOfCategories: ["MenuDataService", function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        //Item description page
        .state("items",{
            url: "/items/{shortName}",
            templateUrl: "./src/restaurantList/Items/template/items.template.html",
            controller: "ItemsController as ItemsCtrl",
            resolve: {
                listOfMenuItems: ["$stateParams", "MenuDataService", function ($stateParams, MenuDataService) {
                    //return the promise
                    return MenuDataService.getItemsForCategory($stateParams.shortName);
                }]
            }

        });

}

})();