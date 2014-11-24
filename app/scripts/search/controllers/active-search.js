
'use strict';

angular.module('pfSearch')
	.run(function($anchorScroll) {
		//$anchorScroll.yOffset = 50;
	})
	.controller('activeSearchCtrl',
		function($scope, $location, $anchorScroll, searchFactory) {
			$scope.activeSearchMap = searchFactory.activeSearch.map;
			$scope.scrollToFragmentId = function(fragmentId) {
				$location.hash(fragmentId);
				$anchorScroll();
			};
		}
	);