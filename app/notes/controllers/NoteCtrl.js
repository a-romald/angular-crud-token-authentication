angular.module('app').controller('NoteCtrl', function($scope, $rootScope, $http, $routeParams, $route, $location, $window, $localStorage, Note, Pagination) {

	var vm = this;

	$rootScope.PAGE = "note";	

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


	//Sort functions
	$scope.sortField = undefined;
  	$scope.reverse = false;
  	//Sort items
  	$scope.sort = function(fieldName) {
      if ($scope.sortField === fieldName) {
        $scope.reverse = !$scope.reverse;
      }
      else {
        $scope.sortField = fieldName;
        $scope.reverse = false;
      }
  	}
	//Sort direction
    $scope.isSortUp = function(fieldName) {
       return $scope.sortField === fieldName && !$scope.reverse;
    }

    $scope.isSortDown = function(fieldName) {
       return $scope.sortField === fieldName && $scope.reverse;
    }
    //end sort
    



    /**
     * Location dependencies
     */

	//Note List
	if (locationPath == '/notes') {		

		vm.title = "All Notes List";
		vm.allNotes = [];

		//Delete Note
		vm.delNote = function(id) {
			if (confirm('Are you sure to delete this item?')) {
				if (id > 0) {
					Note.delete(id);
				}
			}			
		}


		function getRecords() {
			var token = $localStorage.user ? $localStorage.user.token : null;
			return $http({method: 'GET', url: 'backend/note/list.php?token=' + token})
				    .success(function(data, status, headers, config) {
				    	if (data.status == 'ok') {
				    		$scope.records = true;
				    		vm.allNotes = data.records;
				        	$rootScope.$broadcast('records:selected');
				        	//Pagination
							$scope.pagination = Pagination.getNew(4);//records on page
							//$scope.pagination.perPage = 4; //the same						
							$scope.pagination.numPages = Math.ceil(vm.allNotes.length/$scope.pagination.perPage);
							//$scope.pagination.numPages = 3;
				    	}
				    	else {
				    		$scope.records = false;
				    		vm.allNotes = null;
				        	$rootScope.$broadcast('records:error');				        	  
				        }       
				    })					
				    .error(function(data, status, headers, config) {
				        //console.log(data);
				    });
		}

		getRecords();
			
	}

	
	



	//Detailed Note
	if (p1 == 'note' && p2 == 'view') {

		if (undefined == $localStorage.user) {
			toastr.info('You must log in to use this service!');
			$location.path('/notes');
		}

		vm.detailTitle = "Detailed Note";
		vm.detailNote = [];

		var id = parseInt($routeParams.id);
		if (id > 0) {
			var token = $localStorage.user ? $localStorage.user.token : null;
			$http({method: 'GET', url: 'backend/note/detail.php?id=' + id + '&token=' + token})
			    .success(function(data, status, headers, config) {	    		
			    	if (data.status == 'ok') {
			    		vm.detailNote = data.record;
			        	$rootScope.$broadcast('record:view');	        	     	
			    	}
			    	else {
			    		var error = data.error;
			    		toastr.info(error, 'Error!');
			    		$rootScope.$broadcast('record:error');
			    		$location.path('/notes');
			    	}       
			    })
			    .error(function(data, status, headers, config) {
			        //console.log(data);
			    });
		}
		
	}



	//Create Note
	if (locationPath == '/note/create') {

		if (undefined == $localStorage.user) {
			toastr.info('You must log in to use this service!');
			$location.path('/notes');
		}

		vm.title = "Create Note";
		vm.shouldShow = function () {
            return true;
        };
        vm.cancelForm = function () {
            $window.history.back();
		};
		vm.newNote = {};
		vm.createNote = function() {
			if (Object.keys(vm.newNote).length > 0) {
				vm.newNote.token = $localStorage.user.token;
				Note.add(vm.newNote);
				vm.newNote = {};
			}			
		}
	}


	//Edit Note
	if (p1 == 'note' && p2 == 'edit') {

		if (undefined == $localStorage.user) {
			toastr.info('You must log in to use this service!');
			$location.path('/notes');
		}

		vm.editTitle = "Edit Note";
		vm.shouldShow = function () {
            return true;
        };
        vm.cancelForm = function () {
            $window.history.back();
		};

		vm.editNote = [];

		var id = parseInt($routeParams.id);
		if (id > 0) {
			var token = $localStorage.user ? $localStorage.user.token : null;
			$http({method: 'GET', url: 'backend/note/detail.php?id=' + id + '&token=' + token})			
			    .success(function(data, status, headers, config) {	    		
			    	if (data.status == 'ok') {
			    		vm.editNote = data.record;
			        	$rootScope.$broadcast('record:edit');        	     	
			    	}
			    	else {
			    		var error = data.error;
			    		toastr.info(error, 'Error!');
			    		$rootScope.$broadcast('record:error');
			    		$location.path('/notes');
			    	}       
			    })
			    .error(function(data, status, headers, config) {
			        //console.log(data);
			    });
		}

		vm.updateNote = function() {
			if (Object.keys(vm.editNote).length > 0) {
				//console.log(vm.editNote);  Object { id="2",  title="Second",  content="second note"}
				vm.editNote.token = $localStorage.user.token;
				Note.update(vm.editNote);
				vm.editNote = {};
			}				
		}
		
	}	


	console.log($location.path());
	
});