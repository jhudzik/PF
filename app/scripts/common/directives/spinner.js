
'use strict';

angular.module('pfCommon')
	.directive('spinner',
		function() {
			return {
				link: function(scope, elem, attrs) {
					scope.$on(scope.on, function() {
						elem.addClass('active');
					});
					scope.$on(scope.off, function() {
						elem.removeClass('active');
					});
				},
				replace: true,
				restrict: 'E',
				scope: {
					off: '@',
					on: '@',
					type: '@'
				},
				template: '<div class="overlay" ng-class="type"><div class="spinner"></div></div>'
			};
		}
	);