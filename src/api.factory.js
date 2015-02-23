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