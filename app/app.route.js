(function() {
	angular
		.module('mwa')
		.config(configure);

	/* @ngInject */
	function configure($stateProvider, $urlRouterProvider) {
		// For any unmatched url, redirect to /schedule
		$urlRouterProvider.otherwise("/home/landing");

		// Setup the states:
		$stateProvider
			// Home section:
			.state('home', {
				url: '/home',
				controller: 'homeCtrl',
				templateUrl: 'views/home.html'
			})
			.state('home.landing', {
				url: '/landing',
				controller: 'homeLandingCtrl',
				templateUrl: 'views/home-landing.html'
			})
			.state('home.detail', {
				url: '/detail',
				controller: 'homeDetailCtrl',
				templateUrl: 'views/home-detail.html'
			})
			// About section:
			.state('about', {
				url: '/about',
				controller: 'aboutCtrl',
				templateUrl: 'views/about.html'
			})
			.state('about.landing', {
				url: '/landing',
				controller: 'aboutLandingCtrl',
				templateUrl: 'views/about-landing.html'
			})
			.state('about.detail', {
				url: '/detail',
				controller: 'aboutDetailCtrl',
				templateUrl: 'views/about-detail.html'
			});
	}
})();