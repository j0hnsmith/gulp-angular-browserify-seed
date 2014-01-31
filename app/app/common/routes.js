'use strict';

module.exports = function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/templates/home.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
};
