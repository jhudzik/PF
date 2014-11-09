
'use strict';

angular.module('pfSearch')
	.factory('searchFactory',
		function($http, $q, flickrFactory) {
			return {
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
								_this.searchResults = response.data;
								photos = flickrFactory.assemblePhotos(response.data.photos.photo, photoSize);
								angular.forEach(photos, function(photo) {
									_this.photos.unshift(photo);
								});
								deferred.resolve();
							},
							function(err) {
								deferred.reject(err);
							}
						);
					return deferred.promise;
				},
				searchResults: {},
			};
		}
	);