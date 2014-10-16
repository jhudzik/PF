'use strict';

/**
 * @ngdoc function
 * @name pfApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pfApp
 */
angular.module('pfApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
