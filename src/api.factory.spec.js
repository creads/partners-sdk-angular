describe('[Unit]: Testing api config provider', function() {
  var apiProvider;

  beforeEach(function() {
    angular
      .module('fakeModule', [])
      .config([
        '$injector',
        function($injector) {
          apiProvider = $injector.get('apiProvider');
        }
      ])
    ;

    module('partners.api', 'fakeModule');
    inject(function() {});
  });

  describe('getEndpoint method', function() {

    it('should exist', function() {
      expect(apiProvider.getEndpoint).to.exist;
    });

    it('should be a function', function() {
      expect(apiProvider.getEndpoint).to.be.a('function');
    });

    it('should return http://api.creads-partners.com', function() {
      expect(apiProvider.getEndpoint()).to.be.equal('http://api.creads-partners.com');
    });

  });

  describe('setEndpoint method', function() {

    it('should exist', function() {
      expect(apiProvider.setEndpoint).to.be.a('function');
    });

    it('should throw an error if value is not string', function() {
      expect(function() { apiProvider.setEndpoint(); }).to.throw(Error);
      expect(function() { apiProvider.setEndpoint(null); }).to.throw(Error);
      expect(function() { apiProvider.setEndpoint(undefined); }).to.throw(Error);
      expect(function() { apiProvider.setEndpoint({}); }).to.throw(Error);
      expect(function() { apiProvider.setEndpoint([]); }).to.throw(Error);
      expect(function() { apiProvider.setEndpoint(102); }).to.throw(Error);
      expect(function() { apiProvider.setEndpoint(true); }).to.throw(Error);
    });

    it('should set endpoint with https://api.github.com', function () {
      apiProvider.setEndpoint('https://api.github.com');
      expect(apiProvider.getEndpoint()).to.be.equal('https://api.github.com');
    });

    it('should return an instance of apiProvider', function() {
      expect(apiProvider.setEndpoint('endpoint')).to.be.an.instanceof(apiProvider.constructor);
    });

  });

  describe('getVersion method', function() {

    it('should exist', function() {
      expect(apiProvider.getVersion).to.exist;
    });

    it('should be a function', function() {
      expect(apiProvider.getVersion).to.be.a('function');
    });

    it('should return 0.0.0', function() {
      expect(apiProvider.getVersion()).to.be.equal('0.0.0');
    });

  });

  describe('setVersion method', function() {

    it('should exist', function() {
      expect(apiProvider.setVersion).to.be.a('function');
    });

    it('should throw an error if value is not string', function() {
      expect(function() { apiProvider.setVersion(); }).to.throw(Error);
      expect(function() { apiProvider.setVersion(null); }).to.throw(Error);
      expect(function() { apiProvider.setVersion(undefined); }).to.throw(Error);
      expect(function() { apiProvider.setVersion({}); }).to.throw(Error);
      expect(function() { apiProvider.setVersion([]); }).to.throw(Error);
      expect(function() { apiProvider.setVersion(102); }).to.throw(Error);
      expect(function() { apiProvider.setVersion(true); }).to.throw(Error);
    });

    it('should set endpoint with https://api.github.com', function () {
      apiProvider.setVersion('https://api.github.com');
      expect(apiProvider.getVersion()).to.be.equal('https://api.github.com');
    });

    it('should return an instance of apiProvider', function() {
      expect(apiProvider.setVersion('endpoint')).to.be.an.instanceof(apiProvider.constructor);
    });

  });

});


describe('[Unit]: Testing api factory', function() {
  var api;

  beforeEach(module('partners.api'));

  beforeEach(inject(function($injector) {
    api = $injector.get('api');
  }));

  describe('call method', function() {

    it('should exist', function() {
      expect(api.call).to.exist;
    });

    it('should be a function', function() {
      expect(api.call).to.be.a('function');
    });

  });

});