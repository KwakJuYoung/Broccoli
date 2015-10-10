'use strict';

angular.module('broccoliApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('searh', {
        url: '/search',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });
