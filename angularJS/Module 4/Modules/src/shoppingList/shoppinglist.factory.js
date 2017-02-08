/**
 * Created by nelson.dias on 07/02/2017.
 */

(function () {

'use strict';

angular.module('ShoppingListModule')
.factory('ShoppingListFactory', ShoppingListFactory);

/*We do not want Angular to create the service for us...we want to create the service ourselves*/
function ShoppingListFactory() {

    var factory = function (maxItems) {
        return new ShoppingListService(maxItems);
    };

    return factory;
}

// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
    var service = this;

    // List of shopping items
    var items = [];

    service.addItem = function (itemName, quantity) {
        if ((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)) {

            var item = {
                name: itemName,
                quantity: quantity
            };
            items.push(item);
        }
        else {
            throw new Error("Max items (" + maxItems + ") reached.");
        }
    };

    service.removeItem = function (itemIndex) {
        items.splice(itemIndex, 1);
    };

    service.getItems = function () {
        return items;
    };
}

})();