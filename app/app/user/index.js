'use strict';

var userCtrl = require('./controllers/UserCtrl');

module.exports = angular.module('sampleApp.user', [])
    .controller('UserCtrl', ['$scope', userCtrl]);
