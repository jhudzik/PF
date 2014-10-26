
'use strict';

angular.module('pfPhoto')
	.directive('photo',
		function(searchFactory) {
			return {
				controller: function($scope, $timeout) {
					$scope.getInfo = function(index) {
						var info;
						$scope.$broadcast('getInfo');
						searchFactory
							.getPhotoInfo(index)
							.then(
								function(response) {
									info = response.data.photo;
									$scope.details = {
										dateTaken: new Date(info.dates.taken),
										description: info.description._content,
										notes: info.notes.note,
										owner: info.owner
									};
								}
							)
							.finally(function() {
								$timeout(function() {
									$scope.$broadcast('infoResponse');
								}, 500);
							});
					};
					$scope.remove = function(index) {
						searchFactory.removePhoto(index);
					};
				},
				link: function(scope, elem, attrs) {

				},
				restrict: 'E',
				scope: {
					index: '@',
					src: '=',
					title: '='
				},
				templateUrl: 'views/photo/photo.html'
			};
		}
	);