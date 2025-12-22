/*! yBox - v10.0 - 22/12/2025
* By Yuval Ashkenazi
* https://github.com/yuvalAshkenaz/yBox */

//yBox
jQuery('body').on('click', '.yBox', function(e){
	e.preventDefault();
	e.stopPropagation();
	var self = jQuery(this);
	if( jQuery('.yBoxFocus').length ) {
		if( typeof beforeYboxClose != 'undefined' ) {
			var beforeClose = beforeYboxClose( jQuery('.yBoxFocus') );
			if( beforeClose == false )
				return false;
		}
		jQuery('.yBoxFocus').not(self).removeClass('yBoxFocus');
	}
	self.addClass('yBoxFocus');
	yBox({ self: self });
});
var yUrl = new URL(document.currentScript.src);
var yBox_lang = yUrl.searchParams.get("lang");
var strings = {
	close				: 'Close',
	next				: 'Next',
	prev				: 'Prev',
	press_tab_again_to_return_to_the_first_button: 'Press Tab again to return to the first button',
	share_page			: 'Share the page',
		share_facebook	: 'Share the page on Facebook',
		share_x			: 'Share the page on X',
		share_pinterest	: 'Share the page on Pinterest',
		share_whatsapp	: 'Share the page on Whatsapp',
		share_linkedin	: 'Share the page on Linkedin',
		share_email		: 'Share the page on Email',
		share_telegram	: 'Share the page on Telegram',
		print			: 'Print the page',
		copy_link		: 'Copy the page link',
		link_copied		: 'Link copied',
		share_with		: 'I want to share a link with you.'
};
if( yBox_lang == 'he' || yBox_lang == 'he-IL' || yBox_lang == 'he_IL' ) {
	yBox_lang = 'he';
	strings = {
		close			: 'סגירה',
		next			: 'הבא',
		prev			: 'הקודם',
		press_tab_again_to_return_to_the_first_button: 'לחצו שוב על טאב כדי לחזור לכפתור הראשון',
		share_page		: 'שיתוף הדף',
		share_facebook	: 'שיתוף הדף בפייסבוק',
		share_x			: 'שיתוף הדף ב-X',
		share_pinterest	: 'שיתוף הדף בפינטרסט',
		share_whatsapp	: 'שיתוף הדף בוואטסאפ',
		share_linkedin	: 'שיתוף הדף בלינקדאין',
		share_email		: 'שיתוף הדף באימייל',
		share_telegram	: 'שיתוף הדף בטלגרם',
		print			: 'הדפסת הדף',
		copy_link		: 'העתקת הקישור של הדף',
		link_copied		: 'הקישור הועתק',
		share_with		: 'אני רוצה לשתף איתך קישור'
	};
}
if( yBox_lang == 'ar' || yBox_lang == 'ar-ar' ) {
	yBox_lang = 'ar';
	strings = {
		close			: 'لإغلاق',
		next			: 'التالي',
		prev			: 'السابق',
		press_tab_again_to_return_to_the_first_button: 'اضغط على Tab مرة أخرى للرجوع إلى الزر الأول',
		share_page		: 'شارك الصفحة',
		share_facebook	: 'شارك الصفحة على فيسبوك',
		share_x			: 'شارك الصفحة على X',
		share_pinterest	: 'شارك الصفحة على موقع Pinterest',
		share_whatsapp	: 'شارك الصفحة على واتساب',
		share_linkedin	: 'مشاركة الصفحة على لينكد إن',
		share_email		: 'شارك الصفحة عبر البريد الإلكتروني',
		share_telegram	: 'شارك الصفحة على تيليجرام',
		print			: 'اطبع الصفحة',
		copy_link		: 'انسخ رابط الصفحة',
		link_copied		: 'تم نسخ الرابط',
		share_with		: 'أريد أن أشارك معك رابطاً.'
	};
}

