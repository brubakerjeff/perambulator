'use strict';

/**
 * @ngdoc function
 * @name perambulatorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the perambulatorApp
 */
angular.module('perambulatorApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
