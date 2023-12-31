/*! yBox - v5.6 - 31/12/2023
* By Yuval Ashkenazi
* https://github.com/yuvalAshkenaz/yBox */

"use strict";

// directive
function ybox_zoom(classNames, settings) {
    /* Settings */
    classNames = (typeof(classNames) !== 'undefined' && Object.keys(classNames).length ? classNames : {});
    settings = (typeof(settings) !== 'undefined' && Object.keys(settings).length ? settings : {});
    
    var C_scaleDefault = settings["scaleDefault"] || 2; // Used on doubleclick, doubletap and resize
    var C_scaleDifference = settings["scaleDifference"] || 0.5; // Used on wheel zoom
    var C_scaleMax = settings["scaleMax"] || 10;
    var C_scaleMin = settings["scaleMin"] || 1;

    /* Selectors */
    var _active = classNames["active"] || "active";
    var _dataScale = "data-scale";
    var _dataTranslateX = "data-translate-x";
    var _dataTranslateY = "data-translate-y";
    var _transition = classNames["transition"] || "transition";
    var _visible = classNames["visible"] || "visible";
    var $container;
    var $element;
    var $zoom = document.getElementsByClassName(classNames["zoom"] || "zoom");

    /* Helpers */
    var capture = false;
    var doubleClickMonitor = [null];
    var containerHeight;
    var containerWidth;
    var containerOffsetX;
    var containerOffsetY;
    var initialScale;
    var elementHeight;
    var elementWidth;
    var heightDifference;
    var initialOffsetX;
    var initialOffsetY;
    var initialPinchDistance;
    var initialPointerOffsetX;
    var initialPointerOffsetX2;
    var initialPointerOffsetY;
    var initialPointerOffsetY2;
    var limitOffsetX;
    var limitOffsetY;
    var mousemoveCount = 0;
    var offset;
    var pinchOffsetX;
    var pinchOffsetY;
    var pointerOffsetX;
    var pointerOffsetX2;
    var pointerOffsetY;
    var pointerOffsetY2;
    var scaleDirection;
    var scaleDifference;
    var targetOffsetX;
    var targetOffsetY;
    var targetPinchDistance;
    var targetScale;
    var touchable = false;
    var touchCount;
    var touchmoveCount = 0;
    var doubleTapMonitor = [null];
    var widthDifference;

    for (var i = 0; i < $zoom.length; i++) {
        /* Initialize selectors */
        $container = $zoom[i];
        $element = $container.children[0];

        /* Set attributes */
        $element.setAttribute(_dataScale, 1);
        $element.setAttribute(_dataTranslateX, 0);
        $element.setAttribute(_dataTranslateY, 0);
    }
    window.addEventListener("load", function() {
        /* Wait for images to be loaded */
        for (var i = 0; i < $zoom.length; i++) {
            /* Initialize selectors */
            $container = $zoom[i];
            $element = $container.children[0];

            ybox_addClass($element, _visible);
        }
        window.addEventListener("resize", function() {
            for (var i = 0; i < $zoom.length; i++) {
                /* Initialize selectors */
                $container = $zoom[i];
                $element = $container.children[0];

                if (ybox_hasClass($container, _active) === false) {
                    continue;
                }

                /* Initialize helpers */
                containerHeight = $container.clientHeight;
                containerWidth = $container.clientWidth;
                elementHeight = $element.clientHeight;
                elementWidth = $element.clientWidth;
                initialOffsetX = parseFloat($element.getAttribute(_dataTranslateX));
                initialOffsetY = parseFloat($element.getAttribute(_dataTranslateY));
                targetScale = C_scaleDefault;
                limitOffsetX = ((elementWidth * targetScale) - containerWidth) / 2;
                limitOffsetY = ((elementHeight * targetScale) - containerHeight) / 2;
                targetOffsetX = (elementWidth * targetScale) > containerWidth ? ybox_minMax(initialOffsetX, limitOffsetX * (-1), limitOffsetX) : 0;
                targetOffsetY = (elementHeight * targetScale) > containerHeight ? ybox_minMax(initialOffsetY, limitOffsetY * (-1), limitOffsetY) : 0;

                if (targetScale === 1) {
                    ybox_removeClass($container, _active);
                }

                /* Set attributes */
                $element.setAttribute(_dataScale, targetScale);
                $element.setAttribute(_dataTranslateX, targetOffsetX);
                $element.setAttribute(_dataTranslateY, targetOffsetY);

                ybox_moveScaleElement($element, targetOffsetX + "px", targetOffsetY + "px", targetScale);
            }
        });
    });

    ybox_massAddEventListener($zoom, "mousedown", mouseDown);
    ybox_massAddEventListener($zoom, "mouseenter", mouseEnter);
    ybox_massAddEventListener($zoom, "mouseleave", mouseLeave);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("touchstart", function() {
        touchable = true;
    });
    ybox_massAddEventListener($zoom, "touchstart", touchStart);
    document.addEventListener("touchmove", touchMove,{passive:false});
    document.addEventListener("touchend", touchEnd);
    ybox_massAddEventListener($zoom, "wheel", wheel);
    function mouseEnter() {
        ybox_disableScroll(true);
    }
    function mouseLeave() {
        ybox_enableScroll();
    }
    function mouseDown(e) {
        e.preventDefault();

        if (touchable === true || e.which !== 1) {
            return false;
        }

        /* Initialize selectors */
        $container = this;
        $element = this.children[0];

        /* Initialize helpers */
        initialPointerOffsetX = e.clientX;
        initialPointerOffsetY = e.clientY;

        /* Doubleclick */
        if (doubleClickMonitor[0] === null) {
            doubleClickMonitor[0] = e.target;
            doubleClickMonitor[1] = initialPointerOffsetX;
            doubleClickMonitor[2] = initialPointerOffsetY;

            setTimeout(function() {
                doubleClickMonitor = [null];
            }, 300);
        } else if (doubleClickMonitor[0] === e.target && mousemoveCount <= 5 && ybox_isWithinRange(initialPointerOffsetX, doubleClickMonitor[1] - 10, doubleClickMonitor[1] + 10) === true && ybox_isWithinRange(initialPointerOffsetY, doubleClickMonitor[2] - 10, doubleClickMonitor[2] + 10) === true) {
            ybox_addClass($element, _transition);
            
            if (ybox_hasClass($container, _active) === true) {
                /* Set attributes */
                $element.setAttribute(_dataScale, 1);
                $element.setAttribute(_dataTranslateX, 0);
                $element.setAttribute(_dataTranslateY, 0);

                ybox_removeClass($container, _active);

                ybox_moveScaleElement($element, 0, 0, 1);
            } else {
                /* Set attributes */
                $element.setAttribute(_dataScale, C_scaleDefault);
                $element.setAttribute(_dataTranslateX, 0);
                $element.setAttribute(_dataTranslateY, 0);

                ybox_addClass($container, _active);

                ybox_moveScaleElement($element, 0, 0, C_scaleDefault);
            }

            setTimeout(function()
            {
                ybox_removeClass($element, _transition);
            }, 200);

            doubleClickMonitor = [null];
            return false;
        }

        /* Initialize helpers */
        offset = $container.getBoundingClientRect();
        containerOffsetX = offset.left;
        containerOffsetY = offset.top;
        containerHeight = $container.clientHeight;
        containerWidth = $container.clientWidth
        elementHeight = $element.clientHeight;
        elementWidth = $element.clientWidth;
        initialOffsetX = parseFloat($element.getAttribute(_dataTranslateX));
        initialOffsetY = parseFloat($element.getAttribute(_dataTranslateY));
        initialScale = ybox_minMax(parseFloat($element.getAttribute(_dataScale)), C_scaleMin, C_scaleMax);

        mousemoveCount = 0;

        /* Set capture */
        capture = true;
    }
    function mouseMove(e) {
        if (touchable === true || capture === false) {
            return false;
        }
        /* Initialize helpers */
        pointerOffsetX = e.clientX;
        pointerOffsetY = e.clientY;
        targetScale = initialScale;
        limitOffsetX = ((elementWidth * targetScale) - containerWidth) / 2;
        limitOffsetY = ((elementHeight * targetScale) - containerHeight) / 2;
        targetOffsetX = (elementWidth * targetScale) <= containerWidth ? 0 : ybox_minMax(pointerOffsetX - (initialPointerOffsetX - initialOffsetX), limitOffsetX * (-1), limitOffsetX);
        targetOffsetY = (elementHeight * targetScale) <= containerHeight ? 0 : ybox_minMax(pointerOffsetY - (initialPointerOffsetY - initialOffsetY), limitOffsetY * (-1), limitOffsetY);
        mousemoveCount++;

        if (Math.abs(targetOffsetX) === Math.abs(limitOffsetX)) {
            initialOffsetX = targetOffsetX;
            initialPointerOffsetX = pointerOffsetX;
        }

        if (Math.abs(targetOffsetY) === Math.abs(limitOffsetY)) {
            initialOffsetY = targetOffsetY;
            initialPointerOffsetY = pointerOffsetY;
        }

        /* Set attributes */
        $element.setAttribute(_dataScale, targetScale);
        $element.setAttribute(_dataTranslateX, targetOffsetX);
        $element.setAttribute(_dataTranslateY, targetOffsetY);

        ybox_moveScaleElement($element, targetOffsetX + "px", targetOffsetY + "px", targetScale);
    }
    function mouseUp() {
        if (touchable === true || capture === false) {
            return false;
        }

        /* Unset capture */
        capture = false;
    }
    function touchStart(e) {
        e.preventDefault();

        if (e.touches.length > 2) {
            return false;
        }

        /* Initialize selectors */
        $container = this;
        $element = this.children[0];

        /* Initialize helpers */
        offset = $container.getBoundingClientRect();
        containerOffsetX = offset.left;
        containerOffsetY = offset.top;
        containerHeight = $container.clientHeight;
        containerWidth = $container.clientWidth;
        elementHeight = $element.clientHeight;
        elementWidth = $element.clientWidth;
        initialPointerOffsetX = e.touches[0].clientX;
        initialPointerOffsetY = e.touches[0].clientY;
        initialScale = ybox_minMax(parseFloat($element.getAttribute(_dataScale)), C_scaleMin, C_scaleMax);
        touchCount = e.touches.length;

        if (touchCount === 1) /* Single touch */ {
            if (doubleTapMonitor[0] === null) {
                doubleTapMonitor[0] = e.target;
                doubleTapMonitor[1] = initialPointerOffsetX;
                doubleTapMonitor[2] = initialPointerOffsetY;

                setTimeout(function() {
                    doubleTapMonitor = [null];
                }, 300);
            } else if (doubleTapMonitor[0] === e.target && touchmoveCount <= 1 && ybox_isWithinRange(initialPointerOffsetX, doubleTapMonitor[1] - 10, doubleTapMonitor[1] + 10) === true && ybox_isWithinRange(initialPointerOffsetY, doubleTapMonitor[2] - 10, doubleTapMonitor[2] + 10) === true) {
                ybox_addClass($element, _transition);
                
                if (ybox_hasClass($container, _active) === true) {
                    $element.setAttribute(_dataScale, 1);
                    $element.setAttribute(_dataTranslateX, 0);
                    $element.setAttribute(_dataTranslateY, 0);

                    ybox_removeClass($container, _active);

                    ybox_moveScaleElement($element, 0, 0, 1);
                } else {
                    $element.setAttribute(_dataScale, C_scaleDefault);
                    $element.setAttribute(_dataTranslateX, 0);
                    $element.setAttribute(_dataTranslateY, 0);

                    ybox_addClass($container, _active);

                    ybox_moveScaleElement($element, 0, 0, C_scaleDefault);
                }

                setTimeout(function()
                {
                    ybox_removeClass($element, _transition);
                }, 200);

                doubleTapMonitor = [null];
                return false;
            }

            /* Initialize helpers */
            initialOffsetX = parseFloat($element.getAttribute(_dataTranslateX));
            initialOffsetY = parseFloat($element.getAttribute(_dataTranslateY));
        } else if (touchCount === 2) /* Pinch */ {
            /* Initialize helpers */
            initialOffsetX = parseFloat($element.getAttribute(_dataTranslateX));
            initialOffsetY = parseFloat($element.getAttribute(_dataTranslateY));
            initialPointerOffsetX2 = e.touches[1].clientX;
            initialPointerOffsetY2 = e.touches[1].clientY;
            pinchOffsetX = (initialPointerOffsetX + initialPointerOffsetX2) / 2;
            pinchOffsetY = (initialPointerOffsetY + initialPointerOffsetY2) / 2;
            initialPinchDistance = Math.sqrt(((initialPointerOffsetX - initialPointerOffsetX2) * (initialPointerOffsetX - initialPointerOffsetX2)) + ((initialPointerOffsetY - initialPointerOffsetY2) * (initialPointerOffsetY - initialPointerOffsetY2)));
        }

        touchmoveCount = 0;

        /* Set capture */
        capture = true;
    }
    function touchMove(e) {
		
        if (capture === false) {
            return false;
        }
		e.preventDefault();
		
        /* Initialize helpers */
        pointerOffsetX = e.touches[0].clientX;
        pointerOffsetY = e.touches[0].clientY;
        touchCount = e.touches.length;
        touchmoveCount++;
		
        if (touchCount > 1) /* Pinch */ {
            pointerOffsetX2 = e.touches[1].clientX;
            pointerOffsetY2 = e.touches[1].clientY;
            targetPinchDistance = Math.sqrt(((pointerOffsetX - pointerOffsetX2) * (pointerOffsetX - pointerOffsetX2)) + ((pointerOffsetY - pointerOffsetY2) * (pointerOffsetY - pointerOffsetY2)));

            if (initialPinchDistance === null) {
                initialPinchDistance = targetPinchDistance;
            }

            if (Math.abs(initialPinchDistance - targetPinchDistance) >= 1) {
                /* Initialize helpers */
                targetScale = ybox_minMax(targetPinchDistance / initialPinchDistance * initialScale, C_scaleMin, C_scaleMax);
                limitOffsetX = ((elementWidth * targetScale) - containerWidth) / 2;
                limitOffsetY = ((elementHeight * targetScale) - containerHeight) / 2;
                scaleDifference = targetScale - initialScale;
                targetOffsetX = (elementWidth * targetScale) <= containerWidth ? 0 : ybox_minMax(initialOffsetX - ((((((pinchOffsetX - containerOffsetX) - (containerWidth / 2)) - initialOffsetX) / (targetScale - scaleDifference))) * scaleDifference), limitOffsetX * (-1), limitOffsetX);
                targetOffsetY = (elementHeight * targetScale) <= containerHeight ? 0 : ybox_minMax(initialOffsetY - ((((((pinchOffsetY - containerOffsetY) - (containerHeight / 2)) - initialOffsetY) / (targetScale - scaleDifference))) * scaleDifference), limitOffsetY * (-1), limitOffsetY);

                if (targetScale > 1) {
                    ybox_addClass($container, _active);
                } else {
                    ybox_removeClass($container, _active);
                }

                ybox_moveScaleElement($element, targetOffsetX + "px", targetOffsetY + "px", targetScale);

                /* Initialize helpers */
                initialPinchDistance = targetPinchDistance;
                initialScale = targetScale;
                initialOffsetX = targetOffsetX;
                initialOffsetY = targetOffsetY;
            }
        } else /* Single touch */ {
            /* Initialize helpers */
            targetScale = initialScale;
            limitOffsetX = ((elementWidth * targetScale) - containerWidth) / 2;
            limitOffsetY = ((elementHeight * targetScale) - containerHeight) / 2;
            targetOffsetX = (elementWidth * targetScale) <= containerWidth ? 0 : ybox_minMax(pointerOffsetX - (initialPointerOffsetX - initialOffsetX), limitOffsetX * (-1), limitOffsetX);
            targetOffsetY = (elementHeight * targetScale) <= containerHeight ? 0 : ybox_minMax(pointerOffsetY - (initialPointerOffsetY - initialOffsetY), limitOffsetY * (-1), limitOffsetY);

            if (Math.abs(targetOffsetX) === Math.abs(limitOffsetX)) {
                initialOffsetX = targetOffsetX;
                initialPointerOffsetX = pointerOffsetX;
            }

            if (Math.abs(targetOffsetY) === Math.abs(limitOffsetY)) {
                initialOffsetY = targetOffsetY;
                initialPointerOffsetY = pointerOffsetY;
            }

            /* Set attributes */
            $element.setAttribute(_dataScale, initialScale);
            $element.setAttribute(_dataTranslateX, targetOffsetX);
            $element.setAttribute(_dataTranslateY, targetOffsetY);

            ybox_moveScaleElement($element, targetOffsetX + "px", targetOffsetY + "px", targetScale);
        }
    }
    function touchEnd(e) {
        touchCount = e.touches.length;

        if (capture === false) {
            return false;
        }

        if (touchCount === 0) /* No touch */ {
            /* Set attributes */
            $element.setAttribute(_dataScale, initialScale);
            $element.setAttribute(_dataTranslateX, targetOffsetX);
            $element.setAttribute(_dataTranslateY, targetOffsetY);

            initialPinchDistance = null;
            capture = false;
        } else if (touchCount === 1) /* Single touch */ {
            initialPointerOffsetX = e.touches[0].clientX;
            initialPointerOffsetY = e.touches[0].clientY;
        } else if (touchCount > 1) /* Pinch */ {
            initialPinchDistance = null;
        }
    }
    function wheel(e) {
        /* Initialize selectors */
        $container = this;
        $element = this.children[0];

        /* Initialize helpers */
        offset = $container.getBoundingClientRect();
        containerHeight = $container.clientHeight;
        containerWidth = $container.clientWidth;
        elementHeight = $element.clientHeight;
        elementWidth = $element.clientWidth;
        containerOffsetX = offset.left;
        containerOffsetY = offset.top;
        initialScale = ybox_minMax(parseFloat($element.getAttribute(_dataScale), C_scaleMin, C_scaleMax));
        initialOffsetX = parseFloat($element.getAttribute(_dataTranslateX));
        initialOffsetY = parseFloat($element.getAttribute(_dataTranslateY));
        pointerOffsetX = e.clientX;
        pointerOffsetY = e.clientY;
        scaleDirection = e.deltaY < 0 ? 1 : -1;
        scaleDifference = C_scaleDifference * scaleDirection;
        targetScale = initialScale + scaleDifference;

        /* Prevent scale overflow */
        if (targetScale < C_scaleMin || targetScale > C_scaleMax) {
            return false;
        }

        /* Set offset limits */
        limitOffsetX = ((elementWidth * targetScale) - containerWidth) / 2;
        limitOffsetY = ((elementHeight * targetScale) - containerHeight) / 2;

        if (targetScale <= 1) {
            targetOffsetX = 0;
            targetOffsetY = 0;
        } else {
            /* Set target offsets */
            targetOffsetX = (elementWidth * targetScale) <= containerWidth ? 0 : ybox_minMax(initialOffsetX - ((((((pointerOffsetX - containerOffsetX) - (containerWidth / 2)) - initialOffsetX) / (targetScale - scaleDifference))) * scaleDifference), limitOffsetX * (-1), limitOffsetX);
            targetOffsetY = (elementHeight * targetScale) <= containerHeight ? 0 : ybox_minMax(initialOffsetY - ((((((pointerOffsetY - containerOffsetY) - (containerHeight / 2)) - initialOffsetY) / (targetScale - scaleDifference))) * scaleDifference), limitOffsetY * (-1), limitOffsetY);
        }

        if (targetScale > 1) {
            ybox_addClass($container, _active);
        } else {
            ybox_removeClass($container, _active);
        }

        /* Set attributes */
        $element.setAttribute(_dataScale, targetScale);
        $element.setAttribute(_dataTranslateX, targetOffsetX);
        $element.setAttribute(_dataTranslateY, targetOffsetY);

        ybox_moveScaleElement($element, targetOffsetX + "px", targetOffsetY + "px", targetScale);
    }
}
function ybox_addClass($element, targetClass) {
    if (ybox_hasClass($element, targetClass) === false) {
        $element.className += " " + targetClass;
    }
}
function ybox_disableScroll(isPassive) {
    if (!isPassive){
		if (window.addEventListener) // older FF
		{
			window.addEventListener('DOMMouseScroll', ybox_preventDefault, false);
		}

		window.onwheel = ybox_preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = ybox_preventDefault; // older browsers, IE
		window.ontouchmove = ybox_preventDefault; // mobile
	}
	document.onkeydown = ybox_preventDefaultForScrollKeys;
}
function ybox_enableScroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', ybox_preventDefault, false);
    }

    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
