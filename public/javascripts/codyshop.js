var app = angular.module('codyshop', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {templateUrl:'partials/home.html', controller: 'HomeCtrl'})
		.when('/add-video',{templateUrl:'partials/video-form.html', controller: 'AddVideoCtrl'})
		.when('/video/:id', {templateUrl:'partials/video-form.html', controller: 'EditVideoCtrl'})
		.when('/video/delete/:id',{templateUrl:'partials/video-delete.html',controller:'DeleteVideoCtrl'})
		.otherwise({redirectTo: '/'});
}]);

app.controller('HomeCtrl',['$scope', '$resource', function($scope, $resource){
	var videos = $resource('api/videos');
	videos.query(function(vs){
		$scope.videos = vs;
	});
}]);

app.controller('AddVideoCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource,$location){
		$scope.save = function(){
			var videos = $resource('api/videos');
			console.debug(videos);
			videos.save($scope.video, function(){$location.path('/');});
		}
	}
]);

app.controller('EditVideoCtrl', ['$scope', '$resource','$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){
		var videos = $resource('api/videos/:id', {id:'@_id'}, {update:{method:'PUT'}});
		videos.get({id:$routeParams.id}, function(v){
			$scope.video = v;
		});
		$scope.save = function(){
			videos.update($scope.video, function(){
				$location.path('/');
			});
		}
}]);

app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams){
		var videos = $resource('api/videos/:id', {id:'@_id'});
		videos.get({id:$routeParams.id}, function(v){
			$scope.video = v;
		});
		$scope.delete = function(){
			videos.delete({id:$routeParams.id}, function(){
				$location.path('/');
			});
		}
}]);
