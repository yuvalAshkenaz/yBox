/*! yBox - v13.4.0 - 15/10/2026
* By Yuval Ashkenazi
* https://github.com/yuvalAshkenaz/yBox */

const yBoxUrl = new URL(document.currentScript.src);
const yBoxSrcLang = yBoxUrl.searchParams.get("lang") || '';
const yBoxHtmlLang = (document.documentElement.getAttribute('lang') || '').split(/[-_]/)[0].toLowerCase();
if (yBoxSrcLang && yBoxHtmlLang && yBoxSrcLang.split(/[-_]/)[0].toLowerCase() !== yBoxHtmlLang) {
	console.warn('yBox: the yBox language "' + yBoxSrcLang + '" is different from the site language "' + yBoxHtmlLang + '". Remove the lang parameter from the yBox script tag to use the site language automatically.');
}
let yBox_lang = '';
let yBoxIsDragging = false;
let isRTL = false;
let strings = {};

function yBoxSetLang() {
	yBox_lang = yBoxSrcLang || (document.documentElement.getAttribute('lang') || '').split(/[-_]/)[0].toLowerCase() || '';
	isRTL = false;
	strings = {
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
		share_with: 'I want to share a link with you.',
		details: 'More details'
	};

	if (yBox_lang === 'he' || yBox_lang === 'he-IL' || yBox_lang === 'he_IL') {
		isRTL = true;
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
			share_with: 'אני רוצה לשתף איתך קישור',
			details: 'פרטים נוספים'
		};
	}
	if (yBox_lang === 'ar' || yBox_lang === 'ar-ar') {
		isRTL = true;
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
			share_with: 'أريد أن أشارك معك رابطاً.',
			details: 'مزيد من التفاصيل'
		};
	}
}
yBoxSetLang();

// Security helpers
// Escapes a value before it is concatenated into HTML (attribute values and text)
function yBoxEsc(str) {
	return String(str == null ? '' : str)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}
// Returns the URL if its protocol is allowed (http, https, mailto, tel, or relative/#/. selectors), otherwise ''
// allowDataImage: allow data:image/... (only for <img> / poster / thumbnails)
function yBoxSafeUrl(url, allowDataImage) {
	url = String(url == null ? '' : url).trim();
	// Browsers ignore control chars and whitespace inside the scheme ("java\tscript:")
	let scheme = url.replace(/[\u0000-\u0020]/g, '').match(/^([a-z][a-z0-9+.-]*):/i);
	if (!scheme) return url;
	scheme = scheme[1].toLowerCase();
	if (['http', 'https', 'mailto', 'tel'].indexOf(scheme) > -1) return url;
	if (allowDataImage && scheme === 'data' && /^data:image\//i.test(url)) return url;
	return '';
}
function yBoxHref(el) {
	return el ? (el.getAttribute('href') || el.dataset.href || '') : '';
}
function yBoxCssEsc(str) {
	return (window.CSS && CSS.escape) ? CSS.escape(String(str)) : String(str).replace(/["\\]/g, '\\$&');
}
// window.open without giving the opened page access to window.opener (reverse tabnabbing)
function yBoxOpenWindow(url, target, specs) {
	let w = window.open(url, target || '_blank', specs);
	if (w) w.opener = null;
	return w;
}
// Phones and tablets, including iPads that report a desktop user agent
function yBoxIsMobile() {
	if (navigator.userAgentData && navigator.userAgentData.mobile) return true;
	return /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
// Opens an app link, and the web URL if the app did not open (not installed)
function yBoxOpenApp(appUrl, webUrl) {
	let fallback = setTimeout(function() {
		if (!document.hidden) window.location.href = webUrl;
	}, 1500);
	document.addEventListener('visibilitychange', function onHide() {
		if (document.hidden) {
			clearTimeout(fallback);
			document.removeEventListener('visibilitychange', onHide);
		}
	});
	window.location.href = appUrl;
}
function yBoxCopyText(text) {
	if (navigator.clipboard && window.isSecureContext) {
		return navigator.clipboard.writeText(text).catch(function() {
			yBoxCopyFallback(text);
		});
	}
	yBoxCopyFallback(text);
	return Promise.resolve();
}
function yBoxCopyFallback(text) {
	let temp = document.createElement('textarea');
	temp.value = text;
	temp.setAttribute('readonly', '');
	temp.style.position = 'fixed';
	temp.style.opacity = '0';
	document.body.appendChild(temp);
	temp.select();
	temp.setSelectionRange(0, text.length);
	document.execCommand('copy');
	temp.remove();
}
let yBoxThumbsRO = null;

// 1. Thumb Click Listener
document.body.addEventListener('click', function(e) {
    let btn = e.target.closest('.yboxThumbBTN'); 
    if (btn) {
        e.preventDefault(); 
        if (yBoxIsDragging) return;
        changeSlide(btn.dataset.id);
    }
});

// 2. Main Share Handlers
document.body.addEventListener('click', function(e) {
	let shareUrl = '';
    let windowSpecs = 'resizable=yes,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=750,left=200,height=530,top=100';

    const shareBtn = e.target.closest('.ybox-share-btn');
    // On template links (mailto: / ...?url=) href is the share link itself, not the URL to share - only data-href counts there
    const isShareTemplate = el => el.tagName === 'A' && /^mailto:|[?&](url|body)=/i.test(el.getAttribute('href') || '');
    const getHref = el => el ? ((!isShareTemplate(el) && el.getAttribute('href')) || el.dataset.href || null) : null;
    const shareHref = getHref(shareBtn)
        || getHref(shareBtn?.closest('.ybox-socials-list'))
        || location.href;

    if(e.target.closest('.ybox-print')) {
        e.preventDefault();
        window.print();
        return;
    }
    if(e.target.closest('.ybox-facebook-share-btn')) {
        shareUrl = (yBoxIsMobile() ? 'https://m.facebook.com/sharer.php?u=' : 'https://www.facebook.com/sharer/sharer.php?u=') + encodeURIComponent(shareHref);
    }
    else if(e.target.closest('.ybox-telegram-share-btn') && yBoxIsMobile()) {
        e.preventDefault();
        const tgQuery = 'url=' + encodeURIComponent(shareHref) + '&text=' + encodeURIComponent(strings.share_with);
        yBoxOpenApp('tg://msg_url?' + tgQuery, 'https://t.me/share/url?' + tgQuery);
    }
	else if(e.target.closest('.ybox-whatsapp-share-btn')) {
		const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareHref)}`;
		yBoxOpenWindow(whatsappUrl, '_blank');
	}
    else if(e.target.closest('.ybox-twitter-share-btn')) {
        shareUrl = `https://x.com/share?url=${encodeURIComponent(shareHref)}&text=${encodeURIComponent(document.title)}`;
        windowSpecs = 'width=700,height=400';
    }
    else if(e.target.closest('.ybox-pinterest-share-btn')) {
        const ogImage = document.querySelector('meta[property="og:image"]')?.content || '';
        shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(shareHref)}&media=${encodeURIComponent(ogImage)}&description=${encodeURIComponent(document.title)}`;
    }
    else if(e.target.closest('.ybox-linkedin-share-btn')) {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareHref)}`;
    }
    else if(shareHref !== location.href && e.target.closest('a.ybox-share-btn')) {
        e.preventDefault();
        const link = e.target.closest('a.ybox-share-btn');
        const origHref = yBoxSafeUrl(link.getAttribute('href'));
        if (!origHref) return;
        if (origHref.startsWith('mailto:')) {
            window.location.href = origHref.replace(/body=[^&]*/i, 'body=' + encodeURIComponent(shareHref));
        } else {
            yBoxOpenWindow(origHref.replace(/url=[^&]*/i, 'url=' + encodeURIComponent(shareHref)), '_blank');
        }
    }

    if (shareUrl) {
        yBoxOpenWindow(shareUrl, '', windowSpecs);
    }
    else if(e.target.closest('.ybox-copy-text-btn')) {
        let btn = e.target.closest('.ybox-copy-text-btn');
        yBoxCopyText(shareHref).then(function() {
            btn.classList.add('active');
            setTimeout(function() {
                btn.classList.remove('active');
            }, 3000);
        });
    }
});

// 3. Init on Load + Preloader
document.addEventListener('DOMContentLoaded', function() {
	let url = new URL(window.location.href);
	// ybox-id is treated strictly as an element ID (never as a selector, URL or HTML)
	let yBoxID = url.searchParams.get("ybox-id");

	if (yBoxID && document.getElementById(yBoxID)) {
		yBox({
			yBoxClass: 'ybox-content-frame',
			id: '#' + yBoxCssEsc(yBoxID)
		});
		setTimeout(function() {
			let params = new URLSearchParams(window.location.search);
			params.delete('ybox-id');
			let newSearch = params.toString() ? '?' + params.toString() : '';
			let newURL = window.location.pathname + newSearch + window.location.hash;
			window.history.pushState("", "", newURL);
		}, 500);
	}
	document.querySelectorAll('.yBox, .ybox').forEach(function(el) {
		el.setAttribute('aria-haspopup', 'dialog');
		if (el.tagName === 'A') {
			el.setAttribute('role', 'button');
			el.setAttribute('rel', 'nofollow');
		}
	});

    // Preload Images
    setTimeout(function() {
        let preloadedUrls = {};
        document.querySelectorAll('.yBox[data-ybox-group], .ybox[data-ybox-group]').forEach(function(el) {
            let href = el.getAttribute('href');
            if (href && !preloadedUrls[href] && href.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)) {
                preloadedUrls[href] = true;
                new Image().src = href;
            }
        });
    }, 1000);
});

