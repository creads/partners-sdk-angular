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