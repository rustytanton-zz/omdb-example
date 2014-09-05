angular.module("OmdbSearch", ["ngRoute"])

	.controller("HomeController", function ($scope, $location) {
		$scope.search = function() {
			$location.url(
				"/search/title/" + $scope.t
				+ "/year/" + $scope.y
				+ "/plot/" + $scope.plot
			);
		};
	})

	.controller("MovieController", function ($scope, $routeParams) {
		
	})

	.controller("SearchController", function ($scope, $routeParams) {
		$scope.$routeParams = $routeParams;
		$scope.showYouSearchedFor = false;
		if (
			($routeParams.t && $routeParams.t != 'undefined') ||
			($routeParams.y && $routeParams.y != 'undefined') ||
			($routeParams.plot && $routeParams.t != 'undefined')
		) {
			$scope.showYouSearchedFor = true;
		}
	})

	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when("/movie/:id", {
				templateUrl: '/partials/movie.html',
				controller: 'MovieController',
			})
			.when("/search/title/:t?/year/:y?/plot/:plot?", {
				templateUrl: '/partials/search.html',
				controller: 'SearchController',
			})
			.otherwise({
				templateUrl: '/partials/home.html',
				controller: 'HomeController',
			});
		$locationProvider.html5Mode(true);
	});