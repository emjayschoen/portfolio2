$(document).ready(function(){

	var INTRO_LINK = "#intro";
	var WORK_LINK = "#work";
	var BEAT = 200;
	var SCROLL_DURATION = 4*BEAT;
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
	var $navBtnLink = $("#nav-btn .btn-link");
	var $navCloseBtn = $("#nav-close-btn");
	var $nav = $("#nav");
	var $navSubitems = $(".nav-subitem");
	var $navImages = $(".nav-img");
	var navPieceHeight = $navSubitems.height();
	var navPieceWidth = navPieceHeight;
	var numNavSubitems = $navSubitems.length;
	var navBarHeight = $("#nav-bar").height() 
		+ parseInt($("#nav-bar").css("marginTop"));
	var extraMargin = parseInt($navWorks.css("marginBottom"));
	var fullNavHeight = navBarHeight + navPieceHeight * numNavSubitems + extraMargin;
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
				var dHeight = Math.floor( (availableHeight) / numNavSubitems );
				if(dHeight >= MIN_HEIGHT) {
					$navWorks.height(availableHeight + navPieceHeight - dHeight - extraMargin);
					$navSubitems.height(dHeight);
					$navImages.css("width", navPieceWidth);
				}

			}
			else {
				$navWorks.height("");
				$navSubitems.height(navPieceHeight);
			}
		}

	}

	// Toggles the mobile nav slider
	$navBtnLink.click( function(event) {
		$html.toggleClass("js-nav-open");
	});

	$mainWrap.click( function(event) {
		$html.removeClass("js-nav-open");
	});

	// Mobile nav needed anchor tags to work with no-JS
	// When JS is active, we need to remove them so localScroll doesn't abuse them
	$($navBtnLink, $navCloseBtn).removeAttr("href");
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

	$("#boards-reg .modal-lnk").click( function(event){
		/*$(this).css({
			"left": $(this).offset().left, 
			"top": $(this).offset().top-$(window).scrollTop(), 
			"position": "fixed"
		});
		$(this).delay(100).css({"transition": "all .3s ease-in-out"});*/ 

		/*
		$html.addClass("modal-on");
		$(this).addClass("modal-box");

		Experimental:
		*/

		$(".boards-modal").show();
		$(".boards-reg").hide();
		$html.addClass("modal-on");
		var $parentPiece = $(this).closest(".piece");
		$parentPiece.addClass("modal-box-2");
	});
	//$(".modal-bg-shadow").on('click', closeModal);
	//$(".boards-modal .portfolio-img").on('click', function(){ alert("img")});

	function closeModal(){
		alert("close modal");
		$html.removeClass("modal-on");
		$(".piece").removeClass("modal-box-2");
		$(".boards-modal").hide();
		$(".boards-reg").show();
	}

	/* Experimental Modal Box 2 */

