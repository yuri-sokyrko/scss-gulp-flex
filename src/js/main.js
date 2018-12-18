var startWindowScroll = 0;

$(window).on('load', function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	}
	$('body').removeClass('loaded');
	// setTimeout(() => {
	// 	$('body').removeClass('loaded');
	// }, 1500);
	handler();
});
/* viewport width */
function viewport(){
	var e = window, 
		a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}
/* viewport width */
$(document).ready(function(){
	/* placeholder*/	   
	$('input, textarea').each(function(){
 		var placeholder = $(this).attr('placeholder');
 		$(this).focus(function(){ $(this).attr('placeholder', '');});
 		$(this).focusout(function(){			 
 			$(this).attr('placeholder', placeholder);  			
 		});
 	});
	/* placeholder*/
	
	/* components */
	
	/*
	
	if($('.styled').length) {
		$('.styled').styler();
	}

	if($('.slick-slider').length) {
		$('.slick-slider').slick({
			dots: true,
			infinite: false,
			speed: 300,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				  }
				},
				{
				  breakpoint: 600,
				  settings: "unslick"
				}				
			]
		});
	}

	if($('.scroll').length) {
		$(".scroll").mCustomScrollbar({
			axis:"x",
			theme:"dark-thin",
			autoExpandScrollbar:true,
			advanced:{autoExpandHorizontalScroll:true}
		});
	}
	
	*/
	
	/* components */
	
	

});

$(window).on('resize', handler);

function initMagnificInline() {
	if($('.js-popup').length){
		$('.js-popup').magnificPopup({
			fixedBgPos: true,
			fixedContentPos: true,
			showCloseBtn: true,
			removalDelay: 0,
			preloader: true,
			type:"inline",
			mainClass: 'mfp-fade mfp-s-loading',
			galery: {enabled: true},
			beforeOpen: function() {
				startWindowScroll = $(window).scrollTop();
			},
			open: function(){
				//initSliders

				if ( $('.mfp-content').height() < $(window).height() ){
					$('body').on('touchmove', function (e) {
						e.preventDefault();
					  });
				}
			},
			close: function() {
				//destroySliders

				$(window).scrollTop(startWindowScroll);
				$('body').off('touchmove');
			}
		});
	}
}

function initMagnificGallery() {
	if($('.js-popup-gallery').length) {
		for(let i = 0; i < $('.js-popup-gallery').length; i++) {
			$('.js-popup-gallery').eq(i).magnificPopup({
				delegate: 'a.img-wrapper',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile mfp-with-zoom',
				fixedBgPos: true,
				fixedContentPos: true,
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1],
					tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title') + `<p>${item.el.attr('data-text')}</p>`;
					}
				},
				zoom: {
					enabled: true,
					duration: 300
				},
				overflowY: 'auto',
				callbacks: {
					// Utils.magnificPopupConfiguration()
					beforeOpen: function() {
						startWindowScroll = $(window).scrollTop();
					},
					open: function(){
						if ( $('.mfp-content').height() < $(window).height() ){
							$('body').on('touchmove', function (e) {
								e.preventDefault();
							  });
						}
					},
					close: function() {
						$(window).scrollTop(startWindowScroll);
						$('body').off('touchmove');
					}
				}
			});
		}
	}
}

function initSLick (slickItem, slickVars) {
	slickItem.slick(slickVars).resize();
}

function mobileNavToggle(dropDownBtn, navItem) {
	dropDownBtn.toggleClass('active');
	removeToggle(navItem);
}

function dropDown(dropDownBtn) {
	dropDownBtn.toggleClass('active');
	var toggleBlock = dropDownBtn.parent().find('.js-dropdown');
	removeToggle(toggleBlock);
}

function removeToggle(toggleBlock) {
	toggleBlock.slideToggle(300, function() {
		if ($(this).css('display') === 'none') {
			$(this).removeAttr('style');
		}
	});
}

$(document).mouseup(function (e){
	// if($('.js-dropdown').hasClass('opened')){
	// 	var div = $('.js-dropdown');
	// 	if (!div.is(e.target) && div.has(e.target).length === 0) {
	// 		div.find('.js-dropdown__content').slideUp();
	// 		div.removeClass('opened');
	// 	}
	// }
});

// function initSliders(){
// 	$('.js-popupMainSlider').slick({
// 		dots: false,
// 		arrows: false,
// 		adaptiveHeight: true,
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		infinite: true,
// 		asNavFor: '.js-popupTabs',
// 		fade: true,
// 		cssEase: 'linear',
// 	}).resize();
		
// 	$('.js-popupNavSlider').slick({
// 		dots: false,
// 		arrows: false,
// 		focusOnSelect: true,
// 		slidesToShow: 4,
// 		slidesToScroll: 1,
// 		infinite: true,
// 		vertical: true,
// 		asNavFor: '.js-popupTabContent',
// 		fade: false,
// 		responsive: [
// 			{
// 				breakpoint: 768,
// 				settings: {
// 					vertical: false,
// 				},
// 			}
// 		]
// 	}).resize();
// }

// function destroySliders(){
// 	$('.js-popupMainSlider').slick('unslick');
// 	$('.js-popupNavSlider').slick('unslick');
// }