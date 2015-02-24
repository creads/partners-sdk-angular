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

      /**
       * [setEndpoint]
       * @param {string} value
       * @return apiProvider
       */
      this.setEndpoint = function setEndpoint(value) {
        if (typeof value !== 'string') {
          throw new Error('String value is provide for parameter endpoint');
        }

        endpoint = value;

        return this;
      };

      /**
       * [getEndpoint]
       * @return {string}
       */
      this.getEndpoint = function getEndpoint() {
        return endpoint;
      };

      /**
       * [setVersion]
       * @param {string} value
       * @return apiProvider
       */
      this.setVersion = function setVersion(value) {
        if (typeof value !== 'string') {
          throw new Error('String value is provide for parameter version');
        }

        version = value;

        return this;
      };

      /**
       * [getVersion]
       * @return {string}
       */
      this.getVersion = function getVersion() {
        return version;
      };

      /**
       * API factory
       */
      this.$get = [
        '$http',
        '$q',
        '$state',
        function $get($http, $q, $state) {

          /**
           * * Call api method
           * @param  {object}  config
           * @param  {string}  config.method
           * @param  {string}  config.url
           * @param  {object}  config.data
           * @param  {object}  config.params
           * @param  {object}  config.headers
           * @return {promise}
           */
          api.call = function call(config) {
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
          };

          return api;
        }
      ];

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
            isAbleToCatchAllRequest = false,
            onRequest,
            onRequestError,
            onResponse,
            onResponseError;

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
          return (isAbleToCatchAllRequest || new RegExp('^' + apiProvider.getEndpoint()).test(url)) ? true : false;
        }

        /**
         * [setIsAbleToCatchAllRequest]
         * @param {boolean} value
         */
        this.setIsAbleToCatchAllRequest = function setIsAbleToCatchAllRequest(value) {
          if (typeof value !== 'boolean') {
            throw new Error('Boolean value is provide for option IsAbleToCatchAllRequest');
          }

          isAbleToCatchAllRequest = value;

          return this;
        };

        /**
         * [setOnRequest]
         * @param {[type]} callbackRequest
         * @return this
         */
        this.setOnRequest = function setOnRequest(callbackRequest) {
          if (!isFunction(callbackRequest)) {
            throw new Error('Function is provide for option onRequest');
          }

          onRequest = callbackRequest;

          return this;
        };

        /**
         * [setOnRequestError]
         * @param {[type]} callbackRequestError
         * @return this
         */
        this.setOnRequestError = function setOnRequestError(callbackRequestError) {
          if (!isFunction(callbackRequestError)) {
            throw new Error('Function is provide for option onRequestError');
          }

          onRequestError = callbackRequestError;

          return this;
        };

        /**
         * [setOnResponse]
         * @param  {[type]} callbackResponse
         * @return this
         */
        this.setOnResponse = function setOnResponse(callbackResponse) {
          if (!isFunction(callbackResponse)) {
            throw new Error('Function is provide for option onResponse');
          }

          onResponse = callbackResponse;

          return this;
        };

        /**
         * [setOnResponseError]
         * @param {[type]} callbackResponseError
         * @return this
         */
        this.setOnResponseError = function setOnResponseError(callbackResponseError) {
          if (!isFunction(callbackResponseError)) {
            throw new Error('Function is provide for option onResponseError');
          }

          onResponseError = callbackResponseError;

          return this;
        };

        this.$get = [
          '$q',
          '$injector',
          function apiInterceptor($q, $injector) {

            /**
             * [request]
             * @param  {[type]} config
             * @return {object}
             */
            apiInterceptor.request = function request(config) {

              if (isIntercept(config.url) && onRequest !== undefined) {
                config = onRequest($injector, config);
              }

              return config;
            };

            /**
             * [requestError]
             * @param  {object} rejection
             * @return {promise}
             */
            apiInterceptor.requestError = function requestError(rejection) {

              if (isIntercept(rejection.url) && onRequestError !== undefined) {
                onRequestError($injector, rejection);
              }

              return $q.reject(rejection);
            };

            /**
             * [response]
             * @param  {object} response
             * @return {object}
             */
            apiInterceptor.response = function response(_response) {

              if (isIntercept(_response.config.url) && onResponse !== undefined) {
                _response = onResponse($injector, _response);
              }

              return _response;
            };

            /**
             * [responseError]
             * @param  {object} rejection
             * @return {promise}
             */
            apiInterceptor.responseError = function responseError(rejection) {

              if (isIntercept(rejection.config.url) && onResponseError !== undefined) {
                onResponseError($injector, rejection);
              }

              return $q.reject(rejection);
            };

            return apiInterceptor;
          }
        ];

      }
    ])
  ;

}());