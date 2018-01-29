/*
callWhenReadyToGo : This snippet observes DOM for adding new medias (images or videos that take some time to load). When all medias are loaded, callback will be fired.
This code should be able to work in the majority of cases if we copy and pasted it onto any site as a javascript snippet
 
callWhenReadyToGo(callback) willdetect all ajax requests on the page. It'll wait till all ajax requests are finished and fire callback.
  */

function callWhenReadyToGo(callback) {
    var oldSend, i;
    if (XMLHttpRequest.callbacks) {
        // we've already overridden send() so just add the callback
        XMLHttpRequest.callbacks.push(callback); //add one instance
    } else {
        // create a callback array
        XMLHttpRequest.callbacks = [callback];
        // store the native send()
        oldSend = XMLHttpRequest.prototype.send;
        // override the native send()
        XMLHttpRequest.prototype.send = function () {
            // call the native send()
            oldSend.apply(this, arguments);

            this.onreadystatechange = function (callback) {
                if (this.readyState == 4) {
                    if (XMLHttpRequest.callbacks.length == 1) { //all ajax requests are finished
                        XMLHttpRequest.callbacks[0]();
                    }
                    XMLHttpRequest.callbacks.pop(); //remove one instance
                }
            };
        }
    }
}

callWhenReadyToGo(function () {
    alert("All Ajax requests done! Ready to go!");
});