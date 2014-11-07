describe("homeLanding controller: ", function() {
    var $controllerConstructor,
        $rootScope,
        ctrl,
        scope,
        $state,
        stateSpy;
    
    // setup the app module and injections:
    beforeEach(function() {
        module('mwa');

        inject(function(_$controller_, _$rootScope_, _$state_) {
            $controllerConstructor = _$controller_;
            $rootScope = _$rootScope_;
            $state = _$state_;
        });
    });

    // Setup the scope and controller:
    beforeEach(function() {
        // Create a new scope for this controller:
        scope = $rootScope.$new();

        // Define the arguments for the controller:
        var ctrlArgs = {
            $scope: scope,
            $state: $state
        };
        // Create the controller:
        ctrl = $controllerConstructor('homeLandingCtrl', ctrlArgs);
        
        scope.$digest();
    });

    // Setup web service spies:
    beforeEach(function() {
        // spyOn(dateChangeService, 'changeDate').and.callFake(function() {
        //     var deferred = $q.defer();
        //     deferred.resolve(mocks.changeDate());
        //     return deferred.promise;
        // });

        stateSpy = spyOn($state, 'go');
    });

    describe("Initial controller settings:", function() {
        it("should have a function called openDetail", function() {
            expect(typeof scope.openDetail).toBe("function");
        });
    });

    describe("Opening Detail screen", function() {
        it("should open the Detail screen when a button is clicked", function() {
            // Call the openDetail function:
            scope.openDetail();

            expect(stateSpy).toHaveBeenCalledWith('home.detail');
        });
    });
});