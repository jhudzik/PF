
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
				},
				restrict: 'A'
			};
		}
	);