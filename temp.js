// ==UserScript==
// @name         Kijiji scroll
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.kijiji.ca/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Your code here...
  var scrollOnBottom = false; // for loading only one time whene scroll is on bottom

  var pageCounter = 1;
  var currentUrl = window.location.href;

  document.getElementById('StickyLeaderboard').style.visibility='hidden'; // remove banner on top



  window.onscroll = function() {
    var posY = window.pageYOffset;
    var h = window.innerHeight;
    var docHeight = document.body.scrollHeight;

    if((posY + h) >= (docHeight-1000) && !scrollOnBottom) {

      scrollOnBottom = true;
      pageCounter += 1;


      var iframeInsert = document.createElement('iframe');
      iframeInsert.style.display = "none";
      iframeInsert.src = pagination(currentUrl, pageCounter);
      iframeInsert.width = '1400px';
      iframeInsert.height = '700px';
      iframeInsert.id = 'frame';
      insertAfter(iframeInsert, document.body);

      var items = document.getElementsByClassName('search-item');

      setTimeout(function() {
        // insert new items from iframe
        var innerDoc = iframeInsert.contentWindow.document;
        var iframeObj = innerDoc.getElementsByClassName('search-item');
        for(let i = 0; i < iframeObj.length; i++) {
            insertAfter(iframeObj[i], items[items.length-1]);
        }

        // insert new pagination from iframe
        var Pagination = document.getElementsByClassName('pagination');
        var iframePagination = innerDoc.getElementsByClassName('pagination');
        insertAfter(iframePagination[0], Pagination[0]);

        // remove iframe
        document.getElementsByTagName("html")[0].removeChild(document.getElementById('frame'));
        // remove pagination
        document.getElementsByClassName('bottom-bar')[0].removeChild(document.getElementsByClassName('pagination')[0]);

        scrollOnBottom = false;
      }, (2 * 1000));
     }}


  function insertAfter(elem, refElem) {
    //console.log(elem + ' | ' + refElem.nextSibling);
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
  }

  function pagination(url, pageNumber) {
    if (typeof url !== 'string') {
        return '';
    }
    var l2 = url.split('/');
    var l3 = '';

    for(let i = 0; i < l2.length; i++) {
        l3 += l2[i] + '/';
        if ( i == 4) {
            l3 += 'page-' + pageNumber + '/';
        }
    }
    return l3;
  }


})();