function ybox_isWithinRange(value, min, max) {
    if (value >= min && value <= max) {
        return true;
    } else {
        return false;
    }
}
function ybox_hasClass($element, targetClass) {
    var rgx = new RegExp("(?:^|\\s)" + targetClass + "(?!\\S)", "g");

    if ($element.className && $element.className.match(rgx)) {
        return true;
    } else {
        return false;
    }
}
function ybox_massAddEventListener($elements, event, customFunction, useCapture) {
    var useCapture = useCapture || false;

    for (var i = 0; i < $elements.length; i++) {
        $elements[i].addEventListener(event, customFunction, useCapture);
    }
}
function ybox_minMax(value, min, max) {
    if (value < min) {
        value = min;
    } else if (value > max) {
        value = max;
    }

    return value;
}
function ybox_moveScaleElement($element, targetOffsetX, targetOffsetY, targetScale) {
    $element.style.cssText = "-moz-transform : translate(" + targetOffsetX + ", " + targetOffsetY + ") scale(" + targetScale + "); -ms-transform : translate(" + targetOffsetX + ", " + targetOffsetY + ") scale(" + targetScale + "); -o-transform : translate(" + targetOffsetX + ", " + targetOffsetY + ") scale(" + targetScale + "); -webkit-transform : translate(" + targetOffsetX + ", " + targetOffsetY + ") scale(" + targetScale + "); transform : translate3d(" + targetOffsetX + ", " + targetOffsetY + ", 0) scale3d(" + targetScale + ", " + targetScale + ", 1);";
}
function ybox_preventDefault(e) {
    e = e || window.event;

    if (e.preventDefault) {
        e.preventDefault();
    }

    e.returnValue = false;
}
function ybox_preventDefaultForScrollKeys(e) {
    var keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}
