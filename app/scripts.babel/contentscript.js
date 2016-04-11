'use strict';

console.log('\'Allo \'Allo! Content script');

window.addEventListener('load', function() {
  var app = angular.module('amz', ['ngAnimate', 'ngTouch', 'angular-carousel']);
  var html = document.querySelector('html');
  var sidebarInner = document.querySelector('#sidebar');
  var feedDirective = document.createElement('div');

  html.setAttribute('ng-app', '');
  html.setAttribute('ng-csp', '');

  sidebarInner.setAttribute('ng-controller', 'MainController');

  angular
    .module('amz')
    .factory('FeedFactory', function($http) {
      var json = '/twitter.json';
      var service = {
        getData: getData
      };

      return service;

      function getData() {
        return $http.get(chrome.extension.getURL('/twitter.json'))
          .then(getDataComplete)
          .catch(getDataFailed);
        function getDataComplete(response) {
          return response.data;
        }

        function getDataFailed(error) {
          console.log('XHR failed for getdata');
        }
      }
  });

  angular
    .module('amz')
    .controller('MainController', function($scope, FeedFactory) {
      var feed = FeedFactory;
      console.log('yo controlling');
      console.log('feedfactory', feed);
      $scope.feed = [];
      feed.getData().then(function(res) {
        console.log('res', res);
        $scope.feed = res.query.results.json.statuses;
        console.log($scope.feed);
      });

    });

  console.log('so far, right?');

  feedDirective.setAttribute('feed-directive', '');
  feedDirective.setAttribute('ng-cloak', '');
  feedDirective.setAttribute('class', 'amz-feed');

  sidebarInner.appendChild(feedDirective);

  angular
    .module('amz')
    .directive('feedDirective', function() {
      return {
        restrict: 'EA',
        template: '<ul rn-carousel rn-carousel-controls rn-carousel-auto-slide rn-carousel-controls-allow-loop>' +
        '<li ng-repeat="tweet in feed">' +
        '<a href="https://twitter.com/{{tweet.user.screen_name}}" target="_blank"><span class="user">{{tweet.user.screen_name}}</span></a>' +
        '<span class="body">{{tweet.text}}</span>' +
        '</li>' +
        '</ul>'
      };
    });

  angular.bootstrap(html, ['amz'], []);
});
