/*! yBox - v12- 08/01/2026
* By Yuval Ashkenazi
* https://github.com/yuvalAshkenaz/yBox */

var yBoxUrl = new URL(document.currentScript.src);
var yBox_lang = yBoxUrl.searchParams.get("lang") || '';
var yBoxIsDragging = false; 

var strings = {
	close: 'Close',
	next: 'Next',
	prev: 'Prev',
	press_tab_again_to_return_to_the_first_button: 'Press Tab again to return to the first button',
	share_page: 'Share the page',
	share_facebook: 'Share the page on Facebook',
	share_x: 'Share the page on X',
	share_pinterest: 'Share the page on Pinterest',
	share_whatsapp: 'Share the page on Whatsapp',
	share_linkedin: 'Share the page on Linkedin',
	share_email: 'Share the page on Email',
	share_telegram: 'Share the page on Telegram',
	print: 'Print the page',
	copy_link: 'Copy the page link',
	link_copied: 'Link copied',
	share_with: 'I want to share a link with you.'
};

if (yBox_lang === 'he' || yBox_lang === 'he-IL' || yBox_lang === 'he_IL') {
	yBox_lang = 'he';
	strings = {
		close: 'סגירה',
		next: 'הבא',
		prev: 'הקודם',
		press_tab_again_to_return_to_the_first_button: 'לחצו שוב על טאב כדי לחזור לכפתור הראשון',
		share_page: 'שיתוף הדף',
		share_facebook: 'שיתוף הדף בפייסבוק',
		share_x: 'שיתוף הדף ב-X',
		share_pinterest: 'שיתוף הדף בפינטרסט',
		share_whatsapp: 'שיתוף הדף בוואטסאפ',
		share_linkedin: 'שיתוף הדף בלינקדאין',
		share_email: 'שיתוף הדף באימייל',
		share_telegram: 'שיתוף הדף בטלגרם',
		print: 'הדפסת הדף',
		copy_link: 'העתקת הקישור של הדף',
		link_copied: 'הקישור הועתק',
		share_with: 'אני רוצה לשתף איתך קישור'
	};
}
if (yBox_lang === 'ar' || yBox_lang === 'ar-ar') {
	yBox_lang = 'ar';
	strings = {
		close: 'لإغلاق',
		next: 'التالي',
		prev: 'السابق',
		press_tab_again_to_return_to_the_first_button: 'اضغط على Tab مرة أخرى للرجوع إلى الزر الأول',
		share_page: 'شارك الصفحة',
		share_facebook: 'شارك الصفحة على فيسبوك',
		share_x: 'شارك الصفحة على X',
		share_pinterest: 'شارك الصفحة على موقع Pinterest',
		share_whatsapp: 'شارك الصفحة على واتساب',
		share_linkedin: 'مشاركة الصفحة على لينكد إن',
		share_email: 'شارك الصفحة عبر البريد الإلكتروني',
		share_telegram: 'شارك الصفحة على تيليجرام',
		print: 'اطبع الصفحة',
		copy_link: 'انسخ رابط الصفحة',
		link_copied: 'تم نسخ الرابط',
		share_with: 'أريد أن أشارك معك رابطاً.'
	};
}

document.body.addEventListener('click', function(e) {
    let btn = e.target.closest('.yboxThumbBTN'); 
    if (btn) {
        e.preventDefault(); 
        if (yBoxIsDragging) return;
        changeSlide(btn.dataset.id);
    }
});

