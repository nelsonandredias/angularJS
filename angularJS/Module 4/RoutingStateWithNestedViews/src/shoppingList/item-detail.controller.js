/**
 * Created by nelson.dias on 16/02/2017.
 */

//creation of the module
(function () {
//best practice for protecting us from making mistakes
'use strict';

angular.module('ShoppingListModuleApp')
.controller("ItemDetailController", ItemDetailController);

// "items" is from the parent state and its injected through state's resolve
ItemDetailController.$inject = ["$stateParams", "items"];
function ItemDetailController($stateParams, items) {
    var itemdetail = this;

    //find the item index based on the item ID that's displayed in the URL
    var item = items[$stateParams.itemId];

    itemdetail.name = item.name;
    itemdetail.quantity = item.quantity;
    itemdetail.description = item.description;

}

})();