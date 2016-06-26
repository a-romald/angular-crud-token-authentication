angular.module('app').controller('MainCtrl', function($scope, $rootScope, $localStorage) {
	
	var vm = this;

	$rootScope.PAGE = "main";
	
	if (undefined !== $localStorage.user) {
		$rootScope.USER = true;
	}
	else {
		$rootScope.USER = false;
	}

	
	if (undefined !== $localStorage.user) {
		var username = $localStorage.user.username;
		vm.title = username + ", Welcome To Notes Application!";
	}
	else vm.title = "Welcome To Notes Application! You must be authorized to use this service.";
	
});