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

                    /*narrow.list = response.data;*/
                    return WeightLossFilterService.getMenuDescriptions(narrow.itemName,response.data);

                })
                .then(function (response) {

                    narrow.list = response;
                })
                .catch(function (error) {
                        console.log("Something went terribly wrong.");
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
    MenuSearchService.$inject = ["$http", "ApiBasePath", "$q"]; //inject the HTTP service and the constant function
    function MenuSearchService($http, ApiBasePath){
        /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
         that is automatically attached to $scope for us*/
        var service = this;
        var found = [];
        var objDescription = {};

        //service method "getMatchedMenuItems" to reach out to the server and retrieve the list of all the menu items
        service.getMatchedMenuItems = function (itemName) {

            if(itemName.length > 0 || itemName === undefined){ // check if string is empty
                // response will capture the promise
                var response = $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json"),
                });
                // return the promise
                return response;

            }else{
                throw new Error("Nothing found");
            }

        };


        //service method to get Menu Descriptions based on itemName typed in textbox
        service.getMenuDescriptions = function (itemName, menuItems) {

            /*var array = menuItems["menu_items"];

            for (var i = 0; i < array.length; i ++){
                var descriptionString = array[i].description;
                if(descriptionString.search(itemName) > 0 ){
                    objDescription = {"shortName": array[i].short_name, "name": array[i].name, "description": array[i].description};
                    found.push(objDescription);
                }
            }

            return found;*/
            return menuItems;
        };

        // service method responsible to remove elements of Shopping List
        service.removeItem = function (itemIndex) {
            found.splice(itemIndex, 1);
        };


    }




})();
