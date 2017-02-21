/**
 * Created by nelson.dias on 14/02/2017.
 */

//creation of the module
(function () {
//best practice for protecting us from making mistakes
'use strict';

angular.module('ShoppingListModuleApp')
.service("ShoppingListService", ShoppingListService);

ShoppingListService.$inject = ["$q", "$timeout"];
function ShoppingListService($q, $timeout) {

    var service = this;

    //List of shopping items
    var items = [];

    //Pre-populate a no cookie list
    items.push({
        name: "Sugar",
        quantity: "2 bags",
        description: "Sugar used for baking delicious ummm...baked goods"
    });
    items.push({
        name: "flour",
        quantity: "1 bags",
        description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs."
    });
    items.push({
        name: "Chocolate Chips",
        quantity: "3 bags",
        description: "Put these in the dough. No reason, really. Gotta store them somewhere!"
    });

    //we're using a promise to simulate call to server
    // Returns a promise, NOT items array directly
    service.getItems = function () {

        var deferred = $q.defer();

        //Wait 2 seconds before returning
        $timeout(function () {
            deferred.resolve(items);

        }, 800);

        return deferred.promise;
    };

}

})();