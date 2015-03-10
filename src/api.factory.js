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
      this.$get = $get;

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