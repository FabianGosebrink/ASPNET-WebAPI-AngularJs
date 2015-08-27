!function(){"use strict";angular.module("AngularJsDemoApp",["ngRoute","ngAnimate","ngResource","ui.bootstrap","angular-loading-bar","toastr","app.common","home.homeModule","contact.contactModule"]).config(["cfpLoadingBarProvider",function(e){e.includeSpinner=!1}])}(),function(){"use strict";angular.module("app.common",[])}(),function(){"use strict";function e(e){e.when("/contact",{controller:"contact.controllers.contactController",templateUrl:"app/Contact/Templates/contact.html"}).otherwise({redirectTo:"/"})}var o=angular.module("contact.contactModule",["ngRoute"]);o.config(e),e.$inject=["$routeProvider"]}(),function(){"use strict";function e(e){e.when("/",{controller:"home.controllers.homeController",controllerAs:"viewModel",templateUrl:"app/Home/Templates/overview.html"}).otherwise({redirectTo:"/"})}var o=angular.module("home.homeModule",["ngRoute"]);o.config(e),e.$inject=["$routeProvider"]}(),function(){"use strict";function e(){function e(e,o){for(var r=0;r<e.length;r++)if(e[r].Id===o.Id)return!0;return!1}function o(e,o){for(var r=e.length;r--;)e[r].Id===o.Id&&e.splice(r,1)}function r(e,o){for(var r=0;r<e.length;r++)e[r].Id===o.Id&&(e[r]=o)}function n(e,o){e.splice(0,0,o)}var t={removeFromArray:o,replaceItemInArray:r,isItemInArray:e,addItemToArray:n};return t}angular.module("app.common").factory("common.services.arrayHelper",e),e.$inject=[]}(),function(){"use strict";function e(){}angular.module("contact.contactModule").controller("contact.controllers.contactController",e),e.$inject=[]}(),function(){"use strict";function e(e,o,r){var n=this;n.peopleService=e,n.newPerson={};var t=function(){r.start(),e.getAllPeople().then(function(){},function(){o.error("An Error occured","Error")}).then(function(){r.complete()})},c=function(){e.addPerson(n.newPerson).then(function(){n.newPerson=null,o.success("Person added","Success!")},function(e){var r=[];for(var n in e.data.ModelState)for(var t=0;t<e.data.ModelState[n].length;t++)r+=e.data.ModelState[n][t]+"\r\n";o.error(r,"Error")})},a=function(r){e.deletePerson(r).then(function(){o.success("Person deleted","Success!")},function(){o.error("An Error occured","Error")})};t(),n.addPerson=c,n.deletePerson=a}angular.module("home.homeModule").controller("home.controllers.homeController",e),e.$inject=["home.services.peopleService","toastr","cfpLoadingBar"]}(),function(){"use strict";function e(e,o,r){var n="api/home/",t=[],c=function(){var r=o.defer();return e.get(n).then(function(e){angular.copy(e.data,t),r.resolve(e)},function(){r.reject()}),r.promise},a=function(c){var a=o.defer();return e.post(n,c).then(function(e){r.addItemToArray(t,e.data),a.resolve(e)},function(e){a.reject(e)}),a.promise},l=function(r){var c=o.defer();return e["delete"](n+r.Id).then(function(e){for(var o=t.length;o--;)t[o].Id===r.Id&&t.splice(o,1);c.resolve(e)},function(){c.reject()}),c.promise};return{getAllPeople:c,addPerson:a,deletePerson:l,allPeople:t}}angular.module("home.homeModule").factory("home.services.peopleService",e),e.$inject=["$http","$q","common.services.arrayHelper"]}();