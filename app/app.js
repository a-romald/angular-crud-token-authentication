var app = angular.module('app', ['ngRoute', 'simplePagination', 'ngStorage']);

/* Route Config */
app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
          templateUrl:'app/main/main.html',
          controller:'MainCtrl',
          controllerAs: 'main',
        })
        .when('/notes',{
          templateUrl:'app/notes/views/list.html',
          controller:'NoteCtrl',
          controllerAs: "note",
        })
        .when('/note/view/:id', {
          templateUrl:'app/notes/views/detail.html',
          controller:'NoteCtrl',
          controllerAs: "note",
        })
        .when('/note/create', {
          templateUrl:'app/notes/views/create.html',
          controller:'NoteCtrl',
          controllerAs: "note",
        })
        .when('/note/edit/:id', {
          templateUrl:'app/notes/views/edit.html',
          controller:'NoteCtrl',
          controllerAs: "note",
        })
        .when('/note/delete/:id', {
          controller:'NoteCtrl',
          controllerAs: "note",
        })
        .when('/register',{
          templateUrl:'app/auth/views/register.html',
          controller:'AuthCtrl',
          controllerAs: "auth",
        })
        .when('/login',{
          templateUrl:'app/auth/views/login.html',
          controller:'AuthCtrl',
          controllerAs: "auth",
        })
        .when('/logout',{
          templateUrl:'app/auth/views/logout.html',
          controller:'AuthCtrl',
          controllerAs: "auth",
        })
        .otherwise({
          redirectTo: '/'
        });
		$locationProvider.html5Mode(false);
  }
);