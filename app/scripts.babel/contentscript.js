'use strict';

console.log('\'Allo \'Allo! Content script');

window.addEventListener('load', function() {
  /* Initialize our vars and grab our dom elements*/
  var app = angular.module('amz', ['ngAnimate', 'ngTouch', 'angular-carousel']);
  var html = document.querySelector('html');
  var sidebarInner = document.querySelector('#sidebar');
  var firstAd = angular.element(document.getElementById('desktop-ad-atf'));
  var feedDirective = document.createElement('div');

  /* Bootstraping angular */
  html.setAttribute('ng-app', '');
  html.setAttribute('ng-csp', '');

  sidebarInner.setAttribute('ng-controller', 'MainController');

  /* Factory for our twitter service.
     Could easily be modified to add
     other feeds ie Instagram
  */
 
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
      $scope.feed = [];
      feed.getData().then(function(res) {
        $scope.feed = res.query.results.json.statuses.map(function(obj) {
          var oldDate = obj.created_at;
          obj.created_at = new Date(Date.parse(
            oldDate.replace(/( \+)/, ' UTC$1')
          ));
          return obj;
        });
      });

    });

  /* Initializing our feedDirective and
  adding hover listeners for controls.
  */
  feedDirective.setAttribute('feed-directive', '');
  feedDirective.setAttribute('ng-cloak', '');
  feedDirective.setAttribute('class', 'amz-feed');
  feedDirective.setAttribute('ng-mouseenter', 'hover = true');
  feedDirective.setAttribute('ng-mouseleave', 'hover = false');
  feedDirective.setAttribute('ng-class', '{hover: hover}');

  firstAd.after(feedDirective);
  angular
    .module('amz')
    .directive('feedDirective', function($sce) {
      return {
        restrict: 'EA',
        templateUrl: $sce.trustAsResourceUrl(
          chrome.extension.getURL('templates/carousel.html')
        );
      };
    });

  angular.bootstrap(html, ['amz'], []);
});
