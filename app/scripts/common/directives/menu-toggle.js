
'use strict';

angular.module('pfCommon')
	.directive('menuToggle',
		function($rootScope) {
			return {
				link: function(scope, elem) {
					elem.on('click', function() {
						scope.$apply(function() {
							$rootScope.$broadcast('menuToggle');
						});
					});
				},
				replace: true,
				restrict: 'E',
				templateUrl: 'views/common/menu-toggle.html'
			};
		}
	);