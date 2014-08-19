var should = require('should');

describe("controllers", function() {
  var angular

  beforeEach(function() {
    angular = require('../src/fake-angular')()
  })

  it('should have an empty property when no controller are present', function () {
    angular.module('testModule1');
    angular.module('testModule2');

    angular.modulesMap['testModule1'].controllers.should.be.a.Array;
    angular.modulesMap['testModule1'].controllers.should.have.a.lengthOf(0);

    angular.modulesMap['testModule2'].controllers.should.be.a.Array;
    angular.modulesMap['testModule2'].controllers.should.have.a.lengthOf(0);

  })

  it('should have an empty dependencies array when there are no dependencies', function () {
    angular
      .module('testModule1')
      .controller('myController', function () {})
      .controller('myController2', [function () {}]);

    angular.modulesMap['testModule1'].controllers.should.be.a.Array;
    angular.modulesMap['testModule1'].controllers.should.have.a.lengthOf(2);

    angular.modulesMap['testModule1'].controllers[0].deps.should.be.a.Array;
    angular.modulesMap['testModule1'].controllers[0].deps.should.have.a.lengthOf(0);

    angular.modulesMap['testModule1'].controllers[1].deps.should.be.a.Array;
    angular.modulesMap['testModule1'].controllers[1].deps.should.have.a.lengthOf(0);

  })

  it('property should contain all defined controllers with array definition', function() {
    angular
      .module('testModule1', [])
      .controller('testController1', ['dep1', function (dep1) {}])
      .controller('testController2', ['dep2', 'dep3', function (dep1, dep2) {}]);

    angular.modules.should.have.a.lengthOf(1)
    angular.modules[0].should.have.property('name', 'testModule1')

    var testModule1 = angular.modulesMap['testModule1'];
    testModule1.controllers.should.have.a.lengthOf(2);
    testModule1.controllers[0].should.have.property('name', 'testController1');
    testModule1.controllers[1].should.have.property('name', 'testController2');

    testModule1.controllers[0].deps.should.be.a.Array;
    testModule1.controllers[0].deps.should.have.a.lengthOf(1);
    testModule1.controllers[0].deps[0].should.be.equal('dep1')

    testModule1.controllers[1].deps.should.be.a.Array;
    testModule1.controllers[1].deps.should.have.a.lengthOf(2);
    testModule1.controllers[1].deps[0].should.be.equal('dep2');
    testModule1.controllers[1].deps[1].should.be.equal('dep3');
  })

  it('property should contain all defined controllers with function definition', function() {
    angular
      .module('testModule1', [])
      .controller('testController1', function (dep1) {})
      .controller('testController2', function (dep2, dep3) {});

    angular.modules.should.have.a.lengthOf(1)
    angular.modules[0].should.have.property('name', 'testModule1')

    var testModule1 = angular.modulesMap['testModule1'];
    testModule1.controllers.should.have.a.lengthOf(2);
    testModule1.controllers[0].should.have.property('name', 'testController1');
    testModule1.controllers[1].should.have.property('name', 'testController2');

    testModule1.controllers[0].deps.should.be.a.Array;
    testModule1.controllers[0].deps.should.have.a.lengthOf(1);
    testModule1.controllers[0].deps[0].should.be.equal('dep1')

    testModule1.controllers[1].deps.should.be.a.Array;
    testModule1.controllers[1].deps.should.have.a.lengthOf(2);
    testModule1.controllers[1].deps[0].should.be.equal('dep2');
    testModule1.controllers[1].deps[1].should.be.equal('dep3');
  })


  it('property should contain all defined controllers with variable array definition', function() {
    var testController1 = ['dep1', function (dep1) {}],
        testController2 = ['dep2', 'dep3', function (dep2, dep3) {}]
        ;

    angular
      .module('testModule1', [])
      .controller('testController1', testController1)
      .controller('testController2', testController2);

    angular.modules.should.have.a.lengthOf(1)
    angular.modules[0].should.have.property('name', 'testModule1')

    var testModule1 = angular.modulesMap['testModule1'];
    testModule1.controllers.should.have.a.lengthOf(2);
    testModule1.controllers[0].should.have.property('name', 'testController1');
    testModule1.controllers[1].should.have.property('name', 'testController2');

    testModule1.controllers[0].deps.should.be.a.Array;
    testModule1.controllers[0].deps.should.have.a.lengthOf(1);
    testModule1.controllers[0].deps[0].should.be.equal('dep1')

    testModule1.controllers[1].deps.should.be.a.Array;
    testModule1.controllers[1].deps.should.have.a.lengthOf(2);
    testModule1.controllers[1].deps[0].should.be.equal('dep2');
    testModule1.controllers[1].deps[1].should.be.equal('dep3');
  })

  it('property should contain all defined controllers with variable function definition', function() {
    function testController1 (dep1) {};
    function testController2 (dep2, dep3) {};

    angular
      .module('testModule1', [])
      .controller('testController1', testController1)
      .controller('testController2', testController2);

    angular.modules.should.have.a.lengthOf(1)
    angular.modules[0].should.have.property('name', 'testModule1')

    var testModule1 = angular.modulesMap['testModule1'];
    testModule1.controllers.should.have.a.lengthOf(2);
    testModule1.controllers[0].should.have.property('name', 'testController1');
    testModule1.controllers[1].should.have.property('name', 'testController2');

    testModule1.controllers[0].deps.should.be.a.Array;
    testModule1.controllers[0].deps.should.have.a.lengthOf(1);
    testModule1.controllers[0].deps[0].should.be.equal('dep1')

    testModule1.controllers[1].deps.should.be.a.Array;
    testModule1.controllers[1].deps.should.have.a.lengthOf(2);
    testModule1.controllers[1].deps[0].should.be.equal('dep2');
    testModule1.controllers[1].deps[1].should.be.equal('dep3');
  })

  it('excludes angular dependencies', function () {
    function testController1 ($scope, dep1) {};
    var testController2 = ['$scope', 'dep3', function ($scope, dep3) {}];

      angular
        .module('testModule1', [])
        .controller('testController1', testController1)
        .controller('testController2', testController2);

      var testModule1 = angular.modulesMap['testModule1'];
      testModule1.controllers[0].deps.should.be.a.Array;
      testModule1.controllers[0].deps.should.have.a.lengthOf(1);
      testModule1.controllers[0].deps[0].should.be.equal('dep1');

      testModule1.controllers[1].deps.should.be.a.Array;
      testModule1.controllers[1].deps.should.have.a.lengthOf(1);
      testModule1.controllers[1].deps[0].should.be.equal('dep3');
  })
})
