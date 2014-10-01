(function() {
	angular
		.module('mwa')
		.controller('homeLandingCtrl', homeLandingCtrl);

	/* @ngInject */
	function homeLandingCtrl($scope, $state) {
		// Assign all bindable models:
		$scope.openDetail = openDetail;

		// Kicks off the controller:
		activate();

		//////////

		/**
		 * Kick off the controller with this function
		 */
		function activate() {
		}

		/**
		 * Opens the detail page
		 */
		function openDetail () {
			$state.go('home.detail');
		}
	}
})();