function ybox_removeClass($element, targetClass) {
    var rgx = new RegExp("(?:^|\\s)" + targetClass + "(?!\\S)", "g");

    $element.className = $element.className.replace(rgx, "");
}


//yBox
jQuery('body').on('click','.yBox',function(e){
	e.preventDefault();
	e.stopPropagation();
	var self = jQuery(this);
	if( jQuery('.yBox.yBoxFocus').length ) {
		if( typeof beforeYboxClose != 'undefined' ) {
			var beforeClose = beforeYboxClose( jQuery('.yBox.yBoxFocus') );
			if( beforeClose == false )
				return false;
		}
		jQuery('.yBox.yBoxFocus').not(self).removeClass('yBoxFocus');
	}
	self.addClass('yBoxFocus');
	yBox({ self: self });
});
var yUrl = new URL(document.currentScript.src);
var yBox_lang = yUrl.searchParams.get("lang");
var strings = {
	close	: 'Close',
	next	: 'Next',
	prev	: 'Prev'
};
if( yBox_lang == 'he' || yBox_lang == 'he-IL' || yBox_lang == 'he_IL' ) {
	yBox_lang = 'he';
	strings = {
		close	: 'סגירה',
		next	: 'הבא',
		prev	: 'הקודם'
	};
}
if( yBox_lang == 'ar' || yBox_lang == 'ar-ar' ) {
	yBox_lang = 'ar';
	strings = {
		close	: 'لإغلاق',
		next	: 'التالي',
		prev	: 'السابق'
	};
}

