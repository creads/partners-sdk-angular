(function() {

  'use strict';

  angular
    .module('samplePartnersApi')
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