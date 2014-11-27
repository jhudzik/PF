
'use strict';

angular.module('pfSearch')
	.run(function($anchorScroll) {
		$anchorScroll.yOffset = 110;
	})
	.controller('activeSearchCtrl',
		function($scope, $location, $anchorScroll, searchFactory) {
			$scope.activeSearchMap = searchFactory.activeSearch.map;
			$scope.scrollToFragmentId = function(fragmentId) {
				$location.hash(fragmentId);
				$scope.activeSection = fragmentId;
				$anchorScroll();
			};
		}
	);