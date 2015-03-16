describe('[Unit]: Testing apiInterceptor config provider', function() {
  var apiInterceptorProvider;

  beforeEach(function() {
    angular
      .module('fakeModule', [])
      .config([
        '$injector',
        function($injector) {
          apiInterceptorProvider = $injector.get('apiInterceptorProvider');
        }
      ])
    ;

    module('partners.api', 'fakeModule');
    inject(function() {});
  });

  describe('isAbleToCatchAllRequest method', function() {

    it('should be a function', function() {
      expect(apiInterceptorProvider.setIsAbleToCatchAllRequest).to.be.a('function');
    });

    it('should return false', function() {
      expect(apiInterceptorProvider.isAbleToCatchAllRequest()).to.be.false;
    });

  });

  describe('setIsAbleToCatchAllRequest method', function() {

    it('should be a function', function() {
      expect(apiInterceptorProvider.setIsAbleToCatchAllRequest).to.be.a('function');
    });

    it('should throw an error if value is not boolean', function() {
      expect(function() { apiInterceptorProvider.setIsAbleToCatchAllRequest(); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setIsAbleToCatchAllRequest(null); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setIsAbleToCatchAllRequest(undefined); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setIsAbleToCatchAllRequest({}); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setIsAbleToCatchAllRequest([]); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setIsAbleToCatchAllRequest(102); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setIsAbleToCatchAllRequest('true'); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setIsAbleToCatchAllRequest(function() {}); }).to.throw(Error);
    });

    it('should set _isAbleToCatchAllRequest to true', function () {
      apiInterceptorProvider.setIsAbleToCatchAllRequest(true);
      expect(apiInterceptorProvider.isAbleToCatchAllRequest()).to.be.true;
    });

    it('should return an instance of apiInterceptorProvider', function() {
      expect(apiInterceptorProvider.setIsAbleToCatchAllRequest(false)).to.be.an.instanceof(apiInterceptorProvider.constructor);
    });

  });

  describe('getOnRequest method', function() {

    it('should be a function', function() {
      expect(apiInterceptorProvider.getOnRequest).to.be.a('function');
    });

    it('should return undefined', function() {
      expect(apiInterceptorProvider.getOnRequest()).to.be.undefined;
    });

  });

  describe('setOnRequest method', function() {

    it('should be a function', function() {
      expect(apiInterceptorProvider.setOnRequest).to.be.a('function');
    });

    it('should throw an error if value is not function', function() {
      expect(function() { apiInterceptorProvider.setOnRequest(); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequest(null); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequest(undefined); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequest({}); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequest([]); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequest(102); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequest('true'); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequest(true); }).to.throw(Error);
    });

    it('should set onRequest to function', function () {
      apiInterceptorProvider.setOnRequest(function() {});
      expect(apiInterceptorProvider.getOnRequest()).to.be.a('function');
    });

    it('should return an instance of apiInterceptorProvider', function() {
      expect(apiInterceptorProvider.setOnRequest(function() {})).to.be.an.instanceof(apiInterceptorProvider.constructor);
    });

  });

  describe('getOnRequestError method', function() {

    it('should be a function', function() {
      expect(apiInterceptorProvider.getOnRequestError).to.be.a('function');
    });

    it('should return undefined', function() {
      expect(apiInterceptorProvider.getOnRequestError()).to.be.undefined;
    });

  });

  describe('setOnRequestError method', function() {

    it('should be a function', function() {
      expect(apiInterceptorProvider.setOnRequestError).to.be.a('function');
    });

    it('should throw an error if value is not function', function() {
      expect(function() { apiInterceptorProvider.setOnRequestError(); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequestError(null); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequestError(undefined); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequestError({}); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequestError([]); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequestError(102); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequestError('true'); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnRequestError(true); }).to.throw(Error);
    });

    it('should set onRequestError to function', function () {
      apiInterceptorProvider.setOnRequestError(function() {});
      expect(apiInterceptorProvider.getOnRequestError()).to.be.a('function');
    });

    it('should return an instance of apiInterceptorProvider', function() {
      expect(apiInterceptorProvider.setOnRequestError(function() {})).to.be.an.instanceof(apiInterceptorProvider.constructor);
    });

  });

  describe('getOnResponse method', function() {

    it('should be a function', function() {
      expect(apiInterceptorProvider.getOnResponse).to.be.a('function');
    });

    it('should return undefined', function() {
      expect(apiInterceptorProvider.getOnResponse()).to.be.undefined;
    });

  });

  describe('setOnResponse method', function() {

    it('should be a function', function() {
      expect(apiInterceptorProvider.setOnResponse).to.be.a('function');
    });

    it('should throw an error if value is not function', function() {
      expect(function() { apiInterceptorProvider.setOnResponse(); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponse(null); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponse(undefined); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponse({}); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponse([]); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponse(102); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponse('true'); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponse(true); }).to.throw(Error);
    });

    it('should set onRequestError to function', function () {
      apiInterceptorProvider.setOnResponse(function() {});
      expect(apiInterceptorProvider.getOnResponse()).to.be.a('function');
    });

    it('should return an instance of apiInterceptorProvider', function() {
      expect(apiInterceptorProvider.setOnResponse(function() {})).to.be.an.instanceof(apiInterceptorProvider.constructor);
    });

  });

  describe('getOnResponseError method', function() {

    it('should be a function', function() {
      expect(apiInterceptorProvider.getOnResponseError).to.be.a('function');
    });

    it('should return undefined', function() {
      expect(apiInterceptorProvider.getOnResponseError()).to.be.undefined;
    });

  });

  describe('setOnResponseError method', function() {

    it('should be a function', function() {
      expect(apiInterceptorProvider.setOnResponseError).to.be.a('function');
    });

    it('should throw an error if value is not function', function() {
      expect(function() { apiInterceptorProvider.setOnResponseError(); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponseError(null); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponseError(undefined); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponseError({}); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponseError([]); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponseError(102); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponseError('true'); }).to.throw(Error);
      expect(function() { apiInterceptorProvider.setOnResponseError(true); }).to.throw(Error);
    });

    it('should set onRequestError to function', function () {
      apiInterceptorProvider.setOnResponseError(function() {});
      expect(apiInterceptorProvider.getOnResponseError()).to.be.a('function');
    });

    it('should return an instance of apiInterceptorProvider', function() {
      expect(apiInterceptorProvider.setOnResponseError(function() {})).to.be.an.instanceof(apiInterceptorProvider.constructor);
    });

  });

});