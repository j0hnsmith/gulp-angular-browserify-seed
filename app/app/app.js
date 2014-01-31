'use strict';

require('angular');
require('angular-route');

//Declare app level module and dependencies
angular.module('sampleApp', [
        'ngRoute',
        require('./user').name
    ])
    .controller('MainCtrl', ['$scope', require('./mainctrl')])
    .config(['$routeProvider', require('./common/routes')])
    .config(['$routeProvider', require('./user/routes')]);
