(function () {
    'use strict';

    angular
        .module('home.homeModule')
        .controller('home.controllers.homeController', HomeController);

    HomeController.$inject = ['home.services.peopleService', 'toastr', 'cfpLoadingBar'];
    /* @ngInject */
    function HomeController(peopleService, toastr, cfpLoadingBar) {
        
        var vm = this;

        vm.peopleService = peopleService;
        vm.newPerson = {};

        var getPeople = function () {
            cfpLoadingBar.start();

            peopleService.getAllPeople().then(
                function () {
                    //Success
                },
                function () {
                    //Error
                    toastr.error("An Error occured", "Error");
                }).then(function () {
                    cfpLoadingBar.complete();
                });
        };

        var addPerson = function () {
            peopleService.addPerson(vm.newPerson)
                .then(
                    function () {
                        vm.newPerson = null;
                        toastr.success('Person added', 'Success!');
                    },
                    function (response) {
                        //Error
                        var errors = [];
                        for (var key in response.data.ModelState) {
                            for (var i = 0; i < response.data.ModelState[key].length; i++) {
                                errors += response.data.ModelState[key][i] + "\r\n";
                            }
                        }
                        toastr.error(errors, "Error");
                    }
                );
        };

        var deletePerson = function (personToDelete) {
            peopleService.deletePerson(personToDelete)
                .then(
                    function () {
                        toastr.success('Person deleted', 'Success!');
                    },
                    function () {
                        //Error
                        toastr.error("An Error occured", "Error");
                    });
        };

        getPeople();

        vm.addPerson = addPerson;
        vm.deletePerson = deletePerson;

    }
})();