// 4. Main yBox Click Listener
document.body.addEventListener('click', function(e) {
	let self = e.target.closest('.yBox, .ybox');
	if (!self) return;
	e.preventDefault();
	e.stopPropagation();

	let duplicateSlide = self.closest('.swiper-slide-duplicate');
	if (duplicateSlide) {
		let slideIndex = duplicateSlide.dataset.swiperSlideIndex;
		let group = self.dataset.yboxGroup;
		let swiperContainer = duplicateSlide.closest('.swiper-wrapper') || duplicateSlide.parentElement;
		if (slideIndex !== undefined && group && swiperContainer) {
			let realSlide = Array.from(swiperContainer.querySelectorAll('.swiper-slide[data-swiper-slide-index="' + yBoxCssEsc(slideIndex) + '"]'))
				.find(function(el) { return !el.classList.contains('swiper-slide-duplicate'); });
			if (realSlide) {
				let realSelf = realSlide.querySelector('.yBox[data-ybox-group="' + yBoxCssEsc(group) + '"], .ybox[data-ybox-group="' + yBoxCssEsc(group) + '"]');
				if (realSelf) self = realSelf;
			}
		}
	}
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

function yBox( obj = {} ) {
	yBoxSetLang();
	if (typeof obj.self === 'string') {
		obj.self = document.querySelector(obj.self);
	}
	// On phones and tablets the share button opens the device share sheet instead of the popup
	if (obj.self && yBoxHasType(obj.self, 'share') && !obj.noNativeShare && yBoxIsMobile() && navigator.share) {
		const nativeShareUrl = yBoxSafeUrl(yBoxHref(obj.self)) || location.href;
		navigator.share({ title: document.title, url: nativeShareUrl }).catch(function(err) {
			if (err && err.name !== 'AbortError') yBox({ self: obj.self, noNativeShare: true });
		});
		return;
	}
	if (!document.querySelector('.yBoxOverlay:not(.active)')) {
		let a_or_div;
		if (obj.self) a_or_div = obj.self;
		else if (obj.id) a_or_div = document.querySelector(obj.id);
		else if (obj.url) a_or_div = document.body;

		obj.hasSelf = true;
		if (typeof obj.yBoxClass === 'undefined') obj.yBoxClass = '';
		if (typeof obj.self === 'undefined' || !obj.self) obj.hasSelf = false;
		if (obj.hasSelf) {
			obj.yBoxClass = obj.self.dataset.yboxClass || '';
			obj.url = yBoxHref(obj.self) || obj.url || '';

			if (yBoxHasType(obj.self, 'share')) {
				obj.yBoxClass += ' ybox-share-btns';
			}
		}

		// Block javascript:, vbscript:, data: and other dangerous protocols
		if (obj.url) {
			let safeUrl = yBoxSafeUrl(obj.url);
			if (!safeUrl) {
				console.warn('yBox: blocked unsafe URL "' + obj.url + '"');
				if (obj.self) obj.self.classList.remove('yBoxFocus');
				return;
			}
			obj.url = safeUrl;
		}

		// AJAX is same-origin only, unless the trigger has data-ybox-allow-cross-origin
		if (obj.hasSelf && obj.url && (yBoxHasType(obj.self, 'ajax')) && !obj.self.hasAttribute('data-ybox-allow-cross-origin')) {
			let ajaxUrl = null;
			try { ajaxUrl = new URL(obj.url, location.href); } catch(err) {}
			if (!ajaxUrl || ajaxUrl.origin !== location.origin) {
				console.warn('yBox: blocked cross-origin AJAX request to "' + obj.url + '". Add data-ybox-allow-cross-origin to allow it.');
				obj.self.classList.remove('yBoxFocus');
				return;
			}
		}

		if (typeof beforeYboxOpen !== 'undefined' && a_or_div) {
			if (beforeYboxOpen(a_or_div) === false) {
				if (obj.self) obj.self.classList.remove('yBoxFocus');
				return;
			}
		}

		let html = '<div class="yBoxOverlay no-contrast ' + (yBox_lang == 'he' || yBox_lang == 'ar' ? 'yBoxRTL' : '') + ' ' + yBoxEsc(obj.yBoxClass) + '" tabindex="-1">' +
						'<button type="button" class="closeYbox closeYbox-group" title="' + strings.close + '" aria-label="' + strings.close + '"></button>' +
						'<button type="button" class="ybox-details-btn" style="display:none" title="' + strings.details + '" aria-label="' + strings.details + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></button>' +
						'<div class="ybox-details-panel" aria-hidden="true"><h2 class="ybox-details-title"></h2><div class="ybox-details-body"></div></div>' +
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

function yBoxHasType(el, type) {
	return el.classList.contains('ybox-' + type) || el.classList.contains('yBox_' + type) || el.classList.contains('ybox_' + type);
}

function yBoxYoutubeID(url) {
	let match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:shorts\/|embed\/|live\/|v\/|.*[?&]v=))([A-Za-z0-9_-]{11})/i);
	return match ? match[1] : '';
}

// YouTube thumbnail fallback: not every video has maxresdefault.jpg, and YouTube then returns a 120x90 placeholder
// instead of an error, so step down to the next largest size until a real thumbnail loads
const yBoxYoutubeThumbSizes = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
function yBoxYoutubeThumbNext(img) {
	let match = (img.getAttribute('src') || '').match(/\/vi\/([A-Za-z0-9_-]{11})\/([a-z]+)\.jpg/);
	if (!match) return;
	let index = yBoxYoutubeThumbSizes.indexOf(match[2]);
	if (index === -1 || index === yBoxYoutubeThumbSizes.length - 1) return;
	img.src = 'https://img.youtube.com/vi/' + match[1] + '/' + yBoxYoutubeThumbSizes[index + 1] + '.jpg';
}
// load / error don't bubble, so listen in the capture phase
document.addEventListener('load', function(e) {
	let img = e.target;
	if (img.tagName === 'IMG' && img.hasAttribute('data-ybox-youtube-thumb') && img.naturalWidth === 120 && img.naturalHeight === 90) {
		yBoxYoutubeThumbNext(img);
	}
}, true);
document.addEventListener('error', function(e) {
	let img = e.target;
	if (img.tagName === 'IMG' && img.hasAttribute('data-ybox-youtube-thumb')) {
		yBoxYoutubeThumbNext(img);
	}
}, true);

function yBoxVimeoSrc(url) {
	let match = url.match(/(?:vimeo\.com|vimeopro\.com)\/(?:.*?\/)??(\d+)(?:\/([0-9a-f]+))?/i);
	if (!match) return '';
	let hash = match[2] || (url.match(/[?&]h=([0-9a-f]+)/i) || [])[1];
	return 'https://player.vimeo.com/video/' + match[1] + (hash ? '?h=' + hash + '&' : '?');
}

function yBoxIsVideoFile(url) {
	return /\.(mp4|m4v|webm|ogv|ogg|mov)(?:[?#]|$)/i.test(url);
}

function ybox_iframe(obj) {
	let attrs = '';
	let iframe_headline = '';
	let sandbox = null;
	if (obj.hasSelf) {
		if (obj.self.dataset.yboxTitle) attrs += ' title="' + yBoxEsc(obj.self.dataset.yboxTitle) + '"';
		if (obj.self.dataset.yboxHeadline) {
			let headlineClass = obj.self.dataset.yboxHeadlineClass ? ' class="' + yBoxEsc(obj.self.dataset.yboxHeadlineClass) + '"' : '';
			iframe_headline = '<h2 id="ybox-iframe-headline"' + headlineClass + '>' + yBoxEsc(obj.self.dataset.yboxHeadline) + '</h2>';
			attrs += ' aria-labelledby="ybox-iframe-headline"';
		}
		if (obj.self.hasAttribute('data-ybox-sandbox')) sandbox = obj.self.getAttribute('data-ybox-sandbox');
	} else {
		if (obj.headline) {
			iframe_headline = '<h2 id="ybox-iframe-headline">' + yBoxEsc(obj.headline) + '</h2>';
			attrs += ' aria-labelledby="ybox-iframe-headline"';
		}
		if (typeof obj.sandbox === 'string') sandbox = obj.sandbox;
	}
	// Opt-in iframe sandbox: data-ybox-sandbox="allow-scripts allow-forms" (empty value = full sandbox)
	if (sandbox !== null) attrs += ' sandbox="' + yBoxEsc(sandbox) + '"';
	let frame = document.querySelector('.yBoxFrame');
	const yBoxOverlay = document.querySelector('.yBoxOverlay');
	if(frame){
		frame.classList.add('yBoxIframeWrap');
		if( yBoxOverlay.classList.contains('ybox-share-btns') ) {
			yBoxOverlay.classList.remove('ybox-share-btns')
		}
	}
	
	if (obj.url.toLowerCase().indexOf('youtube') > -1 || obj.url.toLowerCase().indexOf('youtu.be') > -1) {
		let youtube_id = yBoxYoutubeID(obj.url);
		obj.url = 'https://www.youtube.com/embed/' + youtube_id + '?wmode=transparent&rel=0&autoplay=1&hl=' + yBox_lang;
		frame.classList.add('yBoxVideoWrap');
	} else if (obj.url.toLowerCase().indexOf('vimeo') > -1) {
		let vimeoSrc = yBoxVimeoSrc(obj.url);
		
		if (vimeoSrc) {
			obj.url = vimeoSrc + 'autoplay=1&background=1';
			frame.classList.add('yBoxVideoWrap');
		}
	}
	
	let code = iframe_headline +
		'<iframe src="' + yBoxEsc(obj.url) + '" frameborder="0" wmode="Opaque" allow="autoplay" allowfullscreen id="yBoxIframe" class="yBoxIframe" ' + attrs + '></iframe>' +
		'<button type="button" class="btn-for-focus-only" aria-label="' + strings.press_tab_again_to_return_to_the_first_button + '"></button>';
	if (obj.hasSelf) code = yBox_Group(obj.self, code);
	return code;
}

function insert_yBox_html(obj) {
	let frame = document.querySelector('.yBoxFrame');
	let insertArea = document.querySelector('.insertYboxAjaxHere');
	frame.classList.remove('yBoxIframeWrap', 'yBoxImgWrap');

	if (obj.hasSelf) {
		// שדרוג: אם יש קוד מוכן, נזריק אותו קודם כל
		if (obj.code) {
			insertArea.innerHTML = obj.code;
		} else {
			let isIframe = yBoxHasType(obj.self, 'iframe') || (obj.url && (obj.url.toLowerCase().includes('youtube') || obj.url.toLowerCase().includes('youtu.be') || obj.url.toLowerCase().includes('vimeo')));
			let isVideo = yBoxHasType(obj.self, 'video') || (obj.url && yBoxIsVideoFile(obj.url));

			if (isIframe) {
				obj.code = ybox_iframe(obj);
				insertArea.innerHTML = obj.code;
				attachDragToThumbs();
				attachSwipeToSlides();
			} else if (isVideo) {
				frame.classList.add('yBoxIframeWrap', 'yBoxVideoWrap');
				let posterSrc = (obj.self && obj.self.dataset.yboxImg) ? yBoxSafeUrl(obj.self.dataset.yboxImg, true) : '';
				let poster = posterSrc ? 'poster="' + yBoxEsc(posterSrc) + '"' : '';
				let code = '<video class="yBoxVideo" ' + poster + ' autoplay controls preload plays-inline playsinline><source src="' + yBoxEsc(obj.url) + '" /></video>';
				code = yBox_Group(obj.self, code);
				insertArea.innerHTML = code;
				attachDragToThumbs();
				attachSwipeToSlides();
			} else if (yBoxHasType(obj.self, 'ajax')) {
				fetch(obj.url)
					.then(function(response) {
						if (!response.ok) throw new Error('HTTP ' + response.status);
						return response.text();
					})
					.then(function(data) {
						insertArea.classList.add('isAjax');
						insertArea.innerHTML = data;
					})
					.catch(function(err) { console.error('yBox Ajax Error:', err); });
			} else if (yBoxHasType(obj.self, 'share')) {
				let titleText = strings.share_page;
				let titleClass = 'ybox-share-title';
				if (obj.self.dataset.yboxHeadline) titleText += obj.self.dataset.yboxHeadline;
				if (obj.self.dataset.yboxHeadlineClass) titleClass += ' ' + obj.self.dataset.yboxHeadlineClass;
				const triggerHref = obj.url || '';
				const resolvedHref = triggerHref || location.href;
				const socialsDataHref = triggerHref ? ' data-href="' + yBoxEsc(triggerHref) + '"' : '';
				let code = '<h2 id="ybox-img-title" class="' + yBoxEsc(titleClass) + '">' + yBoxEsc(titleText) + '</h2>' +
						'<ul class="ybox-socials-list"' + socialsDataHref + '>' +
							'<li><button type="button" class="ybox-share-btn ybox-facebook-share-btn" aria-label="' + strings.share_facebook + '" title="' + strings.share_facebook + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></button></li>' +
							'<li><button type="button" class="ybox-share-btn ybox-whatsapp-share-btn" aria-label="' + strings.share_whatsapp + '" title="' + strings.share_whatsapp + '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg></button></li>' +
							'<li><button type="button" class="ybox-share-btn ybox-twitter-share-btn" aria-label="' + strings.share_x + '" title="' + strings.share_x + '"><svg viewBox="0 0 24 24"><g><path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path></g></svg></button></li>' +
							'<li><button type="button" class="ybox-share-btn ybox-linkedin-share-btn" aria-label="' + strings.share_linkedin + '" title="' + strings.share_linkedin + '"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg></button></li>' +
							'<li><button type="button" class="ybox-share-btn ybox-pinterest-share-btn" aria-label="' + strings.share_pinterest + '" title="' + strings.share_pinterest + '"><svg viewBox="0 0 512 512"><path d="M255.998,0.001c-141.384,0 -255.998,114.617 -255.998,255.998c0,108.456 67.475,201.171 162.707,238.471c-2.24,-20.255 -4.261,-51.405 0.889,-73.518c4.65,-19.978 30.018,-127.248 30.018,-127.248c0,0 -7.659,-15.334 -7.659,-38.008c0,-35.596 20.632,-62.171 46.323,-62.171c21.839,0 32.391,16.399 32.391,36.061c0,21.966 -13.984,54.803 -21.203,85.235c-6.03,25.482 12.779,46.261 37.909,46.261c45.503,0 80.477,-47.976 80.477,-117.229c0,-61.293 -44.045,-104.149 -106.932,-104.149c-72.841,0 -115.597,54.634 -115.597,111.095c0,22.004 8.475,45.596 19.052,58.421c2.09,2.535 2.398,4.758 1.776,7.343c-1.945,8.087 -6.262,25.474 -7.111,29.032c-1.117,4.686 -3.711,5.681 -8.561,3.424c-31.974,-14.884 -51.963,-61.627 -51.963,-99.174c0,-80.755 58.672,-154.915 169.148,-154.915c88.806,0 157.821,63.279 157.821,147.85c0,88.229 -55.629,159.232 -132.842,159.232c-25.94,0 -50.328,-13.476 -58.674,-29.394c0,0 -12.838,48.878 -15.95,60.856c-5.782,22.237 -21.382,50.109 -31.818,67.11c23.955,7.417 49.409,11.416 75.797,11.416c141.389,0 256.003,-114.612 256.003,-256.001c0,-141.381 -114.614,-255.998 -256.003,-255.998Z"/></g></svg></button></li>' +
							'<li><a href="mailto:?subject=' + encodeURIComponent(strings.share_with) + '&amp;body=' + encodeURIComponent(resolvedHref) + '" class="ybox-share-btn ybox-email-share-btn" aria-label="' + strings.share_email + '" title="' + strings.share_email + '"><svg viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg></a></li>' +
							'<li><a href="https://t.me/share/url?url=' + encodeURIComponent(resolvedHref) + '&amp;text=' + encodeURIComponent(strings.share_with) + '" class="ybox-share-btn ybox-telegram-share-btn" target="_blank" rel="noopener noreferrer" aria-label="' + strings.share_telegram + '" title="' + strings.share_telegram + '"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path id="telegram-1" d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"/></svg></a></li>' +
							'<li><button type="button" class="ybox-share-btn ybox-print" aria-label="' + strings.print + '" title="' + strings.print + '"><svg viewBox="0 0 24 24"><path d="M16 17h-8v-1h8v1zm8-12v13h-4.048c-.404 2.423-3.486 6-6.434 6h-9.518v-6h-4v-13h4v-5h16v5h4zm-18 0h12v-3h-12v3zm12 9h-12v8h6.691c3.469 0 2-3.352 2-3.352s3.309 1.594 3.309-2v-2.648zm4-7h-20v9h2v-4h16v4h2v-9zm-9 11h-5v1h5v-1zm7.5-10c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z"/></svg></button></li>' +
							'<li><button type="button" class="ybox-share-btn ybox-copy-text-btn" aria-label="' + strings.copy_link + '" title="' + strings.copy_link + '"><svg class="ybox-copy-hide-on-check" viewBox="0 0 24 24"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z"/></svg><svg class="ybox-copy-show-on-check" viewBox="0 0 24 24"><path d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z"/></svg><div class="ybox-copy-show-text-on-check">' + strings.link_copied + '</div></button></li>' +
						'</ul>';
				insertArea.innerHTML = code;
			} else if (obj.url && obj.url.indexOf('#') === -1 && !obj.url.startsWith('.')) {
				frame.classList.add('yBoxImgWrap');
				let loaderTimeout = setTimeout(function() {
					insertArea.insertAdjacentHTML('beforeend', '<div style="text-align:center;position:absolute;right:0;left:0;top:0;bottom:0;"><div class="yBoxLoader"></div></div>');
				}, 500);
				let img = new Image();
				img.src = obj.url;
				img.className = 'yBoxImg';
				img.onload = function() {
					let alt = obj.self.dataset.yboxAlt || '';
					let title = obj.self.dataset.yboxTitle ? 'title="' + yBoxEsc(obj.self.dataset.yboxTitle) + '"' : '';
					let img_headline = '';
					let aria_labelledby = '';
					if (obj.self.dataset.yboxHeadline) {
						let headlineClass = 'ybox-img-title';
						if (obj.self.dataset.yboxHeadlineClass) headlineClass += ' ' + obj.self.dataset.yboxHeadlineClass;
						img_headline = '<h2 id="ybox-img-title" class="' + yBoxEsc(headlineClass) + '">' + yBoxEsc(obj.self.dataset.yboxHeadline) + '</h2>';
						aria_labelledby = 'aria-labelledby="ybox-img-title"';
					}
					let code = '<div class="yBoxImgWrap2">' +
									'<img src="' + yBoxEsc(obj.url) + '" alt="' + yBoxEsc(alt) + '" ' + title + ' id="yBoxImg" class="yBoxImg" ' + aria_labelledby + ' />' +
									img_headline +
								'</div>';
					code = yBox_Group(obj.self, code);
					if (typeof loaderTimeout !== 'undefined') clearTimeout(loaderTimeout);
					insertArea.innerHTML = code;
					
					attachDragToThumbs();
					attachSwipeToSlides();
				};
			} else {
				let targetEl = null;
				let selector = obj.url;
				let isClass = false;

				// בדיקה האם מדובר בקלאס (מתחיל בנקודה) או ב-ID (מתחיל בסולמית)
				if (selector && selector.startsWith('.')) {
					isClass = true;
				} else if (selector && selector.startsWith('#')) {
					try { targetEl = document.querySelector(selector); } catch(e) {}
					// אם זה סולמית אבל ה-ID לא קיים בעמוד, נתייחס לזה כקלאס
					if (!targetEl) {
						selector = '.' + selector.substring(1);
						isClass = true;
					}
				} else {
					try { targetEl = document.querySelector(selector); } catch(e) {}
				}

				// אם אנחנו מחפשים קלאס (כי הוכנסה נקודה, או כי ה-ID לא נמצא)
				if (isClass && !targetEl) {
					// עדיפות 1: נחפש את האלמנט בתוך הכפתור שלחצנו עליו
					if (obj.self) {
						try { targetEl = obj.self.querySelector(selector); } catch(e) {}
					}

					// עדיפות 2: לא נמצא בכפתור? נבדוק מה האינדקס של הכפתור שלחצנו עליו ביחס לכפתורים האחרים שמפעילים את אותו קישור, ונשלוף את הקלאס באותו אינדקס
					if (!targetEl && obj.self) {
						try {
							let sameButtons = document.querySelectorAll('.yBox[href="' + yBoxCssEsc(obj.url) + '"], .ybox[href="' + yBoxCssEsc(obj.url) + '"]');
							let btnIndex = Array.from(sameButtons).indexOf(obj.self);
							let targetElements = document.querySelectorAll(selector);
							
							if (btnIndex > -1 && targetElements[btnIndex]) {
								targetEl = targetElements[btnIndex];
							}
						} catch(e) {}
					}

					// עדיפות 3: פולבק סופי - פשוט ניקח את האלמנט הראשון בעמוד שעונה לקלאס הזה
					if (!targetEl) {
						try { targetEl = document.querySelector(selector); } catch(e) {}
					}
				}

				if (targetEl) {
					targetEl.insertAdjacentHTML('afterend', '<div class="yBoxFramePlaceHolder"></div>');
					insertArea.classList.remove('isAjax');
					insertArea.appendChild(targetEl);
					if (obj.hasSelf && obj.self && obj.self.dataset.yboxHeadline) {
						let headlineClass = 'ybox-inline-headline';
						if (obj.self.dataset.yboxHeadlineClass) headlineClass += ' ' + obj.self.dataset.yboxHeadlineClass;
						insertArea.insertAdjacentHTML('afterbegin', '<h2 class="' + yBoxEsc(headlineClass) + '">' + yBoxEsc(obj.self.dataset.yboxHeadline) + '</h2>');
					}
				}
			}
		}
        
        // הפעלת פוקוס אוטומטי (ללא הגבלת רזולוציה)
		setTimeout(function() {
			if (obj.self.dataset && obj.self.dataset.focus) {
				let focusEl = insertArea.querySelector('.' + yBoxCssEsc(obj.self.dataset.focus));
				if(focusEl) focusEl.focus();
			} else {
				setYboxFocus();
			}
		}, 500);
		
		// חובה: שמירת קלאס yBoxFocus על הכפתור כדי שהסגירה תחזיר אליו את הפוקוס
		if (!obj.self.classList.contains('yBoxFocus')) {
			const currentFocus = document.querySelector('.yBoxFocus');
			if(currentFocus) currentFocus.classList.remove('yBoxFocus');
			obj.self.classList.add('yBoxFocus');
		}
	} else {
		if (obj.url) {
			obj.code = ybox_iframe(obj);
			insertArea.innerHTML = obj.code;
            attachDragToThumbs();
			attachSwipeToSlides();
		} else {
            if (typeof obj.code === 'undefined' && typeof obj.id !== 'undefined') {
				let targetEl = document.querySelector(obj.id);
				if(targetEl) {
					targetEl.insertAdjacentHTML('afterend', '<div class="yBoxFramePlaceHolder"></div>');
					insertArea.appendChild(targetEl);
				}
			} else {
				// obj.code is inserted as raw HTML by design - never pass unsanitized user input
				insertArea.innerHTML = obj.code || '';
			}
		}
		setTimeout(function() { setYboxFocus({ focus: obj.focus }); }, 500);
	}
}

function setYboxFocus(obj) {
	if (typeof obj !== 'undefined' && typeof obj.focus !== 'undefined') {
		let el = document.querySelector(obj.focus);
		if(el) el.focus();
	} else {
		let closeBtns = document.querySelectorAll('.closeYbox');
		let visibleBtn = Array.from(closeBtns).find(function(btn) {
			return btn.offsetWidth > 0 || btn.offsetHeight > 0;
		});
		
		if(visibleBtn) visibleBtn.focus();
	}
}

function getYboxSlideContent(el, url) {
    let code = '';
    let isIframe = yBoxHasType(el, 'iframe') || (url && (url.toLowerCase().includes('youtube') || url.toLowerCase().includes('youtu.be') || url.toLowerCase().includes('vimeo')));
    let isVideo = yBoxHasType(el, 'video') || (url && yBoxIsVideoFile(url));
    let alt = el.dataset.yboxAlt || '';
    let title = el.dataset.yboxTitle ? 'title="' + yBoxEsc(el.dataset.yboxTitle) + '"' : '';
    let headline = '';
    if (el.dataset.yboxHeadline) {
        let headlineClass = 'ybox-img-title';
        if (el.dataset.yboxHeadlineClass) headlineClass += ' ' + el.dataset.yboxHeadlineClass;
        headline = '<h2 class="' + yBoxEsc(headlineClass) + '">' + yBoxEsc(el.dataset.yboxHeadline) + '</h2>';
    }

    if (isIframe || url.indexOf('youtube') > -1 || url.indexOf('vimeo') > -1) {
        let src = url;
        if (src.toLowerCase().indexOf('youtube') > -1 || src.toLowerCase().indexOf('youtu.be') > -1) {
            let youtube_id = yBoxYoutubeID(src);
            src = 'https://www.youtube.com/embed/' + youtube_id + '?wmode=transparent&rel=0&autoplay=0&hl=' + (typeof yBox_lang !== 'undefined' ? yBox_lang : 'en');
        } else if (src.toLowerCase().indexOf('vimeo') > -1) {
            let vimeoSrc = yBoxVimeoSrc(src);
            
            if (vimeoSrc) {
                src = vimeoSrc + 'autoplay=0';
            }
        }
        let sandbox = el.hasAttribute('data-ybox-sandbox') ? ' sandbox="' + yBoxEsc(el.getAttribute('data-ybox-sandbox')) + '"' : '';
        code = '<iframe src="' + yBoxEsc(src) + '" frameborder="0" wmode="Opaque" allowfullscreen class="yBoxIframe"' + sandbox + '></iframe>';
    } else if (isVideo) {
        let posterSrc = el.dataset.yboxImg ? yBoxSafeUrl(el.dataset.yboxImg, true) : '';
        let poster = posterSrc ? 'poster="' + yBoxEsc(posterSrc) + '"' : '';
        code = '<video class="yBoxVideo" ' + poster + ' controls preload playsinline><source src="' + yBoxEsc(url) + '" /></video>';
    } else {
        code = '<div class="yBoxImgWrap2"><img src="' + yBoxEsc(url) + '" alt="' + yBoxEsc(alt) + '" ' + title + ' class="yBoxImg" />' + headline + '</div>';
    }
    return code;
}

function yBox_Group(yBoxLink, currentCode) {
    let group = yBoxLink.dataset.yboxGroup;
    let hasDetailsAttr = yBoxLink.dataset.yboxDetails || yBoxLink.dataset.yboxDetailsTitle;
    // Items with an unsafe URL (javascript: etc.) are excluded from the gallery
    let groupItems = group ? Array.from(document.querySelectorAll('.yBox[data-ybox-group="' + yBoxCssEsc(group) + '"], .ybox[data-ybox-group="' + yBoxCssEsc(group) + '"]')).filter(function(el) { return !el.closest('.swiper-slide-duplicate') && yBoxSafeUrl(yBoxHref(el)); }) : [];
    if (!group || (groupItems.length < 2 && !hasDetailsAttr)) {
        let insertArea = document.querySelector('.insertYboxAjaxHere');
        if(insertArea) insertArea.innerHTML = currentCode;
        return currentCode;
    }

    document.querySelector('.yBoxOverlay').classList.add('yBoxGroupOverlay');
    let slidesHTML = '<div class="yBoxSlidesWrap">';
    
    let thumbsHTML = '<div class="yBoxThumbsWrapper"><div class="yBoxThumbs">';
    
    groupItems.forEach(function(el, index) {
        let url = yBoxSafeUrl(yBoxHref(el));
        let isActive = (el === yBoxLink) ? ' active' : '';

        let content = getYboxSlideContent(el, url);
        slidesHTML += '<div class="yBoxSlide' + isActive + '" data-id="' + index + '">' + content + '</div>';

        let thumbSrc = el.dataset.yboxImg || '';
        let thumbAttrs = '';

        if (!thumbSrc) {
            if (url.toLowerCase().indexOf('youtube') > -1 || url.toLowerCase().indexOf('youtu.be') > -1) {
                let youtube_id = yBoxYoutubeID(url);
                thumbSrc = 'https://img.youtube.com/vi/' + youtube_id + '/maxresdefault.jpg';
                thumbAttrs = ' data-ybox-youtube-thumb';
            } else if (yBoxHasType(el, 'iframe') || yBoxHasType(el, 'video') || yBoxIsVideoFile(url)) {
                let imgInside = el.querySelector('img');
                thumbSrc = imgInside ? imgInside.getAttribute('src') : '';
            } else {
                thumbSrc = url;
            }
        }

        thumbSrc = yBoxSafeUrl(thumbSrc, true);
        if(thumbSrc) {
            thumbsHTML += '<button type="button" class="yboxThumbBTN' + isActive + '" data-id="' + index + '" aria-label="Slide ' + (index+1) + '">' +
                            '<img src="' + yBoxEsc(thumbSrc) + '" class="yboxThumbIMG" alt=""' + thumbAttrs + ' />' +
                          '</button>';
        }
    });

    slidesHTML += '</div>';
    thumbsHTML += '</div></div>'; // Close wrapper

    // Group-level details (first element in group that defines them)
    let groupDetailsTitle = '';
    let groupDetailsContent = '';
    let detailsTooltip = '';
    let hasDetails = false;
    groupItems.forEach(function(el) {
        if (!detailsTooltip && el.dataset.yboxDetailsTooltip) detailsTooltip = el.dataset.yboxDetailsTooltip;
        if (!hasDetails && (el.dataset.yboxDetails || el.dataset.yboxDetailsTitle)) {
            // A selector copies the HTML of an element already on the page; plain text is escaped
            let dc = el.dataset.yboxDetails || '';
            let targetEl = null;
            if (dc && (dc.startsWith('#') || dc.startsWith('.'))) {
                try { targetEl = document.querySelector(dc); } catch(e) {}
            }
            groupDetailsTitle = el.dataset.yboxDetailsTitle || '';
            groupDetailsContent = targetEl ? targetEl.innerHTML : yBoxEsc(dc);
            hasDetails = true;
        }
    });
    if (hasDetails) {
        let detailsBtn = document.querySelector('.ybox-details-btn');
        if (detailsBtn) {
            let label = detailsTooltip || strings.details;
            detailsBtn.title = label;
            detailsBtn.setAttribute('aria-label', label);
            detailsBtn.style.display = '';
        }
        let panel = document.querySelector('.ybox-details-panel');
        if (panel) {
            let titleEl = panel.querySelector('.ybox-details-title');
            let bodyEl  = panel.querySelector('.ybox-details-body');
            if (titleEl) {
                titleEl.textContent = groupDetailsTitle;
                titleEl.style.display = groupDetailsTitle ? '' : 'none';
            }
            if (bodyEl) bodyEl.innerHTML = groupDetailsContent;
            panel.classList.add('active');
            panel.setAttribute('aria-hidden', 'false');
            if (detailsBtn) detailsBtn.classList.add('active');
        }
    }

    let overlay = document.querySelector('.yBoxOverlay');
    let oldCounter = overlay.querySelector('.yBoxCounter');
    if (oldCounter) oldCounter.remove();
    overlay.insertAdjacentHTML('beforeend', '<div class="yBoxCounter" aria-live="polite"><span class="yBoxCounterCurrent">' + (groupItems.indexOf(yBoxLink) + 1) + '</span> / ' + groupItems.length + '</div>');

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

    const isRTLThumbs = !!document.querySelector('.yBoxRTL');
    let isDown = false;
    let hasDragged = false;
    let startX;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let velocity = 0;
    let lastMoveTranslate = 0;
    let lastTime = Date.now();
    let rafId = null;
    let lastTouchEnd = 0;

    function getBounds() {
        const overflow = thumbs.scrollWidth - wrapper.clientWidth;
        return isRTLThumbs
            ? { min: 0, max: Math.max(0, overflow) }
            : { min: Math.min(0, -overflow), max: 0 };
    }

    function updateOverflow() {
        const overflowing = thumbs.scrollWidth > wrapper.clientWidth;
        if (overflowing) {
            thumbs.classList.remove('justify-center');
            thumbs.classList.add('is-overflowing');
        } else {
            thumbs.classList.remove('is-overflowing');
            thumbs.classList.add('justify-center');
            thumbs.style.transition = 'transform 0.3s ease-out';
            thumbs.style.transform = 'translateX(0)';
            currentTranslate = 0;
            prevTranslate = 0;
        }
    }

    updateOverflow();

    if (yBoxThumbsRO) yBoxThumbsRO.disconnect();
    if (typeof ResizeObserver !== 'undefined') {
        yBoxThumbsRO = new ResizeObserver(updateOverflow);
        yBoxThumbsRO.observe(wrapper);
    }

    function cancelMomentum() {
        if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    }

    thumbs.addEventListener('mousedown', (e) => {
        if (!thumbs.classList.contains('is-overflowing')) return;
        if (Date.now() - lastTouchEnd < 500) return; // ignore synthetic mouse events after touch
        cancelMomentum();
        isDown = true;
        hasDragged = false;
        startX = e.pageX;
        const matrix = new WebKitCSSMatrix(window.getComputedStyle(thumbs).transform);
        prevTranslate = matrix.m41;
        lastMoveTranslate = prevTranslate;
        lastTime = Date.now();
        // transition = none is deferred until actual drag movement detected
    });

    thumbs.addEventListener('mouseleave', () => { if (isDown) stopDragging(); });
    thumbs.addEventListener('mouseup', () => stopDragging());

    thumbs.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        if (Math.abs(x - startX) <= 5) return; // ignore micro-movements, don't start drag

        yBoxIsDragging = true;
        if (!hasDragged) {
            hasDragged = true;
            thumbs.classList.add('is-dragging');
            thumbs.style.transition = 'none';
        }

        const rawTranslate = prevTranslate + (x - startX);
        const { min, max } = getBounds();
        let target;
        if (rawTranslate > max) target = max + (rawTranslate - max) * 0.3;
        else if (rawTranslate < min) target = min + (rawTranslate - min) * 0.3;
        else target = rawTranslate;

        const now = Date.now();
        const dt = Math.max(1, now - lastTime);
        velocity = (target - lastMoveTranslate) / dt * 16;
        lastMoveTranslate = target;
        lastTime = now;
        currentTranslate = target;
        thumbs.style.transform = `translateX(${currentTranslate}px)`;
    });

    function stopDragging() {
        if (!isDown) return;
        isDown = false;
        thumbs.classList.remove('is-dragging');

        if (!hasDragged) {
            // pure tap — don't touch transform or transition
            setTimeout(() => { yBoxIsDragging = false; }, 50);
            return;
        }

        const { min, max } = getBounds();

        if (currentTranslate > max || currentTranslate < min) {
            thumbs.style.transition = 'transform 0.3s ease-out';
            currentTranslate = Math.min(max, Math.max(min, currentTranslate));
            thumbs.style.transform = `translateX(${currentTranslate}px)`;
            prevTranslate = currentTranslate;
            velocity = 0;
        } else if (Math.abs(velocity) > 0.3) {
            thumbs.style.transition = 'none';
            const scroll = () => {
                velocity *= 0.93;
                currentTranslate += velocity;
                if (currentTranslate >= max) {
                    currentTranslate = max; velocity = 0;
                    thumbs.style.transition = 'transform 0.3s ease-out';
                } else if (currentTranslate <= min) {
                    currentTranslate = min; velocity = 0;
                    thumbs.style.transition = 'transform 0.3s ease-out';
                }
                thumbs.style.transform = `translateX(${currentTranslate}px)`;
                prevTranslate = currentTranslate;
                rafId = Math.abs(velocity) > 0.3 ? requestAnimationFrame(scroll) : null;
            };
            rafId = requestAnimationFrame(scroll);
        } else {
            thumbs.style.transition = 'transform 0.3s ease-out';
            thumbs.style.transform = `translateX(${currentTranslate}px)`;
            prevTranslate = currentTranslate;
        }
        setTimeout(() => { yBoxIsDragging = false; }, 50);
    }

    thumbs.addEventListener('touchstart', (e) => {
        if (!thumbs.classList.contains('is-overflowing')) return;
        cancelMomentum();
        isDown = true;
        hasDragged = false;
        startX = e.touches[0].pageX;
        const matrix = new WebKitCSSMatrix(window.getComputedStyle(thumbs).transform);
        prevTranslate = matrix.m41;
        lastMoveTranslate = prevTranslate;
        lastTime = Date.now();
        // transition = none is deferred until actual drag movement detected
    }, { passive: true });

    thumbs.addEventListener('touchend', () => {
        lastTouchEnd = Date.now();
        stopDragging();
    });

    thumbs.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX;
        if (Math.abs(x - startX) <= 5) return; // ignore micro-movements, don't start drag

        yBoxIsDragging = true;
        if (!hasDragged) {
            hasDragged = true;
            thumbs.classList.add('is-dragging');
            thumbs.style.transition = 'none';
        }

        const rawTranslate = prevTranslate + (x - startX);
        const { min, max } = getBounds();
        let target;
        if (rawTranslate > max) target = max + (rawTranslate - max) * 0.3;
        else if (rawTranslate < min) target = min + (rawTranslate - min) * 0.3;
        else target = rawTranslate;

        const now = Date.now();
        const dt = Math.max(1, now - lastTime);
        velocity = (target - lastMoveTranslate) / dt * 16;
        lastMoveTranslate = target;
        lastTime = now;
        currentTranslate = target;
        thumbs.style.transform = `translateX(${currentTranslate}px)`;
    }, { passive: true });
}

