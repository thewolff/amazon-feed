'use strict';

console.log('\'Allo \'Allo! Content script');

/*var doc = document;
var sidebarInner = doc.querySelector('.sidebar-inner');
var sidebarContents = sidebarInner.children;
var widget = '<div class="foobar>I AM FULL OF TEST MEAT</div>'

console.log('whats up doc', doc, sidebarInner);
console.log('first child', sidebarInner.firstChild);
console.log('contents', sidebarContents);

sidebarContents[1].insertAdjacentHTML('beforebegin', widget);*/

//sidebarInner.insertBefore(widget, sidebarInner.firstChild); 

window.addEventListener('load', function() {
  var app = angular.module('amz', []);
  var html = document.querySelector('html');
  var sidebarInner = document.querySelector('.sidebar-inner');
  var feedDirective = document.createElement('div');

  html.setAttribute('ng-app', '');
  html.setAttribute('ng-csp', '');

  sidebarInner.setAttribute('ng-controller', 'MainController');

  angular
    .module('amz')
    .controller('MainController', function($scope) {
      console.log('yo controlling');
    });

  console.log('so far, right?');

  feedDirective.setAttribute('feed-directive', '');
  feedDirective.setAttribute('class', 'amz-feed');

  sidebarInner.appendChild(feedDirective);

  angular
    .module('amz')
    .directive('feedDirective', function() {
      return {
        restrict: 'EA',
        template: '<input value="Search on Bing" name="btnB" type="submit">'
      };
    });

  angular.bootstrap(html, ['amz'], []);
});
