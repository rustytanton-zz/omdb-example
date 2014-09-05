angular.module("OmdbSearch", ["ngRoute"])

	.service("OmdbApi", function($http) {
		this.search = function(params) {
			params.callback = 'JSON_CALLBACK';
			return $http.jsonp("http://www.omdbapi.com/", {
				params : params
			});
		};
	})

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

	.controller("SearchController", function ($scope, $routeParams, OmdbApi) {
		$scope.searching = true;
		angular.forEach($routeParams, function(value, key) {
			if (!value || value == "undefined") {
				delete $routeParams[key];
			}
		});
		$scope.showYouSearchedFor = $routeParams.t || $routeParams.y || $routeParams.plot;
		$scope.$routeParams = $routeParams;
		OmdbApi.search($routeParams).then(function(result) {
			$scope.searching = false;
			console.log(result);
			if (result.data.Error) {
				$scope.error = true;
			} else {
				$scope.done = true;
				$scope.result = result.data.Search;
			}
		}, function() {
			$scope.searching = false;
			$scope.error = true;
		});
	})

	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when("/movie/:id", {
				templateUrl: '/partials/movie.html',
				controller: 'MovieController',
			})
			.when("/search/title/:s?/year/:y?/plot/:plot?", {
				templateUrl: '/partials/search.html',
				controller: 'SearchController',
			})
			.otherwise({
				templateUrl: '/partials/home.html',
				controller: 'HomeController',
			});
		$locationProvider.html5Mode(true);
	});