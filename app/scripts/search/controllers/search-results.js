
'use strict';

angular.module('pfSearch')
	.controller('searchResultsCtrl',
		function($scope, searchFactory) {
			$scope.photos = searchFactory.photos;
			$scope.clear = function() {
				searchFactory.clear();
				//$rootScope.searchTerms = [];
			};
			/* watch the length of our photo result set
			   to determine if 'clear' should be enabled */
			$scope.$watch('photos.length', function(length) {
				$scope.clearDisabled = length === 0;
			});
		}
	);