if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery');
}

(function () {
    "use strict";
    angular.module('MSTechDaysApp',
    [
        'ngRoute',
        'ngAnimate',
        'ngResource',
        "ui.bootstrap",
        'angular-loading-bar',
        "toastr",

        'home.homeModule',
        'contact.contactModule'
    ]).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);
}
());


