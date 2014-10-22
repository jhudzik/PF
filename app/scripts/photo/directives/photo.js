
'use strict';

angular.module('pfPhoto')
	.directive('photo',
		function(searchFactory) {
			return {
				controller: function($scope, $element, $timeout) {
					$scope.getInfo = function(index) {
						var info,
							figure = $element.children().eq(0);
						figure.addClass('get-info');
						searchFactory
							.getPhotoInfo(index)
							.then(
								function(response) {
									info = response.data.photo;
									console.log(info);
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
									figure.removeClass('get-info');
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