# Angular Partners API [![Build Status](https://travis-ci.com/creads/partners-sdk-angular.svg?branch=master)](https://travis-ci.com/creads/partners-sdk-angular)

A simple AngularJS module for Creads Partners API.

## Installation

    npm install @creads/partners-sdk-angular

> If you're using node5, install with `--ignore-scripts` argument
> to avoid a BC bug on postinstall with opencollective required by webpack-cli.

## Usage

Include the file in your application:

```js
require('@creads/partners-sdk-angular');
```

Then add the module to your application:

```js
var myapp = angular.module('myapp', ['partners.api']);
```

## Configuration

Configure the API provider for your application:

```js
myapp.config([
  'apiProvider',
  function(apiProvider) {

    // configure the api provider
    apiProvider
      .setEndpoint('ENDPOINT_URL')
    ;

  }
]);
```

(Optional) Configure the interceptor provider for your application:

```js
myapp.config([
  'apiInterceptorProvider',
  function(apiInterceptorProvider) {

    // configure the interceptor provider
    apiInterceptorProvider

      // Optional
      .setOnRequest(function(config) {

        // Do what you want with the request config object

        return config;
      })

      // Optional
      // The error method provide $injector as first parameter
      .setOnRequestError(function($injector, rejection) {

        // Do what you want with the rejection

      })

    ;

  }
]);
```
> for more information about interceptor see [angular $http doc section interceptor](https://docs.angularjs.org/api/ng/service/$http)

## Building the distribution (/dist)

To build the distribution:

    npm ci
    npm run build

## Running the tests

To run all the tests:

    npm test
