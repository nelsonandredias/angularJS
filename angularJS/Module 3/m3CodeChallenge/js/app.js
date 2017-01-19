/**
 * Created by nelson.dias on 25/11/2016.
 */
// IIFE definition
/*we want to make sure that no local variables bleed into the global scope
* */

(function(){

//best practice for protecting us from making mistakes
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
/*.service('getDescriptionItemService', getDescriptionItemService)*/
.constant("ApiBasePath","http://davids-restaurant.herokuapp.com");// constant function that's evoked everytime on the angular module

    //Narrow List Controller
    NarrowItDownController.$inject = ['MenuSearchService']; //inject the service in the controller
    function NarrowItDownController(MenuSearchService) {
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
         that is automatically attached to $scope for us*/
        var narrow = this;

        narrow.itemName = "";


        narrow.itemSubmit = function () {
            try{

                var promise = MenuSearchService.getMatchedMenuItems(narrow.itemName);

                promise.then(function (response) {
                    narrow.list = response;
                    narrow.errorMessage = "";

                })
                .catch(function (error) {
                    narrow.list = "";
                    narrow.errorMessage = error.message;
                });

            }catch(error){
                narrow.errorMessage = error.message;
                narrow.list = "";
            }

        };

        //function that remove item from list
        /*narrow.removeItem = function (itemIndex) {
            MenuSearchService.removeItem(itemIndex);
        };*/

    }


    //function constructor Service
    MenuSearchService.$inject = ["$http", "ApiBasePath"]; //inject the HTTP service and the constant function
    function MenuSearchService($http, ApiBasePath){
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
         that is automatically attached to $scope for us*/
        var service = this;


        //service method "getMatchedMenuItems" to reach out to the server and retrieve the list of raw menu items data
        service.getMatchedMenuItems = function (itemName) {

            if(itemName.length > 0 || itemName === undefined){ // check if string is empty

                var accessDB = $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json")
                });

                // as the $http service returns a promise we can invoke the "then" method
                return accessDB.then(function success (response) {

                        var array = response.data.menu_items;
                        var found = [];
                        var objDescription = {};

                        for (var i = 0; i < array.length; i ++){

                            var descriptionString = array[i].description;
                            // check if string searched appears anywhere in the description of the item
                            if(descriptionString.search(itemName) > 0 ){
                                objDescription = {"shortName": array[i].short_name, "name": array[i].name, "description": array[i].description};
                                found.push(objDescription);
                            }

                        }

                        if(found.length > 0){ // if found, return results
                            return found;
                        }else{
                            throw new Error("Nothing found");
                        }

                  }, function error (errorResponse) {
                        console.log(errorResponse.message);
                  });


            }else{
                throw new Error("Nothing found");
            }

        };

        // service method responsible to remove elements of Shopping List
        service.removeItem = function (itemIndex) {
            found.splice(itemIndex, 1);
        };

    }

})();
