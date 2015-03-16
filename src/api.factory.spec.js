describe('[Unit]: Testing api config provider', function() {
  var apiProviderFaker;

  beforeEach(function() {
    angular
      .module('fakeModule', [])
      .config([
        'apiProvider',
        function(apiProvider) {
          apiProviderFaker = apiProvider;
        }
      ])
    ;

    module('partners.api', 'fakeModule');
  });

  describe('getEndpoint method', function() {

    it('should exist', inject(function() {
      expect(apiProviderFaker.getEndpoint).to.exist;
    }));

    it('should be a function', inject(function() {
      expect(apiProviderFaker.getEndpoint).to.be.a('function');
    }));

    it('should return http://api.creads-partners.com', inject(function() {
      expect(apiProviderFaker.getEndpoint()).to.be.equal('http://api.creads-partners.com');
    }));

  });

  describe('setEndpoint method', function() {

    it('should exist', inject(function() {
      expect(apiProviderFaker.setEndpoint).to.be.a('function');
    }));

    it('should throw an error if value is not string', inject(function() {
      expect(function() { apiProviderFaker.setEndpoint(); }).to.throw(Error);
      expect(function() { apiProviderFaker.setEndpoint(null); }).to.throw(Error);
      expect(function() { apiProviderFaker.setEndpoint(undefined); }).to.throw(Error);
      expect(function() { apiProviderFaker.setEndpoint({}); }).to.throw(Error);
      expect(function() { apiProviderFaker.setEndpoint([]); }).to.throw(Error);
      expect(function() { apiProviderFaker.setEndpoint(102); }).to.throw(Error);
      expect(function() { apiProviderFaker.setEndpoint(true); }).to.throw(Error);
    }));

    it('should set endpoint with https://api.github.com', inject(function () {
      apiProviderFaker.setEndpoint('https://api.github.com');
      expect(apiProviderFaker.getEndpoint()).to.be.equal('https://api.github.com');
    }));

    it('should return an instance of apiProvider', inject(function() {
      expect(apiProviderFaker.setEndpoint('endpoint')).to.be.an.instanceof(apiProviderFaker.constructor);
    }));

  });

  describe('getVersion method', function() {

    it('should exist', inject(function() {
      expect(apiProviderFaker.getVersion).to.exist;
    }));

    it('should be a function', inject(function() {
      expect(apiProviderFaker.getVersion).to.be.a('function');
    }));

    it('should return 0.0.0', inject(function() {
      expect(apiProviderFaker.getVersion()).to.be.equal('0.0.0');
    }));

  });

  describe('setVersion method', function() {

    it('should exist', inject(function() {
      expect(apiProviderFaker.setVersion).to.be.a('function');
    }));

    it('should throw an error if value is not string', inject(function() {
      expect(function() { apiProviderFaker.setVersion(); }).to.throw(Error);
      expect(function() { apiProviderFaker.setVersion(null); }).to.throw(Error);
      expect(function() { apiProviderFaker.setVersion(undefined); }).to.throw(Error);
      expect(function() { apiProviderFaker.setVersion({}); }).to.throw(Error);
      expect(function() { apiProviderFaker.setVersion([]); }).to.throw(Error);
      expect(function() { apiProviderFaker.setVersion(102); }).to.throw(Error);
      expect(function() { apiProviderFaker.setVersion(true); }).to.throw(Error);
    }));

    it('should set endpoint with https://api.github.com', inject(function () {
      apiProviderFaker.setVersion('https://api.github.com');
      expect(apiProviderFaker.getVersion()).to.be.equal('https://api.github.com');
    }));

    it('should return an instance of apiProvider', inject(function() {
      expect(apiProviderFaker.setVersion('endpoint')).to.be.an.instanceof(apiProviderFaker.constructor);
    }));

  });

});


describe('[Unit]: Testing api factory', function() {

  beforeEach(module('partners.api'));

  describe('call method', function() {

    it('should exist', inject(function(api) {
      expect(api.call).to.exist;
    }));

    it('should be a function', inject(function(api) {
      expect(api.call).to.be.a('function');
    }));

  });

});