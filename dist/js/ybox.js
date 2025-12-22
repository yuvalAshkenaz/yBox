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
		if( obj.self.hasClass('yBox_share') ) {
			obj.yBoxClass += ' ybox-share-btns';
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
			let titleText = strings.share_page;
			let titleClass = 'ybox-share-title';
			
			if( obj.self.data('ybox-headline') )
				titleText += obj.self.data('ybox-headline');
			
			if( obj.self.data('ybox-headline-class') )
				titleClass += obj.self.data('ybox-headline-class');
			
			code = '<h2 id="ybox-img-title" class="' + titleClass + '">' + titleText + '</h2>'+
					'<ul class="ybox-socials-list">'+
						'<li>'+
							'<button type="button" class="ybox-share-btn ybox-facebook-share-btn" aria-label="' + strings.share_facebook + '" title="' + strings.share_facebook + '">'+
								'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>'+
							'</button>'+
						'</li>'+
						'<li>'+
							'<button type="button" class="ybox-share-btn ybox-twitter-share-btn" aria-label="' + strings.share_x + '" title="' + strings.share_x + '">'+
								'<svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path></g></svg>'+
							'</button>'+
						'</li>'+
						'<li>'+
							'<button type="button" count-layout="horizontal" class="ybox-share-btn ybox-pinterest-share-btn" aria-label="' + strings.share_pinterest + '" title="' + strings.share_pinterest + '">'+
								'<svg viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M255.998,0.001c-141.384,0 -255.998,114.617 -255.998,255.998c0,108.456 67.475,201.171 162.707,238.471c-2.24,-20.255 -4.261,-51.405 0.889,-73.518c4.65,-19.978 30.018,-127.248 30.018,-127.248c0,0 -7.659,-15.334 -7.659,-38.008c0,-35.596 20.632,-62.171 46.323,-62.171c21.839,0 32.391,16.399 32.391,36.061c0,21.966 -13.984,54.803 -21.203,85.235c-6.03,25.482 12.779,46.261 37.909,46.261c45.503,0 80.477,-47.976 80.477,-117.229c0,-61.293 -44.045,-104.149 -106.932,-104.149c-72.841,0 -115.597,54.634 -115.597,111.095c0,22.004 8.475,45.596 19.052,58.421c2.09,2.535 2.398,4.758 1.776,7.343c-1.945,8.087 -6.262,25.474 -7.111,29.032c-1.117,4.686 -3.711,5.681 -8.561,3.424c-31.974,-14.884 -51.963,-61.627 -51.963,-99.174c0,-80.755 58.672,-154.915 169.148,-154.915c88.806,0 157.821,63.279 157.821,147.85c0,88.229 -55.629,159.232 -132.842,159.232c-25.94,0 -50.328,-13.476 -58.674,-29.394c0,0 -12.838,48.878 -15.95,60.856c-5.782,22.237 -21.382,50.109 -31.818,67.11c23.955,7.417 49.409,11.416 75.797,11.416c141.389,0 256.003,-114.612 256.003,-256.001c0,-141.381 -114.614,-255.998 -256.003,-255.998Z"/></g></svg>'+
							'</button>'+
						'</li>'+
						'<li>'+
							'<a href="https://web.whatsapp.com/send?text=' + location.href + '" rel="nofollow" target="_blank" class="ybox-share-btn ybox-whatsapp-share-btn hide-on-mobile" aria-label="' + strings.share_whatsapp + '" title="' + strings.share_whatsapp + '">'+
								'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>'+
							'</a>'+
							'<a href="whatsapp://send?text=' + location.href + '" rel="nofollow" target="_blank" class="ybox-share-btn ybox-whatsapp-share-btn show-on-mobile" aria-label="' + strings.share_whatsapp + '" title="' + strings.share_whatsapp + '">'+
								'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<button type="button" count-layout="horizontal" class="ybox-share-btn ybox-linkedin-share-btn" aria-label="' + strings.share_linkedin + '" title="' + strings.share_linkedin + '">'+
								'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>'+
							'</button>'+
						'</li>'+
						'<li>'+
							'<a href="mailto:?subject=' + strings.share_with + '&body=' + location.href + '" class="ybox-share-btn" rel="nofollow" target="_blank" aria-label="' + strings.share_email + '" title="' + strings.share_email + '">'+
								'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="https://t.me/share/url?url=' + location.href + '&text=' + strings.share_with + '" class="ybox-share-btn ybox-telegram-share-btn" rel="nofollow" target="_blank" aria-label="' + strings.share_telegram + '" title="' + strings.share_telegram + '">'+
								'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path id="telegram-1" d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"/></svg>'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<a href="javascript:window.print();" rel="nofollow" class="ybox-share-btn ybox-print" aria-label="' + strings.print + '" title="' + strings.print + '">'+
								'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 17h-8v-1h8v1zm8-12v13h-4.048c-.404 2.423-3.486 6-6.434 6h-9.518v-6h-4v-13h4v-5h16v5h4zm-18 0h12v-3h-12v3zm12 9h-12v8h6.691c3.469 0 2-3.352 2-3.352s3.309 1.594 3.309-2v-2.648zm4-7h-20v9h2v-4h16v4h2v-9zm-9 11h-5v1h5v-1zm7.5-10c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z"/></svg>'+
							'</a>'+
						'</li>'+
						'<li>'+
							'<button type="button" class="ybox-share-btn ybox-copy-text-btn" aria-label="' + strings.copy_link + '" title="' + strings.copy_link + '">'+
								'<svg class="ybox-copy-hide-on-check" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>'+
								'<svg class="ybox-copy-show-on-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z"/></svg>'+
								'<div class="ybox-copy-show-text-on-check">' + strings.link_copied + '</div>'+
							'</button>'+
						'</li>'+
					'</ul>';
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