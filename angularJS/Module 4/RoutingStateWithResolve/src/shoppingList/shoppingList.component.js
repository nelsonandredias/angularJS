/**
 * Created by nelson.dias on 14/02/2017.
 */

(function () {
//best practice for protecting us from making mistakes
"use strict";

angular.module("RoutingModuleApp")
.component("shoppingList",{
    templateUrl: "src/shoppingList/templates/shoppingList.template.html",
    bindings: {
        items: "<" // one-way binding object
    }
});

})();