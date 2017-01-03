/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';

angular.module("MenuCategoriesApp", [])

.controller("MenuCategoriesController", MenuCategoriesController)
.service("MenuCategoriesService", MenuCategoriesService)
.constant("ApiBasePath","http://davids-restaurant.herokuapp.com");// constant function that's evoked everytime on the angular module


    //Menu Categories Controller
    MenuCategoriesController.$inject = ['MenuCategoriesService']; //inject the service in the controller
    function MenuCategoriesController(MenuCategoriesService) {
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
         that is automatically attached to $scope for us*/
        var menu = this;

        //use the returned promise to initialize something
        var promise = MenuCategoriesService.getMenuCategories();

        promise.then(function (response) {
            menu.categories = response.data;
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });

        // method that Log Menu Items
        menu.logMenuItems = function (shortName) {

          //use the returned promise to initialize something
          var promise = MenuCategoriesService.getMenuForCategory(shortName);

          promise.then(function (response) {
              console.log(response.data);
          })
          .catch(function (error) {
              console.log(error);
          })
        };

    }

    //function constructor Service "MenuCategoriesService"
    MenuCategoriesService.$inject = ["$http", "ApiBasePath"]; //inject the HTTP service and the constant function
    function MenuCategoriesService($http, ApiBasePath) {
        var service = this;

        //method to get Menu Categories
        service.getMenuCategories = function () {
            // response will capture the promise
            var response = $http({
              method: "GET",
              url: (ApiBasePath + "/categories.json")
            });
            // return the promise
            return response;
        };

        //method to get Menu Items
        service.getMenuForCategory = function (shortName) {
            // response will capture the promise
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params: {
                    category: shortName
                }
            });
            // return the promise
            return response;
        };

    }



})();
