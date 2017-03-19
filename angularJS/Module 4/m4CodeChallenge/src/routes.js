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
            url: "/items",
            templateUrl: "./src/restaurantList/Items/template/items.template.html"

        });

        //Item description page
        /*.state("mainList.itemDetail",{
            templateUrl: "src/shoppingList/templates/item-detail.template.html",
            controller: "ItemDetailController as itemdetail",
            //we don't need to inject the items resolve property from the parent state - due to inherite capacity
            params:{
                itemId: null
            }
        });*/
}

})();