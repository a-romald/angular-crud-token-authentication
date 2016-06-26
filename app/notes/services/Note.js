angular.module('app').factory('Note', ['$http', '$window', '$rootScope', '$localStorage', function($http, $window, $rootScope, $localStorage) {

    var note = {};
    
    note.add = function(note) {
        $http({method: 'POST', url: 'backend/note/add.php', data: note})
            .success(function(data, status, headers, config) {                
                $rootScope.$broadcast('record:added', data);
                if (data.status == 'ok') {
                    toastr.success('You added new note!');
                    $window.location.href = '#/notes';
                }
            })
            .error(function(data, status, headers, config) {
                $rootScope.$broadcast('record:error', data);
                $window.location.href = '#/notes';
            });
    }


    note.update = function(note) {
        $http({method: 'POST', url: 'backend/note/update.php', data: note})
            .success(function(data, status, headers, config) {
                $rootScope.$broadcast('record:updated', data);
                if (data.status == 'ok') {
                    toastr.success('You updated your note!');
                    $window.location.href = '#/notes';
                }
            })
            .error(function(data, status, headers, config) {
                $rootScope.$broadcast('record:error', data);
                $window.location.href = '#/notes';
            });
    }

    

    note.delete = function(id) {
        var token = $localStorage.user ? $localStorage.user.token : null;
        $http({method: 'GET', url: 'backend/note/delete.php?id=' + id + '&token=' + token})
            .success(function(data, status, headers, config) {
                $rootScope.$broadcast('record:deleted', data);
                if (data.status == 'ok') {
                    toastr.success('You deleted your note!');
                    $window.location.href = '#/notes';
                }
            })
            .error(function(data, status, headers, config) {
                var error = data.error;
                toastr.info(error, 'Error!');
                $rootScope.$broadcast('record:error');
                $window.location.href = '#/notes';
            });
    }


    return note;

    
}]);
