var uri = 'http://localhost:4300/Persons';
var app = angular.module('demo', []);
app.controller("search", function($scope, $http) {
	$scope.submit = function (id) {
		$scope.persons = null;
		$scope.addresses = null;
		var path = uri + '/' + id;
		$scope.myUri = path
		$http.get(path).
        then(function(response) {
            $scope.persons = response.data;
        });
	}
	$scope.searchByName = function (lastName) {
		$scope.persons = null;
		$scope.addresses = null;
		var path = uri + '?' + "LastName=" + lastName;
		$scope.myUri = path;
		$http.get(path).
        then(function(response) {
            $scope.persons = response.data;
        });
	}
	$scope.findAddr = function (id) {
		$scope.persons = null;
		$scope.addresses = null;
		var path = uri + '/' + id + '/' + 'addresses';
		$scope.myUri = path;
		$http.get(path).
        then(function(response) {
            $scope.persons = response.data["persons"];
            $scope.addresses = response.data["addresses"];
        });
	}
});

app.controller("delete", function($scope, $http) {
	$scope.delete = function (id) {
		var path = uri + '/' + id
		$scope.myUri = path;
		$http.delete(path).
        then(function(response) {
            $scope.responseCode = response.status;
            $scope.affected = response.data;
        });
	}
});

app.controller("add", function($scope, $http) {
	$scope.persons = null;
	$scope.add = function (person) {
		var data = angular.copy(person);
		$scope.data = data;
		$http.post(uri, data).
        then(function(response) {
        	$scope.responseCode = response.status;
        	$scope.affected = response.data;
        }).
        then(function() {
	       	$http.get(uri).
	        then(function(response) {
	        	$scope.persons = response.data;
	        });
        });
	}
	$scope.show = function() {
		$http.get(uri).
	    then(function(response) {
	        $scope.persons = response.data;
	    });
	}
})