document.addEventListener('DOMContentLoaded', function() {
	let url = new URL(window.location.href);
	let msg = ''; 
	let yBoxID = url.searchParams.get("ybox-id");
	let yBoxURL = '';
	let yBoxHeadline = ''; 
	let yBoxClassPrm = ''; 

	if (msg || yBoxID || yBoxURL) {
		if (yBoxID && (yBoxID.indexOf('http:') === -1 && yBoxID.indexOf('https:') === -1)) {
			yBoxID = '#' + yBoxID;
		}
		if (yBoxID && !document.querySelector(yBoxID)) {
			return;
		}
		yBox({
			code: yBoxID ? false : msg,
			yBoxClass: yBoxClassPrm ? yBoxClassPrm : 'ybox-content-frame',
			id: yBoxID ? yBoxID : false,
			url: yBoxURL ? yBoxURL : false,
			headline: yBoxHeadline ? yBoxHeadline : false
		});
		setTimeout(function() {
			let params = new URLSearchParams(window.location.search);
			['msg', 'ybox-id', 'ybox-url', 'ybox-class', 'ybox-headline'].forEach(function(p) { params.delete(p); });
			if (yBoxURL && yBoxURL.indexOf('youtube') > -1) params.delete('list');
			let newSearch = params.toString() ? '?' + params.toString() : '';
			let newURL = window.location.pathname + newSearch;
			window.history.pushState("", "", newURL);
		}, 500);
	}
	document.querySelectorAll('.yBox').forEach(function(el) { el.setAttribute('aria-haspopup', 'dialog'); });

    // Preload Images
    setTimeout(function() {
        let preloadedUrls = {};
        document.querySelectorAll('.yBox[data-ybox-group]').forEach(function(el) {
            let href = el.getAttribute('href');
            if (href && !preloadedUrls[href] && href.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)) {
                preloadedUrls[href] = true;
                new Image().src = href;
            }
        });
    }, 1000);
});

document.body.addEventListener('click', function(e) {
	let self = e.target.closest('.yBox');
	if (!self) return;
	e.preventDefault();
	e.stopPropagation();
	let focusedElements = document.querySelectorAll('.yBoxFocus');
	if (focusedElements.length > 0) {
		if (typeof window.beforeYboxClose !== 'undefined') {
			let beforeClose = window.beforeYboxClose(focusedElements[0]);
			if (beforeClose === false) return false;
		}
		focusedElements.forEach(function(el) {
			if (el !== self) el.classList.remove('yBoxFocus');
		});
	}
	self.classList.add('yBoxFocus');
	if (typeof yBox === 'function') {
		yBox({ self: self });
	}
});

function yBox(obj) {
	if (!document.querySelector('.yBoxOverlay:not(.active)')) {
		let a_or_div;
		if (obj.self) a_or_div = obj.self;
		else if (obj.id) a_or_div = document.querySelector(obj.id);
		else if (obj.url) a_or_div = document.body;

		if (typeof beforeYboxOpen !== 'undefined' && a_or_div) {
			beforeYboxOpen(a_or_div);
		}

		obj.hasSelf = true;
		if (typeof obj.yBoxClass === 'undefined') obj.yBoxClass = '';
		if (typeof obj.self === 'undefined' || !obj.self) obj.hasSelf = false;
		if (obj.hasSelf) {
			obj.yBoxClass = obj.self.dataset.yboxClass || '';
			obj.url = obj.self.getAttribute('href');
			if (obj.self.classList.contains('yBox_share')) {
				obj.yBoxClass += ' ybox-share-btns';
			}
		}

		let html = '<div class="yBoxOverlay no-contrast ' + (yBox_lang == 'he' || yBox_lang == 'ar' ? 'yBoxRTL' : '') + ' ' + obj.yBoxClass + '" tabindex="-1">' +
						'<button type="button" class="closeYbox closeYbox-group" title="' + strings.close + '" aria-label="' + strings.close + '"></button>' +
						'<button type="button" class="yBoxPrev" aria-label="' + strings.prev + '" title="' + strings.prev + '"></button>' +
						'<div class="yBoxFrame" role="dialog">' +
							'<button type="button" class="closeYbox" title="' + strings.close + '" aria-label="' + strings.close + '"></button>' +
							'<div class="insertYboxAjaxHere" tabindex="-1"></div>' +
						'</div>' +
						'<button type="button" class="yBoxNext" aria-label="' + strings.next + '" title="' + strings.next + '"></button>' +
					'</div>';

		if (!document.querySelector('.yBoxFrame')) {
			document.body.insertAdjacentHTML('beforeend', html);
			insert_yBox_html(obj);
			setTimeout(function() {
				let overlay = document.querySelector('.yBoxOverlay');
				if(overlay) overlay.classList.add('active');
				if (typeof afterYboxOpen !== 'undefined' && a_or_div) {
					afterYboxOpen(a_or_div);
				}
			}, 200);
		} else {
			let frame = document.querySelector('.yBoxFrame');
			let insertArea = document.querySelector('.insertYboxAjaxHere');
			if (frame.classList.contains('yBoxImgWrap')) {
				remove_yBox_placeholder();
				insert_yBox_html(obj);
				if (typeof afterYboxOpen !== 'undefined') {
					afterYboxOpen(a_or_div);
				}
			} else {
				insertArea.style.transition = 'opacity 0.2s';
				insertArea.style.opacity = '0';
				setTimeout(function() {
					remove_yBox_placeholder();
					insertArea.innerHTML = '';
					insert_yBox_html(obj);
					insertArea.style.opacity = '1';
					setTimeout(function() {
						if (typeof afterYboxOpen !== 'undefined') {
							afterYboxOpen(a_or_div);
						}
					}, 200);
				}, 200);
			}
		}
	}
}