function scrollThumbIntoView(index) {
    const thumbs = document.querySelector('.yBoxThumbs');
    const wrapper = document.querySelector('.yBoxThumbsWrapper');
    const activeThumb = thumbs ? thumbs.querySelectorAll('.yboxThumbBTN')[index] : null;

    if (!thumbs || !wrapper || !activeThumb) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const thumbRect  = activeThumb.getBoundingClientRect();
    const containerRect = thumbs.getBoundingClientRect();

    const currentT = new WebKitCSSMatrix(window.getComputedStyle(thumbs).transform).m41;

    const currentThumbCenter = thumbRect.left - wrapperRect.left + thumbRect.width / 2;
    const delta = wrapperRect.width / 2 - currentThumbCenter;
    let newTranslate = currentT + delta;

    const maxTranslate = currentT - (containerRect.left - wrapperRect.left);
    const minTranslate = currentT + (wrapperRect.width - (containerRect.right - wrapperRect.left));

    newTranslate = Math.min(maxTranslate, Math.max(minTranslate, newTranslate));

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
    yBoxResetZoom();
    yBoxLayoutSlides(0, true);
    yBoxUpdateCounter();
}

// Details Button Handler
document.body.addEventListener('click', function(e) {
    let detailsBtn = e.target.closest('.ybox-details-btn');
    if (!detailsBtn) return;
    let panel = document.querySelector('.ybox-details-panel');
    if (!panel) return;
    let isOpen = panel.classList.contains('active');
    panel.classList.toggle('active', !isOpen);
    panel.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    detailsBtn.classList.toggle('active', !isOpen);
});

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
	
	if(e.target.classList.contains('yBoxOverlay') || e.target.classList.contains('yBoxSlidesWrap') ||
	   e.target.classList.contains('yBoxSlide') || e.target.classList.contains('yBoxImgWrap2')) {
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
			if (yBoxThumbsRO) {
				yBoxThumbsRO.disconnect();
				yBoxThumbsRO = null;
			}
			if(overlay) overlay.remove();
		}, 600);
	}
});

