angular.module('app').controller('AuthCtrl', function($scope, $rootScope, $http, $routeParams, $route, $location, $localStorage, Auth) {

	var vm = this;

	if (undefined !== $localStorage.user) {
		$rootScope.USER = true;
	}
	else {
		$rootScope.USER = false;
	}
	
	//Route vars
	var routePath = $route.current.originalPath;
	var routeRegexp = $route.current.regexp;
	var locationPath = $location.path();

	var path = locationPath.split('/');
	var p1 = path[1];
	var p2 = path[2];


	//Toastr options
	toastr.options.timeOut = 2000;
	toastr.options.positionClass = "toast-top-right";

	//Form methods
	vm.shouldShow = function () {
        return true;
    };
    vm.cancelForm = function () {
        $window.history.back();
	};


	//Register
	if (locationPath == '/register') {

		$rootScope.PAGE = "register";
		vm.title = "Registration";		
		vm.newUser = {};

		vm.createUser = function() {
			if (Object.keys(vm.newUser).length > 0) {
				//console.log(vm.newUser);
				Auth.register(vm.newUser);
				vm.newUser = {};
			}			
		}

	}


	//Login
	if (locationPath == '/login') {

		$rootScope.PAGE = "login";
		vm.title = "Log In";		
		vm.currentUser = {};

		vm.logUser = function() {
			if (Object.keys(vm.currentUser).length > 0) {
				//console.log(vm.currentUser);
				Auth.login(vm.currentUser);
				vm.currentUser = {};
			}			
		}

	}


	//Logout
	if (locationPath == '/logout') {

		$rootScope.PAGE = "logout";		
		vm.title = "Log Out";
		Auth.logout();

	}



	
});