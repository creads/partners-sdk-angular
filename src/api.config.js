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