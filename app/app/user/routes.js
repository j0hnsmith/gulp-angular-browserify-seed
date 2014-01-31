'use strict';

module.exports = function($routeProvider) {
    $routeProvider
        .when('/user/', {
            templateUrl: '/app/user/templates/user.html',
            controller: 'UserCtrl'
        });
};
