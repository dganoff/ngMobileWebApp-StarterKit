(function() {
	angular
		.module('mwa')
		.directive('mwaTabBar', tabBar);

	function tabBar() {
		return {
			restrict: 'AE',
			replace: true,
			templateUrl: 'views/tab-bar.directive.html'
		};
	}	
})();