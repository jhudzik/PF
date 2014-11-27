
'use strict';

angular.module('pfCommon')
	.directive('pfGallery',
		function($rootScope, $window) {
			return {
				link: function(scope, elem) {
					var mql = $window.matchMedia('(max-width: 700px)');
					if(mql.matches) {
						$rootScope.ltDesktop = true;
						elem.on('click', 'figure', function() {
							$(this)
								.find('figcaption')
								.toggleClass('visible');
						});
					}
					// rollback to top on a new search
					scope.$on('pfSearch', function() {
						$window.scrollTo(0,0);
					});
				},
				restrict: 'A'
			};
		}
	);