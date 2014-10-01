(function() {
	angular
		.module('mwa')
		.controller('aboutCtrl', aboutCtrl);

	/* @ngInject */
	function aboutCtrl($scope, appState) {
		// Assign all bindable models:
		

		// Kicks off the controller:
		activate();

		//////////

		/**
		 * Kick off the controller with this function
		 */
		function activate() {
			appState.pageTitle = "About";
		}
	}
})();