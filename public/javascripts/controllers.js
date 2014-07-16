(function (angular) {

    angular.module('rssFeed')
        .controller('viewRssController', ['$rootScope', '$scope', '$http', '$state', '$stateParams', function ($rootScope, $scope, $http, $state, $stateParams) {

            $scope.rssFeedUrl = '';

            $scope.addRssFeedUrl = function () {
                $http.post('/rss/add', {url: $scope.rssFeedUrl}).success(function (data) {
                    console.log("Successfully added rss url");
                    console.log(data);
                }).error(function (err) {
                        console.log("Server Error,Unable to add rss urls", err);
                    });
                $scope.message = '';
            };

            $scope.logout = function () {
                window.location.href = '/logout';
            };

        }])
        .controller('authController', ['$rootScope', '$scope', '$http', '$state', '$stateParams', function ($rootScope, $scope, $http, $state, $stateParams) {
            $scope.user = {}
            $scope.login = function () {
                $http({method: 'post', url: '/login', data: {email: $scope.user.name, password: $scope.user.password}}).success(function (data) {
                    $rootScope.userDetails = data.userDetails;
                    $state.go('rssLinks');
                }).error(function (err) {
                        $state.go('login');
                    });
            };
            $scope.signup=function(){
                $http({method: 'post', url: '/signup', data: {email: $scope.user.name, password: $scope.user.password}}).success(function (data) {
                    console.log("Succesfuully logged in",data);
                    $state.go('login');
                }).error(function (err) {
                        alert('Server Error Please try again later')
                        $state.go('login');
                    });
            }

            $scope.signup=function(){
                $state.go('signup');
            };
            $scope.login=function(){
                $state.go('login');
            }

        }])
}(window.angular));