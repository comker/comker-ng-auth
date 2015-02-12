(function () {

    "use strict";

    var comker = angular.module('comkerNgAuth');

    comker.directive('comkerNgAuthLogin', ['$timeout', function($timeout) {
        
        return {
            restrict: 'E',
            scope: { records: '=' },
            templateUrl: 'tmpl/comker-ng-auth-login.html',
            replace: true,
            link: function($scope, element, attrs) {
                console.log(element);
            }
        }

    }]);
}());
