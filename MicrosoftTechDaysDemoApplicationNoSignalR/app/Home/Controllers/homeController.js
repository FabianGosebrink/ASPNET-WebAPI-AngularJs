(function () {
    "use strict";
    angular.module('home.homeModule').controller('home.controllers.homeController', [
        'home.services.peopleService', 'toaster', 'cfpLoadingBar',
        function (peopleService, toaster, cfpLoadingBar) {

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
                        toaster.pop("Error", "Error", "Error");
                    }).then(function () {
                        cfpLoadingBar.complete();
                    });
            };

            var _addPerson = function () {
                peopleService.addPerson(vm.newPerson)
                    .then(
                        function () {
                            vm.newPerson = null;
                            toaster.pop("success", "Success", "Person added");
                        },
                        function () {
                            //Error
                            toaster.pop("Error", "Error", "Error while adding person");
                        }
                    );
            };

            var _deletePerson = function (personToDelete) {
                peopleService.deletePerson(personToDelete)
                    .then(
                        function () {
                            toaster.pop("success", "Success", "Person deleted");
                        },
                        function () {
                            //Error
                            toaster.pop("Error", "Error", "Error while removing person");
                        });
            };

            getPeople();

            vm.addPerson = _addPerson;
            vm.deletePerson = _deletePerson;
        }
    ]);

})();