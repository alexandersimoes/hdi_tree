/*!
 * HDI Tree Onload Functions
 *
 * Copyright (c) 2011 Alexander J. G. Simoes
 * Licensed under the MIT license:
 * (http://www.opensource.org/licenses/mit-license.php)
 *
 */

// Set Globals
var paper;
var paper_h = 425;
var paper_w = 900;

$(document).ready(function() {
	
	// setup the dropdowns
	set_dropdowns();
	
	// element, width, height !DON'T FORGET TO CHANGE CSS STYLE
	paper = setup("viz", paper_w, paper_h);
	
	// country1, year1, country2, year2, show_outlines, show_labels
	var c1 = (getURLParameter('c1') == "null") ? 'United States' : urlDecode(getURLParameter('c1'));
	var c2 = (getURLParameter('c2') == "null") ? 'China' : urlDecode(getURLParameter('c2'));
	var y1 = (getURLParameter('y1') == "null") ? 2010 : parseInt(getURLParameter('y1'));
	var y2 = (getURLParameter('y2') == "null") ? 2010 : parseInt(getURLParameter('y2'));
	set_defaults(c1, y1, c2, y2, true, false);
	
	// paper
	refresh();
	
	// Build Trees based on selections
	$("select").change(refresh);
	$("input").change(refresh);
	
	// Help Button
	$("#help").button({
		icons: {primary: "ui-icon-help"}
	}).click(function(){
		$('.help-container').dialog('open')
		return false;
	})
	// Help Dialog
	$('.help-container').dialog({
		autoOpen: false,
		width: 600,
		buttons: {
			"Ok": function() { 
				$(this).dialog("close"); 
			}
		},
		draggable: false,
		resizable: false,
		modal: true
	});
	
	// Share Button
	$("#share").button({
		icons: {primary: "ui-icon-link"}
	}).click(function(){
		var country1 = $($("select").get(0)).val();
		var year1 = $($("select").get(1)).val();
		var country2 = $($("select").get(2)).val();
		var year2 = $($("select").get(3)).val();
		var query = "?c1="+urlEncode(country1)+"&y1="+year1+"&c2="+urlEncode(country2)+"&y2="+year2;
		var current_url = window.location.href.split('?');
		$("#share_url").val(current_url[0]+query);
		
		$('.share-container').dialog('open')
		return false;
	});
	// Share Dialog
	$('.share-container').dialog({
		autoOpen: false,
		width: 575,
		buttons: {
			"Ok": function() { 
				$(this).dialog("close"); 
			}
		},
		draggable: false,
		resizable: false,
		modal: true
	});

})