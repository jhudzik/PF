
'use strict';

angular.module('pfSearch')
	.factory('flickrFactory',
		function() {
			var flickr = {
				photos: {
					getInfo: function(params) {
						return {
							format: 'json',
							method: 'flickr.photos.getInfo',
							nojsoncallback: '1',
							photo_id: params.id
						};
					},
					search: function(params) {
						var flickrizedParams = {
							format: 'json',
							method: 'flickr.photos.search',
							nojsoncallback: '1',
							per_page: params.cap,
							tags: params.tags,
							tag_mode: 'all'
						};
						/* The following params are not required, but may be included
						   based on the search model (params). */
						if(params.minDateTaken) {
							flickrizedParams.min_taken_date = params.minDateTaken;
						}
						if(params.maxDateTaken) {
							flickrizedParams.max_taken_date = params.maxDateTaken;
						}
						return flickrizedParams;
					}
				}
			};
			return {
				/**
				 * @param {Object} photoData
				 * @param {String} size
				 */
				assemblePhotos: (function() {
					var urlBase = 'http://farm';
					return function(photoData, size) {
						var photoData,
							photo,
							src,
							photos = [];
						for(var i = 0, len = photoData.length; i < len; i++) {
							src = urlBase;
							photo = photoData[i];
							src += photo.farm + '.static.flickr.com/' + photo.server + '/'
								+  photo.id + '_' + photo.secret + '_' + size + '.jpg';
							photos.push({id: photo.id, src: src, title: photo.title});
						}
						return photos;
					}
				})(),
				/**
				 * Translate request (model) params for the flickr api
				 * based on flickr method.
				 * @param {String} method - The flickr method to adhere to
				 * @param {Object} params - The params to map to the flickr api
				 * @return {Object} 
				 */
				flickrize: function(method, params) {
					var methodComponents = method.split('.').slice(1);
					return flickr[methodComponents[0]][methodComponents[1]](params);
				}
			};
		}
	);