var url 		 = new URL( window.location.href );
var msg 		 = ''; // url.searchParams.get("msg");
var yBoxID 		 = url.searchParams.get("ybox-id");
var yBoxURL		 = ''; // url.searchParams.get("ybox-url");
var yBoxHeadline = ''; // url.searchParams.get("ybox-headline");
var yBoxClassPrm = ''; // url.searchParams.get("ybox-class");
if( msg || yBoxID || yBoxURL ) {
	if( ! jQuery.isEmptyObject( yBoxID ) && ( yBoxID.indexOf('http:') == -1 && yBoxID.indexOf('https:') == -1 ) ) {
		yBoxID = '#'+yBoxID;
	}
	yBox({
		code	  : yBoxID ? false : msg,
		yBoxClass : yBoxClassPrm ? yBoxClassPrm : 'ybox-content-frame',
		id		  : yBoxID ? yBoxID : false,
		url		  : yBoxURL ? yBoxURL : false,
		headline  : yBoxHeadline ? yBoxHeadline : false
	});
	//***** Remove msg from URL ***********
	setTimeout(function(){
		var params = new URLSearchParams(window.location.search);
		params.delete('msg');
		params.delete('ybox-id');
		params.delete('ybox-url');
		params.delete('ybox-class');
		params.delete('ybox-headline');
		
		if( yBoxURL.indexOf('youtube') > -1 )
			params.delete('list');
		
		if( params.toString() ) {
			params = '?'+params.toString();
		}
		var newURL = window.location.pathname+params;
		window.history.pushState("", "", newURL);
	},500);
}
function yBox( obj ) {
	if( ! jQuery('.yBoxOverlay:not(.active)').length ) {
		var a_or_div;
		if( obj.self ) {
			a_or_div = obj.self;
		} else if( obj.id ) {
			a_or_div = jQuery(obj.id);
		} else if( obj.url ) {
			a_or_div = jQuery('body');
		}
		if( typeof beforeYboxOpen !== 'undefined' && a_or_div ) {
			beforeYboxOpen( a_or_div );
		}
		obj.hasSelf = true;
		
		if( typeof obj.yBoxClass == 'undefined' ) {
			obj.yBoxClass = '';
		}
		if( typeof obj.self == 'undefined' || ! obj.self ) {
			obj.hasSelf = false;
		}
		if( obj.hasSelf ) {
			obj.yBoxClass = obj.self.data('ybox-class') || '';
			obj.url = obj.self.attr('href');
		}
		var html = '<div class="yBoxOverlay no-contrast' + ( yBox_lang == 'he' || yBox_lang == 'ar' ? ' yBoxRTL' : '' ) + ' ' + obj.yBoxClass + '" tabindex="-1">'+
						'<div class="yBoxFrame" role="dialog">'+
							'<button type="button" class="closeYbox" title="' + strings.close + '" aria-label="' + strings.close + '"></button>'+
							'<div class="insertYboxAjaxHere" tabindex="-1"></div>'+
						'</div>'+
					'</div>';
					
		if( ! jQuery('.yBoxFrame').length ) {
			jQuery('body').append( html );
			insert_yBox_html(obj);
			// {
				// self	: obj.self,
				// hasSelf	: hasSelf,
				// id		: obj.id,
				// url		: obj.url,
				// code	: obj.code,
				// focus	: obj.focus
			// }
			setTimeout(function(){
				jQuery('.yBoxOverlay').addClass('active');
				if( typeof afterYboxOpen != 'undefined' && a_or_div ) {
					afterYboxOpen( a_or_div );
				}
			}, 200);
		} else {
			if( jQuery('.yBoxFrame.yBoxImgWrap').length ) {
				remove_yBox_placeholder();
				jQuery('.insertYboxAjaxHere').html('');
				insert_yBox_html(obj);
				// {
					// self	: obj.self,
					// hasSelf	: hasSelf,
					// id		: obj.id,
					// url		: obj.url,
					// code	: obj.code,
					// focus	: obj.focus
				// };
				if( typeof afterYboxOpen != 'undefined' ) {
					afterYboxOpen( a_or_div );
				}
			} else {
				jQuery('.insertYboxAjaxHere').animate({
					opacity : 0
				}, function(){
					var athis = jQuery(this);
					setTimeout(function(){
						remove_yBox_placeholder();
						athis.html('');
						insert_yBox_html(obj);
						// {
							// self	: obj.self,
							// hasSelf	: hasSelf,
							// id		: obj.id,
							// url		: obj.url,
							// code	: obj.code,
							// focus	: obj.focus
						// };
						jQuery('.insertYboxAjaxHere').animate({
							opacity : 1
						}, function(){
							if( typeof afterYboxOpen != 'undefined' ) {
								afterYboxOpen( a_or_div );
							}
						});
					}, 200);
				});
			}
		}
	}
};
function ybox_iframe(obj){
	//iframe
	var attrs = '';
	var iframe_headline = '';
	
	if( obj.hasSelf ) {
		if( obj.self.data('ybox-title') )
			attrs += ' title="'+obj.self.data('ybox-title')+'"';
		if( obj.self.data('ybox-headline-class') )
			attrs += ' class="'+obj.self.data('ybox-headline-class')+'"';
		if( obj.self.data('ybox-headline') ) {
			iframe_headline = '<h2 id="ybox-iframe-headline">'+obj.self.data('ybox-headline')+'</h2>';
			attrs += ' aria-labelledby="ybox-iframe-headline"';
		}
	} else {
		// console.log( 'obj.headline', obj.headline );
		if( obj.headline ) {
			iframe_headline = '<h2 id="ybox-iframe-headline">'+obj.headline+'</h2>';
			attrs += ' aria-labelledby="ybox-iframe-headline"';
		}
	}
	
	jQuery('.yBoxFrame').addClass('yBoxIframeWrap');
	if( obj.url.toLowerCase().indexOf('youtube') > -1 || obj.url.toLowerCase().indexOf('youtu.be') > -1 ) {
		var youtube_id = obj.url.replace(/^[^v]+v.(.{11}).*/,"$1").replace('https://youtu.be/','').replace(/.*youtube.com\/embed\//,'');
		obj.url = 'https://www.youtube.com/embed/'+youtube_id+'?wmode=transparent&rel=0&autoplay=1&hl='+yBox_lang;
	} else if( obj.url.toLowerCase().indexOf('vimeo') > -1 ) {
		var vimeoID = obj.url.match(/video\/(\d+)/)[1];
		obj.url = 'https://player.vimeo.com/video/'+vimeoID+'?autoplay=1&background=1';
	}
	var code = iframe_headline + 
				'<iframe src="' + obj.url + '" frameborder="0" wmode="Opaque" allow="autoplay" allowfullscreen id="yBoxIframe" class="yBoxIframe" '+attrs+'></iframe>' + 
				'<button type="button" class="btn-for-focus-only" aria-label="' + strings.press_tab_again_to_return_to_the_first_button + '"></button>';
	
	if( obj.hasSelf )
		code = yBox_Group(obj.self, code);
	
	return code;
}
// Share on Facebook
jQuery('body').on('click', '.ybox-facebook-share-btn', function(){
	window.open('https://www.facebook.com/sharer/sharer.php?u=' + location.href, '', 'resizable=yes,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=900,left=200,height=300,top=100');
});
// Share on twitter
jQuery('body').on('click', '.ybox-twitter-share-btn', function(){
	window.open('https://x.com/share?url=' + location.href, '', 'resizable=yes,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=700,left=200,height=400,top=100');
});
// Share on Pinterest
jQuery('body').on('click', '.ybox-pinterest-share-btn', function(){
	window.open('http://pinterest.com/pin/create/button/?url=' + location.href, '', 'resizable=yes,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=750,left=200,height=530,top=100');
});
// Share on Linkedin
jQuery('body').on('click', '.ybox-linkedin-share-btn', function(){
	window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + location.href, '', 'resizable=yes,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=750,left=200,height=530,top=100');
});
// Copy URL
jQuery('body').on('click', '.ybox-copy-text-btn', function(){
	var $temp = jQuery("<input>");
	jQuery("body").append($temp);
	$temp.val( location.href ).select();
	document.execCommand("copy");
	$temp.remove();
	jQuery('.ybox-copy-text-btn').addClass('active');
	setTimeout(function(){
		jQuery('.ybox-copy-text-btn').removeClass('active');
	}, 3000);
});
function insert_yBox_html( obj ) {
	jQuery('.yBoxFrame').removeClass('yBoxIframeWrap yBoxImgWrap');
	if( obj.hasSelf ) {
		if( obj.self.hasClass('yBox_iframe') ) {
			// Iframe
			ybox_iframe(obj);
		} else if( obj.self.hasClass('yBox_video') ) {
			// Video
			jQuery('.yBoxFrame').addClass('yBoxIframeWrap');
			var code = '<video class="yBoxVideo" autoplay controls preload plays-inline playsinline><source src="'+obj.url+'" type="video/mp4" /></video>';
			code = yBox_Group(obj.self, code);
			jQuery('.yBoxFrame .insertYboxAjaxHere').html( code );
		} else if( obj.self.hasClass('yBox_ajax') ) {
			// Ajax
			jQuery.get( obj.url, function(data) {
				jQuery('.insertYboxAjaxHere').addClass('isAjax').html( data );
			});
		} else if( obj.self.hasClass('yBox_share') ) {
			// Share
			code = '<h2 id="ybox-img-title" class="ybox-share-title">' + strings.share_page + '</h2>\
					<ul class="ybox-socials-list">\
						<li>\
							<button type="button" class="ybox-facebook-share-btn" aria-label="' + strings.share_facebook + '" title="' + strings.share_facebook + '">\
								<svg width="40" height="40" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="17.5" cy="17.5" r="14.875" fill="white"></circle><g clip-path="url(#clip0_1_2253)"><path d="M1.7002 17.5C1.7002 8.77374 8.77398 1.69995 17.5002 1.69995C26.2264 1.69995 33.3002 8.77374 33.3002 17.5C33.3002 26.2262 26.2264 33.3 17.5002 33.3C8.77398 33.3 1.7002 26.2262 1.7002 17.5Z" stroke="#000" stroke-width="2"></path></g><circle cx="17.5" cy="17.5" r="14.875" fill="white"></circle><path d="M21.4797 12.3095H18.9544C18.6552 12.3095 18.3227 12.7032 18.3227 13.2265V15.05H21.4814L21.0037 17.6505H18.3227V25.4572H15.3424V17.6505H12.6387V15.05H15.3424V13.5205C15.3424 11.326 16.8649 9.54272 18.9544 9.54272H21.4797V12.3095Z" fill="#000"></path><defs><clipPath id="clip0_1_2253"><rect width="35" height="35" fill="white"></rect></clipPath></defs></svg>\
							</button>\
						</li>\
						<li>\
							<button type="button" class="ybox-twitter-share-btn" aria-label="' + strings.share_x + '" title="' + strings.share_x + '">\
								<svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 1668.56 1221.19"><g><path d="M834.28,1105.93c-66.86,0-131.73-13.1-192.81-38.93c-58.99-24.95-111.96-60.66-157.44-106.15s-81.2-98.46-106.15-157.44c-25.83-61.08-38.93-125.95-38.93-192.81s13.1-131.73,38.93-192.81c24.95-58.99,60.66-111.96,106.15-157.44c45.49-45.49,98.46-81.2,157.44-106.15c61.08-25.83,125.95-38.93,192.81-38.93s131.73,13.1,192.81,38.93c58.99,24.95,111.96,60.66,157.44,106.15c45.49,45.49,81.2,98.46,106.15,157.44c25.83,61.08,38.93,125.95,38.93,192.81s-13.1,131.73-38.93,192.81c-24.95,58.99-60.66,111.96-106.15,157.44s-98.46,81.2-157.44,106.15C966.01,1092.83,901.14,1105.93,834.28,1105.93z M834.28,143.26c-257.69,0-467.33,209.64-467.33,467.33s209.64,467.33,467.33,467.33s467.33-209.65,467.33-467.33S1091.97,143.26,834.28,143.26z"/></g><g transform="translate(52.390088,-25.058597)"><path fill="#000" d="M485.39,356.79l230.07,307.62L483.94,914.52h52.11l202.7-218.98l163.77,218.98h177.32L836.82,589.6l215.5-232.81h-52.11L813.54,558.46L662.71,356.79H485.39z M562.02,395.17h81.46l359.72,480.97h-81.46L562.02,395.17z"/></g></svg>\
							</button>\
						</li>\
						<li>\
							<button type="button" count-layout="horizontal" class="ybox-pinterest-share-btn" aria-label="' + strings.share_pinterest + '" title="' + strings.share_pinterest + '">\
								<svg width="40" height="40" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" viewBox="0 0 512 512" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M255.998,0.001c-141.384,0 -255.998,114.617 -255.998,255.998c0,108.456 67.475,201.171 162.707,238.471c-2.24,-20.255 -4.261,-51.405 0.889,-73.518c4.65,-19.978 30.018,-127.248 30.018,-127.248c0,0 -7.659,-15.334 -7.659,-38.008c0,-35.596 20.632,-62.171 46.323,-62.171c21.839,0 32.391,16.399 32.391,36.061c0,21.966 -13.984,54.803 -21.203,85.235c-6.03,25.482 12.779,46.261 37.909,46.261c45.503,0 80.477,-47.976 80.477,-117.229c0,-61.293 -44.045,-104.149 -106.932,-104.149c-72.841,0 -115.597,54.634 -115.597,111.095c0,22.004 8.475,45.596 19.052,58.421c2.09,2.535 2.398,4.758 1.776,7.343c-1.945,8.087 -6.262,25.474 -7.111,29.032c-1.117,4.686 -3.711,5.681 -8.561,3.424c-31.974,-14.884 -51.963,-61.627 -51.963,-99.174c0,-80.755 58.672,-154.915 169.148,-154.915c88.806,0 157.821,63.279 157.821,147.85c0,88.229 -55.629,159.232 -132.842,159.232c-25.94,0 -50.328,-13.476 -58.674,-29.394c0,0 -12.838,48.878 -15.95,60.856c-5.782,22.237 -21.382,50.109 -31.818,67.11c23.955,7.417 49.409,11.416 75.797,11.416c141.389,0 256.003,-114.612 256.003,-256.001c0,-141.381 -114.614,-255.998 -256.003,-255.998Z" style="fill:#000;fill-rule:nonzero;"/></g></svg>\
							</button>\
						</li>\
						<li>\
							<a href="https://web.whatsapp.com/send?text=' + location.href + '" rel="nofollow" target="_blank" class="ybox-whatsapp-share-btn hide-on-mobile" aria-label="' + strings.share_whatsapp + '" title="' + strings.share_whatsapp + '">\
								<svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.9984" cy="15.9999" r="13.6" fill="white"></circle><path d="M1.42966 30.5748L3.13355 24.3138L3.24361 23.9093L3.03242 23.5473C1.69654 21.2573 0.994689 18.6528 0.999045 16.0016V16C0.999045 7.71548 7.71453 1 15.999 1C24.2835 1 30.999 7.71548 30.999 16C30.999 24.2845 24.2835 31 15.999 31L15.9974 31C13.3474 31.0043 10.744 30.303 8.45475 28.9681L8.09243 28.7568L7.68781 28.8673L1.42966 30.5748Z" stroke="#000" stroke-width="2"></path><circle cx="15.9984" cy="15.9999" r="13.6" fill="white"></circle><path d="M10.2245 8.4927C10.0179 8.50553 9.81601 8.55995 9.63094 8.6527C9.45737 8.75099 9.29893 8.87386 9.16053 9.0175C8.96853 9.1983 8.85973 9.3551 8.74293 9.5071C8.15159 10.2767 7.83351 11.2214 7.83894 12.1919C7.84214 12.9759 8.04694 13.7391 8.36694 14.4527C9.02133 15.8959 10.0981 17.4239 11.5205 18.8399C11.8629 19.1807 12.1973 19.5231 12.5573 19.8415C14.3228 21.3958 16.4265 22.5168 18.7013 23.1151L19.6117 23.2543C19.9077 23.2703 20.2037 23.2479 20.5013 23.2335C20.9673 23.2094 21.4223 23.0833 21.8341 22.8639C22.0437 22.756 22.2481 22.6385 22.4469 22.5119C22.4469 22.5119 22.5157 22.4671 22.6469 22.3679C22.8629 22.2079 22.9957 22.0943 23.1749 21.9071C23.3077 21.7695 23.4229 21.6079 23.5109 21.4239C23.6357 21.1631 23.7605 20.6655 23.8117 20.2511C23.8501 19.9343 23.8389 19.7615 23.8341 19.6543C23.8277 19.4831 23.6853 19.3055 23.5301 19.2303L22.5989 18.8127C22.5989 18.8127 21.2069 18.2063 20.3573 17.8191C20.2677 17.78 20.1718 17.7578 20.0741 17.7535C19.9647 17.7423 19.854 17.7546 19.7497 17.7896C19.6454 17.8247 19.5498 17.8816 19.4693 17.9567V17.9535C19.4613 17.9535 19.3541 18.0447 18.1973 19.4463C18.1309 19.5355 18.0395 19.6029 17.9346 19.64C17.8298 19.677 17.7162 19.682 17.6085 19.6543C17.5043 19.6264 17.4022 19.5911 17.3029 19.5487C17.1045 19.4655 17.0357 19.4335 16.8997 19.3743L16.8917 19.3711C15.9764 18.9715 15.1289 18.4316 14.3797 17.7711C14.1781 17.5951 13.9909 17.4031 13.7989 17.2175C13.1695 16.6147 12.6209 15.9327 12.1669 15.1887L12.0725 15.0367C12.0047 14.9346 11.9499 14.8244 11.9093 14.7087C11.8485 14.4735 12.0069 14.2847 12.0069 14.2847C12.0069 14.2847 12.3957 13.8591 12.5765 13.6287C12.7271 13.4372 12.8675 13.238 12.9973 13.0319C13.1861 12.7279 13.2453 12.4159 13.1461 12.1743C12.6981 11.0799 12.2341 9.9903 11.7573 8.9087C11.6629 8.6943 11.3829 8.5407 11.1285 8.5103C11.0421 8.5007 10.9557 8.4911 10.8693 8.4847C10.6545 8.47402 10.4391 8.47616 10.2245 8.4911V8.4927Z" fill="#000"></path></svg>\
							</a>\
							<a href="whatsapp://send?text=' + location.href + '" rel="nofollow" target="_blank" class="ybox-whatsapp-share-btn show-on-mobile" aria-label="' + strings.share_whatsapp + '" title="' + strings.share_whatsapp + '">\
								<svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15.9984" cy="15.9999" r="13.6" fill="white"></circle><path d="M1.42966 30.5748L3.13355 24.3138L3.24361 23.9093L3.03242 23.5473C1.69654 21.2573 0.994689 18.6528 0.999045 16.0016V16C0.999045 7.71548 7.71453 1 15.999 1C24.2835 1 30.999 7.71548 30.999 16C30.999 24.2845 24.2835 31 15.999 31L15.9974 31C13.3474 31.0043 10.744 30.303 8.45475 28.9681L8.09243 28.7568L7.68781 28.8673L1.42966 30.5748Z" stroke="#000" stroke-width="2"></path><circle cx="15.9984" cy="15.9999" r="13.6" fill="white"></circle><path d="M10.2245 8.4927C10.0179 8.50553 9.81601 8.55995 9.63094 8.6527C9.45737 8.75099 9.29893 8.87386 9.16053 9.0175C8.96853 9.1983 8.85973 9.3551 8.74293 9.5071C8.15159 10.2767 7.83351 11.2214 7.83894 12.1919C7.84214 12.9759 8.04694 13.7391 8.36694 14.4527C9.02133 15.8959 10.0981 17.4239 11.5205 18.8399C11.8629 19.1807 12.1973 19.5231 12.5573 19.8415C14.3228 21.3958 16.4265 22.5168 18.7013 23.1151L19.6117 23.2543C19.9077 23.2703 20.2037 23.2479 20.5013 23.2335C20.9673 23.2094 21.4223 23.0833 21.8341 22.8639C22.0437 22.756 22.2481 22.6385 22.4469 22.5119C22.4469 22.5119 22.5157 22.4671 22.6469 22.3679C22.8629 22.2079 22.9957 22.0943 23.1749 21.9071C23.3077 21.7695 23.4229 21.6079 23.5109 21.4239C23.6357 21.1631 23.7605 20.6655 23.8117 20.2511C23.8501 19.9343 23.8389 19.7615 23.8341 19.6543C23.8277 19.4831 23.6853 19.3055 23.5301 19.2303L22.5989 18.8127C22.5989 18.8127 21.2069 18.2063 20.3573 17.8191C20.2677 17.78 20.1718 17.7578 20.0741 17.7535C19.9647 17.7423 19.854 17.7546 19.7497 17.7896C19.6454 17.8247 19.5498 17.8816 19.4693 17.9567V17.9535C19.4613 17.9535 19.3541 18.0447 18.1973 19.4463C18.1309 19.5355 18.0395 19.6029 17.9346 19.64C17.8298 19.677 17.7162 19.682 17.6085 19.6543C17.5043 19.6264 17.4022 19.5911 17.3029 19.5487C17.1045 19.4655 17.0357 19.4335 16.8997 19.3743L16.8917 19.3711C15.9764 18.9715 15.1289 18.4316 14.3797 17.7711C14.1781 17.5951 13.9909 17.4031 13.7989 17.2175C13.1695 16.6147 12.6209 15.9327 12.1669 15.1887L12.0725 15.0367C12.0047 14.9346 11.9499 14.8244 11.9093 14.7087C11.8485 14.4735 12.0069 14.2847 12.0069 14.2847C12.0069 14.2847 12.3957 13.8591 12.5765 13.6287C12.7271 13.4372 12.8675 13.238 12.9973 13.0319C13.1861 12.7279 13.2453 12.4159 13.1461 12.1743C12.6981 11.0799 12.2341 9.9903 11.7573 8.9087C11.6629 8.6943 11.3829 8.5407 11.1285 8.5103C11.0421 8.5007 10.9557 8.4911 10.8693 8.4847C10.6545 8.47402 10.4391 8.47616 10.2245 8.4911V8.4927Z" fill="#000"></path></svg>\
							</a>\
						</li>\
						<li>\
							<button type="button" count-layout="horizontal" class="ybox-linkedin-share-btn" aria-label="' + strings.share_linkedin + '" title="' + strings.share_linkedin + '">\
								<svg enable-background="new 0 0 32 32" width="40" height="40" version="1.0" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><rect fill="#000" height="14" width="4" x="7" y="11"/><path d="M20.499,11c-2.791,0-3.271,1.018-3.499,2v-2h-4v14h4v-8c0-1.297,0.703-2,2-2c1.266,0,2,0.688,2,2v8h4v-7C25,14,24.479,11,20.499,11z" fill="#000"/><circle cx="9" cy="8" fill="#000" r="2"/></g></g><g/><g/><g/><g/><g/><g/></svg>\
							</button>\
						</li>\
						<li>\
							<a href="mailto:?subject=' + strings.share_with + '&body=' + location.href + '" rel="nofollow" target="_blank" aria-label="' + strings.share_email + '" title="' + strings.share_email + '">\
								<svg width="40" height="40" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="17.3161" cy="17.3178" r="15.4948" fill="white"></circle><path d="M0.999023 17.5C0.999023 8.38718 8.3862 1 17.499 1C26.6118 1 33.999 8.38718 33.999 17.5C33.999 26.6128 26.6118 34 17.499 34C8.3862 34 0.999023 26.6128 0.999023 17.5Z" stroke="#000" stroke-width="2"></path><path d="M24.4867 10.5C24.9785 10.5 25.3952 10.6706 25.7367 11.0117C26.0783 11.3528 26.249 11.769 26.249 12.2602V22.7398C26.249 23.231 26.0783 23.6472 25.7367 23.9883C25.3952 24.3294 24.9785 24.5 24.4867 24.5H10.5113C10.0195 24.5 9.60285 24.3294 9.26132 23.9883C8.91979 23.6472 8.74902 23.231 8.74902 22.7398V12.2602C8.74902 11.769 8.91979 11.3528 9.26132 11.0117C9.60285 10.6706 10.0195 10.5 10.5113 10.5H24.4867ZM24.4867 14.0205V12.2602L17.4785 16.6404L10.5113 12.2602V14.0205L17.4785 18.3596L24.4867 14.0205Z" fill="#000"></path></svg>\
							</a>\
						</li>\
						<li>\
							<a href="https://t.me/share/url?url=' + location.href + '&text=' + strings.share_with + '" class="ybox-telegram-share-btn" rel="nofollow" target="_blank" aria-label="' + strings.share_telegram + '" title="' + strings.share_telegram + '">\
								<svg width="40" height="40" data-name="Layer 1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256,0C114.615,0,0,114.615,0,256S114.615,512,256,512,512,397.385,512,256,397.385,0,256,0ZM389.059,161.936,343.591,379a16.007,16.007,0,0,1-25.177,9.593l-66.136-48.861-40.068,37.8a5.429,5.429,0,0,1-7.74-.294l-.861-.946,6.962-67.375L336.055,194.266a3.358,3.358,0,0,0-4.061-5.317L171.515,290.519,102.4,267.307a9.393,9.393,0,0,1-.32-17.694L372.5,147.744A12.441,12.441,0,0,1,389.059,161.936Z" fill="#000" /></svg>\
							</a>\
						</li>\
						<li>\
							<a href="javascript:window.print();" rel="nofollow" class="ybox-print" aria-label="' + strings.print + '" title="' + strings.print + '">\
								<svg fill="none" width="40" height="40" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect height="8" width="12" x="6" y="14"/></svg>\
							</a>\
						</li>\
						<li>\
							<button type="button" class="ybox-copy-text-btn" aria-label="' + strings.copy_link + '" title="' + strings.copy_link + '">\
								<svg width="40" height="40" class="ybox-copy-hide-on-check" viewBox="0 0 35 35" fill="none" xmlns="https://www.w3.org/2000/svg"><circle cx="17.3161" cy="17.3178" r="15.4948" fill="white"/><path d="M0.999023 17.5C0.999023 8.38718 8.3862 1 17.499 1C26.6118 1 33.999 8.38718 33.999 17.5C33.999 26.6128 26.6118 34 17.499 34C8.3862 34 0.999023 26.6128 0.999023 17.5Z" stroke="#000" stroke-width="2"/><path d="M20.7133 12.6785H11.6062C10.7186 12.6785 9.99902 13.398 9.99902 14.2856V23.3928C9.99902 24.2804 10.7186 24.9999 11.6062 24.9999H20.7133C21.6009 24.9999 22.3205 24.2804 22.3205 23.3928V14.2856C22.3205 13.398 21.6009 12.6785 20.7133 12.6785Z" fill="#000"/><path d="M23.3916 10H13.7487C12.8659 9.99997 12.1484 10.712 12.1416 11.5948C12.1416 11.5991 12.1416 11.6028 12.1416 11.6071H20.713C22.1917 11.6089 23.3899 12.8071 23.3916 14.2857V22.8572C23.3959 22.8572 23.3996 22.8572 23.4039 22.8572C24.2867 22.8504 24.9988 22.1328 24.9988 21.25V11.6071C24.9988 10.7195 24.2792 10 23.3916 10Z" fill="#000"/></svg>\
								<svg width="40" height="40" class="ybox-copy-show-on-check" viewBox="0 0 32 32" xmlns="https://www.w3.org/2000/svg"><g data-name="check"><path  d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" fill="#000"/><path d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z" fill="#000"/></g></svg>\
								<div class="ybox-copy-show-text-on-check">' + strings.link_copied + '</div>\
							</button>\
						</li>\
					</ul>';
			jQuery('.yBoxFrame .insertYboxAjaxHere').html( code );
		} else if( typeof obj.url !== 'undefined' && obj.url.indexOf('#') == -1 ) {
			// Image
			jQuery('.yBoxFrame').addClass('yBoxImgWrap');
			jQuery('.insertYboxAjaxHere').append('<div style="text-align:center;position:absolute;right:0;left:0;top:0;bottom:0;"><div class="yBoxLoader"></div></div>');
			var img = new Image();
			img.src = obj.url;
			img.className = 'yBoxImg';
			img.onload = function(){
				var alt = obj.self.data('ybox-alt') || '';
				var title = obj.self.data('ybox-title') ? 'title="'+obj.self.data('ybox-title')+'"' : '';
				var img_headline = '';
				var aria_labelledby = '';
				if( obj.self.data('ybox-headline') ) {
					img_headline = '<h2 id="ybox-img-title" class="ybox-img-title">'+obj.self.data('ybox-headline')+'</h2>';
					aria_labelledby = 'aria-labelledby="ybox-img-title"';
				}
				var code = '<div class="yBoxImgWrap2">'+
								'<img src="'+obj.url+'" alt="'+alt+'" '+title+' id="yBoxImg" class="yBoxImg" '+aria_labelledby+' />'+
								img_headline+
							'</div>';
				code = yBox_Group(obj.self, code);
			};
		} else {
			if( typeof obj.url === 'undefined' && typeof obj.code !== 'undefined' ) {
				jQuery('.insertYboxAjaxHere').html( obj.code );
				
				if( typeof obj.self !== 'undefined' && ! obj.self.hasClass('yBoxFocus') ) {
					jQuery('.yBoxFocus').not( obj.self ).removeClass('yBoxFocus');
					obj.self.addClass('yBoxFocus');
				}
			} else {
				jQuery(obj.url).after('<div class="yBoxFramePlaceHolder"></div>');
				if(  jQuery('.insertYboxAjaxHere.isAjax').length ) {
					jQuery('.insertYboxAjaxHere.isAjax').removeClass('isAjax');
				}
				jQuery(obj.url).appendTo('.insertYboxAjaxHere');
			}
		}
		if( window.screen.width > 991 ) {
			setTimeout(function(){
				if( obj.self.data('focus') ) {
					jQuery('.insertYboxAjaxHere .'+obj.self.data('focus')).focus();
				} else {
					setYboxFocus();
				}
			}, 500);
		}
	} else {
		if( obj.url ) {
			obj.code = ybox_iframe( obj );
			jQuery('.insertYboxAjaxHere').html( obj.code );
		} else {
			if( typeof obj.code == 'undefined' && typeof obj.id !== 'undefined' ) {
				jQuery(obj.id).after('<div class="yBoxFramePlaceHolder"></div>');
				jQuery(obj.id).appendTo('.insertYboxAjaxHere');
			} else {
				jQuery('.insertYboxAjaxHere').html( obj.code );
			}
		}
		setTimeout(function(){
			setYboxFocus({ focus: obj.focus });
		}, 500);
	}
};
function setYboxFocus( obj ){
	if( typeof obj != 'undefined' && typeof obj.focus != 'undefined' ) {
		jQuery( obj.focus ).focus();
	} else {
		jQuery('.closeYbox').focus();
	}
};
function yBox_Group( yBoxLink, code ) {
	var group = yBoxLink.data('ybox-group');
	if( group && jQuery('.yBox[data-ybox-group="'+group+'"]').length > 1 ) {
		code = '<button type="button" class="yBoxNext" title="'+strings.next+'"></button>'+
					code+
				'<button type="button" class="yBoxPrev" title="'+strings.prev+'"></button>';
	}
	jQuery('.insertYboxAjaxHere').html(code);
	return code;
};
jQuery('body').on('click','.yBoxNext',function(e){
	yBoxNext( jQuery('.yBoxFocus') );
});
jQuery('body').on('click','.yBoxPrev',function(e){
	yBoxPrev( jQuery('.yBoxFocus') );
});

