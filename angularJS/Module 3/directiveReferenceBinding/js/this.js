/**
 * Created by nelson.dias on 09/01/2017.
 */
function Person(){

    this.fullName = "Nelson";
    this.fav = "Cookies";

    this.describe = function(){
      console.log("this is: ", this);
      console.log(this.fullName + " likes " + this.fav);
    };

}

var nelson = new Person();

nelson.describe();

// the reason for being undefined
var describe = nelson.describe;
describe();
describe.call(nelson);