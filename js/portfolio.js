$(document).ready(function(){

	var INTRO_LINK = "#intro";
	var WORK_LINK = "#work";
	var SCROLL_DURATION = 800;
	var MOBILE_NAV_BREAKPOINT = 925;

	// Control smooth scrolling
	$.localScroll({duration:SCROLL_DURATION});
	
	/*$(".expand, .contract, .title").click(toggleDescription);
	
	/*function toggleDescription(){
		$(".expand").toggleClass("contract");
		//$(".contract").toggle();
		$(".description").slideToggle();
	}*/
	
	
	// Fix the nav bar to the screen while scrolling
	moveScroller();
	
	function moveScroller() {
		var move = function() {
			var st = $(window).scrollTop();
			var ot = $("#nav-anchor").offset().top;
			var s = $("#nav-bar");
			var ww = window.innerWidth;
			/*console.log("st: "+st);
			console.log("ot: "+ot);*/
			if(st > ot) {
				s.css({
					position: "fixed",
					top: "0px"
				});
			} else {
				if(st <= ot) {
					s.css({
						position: "relative",
						top: ""
					});
				}
			}
		};
		$(window).scroll(move);
		move();
	}
	
	

	$(".detail-link").click( function(event){
		$(".lightbox").fadeIn(200);
	});


	// Highlight the active section in the nav

	// Used to turn off content-sensitive highlighting when the nav is clicked.
	// Otherwise the smooth scroller highlights incorrect nav items
	var navClicked = false; 

	var $aChildren = $(".nav").children(); // find the a children of the list items

    var navContracted = true;

    $(window).scroll(function(){
    	if(!navClicked) {
	        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
	        var windowHeight = $(window).height(); // get the height of the window
	        var docHeight = $(document).height();

            var theID = WORK_LINK;
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {

	            // Expand nav-works if we are in the Work section
	            if(navContracted && window.innerWidth > MOBILE_NAV_BREAKPOINT) {
	            	expandNavWorks();
	            }
	        }

	        // If we're at the top of the screen, Intro should be active
	        var $navFirstChild = $(".nav:first-child a");
	        var hrefFirst = INTRO_LINK;
	        if(windowPos < $(hrefFirst).offset().top) {
	            if(window.innerWidth > MOBILE_NAV_BREAKPOINT){
	            	contractNavWorks();
	            }
	        }

	    }
    });

	var $navWorks = $(".nav-works");
	function expandNavWorks(){
		$navWorks.slideDown(1000);
		navContracted = false;
	}

	function contractNavWorks(){
		$navWorks.slideUp(800);
		navContracted = true;
	}

	function toggleNavWorks(){
		$navWorks.slideToggle(800);
		navContracted = !navContracted;
	}


	// Collapse thumbnails of nav-pieces in the nav bar as necessary according to window height
	
	// Need to get the height of a nav-collapsed element,
	// So create a hidden element and record the height


	var MIN_HEIGHT = 12;
	var $html = $('html');
	var $mainWrap = $("#main-wrap");
	var $navOpenBtn = $("#nav-open-btn");
	var $navCloseBtn = $("#nav-close-btn");
	var $nav = $("#nav");
	var $navWorks = $(".nav-works");
	var $navPieces = $(".nav-piece");
	var $navImages = $(".nav-img");
	var $highlights = $(".highlight");
	var navPieceHeight = $navPieces.height();
	var navPieceWidth = navPieceHeight;
	var numNavPieces = $navPieces.length;
	var navBarHeight = $("#nav-bar").height() 
		+ parseInt($("#nav-bar").css("marginTop"));
	var extraMargin = parseInt($(".nav-works").css("marginBottom"));
	var fullNavHeight = navBarHeight + navPieceHeight * numNavPieces + extraMargin;
	var currNavHeight = fullNavHeight;



	adjustNav();

	function adjustNav() {
		var windowHeight = window.innerHeight;
		
		// Mobile nav's height is set to the exact screen height
		if(window.innerWidth <= MOBILE_NAV_BREAKPOINT){
			$nav.css("height", window.innerHeight);
		}
		else{

			// Adjust the size of nav thumbnails to fit height if non-mobile
			if(windowHeight < fullNavHeight) {
				var availableHeight = (windowHeight - navBarHeight - extraMargin - navPieceHeight);
				var dHeight = Math.floor( (availableHeight) / numNavPieces );
				if(dHeight >= MIN_HEIGHT) {
					$navWorks.height(availableHeight + navPieceHeight - dHeight - extraMargin);
					$navPieces.height(dHeight);
					$navImages.css("width", navPieceWidth);
					$highlights.css("width", navPieceWidth);
				}

			}
			else {
				$navWorks.height("");
				$navPieces.height(navPieceHeight);
			}
		}

	}

	// Toggles the mobile nav slider
	$navOpenBtn.click( function(event) {
		$html.toggleClass("js-nav-open");
	});

	$mainWrap.click( function(event) {
		$html.removeClass("js-nav-open");
	});

	// Mobile nav needed anchor tags to work with no-JS
	// When JS is active, we need to remove them so localScroll doesn't abuse them
	$($navOpenBtn, $navCloseBtn).removeAttr("href");
	$("#expand-nav-works").click( function(event) {
		$(this).toggleClass("nav-works-open");
		toggleNavWorks();
	});


	// Only call resize function after resizing is complete
	var waitForFinalEvent = (function () {
		var timers = {};
		return function (callback, ms, uniqueId) {
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout (timers[uniqueId]);
		}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

	

	$(window).resize(function () {
	    waitForFinalEvent(function(){
			adjustNav();
	    }, 500, "Collapse");
	});


	// Let the document know javascript is ready,
	// Used by mobile nav.
	$html.addClass("js-ready");


	/* Experimental Modal Box JS */

	$(".piece").click( function(event){
		/*$(this).css({
			"left": $(this).offset().left, 
			"top": $(this).offset().top-$(window).scrollTop(), 
			"position": "fixed"
		});
		$(this).delay(100).css({"transition": "all .3s ease-in-out"});*/
		$("html").addClass("modal-on");
		$(this).addClass("modal-box");
	});
	$(".modal-bg-shadow").click( function(event){
		$("html").removeClass("modal-on");
		$(".piece").removeClass("modal-box");
		/* $(".piece").removeClass("modal-box").css({"top": "0", "left": "0", "position": "relative", "transition": "none"});*/
	});


	var elements = document.getElementsByID('*');

	var unique = function (list, x) {
	    if (x != "" && list.indexOf(x) === -1) {
	        list.push(x);
	    }
	    return list;
	};

	var trim = function (x) { return x.trim(); };

	var classes = [].reduce.call(elements, function (acc, e) {
	    return e.className.split(' ').map(trim).reduce(unique, acc);
	}, []);
	console.log(classes[1]);
	var i = 0;

	for(i = 0; i < classes.length; i++){
		console.log(classes[i]);
	}

	
});