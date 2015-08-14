(function () {
    "use strict";
    angular.module('MSTechDaysApp',
    [
        'ngRoute',
        'ngResource',
        'toaster',
        'chieffancypants.loadingBar',

        'home.homeModule',
        'contact.contactModule'
    ]).config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);
}
());

