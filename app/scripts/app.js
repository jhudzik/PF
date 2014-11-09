'use strict';

angular
	.module('photoFetch', [
		'ngAnimate',
		'ngRoute',
		'ngResource',
		'ngSanitize',
		'pfCommon',
		'pfSearch',
		'pfPhoto'
	])
	.config(function($routeProvider, $httpProvider) {
		$routeProvider
			.when('/results', {
				controller: 'searchResultsCtrl',
				templateUrl: 'views/search/search-results.html'
			})
			.otherwise({
				redirectTo: '/'
			});

		$httpProvider.interceptors.push(function($rootScope) {
			var apiRoute = /^\/?api\/(?!info)/; // api routes (/api/info excluded)
			return {
				request: function(config) {
					if(config.url.search(apiRoute) > -1) {
						$rootScope.$broadcast('apiReq');
					}
					return config;
				},
				response: function(response) {
					if(response.config.url.search(apiRoute) > -1) {
						$rootScope.$broadcast('apiReqEnd');						
					}
					return response;
				}
			}
		});
	});