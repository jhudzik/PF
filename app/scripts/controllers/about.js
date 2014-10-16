'use strict';

/**
 * @ngdoc function
 * @name pfApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pfApp
 */
angular.module('pfApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
