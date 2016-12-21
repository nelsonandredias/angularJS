/**
 * Created by nelson.dias on 21/12/2016.
 */
//function constructor Service
angular.module('todoService', [])
function ShoppingListService(){
    /* as a Controller as Syntax, we are attaching all properties directly to the instance of the controller
     that is automatically attached to $scope for us*/
    var service = this;

    var items = []; // List of shopping items

    service.addItem = function (itemName, itemQuantity) { // service method responsible to add elements to Shopping List
        var item = {
            name: itemName,
            quantity: itemQuantity
        };
        items.push(item);
    };

    service.removeItem = function (itemIndex) { // service method responsible to remove elements of Shopping List
        items.splice(itemIndex, 1);
    };

    service.getItems = function () { // service method responsible to show all elements in Shopping List
        return items;
    };
}