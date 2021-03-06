/**
 * Created by andre on 3/19/2017.
 */

//creation of the module
(function () {
//best practice for protecting us from making mistakes
    'use strict';

angular.module('data')
.service("MenuDataService", MenuDataService)
.constant("ApiBasePath","http://davids-restaurant.herokuapp.com");// constant function that's evoked everytime on the angular module


    console.log("Entered MenuDataService");

    MenuDataService.$inject = ["$q", "$http", "ApiBasePath"];
    function MenuDataService($q, $http, ApiBasePath) {

        var service = this;



        service.getAllCategories = function () {

            var deferred = $q.defer();

            console.log("Entered getAllCategories method");
            $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                deferred.resolve(response);
                return response.data;

            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(error);
            });

            return deferred.promise;

        };

        //
        service.getItemsForCategory = function (categoryShortName) {
            
            var deferred = $q.defer();

            console.log("Entered getItemsForCategory method");

            $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params: {
                    category: categoryShortName
                }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                deferred.resolve(response);


            }, function errorCallback(error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(error);
            });

            return deferred.promise;


        };

    }

})();