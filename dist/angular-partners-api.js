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

    .provider('api', function () {

      var api = {},
          endpoint = 'http://api.creads-partners.com',
          version = '0.0.0'
      ;

      this.setEndpoint = setEndpoint;
      this.setVersion = setVersion;
      this.$get = ['$http', '$q', $get];

      /**
       * [setEndpoint]
       * @param {string} value
       * @return apiProvider
       */
      function setEndpoint(value) {
        /* jshint validthis: true */
        if (typeof value !== 'string') {
          throw new Error('String value is provide for parameter endpoint');
        }

        endpoint = value;

        return this;
      }

      /**
       * [setVersion]
       * @param {string} value
       * @return apiProvider
       */
      function setVersion(value) {
        /* jshint validthis: true */
        if (typeof value !== 'string') {
          throw new Error('String value is provide for parameter version');
        }

        version = value;

        return this;
      }

      /**
       * API factory
       * @param  {$http} $http
       * @param  {$q}    $q
       * @return {api}
       */
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

        /**
         * [getEndpoint]
         * @return {string}
         */
        function getEndpoint() {
          return endpoint;
        }

        /**
         * [getVersion]
         * @return {string}
         */
        function getVersion() {
          return version;
        }

      }

    })
  ;

})();
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
      function(apiProvider) {

        var apiInterceptor = {},
            _isAbleToCatchAllRequest = false,
            onRequest,
            onRequestError,
            onResponse,
            onResponseError;

        this.setIsAbleToCatchAllRequest = setIsAbleToCatchAllRequest;
        this.setOnRequest = setOnRequest;
        this.setOnRequestError = setOnRequestError;
        this.setOnResponse = setOnResponse;
        this.setOnResponseError = setOnResponseError;
        this.$get = ['$q, $injector', $get];

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
         * [setIsAbleToCatchAllRequest]
         * @param {boolean} value
         */
        function setIsAbleToCatchAllRequest(value) {
          /* jshint validthis: true */
          if (typeof value !== 'boolean') {
            throw new Error('Boolean value is provide for option isAbleToCatchAllRequest');
          }

          _isAbleToCatchAllRequest = value;

          return this;
        }

        /**
         * [setOnRequest]
         * @param {[type]} callbackRequest
         * @return this
         */
        function setOnRequest(callbackRequest) {
          /* jshint validthis: true */
          if (!isFunction(callbackRequest)) {
            throw new Error('Function is provide for option onRequest');
          }

          onRequest = callbackRequest;

          return this;
        }

        /**
         * [setOnRequestError]
         * @param {[type]} callbackRequestError
         * @return this
         */
        function setOnRequestError(callbackRequestError) {
          /* jshint validthis: true */
          if (!isFunction(callbackRequestError)) {
            throw new Error('Function is provide for option onRequestError');
          }

          onRequestError = callbackRequestError;

          return this;
        }

        /**
         * [setOnResponse]
         * @param  {[type]} callbackResponse
         * @return this
         */
        function setOnResponse(callbackResponse) {
          /* jshint validthis: true */
          if (!isFunction(callbackResponse)) {
            throw new Error('Function is provide for option onResponse');
          }

          onResponse = callbackResponse;

          return this;
        }

        /**
         * [setOnResponseError]
         * @param {[type]} callbackResponseError
         * @return this
         */
        function setOnResponseError(callbackResponseError) {
          /* jshint validthis: true */
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

          /**
           * [isAbleToCatchAllRequest]
           * @return {Boolean}
           */
          function isAbleToCatchAllRequest() {
            return _isAbleToCatchAllRequest;
          }
        }

      }
    ])
  ;

}());