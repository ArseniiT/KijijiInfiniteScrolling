(function() {
  'use strict';

  // Your code here...
  var loaded = false;
  var footer = document.getElementById('Footer');
  var pageCounter = 1;
  var currentUrl = window.location.href;

  function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
  }

  function pagination (url, pageNumber) {
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

  window.onscroll = function() {
    var posY = window.pageYOffset;
    var h = window.innerHeight;
    var docHeight = document.body.scrollHeight;

    if((posY + h) >= (docHeight-1000) && !loaded) {

      loaded = true;
      pageCounter += 1;


      var iframeInsert = document.createElement('iframe');
      iframeInsert.style.display = "none";
      iframeInsert.src = pagination(currentUrl, pageCounter);
      iframeInsert.width = '1400px'; iframeInsert.height = '700px';
      insertAfter(iframeInsert, footer);

      var items = document.getElementsByClassName('search-item');
      setTimeout(function() {
        var innerDoc = iframeInsert.contentWindow.document;
        var iframeObj = innerDoc.getElementsByClassName('search-item');
        //var Pagination = document.getElementsByClassName('pagination');
        //var iframePagination = innerDoc.getElementsByClassName('pagination');
        for(let i = 0; i < iframeObj.length; i++) {
          insertAfter(iframeObj[i], items[items.length-1]);
        }
        //insertAfter(iframePagination[0], Pagination[0]);/////////////////////////////////////////////
        console.log(iframeObj.length + ' ---------------------------------------------' + items.length);
        }, (2 * 1000));

    }
  }


})();