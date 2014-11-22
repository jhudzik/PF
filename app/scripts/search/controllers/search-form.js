
'use strict';

angular.module('pfSearch')
	.controller('searchFormCtrl',
		function($scope, $rootScope, $location, searchFactory, $interval) {
			$rootScope.searchTerms = [];
			$scope.collapsed = true;
			$scope.datesCollapsed = true;
			$scope.searchParams = {
				cap: 10,
				size: 'z'
			};
			/**
			 *
			 */
			 $scope.search = function() {
			 	searchFactory
			 		.search($scope.searchParams)
			 		.then(
			 			function() {
			 				$rootScope.searchTerms.unshift($scope.searchParams.tags);
			 				$location.url('/results');
			 			},
			 			function(err) {
			 			}
			 		)
			 		.finally(function() {
			 			$scope.collapsed = true;
			 		});
			 };
			 $scope.toggleDates = function() {
			 	$scope.datesCollapsed = !$scope.datesCollapsed;
			 };
			 $scope.$on('menuToggle', function() {
			 	$scope.collapsed = !$scope.collapsed;
			 });
		}
	);