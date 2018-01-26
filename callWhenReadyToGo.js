/*
  callWhenReadyToGo : This snippet observes DOM for adding new medias (images or videos that take some time to load). When all medias are loaded, callback will be fired.
  This code should be able to work in the majority of cases if we copy and pasted it onto any site as a javascript snippet
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
            // have the observer observe foo for changes in children
            obs.observe(obj, { childList: true, subtree: true });
        }
        else if (eventListenerSupported) {
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();

// Observe a specific DOM element:
observeDOM(document.getElementById('dom_element'), function () {
    console.log('dom changed');
});

// Observe the DOM for changes
observeDOM(document.body, function () {
    checkNewMedia();
});

// Loop through all new media, add the event
var checkNewMedia = function () {

    // extend this by using document.querySelectorAll("img:not([data-loaded), video:not([data-loaded])") etc.
    var media = document.querySelectorAll('img:not([data-loaded]');
    for (var i = 0; i < media.length; i++) {
        addMediaLoadedEvent(media[i]);
    }
}

// Fire the callback if complete, otherwise bind to onload
var addMediaLoadedEvent = function (element) {
    if (element.complete) {
        onMediaLoaded(element);
    } else {
        element.addEventListener('load', function (event) {
            onMediaLoaded(event.target);
        });
    }
}

// The callback that is fired once an element is loaded
var onMediaLoaded = function (element) {
    element.setAttribute('data-loaded', 'true');

    // only fire when there are no media elements without the 'data-loaded' attribute left
    // again, can be extended to use video, etc.
    if (document.querySelectorAll('img:not([data-loaded])').length === 0) {
        adjustHeights(); // <-- your function
    }
}