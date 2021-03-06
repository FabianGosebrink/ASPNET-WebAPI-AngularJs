﻿(function () {
    "use strict";

    angular
        .module("home.homeModule")
        .factory("home.services.peopleService", peopleService);

    peopleService.$inject = ["$http", "$q", "appSettings", "_"];

    /* @ngInject */
    function peopleService($http, $q, appSettings, _) {

        var url = appSettings.serverPath + "api/home/";

        var _allPeople = [];

        var _getAllPeople = function () {

            var deferred = $q.defer();

            $http.get(url)
                .then(function (result) {
                    // Successful
                    angular.copy(result.data, _allPeople);
                    deferred.resolve(result);
                },
                    function () {
                        // Error
                        deferred.reject();
                    });

            return deferred.promise;
        };

        var _addPerson = function (newPersonToAdd) {

            var deferred = $q.defer();

            $http.post(url, newPersonToAdd)
                .then(function (result) {
                    // Successful
                    _allPeople.push(result.data);

                    deferred.resolve(result);
                },
                    function (result) {
                        // Error
                        deferred.reject(result);
                    });

            return deferred.promise;
        };

        var _deletePerson = function(personToDelete) {

            var deferred = $q.defer();

            $http.delete(url + personToDelete.Id)
                .then(function(result) {
                        // Successful
                        _.remove(_allPeople, function(person) {
                            return person.Id === personToDelete.Id;
                        });
                        deferred.resolve(result);
                    },
                    function() {
                        // Error
                        deferred.reject();
                    });

            return deferred.promise;
        };

        return {
            getAllPeople: _getAllPeople,
            addPerson: _addPerson,
            deletePerson: _deletePerson,
            allPeople: _allPeople
        };
    }
})();
