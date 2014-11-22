
'use strict';

angular.module('pfPhoto')
	.directive('photo',
		function(searchFactory) {
			return {
				controller: function($scope, $timeout) {
					$scope.showMenu = false;
					/**
					 * @param {Number} index
					 */
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
					/**
					 *	Toggle display of photo menu (fired
					 *	on ngTouch swipe events).
					 *	@param {String} [toggleState] - Passing
					 *		the value 'open' will display the
					 *		menu. Calling with no argument will
					 *		hide the menu.
					 */
					$scope.toggleMenu = function(toggleState) {
						$scope.showMenu = toggleState === 'open';
					};
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