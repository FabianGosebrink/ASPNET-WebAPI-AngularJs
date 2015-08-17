(function () {
    "use strict";
    angular.module('home.homeModule').controller('home.controllers.homeController', [
        'home.services.peopleService', 'toastr', 'cfpLoadingBar',
        function (peopleService, toastr, cfpLoadingBar) {

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

            var _addPerson = function () {
                peopleService.addPerson(vm.newPerson)
                    .then(
                        function () {
                            vm.newPerson = null;
                            toastr.pop("success", "Success", "Person added");
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

            var _deletePerson = function (personToDelete) {
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

            vm.addPerson = _addPerson;
            vm.deletePerson = _deletePerson;
        }
    ]);

})();