setTimeout(function(){
	jQuery('.yBox[data-ybox-group]:not(.swiper-slide-duplicate)').each(function(i){
		var group = jQuery(this).data('ybox-group');
		jQuery(this).attr('data-ybox-id', group+'-'+i);
	});
	jQuery('.yBox[data-ybox-group].swiper-slide-duplicate').each(function(i){
		var group = jQuery(this).data('ybox-group');
		jQuery(this).attr('data-ybox-id', group+'-'+i);
	});
}, 500);

function yBoxNext( self ) {
	var group = self.data('ybox-group');
	var next;
	var entered = false;
	jQuery('.yBox[data-ybox-group="'+group+'"]:not(.swiper-slide-duplicate)').each(function(i){
		if( ! entered ) {
			if( jQuery(this).attr('data-ybox-id') == self.attr('data-ybox-id') ) {
				entered = true;
				if( jQuery('.yBox[data-ybox-group="'+group+'"]:not(.swiper-slide-duplicate)').eq(i+1).length ) {
					next = jQuery('.yBox[data-ybox-group="'+group+'"]:not(.swiper-slide-duplicate)').eq(i+1);
				} else {
					next = jQuery('.yBox[data-ybox-group="'+group+'"]:not(.swiper-slide-duplicate)').eq(0);
				}
			}
		}
	});
	if( next ) {
		jQuery('.yBox').data('focus', '');
		next.data('focus', 'yBoxNext');
		next.trigger('click');
	}
};
function yBoxPrev( self ) {
	var group = self.data('ybox-group');
	var prev;
	jQuery('.yBox[data-ybox-group="'+group+'"]:not(.swiper-slide-duplicate)').each(function(i){
		if( jQuery(this).attr('data-ybox-id') == self.attr('data-ybox-id') ) {
			if( jQuery('.yBox[data-ybox-group="'+group+'"]:not(.swiper-slide-duplicate)').eq(i-1).length ) {
				prev = jQuery('.yBox[data-ybox-group="'+group+'"]:not(.swiper-slide-duplicate)').eq(i-1);
			} else {
				var count = jQuery('.yBox[data-ybox-group="'+group+'"]:not(.swiper-slide-duplicate)').length;
				prev = jQuery('.yBox[data-ybox-group="'+group+'"]:not(.swiper-slide-duplicate)').eq(count-1);
			}
		}
	});
	if( prev ) {
		jQuery('.yBox').data('focus', '');
		prev.data('focus', 'yBoxPrev');
		prev.trigger('click');
	}
};
//Close
jQuery('body').on('click','.yBoxOverlay',function(e){
	var classes = '';
	for(var i = 0;i < e.target.classList.length;i++){
		if(e.target.classList[i].indexOf('yBoxOverlay') > -1 || e.target.classList[i].indexOf('active') > -1){
			classes += e.target.classList[i]+' ';
		}
	};
	if(
		classes.indexOf('yBoxOverlay active') > -1 || 
		(
			typeof e.target.className === 'string' && 
			e.target.className.indexOf('closeYbox') > -1
		) 
	) {
		var a_or_div = jQuery('.insertYboxAjaxHere > *').eq(0);
		if( jQuery('.yBoxFocus').length ) {
			a_or_div = jQuery('.yBoxFocus');
		}
		if( typeof beforeYboxClose != 'undefined' ) {
			var beforeClose = beforeYboxClose( a_or_div );
			if( beforeClose == false )
				return false;
		}
		jQuery('.yBoxOverlay').removeClass('active');
		jQuery('.yBoxFocus').focus().removeClass('yBoxFocus');
		setTimeout(function(){
			if( typeof afterYboxClose != 'undefined' ) {
				afterYboxClose( a_or_div );
			}
			remove_yBox_placeholder();
			jQuery('.yBoxOverlay').remove();
		}, 600);
	}
});
function remove_yBox_placeholder() {
	if( jQuery('.yBoxFramePlaceHolder').length ) {
		var element_id = jQuery('.insertYboxAjaxHere > *').eq(0).attr('id');
		if( element_id ) {
			jQuery('#'+element_id).insertBefore('.yBoxFramePlaceHolder');
		} else {
			jQuery('.yBoxFramePlaceHolder').before( jQuery('.insertYboxAjaxHere').html() );
		}
		jQuery('.yBoxFramePlaceHolder').remove();
	}
}
jQuery(document).on('keyup', function(e){
	if( jQuery('.yBoxImg').length ) {
		var src = jQuery('.yBox[href="'+jQuery('.yBoxImg').attr('src')+'"]');
		if(e.keyCode === 39){ //Prev
			if( yBox_lang == 'he' ) {
				yBoxPrev( src );
			} else {
				yBoxNext( src );
			}
		}
		if(e.keyCode === 37){ //Next
			if( yBox_lang == 'he' ) {
				yBoxNext( src );
			} else {
				yBoxPrev( src );
			}
		}
	}
	if(e.keyCode === 27){ //Esc
		jQuery('.closeYbox').trigger('click');
	}
	//Accessibility - Focus
	if( e.keyCode == 9 ) { //Tab
		jQuery('body').addClass('ybox-focus');
	}
});
jQuery(document).on('keydown', function(e){
	var $focusableElements = jQuery('.yBoxFrame').find('button:visible, textarea:not(:disabled), input:not(:disabled):not([type="hidden"]), a:visible, select, iframe, video').filter(':visible');
	var $firstElement = $focusableElements.first();
	var $lastElement = $focusableElements.last();
	
	if( e.keyCode == 9 ) { //Tab
		// If Shift+Tab is pressed and focus is on the first element
		if (e.shiftKey && jQuery(document.activeElement).is($firstElement)) {
			e.preventDefault();
			$lastElement.focus();
		}
		// If Tab is pressed and focus is on the last element
		else if (!e.shiftKey && jQuery(document.activeElement).is($lastElement)) {
			e.preventDefault();
			$firstElement.focus();
		}
	}
});