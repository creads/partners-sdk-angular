/**
 * angular-partners-api - Angular module for call Creads partners API
 * @version v0.0.0
 * @link http://gitlab.creads.org/creads/angular-partners-api
 * @license proprietary
 */
(function() {

  'use strict';

  angular
    .module('partners.api', [
      'partners.api.config',
      'partners.api.factory',
      'partners.api.interceptor'
    ])
  ;

})();
(function() {

  'use strict';

  angular
    .module('partners.api.config', [
    ])
    .config([
      '$httpProvider',
      function($httpProvider) {
        $httpProvider.interceptors.push('apiInterceptor');
      }
    ])
  ;

})();
(function() {

  'use strict';

  /**
   * Creads Partners API factory
   */
  angular
    .module('partners.api.factory', [
    ])
    .provider('api', [
      apiProvider
    ])
  ;

  /**
   * ApiProvider
   * @return {void}
   */
  function apiProvider() {
    /* jshint validthis: true */

    var api = {},
        endpoint = 'http://api.creads-partners.com',
        version = '0.0.0'
    ;

    this.setEndpoint = setEndpoint;
    this.getEndpoint = getEndpoint;
    this.setVersion = setVersion;
    this.getVersion = getVersion;
    this.$get = $get;

    /**
     * [setEndpoint]
     * @param {string} value
     * @return apiProvider
     */
    function setEndpoint(value) {
      if (typeof value !== 'string') {
        throw new Error('String value is provide for parameter endpoint');
      }

      endpoint = value;

      return this;
    }

    /**
     * [getEndpoint]
     * @return {string}
     */
    function getEndpoint() {
      return endpoint;
    }

    /**
     * [setVersion]
     * @param {string} value
     * @return apiProvider
     */
    function setVersion(value) {
      if (typeof value !== 'string') {
        throw new Error('String value is provide for parameter version');
      }

      version = value;

      return this;
    }

    /**
     * [getVersion]
     * @return {string}
     */
    function getVersion() {
      return version;
    }

    /**
     * API factory
     * @param  {$http} $http
     * @param  {$q}    $q
     * @return {api}
     */
    $get.$inject = ['$http', '$q'];
    function $get($http, $q) {

      api.call = call;
      api.getEndpoint = getEndpoint;
      api.getVersion = getVersion;

      return api;

      /**
       * Call api method
       * @param  {object}  config
       * @param  {string}  config.method
       * @param  {string}  config.url
       * @param  {object}  config.data
       * @param  {object}  config.params
       * @param  {object}  config.headers
       * @return {promise}
       */
      function call(config) {
        var deferred = $q.defer();

        $http({
          method: config.method,
          url: endpoint + '/' + version + config.url,
          data: config.data,
          params: config.params,
          headers: config.headers
        })
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function(data, status) {
          deferred.reject(data);
        });

        return deferred.promise;
      }
    }

  }

})();
describe('[] API', function() {

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
      it('should be a function', function() {
        expect(apiProvider.getEndpoint).to.be.a('function');
      });

      it('should return http://api.creads-partners.com', function() {
        expect(apiProvider.getEndpoint()).to.be.equal('http://api.creads-partners.com');
      });
    });

    describe('setEndpoint method', function() {
      it('should be a function', function() {
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
        expect(function() { apiProvider.setEndpoint(function() {}); }).to.throw(Error);
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
      it('should be a function', function() {
        expect(apiProvider.getVersion).to.be.a('function');
      });

      it('should return 0.0.0', function() {
        expect(apiProvider.getVersion()).to.be.equal('0.0.0');
      });
    });

    describe('setVersion method', function() {
      it('should be a function', function() {
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
        expect(function() { apiProvider.setVersion(function() {}); }).to.throw(Error);
      });

      it('should set version with 1.0.0', function () {
        apiProvider.setVersion('1.0.0');
        expect(apiProvider.getVersion()).to.be.equal('1.0.0');
      });

      it('should return an instance of apiProvider', function() {
        expect(apiProvider.setVersion('endpoint')).to.be.an.instanceof(apiProvider.constructor);
      });
    });
  });


  describe('[Unit]: Testing api factory', function() {
    var api,
        $httpBackend;

    beforeEach(module('partners.api'));

    beforeEach(inject(function($injector) {
      api = $injector.get('api');
      $httpBackend = $injector.get('$httpBackend');
    }));

    describe('call method', function() {
      it('should be a function', function() {
        expect(api.call).to.be.a('function');
      });

      it('should call / with GET method', function() {
        $httpBackend.expectGET('http://api.creads-partners.com/0.0.0/').respond(200);
        api
          .call({
            method: 'GET',
            url: '/'
          })
        ;
        $httpBackend.flush();
      });

      it('should call /projects with query params and GET method', function() {
        $httpBackend.expectGET('http://api.creads-partners.com/0.0.0/projects?query=1').respond(200);
        api
          .call({
            method: 'GET',
            url: '/projects',
            params: {
              query: 1
            }
          })
        ;
        $httpBackend.flush();
      });

      it('should call /projects with data and POST method', function() {
        var project = {
          title: 'XXX',
          category: 'ZZZ'
        };

        $httpBackend
          .expectPOST(
            'http://api.creads-partners.com/0.0.0/projects',
            project
          )
          .respond(200)
        ;

        api
          .call({
            method: 'POST',
            url: '/projects',
            data: project
          })
        ;
        $httpBackend.flush();
      });

      it('should call / with GET method and specific headers', function() {
        $httpBackend
          .expectGET(
            'http://api.creads-partners.com/0.0.0/',
            {
              Authorization: 'Bearer TOKEN',
              Accept: 'application/json, text/plain, */*'
            }
          )
          .respond()
        ;

        api
          .call({
            method: 'GET',
            url: '/',
            headers: {
              Authorization: 'Bearer TOKEN'
            }
          })
        ;

        $httpBackend.flush();
      });
    });
  });
});
(function() {

  'use strict';

  /**
   * Creads Partners API interceptor
   */
  angular
    .module('partners.api.interceptor', [
    ])
    .provider('apiInterceptor', [
      'apiProvider',
      apiInterceptorProvider
    ])
  ;

  /**
   * ApiInterceptorProvider
   * @param  {apiProvider}
   * @return {void}
   */
  function apiInterceptorProvider(apiProvider) {
    /* jshint validthis: true */

    var apiInterceptor = {},
        _isAbleToCatchAllRequest = false,
        onRequest,
        onRequestError,
        onResponse,
        onResponseError;

    this.isAbleToCatchAllRequest = isAbleToCatchAllRequest;
    this.setIsAbleToCatchAllRequest = setIsAbleToCatchAllRequest;
    this.getOnRequest = getOnRequest;
    this.setOnRequest = setOnRequest;
    this.getOnRequestError = getOnRequestError;
    this.setOnRequestError = setOnRequestError;
    this.getOnResponse = getOnResponse;
    this.setOnResponse = setOnResponse;
    this.getOnResponseError = getOnResponseError;
    this.setOnResponseError = setOnResponseError;
    this.$get = $get;

    /**
     * Check if the given object is function
     * @param  {object}  object
     * @return {Boolean}
     */
    function isFunction(object) {
      return object && {}.toString.call(object) === '[object Function]';
    }

    /**
     * Check if request need to be intercepted
     * @param  {string}  url     URL to check
     * @return {Boolean}
     */
    function isIntercept(url) {
      return (_isAbleToCatchAllRequest || new RegExp('^' + apiProvider.getEndpoint()).test(url)) ? true : false;
    }

    /**
     * [isAbleToCatchAllRequest]
     * @return {Boolean}
     */
    function isAbleToCatchAllRequest() {
      return _isAbleToCatchAllRequest;
    }

    /**
     * [setIsAbleToCatchAllRequest]
     * @param {boolean} value
     */
    function setIsAbleToCatchAllRequest(value) {
      if (typeof value !== 'boolean') {
        throw new Error('Boolean value is provide for option isAbleToCatchAllRequest');
      }

      _isAbleToCatchAllRequest = value;

      return this;
    }

    /**
     * [getOnRequest]
     * @return {Function|undefined}
     */
    function getOnRequest() {
      return onRequest;
    }

    /**
     * [setOnRequest]
     * @param {[type]} callbackRequest
     * @return this
     */
    function setOnRequest(callbackRequest) {
      if (!isFunction(callbackRequest)) {
        throw new Error('Function is provide for option onRequest');
      }

      onRequest = callbackRequest;

      return this;
    }

    /**
     * [getOnRequestError]
     * @return {Function|undefined}
     */
    function getOnRequestError() {
      return onRequestError;
    }

    /**
     * [setOnRequestError]
     * @param {[type]} callbackRequestError
     * @return this
     */
    function setOnRequestError(callbackRequestError) {
      if (!isFunction(callbackRequestError)) {
        throw new Error('Function is provide for option onRequestError');
      }

      onRequestError = callbackRequestError;

      return this;
    }

    /**
     * [getOnResponse]
     * @return {Function|undefined}
     */
    function getOnResponse() {
      return onResponse;
    }

    /**
     * [setOnResponse]
     * @param  {[type]} callbackResponse
     * @return this
     */
    function setOnResponse(callbackResponse) {
      if (!isFunction(callbackResponse)) {
        throw new Error('Function is provide for option onResponse');
      }

      onResponse = callbackResponse;

      return this;
    }

    /**
     * [getOnResponseError]
     * @return {Function|undefined}
     */
    function getOnResponseError() {
      return onResponseError;
    }

    /**
     * [setOnResponseError]
     * @param {[type]} callbackResponseError
     * @return this
     */
    function setOnResponseError(callbackResponseError) {
      if (!isFunction(callbackResponseError)) {
        throw new Error('Function is provide for option onResponseError');
      }

      onResponseError = callbackResponseError;

      return this;
    }

    /**
     * apiInterceptor factory
     * @param  {$q}             $q
     * @param  {$injector}      $injector
     * @return {apiInterceptor}
     */
    $get.$inject = ['$q', '$injector'];
    function $get($q, $injector) {

      apiInterceptor.request = request;
      apiInterceptor.requestError = requestError;
      apiInterceptor.response = response;
      apiInterceptor.responseError = responseError;
      apiInterceptor.isAbleToCatchAllRequest = isAbleToCatchAllRequest;

      return apiInterceptor;

      /**
       * [request]
       * @param  {object} config
       * @return {object}
       */
      function request(config) {
        if (isIntercept(config.url) && onRequest !== undefined) {
          config = onRequest($injector, config);
        }

        return config;
      }

      /**
       * [requestError]
       * @param  {object} rejection
       * @return {promise}
       */
      function requestError(rejection) {
        if (isIntercept(rejection.url) && onRequestError !== undefined) {
          return onRequestError($injector, rejection);
        }

        return $q.reject(rejection);
      }

      /**
       * [response]
       * @param  {object} response
       * @return {object}
       */
      function response(_response) {
        if (isIntercept(_response.config.url) && onResponse !== undefined) {
          _response = onResponse($injector, _response);
        }

        return _response;
      }

      /**
       * [responseError]
       * @param  {object} rejection
       * @return {promise}
       */
      function responseError(rejection) {
        if (isIntercept(rejection.config.url) && onResponseError !== undefined) {
          return onResponseError($injector, rejection);
        }

        return $q.reject(rejection);
      }

    }

  }

}());
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