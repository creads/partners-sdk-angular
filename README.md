## Angular partners API

This is an Angular module for call Creads Partners API.

### Installation

Choose your prefer methods for installation:

* via bower: `bower install git@gitlab.creads.org:creads/angular-partners-api.git --save`
* via Gitlab: [angular-partners-api](http://gitlab.creads.org/creads/angular-partners-api/repository/archive.zip)

### Usage

Include the file in your application:

```html
<script src="components/angular-partners-api/dist/angular-partners-api.js" ></script>
```

Add the module to your application

```js
var myapp = angular.module('myapp', ['partners.api']);
```

### Configuration

Configure the API factory for your application:

```js
myapp.config([
  'apiProvider',
  function(apiProvider) {

    // configure the api factory
    apiProvider.setConfig({
      endpoint: 'YOUR_ENDPOINT_DESTINATION',
      apiVersion: 'VERSION_OF_ENDPOINT'
    });

  }
]);
```

(Optional) Configure the interceptor for your application:

```js
myapp.config([
  'apiInterceptorProvider',
  function(apiInterceptorProvider) {

    // configure the interceptor method
    apiInterceptorProvider

      // Optional
      .setOnRequest(function(config) {

        // Do what you want with the request config object

        return config;
      })

      // Optional
      // The error method provide $injector as first parameter
      setOnRequestError(function($injector, rejection) {

        // Do what you want with the rejection

      })

      // Optional
      setOnResponse(function(response) {

        // Do what you want with the response

        return response;
      })

      // Optional
      // The error method provide $injector as first parameter
      setOnResponseError(function($injector, rejection) {

        // Do what you want with the rejection

      })

    ;

  }
]);
```
> for more information about interceptor see [angular $http doc section interceptor](https://docs.angularjs.org/api/ng/service/$http)