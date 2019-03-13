# Angular Partners API [![Build Status](https://travis-ci.com/creads/partners-sdk-angular.svg?branch=master)](https://travis-ci.com/creads/partners-sdk-angular)

Partners Angular module for call API.

## Installation

Choose your prefer methods for installation:

* via bower: `bower install git@github.com:creads/partners-sdk-angular.git --save`

## Usage

Include the file in your application:

```html
<script src="components/partners-sdk-angular/dist/partners-sdk-angular.js" ></script>
```

Add the module to your application

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

## Options

### API

#### endpoint

Type: `string` Default: `http://api.creads-partners.com/v1`

### API Interceptor

#### isAbleToCatchAllRequest

Type: `boolean` Default: `false`

If set to true the interceptor will catch all request of your application.
If set to false the interceptor will catch only the request begins with your endpoint value provide in API.

#### onRequest

Type: `function` Arguments: `$injector, config`

#### onRequestError

Type: `function` Arguments: `$injector, rejection`

#### onResponse

Type: `function` Arguments: `$injector, config`

#### onResponseError

Type: `function` Arguments: `$injector, rejection`

## Methods

### API

#### call

Return: `promise`

Arguments:

```js
{
  method: 'GET | POST | PUT | etc..', // String method for the call
  url: '/YOUR_URL', // String url you want call
  data: { data1: 'data1', data2: 'data2' }, // Data object or string to be sent as the request message data
  params: { query: 'parms1'}, // Object query string parameters
  headers: {} // Object with headers parameters as Authorization, Content-Type, etc...
}
```

Call the URL provide by your configuration.

#### getEndpoint

Return: `string`

Return the current endpoint of your configuration.
