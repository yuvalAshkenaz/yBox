/*! yBox - v9.2 - 09/11/2025
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
	close	: 'Close',
	next	: 'Next',
	prev	: 'Prev',
	press_tab_again_to_return_to_the_first_button: 'Press Tab again to return to the first button'
};
if( yBox_lang == 'he' || yBox_lang == 'he-IL' || yBox_lang == 'he_IL' ) {
	yBox_lang = 'he';
	strings = {
		close	: 'סגירה',
		next	: 'הבא',
		prev	: 'הקודם',
		press_tab_again_to_return_to_the_first_button: 'לחצו שוב על טאב כדי לחזור לכפתור הראשון'
	};
}
if( yBox_lang == 'ar' || yBox_lang == 'ar-ar' ) {
	yBox_lang = 'ar';
	strings = {
		close	: 'لإغلاق',
		next	: 'التالي',
		prev	: 'السابق',
		press_tab_again_to_return_to_the_first_button: 'اضغط على Tab مرة أخرى للرجوع إلى الزر الأول'
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
function insert_yBox_html( obj ) {
	jQuery('.yBoxFrame').removeClass('yBoxIframeWrap yBoxImgWrap');
	if( obj.hasSelf ) {
		if( obj.self.hasClass('yBox_iframe') ) {
			//iframe
			ybox_iframe(obj);
		} else if( obj.self.hasClass('yBox_video') ) {
			//video
			jQuery('.yBoxFrame').addClass('yBoxIframeWrap');
			var code = '<video class="yBoxVideo" autoplay controls preload plays-inline playsinline><source src="'+obj.url+'" type="video/mp4" /></video>';
			code = yBox_Group(obj.self, code);
			jQuery('.yBoxFrame .insertYboxAjaxHere').html( code );
		} else if( obj.self.hasClass('yBox_ajax') ) {
			//ajax
			jQuery.get( obj.url, function(data) {
				jQuery('.insertYboxAjaxHere').addClass('isAjax').html(data);
			});
		} else if( typeof obj.url !== 'undefined' && obj.url.indexOf('#') == -1 ) {
			//image
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
				var code = '<div class="yBoxImgZoom">'+
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