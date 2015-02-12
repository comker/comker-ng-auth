var app = angular.module('comkerNgAuthDemo', ['comkerNgAuth']);

app.controller('comkerNgAuthDemo', ['$scope', function($scope) {
    $scope.invoice = {
        items: [{
            qty: 10,
            description: 'item',
            cost: 9.95}]
    };

    $scope.modalShown = false;
	$scope.toggleModal = function() {
	    $scope.modalShown = !$scope.modalShown;
	};
}]);