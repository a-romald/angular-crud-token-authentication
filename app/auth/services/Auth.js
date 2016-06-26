angular.module('app').factory('Auth', ['$http', '$window', '$rootScope', '$localStorage', function($http, $window, $rootScope, $localStorage) {

    var auth = {};

    auth.register = function(user) {
        $http({method: 'POST', url: 'backend/auth/register.php', data: user})
            .success(function(data, status, headers, config) {                
                $rootScope.$broadcast('user:added', data);
                if (data.status == 'ok') {
                    toastr.success('You are successfully registered!');
                    $window.location.href = '#/';
                }
                else {
                    var error = data.error;
                    toastr.error(error, 'Error!');
                }
            })
            .error(function(data, status, headers, config) {
                $rootScope.$broadcast('user:error', data);
                $window.location.href = '#/';
            });
    }


    auth.login = function(user) {
        $http({method: 'POST', url: 'backend/auth/login.php', data: user})
            .success(function(data, status, headers, config) {
                $localStorage.user = {};
                $rootScope.$broadcast('user:logged', data);
                if (data.status == 'ok') {
                    toastr.success('You are successfully logged in!');
                    $localStorage.user.username = data.user.username;
                    $localStorage.user.token = data.user.token;
                    $window.location.href = '#/';
                }
                else {
                    var error = data.error;
                    toastr.error(error, 'Error!');
                }
            })
            .error(function(data, status, headers, config) {
                $rootScope.$broadcast('user:error', data);
                $window.location.href = '#/';
            });
    }



    auth.logout = function() {
        delete $localStorage.user;
        toastr.success('You are successfully logged out!');
        $window.location.href = '#/';
    }

    

    return auth;

    
}]);
