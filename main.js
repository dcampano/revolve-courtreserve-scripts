// ==UserScript==
// @name         CourtReserve - Additional Features
// @namespace    http://revolvepickleball.com/
// @version      1.7
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
    "div.membership-detail-section",
    appendProRateButton
);

waitForKeyElements (
    "#PaymentMethod_Type_4:checked",
    checkForCardOnFile
);

function appendProRateButton (jNode) {
    var numtext = "ADDSDF";

    jNode.prepend ('<button type="button" onclick="dc_ProRateMembership()" class="btn btn-warning">Pro-Rate - Click BEFORE Assigning Membership</button>');
}

function checkForCardOnFile(jNode) {

    console.log('clicked');
    setTimeout(() => {
        if($("#creditCardOnFile-li.hide").length > 0) {
            alert('Member Might Not Have Card On File: Swipe Card Instead');
        }
   }, 100);
}

function dc_ProRateMembership() {
    var frequency = $("#PaymentFrequency option:selected").text();
    if(frequency == "") {
        frequency = $("#SetMembership_PaymentFrequency option:selected").text();
    }
    var today = new Date();
    var today_str = (today.getMonth() + 1) + '/' + today.getDay() + '/' + today.getFullYear();
    var next_bill = new Date();
    var next_bill_str;
    if(frequency == 'Monthly') {
        next_bill.setMonth(next_bill.getMonth() + 1);
        next_bill_str = (next_bill.getMonth() + 1) + '/1/' + next_bill.getFullYear();
    } else if(frequency == 'Annually') {
        next_bill_str = (next_bill.getMonth() + 1) + '/1/' + (next_bill.getFullYear() + 1);
    } else
    {
        alert('Error With Script: Let Davy Know');
    }

    $("#MembershipStartDate").val(today_str).blur();
    $("#NextPaymentDate").val(next_bill_str).blur();
    $("#CreateProRatedBillingCycle").prop('checked', true);

    $("#SetMembership_MembershipStartDate").val(today_str).blur();
    $("#SetMembership_NextPaymentDate").val(next_bill_str).blur();
    $("#SetMembership_CreateProRatedBillingCycle").prop('checked', true);
}

window.dc_ProRateMembership = dc_ProRateMembership;


/*
jQuery.noconflict();


(function() {
    'use strict';



    // Your code here...

})();
*/