function ybox_iframe(obj) {
	let attrs = '';
	let iframe_headline = '';
	if (obj.hasSelf) {
		if (obj.self.dataset.yboxTitle) attrs += ' title="' + obj.self.dataset.yboxTitle + '"';
		if (obj.self.dataset.yboxHeadlineClass) attrs += ' class="' + obj.self.dataset.yboxHeadlineClass + '"';
		if (obj.self.dataset.yboxHeadline) {
			iframe_headline = '<h2 id="ybox-iframe-headline">' + obj.self.dataset.yboxHeadline + '</h2>';
			attrs += ' aria-labelledby="ybox-iframe-headline"';
		}
	} else {
		if (obj.headline) {
			iframe_headline = '<h2 id="ybox-iframe-headline">' + obj.headline + '</h2>';
			attrs += ' aria-labelledby="ybox-iframe-headline"';
		}
	}
	let frame = document.querySelector('.yBoxFrame');
	if(frame) frame.classList.add('yBoxIframeWrap');
	
	if (obj.url.toLowerCase().indexOf('youtube') > -1 || obj.url.toLowerCase().indexOf('youtu.be') > -1) {
		let youtube_id = obj.url.replace(/^[^v]+v.(.{11}).*/, "$1").replace('https://youtu.be/', '').replace(/.*youtube.com\/embed\//, '');
		obj.url = 'https://www.youtube.com/embed/' + youtube_id + '?wmode=transparent&rel=0&autoplay=1&hl=' + yBox_lang;
	} else if (obj.url.toLowerCase().indexOf('vimeo') > -1) {
		let vimeoID = obj.url.match(/video\/(\d+)/)[1];
		obj.url = 'https://player.vimeo.com/video/' + vimeoID + '?autoplay=1&background=1';
	}
	
	let code = iframe_headline +
		'<iframe src="' + obj.url + '" frameborder="0" wmode="Opaque" allow="autoplay" allowfullscreen id="yBoxIframe" class="yBoxIframe" ' + attrs + '></iframe>' +
		'<button type="button" class="btn-for-focus-only" aria-label="' + strings.press_tab_again_to_return_to_the_first_button + '"></button>';
	if (obj.hasSelf) code = yBox_Group(obj.self, code);
	return code;
}

function insert_yBox_html(obj) {
	let frame = document.querySelector('.yBoxFrame');
	let insertArea = document.querySelector('.insertYboxAjaxHere');
	frame.classList.remove('yBoxIframeWrap', 'yBoxImgWrap');

	if (obj.hasSelf) {
		if (obj.self.classList.contains('yBox_iframe')) {
			obj.code = ybox_iframe(obj);
			insertArea.innerHTML = obj.code;
            attachDragToThumbs();
		} else if (obj.self.classList.contains('yBox_video')) {
			frame.classList.add('yBoxIframeWrap');
			let code = '<video class="yBoxVideo" autoplay controls preload plays-inline playsinline><source src="' + obj.url + '" type="video/mp4" /></video>';
			code = yBox_Group(obj.self, code);
			insertArea.innerHTML = code;
            attachDragToThumbs();
		} else if (obj.self.classList.contains('yBox_ajax')) {
			fetch(obj.url)
				.then(function(response) { return response.text(); })
				.then(function(data) {
					insertArea.classList.add('isAjax');
					insertArea.innerHTML = data;
				})
				.catch(function(err) { console.error('yBox Ajax Error:', err); });
		} else if (obj.self.classList.contains('yBox_share')) {
			let titleText = strings.share_page;
			let titleClass = 'ybox-share-title';
			if (obj.self.dataset.yboxHeadline) titleText += obj.self.dataset.yboxHeadline;
			if (obj.self.dataset.yboxHeadlineClass) titleClass += obj.self.dataset.yboxHeadlineClass;
			let code = '<h2 id="ybox-img-title" class="' + titleClass + '">' + titleText + '</h2>' +
					'<ul class="ybox-socials-list">' +
						'<li><button type="button" class="ybox-share-btn ybox-facebook-share-btn" aria-label="' + strings.share_facebook + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></button></li>' +
						'<li><button type="button" class="ybox-share-btn ybox-twitter-share-btn" aria-label="' + strings.share_x + '"><svg viewBox="0 0 24 24"><g><path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path></g></svg></button></li>' +
						'<li><button type="button" class="ybox-share-btn ybox-pinterest-share-btn" aria-label="' + strings.share_pinterest + '"><svg viewBox="0 0 512 512"><path d="M255.998,0.001c-141.384,0 -255.998,114.617 -255.998,255.998c0,108.456 67.475,201.171 162.707,238.471c-2.24,-20.255 -4.261,-51.405 0.889,-73.518c4.65,-19.978 30.018,-127.248 30.018,-127.248c0,0 -7.659,-15.334 -7.659,-38.008c0,-35.596 20.632,-62.171 46.323,-62.171c21.839,0 32.391,16.399 32.391,36.061c0,21.966 -13.984,54.803 -21.203,85.235c-6.03,25.482 12.779,46.261 37.909,46.261c45.503,0 80.477,-47.976 80.477,-117.229c0,-61.293 -44.045,-104.149 -106.932,-104.149c-72.841,0 -115.597,54.634 -115.597,111.095c0,22.004 8.475,45.596 19.052,58.421c2.09,2.535 2.398,4.758 1.776,7.343c-1.945,8.087 -6.262,25.474 -7.111,29.032c-1.117,4.686 -3.711,5.681 -8.561,3.424c-31.974,-14.884 -51.963,-61.627 -51.963,-99.174c0,-80.755 58.672,-154.915 169.148,-154.915c88.806,0 157.821,63.279 157.821,147.85c0,88.229 -55.629,159.232 -132.842,159.232c-25.94,0 -50.328,-13.476 -58.674,-29.394c0,0 -12.838,48.878 -15.95,60.856c-5.782,22.237 -21.382,50.109 -31.818,67.11c23.955,7.417 49.409,11.416 75.797,11.416c141.389,0 256.003,-114.612 256.003,-256.001c0,-141.381 -114.614,-255.998 -256.003,-255.998Z"/></g></svg></button></li>' +
						'<li><a href="mailto:?subject=' + strings.share_with + '&body=' + location.href + '" class="ybox-share-btn" target="_blank"><svg viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg></a></li>' +
						'<li><a href="https://t.me/share/url?url=' + location.href + '&text=' + strings.share_with + '" class="ybox-share-btn ybox-telegram-share-btn" target="_blank"><svg width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path id="telegram-1" d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"/></svg></a></li>' +
						'<li><a href="javascript:window.print();" class="ybox-share-btn ybox-print"><svg viewBox="0 0 24 24"><path d="M16 17h-8v-1h8v1zm8-12v13h-4.048c-.404 2.423-3.486 6-6.434 6h-9.518v-6h-4v-13h4v-5h16v5h4zm-18 0h12v-3h-12v3zm12 9h-12v8h6.691c3.469 0 2-3.352 2-3.352s3.309 1.594 3.309-2v-2.648zm4-7h-20v9h2v-4h16v4h2v-9zm-9 11h-5v1h5v-1zm7.5-10c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z"/></svg></a></li>' +
						'<li><button type="button" class="ybox-share-btn ybox-copy-text-btn"><svg class="ybox-copy-hide-on-check" viewBox="0 0 24 24"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z"/></svg><svg class="ybox-copy-show-on-check" viewBox="0 0 24 24"><path d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z"/></svg><div class="ybox-copy-show-text-on-check">' + strings.link_copied + '</div></button></li>' +
					'</ul>';
			insertArea.innerHTML = code;
		} else if (typeof obj.url !== 'undefined' && obj.url.indexOf('#') === -1) {
			frame.classList.add('yBoxImgWrap');
			let loaderTimeout = setTimeout(function() {
				insertArea.insertAdjacentHTML('beforeend', '<div style="text-align:center;position:absolute;right:0;left:0;top:0;bottom:0;"><div class="yBoxLoader"></div></div>');
			}, 500);
			let img = new Image();
			img.src = obj.url;
			img.className = 'yBoxImg';
			img.onload = function() {
				let alt = obj.self.dataset.yboxAlt || '';
				let title = obj.self.dataset.yboxTitle ? 'title="' + obj.self.dataset.yboxTitle + '"' : '';
				let img_headline = '';
				let aria_labelledby = '';
				if (obj.self.dataset.yboxHeadline) {
					img_headline = '<h2 id="ybox-img-title" class="ybox-img-title">' + obj.self.dataset.yboxHeadline + '</h2>';
					aria_labelledby = 'aria-labelledby="ybox-img-title"';
				}
				let code = '<div class="yBoxImgWrap2">' +
								'<img src="' + obj.url + '" alt="' + alt + '" ' + title + ' id="yBoxImg" class="yBoxImg" ' + aria_labelledby + ' />' +
								img_headline +
							'</div>';
				code = yBox_Group(obj.self, code);
				if (typeof loaderTimeout !== 'undefined') clearTimeout(loaderTimeout);
				insertArea.innerHTML = code;
                
                attachDragToThumbs();
			};
		} else {
            if (typeof obj.url === 'undefined' && typeof obj.code !== 'undefined') {
				insertArea.innerHTML = obj.code;
				if (typeof obj.self !== 'undefined' && !obj.self.classList.contains('yBoxFocus')) {
					let focused = document.querySelector('.yBoxFocus');
					if(focused && focused !== obj.self) focused.classList.remove('yBoxFocus');
					obj.self.classList.add('yBoxFocus');
				}
			} else {
				let targetEl = document.querySelector(obj.url);
				if(targetEl) {
					targetEl.insertAdjacentHTML('afterend', '<div class="yBoxFramePlaceHolder"></div>');
					insertArea.classList.remove('isAjax');
					insertArea.appendChild(targetEl);
				}
			}
		}
        
        if (window.screen.width > 991) {
			setTimeout(function() {
				if (obj.self.dataset.focus) {
					let focusEl = insertArea.querySelector('.' + obj.self.dataset.focus);
					if(focusEl) focusEl.focus();
				} else {
					setYboxFocus();
				}
			}, 500);
		}
	} else {
		if (obj.url) {
			obj.code = ybox_iframe(obj);
			insertArea.innerHTML = obj.code;
            attachDragToThumbs();
		} else {
            if (typeof obj.code === 'undefined' && typeof obj.id !== 'undefined') {
				let targetEl = document.querySelector(obj.id);
				if(targetEl) {
					targetEl.insertAdjacentHTML('afterend', '<div class="yBoxFramePlaceHolder"></div>');
					insertArea.appendChild(targetEl);
				}
			} else {
				insertArea.innerHTML = obj.code;
			}
		}
		setTimeout(function() { setYboxFocus({ focus: obj.focus }); }, 500);
	}
}

// Function that was accidentally missing in v11.7
function setYboxFocus(obj) {
	if (typeof obj !== 'undefined' && typeof obj.focus !== 'undefined') {
		let el = document.querySelector(obj.focus);
		if(el) el.focus();
	} else {
		let closeBtn = document.querySelector('.closeYbox');
		if(closeBtn) closeBtn.focus();
	}
}

function getYboxSlideContent(el, url) {
    let code = '';
    let isIframe = el.classList.contains('yBox_iframe');
    let isVideo = el.classList.contains('yBox_video');
    let alt = el.dataset.yboxAlt || '';
    let title = el.dataset.yboxTitle ? 'title="' + el.dataset.yboxTitle + '"' : '';
    let headline = '';
    if (el.dataset.yboxHeadline) {
        headline = '<h2 class="ybox-img-title">' + el.dataset.yboxHeadline + '</h2>';
    }

    if (isIframe || url.indexOf('youtube') > -1 || url.indexOf('vimeo') > -1) {
        let src = url;
        if (src.toLowerCase().indexOf('youtube') > -1 || src.toLowerCase().indexOf('youtu.be') > -1) {
            let youtube_id = src.replace(/^[^v]+v.(.{11}).*/, "$1").replace('https://youtu.be/', '').replace(/.*youtube.com\/embed\//, '');
            src = 'https://www.youtube.com/embed/' + youtube_id + '?wmode=transparent&rel=0&autoplay=0&hl=' + (typeof yBox_lang !== 'undefined' ? yBox_lang : 'en');
        } else if (src.toLowerCase().indexOf('vimeo') > -1) {
            let vimeoID = src.match(/video\/(\d+)/)[1];
            src = 'https://player.vimeo.com/video/' + vimeoID + '?autoplay=0';
        }
        code = '<iframe src="' + src + '" frameborder="0" wmode="Opaque" allowfullscreen class="yBoxIframe"></iframe>';
    } else if (isVideo) {
        code = '<video class="yBoxVideo" controls preload playsinline><source src="' + url + '" type="video/mp4" /></video>';
    } else {
        code = '<div class="yBoxImgWrap2"><img src="' + url + '" alt="' + alt + '" ' + title + ' class="yBoxImg" />' + headline + '</div>';
    }
    return code;
}

function yBox_Group(yBoxLink, currentCode) {
    let group = yBoxLink.dataset.yboxGroup;
    if (!group || document.querySelectorAll('.yBox[data-ybox-group="' + group + '"]').length < 2) {
        let insertArea = document.querySelector('.insertYboxAjaxHere');
        if(insertArea) insertArea.innerHTML = currentCode;
        return currentCode;
    }

    document.querySelector('.yBoxOverlay').classList.add('yBoxGroupOverlay');
    let groupItems = document.querySelectorAll('.yBox[data-ybox-group="' + group + '"]:not(.swiper-slide-duplicate)');
    let slidesHTML = '<div class="yBoxSlidesWrap">';
    
    let thumbsHTML = '<div class="yBoxThumbsWrapper"><div class="yBoxThumbs">';
    
    groupItems.forEach(function(el, index) {
        let url = el.getAttribute('href');
        let isActive = (el === yBoxLink) ? ' active' : '';
        
        let content = getYboxSlideContent(el, url);
        slidesHTML += '<div class="yBoxSlide' + isActive + '" data-id="' + index + '">' + content + '</div>';

        let thumbSrc = '';
        if (url.toLowerCase().indexOf('youtube') > -1 || url.toLowerCase().indexOf('youtu.be') > -1) {
            let youtube_id = url.replace(/^[^v]+v.(.{11}).*/, "$1").replace('https://youtu.be/', '').replace(/.*youtube.com\/embed\//, '');
            thumbSrc = 'https://img.youtube.com/vi/' + youtube_id + '/0.jpg';
        } else if (el.classList.contains('yBox_iframe') || el.classList.contains('yBox_video')) {
            let imgInside = el.querySelector('img');
            thumbSrc = imgInside ? imgInside.getAttribute('src') : '';
        } else {
            thumbSrc = url;
        }

        if(thumbSrc) {
            thumbsHTML += '<button type="button" class="yboxThumbBTN' + isActive + '" data-id="' + index + '" aria-label="Slide ' + (index+1) + '">' +
                            '<img src="' + thumbSrc + '" class="yboxThumbIMG" alt="" />' +
                          '</button>';
        }
    });

    slidesHTML += '</div>';
    thumbsHTML += '</div></div>'; // Close wrapper

    let insertArea = document.querySelector('.insertYboxAjaxHere');
    if(insertArea) {
        insertArea.innerHTML = slidesHTML + thumbsHTML;
    }
    return slidesHTML + thumbsHTML;
}

function attachDragToThumbs() {
    const thumbs = document.querySelector('.yBoxThumbs');
    const wrapper = document.querySelector('.yBoxThumbsWrapper');
    
    if (!thumbs || !wrapper) return;

    if (thumbs.scrollWidth <= wrapper.clientWidth) {
        thumbs.classList.add('justify-center');
        return; 
    } else {
        thumbs.classList.add('is-overflowing');
    }

    let isDown = false;
    let startX;
    let currentTranslate = 0;
    let prevTranslate = 0;

    thumbs.addEventListener('mousedown', (e) => {
        isDown = true;
        thumbs.classList.add('is-dragging');
        startX = e.pageX;
        
        const style = window.getComputedStyle(thumbs);
        const matrix = new WebKitCSSMatrix(style.transform);
        prevTranslate = matrix.m41;
        
        thumbs.style.transition = 'none'; 
    });

    thumbs.addEventListener('mouseleave', () => {
        if(isDown) stopDragging();
    });

    thumbs.addEventListener('mouseup', () => {
        stopDragging();
    });

    thumbs.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        
        const x = e.pageX;
        const walk = (x - startX);
        
        if(Math.abs(walk) > 5) {
            yBoxIsDragging = true;
        }

        currentTranslate = prevTranslate + walk;
        
        const maxTranslate = 0;
        const minTranslate = wrapper.clientWidth - thumbs.scrollWidth;
        
        if (currentTranslate > maxTranslate) {
             currentTranslate = maxTranslate + (currentTranslate - maxTranslate) * 0.3;
        } else if (currentTranslate < minTranslate) {
             currentTranslate = minTranslate + (currentTranslate - minTranslate) * 0.3;
        }

        thumbs.style.transform = `translateX(${currentTranslate}px)`;
    });

    function stopDragging() {
        isDown = false;
        thumbs.classList.remove('is-dragging');
        thumbs.style.transition = 'transform 0.3s ease-out';

        const maxTranslate = 0;
        const minTranslate = wrapper.clientWidth - thumbs.scrollWidth;

        if (currentTranslate > maxTranslate) {
            currentTranslate = maxTranslate;
        } else if (currentTranslate < minTranslate) {
            currentTranslate = minTranslate;
        }

        thumbs.style.transform = `translateX(${currentTranslate}px)`;
        prevTranslate = currentTranslate;
        
        setTimeout(() => { yBoxIsDragging = false; }, 50);
    }
    
    thumbs.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX;
        
        const style = window.getComputedStyle(thumbs);
        const matrix = new WebKitCSSMatrix(style.transform);
        prevTranslate = matrix.m41;
        
        thumbs.style.transition = 'none';
    }, {passive: true});
    
    thumbs.addEventListener('touchend', () => {
        stopDragging();
    });

    thumbs.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX;
        const walk = (x - startX);
        if(Math.abs(walk) > 5) yBoxIsDragging = true;
        
        currentTranslate = prevTranslate + walk;
        
        const minTranslate = wrapper.clientWidth - thumbs.scrollWidth;
        if(currentTranslate > 0) currentTranslate = 0; 
        if(currentTranslate < minTranslate) currentTranslate = minTranslate;

        thumbs.style.transform = `translateX(${currentTranslate}px)`;
    }, {passive: true});
}

