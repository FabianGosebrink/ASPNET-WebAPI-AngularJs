"use strict";
homeModule.controller('home.controllers.homeController', [
    '$scope', 'home.services.peopleService', 'toaster', 'cfpLoadingBar',
    function ($scope, peopleService, toaster, cfpLoadingBar) {

        $scope.peopleService = peopleService;
        $scope.newPerson = {};

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
            peopleService.addPerson($scope.newPerson)
                .then(
                    function () {
                        $scope.newPerson = null;
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

        $scope.addPerson = _addPerson;
        $scope.deletePerson = _deletePerson;
    }
]);

