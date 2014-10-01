(function() {
	/**
	 * Application value to store the current state of the application	 
	 * @value
	 */
	var appState = {
		pageTitle: null,
		currentState: null,
		previousState: null
	};

	angular
		.module('mwa')
		.value('appState', appState);
})();