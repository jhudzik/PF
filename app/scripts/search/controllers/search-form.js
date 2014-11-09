
'use strict';

angular.module('pfSearch')
	.controller('searchFormCtrl',
		function($scope, $location, searchFactory) {
			$scope.searchParams = {
				cap: 50,
				size: 'z'
			};
			/**
			 * 
			 */
			 $scope.search = function() {
			 	searchFactory
			 		.search($scope.searchParams)
			 		.then(
			 			function(resp) {
			 				$location.url('/results');
			 			},
			 			function(err) {
			 				
			 			}
			 		)
			 };
		}
	);