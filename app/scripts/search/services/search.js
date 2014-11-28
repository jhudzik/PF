
'use strict';

angular.module('pfSearch')
	.factory('searchFactory',
		function($http, $q, flickrFactory) {
			return {
				activeSearch: {
					add: function(tag, shiftAmt) {
						var _this = this,
							map = {};
						angular.forEach(this.map, function(val, key) {
							var activeSearchKey = parseInt(key, 10);
							map[activeSearchKey + shiftAmt] = val;
							delete _this.map[key];
						});
						delete this.map[0];
						map[0] = tag;
						angular.extend(_this.map, map);
					},
					shiftKeys: function(keyBoundary) {
						var keysToShift = [],
							map = angular.copy(this.map);
						angular.forEach(map, function(val, key) {
							key = parseInt(key, 10);
							if(key > keyBoundary) {
								keysToShift.push(key);
							}
						});
						for(var i = 0, len = keysToShift.length; i < len; i++) {
							var shiftedKey = keysToShift[i] - 1;
							map[shiftedKey] = map[keysToShift[i]];
							delete map[keysToShift[i]];
							delete this.map[keysToShift[i]];
						}
						angular.extend(this.map, map);
					},
					map: {}
				},
				clear: function() {
					this.photos.length = 0;
				},
				getPhotoInfo: function(index) {
					var params = flickrFactory.flickrize('flickr.photos.getInfo', this.photos[index]);
					return $http.get('/api/info', {params: params});
				},
				photos: [],
				removePhoto: function(index) {
					this.photos.splice(index, 1);
				},
				/**
				 * @params {Object} params -
				 */
				search: function(params) {
					var deferred = $q.defer(),
						_this = this,
						photoSize = params.size;
					params = flickrFactory.flickrize('flickr.photos.search', params);
					$http
						.get('/api/search', {
							params: params
						})
						.then(
							function(response) {
								var photos;
								//_this.searchResults = response.data;
								photos = flickrFactory.assemblePhotos(response.data.photos.photo, photoSize);
								angular.forEach(photos, function(photo) {
									_this.photos.unshift(photo);
								});
								deferred.resolve(photos);
							},
							function(err) {
								deferred.reject(err);
							}
						);
					return deferred.promise;
				}
			};
		}
	);