/*	$(".piece:not('.modal-box-3') .modal-lnk").click( function(event){
		var portfolioImgHeight = 415;
		var dur = 4*BEAT;

		var $parentPiece = $(this).closest(".piece");
		console.log("parentPiece: "+$parentPiece.attr('class'));
		if(!$parentPiece.hasClass("modal-box-3")){
			var $modal = $parentPiece.find(".modal");
			var modalHeight = $modal.height();
			var modalTop = $modal.offset().top - $(window).scrollTop();

			$modal.addClass("fixed-modal");

			var contentLeft = parseInt($(".main-content").css("margin-left"), 10);
			var modalPadding = parseInt($modal.css("padding-left"), 10);
			var htmlWidth = $(document).width();
			var modalWidth = htmlWidth * .7 + modalPadding*2;

			var modalLeft =  contentLeft - modalPadding;
			var finalModalLeft = (htmlWidth - modalWidth) * .5;
			console.log("modalLeft: " + modalLeft);
			console.log("modalWidth "+ modalWidth);

			$html.addClass("modal-on");
			$parentPiece.addClass("modal-box-3").css({"height":modalHeight});



			$modal.css({"top":modalTop, "left":modalLeft, "height":modalHeight});
			$modal.animate( { top: 80 }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			$modal.animate( { left: finalModalLeft }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			$modal.animate( { height: portfolioImgHeight*2 }, { duration: dur, queue: false, easing: "easeInOutCubic" });
				//.animate( { top: 80, left: 0, height: portfolioImgHeight*2 }, 800, "easeInOutCubic"
			$parentPiece.find(".extra-img").delay( dur-200 ).fadeIn(200);

			

			$modal.css({"top":modalTop, "left":modalLeft, "height":modalHeight});
				//.addClass("modal-animate")
			$modal.animate( { top: 80 }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			$modal.animate( { left: finalModalLeft }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			//$modal.animate( { top: 80 }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			//$modal.animate( { left: finalModalLeft }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			//$modal.animate( { height: portfolioImgHeight*2 }, { duration: dur, queue: false, easing: "easeInOutCubic" });
				//.animate( { top: 80, left: 0, height: portfolioImgHeight*2 }, 800, "easeInOutCubic"
			$parentPiece.find(".extra-img").delay( dur-200 ).fadeIn(200);

			$modal.delay(2*dur).queue( function(){ $(this).addClass("modal-done").dequeue(); });
		}
	});*/

	var modalOn = false;

	$(".piece:not('.modal-box-3') .modal-lnk").click( function(event){
		var portfolioImgHeight = 415;
		var dur = 4*BEAT;

		var $parentPiece = $(this).closest(".piece");
		console.log("parentPiece: "+$parentPiece.attr('class'));
		if(!$parentPiece.hasClass("modal-box-3")){
			modalOn = true;
			var $modal = $parentPiece.find(".modal");
			var parentHeight = $parentPiece.height();
			var modalHeight = $modal.height();
			var modalTop = $modal.offset().top - $(window).scrollTop()-15;

			$modal.addClass("fixed-modal");


			var $modalTemplate = $(".modal-template");
			var templateTop = parseInt($modalTemplate.css("top"), 10);
			var templateLeft = parseInt($modalTemplate.css("left"), 10);
			var templateWidth = parseInt($modalTemplate.css("width"), 10);

			var contentLeft = parseInt($(".main-content").css("margin-left"), 10);
			var modalPadding = parseInt($modal.css("padding-left"), 10);
			var htmlWidth = $(document).width();
			//var modalWidth = htmlWidth * .6 + modalPadding*2;
			//var modalWidth = templateWidth + modalPadding*2;
			var modalWidth = parseInt($modal.css("width"), 10) + modalPadding*2;

			var modalLeft =  contentLeft - modalPadding;
			var finalModalLeft = (htmlWidth - modalWidth) * .5;

			$html.addClass("modal-on");
			$parentPiece.addClass("modal-box-3").css({"height":parentHeight});

			//$modal.queue(function(nxt) {
			//      $(this).css({"top":modalTop, "left":modalLeft, "height":modalHeight});
			//      nxt();
			//}).queue(function(next) {
			      //$(this).addClass("modal-animate");
			//     next();
			//})
			$modal.css({"top":modalTop, "left":modalLeft/*, "height":modalHeight*/});
				//.addClass("modal-animate")
			//$modal.animate( { top: templateTop }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			//$modal.animate( { left: templateLeft }, { duration: dur, queue: false, easing: "easeInOutCubic"  });

			var translateTop = templateTop-modalTop;
			var translateLeft = templateLeft-modalLeft;
			var translateScale = templateWidth/modalWidth;

			console.log("modalTop "+ modalTop);
			console.log("templateTop "+ templateTop);
			console.log("translateTop "+ translateTop);
			console.log("contentLeft "+ contentLeft);
			console.log("modaLeft "+ modalLeft);
			console.log("templateLeft "+ templateLeft);
			console.log("translateLeft "+ translateLeft);
			console.log("modalWidth "+ modalWidth);
			console.log("templateWidth "+ templateWidth);
			console.log("translateScale "+ translateScale);

			$modal.css("width",templateWidth).animate( { "left": templateLeft, "top": templateTop }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			//$modal.transition( { }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			//$modal.animate( { width: templateWidth }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			//$modal.transition( { scale: translateScale }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			//$modal.animate( { top: 80 }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			//$modal.animate( { left: finalModalLeft }, { duration: dur, queue: false, easing: "easeInOutCubic"  });
			//$modal.animate( { height: portfolioImgHeight }, { duration: dur, queue: false, easing: "easeInOutCubic" });
				//.animate( { top: 80, left: 0, height: portfolioImgHeight*2 }, 800, "easeInOutCubic"
			//$parentPiece.find(".extra-img").delay( dur-200 ).fadeIn(200);

			$(".additional-section").delay(3*BEAT).queue( function(next){ 
				if(modalOn){
					$(this).slideDown({ duration: dur, easing: "easeInOutSine" });
					$(".modal-controls").fadeIn(dur);
				}
				next();
			});
			$modal.delay(2*dur).queue( function(next){ 
				if(modalOn){
					$(this).addClass("modal-done"); 
				}
				next();
			});
		}
	});



	// $(".modal-bg-shadow").on('click', closeModal2);


	$(".modal-container").on("click", function(event){
		var $bubbleParents = $(event.target).parents();
		/*console.log("bubbleParent: "+$bubbleParents.className);*/
		var isBackground = true;
		for(var i = 0; i < $bubbleParents.length; i++){
			if($bubbleParents[i].className.indexOf("modal") == 0){
				isBackground = false;
			}
		}
		if(isBackground){
			closeModal2();
		}
	});

	// Bind the Escape key to close the modal
	$(document).keydown(function(e){
	    if(e.keyCode === 27)
			closeModal2();

	});

	function closeModal2(){
		modalOn = false;
		var pieceWidth = $(".core-column").css("width");
		console.log("closeModal");
		$html.removeClass("modal-on");
		$(".extra-img").hide();
		$(".piece").removeClass("modal-box-3").css("height","100%");
		$(".modal").removeClass("fixed-modal").removeClass("modal-done").css("transform", "none").css("width", pieceWidth);/*.css("height","100%")*/;
		$(".additional-section").hide();
		$(".modal-controls").hide();
	}

	
});