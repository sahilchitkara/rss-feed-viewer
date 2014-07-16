(function (angular) {

  angular.module('rssFeed.states', [])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

      $stateProvider
        .state('rssLinks', {
          url: '/view/rss',
          views: {
            '@': {
              templateUrl: '/partials/viewRss.html',
              controller: 'viewRssController'
            }
          }
        });

      // Optional Category ID Rule
      $urlRouterProvider
        .when('/', '/login');

    }]);

  // Application Module
  angular.module('rssFeed', [
      'ngRoute',
      'ui.router',
      'rssFeed.states',
    ]).config(['$locationProvider', '$interpolateProvider', '$stateProvider', '$urlRouterProvider', '$routeProvider', '$httpProvider', function($locationProvider, $interpolateProvider, $stateProvider, $urlRouterProvider, $routeProvider, $httpProvider) {

      $interpolateProvider
        .startSymbol('[[')
        .endSymbol(']]');

      // # Poundless Routing
      $locationProvider.html5Mode(false);

      // Convenience Redirections
      $urlRouterProvider
        .otherwise('/');

      // Kill trailing slashes
      $urlRouterProvider.rule(function($injector, $location) {
        var path = $location.path();

        // Trailing slash remove if exists
        if (path[path.length - 1] === '/') {
          return path.substring(0, path.length - 1);
        } else {
          return;
        }

      });

      delete $httpProvider.defaults.headers.common['X-Requested-With'];

    }]).run(['$rootScope', '$state', '$stateParams', '$window', function ($rootScope, $state, $stateParams, $window) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      });
    }]);


}(window.angular));