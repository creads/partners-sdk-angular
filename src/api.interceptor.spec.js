describe('[] API INTERCEPTOR', function() {
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
        /*jshint expr:true */
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
        /*jshint expr:true */
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
        /*jshint -W030 */
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
        /*jshint -W030 */
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
        /*jshint -W030 */
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
        /*jshint -W030 */
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


  describe('[Unit]: Testing apiInterceptor factory', function() {
    var apiInterceptorProvider,
        $httpProvider,
        $httpBackend,
        $http,
        apiInterceptor,
        api;

    beforeEach(function() {
      module('partners.api', function($injector) {
        apiInterceptorProvider = $injector.get('apiInterceptorProvider');
        $httpProvider = $injector.get('$httpProvider');
      });

      inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $http = $injector.get('$http');
        apiInterceptor = $injector.get('apiInterceptor');
        api = $injector.get('api');
      });
    });

    beforeEach(function() {
      apiInterceptorProvider
        .setOnRequest(function($injector, config) {
          config.headers.isCatch = true;

          return config;
        })
      ;
    });

    it('should be register as interceptor', function() {
      expect($httpProvider.interceptors).to.contain('apiInterceptor');
    });

    it('should not catch all request', function() {
      $httpBackend
        .expectGET(
          '/mock',
          {
            Accept: 'application/json, text/plain, */*'
          }
        )
        .respond();
      $http.get('/mock');
      $httpBackend.flush();
    });

    describe('request', function() {
      beforeEach(function() {
        apiInterceptorProvider
          .setIsAbleToCatchAllRequest(true)
          .setOnRequest(function($injector, config) {
            config.headers.isCatch = true;

            return config;
          })
        ;
      });

      it('should be intercepted', function () {
        $httpBackend
          .expectGET(
            '/mock',
            {
              isCatch: true,
              Accept: 'application/json, text/plain, */*'
            }
          )
          .respond(200)
        ;
        $http.get('/mock');
        $httpBackend.flush();
      });

    });

    // TO DO
    // describe('request error', function() {

    //   beforeEach(function() {
    //     apiInterceptorProvider
    //       .setIsAbleToCatchAllRequest(true)
    //       .setOnRequestError(function($injector, rejection) {
    //         console.log('ici');
    //         rejection.data = 'isInterceptedError';

    //         return $injector.get('$q').reject(rejection);
    //       })
    //     ;
    //   });

      // it('should be intercepted', function () {
        // TO DO
      // });

    // });

    describe('response', function() {
      beforeEach(function() {
        apiInterceptorProvider
          .setIsAbleToCatchAllRequest(true)
          .setOnResponse(function($injector, response) {
            response.data = 'isIntercepted';

            return response;
          })
        ;
      });

      it('should be intercepted', function () {
        $httpBackend.expectGET('/mock').respond(200);
        $http
          .get('/mock')
          .then(function(response) {
            expect(response.data).to.be.equal('isIntercepted');
          })
        ;
        $httpBackend.flush();
      });
    });

    describe('response error', function() {
      beforeEach(function() {
        apiInterceptorProvider
          .setIsAbleToCatchAllRequest(true)
          .setOnResponseError(function($injector, rejection) {
            rejection.data = 'isInterceptedError';

            return $injector.get('$q').reject(rejection);
          })
        ;
      });
      it('should be intercepted', function () {
        $httpBackend.expectGET('/mock').respond(400);
        $http
          .get('/mock')
          .then(null, function(response) {
            expect(response.data).to.be.equal('isInterceptedError');
          })
        ;
        $httpBackend.flush();
      });
    });
  });
});