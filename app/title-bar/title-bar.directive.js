(function() {
	angular
		.module('mwa')
		.directive('mwaTitleBar', titleBar);

	function titleBar() {
		return {
			restrict: 'AE',
			replace: true,
			templateUrl: 'views/title-bar.directive.html',
			/* @ngInject */
			controller: function($scope, appState) {
				$scope.state = appState;
			}
		};
	}
})();