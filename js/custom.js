$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
	$('body').removeClass('loaded'); 
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
};
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
	};

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
	};

	if($('.scroll').length) {
		$(".scroll").mCustomScrollbar({
			axis:"x",
			theme:"dark-thin",
			autoExpandScrollbar:true,
			advanced:{autoExpandHorizontalScroll:true}
		});
	};
	
	*/
	
	/* components */
	
	

});

var handler = function(){
	
	var height_footer = $('footer').height();	
	var height_header = $('header').height();		
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});
	
	
	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;
	
	if (viewport_wid <= 991) {
		
	}
	
}
$(window).on('load', handler);
$(window).resize(handler);

function initMagnific() {
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
			//callbacks: {open: initSliders, close: destroySliders}
		});
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