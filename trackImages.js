/*
  callWhenReadyToGo : This snippet observes DOM for adding new medias (images or videos that take some time to load). When all medias are loaded, callback will be fired.
  This code should be able to work in the majority of cases if we copy and pasted it onto any site as a javascript snippet
 
callWhenReadyToGo(callback) will go through all the img tages in the dom body to see if any is loading currently. It'll wait till all imag tags are loaded and fire callback.
  */
var observeDOM = (function () {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function (obj, callback) {
        if (MutationObserver) {
            // define a new observer
            var obs = new MutationObserver(function (mutations, observer) {
                if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                    callback();
            });
            // have the observer observe for changes in children
            obs.observe(obj, { childList: true, subtree: true });
        }
        else if (eventListenerSupported) {
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();

// Loop through all new images, add the event
var callWhenReadyToGo = function (callback) {
    // check images loading only, change type if needed, data-loaded is just a flag to prevent multiple checks
    var media = document.querySelectorAll('img:not([data-loaded]');
    for (var i = 0; i < media.length; i++) {
        // Fire the callback if complete, otherwise bind to onload
        if (media[i].complete) {
            onMediaLoaded(media[i], callback);
        } else {
            media[i].addEventListener('load', function (event) {
                onMediaLoaded(event.target, callback);
            });
        }
    }
}

// callback will be fired once all images are loaded
var onMediaLoaded = function (element, callback) {
    element.setAttribute('data-loaded', 'true');

    // only fired when there are no images without the 'data-loaded' attribute left
    if (document.querySelectorAll('img:not([data-loaded])').length === 0) {
        callback(); // callback function fired
    }
}

// Observe the DOM body for changes, then fire callback when all images downloaded
observeDOM(document.body, callWhenReadyToGo(alert('All images loaded!')));