function scrollThumbIntoView(index) {
    const thumbs = document.querySelector('.yBoxThumbs');
    const wrapper = document.querySelector('.yBoxThumbsWrapper');
    const activeThumb = thumbs ? thumbs.querySelectorAll('.yboxThumbBTN')[index] : null;

    if (!thumbs || !wrapper || !activeThumb) return;

    const thumbLeft = activeThumb.offsetLeft;
    const thumbWidth = activeThumb.offsetWidth;
    const wrapperWidth = wrapper.clientWidth;

    let newTranslate = -(thumbLeft - (wrapperWidth / 2) + (thumbWidth / 2));

    const maxTranslate = 0;
    const minTranslate = wrapper.clientWidth - thumbs.scrollWidth;

    if (newTranslate > maxTranslate) newTranslate = maxTranslate;
    if (newTranslate < minTranslate) newTranslate = minTranslate;

    thumbs.style.transition = 'transform 0.3s ease-out';
    thumbs.style.transform = `translateX(${newTranslate}px)`;
}

function changeSlide(index) {
    let slides = document.querySelectorAll('.yBoxSlide');
    let thumbs = document.querySelectorAll('.yboxThumbBTN');
    
    slides.forEach(function(s) { s.classList.remove('active'); });
    thumbs.forEach(function(t) { t.classList.remove('active'); });

    if(slides[index]) {
        slides[index].classList.add('active');
        document.querySelectorAll('.yBoxSlide:not(.active) video, .yBoxSlide:not(.active) iframe').forEach(function(media){
             if(media.tagName === 'VIDEO') media.pause();
             else {
                 let src = media.src; 
                 media.src = src; 
             }
        });
    }
    if(thumbs[index]) {
        thumbs[index].classList.add('active');
        scrollThumbIntoView(index);
    }
}

