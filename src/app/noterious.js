'use strict';

angular.module('noterious', [
  'ui.router',
  'ngAnimate',
  'firebase',
  'noterious.common'
])
  .constant('ENDPOINT_URI', 'https://noterious.firebaseio.com/')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/login/login.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('boards', {
        url: '/boards',
        templateUrl: 'app/boards/boards.tmpl.html',
        controller: 'BoardsCtrl',
        // attaches boards name to scope to create a more explicit reference
        controllerAs: 'boards'
      })
    ;

    /* HINT: Add this to your boards route to force authentication
     resolve: {
       'currentUser': ['Auth', function (Auth) {
        return Auth.$requireAuth();
       }]
     }
     */
  })
  .run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    });
  })
;
