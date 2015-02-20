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