document.body.addEventListener('click', function(e) {
	if(e.target.classList.contains('yBoxNext')) {
		yBoxNext(document.querySelector('.yBoxFocus'));
	}
	if(e.target.classList.contains('yBoxPrev')) {
		yBoxPrev(document.querySelector('.yBoxFocus'));
	}
});

function yBoxNext(self) {
    let activeSlide = document.querySelector('.yBoxSlide.active');
    if(activeSlide) {
        let currentId = parseInt(activeSlide.dataset.id);
        let totalSlides = document.querySelectorAll('.yBoxSlide').length;
        let nextId = currentId + 1;
        
        if (nextId >= totalSlides) {
            nextId = 0; 
        }
        changeSlide(nextId);
    }
}

function yBoxPrev(self) {
    let activeSlide = document.querySelector('.yBoxSlide.active');
    if(activeSlide) {
        let currentId = parseInt(activeSlide.dataset.id);
        let totalSlides = document.querySelectorAll('.yBoxSlide').length;
        let prevId = currentId - 1;
        
        if (prevId < 0) {
            prevId = totalSlides - 1; 
        }
        changeSlide(prevId);
    }
}

// Close Handler
document.body.addEventListener('click', function(e) {
	let isOverlay = false;
	let isCloseBtn = false;
	
	if(e.target.classList.contains('yBoxOverlay')) {
		isOverlay = true;
	}

	if(e.target.closest('.closeYbox')) {
		isCloseBtn = true;
	}

	if (isOverlay || isCloseBtn) {
		let a_or_div = document.querySelector('.insertYboxAjaxHere').firstElementChild;
		let focused = document.querySelector('.yBoxFocus');
		
		if (focused) {
			a_or_div = focused;
		}
		
		if (typeof window.beforeYboxClose !== 'undefined') {
			let beforeClose = window.beforeYboxClose(a_or_div);
			if (beforeClose === false) return false;
		}

		let overlay = document.querySelector('.yBoxOverlay');
		if(overlay) overlay.classList.remove('active');
		
		if(focused) {
			focused.focus();
			focused.classList.remove('yBoxFocus');
		}

		setTimeout(function() {
			if (typeof afterYboxClose !== 'undefined') {
				afterYboxClose(a_or_div);
			}
			remove_yBox_placeholder();
			if(overlay) overlay.remove();
		}, 600);
	}
});

