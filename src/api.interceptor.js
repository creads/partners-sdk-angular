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
                return onRequestError($injector, rejection);
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
                return onResponseError($injector, rejection);
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