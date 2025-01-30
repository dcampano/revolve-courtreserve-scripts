// ==UserScript==
// @name         CourtReserve - Additional Features
// @namespace    http://revolvepickleball.com/
// @version      1.9
// @description  Add additional features for CourtReserve
// @author       You
// @match        https://app.courtreserve.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==

/* global $ */
/* global waitForKeyElements */

$(document).ready(function(){
  console.log('ready');
});

waitForKeyElements (
    "#PaymentMethod_Type_4:checked",
    checkForCardOnFile
);

function checkForCardOnFile(jNode) {

    console.log('clicked');
    setTimeout(() => {
        if($("#creditCardOnFile-li.hide").length > 0) {
            alert('Member Might Not Have Card On File: Swipe Card Instead');
        }
   }, 100);
}

/*
jQuery.noconflict();


(function() {
    'use strict';



    // Your code here...

})();
*/