function remove_yBox_placeholder() {
	let inlineHeadline = document.querySelector('.insertYboxAjaxHere .ybox-inline-headline');
	if (inlineHeadline) inlineHeadline.remove();
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
		let imgSrc = yBoxCssEsc(currentImg.getAttribute('src'));
		let src = document.querySelector('.yBox[href="' + imgSrc + '"], .ybox[href="' + imgSrc + '"]');
		
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

// A click right after a drag, swipe or pinch must not close the popup or trigger a button
let yBoxSuppressClick = false;
document.addEventListener('click', function(e) {
	if (yBoxSuppressClick) {
		yBoxSuppressClick = false;
		e.preventDefault();
		e.stopPropagation();
	}
}, true);

// Places the gallery slides side by side around the active one, so they move like a carousel
function yBoxLayoutSlides(dragX, animate) {
	let wrap = document.querySelector('.yBoxSlidesWrap');
	if (!wrap) return;
	let slides = Array.from(wrap.querySelectorAll('.yBoxSlide'));
	let total = slides.length;
	let active = slides.findIndex(function(s) { return s.classList.contains('active'); });
	if (active < 0) return;
	let dir = wrap.closest('.yBoxRTL') ? -1 : 1;
	wrap.classList.add('ybox-carousel');
	slides.forEach(function(slide, i) {
		let off = i - active;
		if (total > 2) {
			if (off > total / 2) off -= total;
			if (off < -total / 2) off += total;
		}
		let prevOff = slide.dataset.off === undefined ? off : parseInt(slide.dataset.off, 10);
		let near = Math.abs(off) <= 1;
		slide.style.visibility = near ? 'visible' : 'hidden';
		slide.style.transition = (animate && near && Math.abs(off - prevOff) <= 1) ? '' : 'none';
		slide.style.transform = 'translateX(calc(' + (off * dir * 100) + '% + ' + (dragX || 0) + 'px))';
		slide.dataset.off = off;
	});
}

function yBoxUpdateCounter() {
	let counter = document.querySelector('.yBoxCounterCurrent');
	let active = document.querySelector('.yBoxSlide.active');
	if (counter && active) counter.textContent = parseInt(active.dataset.id, 10) + 1;
}

function yBoxResetZoom() {
	document.querySelectorAll('.yBoxOverlay img.yBoxImg').forEach(function(img) {
		img.style.transform = '';
		img.style.transition = '';
	});
	document.querySelectorAll('.ybox-zoomed').forEach(function(el) {
		el.classList.remove('ybox-zoomed');
	});
}

// Gallery and image gestures: drag between slides, pinch / double tap to zoom, drag up or down / pinch out to close
function attachSwipeToSlides() {
	let wrap = document.querySelector('.yBoxSlidesWrap');
	let isGallery = !!wrap;
	if (!wrap) wrap = document.querySelector('.yBoxImgWrap .yBoxImgWrap2');
	if (!wrap || wrap.dataset.yboxGestures) return;
	wrap.dataset.yboxGestures = '1';
	if (isGallery) {
		yBoxLayoutSlides(0, false);
		yBoxUpdateCounter();
	}

	let pointers = new Map();
	let mode = '';
	let start = { x: 0, y: 0, t: 0 };
	let last = { x: 0, y: 0, t: 0 };
	let velocity = 0;
	let zoom = { img: null, s: 1, x: 0, y: 0 };
	let pinch = null;
	let pan = null;
	let lastTap = { t: 0, x: 0, y: 0 };
	let overlayBg = null;
	let lastPointerType = '';

	wrap.addEventListener('dragstart', function(e) { e.preventDefault(); });

	function activeImg() {
		let scope = isGallery ? wrap.querySelector('.yBoxSlide.active') : wrap;
		return scope ? scope.querySelector('img.yBoxImg') : null;
	}
	function syncZoomImg() {
		let img = activeImg();
		if (zoom.img !== img) zoom = { img: img, s: 1, x: 0, y: 0 };
		return img;
	}
	// A single image moves together with its frame, so the frame background does not stay behind
	function closeTarget() {
		return isGallery ? wrap.querySelector('.yBoxSlide.active') : (wrap.closest('.yBoxFrame') || wrap);
	}
	function applyZoom(animate) {
		if (!zoom.img) return;
		zoom.img.style.transition = animate ? 'transform 0.25s ease' : 'none';
		zoom.img.style.transform = (zoom.s === 1 && !zoom.x && !zoom.y) ? '' : 'translate(' + zoom.x + 'px, ' + zoom.y + 'px) scale(' + zoom.s + ')';
		wrap.classList.toggle('ybox-zoomed', zoom.s > 1);
	}
	function clampZoom() {
		if (!zoom.img) return;
		let maxX = zoom.img.offsetWidth * (zoom.s - 1) / 2;
		let maxY = zoom.img.offsetHeight * (zoom.s - 1) / 2;
		zoom.x = Math.max(-maxX, Math.min(maxX, zoom.x));
		zoom.y = Math.max(-maxY, Math.min(maxY, zoom.y));
	}
	function zoomAt(px, py, newS) {
		let r = zoom.img.getBoundingClientRect();
		let wr = wrap.getBoundingClientRect();
		// The image is centered in the wrapper; the wrapper does not move while a slide is still animating
		let cx = wr.left + wr.width / 2 + zoom.x;
		let cy = r.top + r.height / 2;
		let dx = px - cx + zoom.x;
		let dy = py - cy + zoom.y;
		zoom.x = dx - (dx - zoom.x) * newS / zoom.s;
		zoom.y = dy - (dy - zoom.y) * newS / zoom.s;
		zoom.s = newS;
	}
	function toggleZoom(px, py) {
		if (!syncZoomImg()) return;
		if (zoom.s > 1) {
			zoom.s = 1;
			zoom.x = 0;
			zoom.y = 0;
		} else {
			zoomAt(px, py, 2.5);
			clampZoom();
		}
		applyZoom(true);
	}
	function setOverlayFade(progress) {
		let overlay = document.querySelector('.yBoxOverlay');
		if (!overlay) return;
		if (overlayBg === null) {
			let m = getComputedStyle(overlay).backgroundColor.match(/[\d.]+/g) || [0, 0, 0, 1];
			overlayBg = { rgb: m.slice(0, 3).join(','), a: m[3] === undefined ? 1 : parseFloat(m[3]) };
		}
		overlay.style.backgroundColor = progress ? 'rgba(' + overlayBg.rgb + ',' + (overlayBg.a * (1 - Math.min(progress, 1) * 0.7)) + ')' : '';
	}
	function closePopup() {
		let closeBtn = document.querySelector('.yBoxOverlay .closeYbox');
		if (closeBtn) closeBtn.click();
	}
	function distance(a, b) {
		return Math.hypot(a.x - b.x, a.y - b.y);
	}
	function midpoint(a, b) {
		return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
	}

	wrap.addEventListener('pointerdown', function(e) {
		lastPointerType = e.pointerType;
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		if (e.target.closest('iframe, video, button, a, .ybox-img-title')) return;
		pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
		if (pointers.size === 2) {
			if (!syncZoomImg()) return;
			let p = Array.from(pointers.values());
			pinch = { dist: distance(p[0], p[1]), s: zoom.s };
			mode = 'pinch';
			if (isGallery) yBoxLayoutSlides(0, true);
			return;
		}
		if (pointers.size === 1) {
			syncZoomImg();
			mode = 'pending';
			start = { x: e.clientX, y: e.clientY, t: Date.now() };
			last = { x: e.clientX, y: e.clientY, t: start.t };
			velocity = 0;
		}
	});

	wrap.addEventListener('pointermove', function(e) {
		if (!pointers.has(e.pointerId)) return;
		pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
		let now = Date.now();
		let dx = e.clientX - start.x;
		let dy = e.clientY - start.y;

		if (mode === 'pinch' && pointers.size === 2) {
			let p = Array.from(pointers.values());
			let newS = Math.max(0.5, Math.min(4, pinch.s * distance(p[0], p[1]) / pinch.dist));
			let mid = midpoint(p[0], p[1]);
			zoomAt(mid.x, mid.y, newS);
			applyZoom(false);
			setOverlayFade(newS < 1 ? (1 - newS) * 2 : 0);
			return;
		}
		if (mode === 'pending') {
			if (Math.hypot(dx, dy) < 8) return;
			if (zoom.s > 1) {
				mode = 'pan';
				pan = { x: zoom.x, y: zoom.y };
			} else if (isGallery && Math.abs(dx) > Math.abs(dy)) {
				mode = 'swipe';
			} else {
				mode = 'close';
			}
			if (wrap.setPointerCapture) wrap.setPointerCapture(e.pointerId);
			wrap.classList.add('ybox-dragging');
		}
		if (now > last.t) velocity = (mode === 'close' ? e.clientY - last.y : e.clientX - last.x) / (now - last.t);
		last = { x: e.clientX, y: e.clientY, t: now };

		if (mode === 'swipe') {
			yBoxLayoutSlides(dx, false);
		} else if (mode === 'close') {
			let target = closeTarget();
			if (target) {
				target.style.transition = 'none';
				target.style.transform = 'translate(0, ' + dy + 'px)';
			}
			setOverlayFade(Math.abs(dy) / 300);
		} else if (mode === 'pan') {
			zoom.x = pan.x + dx;
			zoom.y = pan.y + dy;
			clampZoom();
			applyZoom(false);
		}
	});

	function endPointer(e) {
		if (!pointers.has(e.pointerId)) return;
		pointers.delete(e.pointerId);
		let dx = e.clientX - start.x;
		let dy = e.clientY - start.y;

		if (mode === 'pinch') {
			if (pointers.size > 0) return;
			mode = '';
			if (pinch.s <= 1 && zoom.s < 0.8) {
				closePopup();
				return;
			}
			yBoxSuppressClick = true;
			setTimeout(function() { yBoxSuppressClick = false; }, 400);
			if (zoom.s <= 1) {
				zoom.s = 1;
				zoom.x = 0;
				zoom.y = 0;
			} else {
				clampZoom();
			}
			setOverlayFade(0);
			applyZoom(true);
			return;
		}
		if (pointers.size > 0) return;

		if (mode === 'swipe') {
			let dir = wrap.closest('.yBoxRTL') ? -1 : 1;
			if (Math.abs(dx) > wrap.clientWidth * 0.18 || Math.abs(velocity) > 0.5) {
				if (dx * dir < 0) yBoxNext();
				else yBoxPrev();
			} else {
				yBoxLayoutSlides(0, true);
			}
		} else if (mode === 'close') {
			let target = closeTarget();
			if (Math.abs(dy) > 120 || Math.abs(velocity) > 0.6) {
				if (target) {
					target.style.transition = 'transform 0.25s ease';
					target.style.transform = 'translate(0, ' + (dy > 0 ? '' : '-') + '100vh)';
				}
				closePopup();
			} else {
				if (target) {
					target.style.transition = 'transform 0.25s ease';
					target.style.transform = '';
				}
				if (isGallery) yBoxLayoutSlides(0, true);
				setOverlayFade(0);
			}
		} else if (mode === 'pan') {
			clampZoom();
			applyZoom(true);
		} else if (mode === 'pending' && e.pointerType !== 'mouse' && e.type === 'pointerup') {
			let now = Date.now();
			if (now - lastTap.t < 300 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30) {
				lastTap.t = 0;
				if (e.target.closest('img.yBoxImg')) toggleZoom(e.clientX, e.clientY);
			} else {
				lastTap = { t: now, x: e.clientX, y: e.clientY };
			}
		}
		if (mode && mode !== 'pending') {
			yBoxSuppressClick = true;
			setTimeout(function() { yBoxSuppressClick = false; }, 400);
		}
		mode = '';
		wrap.classList.remove('ybox-dragging');
	}
	wrap.addEventListener('pointerup', endPointer);
	wrap.addEventListener('pointercancel', endPointer);

	wrap.addEventListener('dblclick', function(e) {
		if (lastPointerType === 'touch') return;
		if (e.target.closest('img.yBoxImg')) toggleZoom(e.clientX, e.clientY);
	});

	if (isGallery) {
		let wheelCooldown = false;
		wrap.addEventListener('wheel', function(e) {
			e.preventDefault();
			if (wheelCooldown || zoom.s > 1) return;
			wheelCooldown = true;
			setTimeout(function() { wheelCooldown = false; }, 400);
			if (e.deltaY > 0) {
				yBoxNext();
			} else {
				yBoxPrev();
			}
		}, { passive: false });
	}
}
