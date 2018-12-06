var uri = 'http://localhost:4100/Addresses';
var app = angular.module('demo', []);
app.controller("search", function($scope, $http) {
	$scope.submit = function (id) {
		$scope.addresses = null;
		$scope.persons = null;
		var path = uri + '/' + id;
		$scope.myUri = path
		$http.get(path).
        then(function(response) {
            $scope.addresses = response.data;
        });
	}
	$scope.searchByState = function (state) {
		$scope.addresses = null;
		$scope.persons = null;
		var path = uri + '?' + "State=" + state;
		$scope.myUri = path;
		$http.get(path).
        then(function(response) {
            $scope.addresses = response.data;
        });
	}
	$scope.findPerson = function (id) {
		$scope.addresses = null;
		$scope.persons = null;
		var path = uri + '/' + id + '/' + 'persons';
		$scope.myUri = path;
		$http.get(path).
        then(function(response) {
            $scope.addresses = response.data["addresses"];
            $scope.persons = response.data["persons"];
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
	$scope.addresses = null;
	$scope.add = function (address) {
		var data = angular.copy(address);
		$scope.data = data;
		$http.post(uri, data).
        then(function(response) {
        	$scope.responseCode = response.status;
        	$scope.affected = response.data;
        }).
        then(function() {
	       	$http.get(uri).
	        then(function(response) {
	        	$scope.addresses = response.data;
	        });
        });
	}
	$scope.show = function() {
		$http.get(uri).
	    then(function(response) {
	        $scope.addresses = response.data;
	    });
	}
})