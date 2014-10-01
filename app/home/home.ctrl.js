(function() {
	angular
		.module('mwa')
		.controller('homeCtrl', homeCtrl);

	/* @ngInject */
	function homeCtrl($scope, appState) {
		// Assign all bindable models:

		// Kicks off the controller:
		activate();

		//////////

		/**
		 * Kick off the controller with this function
		 */
		function activate() {
			appState.pageTitle = "Home";
		}
	}
})();