var url = new URL(window.location.href);
var msg = url.searchParams.get("msg");
var yBoxPrm = url.searchParams.get("ybox-url");
var yBoxClassPrm = url.searchParams.get("ybox-class");
if( msg || yBoxPrm ) {
	if(!jQuery.isEmptyObject(yBoxPrm) && (yBoxPrm.indexOf('http:') == -1 && yBoxPrm.indexOf('https:') == -1)){
		yBoxPrm = '#'+yBoxPrm;
	}
	yBox({
		code	  : yBoxPrm ? false : msg,
		yBoxClass : yBoxClassPrm ? yBoxClassPrm : 'ybox-content-frame',
		url		  : yBoxPrm ? yBoxPrm : false
	});
	//***** Remove msg from URL ***********
	setTimeout(function(){
		var params = new URLSearchParams(window.location.search);
		params.delete('msg');
		params.delete('ybox-url');
		params.delete('ybox-class');
		if(params.toString()){
			params = '?'+params.toString();
		}
		var newURL = window.location.pathname+params;
		window.history.pushState("", "", newURL);
	},500);
}
function yBox( obj ) {
	if( ! jQuery('.yBoxOverlay:not(.active)').length ) {
		// code
		// self
		// yBoxClass
		// url
		var a_or_div;
		if( obj.self ) {
			a_or_div = obj.self;
		} else if( obj.url ) {
			a_or_div = jQuery(obj.url);
		}
		if(typeof beforeYboxOpen != 'undefined'){
			beforeYboxOpen( a_or_div );
		}
		var hasSelf = true;
		
		if( typeof obj.yBoxClass == 'undefined' ) {
			obj.yBoxClass = '';
		}
		if( typeof obj.self == 'undefined' || ! obj.self ) {
			hasSelf = false;
		}
		if( hasSelf ) {
			obj.yBoxClass = obj.self.data('ybox-class') || '';
			obj.url = obj.self.attr('href');
		}
		var html = '<div class="yBoxOverlay no-contrast' + ( yBox_lang == 'he' || yBox_lang == 'ar' ? ' yBoxRTL' : '' ) + '">'+
						'<div class="yBoxFrame ' + obj.yBoxClass + '">'+
							'<button type="button" class="closeYboxOnFocus"></button>'+
							'<button type="button" class="closeYbox" title="' + strings.close + '"></button>'+
							'<div class="insertYboxAjaxHere" tabindex="0"></div>'+
							'<button type="button" class="closeYboxOnFocus"></button>'+
						'</div>'+
					'</div>';
					
		if( ! jQuery('.yBoxFrame').length ) {
			jQuery('body').append( html );
			insert_yBox_html({
				self	: obj.self,
				hasSelf	: hasSelf,
				url		: obj.url,
				code	: obj.code,
				focus	: obj.focus
			});
			setTimeout(function(){
				jQuery('.yBoxOverlay').addClass('active');
			}, 200);
		} else {
			if( jQuery('.yBoxFrame.yBoxImgWrap').length ) {
				remove_yBox_placeholder();
				jQuery('.insertYboxAjaxHere').html('');
				insert_yBox_html({
					self	: obj.self,
					hasSelf	: hasSelf,
					url		: obj.url,
					code	: obj.code,
					focus	: obj.focus
				});
			} else {
				jQuery('.insertYboxAjaxHere').animate({
					opacity : 0
				}, function(){
					var athis = jQuery(this);
					setTimeout(function(){
						remove_yBox_placeholder();
						athis.html('');
						insert_yBox_html({
							self	: obj.self,
							hasSelf	: hasSelf,
							url		: obj.url,
							code	: obj.code,
							focus	: obj.focus
						});
						jQuery('.insertYboxAjaxHere').animate({
							opacity : 1
						});
					}, 200);
				});
			}
		}
		setTimeout(function(){
			if( typeof afterYboxOpen != 'undefined' ) {
				afterYboxOpen( a_or_div );
			}
		}, 200);
	}
};
function insert_yBox_html( obj ) {
	jQuery('.yBoxFrame').removeClass('yBoxIframeWrap yBoxImgWrap');
	if( obj.hasSelf ) {
		if( obj.self.hasClass('yBox_iframe') ) {
			//iframe
			jQuery('.yBoxFrame').addClass('yBoxIframeWrap');
			if( obj.url.toLowerCase().indexOf('youtube') > -1 || obj.url.toLowerCase().indexOf('youtu.be') > -1 ) {
				var youtube_id = obj.url.replace(/^[^v]+v.(.{11}).*/,"$1").replace('https://youtu.be/','').replace(/.*youtube.com\/embed\//,'');
				obj.url = 'https://www.youtube.com/embed/'+youtube_id+'?wmode=transparent&rel=0&autoplay=1&hl='+yBox_lang;
			}
			if( obj.url.toLowerCase().indexOf('vimeo') > -1 ) {
				var vimeoID = obj.url.replace(/[^0-9]/g,'');
				obj.url = 'https://player.vimeo.com/video/'+vimeoID+'?autoplay=1';
			}
			var code = '<iframe src="'+obj.url+'" frameborder="0" wmode="Opaque" allow="autoplay" allowfullscreen class="yBoxIframe"></iframe>';
			code = yBox_Group(obj.self, code);
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
		} else if( obj.url.indexOf('#') == -1 ) {
			//image
			jQuery('.yBoxFrame').addClass('yBoxImgWrap');
			jQuery('.insertYboxAjaxHere').append('<div style="text-align:center;position:absolute;right:0;left:0;top:0;bottom:0;"><div class="yBoxLoader"></div></div>');
			var img = new Image();
			img.src = obj.url;
			img.className = 'yBoxImg';
			img.onload = function(){
				var alt = obj.self.data('ybox-alt') || '';
				var img_title = '';
				if( obj.self.data('ybox-title') ) {
					img_title = '<h3 class="ybox-img-title">'+obj.self.data('ybox-title')+'</h3>';
				}
				var code = '<div class="yBoxImgZoom">'+
								'<img src="'+obj.url+'" alt="'+alt+'" class="yBoxImg" />'+
								img_title+
							'</div>';
				code = yBox_Group(obj.self, code);
				
				if(window.screen.width <= 767)
					ybox_zoom({zoom:'yBoxImgZoom'});
			};
		} else {
			jQuery(obj.url).after('<div class="yBoxFramePlaceHolder"></div>');
			if(jQuery('.insertYboxAjaxHere.isAjax').length){
				jQuery('.insertYboxAjaxHere.isAjax').removeClass('isAjax');
			}
			jQuery(obj.url).appendTo('.insertYboxAjaxHere');
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
		if( typeof obj.code == 'undefined' && obj.url ) {
			jQuery(obj.url).after('<div class="yBoxFramePlaceHolder"></div>');
			jQuery(obj.url).appendTo('.insertYboxAjaxHere');
		} else {
			jQuery('.insertYboxAjaxHere').html( obj.code );
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

jQuery('.yBox[data-ybox-group]:not(.swiper-slide-duplicate)').each(function(i){
	var group = jQuery(this).data('ybox-group');
	jQuery(this).attr('data-ybox-id', group+'-'+i);
});

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
		if( jQuery('.yBox.yBoxFocus').length ) {
			a_or_div = jQuery('.yBox.yBoxFocus');
		}
		if( typeof beforeYboxClose != 'undefined' ) {
			var beforeClose = beforeYboxClose( a_or_div );
			if( beforeClose == false )
				return false;
		}
		jQuery('.yBoxOverlay').removeClass('active');
		jQuery('.yBoxFocus').focus();
		setTimeout(function(){
			if( typeof afterYboxClose != 'undefined' ) {
				afterYboxClose( a_or_div );
			}
			remove_yBox_placeholder();
			jQuery('.yBoxOverlay').remove();
		},600);
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
jQuery('body').on('focus','.closeYboxOnFocus',function(){
	jQuery('.closeYbox').trigger('click');
});
jQuery(document).keyup(function(e){
	if(e.keyCode === 39){ //Prev
		yBoxPrev(jQuery('.yBox[href="'+jQuery('.yBoxImg').attr('src')+'"]'));
	}
	if(e.keyCode === 37){ //Next
		yBoxNext(jQuery('.yBox[href="'+jQuery('.yBoxImg').attr('src')+'"]'));
	}
	if(e.keyCode === 27){ //Esc
		jQuery('.closeYbox').trigger('click');
	}
});