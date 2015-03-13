describe('Unit: Testing api factory', function() {

  beforeEach(module('partners.api'));

  describe('getEndpoint method', function() {

    it('should exist', inject(function(api) {
      expect(api.getEndpoint).to.exist;
    }));

    it('should be a function', inject(function(api) {
      expect(api.getEndpoint).to.be.a('function');
    }));

    it('should return a string value', inject(function(api) {
      expect(api.getEndpoint()).to.be.a('string');
    }));

  });

  describe('getVersion method', function() {

    it('should exist', inject(function(api) {
      expect(api.getVersion).to.exist;
    }));

    it('should be a function', inject(function(api) {
      expect(api.getVersion).to.be.a('function');
    }));

    it('should return a string value', inject(function(api) {
      expect(api.getVersion()).to.be.a('string');
    }));

  });

  describe('call method', function() {

    it('should exist', inject(function(api) {
      expect(api.call).to.exist;
    }));

    it('should be a function', inject(function(api) {
      expect(api.call).to.be.a('function');
    }));

  });

});