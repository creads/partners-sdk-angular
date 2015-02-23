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
          config = {};

      /**
       * Set config for api
       * @param {object} _config
       * @param {string} _config.endpoint
       * @param {string} _config.apiVersion
       */
      this.setConfig = function setConfig(_config) {
        angular.extend(config, _config);
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
           * @param  {object}  _config
           * @param  {string}  _config.method
           * @param  {string}  _config.url
           * @param  {object}  _config.data
           * @param  {object}  _config.params
           * @param  {object}  _config.headers
           * @return {promise}
           */
          api.call = function call(_config) {
            var deferred = $q.defer();

            $http({
              method: _config.method,
              url: config.endpoint + '/' + config.apiVersion + _config.url,
              data: _config.data,
              params: _config.params,
              headers: _config.headers
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

    .provider('apiInterceptor', function() {

      var apiInterceptor = {},
          onRequest,
          onRequestError,
          onResponse,
          onResponseError;

      function isFunction(object) {
        return object && {}.toString.call(object) === '[object Function]';
      }

      /**
       * [setOnRequest description]
       * @param {[type]} callbackRequest
       * @return this
       */
      this.setOnRequest = function setOnRequest(callbackRequest) {
        onRequest = callbackRequest;

        return this;
      };

      /**
       * [setOnRequestError description]
       * @param {[type]} callbackRequestError
       * @return this
       */
      this.setOnRequestError = function setOnRequestError(callbackRequestError) {
        onRequestError = callbackRequestError;

        return this;
      };

      /**
       * [onResponse description]
       * @param  {[type]} callbackResponse
       * @return this
       */
      this.onResponse = function setOnResponse(callbackResponse) {
        onResponse = callbackResponse;

        return this;
      };

      /**
       * [setOnResponseError description]
       * @param {[type]} callbackRequest
       * @return this
       */
      this.setOnResponseError = function setOnResponseError(callbackResponseError) {
        onResponseError = callbackResponseError;

        return this;
      };

      this.$get = [
        '$q',
        '$injector',
        function apiInterceptor($q, $injector) {

          /**
           * [request description]
           * @param  {[type]} config
           * @return {object}
           */
          apiInterceptor.request = function request(config) {

            if (isFunction(onRequest)) {
              config = onRequest(config);
            }

            return config;
          };

          /**
           * [requestError description]
           * @param  {object} rejection
           * @return {promise}
           */
          apiInterceptor.requestError = function requestError(rejection) {

            if (isFunction(onRequestError)) {
              onRequestError($injector, rejection);
            }

            return $q.reject(rejection);
          };

          /**
           * [response description]
           * @param  {object} response
           * @return {object}
           */
          apiInterceptor.response = function response(_response) {

            if (isFunction(onResponse)) {
              _response = onResponse(_response);
            }

            return _response;
          };

          /**
           * [responseError description]
           * @param  {object} rejection
           * @return {promise}
           */
          apiInterceptor.responseError = function responseError(rejection) {

            if (isFunction(onResponseError)) {
              onResponseError($injector, rejection);
            }

            return $q.reject(rejection);
          };

          return apiInterceptor;
        }
      ];

    })
  ;

}());