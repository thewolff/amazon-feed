'use strict';

console.log('\'Allo \'Allo! Content script');

var doc = document;
var sidebarInner = doc.querySelector('.sidebar-inner');
var sidebarContents = sidebarInner.children;
var widget = '<div class="foobar>I AM FULL OF TEST MEAT</div>'

console.log('whats up doc', doc, sidebarInner);
console.log('first child', sidebarInner.firstChild);
console.log('contents', sidebarContents);

sidebarContents[1].insertAdjacentHTML('beforebegin', widget);

//sidebarInner.insertBefore(widget, sidebarInner.firstChild);