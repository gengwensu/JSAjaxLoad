# callWhenReadyToGo
Modern websites use lots of Ajax calls after a page is loaded. This snippet observes DOM for adding new medias (images or videos that take some time to load). When all medias are loaded, callback will be fired.

Code Language:
Please provide this using Javascript ES 5.0 not ES6 code. You can use anything in default javascript and any chrome extension calls as well.

This code should be able to work in the majority of cases if we copy and pasted it onto any site as a javascript snippet

# Usage

callWhenReadyToGo(callback) should be used as a callback function of observeDOM, a cross-browser snippet that sets up a mutationObserver to observe DOM changes.(see https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom/14570614#14570614)  For example: 


```
observeDOM(document.body, callWhenReadyToGo(alert('All images loaded!')));
```

It will go through all <img> tags in the dom.body and monitor whether there're changes in these tags. It will wait untill all the images are loaded then fires the callback.