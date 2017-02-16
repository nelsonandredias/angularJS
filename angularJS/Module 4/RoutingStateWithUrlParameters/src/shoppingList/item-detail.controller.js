/**
 * Created by nelson.dias on 16/02/2017.
 */

//creation of the module
(function () {
//best practice for protecting us from making mistakes
'use strict';

angular.module('ShoppingListModuleApp')
.controller("ItemDetailController", ItemDetailController);

// "item" is injected through state's resolve
ItemDetailController.$inject = ["item"];
function ItemDetailController(item) {
    var itemdetail = this;

    itemdetail.name = item.name;
    itemdetail.quantity = item.quantity;
    itemdetail.description = item.description;

}

})();