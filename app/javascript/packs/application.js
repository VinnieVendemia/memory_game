// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()


// Helper JS here

require("jquery")

// When the page is loaded, add the on-click handler to each button
$(document).ready(function() {
		$('[id^=btn-flip-]').each(function(key, value) {
			addOnClick(value);
		});
});

var addOnClick = function(value) {
	var id = $(value).data().id;
	$( value ).on('click', function() {
		$.ajax({
		    url : '/games/1',
		    type : 'PUT',
		    data : {
					'card' : id
		    },
		    dataType:'json',
		    success : function(data) {
		    	refreshCards(data);
		    },
		    error : function(request,error)
		    {
		      console.log('error ', error);
		    }
		});
	});
}

// When a card is clicked, flip the card over (i.e. refresh)
// If it is the end of a turn, and there is not a match
// we will wait for 2 seconds then flip both cards back over
var refreshCards = function(responseData) {
	var card = responseData['card'];
  refreshCard(card, true);

 	if(responseData['wait_then_refresh'] === true) {
 		setTimeout(function(){ 
 			// make ajax call on card again w/o show_card
 			refreshCard(card, false);
 			// make ajax call on prev_card w/o show_card
 			refreshCard(responseData['prev_card'], false);
 		}, 2000);
 	}
};

// refresh or 'flip' a single card
var refreshCard = function(card, showCard) {
	var id = card['id'];
	var data = {};
	if(showCard == true) {
		data['show_card'] = true
	}

	$.ajax({
	    url : `/cards/${id}`,
	    type : 'GET',
	    data : data,
	    success : function(data) {
	    	$(`#card-view-${id}`).html(data);
	    	if(showCard === false) {
	    		addOnClick($(`#btn-flip-${id}`));
	    	}
	    },
	    error : function(request,error)
	    {
	      console.log('error ', error);
	    }
	});
}