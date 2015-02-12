(function () {

	"use strict";

    var comker = angular.module('comkerNgAuth', []);

    comker.directive('comkerNgAuth', ['$timeout', function($timeout) {

    	return {
	        restrict: 'E',
	        scope: { records: '=' },
	        templateUrl: 'tmpl/comker-ng-auth.html',
	        replace: true,
	        link: function($scope, element, attrs) {
	        	$scope.addItem = function() {
			        $scope.records.items.push({
			            qty: 1,
			            description: '',
			            cost: 0
			        });
			    },

			    $scope.removeItem = function(index) {
			        $scope.records.items.splice(index, 1);
			    },

			    $scope.total = function() {
			        var total = 0;
			        angular.forEach($scope.records.items, function(item) {
			            total += item.qty * item.cost;
			        })

			        return total;
			    }
	        }
	    }
    }]);
}());

(function () {

    "use strict";

    var comker = angular.module('comkerNgAuth');

    comker.directive('comkerNgAuthDialog', ['$timeout', function($timeout) {
        
        return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    templateUrl: 'tmpl/comker-ng-auth-dialog.html'
  };

    }]);
}());

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

angular.module('comkerNgAuth').run(['$templateCache', function ($templateCache) {
	$templateCache.put('tmpl/comker-ng-auth-dialog.html', '<div class=\'ng-modal\' ng-show=\'show\'> <div class=\'ng-modal-overlay\' ng-click=\'hideModal()\'></div> <div class=\'ng-modal-dialog\' ng-style=\'dialogStyle\'> <div class=\'ng-modal-close\' ng-click=\'hideModal()\'>X</div> <div class=\'ng-modal-dialog-content\' ng-transclude></div> </div> </div>');
	$templateCache.put('tmpl/comker-ng-auth-login.html', '<section class="main"> <h1><span class="brand"><img src="{{setup.logo}}" title="{{setup.brand}}"></span></h1> <form name="loginForm" novalidate ng-submit="login(user)"> <fieldset class="login"> <div class="form-group"> <label for="email" class="control-label">{{\'Email\'}}</label> <input id="email" type="email" autocomplete="off" class="form-control" tabindex="1" ng-model="user.email" required> </div> <div class="form-group"> <label for="password" class="control-label">{{\'Password\'}} <a class="forgot-link" ui-sref="forgot({ id: friendlyId })" tabindex="4">{{\'Forgot your Password?\'}}</a> </label> <input id="password" type="Password" autocomplete="off" class="form-control" tabindex="2" ng-model="user.password" required> </div> <span class="actions"> <button class="primary-button" type="submit" tabindex="3">{{\'Login\'}} <i class="fa fa-angle-right fa-white"></i></button> </span> </fieldset> </form> <small>{{setup.app}} {{setup.version}} &mdash; {{setup.copy}}</small> </section> ');
	$templateCache.put('tmpl/comker-ng-auth.html', '<div> <table class="table"> <tr> <th>Description</th> <th>Qty</th> <th>Cost</th> <th>Total (Number)</th> <th></th> </tr> <tr ng:repeat="item in records.items"> <td><input type="text" ng:model="item.description"class="input-small"></td> <td><input type="number" ng:model="item.qty" ng:required class="input-mini"></td> <td><input type="number" ng:model="item.cost" ng:required class="input-mini"></td> <td>{{item.qty * item.cost | currency}}</td> <td> [<a href ng:click="removeItem($index)">X</a>] </td> </tr> <tr> <td><a href ng:click="addItem()" class="btn btn-small">add item</a></td> <td></td> <td>Total:</td> <td>{{total() | currency}}</td> </tr> </table> </div>');
}]);