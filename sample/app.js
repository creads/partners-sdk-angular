(function() {

  'use strict';

  /**
  * Sample Partners API
  */
  angular
    .module('samplePartnersApi', [
      // Third party dependency
      'ui.router',
      'partners.api'
    ])

    .config([
      'apiProvider',
      'apiInterceptorProvider',
      function(apiProvider, apiInterceptorProvider) {

        // configure the api factory
        apiProvider
          .setVersion('1.0.0-beta3')
        ;

        // configure the interceptor method
        apiInterceptorProvider
          .setOnRequest(function(config) {

            config.headers.Authorization = 'Bearer TOKEN';

            return config;
          })
        ;
      }
    ])


    .config([
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('projects', {
            url: '/projects',
            controller: 'ProjectsController',
            controllerAs: 'vm',
            templateUrl: 'list.html',
            resolve: {
              projects: [
                'api',
                function(api) {
                  // Make call to the API with factory
                  return api.call({
                    method: 'GET',
                    url: '/projects',
                    params: {
                      query: '[["owner", "==", "a615569f1e949b647ba10ed0adca790c"]]',
                      limit: 20,
                      offset: 0
                    }
                  });
                }
              ]
            }
          })
        ;

        $urlRouterProvider.otherwise('/projects');
      }
    ])

    .controller('ProjectsController', [
      'projects',
      ProjectsController
    ])
  ;

  /**
   * [ProjectsController description]
   * @param {object} projects
   */
  function ProjectsController(projects) {

    var vm = this;

    vm.projects = projects.items;

  }

}());