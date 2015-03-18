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