function remove_yBox_placeholder() {
	let placeholder = document.querySelector('.yBoxFramePlaceHolder');
	if (placeholder) {
		let insertArea = document.querySelector('.insertYboxAjaxHere');
		let firstChild = insertArea ? insertArea.firstElementChild : null;
		
		if (firstChild && firstChild.id) {
			 placeholder.parentElement.insertBefore(document.getElementById(firstChild.id), placeholder);
		} else {
			while (insertArea.firstChild) {
				placeholder.parentElement.insertBefore(insertArea.firstChild, placeholder);
			}
		}
		placeholder.remove();
	}
}

document.addEventListener('keyup', function(e) {
	if (document.querySelector('.yBoxImg')) {
		let currentImg = document.querySelector('.yBoxImg');
		let src = document.querySelector('.yBox[href="' + currentImg.getAttribute('src') + '"]');
		
		if (e.keyCode === 39) { 
			if (yBox_lang === 'he') {
				yBoxPrev(src);
			} else {
				yBoxNext(src);
			}
		}
		if (e.keyCode === 37) { 
			if (yBox_lang === 'he') {
				yBoxNext(src);
			} else {
				yBoxPrev(src);
			}
		}
	}
	if (e.keyCode === 27) { 
		let closeBtn = document.querySelector('.closeYbox');
		if(closeBtn) closeBtn.click();
	}
	if (e.keyCode === 9) { 
		document.body.classList.add('ybox-focus');
	}
});

document.addEventListener('keydown', function(e) {
	let frame = document.querySelector('.yBoxOverlay');
	if(!frame) return;

	let focusableElementsString = 'button:not(:disabled), textarea:not(:disabled), input:not(:disabled):not([type="hidden"]), a[href], select, iframe, video';
	let focusableElements = Array.from(frame.querySelectorAll(focusableElementsString));
	
	focusableElements = focusableElements.filter(function(el) { return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0; });

	if(focusableElements.length === 0) return;

	let firstElement = focusableElements[0];
	let lastElement = focusableElements[focusableElements.length - 1];

	if (e.keyCode === 9) { 
		if (e.shiftKey && document.activeElement === firstElement) {
			e.preventDefault();
			lastElement.focus();
		}
		else if (!e.shiftKey && document.activeElement === lastElement) {
			e.preventDefault();
			firstElement.focus();
		}
	}
});